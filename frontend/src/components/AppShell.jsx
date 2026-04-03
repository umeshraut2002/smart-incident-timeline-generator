import { NavLink } from "react-router-dom";

const navItemClass = ({ isActive }) =>
  [
    "rounded-full px-4 py-2 text-sm font-medium transition",
    isActive
      ? "bg-sky-400/20 text-sky-200 ring-1 ring-sky-300/30"
      : "text-slate-300 hover:bg-white/5 hover:text-white"
  ].join(" ");

export function AppShell({ children }) {
  return (
    <div className="min-h-screen bg-grid bg-[size:48px_48px]">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-[28px] border border-white/10 bg-slate-950/70 p-6 shadow-panel backdrop-blur-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.32em] text-sky-200/70">Incident Intelligence Workspace</p>
              <h1 className="text-3xl font-semibold text-white">Smart Incident Timeline Generator</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-300">
                Upload raw logs, turn them into a time-ordered incident narrative, and surface anomalies before they hide in the noise.
              </p>
            </div>
            <nav className="flex flex-wrap gap-2 rounded-full border border-white/10 bg-white/5 p-2">
              <NavLink to="/" className={navItemClass} end>
                Upload
              </NavLink>
              <NavLink to="/timeline" className={navItemClass}>
                Timeline
              </NavLink>
              <NavLink to="/report" className={navItemClass}>
                Report
              </NavLink>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
