import { Outlet } from "react-router-dom";
import "../App.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export default function Applayout() {
  return (
    <>
        <Navbar />
        <Outlet />
        <Footer />
    </>
  );
}
