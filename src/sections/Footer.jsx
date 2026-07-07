import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ParticlesLayer from "../components/ParticlesLayer.jsx";
import { useContent } from "../context/ContentContext.jsx";

export default function Footer() {
  const { content } = useContent();

  return (
    <footer className="relative py-16 px-6 text-center overflow-hidden bg-noir text-blush">
      <ParticlesLayer kinds={["firefly", "star"]} count={6} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative z-10 flex flex-col items-center gap-4 max-w-lg mx-auto"
      >
        <span className="text-4xl animate-heartbeat">💗</span>
        <p className="font-display italic text-xl md:text-2xl text-filigree">
          {content.footerMessage}
        </p>
        <p className="text-xs uppercase tracking-[0.35em] opacity-50">
          {content.couple.nameA} &amp; {content.couple.nameB}
        </p>
        <Link
          to="/admin"
          className="text-[10px] uppercase tracking-widest opacity-30 hover:opacity-70 transition-opacity mt-4"
        >
          admin
        </Link>
      </motion.div>
    </footer>
  );
}
