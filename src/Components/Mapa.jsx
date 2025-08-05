import { Card } from "primereact/card";

const MapView = () => {
  return (
    <Card className="w-full mx-auto my-6 shadow-lg">
      <h2 className="text-xl font-semibold text-center py-4">
        Nuestra Ubicación
      </h2>
      <div className="h-[400px] w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4734.356458483754!2d-88.19070592411681!3d15.343742158449471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f668b00085d0307%3A0x782b87f112d88390!2sNails%20Art%20Suray!5e1!3m2!1ses!2shn!4v1754399753730!5m2!1ses!2shn"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowfullscreen
          loading="lazy"
          aria-hidden="false"
          tabIndex="0"
          referrerpolicy="no-referrer-when-downgrade"
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
