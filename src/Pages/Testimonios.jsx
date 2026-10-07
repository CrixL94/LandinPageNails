import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { slideInLeft, slideInRight } from "../Animations/Animations";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { InputMask } from "primereact/inputmask";
import { HashLoader } from "react-spinners";
import { supabase } from "../supabaseClient";
import img from "../assets/reservar.webp";

const FORM_INICIAL = { nombre: "", Celular: "", contenido: "" };

const Testimonios = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(FORM_INICIAL);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // SweetAlert se carga solo al enviar
    const { default: Swal } = await import("sweetalert2");

    const { nombre, Celular, contenido } = formData;

    if (!nombre || !Celular || !contenido) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor, llena todos los campos antes de enviar.",
        confirmButtonColor: "#9c5a64",
      });
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("testimonios").insert([
      {
        nombre,
        contenido,
        Celular,
        idestado: 3,
      },
    ]);

    setLoading(false);

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Error al enviar",
        text: "Hubo un problema al guardar tu testimonio.",
        confirmButtonColor: "#9c5a64",
      });
    } else {
      setFormData(FORM_INICIAL);
      Swal.fire({
        icon: "success",
        title: "Experiencia enviada",
        text: "Gracias por compartir tu experiencia con nosotros.",
        confirmButtonText: "Cerrar",
        confirmButtonColor: "#9c5a64",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) navigate("/");
      });
    }
  };

  return (
    <section className="relative overflow-hidden bg-sand">
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-200/50 blur-3xl" />

      <div className="container-page relative grid min-h-screen items-center gap-14 pt-32 pb-20 md:grid-cols-[1.2fr_1fr]">
        <motion.div variants={slideInRight} initial="hidden" animate="visible">
          <p className="eyebrow mb-5">Reseñas</p>
          <h1 className="heading-xl">Cuéntanos tu experiencia</h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-500 sm:text-lg">
            Tu testimonio nos ayuda a mejorar y a brindar un mejor servicio.
          </p>

          <form onSubmit={handleSubmit} className="card-soft mt-10 space-y-5 p-6 sm:p-10">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="nombre" className="field-label">
                  Nombre y apellido
                </label>
                <InputText
                  id="nombre"
                  name="nombre"
                  placeholder="Tu nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="Celular" className="field-label">
                  Celular
                </label>
                <InputMask
                  id="Celular"
                  name="Celular"
                  mask="+504 9999-9999"
                  placeholder="+504 9999-9999"
                  value={formData.Celular}
                  onChange={handleChange}
                  type="tel"
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contenido" className="field-label">
                Tu reseña
              </label>
              <InputTextarea
                id="contenido"
                name="contenido"
                placeholder="Escribe tu experiencia aquí..."
                value={formData.contenido}
                onChange={handleChange}
                className="w-full"
                rows={5}
                autoResize
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 text-base">
              {loading ? (
                <HashLoader color="white" size={22} />
              ) : (
                <>
                  <i className="pi pi-send" />
                  Enviar testimonio
                </>
              )}
            </button>
            <p className="text-xs text-ink-400">
              *Todos los testimonios son revisados previamente antes de ser
              publicados en nuestro sitio.
            </p>
          </form>
        </motion.div>

        <motion.div
          variants={slideInLeft}
          initial="hidden"
          animate="visible"
          className="relative mx-auto hidden w-full max-w-sm md:block"
        >
          <div className="frame-arch aspect-[4/5] bg-brand-100 shadow-lift">
            <img src={img} alt="Manicura y pedicura" className="h-full w-full object-cover" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonios;
