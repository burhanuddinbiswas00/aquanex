import api from "./api";
import { MOCK_ANALYSES } from "@/lib/apiClient";

export interface AiPrediction {
  id: number;
  analysis_id: number;
  parameter_name: string;
  is_anomaly: boolean;
  confidence: number;
  recommendation?: string;
}

export interface WaterParameter {
  id: number;
  analysis_id: number;
  parameter_name: string;
  value: number;
  unit: string;
  timestamp: string;
  ph?: number;
  tds?: number;
  salinity?: number;
  dissolved_oxygen?: number;
}

export interface Analysis {
  id: number;
  user_id: number;
  name: string;
  status: "pending" | "processing" | "completed" | "failed";
  created_at: string;
  water_parameters?: WaterParameter[];
  ai_predictions?: AiPrediction[];
  water_parameters_count?: number;
  rows?: number;
  score?: number;
  source?: string;
}

// In-memory store for client-side mock analyses created during dev when backend is unavailable
const LOCAL_ANALYSES: Record<string, Analysis> = {};

export const analysisService = {
  uploadCSV: async (file: File): Promise<{ success: boolean; data: { analysis: Analysis } }> => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      return await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (e) {
      // Backend unreachable — create a local mock analysis and simulate processing -> completed
      const id = Date.now();
      const created_at = new Date().toISOString();
      const local: Analysis = {
        id,
        user_id: 0,
        name: file.name || `Mock Analysis ${id}`,
        status: "processing",
        created_at,
        water_parameters: [
          {
            id: id * 1000 + 1,
            analysis_id: id,
            parameter_name: "composite",
            value: 0,
            unit: "",
            timestamp: created_at,
            ph: 7.2,
            tds: 200,
            salinity: 0.5,
            dissolved_oxygen: 7.5,
            turbidity: 1.0,
          },
        ],
        ai_predictions: [],
        water_parameters_count: 1,
        rows: 1,
        score: undefined,
      };

      LOCAL_ANALYSES[String(id)] = local;

      // After a short delay, mark the analysis as completed with sample results
      setTimeout(() => {
        const completed: Analysis = {
          ...local,
          status: "completed",
          score: 85,
          ai_predictions: [],
          water_parameters: [
            {
              ...local.water_parameters![0],
              ph: 7.2,
              tds: 200,
              dissolved_oxygen: 8.5,
              turbidity: 1.5,
            },
          ],
        };
        LOCAL_ANALYSES[String(id)] = completed;
      }, 3000);

      return { success: true, data: { analysis: local } };
    }
  },

  manualInput: async (
    data: Record<string, unknown>,
  ): Promise<{ success: boolean; data: { analysis: Analysis } }> => {
    return await api.post("/manual", data);
  },

  getAnalysis: async (id: string | number): Promise<{ success: boolean; data: Analysis }> => {
    // Return any locally-created mock analysis first
    const local = LOCAL_ANALYSES[String(id)];
    if (local) return { success: true, data: local };
    try {
      return await api.get(`/analysis/${id}`);
    } catch (e) {
      // Fallback to mock data when backend is unreachable
      const found = MOCK_ANALYSES.find((m) => String(m.id) === String(id));
      if (found) {
        // Normalize lightweight mock into the full Analysis shape expected by the UI
        const normalized: Analysis = {
          id: found.id,
          user_id: (found as any).user_id ?? 0,
          name: found.name ?? `Mock Analysis ${found.id}`,
          status: (found as any).status ?? "completed",
          created_at: found.created_at ?? new Date().toISOString(),
          water_parameters: (found as any).water_parameters
            ? (found as any).water_parameters
            : [
                {
                  id: (found.id * 1000) + 1,
                  analysis_id: found.id,
                  parameter_name: "composite",
                  value: 0,
                  unit: "",
                  timestamp: found.created_at ?? new Date().toISOString(),
                  ph: (found as any).ph,
                  tds: (found as any).tds,
                  salinity: (found as any).salinity,
                  dissolved_oxygen: (found as any).dissolved_oxygen,
                  turbidity: (found as any).turbidity,
                },
              ],
          ai_predictions: (found as any).ai_predictions ?? [],
          water_parameters_count: (found as any).water_parameters?.length ?? 1,
          rows: (found as any).rows ?? 1,
          score: (found as any).water_quality_score ?? (found as any).score ?? undefined,
        };

        return { success: true, data: normalized };
      }
      throw e;
    }
  },

  getHistory: async (
    page = 1,
  ): Promise<{
    success: boolean;
    data: { data: Analysis[]; current_page: number; total: number };
  }> => {
    try {
      return await api.get(`/history?page=${page}`);
    } catch (e) {
      // Return mock paginated history when backend is unavailable
      const perPage = 10;
      const start = (page - 1) * perPage;
      const data = MOCK_ANALYSES.slice(start, start + perPage) as unknown as Analysis[];
      return { success: true, data: { data, current_page: page, total: MOCK_ANALYSES.length } };
    }
  },
};
