"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Types and utils
import { FormValues, FormVariant, CountryCode, createFormSchema, PHONE_CONFIG } from "./types";
import { applyPhoneMask, getPhoneDigits, isValidEmail, isValidPhone, formatPhoneWithCountryCode } from "./utils";

// Components
import { ProgressStepper, STEPS } from "./progress-stepper";
import { DateTimeStep } from "./step-date-time";
import { ContactInfoStep } from "./step-contact-info";
import { ConfirmationStep } from "./step-confirmation";
import { SuccessView } from "./success-view";
import { NavigationButtons } from "./navigation-buttons";

// Animation variants for step transitions
const stepContentVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 30 : -30,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 30 : -30,
    opacity: 0,
    transition: { duration: 0.2, ease: [0.4, 0, 1, 1] as const }
  })
};

export function CallScheduler() {
  const t = useTranslations("contact");
  const locale = useLocale();
  
  // Determine form variant based on locale
  const variant: FormVariant = locale === "pt" ? "br" : "us";
  const defaultCountry: CountryCode = variant === "br" ? "BR" : "US";

  // Form state
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formSchema = createFormSchema(t);

  const { 
    control, 
    handleSubmit, 
    watch, 
    setValue, 
    trigger,
    reset,
    formState: { errors } 
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      phoneCountry: defaultCountry,
      company: '',
      selectedDay: '',
      selectedTime: '',
      message: ''
    }
  });

  // Watch all values for real-time validation
  const selectedDay = watch("selectedDay");
  const selectedTime = watch("selectedTime");
  const name = watch("name");
  const email = watch("email");
  const phone = watch("phone");
  const phoneCountry = watch("phoneCountry") as CountryCode;

  // Real-time phone validation with masking
  useEffect(() => {
    if (phone) {
      const digits = getPhoneDigits(phone);
      const config = PHONE_CONFIG[phoneCountry];
      
      const maskedValue = applyPhoneMask(phone, phoneCountry);
      if (maskedValue !== phone && digits.length <= config.maxDigits) {
        setValue("phone", maskedValue, { shouldValidate: true });
      }
    }
  }, [phone, phoneCountry, setValue]);

  // Handle phone input with character limiting
  const handlePhoneChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement>, 
    onChange: (value: string) => void
  ) => {
    const rawValue = e.target.value;
    const config = PHONE_CONFIG[phoneCountry];
    const digits = getPhoneDigits(rawValue);
    
    if (digits.length <= config.maxDigits) {
      const maskedValue = applyPhoneMask(rawValue, phoneCountry);
      onChange(maskedValue);
    }
  }, [phoneCountry]);

  // Handle country change - clear phone
  const handleCountryChange = useCallback((newCountry: CountryCode) => {
    setValue("phoneCountry", newCountry);
    setValue("phone", "", { shouldValidate: false });
  }, [setValue]);

  // Form submission
  const onSubmit = (data: FormValues) => {
    const fullPhone = formatPhoneWithCountryCode(data.phone, data.phoneCountry as CountryCode);
    console.log("Booking data:", { ...data, phone: fullPhone });
    setIsSubmitted(true);
  };

  // Reset form
  const handleReset = useCallback(() => {
    setIsSubmitted(false);
    setStep(1);
    reset({
      name: '',
      email: '',
      phone: '',
      phoneCountry: defaultCountry,
      company: '',
      selectedDay: '',
      selectedTime: '',
      message: ''
    });
  }, [reset, defaultCountry]);

  // Validate step before navigation
  const validateStep = async (currentStep: number): Promise<boolean> => {
    switch (currentStep) {
      case 1:
        return await trigger(["selectedDay", "selectedTime"]);
      case 2:
        return await trigger(["name", "email", "phone"]);
      default:
        return true;
    }
  };

  const nextStep = async () => {
    const isValid = await validateStep(step);
    
    if (isValid && step < STEPS.length) {
      setDirection(1);
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setDirection(-1);
      setStep(step - 1);
    }
  };

  // Real-time validation checks
  const canProceedFromStep1 = !!selectedDay && !!selectedTime;
  const canProceedFromStep2 = !!name && name.length >= 2 && 
                              !!email && isValidEmail(email) && 
                              !!phone && isValidPhone(phone, phoneCountry);

  // Determine if user can proceed based on current step
  const canProceed = step === 1 ? canProceedFromStep1 : canProceedFromStep2;

  // Show success view after submission
  if (isSubmitted) {
    return (
      <SuccessView
        t={t}
        variant={variant}
        selectedDay={selectedDay}
        selectedTime={selectedTime}
        onReset={handleReset}
      />
    );
  }

  // Shared step props
  const stepProps = {
    control,
    errors,
    setValue,
    watch,
    trigger,
    t,
    variant
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      {/* Progress Stepper */}
      <ProgressStepper 
        currentStep={step} 
        steps={STEPS} 
        t={t} 
      />

      {/* Mobile Step Label */}
      <div className="sm:hidden text-center">
        <p className="text-xs uppercase tracking-widest text-accent font-bold">
          {t("step")} {step}: {t(STEPS[step - 1].labelKey)}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 sm:gap-6 mt-2">
        <AnimatePresence mode="wait" custom={direction}>
          {step === 1 && (
            <motion.div
              key="step1"
              custom={direction}
              variants={stepContentVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <DateTimeStep
                {...stepProps}
                selectedDay={selectedDay}
                selectedTime={selectedTime}
              />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              custom={direction}
              variants={stepContentVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <ContactInfoStep
                {...stepProps}
                name={name}
                email={email}
                phone={phone}
                phoneCountry={phoneCountry}
                onCountryChange={handleCountryChange}
                onPhoneChange={handlePhoneChange}
              />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              custom={direction}
              variants={stepContentVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <ConfirmationStep
                {...stepProps}
                selectedDay={selectedDay}
                selectedTime={selectedTime}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <NavigationButtons
          currentStep={step}
          totalSteps={STEPS.length}
          canProceed={canProceed}
          onNext={nextStep}
          onPrev={prevStep}
          t={t}
          variant={variant}
        />
      </form>
    </div>
  );
}
