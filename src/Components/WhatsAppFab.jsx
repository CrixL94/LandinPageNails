import { whatsappUrl } from "../Services/infoNegocio";

// Botón flotante de WhatsApp con mensaje ya escrito
const WhatsAppFab = () => (
  <a
    href={whatsappUrl()}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Escríbenos por WhatsApp"
    className="group fixed right-4 bottom-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lift transition hover:scale-105 sm:right-6 sm:bottom-6"
  >
    <span className="absolute inset-0 animate-ping rounded-full bg-[#25d366] opacity-20" />
    <i className="pi pi-whatsapp relative text-2xl" />
  </a>
);

export default WhatsAppFab;
