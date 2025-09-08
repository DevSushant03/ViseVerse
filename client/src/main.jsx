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
import ProfilePage from "./pages/ProfilePage";
import { AppContextProvider } from "./context/AppContext";
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
        path: "forgetpassword",
        element: <ForgetPasswordFlow />,
      },
      {
        path: "profilepage",
        element: <ProfilePage />,
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
