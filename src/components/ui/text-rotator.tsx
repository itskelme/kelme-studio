"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

// Registrar plugin TextPlugin do GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(TextPlugin);
}

interface TextRotatorProps {
  texts: string[];
  speed?: number;
  delay?: number;
  className?: string;
  cursorClassName?: string;
  delayBetweenTexts?: number;
  onComplete?: () => void;
  typingSpeed?: number;
  deletingSpeed?: number;
  showCursor?: boolean;
}

export function TextRotator({
  texts,
  speed = 40,
  delay = 0,
  delayBetweenTexts = 2,
  className = "",
  cursorClassName = "text-[#27D182]",
  onComplete,
  typingSpeed = 40,
  deletingSpeed = 20,
  showCursor = true,
}: TextRotatorProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const phantomRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!texts.length) return;
    
    const element = textRef.current;
    const cursorElement = cursorRef.current;
    if (!element) return;

    // Iniciar com o primeiro texto da lista e definir a linha de base correta
    // Isso garante que a altura seja consistente desde o início
    gsap.set(element, { 
      text: texts[0], // Mostrar o primeiro texto imediatamente
      height: "auto", // Permitir que a altura seja determinada pelo conteúdo phantom
      lineHeight: "inherit",
      display: "inline-block",
      position: "relative"
    });
    
    // Criar timeline principal
    const mainTimeline = gsap.timeline({
      delay: delay / 1000,
      repeat: -1,
      onComplete,
      repeatDelay: 0.5 // Pequena pausa entre ciclos
    });
    
    // Criar uma animação para cada texto na lista
    texts.forEach((text, index) => {
      const tl = gsap.timeline();
      
      // Pular a digitação do primeiro texto na primeira execução
      // já que configuramos para começar com o primeiro texto
      if (index === 0) {
        // Apenas adicionar uma pausa para o primeiro texto
        tl.to({}, { duration: delayBetweenTexts });
      } else {
        // Digitar o texto com efeito de destaque
        tl.to(element, {
          duration: text.length / (typingSpeed / 10),
          text: text,
          ease: "none",
          onStart: () => {
            // Efeito sutil de destaque ao iniciar novo texto
            if (element) {
              gsap.fromTo(
                element, 
                { color: "#27D182" },
                { color: "inherit", duration: 1.5, ease: "power2.out", delay: 0.2 }
              );
            }
          }
        });
      }
      
      // Pausar antes de começar a apagar
      tl.to({}, { duration: delayBetweenTexts });
      
      // Apagar o texto da direita para a esquerda com velocidade variável
      const deleteTimeline = gsap.timeline();
      for (let i = text.length; i >= 1; i--) {
        // Pequena variação na velocidade para parecer mais natural
        const randomFactor = 0.8 + Math.random() * 0.4; // Variação de 0.8 a 1.2
        deleteTimeline.to(element, {
          duration: (1 / (deletingSpeed / 10)) * randomFactor,
          text: text.substring(0, i),
          ease: "power1.in" // Aceleração suave
        });
      }
      
      // Última animação: substituir último caractere por zero-width space para manter o box model mas ficar invisível
      deleteTimeline.to(element, {
        duration: (1 / (deletingSpeed / 10)),
        text: "\u200B", // Zero-width space (completamente invisível)
        ease: "power1.in",
        onComplete: function() {
          // Garantir que a altura seja mantida mesmo quando vazio
          if (element && phantomRef.current) {
            const height = phantomRef.current.offsetHeight;
            if (height > 0) {
              element.style.minHeight = `${height}px`;
            }
          }
        }
      });
      
      tl.add(deleteTimeline);
      
      // Adicionar a animação deste texto à timeline principal
      mainTimeline.add(tl);
    });
    
    // Animação do cursor
    if (showCursor && cursorElement) {
      gsap.to(cursorElement, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    }
    
    return () => {
      // Limpar animações ao desmontar
      mainTimeline.kill();
      if (showCursor) {
        gsap.killTweensOf(cursorElement);
      }
    };
  }, [texts, delay, delayBetweenTexts, typingSpeed, deletingSpeed, showCursor, onComplete]);

  // Encontre o texto mais longo para determinar a altura
  const longestText = texts.reduce((a, b) => a.length > b.length ? a : b, "");
  
  // Adicione um useEffect para calcular a altura exata do texto mais longo
  useEffect(() => {
    if (phantomRef.current && textRef.current) {
      // Pegue a altura do elemento phantom e aplique ao elemento de texto real
      const height = phantomRef.current.offsetHeight;
      if (height > 0) {
        textRef.current.style.minHeight = `${height}px`;
      }
    }
  }, [texts]); // Recalcular se os textos mudarem

  return (
    <div className={`inline-flex items-center relative md:whitespace-nowrap ${className}`}>
      {/* Phantom text para manter a altura exata do texto mais longo */}
      <div 
        ref={phantomRef}
        aria-hidden="true"
        className="invisible h-auto opacity-0 whitespace-nowrap absolute top-0 left-0"
        style={{ 
          pointerEvents: 'none',
          userSelect: 'none',
          fontSize: 'inherit',
          fontWeight: 'inherit',
          lineHeight: 'inherit',
          fontFamily: 'inherit'
        }}
      >
        {longestText || "PLACEHOLDER TEXT"}
      </div>
      
      {/* Elemento de texto real */}
      <div 
        ref={textRef}
        className="md:whitespace-nowrap"
        style={{ 
          display: 'inline-block',
          position: 'relative',
          lineHeight: 'inherit',
          fontFamily: 'inherit'
        }}
      ></div>
      
      {/* Cursor */}
      {showCursor && (
        <span 
          ref={cursorRef} 
          className={`ml-0.5 ${cursorClassName}`}
          style={{ display: 'inline-block' }}
        >|</span>
      )}
    </div>
  );
}
