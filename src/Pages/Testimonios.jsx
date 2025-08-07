import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { slideInRight } from "../Animations/Animations";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { InputMask } from "primereact/inputmask";
import Swal from "sweetalert2";
import { supabase } from "../supabaseClient";
import img from "../assets/reservar.webp";

const Testimonios = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    Celular: "",
    contenido: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { nombre, Celular, contenido } = formData;

    if (!nombre || !Celular || !contenido) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor, llena todos los campos antes de enviar.",
        confirmButtonColor: "#8B5CF6",
      });
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("testimonios").insert([
      {
        nombre,
        contenido,
        Celular,
        idestado: 3,
      },
    ]);

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Error al enviar",
        text: "Hubo un problema al guardar tu testimonio.",
        confirmButtonColor: "#8B5CF6",
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Experiencia enviada",
        text: "Gracias por compartir tu experiencia con nosotros.",
        confirmButtonText: "Cerrar",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/";
        }
      });

      // Limpiar formulario y quitar loading
      setFormData({ nombre: "", Celular: "", contenido: "" });
      setLoading(false);
    }
  };

  return (
    <motion.div variants={slideInRight} initial="hidden" animate="visible">
      <section className="sm:px-[15rem] sm:mb-0 mb-4 text-gray-800">
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen">
          <div className="flex-1 text-center md:text-left sm:p-8 p-4">
            <h1 className="text-2xl sm:text-6xl font-bold text-purple-600 sm:mb-4 sm:mt-0 mt-[7rem]">
              Cuéntanos tu experiencia
            </h1>

            <p className="sm:text-2xl text-base md:text-lg text-gray-600 mb-6">
              Tu testimonio nos ayuda a mejorar y a brindar un mejor servicio.
            </p>

            <form
              onSubmit={handleSubmit}
              className="max-w-2xl mx-auto space-y-6 text-left"
            >
              <div>
                <label htmlFor="nombre" className="font-semibold block mb-2">
                  Nombre y Apellido
                </label>
                <InputText
                  id="nombre"
                  name="nombre"
                  placeholder="Tu nombre"
                  value={formData?.nombre}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="Celular" className="font-semibold block mb-2">
                  Celular
                </label>
                <InputMask
                  id="Celular"
                  name="Celular"
                  mask="+504 9999-9999"
                  placeholder="+504 9999-9999"
                  value={formData?.Celular}
                  onChange={handleChange}
                  type="tel"
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="contenido" className="font-semibold block mb-2">
                  Tu reseña
                </label>
                <InputTextarea
                  id="contenido"
                  name="contenido"
                  placeholder="Escribe tu experiencia aquí..."
                  value={formData?.contenido}
                  onChange={handleChange}
                  className="w-full"
                  rows={5}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`bg-purple-600 hover:bg-purple-700 text-white py-3 px-8 rounded-full w-full text-lg transition duration-300 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <>
                    <HashLoader color="white" size={22} />
                  </>
                ) : (
                  <>
                    <i className="pi pi-send mr-2"></i>
                    Enviar Testimonio
                  </>
                )}
              </button>
              <p className="text-sm text-gray-500 mb-6">
                *Todos los testimonios son revisados previamente antes de ser
                publicados en nuestro sitio.
              </p>
            </form>
          </div>

          <div className="flex-1">
            <img
              src={img}
              alt="Manicura y Pedicura"
              className="w-full h-full object-cover sm:rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Testimonios;
