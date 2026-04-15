import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import SearchTechStack from "./SearchTechStack";
import { couture } from "../../lib/coutureMotion";

const skills = [
  "adobe-illustrator",
  "angular",
  "arduino",
  "aws",
  "azure-devops",
  "blender",
  "bootstrap",
  "c",
  "canva",
  "css",
  "dart",
  "docker",
  "express",
  "figma",
  "firebase",
  "flutter",
  "git",
  "github",
  "gitlab",
  "graphql",
  "html",
  "jira",
  "java-script",
  "json",
  "kubernetes",
  "linux",
  "material",
  "mongodb",
  "mysql",
  "dotnet",
  "netcore",
  "next",
  "node",
  "npm",
  "openai",
  "postgres",
  "powershell",
  "react",
  "redux",
  "sanity",
  "sass",
  "solidity",
  "tailwind",
  "three",
  "type-script",
  "vite",
  "visual-studio",
  "vue",
  "webpack",
  "xml",
];

function TechStack() {
  const [query, setQuery] = useState("");

  const filteredSkills = skills.filter((skill) =>
    skill.toLowerCase().includes(query.toLowerCase()),
  );

  const recommendations =
    query.length > 0
      ? skills
          .filter((s) => s.toLowerCase().includes(query.toLowerCase()))
          .slice(0, 5)
      : [];

  const randomOffset = () => ({
    x: (Math.random() - 0.5) * 120,
    y: (Math.random() - 0.5) * 120,
    rotate: (Math.random() - 0.5) * 40,
    opacity: 0,
    scale: 0.96,
  });

  return (
    <section
      id="tech"
      className="relative overflow-hidden border-t border-gold/10 bg-canvas text-ink app-padding section-spacing scroll-mt-28"
    >
      <div className="mx-auto mb-10 max-w-3xl">
        <div>
          <p className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.35em] text-brass">
            Instrumentarium
          </p>
          <h2 className="mt-0 font-serif text-4xl font-medium leading-[1.05] tracking-tight text-ink md:text-5xl lg:text-6xl">
            Tools & craft
          </h2>
        </div>
        <p className="mt-5 max-w-xl font-sans text-sm font-light text-muted md:text-base">
          A calm inventory — search the stack you need; the rest stays in the
          wings.
        </p>
      </div>
      <SearchTechStack
        query={query}
        setQuery={setQuery}
        recommendations={recommendations}
      />

      <motion.div className="mt-4 flex w-full flex-wrap items-center justify-center gap-8 py-12 md:gap-10">
        <AnimatePresence mode="popLayout">
          {filteredSkills.length > 0 ? (
            filteredSkills.map((skill) => (
              <motion.img
                key={skill}
                src={`/assets/tech/${skill}.png`}
                alt={skill.replace(/-/g, " ")}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={randomOffset()}
                transition={couture.hover}
                className="h-14 w-14 rounded-lg object-contain opacity-90 transition duration-500 hover:scale-105 hover:opacity-100 md:h-16 md:w-16"
              />
            ))
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-10 font-sans text-sm text-muted"
            >
              No results found.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

export default TechStack;
