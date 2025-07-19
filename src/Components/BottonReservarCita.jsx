import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { supabase } from "../supabaseClient";
import { HashLoader } from "react-spinners";
import Swal from "sweetalert2";
import { InputMask } from "primereact/InputMask";
import { Dropdown } from "primereact/dropdown";
import { generarHoras } from "../Services/Funciones";
import SocialIcons from "./SocialIcons";

const BotonReservaCita = ({
  textoAntes,
  textoDespues,
  marca = "Nail`s Art Suray",
  textoBoton,
}) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [servicios, setServicios] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    celular: "",
    iddetalleservicio: null,
    fecha: null,
    hora: "",
  });

  const [errors, setErrors] = useState({
    nombre: false,
    celular: false,
    iddetalleservicio: null,
    fecha: false,
    hora: false,
  });

  const getServicios = async () => {
    const { data, error } = await supabase
      .from("vta_detalles_servicios")
      .select("*")
      .eq("id_estado", 1);

    setServicios(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nombre, celular, fecha, hora } = formData;

    // Validar campos vacíos
    const newErrors = {
      nombre: !nombre.trim(),
      celular: !celular.trim(),
      iddetalleservicio: !formData.iddetalleservicio,
      fecha: !fecha,
      hora: !hora.trim(),
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((v) => v);
    if (hasErrors) return;

    setLoading(true);

    const { error } = await supabase.from("citas").insert([
      {
        nombrecompleto: nombre,
        celular,
        dia: fecha.toISOString().split("T")[0],
        hora,
        iddetalleservicio: formData.iddetalleservicio,
        idestado: 3,
      },
    ]);

    setLoading(false);

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Algo salió mal",
        text: "No se pudo reservar tu cita. Intenta nuevamente o contáctanos por WhatsApp.",
        footer:
          '<a href="https://wa.me/50493367328" target="_blank" rel="noopener noreferrer">Escribir por WhatsApp</a>',
        confirmButtonColor: "#8B5CF6",
      });
    } else {
      setVisible(false);
      setFormData({
        nombre: "",
        celular: "",
        fecha: null,
        hora: "",
      });
      setErrors({
        nombre: false,
        celular: false,
        fecha: false,
        hora: false,
      });
      Swal.fire({
        icon: "success",
        title: "Cita reservada",
        text: "Gracias por reservar con nosotros. Te contactaremos pronto.",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  const onHide = () => {
    setVisible(false);
    setFormData({
      nombre: "",
      celular: "",
      iddetalleservicio: null,
      fecha: null,
      hora: "",
    });
    setErrors({
      nombre: false,
      celular: false,
      iddetalleservicio: false,
      fecha: false,
      hora: false,
    });
  };

  useEffect(() => {
    getServicios();
  }, []);

  const horasDisponibles = generarHoras();

  return (
    <div className="mt-4">
      <div className="text-lg font-semibold mb-4">
        {textoAntes} <span className="text-purple-600">{marca}</span>
        {textoDespues}
      </div>

      <button
        className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-8 rounded-full transition duration-300 text-lg"
        onClick={() => setVisible(true)}
      >
        <i className="pi pi-calendar mr-2" />
        {textoBoton}
      </button>

      <Dialog
        header="Reservar Cita"
        visible={visible}
        onHide={onHide}
        className="w-[100%] sm:w-[40%]"
        modal
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-4 text-left text-gray-700"
        >
          {/* NOMBRE */}
          <div>
            <label htmlFor="nombre" className="font-semibold block mb-2">
              Nombre completo
            </label>
            <InputText
              id="nombre"
              name="nombre"
              placeholder="Nombre y apellido"
              value={formData.nombre}
              onChange={handleChange}
              className={`w-full`}
            />
            {errors.nombre && (
              <p className="text-sm text-red-500 mt-1">Campo requerido</p>
            )}
          </div>

          {/* CELULAR */}
          <div>
            <label htmlFor="celular" className="font-semibold block mb-2">
              Celular
            </label>
            <InputMask
              id="celular"
              name="celular"
              mask="+999 9999-9999"
              placeholder="+504 9999-9999"
              value={formData.celular}
              onChange={handleChange}
              className={`w-full`}
            />
            {errors.celular && (
              <p className="text-sm text-red-500 mt-1">Campo requerido</p>
            )}
          </div>

          <div>
            <label htmlFor="servicio" className="font-semibold block mb-2">
              Servicio
            </label>
            <Dropdown
              id="servicio"
              name="iddetalleservicio"
              value={formData.iddetalleservicio}
              options={servicios}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  iddetalleservicio: e.value,
                }))
              }
              optionLabel="nombre"
              optionValue="id"
              placeholder="Selecciona un servicio"
              className="w-full"
            />
            {errors.iddetalleservicio && (
              <p className="text-sm text-red-500 mt-1">Campo requerido</p>
            )}
          </div>

          {/* FECHA */}
          <div>
            <label htmlFor="fecha" className="font-semibold block mb-2">
              Día
            </label>
            <Calendar
              id="fecha"
              name="fecha"
              value={formData.fecha}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, fecha: e.value }))
              }
              className={`w-full`}
              showIcon
              dateFormat="yy-mm-dd"
              placeholder="Selecciona un día"
              locale="es"
            />
            {errors.fecha && (
              <p className="text-sm text-red-500 mt-1">Campo requerido</p>
            )}
          </div>

          {/* HORA */}
          <div>
            <label htmlFor="hora" className="font-semibold block mb-2">
              Hora
            </label>
            <Dropdown
              id="hora"
              name="hora"
              value={formData.hora}
              options={horasDisponibles}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  hora: e.value,
                }))
              }
              placeholder="Selecciona una hora"
              className={`w-full`}
            />
            {errors.hora && (
              <p className="text-sm text-red-500 mt-1">Campo requerido</p>
            )}
          </div>

          {/* BOTÓN */}
          <button
            type="submit"
            disabled={loading}
            className={`bg-purple-600 hover:bg-purple-700 text-white py-3 px-8 rounded-full transition duration-300 text-lg w-full flex items-center justify-center ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <HashLoader color="white" size={22} />
            ) : (
              <>
                <i className="pi pi-check mr-2"></i>
                Reservar cita
              </>
            )}
          </button>
        </form>

        <div className="flex sm:justify-end justify-center mt-5">
          <p className="text-gray-500 font-semibold">
            Síguenos en nuestras redes
            <SocialIcons />
          </p>
        </div>
      </Dialog>
    </div>
  );
};

export default BotonReservaCita;
