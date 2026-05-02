import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Droplets,
  Activity,
  AlertTriangle,
  FlaskConical,
  Search,
  Filter,
  Download,
  ArrowUpRight,
} from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { KpiCard } from "@/components/KpiCard";
import { TrendChart } from "@/components/charts/TrendChart";
import { QualityDoughnut } from "@/components/charts/QualityDoughnut";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — AquaNex AI" },
      { name: "description", content: "Monitor water quality scores, sensor health, and recent analyses across all your sites." },
    ],
  }),
  component: Dashboard,
});

const recent = [
  { id: "WQ-2841", site: "Lakeside Plant 3", score: 94.2, status: "Excellent", date: "May 2, 09:14", flagged: 0 },
  { id: "WQ-2840", site: "River Intake A", score: 78.6, status: "Good", date: "May 2, 08:02", flagged: 1 },
  { id: "WQ-2839", site: "Industrial Outflow", score: 51.4, status: "Poor", date: "May 1, 22:48", flagged: 4 },
  { id: "WQ-2838", site: "Reservoir East", score: 88.1, status: "Good", date: "May 1, 18:30", flagged: 0 },
  { id: "WQ-2837", site: "Wellfield 12", score: 71.9, status: "Fair", date: "May 1, 14:05", flagged: 2 },
];

const statusTone: Record<string, string> = {
  Excellent: "bg-success/10 text-success",
  Good: "bg-accent/15 text-accent",
  Fair: "bg-warning/15 text-warning",
  Poor: "bg-destructive/10 text-destructive",
};

function Dashboard() {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />

      <main className="flex-1 overflow-x-hidden">
        {/* Top bar */}
        <div className="sticky top-0 z-30 glass">
          <div className="flex h-16 items-center justify-between gap-4 px-6">
            <div>
              <h1 className="font-display text-lg font-semibold tracking-tight">Dashboard</h1>
              <p className="text-xs text-muted-foreground">Live overview · 128 active sensors</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative hidden sm:block">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  placeholder="Search analyses, sites…"
                  className="h-9 w-72 rounded-lg border border-input bg-background pl-9 pr-3 text-sm outline-none transition-all focus:border-ring focus:ring-2 focus:ring-ring/30"
                />
              </div>
              <button className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-input bg-background px-3 text-sm font-medium transition-colors hover:bg-secondary">
                <Filter className="h-4 w-4" /> Filter
              </button>
              <button className="inline-flex h-9 items-center gap-1.5 rounded-lg gradient-accent px-3 text-sm font-medium text-white shadow-soft transition-all hover:shadow-glow active:scale-[0.97]">
                <Download className="h-4 w-4" /> Export
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl space-y-6 px-6 py-6">
          {/* KPIs */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <KpiCard label="Quality Index" value="92.4" delta={2.4} icon={Droplets} tone="success" delay={0} />
            <KpiCard label="Avg pH" value="7.32" delta={0.8} icon={FlaskConical} tone="accent" delay={0.05} />
            <KpiCard label="Active sensors" value="128" delta={4.1} icon={Activity} tone="primary" delay={0.1} />
            <KpiCard label="Alerts (24h)" value="3" delta={-12.5} icon={AlertTriangle} tone="warning" delay={0.15} />
          </div>

          {/* Charts */}
          <div className="grid gap-4 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="rounded-2xl border border-border bg-card p-5 shadow-soft lg:col-span-2"
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h2 className="font-display text-base font-semibold">Quality trends</h2>
                  <p className="text-xs text-muted-foreground">pH and turbidity, last 7 days</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
                  <ArrowUpRight className="h-3 w-3" /> stable
                </span>
              </div>
              <div className="h-72">
                <TrendChart />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="rounded-2xl border border-border bg-card p-5 shadow-soft"
            >
              <div className="mb-4">
                <h2 className="font-display text-base font-semibold">Quality distribution</h2>
                <p className="text-xs text-muted-foreground">Across 128 sites</p>
              </div>
              <div className="h-72">
                <QualityDoughnut />
              </div>
            </motion.div>
          </div>

          {/* Recent analyses */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="rounded-2xl border border-border bg-card shadow-soft"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div>
                <h2 className="font-display text-base font-semibold">Recent analyses</h2>
                <p className="text-xs text-muted-foreground">Latest sample results across all sites</p>
              </div>
              <button className="text-xs font-medium text-accent hover:underline">View all</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="px-5 py-3 font-medium">Analysis</th>
                    <th className="px-5 py-3 font-medium">Site</th>
                    <th className="px-5 py-3 font-medium">Score</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium">Flagged</th>
                    <th className="px-5 py-3 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((r) => (
                    <tr key={r.id} className="border-b border-border/60 transition-colors last:border-0 hover:bg-secondary/40">
                      <td className="px-5 py-3.5 font-mono text-xs text-foreground/80">{r.id}</td>
                      <td className="px-5 py-3.5 font-medium">{r.site}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
                            <div
                              className="h-full rounded-full gradient-accent"
                              style={{ width: `${r.score}%` }}
                            />
                          </div>
                          <span className="font-medium tabular-nums">{r.score.toFixed(1)}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusTone[r.status]}`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-muted-foreground">
                        {r.flagged > 0 ? (
                          <span className="inline-flex items-center gap-1 text-warning">
                            <AlertTriangle className="h-3.5 w-3.5" /> {r.flagged}
                          </span>
                        ) : (
                          <span className="text-success">—</span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-muted-foreground">{r.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
