import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Droplets,
  ShieldCheck,
  Activity,
  Microscope,
  ArrowRight,
  Sparkles,
  Beaker,
  LineChart,
  CheckCircle2,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AquaNex AI — Intelligent water quality analysis" },
      { name: "description", content: "Upload sensor data and let AquaNex AI score water quality, flag contaminants, and surface trends in seconds." },
      { property: "og:title", content: "AquaNex AI — Intelligent water quality analysis" },
      { property: "og:description", content: "AI-powered water quality scoring, contaminant detection, and trend analytics for labs and utilities." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Microscope, title: "Contaminant detection", body: "Automated screening across heavy metals, microbial indicators, and chemical residues with confidence scores." },
  { icon: Activity, title: "Real-time scoring", body: "Composite Water Quality Index updated as new readings stream in from your sensors or lab uploads." },
  { icon: LineChart, title: "Trend intelligence", body: "Spot drift in pH, turbidity, and dissolved oxygen weeks before it becomes a compliance event." },
  { icon: ShieldCheck, title: "Compliance ready", body: "Aligned to WHO and EPA reference thresholds with audit-friendly export to PDF and CSV." },
];

const steps = [
  { n: "01", title: "Upload data", body: "Drop a CSV or connect your IoT sensor stream. We auto-detect schema and units." },
  { n: "02", title: "AI analysis", body: "Our model scores 14 quality parameters and flags anomalies against regional thresholds." },
  { n: "03", title: "Decide & report", body: "Review interactive dashboards, export branded reports, and share with your team." },
];

function Landing() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero">
        <div className="mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-6 lg:px-8 lg:pt-28">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              New: anomaly detection v2 is live
            </div>
            <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Water quality, <span className="text-gradient">decoded by AI</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              AquaNex turns raw lab readings and sensor streams into clear quality scores, contaminant alerts, and trend insights — so your team can act before problems surface.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/dashboard"
                className="group inline-flex items-center justify-center gap-2 rounded-xl gradient-accent px-6 py-3 text-sm font-semibold text-white shadow-glow transition-all hover:-translate-y-0.5 active:scale-[0.98]"
              >
                Open dashboard
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-soft transition-all hover:bg-secondary"
              >
                See how it works
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              {["WHO drinking water standards", "EPA reporting", "ISO/IEC 17025 friendly"].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-success" /> {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Hero preview card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative mx-auto mt-16 max-w-5xl"
          >
            <div className="absolute inset-x-12 -bottom-6 h-24 rounded-full bg-accent/30 blur-3xl" />
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-elevated">
              <div className="flex items-center gap-1.5 border-b border-border bg-secondary/40 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
                <span className="ml-3 text-xs text-muted-foreground">app.aquanex.ai/dashboard</span>
              </div>
              <div className="grid gap-4 p-6 sm:grid-cols-3">
                {[
                  { label: "Quality Index", value: "92.4", tone: "from-success/20 to-success/5", icon: Droplets },
                  { label: "Active sensors", value: "128", tone: "from-accent/20 to-accent/5", icon: Activity },
                  { label: "Alerts (24h)", value: "3", tone: "from-warning/25 to-warning/5", icon: Beaker },
                ].map((c) => (
                  <div key={c.label} className={`rounded-xl bg-gradient-to-br ${c.tone} p-4`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{c.label}</span>
                      <c.icon className="h-4 w-4 text-foreground/70" />
                    </div>
                    <div className="mt-2 font-display text-3xl font-semibold">{c.value}</div>
                  </div>
                ))}
                <div className="sm:col-span-3 rounded-xl border border-border bg-background/40 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-medium">Quality trend · 7 days</span>
                    <span className="text-xs text-muted-foreground">live</span>
                  </div>
                  <svg viewBox="0 0 600 120" className="h-28 w-full">
                    <defs>
                      <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="oklch(0.66 0.11 195)" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="oklch(0.66 0.11 195)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,90 C60,70 100,40 160,55 C220,70 260,30 320,40 C380,50 420,80 480,60 C540,40 580,55 600,50 L600,120 L0,120 Z" fill="url(#g1)" />
                    <path d="M0,90 C60,70 100,40 160,55 C220,70 260,30 320,40 C380,50 420,80 480,60 C540,40 580,55 600,50" fill="none" stroke="oklch(0.55 0.13 240)" strokeWidth="2.5" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Everything your water team needs
          </h2>
          <p className="mt-4 text-muted-foreground">
            Purpose-built analytics for utilities, environmental labs, and industrial monitoring teams.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="hover-lift group rounded-2xl border border-border bg-card p-6 shadow-soft"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl gradient-accent text-white shadow-soft transition-transform group-hover:scale-105">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-base font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-t border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">From sample to insight in three steps</h2>
            <p className="mt-4 text-muted-foreground">No setup, no data engineering. Bring your readings — we handle the rest.</p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="relative rounded-2xl border border-border bg-card p-7 shadow-soft"
              >
                <div className="font-display text-5xl font-semibold text-gradient">{s.n}</div>
                <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="pricing" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 shadow-elevated sm:p-16">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/25 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
          <div className="relative grid items-center gap-8 md:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Cleaner water starts with clearer data
              </h2>
              <p className="mt-4 max-w-lg text-muted-foreground">
                Start free with up to 1,000 readings per month. No credit card required.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 md:items-end">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-xl gradient-accent px-6 py-3 text-sm font-semibold text-white shadow-glow transition-all hover:-translate-y-0.5 active:scale-[0.98]"
              >
                Get started free <ArrowRight className="h-4 w-4" />
              </Link>
              <span className="text-xs text-muted-foreground">14-day Pro trial · cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-accent" />
            © {new Date().getFullYear()} AquaNex AI. All rights reserved.
          </div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
