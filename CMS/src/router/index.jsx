import { createBrowserRouter, redirect } from "react-router";
import Toastify from "toastify-js";

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
      if (!localStorage.accessToken) {
        Toastify({
          text: "Please login first",
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "bottom", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "#F87171",
            color: "black",
            border: "solid #000000",
            borderRadius: "8px",
            boxShadow: "2px 2px black",
          },
        }).showToast();
        redirect("/login");
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
