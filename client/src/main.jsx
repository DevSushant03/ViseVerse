import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Applayout from "./layout/Applayout";
import App from "./pages/App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgetPasswordFlow from "./pages/ForgetPasswordFlow";
import { ToastContainer } from "react-toastify";
import { AppContextProvider } from "./context/AppContext";
import Pricing from "./pages/Pricing";
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
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "pricing",
        element: <Pricing />,
      },
      {
        path: "forgetpassword",
        element: <ForgetPasswordFlow />,
      },
      
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  </StrictMode>
);
