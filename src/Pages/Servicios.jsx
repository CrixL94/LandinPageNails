import { useEffect, useState } from "react";
import { listarUrlsPublicas } from "../Services/Funciones";
import { supabase } from "../supabaseClient";
import { HashLoader } from "react-spinners";
import { motion } from "framer-motion";
import BotonReservaCita from "../Components/BottonReservarCita";
import TestimoniosCarousel from "../Components/TestimoniosCarousel";
import { Divider } from "primereact/divider";

const Servicios = () => {
  const [loading, setLoading] = useState(true);
  const [dataServicios, setDataServicios] = useState([]);
  const [dataServiciosDetalles, setDataServiciosDetalles] = useState([]);
  const [filesDataServicios, setFilesDataServicios] = useState([]);

  const infoServicios = async () => {
    setLoading(true);
    const { data } = await supabase.from("servicios").select("*");

    const serviciosFiltrados = (data || []).filter((s) => s.id_estado === 1);
    setDataServicios(serviciosFiltrados);

    const { data: dataDetalles } = await supabase
      .from("servicios_detalles")
      .select("*");
    const serviciosDetallesFiltrados = (dataDetalles || []).filter(
      (s) => s.id_estado === 1
    );
    setDataServiciosDetalles(serviciosDetallesFiltrados);

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
    setLoading(false);
  };

  useEffect(() => {
    infoServicios();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <HashLoader color="#9810fa" size={50} />
      </div>
    );
  }

  return (
    <div className="sm:px-[15rem] mb-4 text-gray-800">
      {dataServicios.map((servicio, index) => {
        const imagen = filesDataServicios.find(
          (img) => img.nombre === servicio.imagen_url
        );

        const detallesDeServicio = dataServiciosDetalles.filter(
          (detalle) => detalle.id_servicio === servicio.id
        );

        const isEven = index % 2 === 0;

        return (
          <motion.div
            key={servicio.id}
            initial={{ opacity: 0, x: isEven ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="min-h-screen flex flex-col md:flex-row items-center justify-center sm:mt-0 mt-[7rem]"
          >
            {isEven ? (
              <>
                <div className="flex-1 text-center md:text-left sm:p-8 p-4">
                  <h1 className="text-3xl sm:text-6xl font-bold text-purple-600 sm:mb-4">
                    {servicio.nombre}
                  </h1>
                  <p className="text-lg md:text-lg text-gray-600 mb-6">
                    {servicio.descripcion}
                  </p>

                  <div>
                    {detallesDeServicio.map((detalle, idx) => (
                      <div
                        key={detalle.id}
                        className={`bg-gray-100 border rounded-lg p-4 shadow hover:shadow-lg transition ${
                          idx !== detallesDeServicio.length - 1 ? "mb-1" : ""
                        }`}
                      >
                        <h4 className="text-lg font-semibold text-purple-600">
                          {detalle.nombre} - L. {detalle.precio}
                        </h4>
                        <p className="text-gray-700">{detalle.descripcion}</p>
                      </div>
                    ))}
                  </div>

                  <BotonReservaCita
                    textoAntes={"Vive la experiencia "}
                    textoDespues={
                      ", estilo, calidad y cuidado en cada detalle."
                    }
                    textoBoton={"Reserva tu cita"}
                  />
                </div>

                <div className="flex-1">
                  <img
                    src={imagen?.url}
                    alt={servicio.nombre}
                    className="w-full h-full object-cover sm:rounded-xl shadow-lg"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex-1">
                  <img
                    src={imagen?.url}
                    alt={servicio.nombre}
                    className="w-full h-full object-cover sm:rounded-xl shadow-lg"
                  />
                </div>

                <div className="flex-1 text-center md:text-left sm:p-8 p-4">
                  <h1 className="text-3xl sm:text-6xl font-bold text-purple-600 sm:mb-4">
                    {servicio.nombre}
                  </h1>
                  <p className="text-lg md:text-lg text-gray-600 mb-6">
                    {servicio.descripcion}
                  </p>

                  <div>
                    {detallesDeServicio.map((detalle, idx) => (
                      <div
                        key={detalle.id}
                        className={`bg-gray-100 border rounded-lg p-4 shadow hover:shadow-xl hover:translate-y-1 transition duration-300 ${
                          idx !== detallesDeServicio.length - 1 ? "mb-1" : ""
                        }`}
                      >
                        <h4 className="text-lg font-semibold text-purple-600">
                          {detalle.nombre} - L. {detalle.precio}
                        </h4>
                        <p className="text-gray-700">{detalle.descripcion}</p>
                      </div>
                    ))}
                  </div>

                  <BotonReservaCita
                    textoAntes={"Vive la experiencia "}
                    textoDespues={
                      ", estilo, calidad y cuidado en cada detalle."
                    }
                    textoBoton={"Reserva tu cita"}
                  />
                </div>
              </>
            )}
          </motion.div>
        );
      })}
      <Divider />
      <TestimoniosCarousel/>
    </div>
  );
};

export default Servicios;
