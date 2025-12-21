"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

// Registrar plugin TextPlugin do GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(TextPlugin);
}

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  cursor?: boolean;
  repeat?: boolean;
  repeatDelay?: number;
  onComplete?: () => void;
}

export function Typewriter({
  text,
  speed = 40,
  delay = 0,
  className = "",
  cursor = true,
  repeat = false,
  repeatDelay = 2,
  onComplete
}: TypewriterProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = textRef.current;
    const cursorElement = cursorRef.current;
    if (!element) return;

    // Configurar elemento como vazio inicialmente
    gsap.set(element, { text: "" });

    // Criar timeline para animar a digitação
    const tl = gsap.timeline({
      delay: delay / 1000,
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    // Animar a digitação do texto
    tl.to(element, {
      duration: text.length / (speed / 10), // Duração baseada no comprimento do texto e velocidade
      text: text,
      ease: "none"
    });

    // Se tiver cursor, animar o piscar
    if (cursor && cursorElement) {
      gsap.to(cursorElement, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    }

    // Configurar repetição se necessário
    if (repeat) {
      tl.to(element, {
        duration: repeatDelay,
        text: "",
        delay: repeatDelay,
        ease: "none"
      }).repeat(-1);
    }

    return () => {
      // Limpar animações ao desmontar
      tl.kill();
      if (cursor) {
        gsap.killTweensOf(cursorElement);
      }
    };
  }, [text, speed, delay, cursor, repeat, repeatDelay, onComplete]);

  return (
    <div className={`inline-flex items-center ${className}`}>
      <div ref={textRef}></div>
      {cursor && <span ref={cursorRef} className="ml-0.5 text-[#27D182]">|</span>}
    </div>
  );
}
