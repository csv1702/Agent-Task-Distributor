import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClass =
    "block px-4 py-2 rounded transition hover:bg-gray-200 hover:pl-6";

  return (
    <aside className="w-64 bg-white border-r min-h-screen">
      <div className="p-5 font-bold text-xl border-b">Admin Panel</div>

      <nav className="p-4 space-y-2">
        <NavLink to="/" className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/agents" className={linkClass}>
          Agents
        </NavLink>
        <NavLink to="/upload" className={linkClass}>
          Upload CSV
        </NavLink>
        <NavLink to="/distribution" className={linkClass}>
          Distribution
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
