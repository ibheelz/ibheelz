"use client";

import { useEffect, useState } from "react";

export default function GradientScanner() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-red to-transparent opacity-20"
        style={{
          animation: "scan 6s linear infinite",
          backgroundSize: "100% 100%",
        }}
      />
      <style>{`
        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
      `}</style>
    </div>
  );
}
