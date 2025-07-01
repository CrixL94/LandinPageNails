import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white shadow-md py-4">
        <div className="text-center">
            <p className="text-sm text-gray-500">
                © {year} Nails Art Suray. Todos los derechos reservados.
            </p>
        </div>
    </footer>
  );
};

export default Footer;
