import React, { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const layerRef = useRef(null);

  useEffect(() => {
    function onMove(e) {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    }

    function onClick(e) {
      if (!layerRef.current) return;
      const particle = document.createElement("span");
      particle.className = "custom-cursor-burst";
      particle.style.left = `${e.clientX}px`;
      particle.style.top = `${e.clientY}px`;
      layerRef.current.appendChild(particle);
      requestAnimationFrame(() => particle.classList.add("animate"));
      setTimeout(() => particle.remove(), 600);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div
      ref={layerRef}
      className="custom-cursor-layer pointer-events-none fixed inset-0 z-[9999]"
    >
      <div
        ref={dotRef}
        className="absolute -translate-x-1/2 -translate-y-1/2 text-lg select-none will-change-transform"
        style={{ left: 0, top: 0 }}
      >
        💗
      </div>
      <style>{`
        .custom-cursor-burst {
          position: absolute;
          width: 18px;
          height: 18px;
          transform: translate(-50%, -50%) scale(0.4);
          border-radius: 50%;
          border: 1px solid rgba(203,163,102,0.9);
          opacity: 0.9;
          pointer-events: none;
          transition: transform 0.4s ease-out, opacity 0.4s ease-out;
        }
        .custom-cursor-burst.animate {
          transform: translate(-50%, -50%) scale(1.8);
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
