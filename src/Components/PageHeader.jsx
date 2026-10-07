import { motion } from "framer-motion";
import { fadeUp, stagger } from "../Animations/Animations";

// Encabezado de las páginas internas
const PageHeader = ({ eyebrow, title, subtitle, children }) => (
  <section className="relative overflow-hidden bg-sand pt-32 pb-16 sm:pt-40 sm:pb-20">
    <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-200/50 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-brand-100 blur-3xl" />

    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="container-page relative text-center"
    >
      {eyebrow && (
        <motion.p variants={fadeUp} className="eyebrow mb-5">
          {eyebrow}
        </motion.p>
      )}
      <motion.h1 variants={fadeUp} className="heading-xl mx-auto max-w-3xl">
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-500 sm:text-lg"
        >
          {subtitle}
        </motion.p>
      )}
      {children && (
        <motion.div variants={fadeUp} className="mt-8">
          {children}
        </motion.div>
      )}
    </motion.div>
  </section>
);

export default PageHeader;
