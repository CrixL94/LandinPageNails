import { useEffect, useState, useRef } from "react";
import { slideInRight } from "../Animations/Animations";
import { motion } from "framer-motion";
import { supabase } from "../supabaseClient";
import { HashLoader } from "react-spinners";
import { Galleria } from "primereact/galleria";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

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
      const urls = await Promise.all(
        data.map(async (file) => {
          const { data: urlData } = supabase.storage
            .from("galeria")
            .getPublicUrl(file.name);
          return {
            nombre: file.name,
            url: urlData.publicUrl,
          };
        })
      );
      setImagenes(urls);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImagenes();
  }, []);

  const itemTemplate = (item) => (
    <img
      src={item.url}
      alt={item.nombre}
      style={{ width: "100%", maxHeight: "90vh", objectFit: "contain" }}
    />
  );

  return (
    <motion.div variants={slideInRight} initial="hidden" animate="visible">
      <section className="sm:px-[15rem] sm:mb-0 mb-4 text-gray-800">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-purple-600 mb-10 text-center sm:mt-0 mt-[7rem]">
            Nuestra Galería
          </h1>

          {loading ? (
            <div className="flex justify-center items-center min-h-[30vh]">
              <HashLoader color="#9810fa" size={50} />
            </div>
          ) : (
            <>
              <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
                {imagenes.map((img, idx) => (
                  <motion.div
                    key={idx}
                    className="break-inside-avoid overflow-hidden rounded-lg shadow-md transition duration-300 ease-in-out group cursor-pointer"
                    onClick={() => {
                      setImagenSeleccionada(idx);
                      setTimeout(() => {
                        galleriaRef.current?.show();
                      }, 50); // pequeño delay para asegurar re-render
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <img
                      src={img.url}
                      alt={img.nombre}
                      className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </motion.div>
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
        </div>
      </section>
    </motion.div>
  );
};

export default Galeria;
