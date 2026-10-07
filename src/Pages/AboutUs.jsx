import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { listarUrlsPublicas } from "../Services/Funciones";
import ServiciosCard from "../Components/ServiciosCard";
import TestimoniosCarousel from "../Components/TestimoniosCarousel";
import BotonReservaCita from "../Components/BottonReservarCita";
import PageLoader from "../Components/PageLoader";
import SectionHeading from "../Components/SectionHeading";
import { motion } from "framer-motion";
import {
  fadeUp,
  slideInLeft,
  slideInRight,
  stagger,
  viewportOnce,
} from "../Animations/Animations";

const VALORES = [
  { icono: "pi pi-star", titulo: "Profesionalismo", texto: "Técnica cuidada en cada detalle." },
  { icono: "pi pi-palette", titulo: "Creatividad", texto: "Diseños únicos, hechos para ti." },
  { icono: "pi pi-shield", titulo: "Higiene y seguridad", texto: "Herramientas esterilizadas siempre." },
  { icono: "pi pi-heart", titulo: "Atención personalizada", texto: "Te escuchamos antes de empezar." },
  { icono: "pi pi-bolt", titulo: "Innovación constante", texto: "Tendencias y técnicas al día." },
];

const RAZONES = [
  "Ambiente limpio, seguro y cómodo",
  "Técnicas actualizadas y productos de alta calidad",
  "Atención cálida y amigable",
  "Citas puntuales y personalizadas",
  "Más que un servicio, ¡una experiencia!",
];

// `embedded`: se muestra dentro de Inicio, sin el espaciado superior de página
const AboutUs = ({ embedded = false }) => {
  const [inicioData, setInicioData] = useState([]);
  const [filesData, setFilesData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInicioData = async () => {
    setLoading(true);

    const { data, error } = await supabase.from("about_us").select("*");

    if (error || !data) {
      setInicioData([]);
      setFilesData([]);
      setLoading(false);
      return;
    }
    setInicioData(data);

    const nombresDeArchivo = data
      .flatMap((item) => [item.imagen_url])
      .filter(Boolean);

    const urls = await listarUrlsPublicas("imagenes", "About_Us");

    const urlsFiltradas = urls
      .filter((url) => nombresDeArchivo.some((nombre) => url.includes(nombre)))
      .map((url) => {
        const nombre = url.split("/").pop();
        return { nombre, url };
      });

    setFilesData(urlsFiltradas);
    setLoading(false);
  };

  useEffect(() => {
    fetchInicioData();
  }, []);

  const dataInicio = inicioData[0];

  const imagenFondo = filesData.find(
    (img) => img.nombre === dataInicio?.imagen_url
  );

  if (loading) return embedded ? null : <PageLoader />;

  return (
    <>
      {/* Introducción */}
      <section
        className={`container-page grid items-center gap-14 md:grid-cols-2 md:gap-16 ${
          embedded ? "py-20 sm:py-28" : "min-h-screen pt-32 pb-20"
        }`}
      >
        <motion.div
          variants={slideInRight}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative mx-auto w-full max-w-sm sm:max-w-md"
        >
          <div className="frame-arch aspect-[4/5] bg-brand-100 shadow-lift">
            {imagenFondo && (
              <img
                src={imagenFondo.url}
                alt="Nuestro estudio de uñas"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <span className="font-display absolute -right-2 bottom-10 rotate-[-4deg] rounded-full bg-cream px-5 py-2 text-lg text-brand-600 italic shadow-soft ring-1 ring-brand-100 sm:-right-8">
            Hecho con amor
          </span>
        </motion.div>

        <motion.div
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center md:text-left"
        >
          <p className="eyebrow mb-5">Sobre nosotros</p>
          {embedded ? (
            <h2 className="heading-lg">{dataInicio?.titulo}</h2>
          ) : (
            <h1 className="heading-xl">{dataInicio?.titulo}</h1>
          )}
          <p className="mt-6 text-base leading-relaxed text-ink-500 sm:text-lg">
            {dataInicio?.subtitulo && (
              <span className="font-display text-xl text-brand-600 italic sm:text-2xl">
                {dataInicio.subtitulo}{" "}
              </span>
            )}
            {dataInicio?.descripcion}
          </p>
          <div className="mt-8">
            <BotonReservaCita textoBoton="Reserva tu cita" />
          </div>
        </motion.div>
      </section>

      {/* Misión y Visión */}
      <section className="bg-sand py-20 sm:py-24">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="container-page grid gap-6 md:grid-cols-2"
        >
          {[
            { icono: "pi pi-compass", titulo: "Misión", texto: dataInicio?.mision },
            { icono: "pi pi-eye", titulo: "Visión", texto: dataInicio?.vision },
          ].map((item) => (
            <motion.article key={item.titulo} variants={fadeUp} className="card-soft p-8 sm:p-10">
              <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                <i className={`${item.icono} text-lg`} />
              </span>
              <h3 className="heading-md mb-3">{item.titulo}</h3>
              <p className="leading-relaxed text-ink-500">{item.texto}</p>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* Valores */}
      <section className="container-page py-20 sm:py-28">
        <SectionHeading eyebrow="Lo que nos define" title="Nuestros valores" />
        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-5"
        >
          {VALORES.map((valor, i) => (
            <motion.li
              key={valor.titulo}
              variants={fadeUp}
              className={`card-soft p-6 text-center transition duration-300 hover:-translate-y-1 hover:shadow-lift ${
                i === VALORES.length - 1 ? "col-span-2 lg:col-span-1" : ""
              }`}
            >
              <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                <i className={valor.icono} />
              </span>
              <h3 className="font-display text-xl font-semibold text-ink-900">
                {valor.titulo}
              </h3>
              <p className="mt-2 text-sm text-ink-500">{valor.texto}</p>
            </motion.li>
          ))}
        </motion.ul>
      </section>

      {/* ¿Por qué elegirnos? */}
      <section className="container-page pb-4">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative grid gap-10 overflow-hidden rounded-[2rem] bg-ink-900 p-8 text-white sm:p-14 md:grid-cols-[1fr_1.2fr] md:items-center"
        >
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-600/30 blur-3xl" />
          <div className="relative">
            <p className="eyebrow mb-4 text-brand-300 before:bg-brand-300">
              La diferencia
            </p>
            <h2 className="font-display text-4xl leading-tight font-medium sm:text-5xl">
              ¿Por qué elegirnos?
            </h2>
            <div className="mt-8">
              <BotonReservaCita textoBoton="Reserva tu cita" />
            </div>
          </div>
          <ol className="relative space-y-5">
            {RAZONES.map((razon, i) => (
              <li key={razon} className="flex items-baseline gap-5 border-b border-white/10 pb-5 last:border-0 last:pb-0">
                <span className="font-display text-2xl text-brand-300 lining-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-white/85">{razon}</span>
              </li>
            ))}
          </ol>
        </motion.div>
      </section>

      <ServiciosCard />
      <div className="bg-sand">
        <TestimoniosCarousel />
      </div>
    </>
  );
};

export default AboutUs;
