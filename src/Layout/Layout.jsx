import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/NavBar"
import Footer from "../Components/Footer";
import WhatsAppFab from "../Components/WhatsAppFab";
import PageLoader from "../Components/PageLoader";

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <Navbar />

      <main className="flex-1">
        {/* Mientras se descarga una página, el menú y el footer siguen visibles */}
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>

      <Footer/>
      <WhatsAppFab />
    </div>
  );
};

export default Layout;
