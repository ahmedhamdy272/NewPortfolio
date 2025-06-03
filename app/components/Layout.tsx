import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="container mx-auto max-w-7xl">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
