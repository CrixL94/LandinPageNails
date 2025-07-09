import { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { supabase } from "../supabaseClient";
import { listarUrlsPublicas } from "../Services/Funciones";

const ServiciosCard = () => {
  const [dataServicios, setDataServicios] = useState([]);
  const [filesDataServicios, setFilesDataServicios] = useState([]);

  const getInfo = async () => {
    const { data } = await supabase.from("servicios").select("*");

    const serviciosFiltrados = (data || []).filter((s) => s.id_estado === 1);
    setDataServicios(serviciosFiltrados);

    const nombresDeArchivo = serviciosFiltrados
      .map((item) => item.imagen_url)
      .filter(Boolean);

    const urls = await listarUrlsPublicas("imagenes", "Servicios");

    const urlsFiltradas = urls
      .filter((url) => nombresDeArchivo.some((nombre) => url.includes(nombre)))
      .map((url) => {
        const nombre = url.split("/").pop();
        return { nombre, url };
      });

    setFilesDataServicios(urlsFiltradas);
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div className="flex-1">
      <Card className="shadow-lg">
        <h3 className="text-xl font-semibold mb-3 text-purple-500">
          Servicios
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {dataServicios.map((servicio) => {
            const imagen = filesDataServicios.find(
              (img) => img.nombre === servicio.imagen_url
            );

            return (
              <div
                key={servicio.id}
                className="bg-gray-100 rounded-lg shadow-md sm:p-4 p-2 hover:shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                {imagen && (
                  <img
                    src={imagen.url}
                    alt={servicio.nombre}
                    className="w-full object-cover rounded-md mb-3"
                  />
                )}
                <h4 className="text-lg font-semibold text-purple-600 mb-1">
                  {servicio.nombre}
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  {servicio.descripcion}
                </p>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default ServiciosCard;
