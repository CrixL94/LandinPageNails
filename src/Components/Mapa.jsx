import { NEGOCIO, comoLlegarUrl } from "../Services/infoNegocio";

const MapView = () => {
  const { lat, lng } = NEGOCIO.coordenadas;

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
      <div className="h-[340px] w-full sm:h-[420px]">
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0, filter: "grayscale(0.55) sepia(0.12) contrast(0.95)" }}
          src={`https://www.google.com/maps?q=${lat},${lng}&hl=es&z=17&output=embed`}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mapa de ubicación"
        />
      </div>
    </div>
  );
};

export default MapView;
