import { useEffect, useState } from "react";
import { urlArchivo } from "../Services/Funciones";
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

  const infoServicios = async () => {
    // Servicios y detalles se piden en paralelo
    const [{ data }, { data: dataDetalles }] = await Promise.all([
      supabase.from("servicios").select("*").eq("id_estado", 1),
      supabase.from("servicios_detalles").select("*").eq("id_estado", 1),
    ]);

    setDataServicios(data || []);
    setDataServiciosDetalles(dataDetalles || []);
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
          const imagen = urlArchivo("imagenes", "Servicios", servicio.imagen_url);

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
                      src={imagen}
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
