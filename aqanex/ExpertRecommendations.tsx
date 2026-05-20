import { motion } from "framer-motion";
import { GraduationCap, Beaker, Fish, AlertCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Analysis {
  ph?: number;
  tds?: number;
  dissolved_oxygen?: number;
  turbidity?: number;
  salinity?: number;
  chlorine?: number;
  water_parameters?: Array<{
    ph?: number;
    tds?: number;
    dissolved_oxygen?: number;
    turbidity?: number;
    salinity?: number;
  }>;
  ai_predictions?: Array<{
    parameter_name?: string;
    is_anomaly?: boolean;
    confidence?: number;
  }>;
}

interface ExpertRecommendation {
  expert: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  recommendations: string[];
  concerns: string[];
  severity: "low" | "medium" | "high";
}

export function generateExpertRecommendations(analysis: Analysis): ExpertRecommendation[] {
  const latest = analysis.water_parameters?.[analysis.water_parameters.length - 1] || {};
  const ph = latest.ph ?? 7.0;
  const tds = latest.tds ?? 200;
  const dissolved_oxygen = latest.dissolved_oxygen ?? 7.0;
  const turbidity = latest.turbidity ?? 1.0;
  const salinity = latest.salinity ?? 0.5;

  const hasAnomalies = analysis.ai_predictions?.some((p) => p.is_anomaly) ?? false;

  let severity: "low" | "medium" | "high" = "low";
  if (hasAnomalies) severity = "high";
  else if (
    ph < 6.5 ||
    ph > 8.5 ||
    tds > 500 ||
    dissolved_oxygen < 5 ||
    turbidity > 5
  ) {
    severity = "medium";
  }

  const experts: ExpertRecommendation[] = [
    {
      expert: "Environmental Engineering Professor",
      title: "Environmental Quality Assessment",
      icon: "🎓",
      color: "from-blue-500/20 to-blue-600/20",
      severity,
      recommendations: [
        ...(!hasAnomalies
          ? [
              "Current water quality parameters are within acceptable ranges for environmental compliance.",
              "Recommend continued monitoring at regular intervals to track long-term trends.",
            ]
          : [
              "Anomalies detected indicate need for immediate investigation.",
              "Implement enhanced monitoring protocol for affected parameters.",
            ]),
        ...(tds > 500 ? ["High TDS levels suggest mineral accumulation - consider water treatment intervention."] : []),
        ...(ph < 6.5 || ph > 8.5 ? ["pH levels outside optimal range - adjust treatment process accordingly."] : []),
        ...(dissolved_oxygen < 5 ? ["Low dissolved oxygen indicates potential biological stress - increase aeration."] : []),
      ],
      concerns: [
        ...(hasAnomalies ? ["Anomalies detected in analysis"] : []),
        ...(turbidity > 5 ? ["High turbidity suggests suspended solids"] : []),
        ...(tds > 500 ? ["Elevated total dissolved solids"] : []),
        ...(dissolved_oxygen < 5 ? ["Insufficient dissolved oxygen levels"] : []),
      ].filter(Boolean),
    },
    {
      expert: "Water Treatment Specialist",
      title: "Treatment & Processing Recommendations",
      icon: "⚗️",
      color: "from-emerald-500/20 to-emerald-600/20",
      severity,
      recommendations: [
        ...(!hasAnomalies
          ? [
              "Water is suitable for standard treatment protocols.",
              "Current treatment efficiency appears adequate for current contamination levels.",
            ]
          : [
              "Consider enhanced coagulation/flocculation to address anomalies.",
              "Review and adjust treatment chemical dosing.",
            ]),
        ...(tds > 500 ? ["Apply reverse osmosis or ion exchange for TDS reduction."] : ["Current TDS manageable with standard filtration."]),
        ...(turbidity > 5
          ? [
              "Implement multi-stage filtration: pre-filter → sand filter → cartridge filter.",
              "Monitor filter pressure and backwash frequency.",
            ]
          : ["Standard filtration adequate for turbidity levels."]),
        ...(ph < 6.5
          ? ["Add alkalinity adjustment chemicals (lime or soda ash) to raise pH."]
          : ph > 8.5
          ? ["Inject carbon dioxide or acid to lower pH to 7.0-8.0 range."]
          : ["pH in optimal treatment range - no adjustment needed."]),
      ],
      concerns: [
        ...(tds > 500 ? ["High mineralization requires enhanced treatment"] : []),
        ...(turbidity > 5 ? ["Significant suspended solids present"] : []),
        ...(ph < 6.5 || ph > 8.5 ? ["pH outside treatment optimal range"] : []),
        ...(dissolved_oxygen < 5 ? ["Low dissolved oxygen affects treatment effectiveness"] : []),
      ].filter(Boolean),
    },
    {
      expert: "Fisheries Expert",
      title: "Aquatic Ecosystem Health",
      icon: "🐟",
      color: "from-cyan-500/20 to-cyan-600/20",
      severity,
      recommendations: [
        ...(!hasAnomalies
          ? [
              "Current conditions support healthy aquatic life.",
              "Ecosystem appears in good ecological balance.",
            ]
          : [
              "Anomalies may impact fish and aquatic organisms.",
              "Implement mitigation measures to restore ecological health.",
            ]),
        ...(dissolved_oxygen < 5
          ? [
              "CRITICAL: Dissolved oxygen too low for most fish species. Immediate aeration required.",
              "Most fish require >5 mg/L; catfish can tolerate lower levels.",
            ]
          : dissolved_oxygen < 7
          ? [
              "Dissolved oxygen acceptable but suboptimal. Increase aeration to support diverse species.",
            ]
          : [
              "Excellent dissolved oxygen levels support diverse aquatic life.",
            ]),
        ...(ph < 6.5 || ph > 8.5
          ? ["pH outside optimal range (6.5-8.5) for most freshwater species."]
          : ["pH optimal for freshwater aquatic ecosystem."]),
        ...(salinity > 5
          ? ["High salinity unsuitable for freshwater fish - monitor carefully."]
          : ["Salinity levels appropriate for ecosystem type."]),
      ],
      concerns: [
        ...(dissolved_oxygen < 5 ? ["CRITICAL: Inadequate oxygen for fish survival"] : []),
        ...(ph < 6.5 || ph > 8.5 ? ["pH stress on aquatic organisms"] : []),
        ...(turbidity > 5 ? ["Reduced light penetration affects aquatic plants"] : []),
        ...(salinity > 5 ? ["High salinity affects freshwater species"] : []),
      ].filter(Boolean),
    },
  ];

  return experts;
}

interface ExpertRecommendationsProps {
  analysis: Analysis;
}

export function ExpertRecommendations({ analysis }: ExpertRecommendationsProps) {
  const experts = generateExpertRecommendations(analysis);

  const iconMap: Record<string, React.ReactNode> = {
    "🎓": <GraduationCap className="w-5 h-5" />,
    "⚗️": <Beaker className="w-5 h-5" />,
    "🐟": <Fish className="w-5 h-5" />,
  };

  const cardColorMap: Record<string, string> = {
    "from-blue-500/20 to-blue-600/20": "border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-blue-600/10",
    "from-emerald-500/20 to-emerald-600/20":
      "border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10",
    "from-cyan-500/20 to-cyan-600/20": "border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-cyan-600/10",
  };

  const iconColorMap: Record<string, string> = {
    "from-blue-500/20 to-blue-600/20": "bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 border border-blue-200/30",
    "from-emerald-500/20 to-emerald-600/20": "bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-600 border border-emerald-200/30",
    "from-cyan-500/20 to-cyan-600/20": "bg-gradient-to-br from-cyan-50 to-cyan-100 text-cyan-600 border border-cyan-200/30",
  };

  const severityColors: Record<string, string> = {
    low: "text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-500/10",
    medium: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10",
    high: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10",
  };

  return (
    <div className="space-y-4">
      {experts.map((expert, idx) => (
        <motion.div
          key={expert.expert}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
          className={cn(
            "rounded-lg border-2 p-6 shadow-brutal-sm",
            cardColorMap[expert.color as keyof typeof cardColorMap]
          )}
        >
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-lg shadow-sm",
                  iconColorMap[expert.color as keyof typeof iconColorMap]
                )}
              >
                {iconMap[expert.icon as keyof typeof iconMap]}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {expert.expert}
                </p>
                <h3 className="font-semibold text-foreground">{expert.title}</h3>
              </div>
            </div>
            <span
              className={cn(
                "inline-flex items-center gap-2 text-sm font-semibold px-3 py-1 rounded-full whitespace-nowrap",
                severityColors[expert.severity]
              )}
            >
              {expert.severity === "high"
                ? "⚠️ High Priority"
                : expert.severity === "medium"
                ? "⚠️ Medium Priority"
                : "✓ Low Priority"}
            </span>
          </div>

          {expert.concerns.length > 0 && (
            <div className="mb-4">
              <div className="flex items-start gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold uppercase text-muted-foreground">Identified Concerns:</p>
                  <ul className="mt-2 space-y-2">
                    {expert.concerns.map((concern, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-warning mt-0.5">•</span>
                        <span>{concern}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
              Expert Recommendations:
            </p>
            <ul className="space-y-3">
              {expert.recommendations.map((rec, i) => (
                <li key={i} className="text-sm text-foreground flex gap-3 items-start">
                  <span className="flex-shrink-0 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <ArrowRight className="w-3 h-3" />
                  </span>
                  <span className="mt-0.5">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
