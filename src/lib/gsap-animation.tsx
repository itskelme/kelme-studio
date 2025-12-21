"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registrar plugins GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Hook para fazer fade-in quando elemento entra no viewport
export const useFadeIn = (
  options = {
    threshold: 0.1,
    duration: 0.8,
    y: 30,
    delay: 0,
    stagger: 0.1,
    ease: "power2.out",
  }
) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    gsap.set(element, {
      opacity: 0,
      y: options.y,
    });

    gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: options.duration,
      delay: options.delay,
      ease: options.ease,
    });
  }, [options]);

  return ref;
};

// Hook para fazer fade-in em vários elementos com um efeito de stagger
export const useFadeInStagger = (
  options = {
    threshold: 0.1,
    duration: 0.8,
    y: 30,
    delay: 0,
    stagger: 0.1,
    ease: "power2.out",
  }
) => {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.children;
    
    gsap.set(elements, {
      opacity: 0,
      y: options.y,
    });

    gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration: options.duration,
      delay: options.delay,
      stagger: options.stagger,
      ease: options.ease,
    });
  }, [options]);

  return containerRef;
};

// Hook para animar com ScrollTrigger quando elemento entra no viewport
export const useScrollAnimation = (
  options = {
    trigger: null,
    start: "top 80%",
    duration: 0.8,
    y: 50,
    opacity: 0,
    stagger: 0,
    ease: "power2.out",
  }
) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: options.start,
        toggleActions: "play none none none",
      },
    });

    gsap.set(element, {
      opacity: options.opacity,
      y: options.y,
    });

    tl.to(element, {
      opacity: 1,
      y: 0,
      duration: options.duration,
      stagger: options.stagger,
      ease: options.ease,
    });

    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill(false);
      }
      tl.kill();
    };
  }, [options]);

  return ref;
};

// Função para animar entrada de elementos usando uma timeline GSAP
export const animateElements = (
  timeline: gsap.core.Timeline,
  elements: HTMLElement[],
  options = {
    y: 30,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out",
  }
) => {
  if (!elements.length) return;

  gsap.set(elements, {
    opacity: 0,
    y: options.y,
  });

  timeline.to(
    elements,
    {
      opacity: 1,
      y: 0,
      duration: options.duration,
      stagger: options.stagger,
      ease: options.ease,
    },
    "<+=0.1"
  );
};

// Interface para o componente de efeito de digitação
interface TypewriterEffectProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
}

// Componente de texto com animação de digitação
export const TypewriterEffect = ({ 
  text, 
  delay = 0, 
  speed = 0.05, 
  className = "" 
}: TypewriterEffectProps) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const chars = element.innerHTML.split("");
    element.innerHTML = "";

    chars.forEach((char) => {
      const span = document.createElement("span");
      span.innerHTML = char === " " ? "&nbsp;" : char;
      span.style.opacity = "0";
      span.style.display = "inline-block";
      element.appendChild(span);
    });

    const spans = element.querySelectorAll("span");
    
    gsap.to(spans, {
      opacity: 1,
      stagger: speed,
      delay: delay,
      ease: "none",
    });
  }, [text, delay, speed]);

  return (
    <div ref={textRef} className={className}>
      {text}
    </div>
  );
};
