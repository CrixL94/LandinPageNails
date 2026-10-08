import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { supabase } from "../supabaseClient";
import { HashLoader } from "react-spinners";
import Swal from "sweetalert2";
import { InputMask } from "primereact/inputmask";
import { Dropdown } from "primereact/dropdown";
import { generarHoras } from "../Services/Funciones";
import { whatsappUrl } from "../Services/infoNegocio";
import { fechaDesdeISO, formatearFechaLarga } from "../Services/promociones";

const FORM_INICIAL = {
  nombre: "",
  celular: "",
  iddetalleservicio: null,
  fecha: null,
  hora: "",
};

const ERRORES_INICIALES = {
  nombre: false,
  celular: false,
  iddetalleservicio: false,
  fecha: false,
  hora: false,
};

const horasDisponibles = generarHoras();

// Fecha en hora local (YYYY-MM-DD); toISOString() usa UTC y puede cambiar el día
const formatearFecha = (fecha) => {
  const y = fecha.getFullYear();
  const m = String(fecha.getMonth() + 1).padStart(2, "0");
  const d = String(fecha.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const aMinutos = (hora24) => {
  const [h, m] = hora24.split(":").map(Number);
  return h * 60 + m;
};

const minutosAhora = () => {
  const ahora = new Date();
  return ahora.getHours() * 60 + ahora.getMinutes();
};

const esHoy = (fecha) =>
  !!fecha && formatearFecha(fecha) === formatearFecha(new Date());

// Si la fecha es hoy, solo quedan las horas que aún no han pasado
const horasParaFecha = (fecha) =>
  esHoy(fecha)
    ? horasDisponibles.filter((h) => aMinutos(h.value) > minutosAhora())
    : horasDisponibles;

// Primer día reservable: hoy, o mañana si ya no quedan horas hoy
const calcularFechaMinima = () => {
  const fecha = new Date();
  fecha.setHours(0, 0, 0, 0);
  if (horasParaFecha(new Date()).length === 0) fecha.setDate(fecha.getDate() + 1);
  return fecha;
};

const esFechaHoraPasada = (fecha, hora) =>
  fecha < calcularFechaMinima() ||
  (esHoy(fecha) && aMinutos(hora) <= minutosAhora());

// Diálogo de reserva. Se carga bajo demanda desde BotonReservaCita para que
// el calendario, los dropdowns y SweetAlert no pesen en la carga inicial.
// Con `promocion`, la cita se guarda con esa promoción y solo se puede
// agendar hasta su fecha de vencimiento.
const ReservaDialog = ({ visible, onClose, promocion = null }) => {
  const [loading, setLoading] = useState(false);
  const [servicios, setServicios] = useState([]);
  const [formData, setFormData] = useState(FORM_INICIAL);
  const [errors, setErrors] = useState(ERRORES_INICIALES);

  const getServicios = async () => {
    const { data } = await supabase
      .from("vta_detalles_servicios")
      .select("*")
      .eq("id_estado", 1);

    setServicios(data || []);
  };

  // Los servicios se consultan al abrir el diálogo
  useEffect(() => {
    if (visible && servicios.length === 0) getServicios();
  }, [visible, servicios.length]);

  // Con promoción solo se ofrecen sus servicios; si es uno, queda elegido
  const serviciosPromo = promocion?.servicios ?? [];
  const servicioFijo = serviciosPromo.length === 1 ? serviciosPromo[0].id : null;
  const opcionesServicio = serviciosPromo.length
    ? serviciosPromo.map((sp) => servicios.find((s) => s.id === sp.id) ?? sp)
    : servicios;
  const fechaMaxima = promocion ? fechaDesdeISO(promocion.fecha_fin) : null;

  useEffect(() => {
    if (visible && servicioFijo) {
      setFormData((prev) => ({ ...prev, iddetalleservicio: servicioFijo }));
    }
  }, [visible, servicioFijo]);

  const setCampo = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleChange = (e) => setCampo(e.target.name, e.target.value);

  // Al cambiar el día se borra la hora si ya no está disponible en ese día
  const cambiarFecha = (fecha) => {
    setFormData((prev) => {
      const sigueDisponible = horasParaFecha(fecha).some((h) => h.value === prev.hora);
      return { ...prev, fecha, hora: sigueDisponible ? prev.hora : "" };
    });
    setErrors((prev) => ({ ...prev, fecha: false }));
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

    // La hora pudo pasar mientras el diálogo estaba abierto
    if (fecha && hora && esFechaHoraPasada(fecha, hora)) {
      newErrors.hora = "Esa hora ya pasó, elige otra";
    }
    if (fecha && fechaMaxima && fecha > fechaMaxima) {
      newErrors.fecha = "La promoción es válida hasta el " + formatearFechaLarga(promocion.fecha_fin);
    }

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((v) => v);
    if (hasErrors) return;

    setLoading(true);

    const { error } = await supabase.from("citas").insert([
      {
        nombrecompleto: nombre,
        celular,
        dia: formatearFecha(fecha),
        hora,
        iddetalleservicio: formData.iddetalleservicio,
        idestado: 3,
        ...(promocion && { idpromocion: promocion.id }),
      },
    ]);

    setLoading(false);

    if (error?.message?.includes("PROMOCION_NO_DISPONIBLE")) {
      Swal.fire({
        icon: "info",
        title: "Promoción no disponible",
        text: "Esta promoción ya terminó o no aplica para ese día. Puedes reservar tu cita sin la promoción.",
        confirmButtonColor: "#9c5a64",
      });
    } else if (error) {
      Swal.fire({
        icon: "error",
        title: "Algo salió mal",
        text: "No se pudo reservar tu cita. Intenta nuevamente o contáctanos por WhatsApp.",
        footer: `<a href="${whatsappUrl()}" target="_blank" rel="noopener noreferrer">Escribir por WhatsApp</a>`,
        confirmButtonColor: "#9c5a64",
      });
    } else {
      onHide();
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
    onClose();
    setFormData(FORM_INICIAL);
    setErrors(ERRORES_INICIALES);
  };

  const header = (
    <div>
      <p className="eyebrow mb-2">{promocion ? "Promoción" : "Nail's Art Suray"}</p>
      <h2 className="font-display text-3xl font-medium text-ink-900">
        Reserva tu cita
      </h2>
      <p className="mt-1 text-sm font-normal text-ink-500">
        Te confirmaremos por WhatsApp o llamada.
      </p>
    </div>
  );

  return (
      <Dialog
        header={header}
        visible={visible}
        onHide={onHide}
        className="w-[94vw] max-w-lg"
        modal
        blockScroll
        draggable={false}
        dismissableMask
      >
        <form onSubmit={handleSubmit} className="space-y-4 pt-2" noValidate>
          {promocion && (
            <div className="flex items-start gap-3 rounded-2xl bg-brand-50 p-4 ring-1 ring-brand-200">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                <i className="pi pi-tag text-sm" />
              </span>
              <div className="min-w-0 text-sm">
                <p className="font-medium text-ink-900">
                  {promocion.titulo}
                  {promocion.etiqueta && (
                    <span className="ml-2 rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-brand-700 ring-1 ring-brand-200">
                      {promocion.etiqueta}
                    </span>
                  )}
                </p>
                <p className="mt-0.5 text-xs text-ink-500">
                  Válida para citas hasta el {formatearFechaLarga(promocion.fecha_fin)}.
                </p>
              </div>
            </div>
          )}

          {/* NOMBRE */}
          <div>
            <label htmlFor="nombre" className="field-label">
              Nombre completo
            </label>
            <InputText
              id="nombre"
              name="nombre"
              placeholder="Nombre y apellido"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full"
              invalid={errors.nombre}
            />
            {errors.nombre && <p className="field-error">Campo requerido</p>}
          </div>

          {/* CELULAR */}
          <div>
            <label htmlFor="celular" className="field-label">
              Celular
            </label>
            <InputMask
              id="celular"
              name="celular"
              mask="+504 9999-9999"
              placeholder="+504 9999-9999"
              value={formData.celular}
              onChange={handleChange}
              className="w-full"
              invalid={errors.celular}
            />
            {errors.celular && <p className="field-error">Campo requerido</p>}
          </div>

          {/* SERVICIO */}
          <div>
            <label htmlFor="servicio" className="field-label">
              Servicio
            </label>
            <Dropdown
              inputId="servicio"
              name="iddetalleservicio"
              value={formData.iddetalleservicio}
              options={opcionesServicio}
              onChange={(e) => setCampo("iddetalleservicio", e.value)}
              optionLabel="nombre"
              optionValue="id"
              placeholder={
                servicioFijo ? serviciosPromo[0].nombre : "Selecciona un servicio"
              }
              emptyMessage="Cargando servicios…"
              disabled={!!servicioFijo}
              className="w-full"
              invalid={errors.iddetalleservicio}
            />
            {errors.iddetalleservicio && (
              <p className="field-error">Campo requerido</p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* FECHA */}
            <div>
              <label htmlFor="fecha" className="field-label">
                Día
              </label>
              <Calendar
                inputId="fecha"
                name="fecha"
                value={formData.fecha}
                onChange={(e) => cambiarFecha(e.value)}
                className="w-full"
                showIcon
                dateFormat="dd/mm/yy"
                placeholder="Elige un día"
                locale="es"
                minDate={calcularFechaMinima()}
                maxDate={fechaMaxima ?? undefined}
                disabledDays={[0]}
                readOnlyInput
                invalid={!!errors.fecha}
              />
              {errors.fecha && (
                <p className="field-error">
                  {typeof errors.fecha === "string" ? errors.fecha : "Campo requerido"}
                </p>
              )}
            </div>

            {/* HORA */}
            <div>
              <label htmlFor="hora" className="field-label">
                Hora
              </label>
              <Dropdown
                inputId="hora"
                name="hora"
                value={formData.hora}
                options={horasParaFecha(formData.fecha)}
                onChange={(e) => setCampo("hora", e.value)}
                placeholder={formData.fecha ? "Elige una hora" : "Elige primero el día"}
                disabled={!formData.fecha}
                emptyMessage="No quedan horarios para este día"
                className="w-full"
                scrollHeight="240px"
                invalid={!!errors.hora}
              />
              {errors.hora && (
                <p className="field-error">
                  {typeof errors.hora === "string" ? errors.hora : "Campo requerido"}
                </p>
              )}
            </div>
          </div>

          <p className="text-xs text-ink-400">
            Atendemos de lunes a sábado, únicamente con cita previa.
          </p>

          {/* BOTÓN */}
          <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 text-base">
            {loading ? (
              <HashLoader color="white" size={22} />
            ) : (
              <>
                <i className="pi pi-check" />
                Confirmar reserva
              </>
            )}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-ink-500">
          ¿Prefieres escribirnos?{" "}
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand-600 underline-offset-4 hover:underline"
          >
            Reserva por WhatsApp
          </a>
        </p>
      </Dialog>
  );
};

export default ReservaDialog;
