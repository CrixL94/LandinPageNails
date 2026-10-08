import { Dialog } from "primereact/dialog";
import { urlArchivo } from "../Services/Funciones";
import { diasParaVencer, formatearFechaLarga, formatearPrecio } from "../Services/promociones";

const textoVigencia = (fechaFin) => {
  const dias = diasParaVencer(fechaFin);
  if (dias <= 0) return "¡Último día!";
  if (dias === 1) return "Termina mañana";
  return `Válida hasta el ${formatearFechaLarga(fechaFin)}`;
};

const TarjetaPromocion = ({ promo, onAgendar }) => {
  const imagen = urlArchivo("imagenes", "Promociones", promo.imagen_url);
  const urgente = diasParaVencer(promo.fecha_fin) <= 1;

  return (
    <article className="overflow-hidden rounded-3xl bg-white ring-1 ring-brand-100">
      <div className="relative aspect-[16/9] bg-gradient-to-br from-brand-200 via-brand-100 to-sand">
        {imagen ? (
          <img src={imagen} alt={promo.titulo} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full flex-col items-center justify-center px-6 text-center">
            <i className="pi pi-sparkles mb-2 text-xl text-brand-500" />
            <span className="font-display text-5xl leading-none font-semibold text-brand-700 [font-variant-numeric:lining-nums]">
              {promo.etiqueta || "Promo"}
            </span>
          </div>
        )}
        {imagen && promo.etiqueta && (
          <span className="absolute top-3 left-3 rounded-full bg-brand-600 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-white shadow-soft">
            {promo.etiqueta}
          </span>
        )}
      </div>

      <div className="p-5 sm:p-6">
        <h3 className="font-display text-3xl leading-tight font-medium text-ink-900">
          {promo.titulo}
        </h3>
        {promo.descripcion && (
          <p className="mt-2 text-sm whitespace-pre-line text-ink-500">{promo.descripcion}</p>
        )}

        {(promo.servicios?.length > 0 || promo.precio_promocion !== null) && (
          <div className="mt-4 flex flex-wrap items-end justify-between gap-2 rounded-2xl bg-brand-50 px-4 py-3">
            {promo.servicios?.length > 0 && (
              <div className="min-w-0 text-sm text-ink-700">
                <span className="block text-xs tracking-wide text-ink-400 uppercase">
                  {promo.servicios.length > 1 ? "Servicios" : "Servicio"}
                </span>
                <ul>
                  {promo.servicios.map((s) => (
                    <li key={s.id}>{s.nombre}</li>
                  ))}
                </ul>
              </div>
            )}
            {promo.precio_promocion !== null && (
              <span className="font-display text-2xl font-semibold text-brand-700 [font-variant-numeric:lining-nums]">
                {formatearPrecio(promo.precio_promocion)}
              </span>
            )}
          </div>
        )}

        <p
          className={`mt-4 flex items-center gap-2 text-xs ${
            urgente ? "font-medium text-brand-700" : "text-ink-500"
          }`}
        >
          <i className="pi pi-clock text-[0.75rem]" />
          {textoVigencia(promo.fecha_fin)}
        </p>

        <button
          type="button"
          onClick={() => onAgendar(promo)}
          className="btn-primary mt-4 w-full py-3.5 text-base"
        >
          <i className="pi pi-calendar" />
          <span className="sm:hidden">Agendar ahora</span>
          <span className="hidden sm:inline">Agendar con esta promoción</span>
        </button>
      </div>
    </article>
  );
};

const PromocionesDialog = ({ visible, promociones, onClose, onAgendar }) => {
  const varias = promociones.length > 1;

  const header = (
    <div>
      <p className="eyebrow mb-2">Por tiempo limitado</p>
      <h2 className="font-display text-3xl font-medium text-ink-900">
        {varias ? "Promociones" : "Promoción especial"}
      </h2>
    </div>
  );

  return (
    <Dialog
      header={header}
      visible={visible}
      onHide={onClose}
      className="w-[94vw] max-w-md"
      modal
      blockScroll
      draggable={false}
      dismissableMask
    >
      <div className="space-y-5 pt-1">
        {promociones.map((promo) => (
          <TarjetaPromocion key={promo.id} promo={promo} onAgendar={onAgendar} />
        ))}
      </div>
      <button type="button" onClick={onClose} className="btn-ghost mt-5 w-full">
        Ahora no
      </button>
      <p className="mt-3 text-center text-xs text-ink-400">
        Puedes volver a verlas con el botón «Promociones».
      </p>
    </Dialog>
  );
};

export default PromocionesDialog;
