import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router";

const RootLayout = () => {
  const handleLogout = () => {
    localStorage.clear();
  };
  return (
    <>
      {/* When under md view */}
      <div className="md:hidden bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="font-bold text-xl">CMS Admin</h1>
        <a
          href="https://client-public-site-gc02.vercel.app/"
          onClick={handleLogout}
          className="flex items-center px-2 py-3 rounded-lg text-red-400 hover:text-white hover:bg-red-600 transition-colors duration-200 text-sm"
        >
          <i className="fa-solid fa-right-from-bracket mr-2"></i>
          <span>Logout</span>
        </a>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:block">
          <Sidebar handleLogout={handleLogout} />
        </div>

        {/* Main content area */}
        <div className="flex-1 min-w-0 ">
          <Outlet />
        </div>
      </div>

      {/* When under md view */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white ">
        <nav className="flex justify-around py-2">
          <Link to={"/"} className="flex flex-col items-center p-2 text-xs">
            <i className="fa-solid fa-list-ul text-lg mb-1"></i>
            <span>List</span>
          </Link>
          <Link
            to={"/create"}
            className="flex flex-col items-center p-2 text-xs"
          >
            <i className="fa-solid fa-plus text-lg mb-1"></i>
            <span>Create</span>
          </Link>
          <Link to={"/add"} className="flex flex-col items-center p-2 text-xs">
            <i className="fa-solid fa-user-plus text-lg mb-1"></i>
            <span>Add User</span>
          </Link>
        </nav>
      </div>
    </>
  );
};

export default RootLayout;
