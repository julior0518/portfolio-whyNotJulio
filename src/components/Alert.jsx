import { AnimatePresence, motion } from "motion/react";

const styles = {
  danger: {
    shell: "bg-red-900/95 border border-red-700/50 text-red-50",
    badge: "bg-red-500 text-white",
    label: "Failed",
  },
  success: {
    shell:
      "border border-emerald-500/35 bg-emerald-950/95 text-emerald-50 shadow-lux-sm backdrop-blur-sm",
    badge: "bg-emerald-400 text-emerald-950",
    label: "Sent",
  },
};

export default function Alert({ type, text }) {
  const s = styles[type] ?? styles.success;
  const alertVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -50, scale: 0.8 },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-5 right-5 z-50 flex items-center justify-center"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={alertVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div
          className={`flex items-center rounded-md p-5 leading-none lg:inline-flex lg:rounded-full ${s.shell}`}
        >
          <p
            className={`mr-3 flex rounded-full px-2 py-1 text-xs font-semibold uppercase ${s.badge}`}
          >
            {s.label}
          </p>
          <p className="mr-2 max-w-[min(100vw-6rem,22rem)] text-left text-sm font-light">
            {text}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
