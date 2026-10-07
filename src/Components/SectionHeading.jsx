import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "../Animations/Animations";

const SectionHeading = ({ eyebrow, title, subtitle, align = "center", className = "" }) => {
  const centered = align === "center";

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-xl"} ${className}`}
    >
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2 className="heading-lg">{title}</h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-ink-500 sm:text-lg">{subtitle}</p>}
    </motion.div>
  );
};

export default SectionHeading;
