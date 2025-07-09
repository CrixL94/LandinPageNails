import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { HashLoader } from "react-spinners";
import { motion } from "framer-motion";
import { listarUrlsPublicas } from "../Services/Funciones";
import AboutUs from "./AboutUs";
import { slideInRight } from "../Animations/Animations";

const Home = () => {
  const [inicioData, setInicioData] = useState([]);
  const [filesData, setFilesData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInicioData = async () => {
    setLoading(true);

    const { data, error } = await supabase.from("vta_inicio_web").select("*");

    if (error) {
      setInicioData([]);
      setFilesData([]);
      setLoading(false);
      return;
    }

    if (!data) {
      setInicioData([]);
      setFilesData([]);
      setLoading(false);
      return;
    }
    setInicioData(data);

    const nombresDeArchivo = data
      .flatMap((item) => [item.imagen_url_fondo])
      .filter(Boolean);

    const urls = await listarUrlsPublicas("imagenes", "inicio_web");

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

  const imagenFondo = filesData.find(
    (img) => img.nombre === inicioData[0].imagen_url_fondo
  );

  const dataInicio = inicioData[0];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <HashLoader color="#9810fa" size={50} />
      </div>
    );
  }

  return (
    <>
      <motion.div
        variants={slideInRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col md:flex-row items-center justify-center min-h-screen sm:px-[15rem] sm:mb-0 mb-4"
      >
        <div className="flex-1 text-center md:text-left sm:p-8 p-4">
          <h1 className="text-2xl sm:text-6xl font-bold text-purple-600 sm:mb-4 sm:mt-0 mt-[7rem]">
            {dataInicio?.titulo}
          </h1>

          <p className="sm:text-2xl text-base md:text-lg text-gray-600 mb-6">
            <span className="font-semibold sm:text-lg text-base text-purple-500">
              {dataInicio?.subtitulo}
            </span>
            <span> </span>
            {dataInicio?.resumen}
            <br className="hidden sm:block" />
            <span className="font-semibold">{dataInicio?.label_atencion}</span>
          </p>

          <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300">
            <i className="pi pi-calendar mr-2" />
            {dataInicio?.label_boton}
          </button>
        </div>

        <div className="flex-1">
          <img
            src={`${imagenFondo?.url}`}
            alt="Manicura y Pedicura"
            className="w-full h-full object-cover sm:rounded-xl shadow-lg"
          />
        </div>
      </motion.div>
      <AboutUs />
    </>
  );
};

export default Home;
