import { useEffect, useState } from "react";
import { listarUrlsPublicas } from "../Services/Funciones";
import { supabase } from "../supabaseClient";
import { motion } from "framer-motion";
import BotonReservaCita from "../Components/BottonReservarCita";
import TestimoniosCarousel from "../Components/TestimoniosCarousel";
import PageHeader from "../Components/PageHeader";
import PageLoader from "../Components/PageLoader";
import { viewportOnce } from "../Animations/Animations";

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

  if (loading) return <PageLoader />;

  return (
    <>
      <PageHeader
        eyebrow="Servicios"
        title="Uñas pensadas para ti"
        subtitle="Elige el servicio y nosotras nos encargamos del resto: forma, largo, color y cada pequeño detalle."
      />

      <div className="container-page space-y-24 py-20 sm:space-y-32 sm:py-28">
        {dataServicios.map((servicio, index) => {
          const imagen = filesDataServicios.find(
            (img) => img.nombre === servicio.imagen_url
          );

          const detallesDeServicio = dataServiciosDetalles.filter(
            (detalle) => detalle.id_servicio === servicio.id
          );

          const isEven = index % 2 === 0;

          return (
            <motion.article
              key={servicio.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              viewport={viewportOnce}
              className="grid items-center gap-10 md:grid-cols-2 md:gap-16"
            >
              <div className={`relative mx-auto w-full max-w-md ${isEven ? "" : "md:order-2"}`}>
                <div className="frame-arch aspect-[4/5] bg-brand-100 shadow-lift">
                  {imagen && (
                    <img
                      src={imagen.url}
                      alt={servicio.nombre}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
              </div>

              <div className="text-center md:text-left">
                <span className="font-display text-6xl leading-none text-brand-200 lining-nums sm:text-7xl">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="heading-lg mt-2">{servicio.nombre}</h2>
                <p className="mt-4 text-base leading-relaxed text-ink-500 sm:text-lg">
                  {servicio.descripcion}
                </p>

                {detallesDeServicio.length > 0 && (
                  <ul className="mx-auto mt-8 max-w-md divide-y divide-brand-100 border-y border-brand-100 text-left md:mx-0">
                    {detallesDeServicio.map((detalle) => (
                      <li
                        key={detalle.id}
                        className="flex items-center justify-between gap-4 py-3.5"
                      >
                        <span className="flex items-center gap-3 text-ink-700">
                          <i className="pi pi-check-circle text-brand-500" />
                          {detalle.nombre}
                        </span>
                        {/* <span className="font-display text-xl text-brand-700">L. {detalle.precio}</span> */}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-8">
                  <BotonReservaCita textoBoton="Reserva este servicio" />
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      <div className="bg-sand">
        <TestimoniosCarousel />
      </div>
    </>
  );
};

export default Servicios;
