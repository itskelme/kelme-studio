"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export type CursorVariant = 'hidden' | 'default' | 'project';

interface CustomCursorProps {
  variant?: CursorVariant;
}

export function CustomCursor({ variant = 'default' }: CustomCursorProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  if (!isMounted) return null;

  const variants = {
    hidden: {
      opacity: 0,
      height: 0,
      width: 0,
      x: mousePosition.x,
      y: mousePosition.y,
    },
    default: {
      opacity: 1,
      height: 16,
      width: 16,
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      backgroundColor: "#ffffff",
      mixBlendMode: "difference" as const,
    },
    project: {
      opacity: 1,
      height: 100,
      width: 100,
      x: mousePosition.x - 50,
      y: mousePosition.y - 50,
      backgroundColor: "#ffffff",
      mixBlendMode: "normal" as const,
    }
  };

  return (
    <motion.div
      className="custom-cursor fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center overflow-hidden"
      variants={variants}
      animate={variant}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.5
      }}
    >
      {variant === 'project' && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="text-black"
        >
          <ArrowUpRight className="w-10 h-10" />
        </motion.div>
      )}
    </motion.div>
  );
}
