import { BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "../Layout/Layout";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="reservar" element={<ReservarCita />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;