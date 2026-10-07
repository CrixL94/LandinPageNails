import { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home";
import AboutUs from "../Pages/AboutUs";
import ScrollToTop from "../Components/ScrollToTop";
import Contacto from "../Pages/Contacto";

// Home ya incluye AboutUs y Contacto; el resto de páginas se descarga al visitarlas
const Servicios = lazy(() => import("../Pages/Servicios"));
const Galeria = lazy(() => import("../Pages/Galeria"));
const Testimonios = lazy(() => import("../Pages/Testimonios"));

const AppRouter = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="aboutUs" element={<AboutUs />} />
          <Route path="servicios" element={<Servicios />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="galeria" element={<Galeria />} />
          <Route path="testimonios" element={<Testimonios />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
