import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import FormularioEventos from "../components/FormularioEventos";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}></Route>
        <Route path="/prueba" element={<FormularioEventos />} />
      </Routes>
    </BrowserRouter>
  );
};
export { AppRouter };
