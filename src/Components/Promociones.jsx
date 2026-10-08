import { lazy, Suspense, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

// Los diálogos solo se descargan si hay promociones vigentes
const cargarReserva = () => import("./ReservaDialog");
const PromocionesDialog = lazy(() => import("./PromocionesDialog"));
const ReservaDialog = lazy(cargarReserva);

const ESPERA_APERTURA = 1200;

// Aviso de promociones cada vez que se entra al sitio + botón flotante para
// volver a verlas. Al cambiar de página no se repite (el Layout no se recarga).
// Las fechas de vigencia las filtra Supabase (solo devuelve las vigentes).
const Promociones = () => {
  const [promociones, setPromociones] = useState([]);
  const [verPromos, setVerPromos] = useState(false);
  // Una vez abierto, el diálogo queda montado para que cierre con animación
  const [montado, setMontado] = useState(false);

  const abrirPromos = () => {
    setMontado(true);
    setVerPromos(true);
  };
  const [reserva, setReserva] = useState({ visible: false, promocion: null });

  useEffect(() => {
    let cancelado = false;
    let temporizador;

    const cargar = async () => {
      const { data } = await supabase
        .from("promociones")
        .select(
          "id, titulo, descripcion, etiqueta, precio_promocion, imagen_url, fecha_fin, servicios:servicios_detalles!promociones_servicios(id, nombre)"
        )
        .eq("id_estado", 1)
        .order("fecha_fin", { ascending: true });

      if (cancelado || !data?.length) return;
      setPromociones(data);
      // Se precarga para que "Agendar" abra la reserva al instante
      cargarReserva();

      temporizador = setTimeout(abrirPromos, ESPERA_APERTURA);
    };

    cargar();
    return () => {
      cancelado = true;
      clearTimeout(temporizador);
    };
  }, []);

  if (promociones.length === 0) return null;

  const agendar = (promocion) => {
    setVerPromos(false);
    setReserva({ visible: true, promocion });
  };

  return (
    <>
      <button
        type="button"
        onClick={abrirPromos}
        className="fixed bottom-4 left-4 z-40 inline-flex cursor-pointer items-center gap-2 rounded-full bg-brand-600 py-3 pr-5 pl-4 text-sm font-medium text-white shadow-lift transition hover:-translate-y-0.5 hover:bg-brand-700 sm:bottom-6 sm:left-6"
        aria-label="Ver promociones"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
        </span>
        {promociones.length === 1 ? "Promoción" : "Promociones"}
      </button>

      {/* Cada diálogo en su propio Suspense: si comparten uno, mientras se
          descarga la reserva React oculta también el de promociones y este
          queda trabado abierto. */}
      <Suspense fallback={null}>
        {montado && (
          <PromocionesDialog
            visible={verPromos}
            promociones={promociones}
            onClose={() => setVerPromos(false)}
            onAgendar={agendar}
          />
        )}
      </Suspense>
      <Suspense fallback={null}>
        {reserva.promocion && (
          <ReservaDialog
            visible={reserva.visible}
            promocion={reserva.promocion}
            onClose={() => setReserva((prev) => ({ ...prev, visible: false }))}
          />
        )}
      </Suspense>
    </>
  );
};

export default Promociones;
