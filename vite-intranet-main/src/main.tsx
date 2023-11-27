/* eslint-disable react-refresh/only-export-components */
import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./style/style.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const Weekend = lazy(() => import("./pages/service/weekend/weekend.tsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "service/weekend",
        element: <Weekend />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
