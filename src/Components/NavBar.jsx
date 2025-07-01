import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Inicio", path: "/" },
    { name: "Servicios", path: "/servicios" },
    { name: "Galería", path: "/galeria" },
    { name: "Contacto", path: "/contacto" },
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
                className={({ isActive }) =>
                  `text-gray-700 hover:text-pink-600 transition ${
                    isActive ? "font-semibold text-pink-600" : ""
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Botón hamburguesa para móviles */}
          <button
            className="md:hidden text-gray-700 text-xl"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <i className={`pi ${open ? "pi-times" : "pi-bars"}`}></i>
          </button>
        </div>

        {/* Menú móvil */}
        {open && (
          <div className="md:hidden mt-2 space-y-2 pb-4">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-2 py-1 text-gray-700 hover:text-pink-600 transition ${
                    isActive ? "font-semibold text-pink-600" : ""
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

