import { useState, useRef, useEffect } from "react";
import { useFinanceStore } from "../../store/useFinanceStore";

const roles = ["admin", "viewer"] as const;

const Topbar = () => {
  const { role, setRole } = useFinanceStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="sticky top-0 z-20 h-14 border-b border-gray-800 bg-[#020617]/80 backdrop-blur-sm flex items-center justify-between px-6">
      <h1 className="text-sm font-medium text-slate-400">
        Welcome back
      </h1>

      <div ref={ref} className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 rounded-lg border border-gray-800 bg-[#0f172a] px-3 py-1.5 text-sm font-medium transition-colors hover:border-gray-700"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="capitalize">{role}</span>
          <svg
            className={`h-4 w-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {open && (
          <div className="absolute right-0 mt-1.5 w-36 rounded-lg border border-gray-800 bg-[#0f172a] py-1 shadow-xl">
            {roles.map((r) => (
              <button
                key={r}
                onClick={() => {
                  setRole(r);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 px-3 py-2 text-sm capitalize transition-colors ${
                  role === r
                    ? "text-white bg-[#1e293b]"
                    : "text-slate-400 hover:text-white hover:bg-[#1e293b]"
                }`}
              >
                {role === r && (
                  <svg className="h-3.5 w-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {r}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Topbar;
