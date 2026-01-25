import { Outlet } from "react-router-dom";
import "../App.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Applayout() {
  return (
    <>
      <Navbar />
      <ToastContainer position="top-center" />
      <Outlet />
      <Footer/>
    </>
  );
}
