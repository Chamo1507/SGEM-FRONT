import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
export { AppRouter };
