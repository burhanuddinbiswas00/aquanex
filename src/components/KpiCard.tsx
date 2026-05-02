import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

interface Props {
  label: string;
  value: string;
  unit?: string;
  delta: number;
  icon: LucideIcon;
  tone?: "primary" | "accent" | "success" | "warning";
  delay?: number;
}

const toneMap: Record<NonNullable<Props["tone"]>, string> = {
  primary: "from-primary/15 to-primary/5 text-primary",
  accent: "from-accent/15 to-accent/5 text-accent",
  success: "from-success/15 to-success/5 text-success",
  warning: "from-warning/20 to-warning/5 text-warning",
};

export function KpiCard({ label, value, unit, delta, icon: Icon, tone = "accent", delay = 0 }: Props) {
  const positive = delta >= 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="hover-lift group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-soft"
    >
      <div className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${toneMap[tone]} opacity-70 blur-2xl`} />
      <div className="relative flex items-start justify-between">
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="font-display text-3xl font-semibold tracking-tight">{value}</span>
            {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
          </div>
          <div className={`mt-3 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${positive ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
            {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {positive ? "+" : ""}{delta}% vs last week
          </div>
        </div>
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${toneMap[tone]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  );
}
