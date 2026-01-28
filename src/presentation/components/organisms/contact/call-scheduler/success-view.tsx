"use client";

import { motion } from "framer-motion";
import { RiCheckLine } from "@remixicon/react";
import { FormVariant } from "./types";

interface SuccessViewProps {
  t: (key: string) => string;
  variant: FormVariant;
  selectedDay: string;
  selectedTime: string;
  onReset: () => void;
}

export function SuccessView({ 
  t, 
  variant, 
  selectedDay, 
  selectedTime, 
  onReset 
}: SuccessViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center justify-center text-center p-6 sm:p-10 md:p-12 min-h-[400px] sm:min-h-[450px]"
    >
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-16 h-16 sm:w-20 sm:h-20 bg-accent flex items-center justify-center mb-6 text-white rounded-full shadow-lg shadow-accent/30"
      >
        <RiCheckLine className="w-8 h-8 sm:w-10 sm:h-10" />
      </motion.div>
      
      <h3 className="text-2xl sm:text-3xl font-display font-bold uppercase mb-4">
        {t("bookingConfirmed")}
      </h3>
      
      <p className="text-secondary max-w-md mb-3 text-sm sm:text-base">
        {t("bookingDetails")}
      </p>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-accent/10 border border-accent/30 px-4 py-2 rounded-lg"
      >
        <p className="text-accent font-bold text-sm sm:text-base">
          {selectedDay && t(selectedDay)} {variant === "br" ? "às" : "at"} {selectedTime}
        </p>
      </motion.div>
      
      <button 
        onClick={onReset}
        className="mt-8 text-xs sm:text-sm uppercase tracking-widest border-b border-white/50 pb-1 hover:text-accent hover:border-accent transition-colors"
      >
        {t("sendAnother")}
      </button>
    </motion.div>
  );
}
