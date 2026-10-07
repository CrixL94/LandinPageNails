import { Link } from "react-router-dom";
import Logo from "./Logo";
import SocialIcons from "./SocialIcons";
import { NAV_LINKS, NEGOCIO, mapsUrl } from "../Services/infoNegocio";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-900 text-white/70">
      <div className="container-page grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr]">
        <div>
          <div className="inline-block rounded-2xl bg-cream px-4 py-3">
            <Logo className="w-20" />
          </div>
          <p className="mt-6 max-w-xs text-sm leading-relaxed">
            Uñas acrílicas, diseños personalizados y cuidado profesional en un
            espacio pensado para ti.
          </p>
          <SocialIcons size="sm" light className="mt-6" />
        </div>

        <div>
          <h3 className="font-display mb-5 text-xl text-white">Explora</h3>
          <ul className="space-y-3 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="transition hover:text-white">
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/testimonios" className="transition hover:text-white">
                Deja tu reseña
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display mb-5 text-xl text-white">Visítanos</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <i className="pi pi-map-marker mt-0.5 text-brand-300" />
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
                {NEGOCIO.direccion}
                <br />
                {NEGOCIO.ciudad}
              </a>
            </li>
            <li className="flex gap-3">
              <i className="pi pi-clock mt-0.5 text-brand-300" />
              <span>
                {NEGOCIO.horario}
                <br />
                <span className="text-white/50">{NEGOCIO.nota}</span>
              </span>
            </li>
            <li className="flex gap-3">
              <i className="pi pi-phone mt-0.5 text-brand-300" />
              <a href={`tel:${NEGOCIO.telefono}`} className="transition hover:text-white">
                {NEGOCIO.telefonoVisible}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-6 text-center text-xs text-white/50">
          © {year} {NEGOCIO.nombre}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
