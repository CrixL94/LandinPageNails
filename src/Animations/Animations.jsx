const easeSoft = [0.22, 1, 0.36, 1];

// deslizar hacia la derecha
export const slideInRight = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: easeSoft },
  },
};

// deslizar hacia la izquierda
export const slideInLeft = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: easeSoft },
  },
};

// aparecer desde abajo
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeSoft },
  },
};

// contenedor que anima a sus hijos en cascada
export const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export const viewportOnce = { once: true, amount: 0.2 };
