"use client";

import { motion } from "framer-motion";
import { RiArrowRightLine, RiArrowLeftLine, RiCheckLine } from "@remixicon/react";
import { FormVariant } from "./types";

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  canProceed: boolean;
  onNext: () => void;
  onPrev: () => void;
  t: (key: string) => string;
  variant: FormVariant;
}

export function NavigationButtons({
  currentStep,
  totalSteps,
  canProceed,
  onNext,
  onPrev,
  t,
  variant
}: NavigationButtonsProps) {
  const isLastStep = currentStep === totalSteps;
  const isFirstStep = currentStep === 1;

  return (
    <div className={`flex pt-4 sm:pt-6 gap-3 sm:gap-4 ${isFirstStep ? 'justify-end' : 'justify-between'}`}>
      {!isFirstStep && (
        <motion.button
          type="button"
          onClick={onPrev}
          whileTap={{ scale: 0.95 }}
          className="border border-white/20 text-white px-4 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2 sm:gap-3"
        >
          <RiArrowLeftLine className="w-3 h-3 sm:w-4 sm:h-4" />
          <span>{t("back")}</span>
        </motion.button>
      )}

      {!isLastStep ? (
        <motion.button
          type="button"
          onClick={onNext}
          disabled={!canProceed}
          whileTap={{ scale: 0.95 }}
          className="bg-accent text-white px-6 sm:px-10 py-3 sm:py-4 text-xs sm:text-sm uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2 sm:gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-accent/20 disabled:shadow-none"
        >
          <span>{t("next")}</span>
          <RiArrowRightLine className="w-3 h-3 sm:w-4 sm:h-4" />
        </motion.button>
      ) : (
        <motion.button
          type="submit"
          whileTap={{ scale: 0.95 }}
          className="bg-accent text-white px-6 sm:px-10 py-3 sm:py-4 text-xs sm:text-sm uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2 sm:gap-3 shadow-lg shadow-accent/20"
        >
          <span>{t("confirmBooking")}</span>
          <RiCheckLine className="w-3 h-3 sm:w-4 sm:h-4" />
        </motion.button>
      )}
    </div>
  );
}
