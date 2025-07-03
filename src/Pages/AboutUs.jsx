import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import fondo from "../assets/fondo.jpg";

const AboutUs = () => {
  const imagenesHistoria = [fondo, fondo, fondo];
  return (
    <section className="sm:px-[15rem] mb-4 text-gray-800">
      <div className="min-h-screen flex flex-col md:flex-row items-center justify-center sm:mt-0 mt-[7rem]">
        <div className="flex-1">
          <img
            src={`${fondo}`}
            alt="Manicura y Pedicura"
            className="w-full h-full object-cover sm:rounded-xl shadow-lg"
          />
        </div>

        <div className="flex-1 text-center md:text-left sm:p-8 p-4">
          <h1 className="text-2xl sm:text-6xl font-bold text-purple-600 sm:mb-4">
            Sobre Nosotros
          </h1>

          <p className="sm:text-2xl text-base md:text-lg text-gray-600 mb-6">
            <span className="font-semibold sm:text-lg text-base text-purple-500">
              Nails Art Suray
            </span>
            <span> </span>
            nació del sueño de crear un espacio donde la belleza, el cuidado
            personal y el arte se unieran en una experiencia única. Desde
            nuestros inicios en San Pedro Sula, hemos trabajado con dedicación
            para ofrecer un servicio profesional y personalizado que realce la
            belleza natural de cada clienta.
            <br className="hidden sm:block" />
          </p>
        </div>
      </div>

      {/* Mision Vision */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card>
          <h3 className="text-xl font-semibold mb-2 text-purple-500">Misión</h3>
          <p>
            Brindar servicios de manicure y pedicure con altos estándares de
            calidad, higiene y estilo, en un ambiente cómodo, relajante y
            acogedor.
          </p>
        </Card>

        <Card>
          <h3 className="text-xl font-semibold mb-2 text-purple-500">Visión</h3>
          <p>
            Ser el salón de belleza de referencia en la zona, reconocido por
            nuestra creatividad, atención al detalle y compromiso con el
            bienestar de nuestras clientas.
          </p>
        </Card>
      </div>

      <Divider />

      {/* Valores */}
      <div className="mb-12">
        <Card>
          <h3 className="text-xl font-semibold mb-4 text-purple-500">
            Nuestros Valores
          </h3>
          <ul className="list-disc list-inside space-y-1">
            <li>✨ Profesionalismo</li>
            <li>🎨 Creatividad</li>
            <li>🧼 Higiene y seguridad</li>
            <li>🌟 Atención personalizada</li>
            <li>💡 Innovación constante</li>
          </ul>
        </Card>
      </div>

      <Divider />

      {/* Elegirnos */}
      <div className="mb-16">
        <Card>
          <h3 className="text-xl font-semibold mb-4 text-purple-500">
            ¿Por qué elegirnos?
          </h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Ambiente limpio, seguro y cómodo</li>
            <li>Técnicas actualizadas y productos de alta calidad</li>
            <li>Atención cálida y amigable</li>
            <li>Citas puntuales y personalizadas</li>
            <li>Más que un servicio, ¡una experiencia!</li>
          </ul>
        </Card>
      </div>

      <Divider />

      {/* Servicios */}
      <div className="flex flex-col md:flex-row gap-8 mb-12 mt-5">
        <div className="flex-1">
          <Card className="shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-purple-500">
              Servicios
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {imagenesHistoria.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Historia ${index + 1}`}
                  className="rounded-lg object-cover w-full shadow-md hover:scale-105 transition-transform duration-300"
                />
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Divider />

      {/* Equipo */}
      <Card className="mb-12">
        <h3 className="text-xl font-semibold mb-4 text-purple-500">
          Nuestro Equipo
        </h3>
        <div className="grid sm:grid-cols-2 gap-6 text-center">
          <div>
            <img
              src="/assets/persona1.jpg"
              className="rounded-full w-32 h-32 mx-auto mb-2 object-cover"
            />
            <h4 className="font-semibold">María Fernanda</h4>
            <p className="text-sm text-gray-600">
              Especialista en uñas acrílicas
            </p>
          </div>
          <div>
            <img
              src="/assets/persona2.jpg"
              className="rounded-full w-32 h-32 mx-auto mb-2 object-cover"
            />
            <h4 className="font-semibold">Daniela López</h4>
            <p className="text-sm text-gray-600">Diseño artístico y 3D</p>
          </div>
        </div>
      </Card>

      <Divider />

      {/* Testimonios */}
      <Card className="mb-12">
        <h3 className="text-xl font-semibold mb-4 text-purple-500">
          Testimonios
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <p className="italic">
              "Excelente atención y los diseños son hermosos. ¡Siempre salgo
              feliz!"
            </p>
            <p className="font-semibold mt-2 text-right">– Ana M.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <p className="italic">
              "Limpieza, puntualidad y creatividad. Mi lugar favorito sin duda."
            </p>
            <p className="font-semibold mt-2 text-right">– Karla R.</p>
          </div>
        </div>
      </Card>

      <div className="text-center">
        <p className="text-lg font-semibold mb-4">
          En <span className="text-purple-600">Nails Art Suray</span>, cuidamos
          cada detalle para que salgas con una sonrisa y unas uñas que te
          encanten.
        </p>
        <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-8 rounded-full transition duration-300 text-lg">
          Reserva tu cita
        </button>
      </div>
    </section>
  );
};

export default AboutUs;
