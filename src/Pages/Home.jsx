import imgFondo from "../assets/images/nailshome.jpg";

const Home = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center min-h-screen sm:px-[15rem] sm:mb-0 mb-4">
      <div className="flex-1 text-center md:text-left sm:p-8 p-4">
        <h1 className="text-2xl sm:text-6xl font-bold text-pink-600 sm:mb-4 sm:mt-0 mt-[7rem]">
          Nail`s Art Suray
        </h1>

        <p className="sm:text-2xl text-base md:text-lg text-gray-600 mb-6">
          <span className="font-semibold sm:text-lg text-base text-pink-500">
            Tu bienestar y belleza son nuestra prioridad.
          </span>
          <span> </span>
          Disfruta una experiencia única en manicura y pedicura, con atención
          personalizada y un ambiente diseñado para relajarte.
          <br className="hidden sm:block" />
          <span className="font-semibold">
            ¡Reserva tu cita y luce unas uñas espectaculares!
          </span>
        </p>

        <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300">
          Reserva tu cita
        </button>
      </div>

      <div className="flex-1">
        <img
          src={imgFondo}
          alt="Manicura y Pedicura"
          className="w-full h-full object-cover sm:rounded-xl shadow-lg"
        />
      </div>
    </section>
  );
};

export default Home;