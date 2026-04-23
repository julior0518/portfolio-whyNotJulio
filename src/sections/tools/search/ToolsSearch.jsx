import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { couture } from "../../../lib/coutureMotion";

export default function ToolsSearch({ query, setQuery, recommendations }) {
  const [focused, setFocused] = useState(false);

  const animationVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: couture.reveal,
    },
  };

  return (
    <motion.div
      initial="hidden"
      variants={animationVariants}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="relative z-10 mx-auto w-full md:max-w-2xl"
    >
      <div className="pointer-events-none absolute left-4 top-1/2 z-20 -translate-y-1/2 text-brass">
        <SearchIcon className="h-5 w-5" />
      </div>
      <input
        type="text"
        placeholder="Search the stack…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 150)}
        className="w-full rounded-full border border-gold/20 bg-white/90 py-3.5 pl-12 pr-5 font-sans text-base text-ink shadow-lux-sm backdrop-blur-sm transition duration-500 placeholder:text-muted focus:border-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/15"
      />
      <AnimatePresence>
        {focused && recommendations.length > 0 ? (
          <motion.ul
            key="suggestions"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={couture.micro}
            className="absolute left-0 right-0 top-full z-30 mt-2 max-h-52 overflow-y-auto rounded-xl border border-gold/15 bg-white py-1 text-sm text-charcoal shadow-lux-md"
          >
            {recommendations.map((slug) => (
              <li key={slug}>
                <button
                  type="button"
                  onMouseDown={() => setQuery(slug)}
                  className="w-full cursor-pointer px-4 py-2.5 text-left transition hover:bg-porcelain"
                >
                  {slug}
                </button>
              </li>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
