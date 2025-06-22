import { createBrowserRouter, redirect } from "react-router";

import Add from "../pages/Add.jsx";
import Admin from "../pages/Admin.jsx";
import Create from "../pages/Create.jsx";
import Login from "../pages/Login.jsx";
import Upload from "../pages/Upload.jsx";
import RootLayout from "../layouts/RootLayout.jsx";
import Edit from "../pages/Edit.jsx";

const Router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <RootLayout />,
    loader: () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <Admin />,
      },
      {
        path: "/:id",
        element: <Edit />,
      },
      {
        path: "/create",
        element: <Create />,
      },
      {
        path: "/upload/:id",
        element: <Upload />,
      },
      {
        path: "/add",
        element: <Add />,
      },
    ],
  },
]);

export default Router;
