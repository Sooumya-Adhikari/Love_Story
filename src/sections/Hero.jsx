import React, { useRef } from "react";
import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import ParticlesLayer from "../components/ParticlesLayer.jsx";
import { useTypewriter } from "../hooks/useTypewriter.js";
import { useContent } from "../context/ContentContext.jsx";

export default function Hero() {
  const { content } = useContent();
  const ref = useRef(null);
  const typed = useTypewriter(content.hero.typedMessages);

  function handleMouseMove(e) {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 18;
    const yMove = (e.clientY / innerHeight - 0.5) * 18;
    ref.current?.style.setProperty("--mx", `${x}px`);
    ref.current?.style.setProperty("--my", `${yMove}px`);
  }

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-aurora"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70 transition-transform duration-300"
        style={{
          background:
            "radial-gradient(420px circle at calc(50% + var(--mx,0px)) calc(45% + var(--my,0px)), rgba(203,163,102,0.25), transparent 54%)",
        }}
      />

      <ParticlesLayer kinds={["star", "sparkle"]} count={8} />

      <div className="relative z-10 flex flex-col items-center text-center px-6 gap-8 max-w-3xl">
        <motion.span
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.8 }}
          className="uppercase tracking-[0.5em] text-xs md:text-sm text-ember"
        >
          {content.hero.eyebrow}
        </motion.span>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.35 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-filigree/35 to-ember/25 blur-2xl" />
          <img
            src={content.hero.heroImage}
            alt="Us"
            className="relative w-48 h-60 md:w-64 md:h-80 object-cover rounded-[2rem] shadow-ember border-2 border-filigree/50 hover:scale-[1.01] transition-transform duration-500"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9 }}
          className="font-display italic text-4xl md:text-7xl text-gradient-gold"
        >
          {content.hero.heading}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.8 }}
          className="font-body text-base md:text-xl min-h-[3rem] opacity-90"
        >
          {typed}
          <span className="inline-block w-[2px] h-5 bg-current ml-1 align-middle animate-pulse" />
        </motion.p>
      </div>

      <motion.a
        href="#timeline"
        className="absolute bottom-8 z-10 flex flex-col items-center gap-1 text-xs uppercase tracking-widest opacity-80 text-blush"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        Scroll our story
        <FiChevronDown size={18} />
      </motion.a>
    </section>
  );
}
