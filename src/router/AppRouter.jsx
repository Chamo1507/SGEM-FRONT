import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Dashboard from "../pages/Dashboard";
import ReporteEvento from "../pages/ReporteEvento";
import Home from "../pages/Home";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="eventos/dashboard" element={<Dashboard />} />
          <Route path="eventos/reporte/:id" element={<ReporteEvento />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { AppRouter };
