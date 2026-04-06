import { NavLink } from "react-router-dom";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/transactions", label: "Transactions" },
  { to: "/insights", label: "Insights" },
];

const Sidebar = () => {
  return (
    <aside className="sticky top-0 h-screen w-64 shrink-0 border-r border-gray-800 bg-[#0f172a] p-5">
      <h2 className="text-xl font-bold tracking-tight mb-1">Fintrack</h2>
      <p className="text-xs text-slate-500 mb-8">Finance Dashboard</p>

      <nav className="flex flex-col gap-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `px-3 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-all duration-150 ${
                isActive
                  ? "bg-[#1e293b] text-white"
                  : "text-gray-400 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
