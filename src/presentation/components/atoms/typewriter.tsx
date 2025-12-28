"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface TypewriterProps {
  words: string[]
  className?: string
}

export const Typewriter = ({ words, className }: TypewriterProps) => {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [speed, setSpeed] = useState(150)

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[index]
      
      if (isDeleting) {
        setText(currentWord.substring(0, text.length - 1))
        setSpeed(50)
      } else {
        setText(currentWord.substring(0, text.length + 1))
        setSpeed(150)
      }

      if (!isDeleting && text === currentWord) {
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && text === "") {
        setIsDeleting(false)
        setIndex((prev) => (prev + 1) % words.length)
      }
    }

    const timer = setTimeout(handleTyping, speed)
    return () => clearTimeout(timer)
  }, [text, isDeleting, index, words, speed])

  return (
    <span className={className}>
      {text}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="inline-block w-1 h-[1em] bg-secondary ml-1 align-middle"
      />
    </span>
  )
}
