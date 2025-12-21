"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const startTyping = () => {
      if (displayText.length < text.length) {
        timeout = setTimeout(() => {
          setDisplayText(text.substring(0, displayText.length + 1));
        }, 1000 / speed);
      } else if (!isComplete) {
        setIsComplete(true);
        if (onComplete) onComplete();
        
        if (repeat) {
          timeout = setTimeout(() => {
            setDisplayText('');
            setIsComplete(false);
            setIsRepeating(true);
          }, repeatDelay * 1000);
        }
      }
    };

    if (delay > 0 && displayText.length === 0 && !isRepeating) {
      timeout = setTimeout(() => {
        setIsRepeating(true);
        startTyping();
      }, delay);
    } else {
      startTyping();
    }

    return () => clearTimeout(timeout);
  }, [displayText, text, speed, delay, repeat, repeatDelay, isComplete, isRepeating, onComplete]);

  return (
    <div className={`inline-flex items-center ${className}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {displayText}
      </motion.div>
      {cursor && (
        <motion.span 
          className="ml-0.5 text-[#27D182]"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        >
          |
        </motion.span>
      )}
    </div>
  );
}
