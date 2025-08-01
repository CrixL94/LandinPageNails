import { Outlet } from "react-router-dom";
import Navbar from "../Components/NavBar"
import Footer from "../Components/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer/>
    </div>
  );
};

export default Layout;
