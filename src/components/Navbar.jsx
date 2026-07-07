import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useContent } from "../context/ContentContext.jsx";

const LINKS = [
  { href: "#timeline", label: "Timeline" },
  { href: "#gallery", label: "Gallery" },
  { href: "#letters", label: "Letters" },
  { href: "#countdown", label: "Us" },
  { href: "#dreams", label: "Dreams" },
];

export default function Navbar() {
  const { content } = useContent();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 transition-colors duration-500 ${
        scrolled ? "backdrop-blur-md bg-[var(--bg)]/70 shadow-sm" : ""
      }`}
    >
      <a href="#top" className="font-script text-2xl md:text-3xl text-ember">
        {content.couple.nameA} <span className="text-filigree">&amp;</span>{" "}
        {content.couple.nameB}
      </a>

      <nav className="hidden md:flex items-center gap-8 font-body text-sm uppercase tracking-widest text-blush/90">
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="relative opacity-80 hover:opacity-100 hover:text-filigree transition-colors"
          >
            {l.label}
          </a>
        ))}
      </nav>
    </motion.header>
  );
}
