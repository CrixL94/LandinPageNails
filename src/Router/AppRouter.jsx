import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home";
import AboutUs from "../Pages/AboutUs";
import ScrollToTop from "../Components/ScrollToTop";
import Servicios from "../Pages/Servicios";
import Contacto from "../Pages/Contacto";
import Galeria from "../Pages/Galeria";
import Testimonios from "../Pages/Testimonios";

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
