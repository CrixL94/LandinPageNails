import { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import fondo from "../assets/fondo.jpg";
import { supabase } from "../supabaseClient";
import { HashLoader } from "react-spinners";
import { listarUrlsPublicas } from "../Services/Funciones";
import { motion, useAnimation } from "framer-motion";

const AboutUs = () => {
  const [inicioData, setInicioData] = useState([]);
  const [testimoniosList, setTestimoniosList] = useState([]);
  const [filesData, setFilesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataServicios, setDataServicios] = useState([]);

  const [filesDataServicios, setFilesDataServicios] = useState([]);

  const fetchInicioData = async () => {
    setLoading(true);

    const { data, error } = await supabase.from("about_us").select("*");

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
      .flatMap((item) => [item.imagen_url])
      .filter(Boolean);

    const urls = await listarUrlsPublicas("imagenes", "About_Us");

    const urlsFiltradas = urls
      .filter((url) => nombresDeArchivo.some((nombre) => url.includes(nombre)))
      .map((url) => {
        const nombre = url.split("/").pop();
        return { nombre, url };
      });

    const { data: testimonios } = await supabase
      .from("testimonios")
      .select("*");
    setTestimoniosList(testimonios);

    setFilesData(urlsFiltradas);
    setLoading(false);
  };

  const infoServicios = async () => {
    setLoading(true);
    const { data } = await supabase.from("servicios").select("*");

    const serviciosFiltardos = (data || []).filter((estado) =>
      [1].includes(estado.id_estado)
    );

    setDataServicios(serviciosFiltardos);

    const nombresDeArchivo = data
      .flatMap((item) => [item.imagen_url])
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
    fetchInicioData();
    infoServicios();
  }, []);

  const controls = useAnimation();

  useEffect(() => {
    let current = 0;

    const interval = setInterval(() => {
      const total = testimoniosList.length;
      current = (current + 1) % total;
      controls.start({
        x: `-${current * 100}%`,
        transition: { duration: 0.8, ease: "easeInOut" },
      });
    }, 4000); // cada 4 segundos

    return () => clearInterval(interval);
  }, [testimoniosList, controls]);

  const imagenFondo = filesData.find(
    (img) => img.nombre === inicioData[0].imagen_url
  );

  const dataInicio = inicioData[0];

  const imagenesHistoria = [fondo, fondo, fondo];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <HashLoader color="#9810fa" size={50} />
      </div>
    );
  }

  return (
    <section className="sm:px-[15rem] mb-4 text-gray-800">
      <div className="min-h-screen flex flex-col md:flex-row items-center justify-center sm:mt-0 mt-[7rem]">
        <div className="flex-1">
          <img
            src={`${imagenFondo?.url}`}
            alt="Manicura y Pedicura"
            className="w-full h-full object-cover sm:rounded-xl shadow-lg"
          />
        </div>

        <div className="flex-1 text-center md:text-left sm:p-8 p-4">
          <h1 className="text-2xl sm:text-6xl font-bold text-purple-600 sm:mb-4">
            {dataInicio?.titulo}
          </h1>

          <p className="sm:text-2xl text-base md:text-lg text-gray-600 mb-6">
            <span className="font-semibold sm:text-lg text-base text-purple-500">
              {dataInicio?.subtitulo}
            </span>
            <span> </span>
            {dataInicio?.descripcion}
            <br className="hidden sm:block" />
          </p>
        </div>
      </div>

      {/* Mision Vision */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card>
          <h3 className="text-xl font-semibold mb-2 text-purple-500">Misión</h3>
          <p>{dataInicio?.mision}</p>
        </Card>

        <Card>
          <h3 className="text-xl font-semibold mb-2 text-purple-500">Visión</h3>
          <p>{dataInicio?.vision}</p>
        </Card>
      </div>

      <Divider />

      {/* Valores */}
      <div className="mb-12">
        <Card>
          <h3 className="text-xl font-semibold mb-4 text-purple-500">
            Nuestros Valores
          </h3>
          <ul className="list-disc list-inside space-y-1">
            <li>✨ Profesionalismo</li>
            <li>🎨 Creatividad</li>
            <li>🧼 Higiene y seguridad</li>
            <li>🌟 Atención personalizada</li>
            <li>💡 Innovación constante</li>
          </ul>
        </Card>
      </div>

      <Divider />

      {/* Elegirnos */}
      <div className="mb-16">
        <Card>
          <h3 className="text-xl font-semibold mb-4 text-purple-500">
            ¿Por qué elegirnos?
          </h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Ambiente limpio, seguro y cómodo</li>
            <li>Técnicas actualizadas y productos de alta calidad</li>
            <li>Atención cálida y amigable</li>
            <li>Citas puntuales y personalizadas</li>
            <li>Más que un servicio, ¡una experiencia!</li>
          </ul>
        </Card>
      </div>

      <Divider />

      {/* Servicios */}
      <div className="flex flex-col md:flex-row gap-8 mb-12 mt-5">
        <div className="flex-1">
          <Card className="shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-purple-500">
              Servicios
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {dataServicios.map((servicio, index) => {
                const imagen = filesDataServicios.find(
                  (img) => img.nombre === servicio.imagen_url
                );

                return (
                  <div
                    key={servicio.id}
                    className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
                  >
                    {imagen && (
                      <img
                        src={imagen.url}
                        alt={servicio.nombre}
                        className="w-full object-cover rounded-md mb-3"
                      />
                    )}
                    <h4 className="text-lg font-semibold text-purple-600 mb-1">
                      {servicio.nombre}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {servicio.descripcion}
                    </p>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>

      <Divider />

      {/* Equipo */}
      {/* <Card className="mb-12">
        <h3 className="text-xl font-semibold mb-4 text-purple-500">
          Nuestro Equipo
        </h3>
        <div className="grid sm:grid-cols-2 gap-6 text-center">
          <div>
            <img
              src="/assets/persona1.jpg"
              className="rounded-full w-32 h-32 mx-auto mb-2 object-cover"
            />
            <h4 className="font-semibold">María Fernanda</h4>
            <p className="text-sm text-gray-600">
              Especialista en uñas acrílicas
            </p>
          </div>
          <div>
            <img
              src="/assets/persona2.jpg"
              className="rounded-full w-32 h-32 mx-auto mb-2 object-cover"
            />
            <h4 className="font-semibold">Daniela López</h4>
            <p className="text-sm text-gray-600">Diseño artístico y 3D</p>
          </div>
        </div>
      </Card> */}

      {/* <Divider /> */}

      {/* Testimonios */}
      <Card className="mb-12">
        <h3 className="text-xl font-semibold mb-4 text-purple-500">
          Testimonios
        </h3>{" "}
        <div className="overflow-hidden w-full">
          <motion.div
            className="flex w-full"
            animate={controls}
            initial={{ x: "0%" }}
          >
            {testimoniosList.map((info, index) => (
              <div key={index} className="min-w-full px-4">
                <div className="bg-gray-100 p-6 rounded-lg shadow text-center max-w-xl mx-auto">
                  <p className="italic text-lg text-gray-700">
                    "{info?.contenido}"
                  </p>
                  <p className="font-semibold mt-4 text-purple-600 text-right">
                    – {info?.nombre}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </Card>

      <div className="text-center">
        <p className="text-lg font-semibold mb-4">
          En <span className="text-purple-600">Nails Art Suray</span>, cuidamos
          cada detalle para que salgas con una sonrisa y unas uñas que te
          encanten.
        </p>
        <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-8 rounded-full transition duration-300 text-lg">
          Reserva tu cita
        </button>
      </div>
    </section>
  );
};

export default AboutUs;
