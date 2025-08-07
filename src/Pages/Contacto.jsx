import { useState } from "react";
import contactImg from "../assets/reservar.webp";
import { motion } from "framer-motion";
import { slideInRight } from "../Animations/Animations";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { supabase } from "../supabaseClient";
import Swal from "sweetalert2";
import SocialIcons from "../Components/SocialIcons";
import MapView from "../Components/Mapa";
import { HashLoader } from "react-spinners";
import { InputMask } from "primereact/inputmask";

const Contacto = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    celular: "",
    email: "",
    mensaje: "",
  });

  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const { nombre, celular, email, mensaje } = formData;

    if (!nombre || !celular || !mensaje) {
      Swal.fire({
        title: "Campos incompletos",
        text: "Por favor, completa tu nombre, celular y mensaje antes de enviar.",
        icon: "warning",
        confirmButtonText: "Entendido",
        confirmButtonColor: "#8B5CF6",
      });
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("contactos").insert([
      {
        nombre,
        celular,
        email,
        mensaje,
        id_estado: 3,
      },
    ]);

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Algo salió mal",
        text: "No se pudo enviar tu mensaje. Puedes contactarnos directamente por WhatsApp.",
        footer:
          '<a href="https://wa.me/50493367328" target="_blank" rel="noopener noreferrer">Escribir por WhatsApp</a>',
        confirmButtonColor: "#8B5CF6",
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Mensaje enviado",
        text: "Gracias por contactarnos. Te responderemos lo antes posible.",
        showConfirmButton: false,
        timer: 3000,
      });
      setFormData({ nombre: "", celular: "", email: "", mensaje: "" });
      setLoading(false);
    }
  };

  return (
    <motion.div variants={slideInRight} initial="hidden" animate="visible">
      <section className="sm:px-[15rem] sm:mb-0 mb-4 text-gray-800">
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen">
          <div className="flex-1 text-center md:text-left sm:p-8 p-4">
            <h1 className="text-2xl sm:text-6xl font-bold text-purple-600 sm:mb-4 sm:mt-0 mt-[7rem]">
              Contáctanos
            </h1>

            <p className="sm:text-2xl text-base md:text-lg text-gray-600 mb-6">
              ¿Tienes dudas o deseas reservar una cita? Estamos aquí para
              ayudarte.
              <br className="hidden sm:block" />
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label htmlFor="nombre" className="font-semibold block mb-2">
                  Nombre
                </label>
                <InputText
                  id="nombre"
                  name="nombre"
                  placeholder="Nombre y apellido"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="celular" className="font-semibold block mb-2">
                  Celular
                </label>
                <InputMask
                  id="celular"
                  name="celular"
                  mask="+504 9999-9999"
                  placeholder="+504 9999-9999"
                  value={formData.celular}
                  onChange={handleChange}
                  type="tel"
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="email" className="font-semibold block mb-2">
                  Correo electrónico (opcional)
                </label>
                <InputText
                  id="email"
                  name="email"
                  placeholder="ejemplo@correo.com"
                  keyfilter="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="mensaje" className="font-semibold block mb-2">
                  Mensaje
                </label>
                <InputTextarea
                  id="mensaje"
                  name="mensaje"
                  placeholder="Mensaje....."
                  value={formData.mensaje}
                  onChange={handleChange}
                  className="w-full"
                  rows={4}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`bg-purple-600 hover:bg-purple-700 text-white py-3 px-8 rounded-full transition duration-300 text-lg w-full mb-2 flex items-center justify-center cursor-pointer ${
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
                    Enviar mensaje
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-left text-sm text-gray-600 grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div>
                <p className="text-gray-500 font-semibold mb-2">
                  Síguenos en nuestras redes:
                </p>
                <SocialIcons />
              </div>
              <div>
                <p className="mb-1 font-semibold">📍 Dirección:</p>
                <p>Residencial Green Valley</p>
              </div>
              <div>
                <p className="mb-1 font-semibold">🕒 Horario de atención:</p>
                <p>Lunes a Sábado</p>
                <p className="text-gray-500">
                  * Atendemos únicamente con cita previa
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <img
              src={contactImg}
              alt="Manicura y Pedicura"
              className="w-full h-full object-cover sm:rounded-xl shadow-lg"
            />
          </div>
        </div>

        <div>
          <MapView />
        </div>
      </section>
    </motion.div>
  );
};

export default Contacto;
