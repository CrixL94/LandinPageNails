import { Divider } from "primereact/divider";
import { Sidebar } from "primereact/sidebar";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Inicio", path: "/", icon: "pi pi-home" },
    { name: "Sobre mí", path: "/sobremi", icon: "pi pi-user" },
    { name: "Servicios", path: "/servicios", icon: "pi pi-cog" },
    { name: "Galería", path: "/galeria", icon: "pi pi-images" },
    { name: "Contacto", path: "/contacto", icon: "pi pi-envelope" },
  ];

  const toggleMenu = () => setOpen(!open);

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <h1 className="text-xl font-bold text-pink-600">Nail`s Art Suray</h1>

          {/* Menú desktop */}
          <nav className="hidden md:flex gap-6">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-2 py-1 text-gray-700 hover:text-pink-600 transition ${
                    isActive ? "font-semibold text-pink-600" : ""
                  }`
                }
              >
                <i className={link.icon}></i> {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Botón hamburguesa para móviles */}
          <button
            className="md:hidden text-gray-700 text-xl"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <i className="pi pi-bars" />
          </button>
        </div>

        <Sidebar visible={open} onHide={() => setOpen(false)} position="right">
          <div className="flex flex-col gap-4 text-center">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-2 py-1 text-gray-700 hover:text-pink-600 transition ${
                    isActive ? "font-semibold text-pink-600" : ""
                  }`
                }
                >
                <i className={link.icon}></i> {link.name}
              </NavLink>
            ))}
          </div>
        </Sidebar>
      </div>
    </header>
  );
};

export default Navbar;
