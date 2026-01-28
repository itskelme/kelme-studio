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
    <div className="relative">
      {/* Progress Bar Background */}
      <div className="absolute top-5 left-0 right-0 h-0.5 bg-white/10 mx-8 sm:mx-12" />
      
      {/* Animated Progress Fill */}
      <motion.div 
        className="absolute top-5 left-0 h-0.5 bg-accent mx-8 sm:mx-12"
        initial={{ width: "0%" }}
        animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />

      {/* Step Indicators */}
      <div className="relative flex justify-between">
        {steps.map((s) => {
          const StepIcon = s.icon;
          const isActive = s.id === currentStep;
          const isCompleted = s.id < currentStep;
          
          return (
            <div key={s.id} className="flex flex-col items-center z-10">
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1.1 : 1,
                  backgroundColor: isCompleted ? "hsl(var(--accent))" : isActive ? "hsl(var(--accent))" : "transparent",
                  borderColor: isCompleted || isActive ? "hsl(var(--accent))" : "rgba(255,255,255,0.2)",
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`
                  w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center
                  ${isActive ? 'shadow-lg shadow-accent/40' : ''}
                `}
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <RiCheckLine className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </motion.div>
                ) : (
                  <StepIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? 'text-white' : 'text-secondary'}`} />
                )}
              </motion.div>
              
              {/* Step Label - Hidden on mobile, shown on sm+ */}
              <motion.span
                initial={false}
                animate={{ 
                  color: isActive || isCompleted ? "hsl(var(--accent))" : "rgba(255,255,255,0.5)",
                  fontWeight: isActive ? 700 : 400
                }}
                className="hidden sm:block text-[10px] uppercase tracking-wider mt-2 text-center max-w-[80px]"
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
