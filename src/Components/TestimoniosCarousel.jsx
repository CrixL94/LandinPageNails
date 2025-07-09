import { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { motion, useAnimation } from "framer-motion";
import { supabase } from "../supabaseClient";

const TestimoniosCarousel = () => {
  const [testimoniosList, setTestimoniosList] = useState([]);
  const getInfo = async () => {
    const { data: testimonios } = await supabase
      .from("testimonios")
      .select("*");

    const filtrarAprobados = (testimonios || []).filter(
      (s) => s.idestado === 4
    );
    setTestimoniosList(filtrarAprobados);
  };

  useEffect(() => {
    getInfo();
  }, []);

  const controls = useAnimation();

  useEffect(() => {
    let current = 0;

    const interval = setInterval(() => {
      const total = testimoniosList.length;
      current = (current + 1) % total;
      controls.start({
        x: `-${current * 100}%`,
        transition: { duration: 0.8, ease: "easeInOut" },
      });
    }, 4000); // cada 4 segundos

    return () => clearInterval(interval);
  }, [testimoniosList, controls]);

  return (
    <Card className="mb-12">
      <h3 className="text-xl font-semibold mb-4 text-purple-500">
        Testimonios
      </h3>
      <div className="overflow-hidden w-full">
        <motion.div
          className="flex w-full"
          animate={controls}
          initial={{ x: "0%" }}
        >
          {testimoniosList?.map((info, index) => (
            <div key={index} className="min-w-full px-4">
              <div className="bg-gray-100 p-6 rounded-lg shadow text-center max-w-xl mx-auto">
                <p className="italic text-lg text-gray-700">
                  "{info?.contenido}"
                </p>
                <p className="font-semibold mt-4 text-purple-600 text-right">
                  – {info?.nombre}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </Card>
  );
};

export default TestimoniosCarousel;
