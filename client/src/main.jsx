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
import ErrorPage from "./pages/ErrorPage";
import PdfSummarizer from "./pages/SEO/PdfSummarizer";
import ImageToText from "./pages/SEO/ImageToText";
import Features from "./pages/SEO/Features";
import About from "./pages/SEO/About";
import Tools from "./pages/SEO/Tools";
import Contact from "./pages/SEO/Contact";
import HowItsWork from "./pages/SEO/HowItsWork";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Applayout />,
    errorElement: <ErrorPage message="Page not find" />,
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
      {
        path: "pdf-summarizer",
        element: <PdfSummarizer />,
      },
      {
        path: "image-to-text",
        element: <ImageToText />,
      },
      {
        path: "features",
        element: <Features />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "tools",
        element: <Tools />,
      },
      {
        path: "how-its-work",
        element: <HowItsWork />,
      },
      {
        path: "contact",
        element: <Contact />,
      },

    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppContextProvider>
        <RouterProvider router={router} />
    </AppContextProvider>
  </StrictMode>,
);
