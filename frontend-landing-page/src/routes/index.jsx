import { createBrowserRouter, redirect } from "react-router-dom";

import BaseLayout from "../layouts/BaseLayout.jsx";
import Products from '../views/Products.jsx';
import ProductDetail from "../views/ProductDetail.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        path: "",
        element: <Products />
      },
      {
        path: "/:slug",
        element: <ProductDetail />
      }
    ]
  }
]);