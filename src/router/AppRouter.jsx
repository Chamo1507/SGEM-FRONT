import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import Home from "../pages/Home";
import Configuracion from "../pages/Configuracion";
import MainLayout from "../layout/MainLayout";
import Dashboard from "../pages/Dashboard";
import ReporteEvento from "../pages/ReporteEvento";
import ProximosEventos from "../pages/ProximosEventos";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/configuracion" element={<Configuracion />} />
          <Route path="/eventos/proximos" element={<ProximosEventos />} />
          <Route path="/eventos/dashboard" element={<Dashboard />} />
          <Route path="/eventos/reporte/:id" element={<ReporteEvento />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { AppRouter };
