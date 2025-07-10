const BotonReservaCita = ({
  textoAntes,
  textoDespues,
  marca = "Nail`s Art Suray",
  textoBoton,
}) => {
  return (
    <div className="mt-4">
      <div className="text-lg font-semibold mb-4">
        {textoAntes} <span className="text-purple-600">{marca}</span>
        {textoDespues}
      </div>

      <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-8 rounded-full transition duration-300 text-lg">
        <i className="pi pi-calendar mr-2" />
        {textoBoton}
      </button>
    </div>
  );
};

export default BotonReservaCita;
