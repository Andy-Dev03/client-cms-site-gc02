import { NavLink } from "react-router";

const Sidebar = ({ handleLogout }) => {
  return (
    <div className="sticky top-0 h-screen w-64 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-6 overflow-y-auto flex flex-col">
      <div className="mb-8">
        <h1 className="font-bold text-2xl">CMS Admin</h1>
      </div>

      <nav className="space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center px-3 py-3 rounded-lg transition-colors duration-200 ${
              isActive
                ? "bg-gray-800 text-white shadow-lg"
                : "hover:bg-gray-800 hover:text-white"
            }`
          }
        >
          <i className="fa-solid fa-list-ul mr-3 w-5"></i>
          <span>Entity List</span>
        </NavLink>

        <NavLink
          to="/create"
          className={({ isActive }) =>
            `flex items-center px-3 py-3 rounded-lg transition-colors duration-200 ${
              isActive
                ? "bg-gray-800 text-white shadow-lg"
                : "hover:bg-gray-800 hover:text-white"
            }`
          }
        >
          <i className="fa-solid fa-plus mr-3 w-5"></i>
          <span>Create Entity</span>
        </NavLink>

        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex items-center px-3 py-3 rounded-lg transition-colors duration-200 ${
              isActive
                ? "bg-gray-800 text-white shadow-lg"
                : "hover:bg-gray-800 hover:text-white"
            }`
          }
        >
          <i className="fa-solid fa-user-plus mr-3 w-5"></i>
          <span>Add User</span>
        </NavLink>
      </nav>

      <a
        href="https://public.andylie.web.id"
        onClick={handleLogout}
        className="mt-auto flex items-center px-3 py-3 rounded-lg text-red-400 hover:text-white hover:bg-red-600 transition-colors duration-200"
      >
        <i className="fa-solid fa-right-from-bracket mr-3 w-5"></i>
        <span>Logout</span>
      </a>
    </div>
  );
};

export default Sidebar;
