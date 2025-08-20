import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Register from "./pages/register";
import Applayout from "./layout/Applayout";
import App from "./pages/App";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Applayout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "login",
        element: <Login/>,
      },
      {
        path: "register",
        element: <Register/>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
