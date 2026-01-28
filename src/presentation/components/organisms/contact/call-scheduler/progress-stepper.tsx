"use client";

import { motion } from "framer-motion";
import { RiCheckLine, RiCalendarLine, RiUserLine, RiFileTextLine } from "@remixicon/react";

interface StepIndicator {
  id: number;
  icon: typeof RiCalendarLine;
  labelKey: string;
}

interface ProgressStepperProps {
  currentStep: number;
  steps: StepIndicator[];
  t: (key: string) => string;
}

export function ProgressStepper({ currentStep, steps, t }: ProgressStepperProps) {
  return (
    <div className="relative px-0">
      {/* Progress Bar Background */}
      <div className="absolute top-4 sm:top-5 left-4 sm:left-0 right-4 sm:right-0 h-0.5 bg-white/10 mx-4 sm:mx-8 md:mx-12" />
      
      {/* Animated Progress Fill */}
      <motion.div 
        className="absolute top-4 sm:top-5 left-4 sm:left-0 h-0.5 bg-accent mx-4 sm:mx-8 md:mx-12"
        initial={{ width: "0%" }}
        animate={{ 
          width: `calc(${((currentStep - 1) / (steps.length - 1)) * 100}% - 2rem)` 
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        style={{
          width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          maxWidth: 'calc(100% - 2rem)'
        }}
      />

      {/* Step Indicators */}
      <div className="relative flex justify-between items-start">
        {steps.map((s) => {
          const StepIcon = s.icon;
          const isActive = s.id === currentStep;
          const isCompleted = s.id < currentStep;
          
          return (
            <div key={s.id} className="flex flex-col items-center z-10 flex-1">
              {/* Step Circle */}
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1.1 : 1,
                  backgroundColor: isCompleted ? "hsl(var(--accent))" : isActive ? "hsl(var(--accent))" : "rgb(10, 10, 10)",
                  borderColor: isCompleted || isActive ? "hsl(var(--accent))" : "rgba(255,255,255,0.2)",
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`
                  w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 
                  rounded-full border-2 flex items-center justify-center
                  ${isActive ? 'shadow-lg shadow-accent/40' : ''}
                `}
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <RiCheckLine className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                  </motion.div>
                ) : (
                  <StepIcon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 ${isActive ? 'text-white' : 'text-secondary'}`} />
                )}
              </motion.div>
              
              {/* Step Label - Always visible with different sizes */}
              <motion.span
                initial={false}
                animate={{ 
                  color: isActive || isCompleted ? "hsl(var(--accent))" : "rgba(255,255,255,0.5)",
                  fontWeight: isActive ? 700 : 400
                }}
                className="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-wider mt-1.5 sm:mt-2 text-center max-w-[60px] sm:max-w-[80px] leading-tight"
              >
                {t(s.labelKey)}
              </motion.span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Step configuration
export const STEPS: StepIndicator[] = [
  { id: 1, icon: RiCalendarLine, labelKey: "selectDate" },
  { id: 2, icon: RiUserLine, labelKey: "directContact" },
  { id: 3, icon: RiFileTextLine, labelKey: "confirmBooking" },
];
