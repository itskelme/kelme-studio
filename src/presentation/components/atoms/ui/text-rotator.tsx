"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  typingSpeed = 60,
  deletingSpeed = 40,
  showCursor = true,
}: TextRotatorProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!texts.length) return;

    const currentText = texts[currentIndex];
    const timeout = setTimeout(() => {
      if (isPaused) {
        setIsPaused(false);
        setIsDeleting(true);
        return;
      }

      if (!isDeleting) {
        // Typing
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.substring(0, displayText.length + 1));
        } else {
          // Finished typing, pause before deleting
          setIsPaused(true);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(displayText.substring(0, displayText.length - 1));
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
          if (onComplete && currentIndex === texts.length - 1) {
            onComplete();
          }
        }
      }
    }, isPaused ? delayBetweenTexts * 1000 : isDeleting ? 1000 / deletingSpeed : 1000 / typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, isPaused, currentIndex, texts, typingSpeed, deletingSpeed, delayBetweenTexts, onComplete]);

  const longestText = texts.reduce((a, b) => a.length > b.length ? a : b, "");

  return (
    <div className={`inline-flex items-center relative md:whitespace-nowrap ${className}`}>
      {/* Phantom text for consistent height */}
      <div 
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
      
      {/* Actual text element */}
      <motion.div 
        className="md:whitespace-nowrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ 
          display: 'inline-block',
          position: 'relative',
          lineHeight: 'inherit',
          fontFamily: 'inherit'
        }}
      >
        {displayText || '\u200B'}
      </motion.div>
      
      {/* Cursor */}
      {showCursor && (
        <motion.span 
          className={`ml-0.5 ${cursorClassName}`}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          style={{ display: 'inline-block' }}
        >
          |
        </motion.span>
      )}
    </div>
  );
}
