import { Link } from "@tanstack/react-router";
import { Droplets } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 glass">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-accent shadow-glow">
            <Droplets className="h-5 w-5 text-white" />
          </div>
          <span className="font-display text-lg font-semibold tracking-tight">
            Aqua<span className="text-gradient">Nex</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Features</a>
          <a href="#how" className="text-sm text-muted-foreground transition-colors hover:text-foreground">How it works</a>
          <a href="#pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Pricing</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="hidden text-sm font-medium text-foreground/80 transition-colors hover:text-foreground sm:inline-flex">
            Dashboard
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center rounded-lg gradient-accent px-4 py-2 text-sm font-medium text-white shadow-soft transition-all hover:shadow-glow active:scale-[0.97]"
          >
            Launch app
          </Link>
        </div>
      </div>
    </header>
  );
}
