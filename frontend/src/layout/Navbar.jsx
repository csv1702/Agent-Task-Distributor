import { logout } from "../utils/auth";

const Navbar = () => {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h1 className="font-semibold text-lg">Dashboard</h1>

      <button
        onClick={logout}
        className="text-sm bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        Logout
      </button>
    </header>
  );
};

export default Navbar;
