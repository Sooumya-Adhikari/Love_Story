import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import SectionHeading from "../components/SectionHeading.jsx";
import { useContent } from "../context/ContentContext.jsx";

function LetterModal({ letter, onClose }) {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    setTyped("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(letter.body.slice(0, i));
      if (i >= letter.body.length) clearInterval(id);
    }, 18);
    return () => clearInterval(id);
  }, [letter]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-black/70 flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ rotateX: -90, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        exit={{ rotateX: 90, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ transformPerspective: 1200 }}
        onClick={(e) => e.stopPropagation()}
        className="paper-texture relative max-w-lg w-full rounded-lg p-8 md:p-10 shadow-2xl border border-filigree/40"
      >
        <span className="absolute -top-4 -right-4 text-3xl animate-float">
          💌
        </span>
        <span className="block font-body text-xs uppercase tracking-[0.3em] text-ember mb-2">
          {letter.date}
        </span>
        <h3 className="font-display italic text-3xl mb-4 text-blush">
          {letter.title}
        </h3>
        <p className="font-display text-lg leading-relaxed text-blush/90 min-h-[8rem]">
          {typed}
          <span className="inline-block w-[2px] h-5 bg-blush/70 ml-0.5 align-middle animate-pulse" />
        </p>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-blush/60 hover:text-ember"
          aria-label="Close"
        >
          <FiX />
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function LoveLetters() {
  const { content } = useContent();
  const [active, setActive] = useState(null);

  return (
    <section id="letters" className="relative py-24 px-6 md:px-10">
      <SectionHeading
        eyebrow="Sealed With Love"
        title="Love Letters"
        subtitle="Words are easier to keep than to say out loud."
      />

      <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-8">
        {content.letters.map((letter, i) => (
          <motion.button
            key={letter.id}
            onClick={() => setActive(letter)}
            initial={{ opacity: 0, y: 30, rotate: i % 2 ? 3 : -3 }}
            whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 2 : -2 }}
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ rotate: 0, y: -8, scale: 1.03 }}
            transition={{ duration: 0.6 }}
            className="paper-texture text-left rounded-lg p-6 shadow-lg border border-filigree/30 relative"
          >
            <span
              className="absolute -top-3 -left-3 text-2xl animate-float"
              style={{ animationDelay: `${i * 0.5}s` }}
            >
              💗
            </span>
            <span className="block text-xs uppercase tracking-[0.3em] text-ember mb-2">
              {letter.date}
            </span>
            <h3 className="font-display italic text-2xl text-blush mb-2">
              {letter.title}
            </h3>
            <p className="text-sm text-blush/80 line-clamp-2">{letter.body}</p>
            <span className="inline-block mt-4 text-xs uppercase tracking-widest text-ember">
              Open letter →
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <LetterModal letter={active} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
