import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { urlArchivo } from "../Services/Funciones";
import { fadeUp, stagger, viewportOnce } from "../Animations/Animations";
import SectionHeading from "./SectionHeading";

const ServiciosCard = () => {
  const [dataServicios, setDataServicios] = useState([]);

  const getInfo = async () => {
    const { data } = await supabase
      .from("servicios")
      .select("*")
      .eq("id_estado", 1);
    setDataServicios(data || []);
  };

  useEffect(() => {
    getInfo();
  }, []);

  if (dataServicios.length === 0) return null;

  return (
    <section className="container-page py-20 sm:py-28">
      <SectionHeading
        eyebrow="Lo que hacemos"
        title="Nuestros servicios"
        subtitle="Cada set se diseña contigo: forma, largo, color y detalles a tu medida."
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-12 flex flex-wrap justify-center gap-6"
      >
        {dataServicios.map((servicio) => {
          const imagen = urlArchivo("imagenes", "Servicios", servicio.imagen_url);

          return (
            <motion.div
              key={servicio.id}
              variants={fadeUp}
              className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
            >
              <Link
                to="/servicios"
                className="group relative block aspect-[4/5] overflow-hidden rounded-3xl bg-brand-100 shadow-soft transition duration-500 hover:shadow-lift"
              >
                {imagen && (
                  <img
                    src={imagen}
                    alt={servicio.nombre}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <h3 className="font-display text-3xl font-medium">
                    {servicio.nombre}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-white/80">
                    {servicio.descripcion}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs tracking-[0.2em] text-white/90 uppercase">
                    Ver detalles
                    <i className="pi pi-arrow-right text-xs transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default ServiciosCard;
