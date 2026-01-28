"use client";

import { motion } from "framer-motion";
import { RiFileTextLine, RiCalendarLine } from "@remixicon/react";
import { Controller } from "react-hook-form";
import { StepProps } from "./types";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

interface ConfirmationStepProps extends StepProps {
  selectedDay: string;
  selectedTime: string;
}

export function ConfirmationStep({ 
  control, 
  t, 
  variant,
  selectedDay, 
  selectedTime 
}: ConfirmationStepProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent/20 rounded-lg flex items-center justify-center">
          <RiFileTextLine className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-display font-bold uppercase">
            {t("confirmBooking")}
          </h3>
          <p className="text-secondary text-xs sm:text-sm">
            {variant === "br" ? "Detalhes opcionais para nos ajudar" : "Optional details to help us prepare"}
          </p>
        </div>
      </div>

      {/* Schedule Summary */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-accent/10 border border-accent/30 p-3 sm:p-4 rounded-lg"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] sm:text-xs uppercase tracking-widest text-accent/70 mb-0.5">
              {variant === "br" ? "Agendado para" : "Scheduled for"}
            </p>
            <p className="text-white font-bold text-sm sm:text-lg">
              {selectedDay && t(selectedDay)} {variant === "br" ? "às" : "at"} {selectedTime}
            </p>
          </div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent/20 rounded-full flex items-center justify-center">
            <RiCalendarLine className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
          </div>
        </div>
      </motion.div>

      {/* Optional Fields */}
      <motion.div 
        className="space-y-4 sm:space-y-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Company Field */}
        <motion.div variants={itemVariants} className="group relative">
          <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-secondary block mb-1.5 sm:mb-2">
            {t("company")} <span className="text-white/40 font-normal">
              ({variant === "br" ? "Opcional" : "Optional"})
            </span>
          </label>
          <Controller
            name="company"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder={variant === "br" ? "Sua empresa ou organização" : "Your company or organization"}
                className="w-full bg-transparent border-b border-white/20 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:outline-none focus:border-accent transition-colors placeholder:text-white/30"
              />
            )}
          />
        </motion.div>

        {/* Message Field */}
        <motion.div variants={itemVariants} className="group relative">
          <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-secondary block mb-1.5 sm:mb-2">
            {t("aboutProject")} <span className="text-white/40 font-normal">
              ({variant === "br" ? "Opcional" : "Optional"})
            </span>
          </label>
          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                rows={3}
                className="w-full bg-transparent border-b border-white/20 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:outline-none focus:border-accent transition-colors resize-none placeholder:text-white/30"
                placeholder={t("aboutProjectPlaceholder")}
              />
            )}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
