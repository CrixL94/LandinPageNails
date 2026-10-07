import { useEffect, useRef, useState } from "react";
import { NEGOCIO, comoLlegarUrl } from "../Services/infoNegocio";

const MapView = () => {
  const { lat, lng } = NEGOCIO.coordenadas;
  const contenedorRef = useRef(null);
  const [cargar, setCargar] = useState(false);

  // El iframe de Google Maps pesa bastante: se crea solo al acercarse a la sección
  useEffect(() => {
    const el = contenedorRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCargar(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="card-soft overflow-hidden">
      <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <p className="eyebrow mb-2">Ubicación</p>
          <h2 className="heading-md">{NEGOCIO.direccion}</h2>
          <p className="mt-1 text-sm text-ink-500">{NEGOCIO.ciudad}</p>
        </div>
        <a
          href={comoLlegarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost self-start sm:self-auto"
        >
          <i className="pi pi-directions" />
          Cómo llegar
        </a>
      </div>
      <div ref={contenedorRef} className="h-[340px] w-full bg-sand sm:h-[420px]">
        {cargar && (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4734.356458483754!2d-88.19070592411681!3d15.343742158449471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f668b00085d0307%3A0x782b87f112d88390!2sNails%20Art%20Suray!5e1!3m2!1ses!2shn!4v1754399753730!5m2!1ses!2shn"
          width="100%"
          height="100%"
          style={{ border: 0, filter: "grayscale(0.55) sepia(0.12) contrast(0.95)" }}
          src={`https://www.google.com/maps?q=${lat},${lng}&hl=es&z=17&output=embed`}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mapa de ubicación"
        />
        )}
      </div>
    </div>
  );
};

export default MapView;
