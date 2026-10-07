import { REDES } from "../Services/infoNegocio";

const SIZES = {
  sm: "h-9 w-9 text-sm",
  md: "h-11 w-11 text-base",
  lg: "h-14 w-14 text-xl",
};

const SocialIcons = ({ size = "md", className = "", light = false }) => (
  <div className={`flex flex-wrap gap-3 ${className}`}>
    {REDES.map((red) => {
      const externo = red.url.startsWith("http");
      return (
        <a
          key={red.nombre}
          href={red.url}
          aria-label={red.nombre}
          title={red.nombre}
          {...(externo && { target: "_blank", rel: "noopener noreferrer" })}
          className={`flex items-center justify-center rounded-full border transition duration-300 hover:-translate-y-0.5 ${SIZES[size]} ${
            light
              ? "border-white/25 text-white/85 hover:border-white hover:bg-white hover:text-brand-700"
              : "border-brand-200 text-brand-600 hover:border-brand-600 hover:bg-brand-600 hover:text-white"
          }`}
        >
          <i className={red.icono} />
        </a>
      );
    })}
  </div>
);

export default SocialIcons;
