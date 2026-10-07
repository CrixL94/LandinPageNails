import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import SectionHeading from "./SectionHeading";

const INTERVALO = 6000;

const TestimoniosCarousel = () => {
  const [testimoniosList, setTestimoniosList] = useState([]);
  const [actual, setActual] = useState(0);
  const [pausado, setPausado] = useState(false);

  const getInfo = async () => {
    // Solo aprobados, y solo las columnas que se muestran (no el celular)
    const { data: testimonios } = await supabase
      .from("testimonios")
      .select("id, nombre, contenido")
      .eq("idestado", 4);

    setTestimoniosList(testimonios || []);
  };

  useEffect(() => {
    getInfo();
  }, []);

  const total = testimoniosList.length;

  // Solo rota si hay al menos 2 testimonios (evita el "% 0")
  useEffect(() => {
    if (total < 2 || pausado) return;
    const interval = setInterval(() => {
      setActual((prev) => (prev + 1) % total);
    }, INTERVALO);
    return () => clearInterval(interval);
  }, [total, pausado]);

  if (total === 0) return null;

  const ir = (paso) => setActual((prev) => (prev + paso + total) % total);
  const info = testimoniosList[actual];

  return (
    <section className="container-page py-20 sm:py-28">
      <SectionHeading eyebrow="Testimonios" title="Lo que dicen nuestras clientas" />

      <div
        className="relative mx-auto mt-12 max-w-3xl"
        onMouseEnter={() => setPausado(true)}
        onMouseLeave={() => setPausado(false)}
      >
        <div className="card-soft relative overflow-hidden px-6 py-12 text-center sm:px-16 sm:py-14">
          <span className="font-display pointer-events-none absolute top-0 left-6 text-[9rem] leading-none text-brand-100 select-none">
            “
          </span>

          <div className="mb-6 flex justify-center gap-1 text-gold" aria-label="5 estrellas">
            {Array.from({ length: 5 }).map((_, i) => (
              <i key={i} className="pi pi-star-fill text-sm" />
            ))}
          </div>

          <div className="relative min-h-[9rem] sm:min-h-[8rem]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={actual}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <blockquote className="font-display text-2xl leading-snug text-ink-800 italic sm:text-3xl">
                  {info?.contenido}
                </blockquote>
                <figcaption className="mt-6 text-sm font-medium tracking-[0.2em] text-brand-600 uppercase">
                  {info?.nombre}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
        </div>

        {total > 1 && (
          <div className="mt-8 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => ir(-1)}
              aria-label="Testimonio anterior"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-brand-200 text-brand-600 transition hover:bg-brand-600 hover:text-white"
            >
              <i className="pi pi-chevron-left text-xs" />
            </button>

            <div className="flex gap-2">
              {testimoniosList.map((t, i) => (
                <button
                  key={t.id ?? i}
                  type="button"
                  onClick={() => setActual(i)}
                  aria-label={`Ver testimonio ${i + 1}`}
                  aria-current={i === actual}
                  className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
                    i === actual ? "w-6 bg-brand-600" : "w-2 bg-brand-200 hover:bg-brand-300"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => ir(1)}
              aria-label="Siguiente testimonio"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-brand-200 text-brand-600 transition hover:bg-brand-600 hover:text-white"
            >
              <i className="pi pi-chevron-right text-xs" />
            </button>
          </div>
        )}

        <p className="mt-8 text-center text-sm text-ink-500">
          ¿Ya nos visitaste?{" "}
          <Link
            to="/testimonios"
            className="font-medium text-brand-600 underline-offset-4 hover:underline"
          >
            Cuéntanos tu experiencia
          </Link>
        </p>
      </div>
    </section>
  );
};

export default TestimoniosCarousel;
