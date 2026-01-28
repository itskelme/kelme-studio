"use client";

import { motion } from "framer-motion";
import { RiCalendarLine, RiTimeLine, RiCheckLine } from "@remixicon/react";
import { AnimatePresence } from "framer-motion";
import { StepProps, TIME_SLOTS, WEEKDAYS } from "./types";

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

interface DateTimeStepProps extends StepProps {
  selectedDay: string;
  selectedTime: string;
}

export function DateTimeStep({ 
  setValue, 
  t, 
  selectedDay, 
  selectedTime,
  errors 
}: DateTimeStepProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent/20 rounded-lg flex items-center justify-center">
          <RiCalendarLine className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-display font-bold uppercase">
            {t("selectDate")}
          </h3>
          <p className="text-secondary text-xs sm:text-sm">{t("selectTime")}</p>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-0 sm:flex sm:gap-6">
        {/* Day Selection */}
        <motion.div 
          className="flex-1"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-secondary mb-2 sm:mb-3">
            {t("selectDay")}
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-2 gap-1.5 sm:gap-2">
            {WEEKDAYS.map((day) => (
              <motion.button
                key={day}
                type="button"
                variants={itemVariants}
                onClick={() => setValue("selectedDay", day, { shouldValidate: true })}
                whileTap={{ scale: 0.95 }}
                className={`py-2.5 sm:py-3 px-2 sm:px-3 border text-[10px] sm:text-xs uppercase tracking-wider transition-all duration-200 rounded-sm ${
                  selectedDay === day
                    ? 'bg-accent text-white border-accent font-bold shadow-md shadow-accent/20'
                    : 'bg-transparent text-secondary border-white/20 hover:border-accent/50 hover:text-white active:bg-white/5'
                }`}
              >
                {t(day).slice(0, 3)}
              </motion.button>
            ))}
          </div>
          {errors.selectedDay && (
            <span className="text-[10px] sm:text-xs text-red-500 mt-2 block">
              {errors.selectedDay.message}
            </span>
          )}
        </motion.div>

        {/* Time Selection */}
        <motion.div 
          className="flex-1"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-secondary mb-2 sm:mb-3 flex items-center gap-2">
            <RiTimeLine className="w-3 h-3 sm:w-4 sm:h-4" />
            {t("availableTimes")}
          </p>
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
            {TIME_SLOTS.map((slot) => (
              <motion.button
                key={slot.value}
                type="button"
                variants={itemVariants}
                onClick={() => setValue("selectedTime", slot.value, { shouldValidate: true })}
                whileTap={{ scale: 0.95 }}
                className={`py-2.5 sm:py-3 px-1.5 sm:px-2 border text-[10px] sm:text-xs tracking-wider transition-all duration-200 rounded-sm ${
                  selectedTime === slot.value
                    ? 'bg-accent text-white border-accent font-bold shadow-md shadow-accent/20'
                    : 'bg-transparent text-secondary border-white/20 hover:border-accent/50 hover:text-white active:bg-white/5'
                }`}
              >
                {slot.label}
              </motion.button>
            ))}
          </div>
          {errors.selectedTime && (
            <span className="text-[10px] sm:text-xs text-red-500 mt-2 block">
              {errors.selectedTime.message}
            </span>
          )}
        </motion.div>
      </div>

      {/* Selection Summary */}
      <AnimatePresence>
        {(selectedDay && selectedTime) && (
          <motion.div
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="bg-accent/10 border border-accent/30 p-3 sm:p-4 rounded-lg overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] sm:text-xs uppercase tracking-widest text-accent/70 mb-0.5">
                  Your selection
                </p>
                <p className="text-white font-bold text-sm sm:text-base">
                  {selectedDay ? t(selectedDay) : "--"} at {selectedTime}
                </p>
              </div>
              <RiCheckLine className="w-5 h-5 text-accent" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
