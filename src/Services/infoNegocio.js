// Fuente única de los datos de contacto, redes y menú del sitio.

export const NEGOCIO = {
  nombre: "Nail's Art Suray",
  telefono: "+50493367328",
  telefonoVisible: "+504 9336-7328",
  email: "missurynunez39@gmail.com",
  direccion: "Residencial Green Valley",
  ciudad: "Quimistán, Santa Bárbara",
  horario: "Lunes a Sábado · 8:00 AM – 7:00 PM",
  nota: "Atendemos únicamente con cita previa",
  coordenadas: { lat: 15.34375, lng: -88.18811 },
};

export const whatsappUrl = (
  mensaje = "Hola, me gustaría reservar una cita en Nail's Art Suray"
) => `https://wa.me/${NEGOCIO.telefono.replace("+", "")}?text=${encodeURIComponent(mensaje)}`;

export const mapsUrl = `https://www.google.com/maps?q=${NEGOCIO.coordenadas.lat},${NEGOCIO.coordenadas.lng}`;
export const comoLlegarUrl = `https://www.google.com/maps/dir/?api=1&destination=${NEGOCIO.coordenadas.lat},${NEGOCIO.coordenadas.lng}`;

export const REDES = [
  { nombre: "TikTok", icono: "pi pi-tiktok", url: "https://www.tiktok.com/@suray.nuez.hl?_t=ZM-8xvIglnC1Vm&_r=1" },
  { nombre: "Facebook", icono: "pi pi-facebook", url: "https://www.facebook.com/share/16UwLv9Rft/" },
  { nombre: "WhatsApp", icono: "pi pi-whatsapp", url: whatsappUrl() },
  { nombre: "Llamar", icono: "pi pi-phone", url: `tel:${NEGOCIO.telefono}` },
  { nombre: "Correo", icono: "pi pi-envelope", url: `mailto:${NEGOCIO.email}` },
];

export const NAV_LINKS = [
  { name: "Inicio", path: "/" },
  { name: "Nosotros", path: "/aboutUs" },
  { name: "Servicios", path: "/servicios" },
  { name: "Galería", path: "/galeria" },
  { name: "Contacto", path: "/contacto" },
];
