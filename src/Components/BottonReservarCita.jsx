import { lazy, Suspense, useState } from "react";

// El diálogo (formulario, calendario, SweetAlert) se descarga solo cuando
// alguien va a reservar; al pasar el mouse se precarga para que abra al instante.
const cargarDialogo = () => import("./ReservaDialog");
const ReservaDialog = lazy(cargarDialogo);

const BotonReservaCita = ({
  textoBoton = "Reserva tu cita",
  variant = "primary",
  className = "",
}) => {
  const [visible, setVisible] = useState(false);
  const [montado, setMontado] = useState(false);

  const abrir = () => {
    setMontado(true);
    setVisible(true);
  };

  return (
    <>
      <button
        type="button"
        className={`${variant === "ghost" ? "btn-ghost" : "btn-primary"} ${className}`}
        onClick={abrir}
        onMouseEnter={cargarDialogo}
        onFocus={cargarDialogo}
      >
        <i className="pi pi-calendar" />
        {textoBoton}
      </button>

      {montado && (
        <Suspense fallback={null}>
          <ReservaDialog visible={visible} onClose={() => setVisible(false)} />
        </Suspense>
      )}
    </>
  );
};

export default BotonReservaCita;
