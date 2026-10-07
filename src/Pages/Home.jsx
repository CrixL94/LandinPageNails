import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { motion } from "framer-motion";
import { urlArchivo } from "../Services/Funciones";
import AboutUs from "./AboutUs";
import { fadeUp, stagger } from "../Animations/Animations";
import BotonReservaCita from "../Components/BottonReservarCita";
import PageLoader from "../Components/PageLoader";
import Contacto from "./Contacto";

const CONFIANZA = [
  { icono: "pi pi-sparkles", texto: "Productos premium" },
  { icono: "pi pi-shield", texto: "Higiene garantizada" },
  { icono: "pi pi-calendar", texto: "Solo con cita" },
];

const Home = () => {
  const [dataInicio, setDataInicio] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchInicioData = async () => {
    const { data } = await supabase.from("vta_inicio_web").select("*");
    setDataInicio(data?.[0] ?? null);
    setLoading(false);
  };

  useEffect(() => {
    fetchInicioData();
  }, []);

  const imagenFondo = urlArchivo("imagenes", "inicio_web", dataInicio?.imagen_url_fondo);

  // Nosotros y Contacto se montan desde el inicio para que sus consultas
  // corran en paralelo con la del hero
  if (loading) {
    return (
      <>
        <PageLoader />
        <AboutUs embedded />
        <Contacto embedded />
      </>
    );
  }

  return (
    <>
      <section className="relative overflow-hidden">
        {/* Manchas decorativas */}
        <div className="pointer-events-none absolute -top-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-brand-100 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 -left-40 h-80 w-80 rounded-full bg-sand blur-3xl" />

        <div className="container-page relative grid min-h-screen items-center gap-14 pt-28 pb-20 md:grid-cols-[1.1fr_1fr] md:gap-10 md:pt-24">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="text-center md:text-left"
          >
            <motion.p variants={fadeUp} className="eyebrow mb-6">
              Nail Studio · Residencial Green Valley
            </motion.p>

            <motion.h1 variants={fadeUp} className="heading-xl">
              {dataInicio?.titulo?.replace("`", "'") ?? "Nail's Art Suray"}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-ink-500 sm:text-lg md:mx-0"
            >
              {dataInicio?.subtitulo && (
                <span className="font-display text-xl text-brand-600 italic sm:text-2xl">
                  {dataInicio.subtitulo}{" "}
                </span>
              )}
              {dataInicio?.resumen}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:justify-start"
            >
              <BotonReservaCita textoBoton="Reserva tu cita" />
              <Link to="/galeria" className="btn-ghost">
                Ver trabajos
                <i className="pi pi-arrow-right text-xs" />
              </Link>
            </motion.div>

            <motion.ul
              variants={fadeUp}
              className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-ink-500 md:justify-start"
            >
              {CONFIANZA.map((item) => (
                <li key={item.texto} className="flex items-center gap-2">
                  <i className={`${item.icono} text-brand-500`} />
                  {item.texto}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="relative mx-auto w-full max-w-[22rem] sm:max-w-md"
          >
            {/* Contorno desplazado */}
            <div className="frame-arch absolute inset-0 translate-x-4 translate-y-4 border border-brand-300 sm:translate-x-6 sm:translate-y-6" />

            <div className="frame-arch relative aspect-[4/5] bg-brand-100 shadow-lift">
              {imagenFondo && (
                <img
                  src={imagenFondo}
                  alt="Uñas acrílicas de Nail's Art Suray"
                  className="h-full w-full object-cover"
                  fetchPriority="high"
                />
              )}
            </div>

            {/* Tarjeta flotante */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="card-soft absolute -bottom-6 -left-2 flex items-center gap-3 px-5 py-4 sm:-left-10"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                <i className="pi pi-palette" />
              </span>
              <span className="text-left">
                <span className="font-display block text-lg leading-tight text-ink-900">
                  Diseños a tu medida
                </span>
                <span className="text-xs text-ink-400">Forma, largo y color</span>
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <AboutUs embedded />
      <Contacto embedded />
    </>
  );
};

export default Home;
