import { supabase } from "../supabaseClient";

/**
 * Lista archivos en un bucket y carpeta específica con paginación.
 * @param {string} bucket - Nombre del bucket (ej: "imagenes")
 * @param {string} folder - Carpeta dentro del bucket (ej: "inicio_web")
 * @param {number} limit - Cantidad máxima de archivos a listar (por defecto 100)
 * @param {number} offset - Offset para paginación (por defecto 0)
 * @returns {Promise<Array>} - Lista de archivos o array vacío si hay error
 */
export async function listarArchivos(bucket, folder, limit = 100, offset = 0) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .list(folder, { limit, offset });

  if (error) {
    console.error("Error listando archivos:", error.message);
    return [];
  }

  return data;
}

/**
 * Obtiene la URL pública de un archivo dado su bucket y ruta.
 * @param {string} bucket - Nombre del bucket (ej: "imagenes")
 * @param {string} path - Ruta completa dentro del bucket (ej: "inicio_web/foto.jpg")
 * @returns {string|null} - URL pública o null si no disponible
 */
export function obtenerUrlPublica(bucket, path) {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  if (!data || !data.publicUrl) {
    console.warn(`No se pudo obtener URL para ${path}`);
    return null;
  }
  return data.publicUrl;
}

/**
 * Combina listar archivos y obtener sus URLs públicas.
 * @param {string} bucket - Nombre del bucket
 * @param {string} folder - Carpeta dentro del bucket
 * @param {number} limit - Cantidad máxima de archivos
 * @param {number} offset - Desplazamiento
 * @returns {Promise<string[]>} - Lista de URLs públicas
 */
export async function listarUrlsPublicas(bucket, folder, limit = 100, offset = 0) {
  const archivos = await listarArchivos(bucket, folder, limit, offset);

  const urls = archivos
    .map((file) => obtenerUrlPublica(bucket, `${folder}/${file.name}`))
    .filter((url) => url !== null);

  return urls;
}


export const generarHoras = () => {
  const horas = [];
  const start = 8 * 60; // 8:00 AM en minutos
  const end = 19 * 60;  // 7:00 PM en minutos

  for (let minutos = start; minutos <= end; minutos += 30) {
    const h = Math.floor(minutos / 60);
    const m = minutos % 60;
    const hora24 = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;

    // Convertir a AM/PM
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 === 0 ? 12 : h % 12;
    const hora12 = `${h12}:${m.toString().padStart(2, "0")} ${ampm}`;

    horas.push({ label: hora12, value: hora24 }); // label visible, value en formato 24h
  }

  return horas;
};

