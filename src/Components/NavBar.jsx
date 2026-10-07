import { Sidebar } from "primereact/sidebar";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import BotonReservaCita from "./BottonReservarCita";
import SocialIcons from "./SocialIcons";
import { NAV_LINKS } from "../Services/infoNegocio";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/80 shadow-[0_1px_0_rgb(87_52_58/0.08)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="container-page">
        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? "h-16" : "h-20"}`}>
          <NavLink to="/" aria-label="Ir al inicio" className="shrink-0">
            <Logo className={`transition-all duration-300 ${scrolled ? "w-16" : "w-20"}`} />
          </NavLink>

          {/* Menú desktop */}
          <nav className="hidden items-center gap-8 md:flex" aria-label="Principal">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                className={({ isActive }) =>
                  `group relative py-1 text-sm tracking-wide transition-colors ${
                    isActive ? "text-brand-700" : "text-ink-600 hover:text-brand-700"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-px bg-brand-500 transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:block">
            <BotonReservaCita textoBoton="Reservar" className="px-6 py-2.5" />
          </div>

          {/* Botón hamburguesa para móviles */}
          <button
            className="flex h-11 w-11 items-center justify-center rounded-full text-ink-800 transition hover:bg-brand-50 md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
          >
            <i className="pi pi-bars text-lg" />
          </button>
        </div>
      </div>

      <Sidebar
        visible={open}
        onHide={() => setOpen(false)}
        position="right"
        blockScroll
        className="w-[85vw] max-w-sm"
        header={<Logo className="w-16" />}
      >
        <div className="flex h-full flex-col">
          <nav className="flex flex-col gap-1 pt-4" aria-label="Menú móvil">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `font-display border-b border-brand-100 py-3 text-3xl transition-colors ${
                    isActive ? "text-brand-600 italic" : "text-ink-800 hover:text-brand-600"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto space-y-6 pt-10">
            <BotonReservaCita textoBoton="Reserva tu cita" className="w-full" />
            <SocialIcons size="sm" />
          </div>
        </div>
      </Sidebar>
    </header>
  );
};

export default Navbar;
