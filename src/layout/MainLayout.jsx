import { Outlet } from "react-router-dom";
import "./MainLayout.css";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div className="main-layour">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
