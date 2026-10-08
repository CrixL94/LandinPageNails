// "2026-10-07" -> Date local (sin desfase de zona horaria)
export const fechaDesdeISO = (iso) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};

// Días que faltan para el vencimiento (0 = vence hoy)
export const diasParaVencer = (fechaFin) => {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  return Math.round((fechaDesdeISO(fechaFin).getTime() - hoy.getTime()) / 86_400_000);
};

export const formatearFechaLarga = (iso) =>
  fechaDesdeISO(iso).toLocaleDateString("es-HN", { day: "numeric", month: "long" });

export const formatearPrecio = (valor) =>
  `L. ${Number(valor).toLocaleString("es-HN", { maximumFractionDigits: 2 })}`;
