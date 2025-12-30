"use client";

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export type CursorVariant = 'hidden' | 'default' | 'project';

interface CustomCursorProps {
  variant?: CursorVariant;
}

export function CustomCursor({ variant = 'default' }: CustomCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number | undefined>(undefined);
  const [isHovering, setIsHovering] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isInViewport, setIsInViewport] = useState(true);

  useEffect(() => {
    setIsMounted(true);

    const hasHover = window.matchMedia('(hover: hover)').matches;
    if (!hasHover) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const speed = prefersReducedMotion ? 1 : 0.2;

    const isClickableElement = (element: Element | null): boolean => {
      if (!element) return false;
      
      const clickableSelectors = [
        'a',
        'button',
        'input',
        'textarea',
        'select',
        'label',
        'svg',
        '[role="button"]',
        '[onclick]',
        '[data-clickable]',
        '[tabindex]'
      ];
      
      return clickableSelectors.some(selector => {
        try {
          return element.matches(selector) || element.closest(selector) !== null;
        } catch {
          return false;
        }
      });
    };

    const updateMousePosition = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      
      const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
      const shouldExpand = isClickableElement(elementUnderCursor);
      setIsHovering(shouldExpand);
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.relatedTarget as Node | null;
      if (!target || target.nodeName === 'HTML') {
        setIsInViewport(false);
      }
    };

    const handleMouseEnter = () => {
      setIsInViewport(true);
    };

    const updateCursorPosition = () => {
      const diffX = mousePos.current.x - cursorPos.current.x;
      const diffY = mousePos.current.y - cursorPos.current.y;

      cursorPos.current.x += diffX * speed;
      cursorPos.current.y += diffY * speed;

      if (cursorRef.current) {
        const { offsetWidth, offsetHeight } = cursorRef.current;
        const halfWidth = offsetWidth / 2;
        const halfHeight = offsetHeight / 2;
        cursorRef.current.style.transform = `translate3d(${cursorPos.current.x - halfWidth}px, ${cursorPos.current.y - halfHeight}px, 0)`;
      }

      animationFrameId.current = requestAnimationFrame(updateCursorPosition);
    };

    window.addEventListener('mousemove', updateMousePosition);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    animationFrameId.current = requestAnimationFrame(updateCursorPosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  if (!isMounted) return null;

  const getSize = () => {
    if (variant === 'hidden') return 0;
    if (variant === 'project') return 100;
    return isHovering ? 40 : 16;
  };

  const cursorSize = getSize();

  return (
    <motion.div
      ref={cursorRef}
      className="custom-cursor fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center overflow-hidden"
      style={{
        willChange: 'transform, width, height',
        transform: 'translate3d(-100px, -100px, 0)',
      }}
      animate={{
        width: cursorSize,
        height: cursorSize,
        opacity: variant === 'hidden' || !isInViewport ? 0 : 1,
        backgroundColor: variant === 'project' ? '#ffffff' : isHovering ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.1)',
      }}
      transition={{
        width: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
        height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
        backgroundColor: { duration: 0.3, ease: 'easeInOut' },
        opacity: { duration: 0.3, ease: 'easeInOut' }
      }}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: variant === 'project' || isHovering ? 'none' : '2px solid rgba(255, 255, 255, 0.3)',
          backdropFilter: variant === 'default' ? 'invert(100%)' : 'none',
          boxShadow: isHovering && variant === 'default' ? '0 0 0 1px rgba(255, 255, 255, 0.3)' : 'none',
          transition: 'border 0.25s ease, box-shadow 0.25s ease, backdrop-filter 0.25s ease'
        }}
      />
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
