import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger, viewportOnce } from "../Animations/Animations";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { supabase } from "../supabaseClient";
import Swal from "sweetalert2";
import SocialIcons from "../Components/SocialIcons";
import MapView from "../Components/Mapa";
import PageHeader from "../Components/PageHeader";
import SectionHeading from "../Components/SectionHeading";
import { HashLoader } from "react-spinners";
import { InputMask } from "primereact/inputmask";
import { NEGOCIO, whatsappUrl } from "../Services/infoNegocio";

const ACCESOS = [
  {
    icono: "pi pi-whatsapp",
    titulo: "WhatsApp",
    texto: "Respuesta rápida",
    href: whatsappUrl(),
    externo: true,
  },
  {
    icono: "pi pi-phone",
    titulo: "Llámanos",
    texto: NEGOCIO.telefonoVisible,
    href: `tel:${NEGOCIO.telefono}`,
  },
  {
    icono: "pi pi-clock",
    titulo: "Horario",
    texto: NEGOCIO.horario,
    nota: NEGOCIO.nota,
  },
];

const FORM_INICIAL = { nombre: "", celular: "", email: "", mensaje: "" };

// `embedded`: se muestra dentro de Inicio, sin el encabezado de página
const Contacto = ({ embedded = false }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(FORM_INICIAL);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nombre, celular, email, mensaje } = formData;

    if (!nombre || !celular || !mensaje) {
      Swal.fire({
        title: "Campos incompletos",
        text: "Por favor, completa tu nombre, celular y mensaje antes de enviar.",
        icon: "warning",
        confirmButtonText: "Entendido",
        confirmButtonColor: "#9c5a64",
      });
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("contactos").insert([
      {
        nombre,
        celular,
        email,
        mensaje,
        id_estado: 3,
      },
    ]);

    setLoading(false);

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Algo salió mal",
        text: "No se pudo enviar tu mensaje. Puedes contactarnos directamente por WhatsApp.",
        footer: `<a href="${whatsappUrl()}" target="_blank" rel="noopener noreferrer">Escribir por WhatsApp</a>`,
        confirmButtonColor: "#9c5a64",
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Mensaje enviado",
        text: "Gracias por contactarnos. Te responderemos lo antes posible.",
        showConfirmButton: false,
        timer: 3000,
      });
      setFormData(FORM_INICIAL);
    }
  };

  return (
    <>
      {embedded ? null : (
        <PageHeader
          eyebrow="Contacto"
          title="Hablemos"
          subtitle="¿Tienes dudas o deseas reservar una cita? Estamos aquí para ayudarte."
        />
      )}

      <section className={`container-page ${embedded ? "py-20 sm:py-28" : "py-16 sm:py-20"}`}>
        {embedded && (
          <SectionHeading
            eyebrow="Contacto"
            title="Hablemos"
            subtitle="¿Tienes dudas o deseas reservar una cita? Estamos aquí para ayudarte."
            className="mb-12"
          />
        )}

        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          {/* Accesos directos */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col gap-4"
          >
            {ACCESOS.map((item) => {
              const Tag = item.href ? "a" : "div";
              return (
                <motion.div key={item.titulo} variants={fadeUp}>
                  <Tag
                    {...(item.href && { href: item.href })}
                    {...(item.externo && { target: "_blank", rel: "noopener noreferrer" })}
                    className={`card-soft flex items-center gap-4 p-5 ${
                      item.href ? "group transition duration-300 hover:-translate-y-0.5 hover:shadow-lift" : ""
                    }`}
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition group-hover:bg-brand-600 group-hover:text-white">
                      <i className={`${item.icono} text-lg`} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="font-display block text-xl text-ink-900">{item.titulo}</span>
                      <span className="block text-sm text-ink-500">{item.texto}</span>
                      {item.nota && <span className="block text-xs text-ink-400">{item.nota}</span>}
                    </span>
                    {item.href && (
                      <i className="pi pi-arrow-right text-xs text-brand-400 transition-transform group-hover:translate-x-1" />
                    )}
                  </Tag>
                </motion.div>
              );
            })}

            <motion.div variants={fadeUp} className="card-soft p-5">
              <p className="mb-3 text-sm font-medium text-ink-700">Síguenos en nuestras redes</p>
              <SocialIcons size="sm" />
            </motion.div>
          </motion.div>

          {/* Formulario */}
          <motion.form
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            onSubmit={handleSubmit}
            className="card-soft space-y-5 p-6 sm:p-10"
          >
            <div>
              <h2 className="heading-md">Envíanos un mensaje</h2>
              <p className="mt-1 text-sm text-ink-500">Te responderemos lo antes posible.</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="contacto-nombre" className="field-label">
                  Nombre
                </label>
                <InputText
                  id="contacto-nombre"
                  name="nombre"
                  placeholder="Nombre y apellido"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="contacto-celular" className="field-label">
                  Celular
                </label>
                <InputMask
                  id="contacto-celular"
                  name="celular"
                  mask="+504 9999-9999"
                  placeholder="+504 9999-9999"
                  value={formData.celular}
                  onChange={handleChange}
                  type="tel"
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contacto-email" className="field-label">
                Correo electrónico <span className="font-normal text-ink-400">(opcional)</span>
              </label>
              <InputText
                id="contacto-email"
                name="email"
                placeholder="ejemplo@correo.com"
                keyfilter="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="contacto-mensaje" className="field-label">
                Mensaje
              </label>
              <InputTextarea
                id="contacto-mensaje"
                name="mensaje"
                placeholder="Cuéntanos qué necesitas…"
                value={formData.mensaje}
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
                  Enviar mensaje
                </>
              )}
            </button>
          </motion.form>
        </div>

        <div className="mt-12">
          <MapView />
        </div>
      </section>
    </>
  );
};

export default Contacto;
