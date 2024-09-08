import { createBrowserRouter, redirect } from "react-router-dom";

import BaseLayout from "../layouts/BaseLayout.jsx";
import Login from '../views/Login.jsx';
import Register from '../views/Register.jsx';
import CMS from "../views/CMS.jsx";
import ProductDetail from "../views/ProductDetail.jsx";
// import FormAddEditProduct from "../components/FormAddEditProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    loader: () => {
      if (!localStorage.getItem("access_token")) throw redirect("/login");
      return null;
    },
    children: [
      {
        path: "",
        element: <CMS />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "products/:id",
        element: <ProductDetail />
      }
      // {
      //   path: "/products/add",
      //   element: <FormAddEditProduct />
      // },
      // {
      //   path: "/products/edit",
      //   element: <FormAddEditProduct />
      // }
    ]
  },
  {
    path: "/login",
    element: <BaseLayout />,
    loader: () => {
      if (localStorage.getItem("access_token")) throw redirect("/");
      return null;
    },
    children: [
      {
        path: "",
        element: <Login />
      }
    ]
  }
]);