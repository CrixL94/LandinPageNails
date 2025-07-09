import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home";
import AboutUs from "../Pages/AboutUs";
import ScrollToTop from "../Components/ScrollToTop";
import Servicios from "../Pages/Servicios";

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
