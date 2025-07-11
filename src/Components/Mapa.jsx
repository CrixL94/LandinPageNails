import { Card } from "primereact/card";

const MapView = () => {
  return (
    <Card className="w-full mx-auto my-6 shadow-lg">
      <h2 className="text-xl font-semibold text-center py-4">
        Nuestra Ubicación
      </h2>
      <div className="h-[400px] w-full">
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          src="https://www.google.com/maps?q=15.34375,-88.18811&hl=es&z=18&output=embed"
          allowFullScreen
          aria-hidden="false"
          tabIndex="0"
          title="Mapa de ubicación"
        />
      </div>
      <div className="text-center mt-4">
        <a
          href="https://www.google.com/maps?q=15.34375,-88.18811"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-600 hover:underline font-medium"
        >
          Abrir en Google Maps
        </a>
      </div>
    </Card>
  );
};

export default MapView;

