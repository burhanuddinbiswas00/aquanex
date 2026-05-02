import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Upload,
  FlaskConical,
  History,
  Settings,
  ChevronLeft,
  Droplets,
} from "lucide-react";
import { motion } from "framer-motion";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/dashboard", label: "Upload", icon: Upload },
  { to: "/dashboard", label: "Analyses", icon: FlaskConical },
  { to: "/dashboard", label: "History", icon: History },
  { to: "/dashboard", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <motion.aside
      animate={{ width: collapsed ? 76 : 248 }}
      transition={{ type: "spring", stiffness: 220, damping: 26 }}
      className="sticky top-0 hidden h-screen shrink-0 border-r border-sidebar-border bg-sidebar md:block"
    >
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 overflow-hidden">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl gradient-accent shadow-glow">
              <Droplets className="h-5 w-5 text-white" />
            </div>
            {!collapsed && (
              <span className="font-display text-lg font-semibold tracking-tight">
                Aqua<span className="text-gradient">Nex</span>
              </span>
            )}
          </Link>
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
            aria-label="Toggle sidebar"
          >
            <ChevronLeft className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180" : ""}`} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {items.map((it) => {
            const active = path === it.to && it.label === "Dashboard";
            const Icon = it.icon;
            return (
              <Link
                key={it.label}
                to={it.to}
                className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                  active
                    ? "gradient-accent text-white shadow-soft"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span className="truncate">{it.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-sidebar-border p-3">
          <div className={`flex items-center gap-3 rounded-lg p-2 ${collapsed ? "justify-center" : ""}`}>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full gradient-primary text-sm font-semibold text-white">
              JL
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">Jordan Lee</div>
                <div className="truncate text-xs text-muted-foreground">Lab analyst</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
