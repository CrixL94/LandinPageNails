import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { supabase } from "../supabaseClient";
import { Galleria } from "primereact/galleria";
import BotonReservaCita from "../Components/BottonReservarCita";
import PageHeader from "../Components/PageHeader";
import SocialIcons from "../Components/SocialIcons";
import { fadeUp, viewportOnce } from "../Animations/Animations";

const ALTURAS_SKELETON = [260, 340, 220, 300, 380, 240, 320, 280];

const Galeria = () => {
  const [imagenes, setImagenes] = useState([]);
  const [loading, setLoading] = useState(true);

  const galleriaRef = useRef(null);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(0);

  const fetchImagenes = async () => {
    setLoading(true);
    const { data, error } = await supabase.storage.from("galeria").list("", {
      limit: 100,
      sortBy: { column: "created_at", order: "asc" },
    });

    if (!error && data.length > 0) {
      const urls = data
        .filter((file) => file.name && !file.name.startsWith("."))
        .map((file) => {
          const { data: urlData } = supabase.storage
            .from("galeria")
            .getPublicUrl(file.name);
          return {
            nombre: file.name,
            url: urlData.publicUrl,
          };
        });
      setImagenes(urls);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImagenes();
  }, []);

  const abrir = (idx) => {
    setImagenSeleccionada(idx);
    setTimeout(() => {
      galleriaRef.current?.show();
    }, 50); // pequeño delay para asegurar re-render
  };

  const itemTemplate = (item) => (
    <figure className="flex flex-col items-center gap-4 px-4">
      <img
        src={item.url}
        alt={item.nombre}
        className="max-h-[80vh] w-auto max-w-[92vw] rounded-2xl sm:max-w-[78vw] lg:max-w-5xl object-contain shadow-lift"
      />
      <figcaption className="text-xs tracking-[0.25em] text-white/60 uppercase">
        {imagenSeleccionada + 1} / {imagenes.length}
      </figcaption>
    </figure>
  );

  return (
    <>
      <PageHeader
        eyebrow="Galería"
        title="Nuestros trabajos"
        subtitle="¡Transforma tus uñas en arte! Inspírate y agenda tu cita."
      >
        <BotonReservaCita textoBoton="Reserva tu cita" />
      </PageHeader>

      <section className="container-page py-16 sm:py-20">
        {loading ? (
          <div className="columns-2 gap-4 md:columns-3 lg:columns-4" aria-busy="true" aria-label="Cargando galería">
            {ALTURAS_SKELETON.map((alto, i) => (
              <div
                key={i}
                className="mb-4 animate-pulse break-inside-avoid rounded-2xl bg-brand-100"
                style={{ height: alto }}
              />
            ))}
          </div>
        ) : imagenes.length === 0 ? (
          <div className="card-soft mx-auto max-w-md px-8 py-14 text-center">
            <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <i className="pi pi-images text-xl" />
            </span>
            <h2 className="heading-md">Muy pronto</h2>
            <p className="mt-2 text-ink-500">
              Estamos preparando nuestra galería. Mientras tanto, mira nuestros
              trabajos más recientes en redes sociales.
            </p>
          </div>
        ) : (
          <>
            <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
              {imagenes.map((img, idx) => (
                <motion.button
                  type="button"
                  key={img.nombre}
                  className="group relative mb-4 block w-full cursor-zoom-in break-inside-avoid overflow-hidden rounded-2xl bg-brand-100 shadow-soft"
                  onClick={() => abrir(idx)}
                  aria-label={`Ampliar imagen ${idx + 1}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (idx % 4) * 0.06 }}
                >
                  <img
                    src={img.url}
                    alt={`Trabajo de uñas ${idx + 1}`}
                    loading="lazy"
                    className="w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-ink-900/0 transition duration-300 group-hover:bg-ink-900/30">
                    <span className="flex h-12 w-12 scale-75 items-center justify-center rounded-full bg-white/90 text-brand-700 opacity-0 transition duration-300 group-hover:scale-100 group-hover:opacity-100">
                      <i className="pi pi-search-plus" />
                    </span>
                  </span>
                </motion.button>
              ))}
            </div>

            <Galleria
              ref={galleriaRef}
              value={imagenes}
              numVisible={1}
              circular
              fullScreen
              showItemNavigators
              showThumbnails={false}
              activeIndex={imagenSeleccionada}
              onItemChange={(e) => setImagenSeleccionada(e.index)}
              item={itemTemplate}
            />
          </>
        )}
      </section>

      {/* Cierre */}
      <section className="container-page pb-20 sm:pb-28">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative overflow-hidden rounded-[2rem] bg-ink-900 px-6 py-14 text-center text-white sm:px-14"
        >
          <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-brand-600/30 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 -bottom-28 h-72 w-72 rounded-full bg-brand-400/20 blur-3xl" />
          <div className="relative">
            <p className="eyebrow mb-4 text-brand-300 before:bg-brand-300">
              Tu próximo set
            </p>
            <h2 className="font-display mx-auto max-w-xl text-4xl leading-tight font-medium sm:text-5xl">
              ¿Te enamoraste de algún diseño?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-white/70">
              Guarda la foto, muéstranosla en tu cita y lo adaptamos a tu
              estilo. Mira más trabajos en nuestras redes.
            </p>
            <div className="mt-8 flex flex-col items-center gap-6">
              <BotonReservaCita textoBoton="Reserva tu cita" />
              <SocialIcons size="sm" light className="justify-center" />
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Galeria;
