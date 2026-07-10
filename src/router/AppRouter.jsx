import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import FormularioEventos from "../components/FormularioEventos";
import Configuracion from "../pages/Configuracion";
import MainLayout from "../layout/MainLayout";
import Dashboard from "../pages/Dashboard";
import ReporteEvento from "../pages/ReporteEvento";
import ProximosEventos from "../pages/ProximosEventos";
import ConfirmarAsistencia from "../pages/ConfirmarAsistencia";
import EncuestaInvitado from "../pages/EncuestaInvitado";
import EncuestaOrganizador from "../pages/EncuestaOrganizador";
import Inventario from "../components/Inventario";
import CProveedores from "../components/CProveedores";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/register" element={<Register />} />
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/configuracion" element={<Configuracion />} />
          <Route path="/eventos/proximos" element={<ProximosEventos />} />
          <Route path="/eventos/dashboard" element={<Dashboard />} />
          <Route path="/eventos/reporte/:id" element={<ReporteEvento />} />
          <Route path="/eventos/confirmar" element={<ConfirmarAsistencia />} />
          <Route
            path="/eventos/encuesta-invitado"
            element={<EncuestaInvitado />}
          />
          <Route
            path="/eventos/encuesta-organizador"
            element={<EncuestaOrganizador />}
          />
          <Route path="/eventos/inventario" element={<Inventario />} />
          <Route path="/eventos/proveedores" element={<CProveedores />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { AppRouter };
