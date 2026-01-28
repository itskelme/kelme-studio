"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { RiArrowRightLine, RiArrowLeftLine, RiCalendarLine, RiTimeLine, RiCheckLine, RiUserLine, RiFileTextLine } from "@remixicon/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

// Available time slots (9am-5pm)
const TIME_SLOTS = [
  { value: "09:00", label: "9 AM", period: "morning" },
  { value: "10:00", label: "10 AM", period: "morning" },
  { value: "11:00", label: "11 AM", period: "morning" },
  { value: "12:00", label: "12 PM", period: "afternoon" },
  { value: "13:00", label: "1 PM", period: "afternoon" },
  { value: "14:00", label: "2 PM", period: "afternoon" },
  { value: "15:00", label: "3 PM", period: "afternoon" },
  { value: "16:00", label: "4 PM", period: "afternoon" },
  { value: "17:00", label: "5 PM", period: "afternoon" },
];

// Days of week (Mon-Sat)
const WEEKDAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

// Step configuration
const STEPS = [
  { id: 1, icon: RiCalendarLine, labelKey: "selectDate" },
  { id: 2, icon: RiUserLine, labelKey: "directContact" },
  { id: 3, icon: RiFileTextLine, labelKey: "confirmBooking" },
];

const createFormSchema = (t: any) => z.object({
  name: z.string().min(2, { message: t("errors.nameRequired") }),
  email: z.string().email({ message: t("errors.invalidEmail") }),
  phone: z.string().refine((val) => isValidPhoneNumber(val), {
    message: t("errors.invalidPhone"),
  }),
  company: z.string().optional(),
  selectedDay: z.string().min(1, { message: "Please select a day" }),
  selectedTime: z.string().min(1, { message: "Please select a time" }),
  message: z.string().optional(),
});

type FormValues = z.infer<ReturnType<typeof createFormSchema>>;

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
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formSchema = createFormSchema(t);

  const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      selectedDay: '',
      selectedTime: '',
      message: ''
    }
  });

  const selectedDay = watch("selectedDay");
  const selectedTime = watch("selectedTime");

  const onSubmit = (data: FormValues) => {
    console.log("Booking data:", data);
    setIsSubmitted(true);
  };

  const nextStep = () => {
    if (step < 3) {
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

  const canProceedFromStep1 = selectedDay && selectedTime;
  const canProceedFromStep2 = watch("name") && watch("email") && watch("phone");

  if (isSubmitted) {
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
        <h3 className="text-2xl sm:text-3xl font-display font-bold uppercase mb-4">{t("bookingConfirmed")}</h3>
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
            {selectedDay && t(selectedDay)} at {selectedTime}
          </p>
        </motion.div>
        <button 
          onClick={() => {
            setIsSubmitted(false);
            setStep(1);
            setValue("selectedDay", "");
            setValue("selectedTime", "");
          }}
          className="mt-8 text-xs sm:text-sm uppercase tracking-widest border-b border-white/50 pb-1 hover:text-accent hover:border-accent transition-colors"
        >
          {t("sendAnother")}
        </button>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      {/* Enhanced Progress Stepper */}
      <div className="relative">
        {/* Progress Bar Background */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-white/10 mx-8 sm:mx-12" />
        
        {/* Animated Progress Fill */}
        <motion.div 
          className="absolute top-5 left-0 h-0.5 bg-accent mx-8 sm:mx-12"
          initial={{ width: "0%" }}
          animate={{ width: `${((step - 1) / 2) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />

        {/* Step Indicators */}
        <div className="relative flex justify-between">
          {STEPS.map((s, index) => {
            const StepIcon = s.icon;
            const isActive = s.id === step;
            const isCompleted = s.id < step;
            
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

      {/* Mobile Step Label */}
      <div className="sm:hidden text-center">
        <p className="text-xs uppercase tracking-widest text-accent font-bold">
          {t("step")} {step}: {t(STEPS[step - 1].labelKey)}
        </p>
      </div>

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
              className="space-y-4 sm:space-y-6"
            >
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
                  <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-secondary mb-2 sm:mb-3">{t("selectDay")}</p>
                  <div className="grid grid-cols-3 sm:grid-cols-2 gap-1.5 sm:gap-2">
                    {WEEKDAYS.map((day, index) => (
                      <motion.button
                        key={day}
                        type="button"
                        variants={itemVariants}
                        onClick={() => setValue("selectedDay", day)}
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
                    {TIME_SLOTS.map((slot, index) => (
                      <motion.button
                        key={slot.value}
                        type="button"
                        variants={itemVariants}
                        onClick={() => setValue("selectedTime", slot.value)}
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
                        <p className="text-[10px] sm:text-xs uppercase tracking-widest text-accent/70 mb-0.5">Your selection</p>
                        <p className="text-white font-bold text-sm sm:text-base">
                          {selectedDay ? t(selectedDay) : "--"} at {selectedTime}
                        </p>
                      </div>
                      <RiCheckLine className="w-5 h-5 text-accent" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
              className="space-y-4 sm:space-y-6"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                  <RiUserLine className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-display font-bold uppercase">
                    {t("directContact")}
                  </h3>
                  <p className="text-secondary text-xs sm:text-sm">Your contact information</p>
                </div>
              </div>

              <motion.div 
                className="space-y-4 sm:space-y-5"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants} className="group relative">
                  <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-secondary block mb-1.5 sm:mb-2">
                    {t("fullName")}
                  </label>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder={t("fullNamePlaceholder")}
                        className="w-full bg-transparent border-b border-white/20 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:outline-none focus:border-accent transition-colors placeholder:text-white/30"
                      />
                    )}
                  />
                  {errors.name && <span className="text-[10px] sm:text-xs text-red-500 mt-1 block">{errors.name.message}</span>}
                </motion.div>

                <motion.div variants={itemVariants} className="group relative">
                  <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-secondary block mb-1.5 sm:mb-2">
                    {t("email")}
                  </label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="email"
                        placeholder={t("emailPlaceholder")}
                        className="w-full bg-transparent border-b border-white/20 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:outline-none focus:border-accent transition-colors placeholder:text-white/30"
                      />
                    )}
                  />
                  {errors.email && <span className="text-[10px] sm:text-xs text-red-500 mt-1 block">{errors.email.message}</span>}
                </motion.div>

                <motion.div variants={itemVariants} className="group relative">
                  <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-secondary block mb-1.5 sm:mb-2">
                    {t("phone")}
                  </label>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <PhoneInput
                        defaultCountry={locale === "pt" ? "BR" : "US"}
                        value={value}
                        onChange={onChange}
                        className="bg-transparent border-b border-white/20 py-2.5 sm:py-3 text-white focus-within:border-accent transition-colors flex items-center"
                        numberInputProps={{
                          className: "bg-transparent border-none text-sm sm:text-base text-white focus:outline-none w-full ml-2 placeholder-white/30 h-full",
                        }}
                      />
                    )}
                  />
                  {errors.phone && <span className="text-[10px] sm:text-xs text-red-500 mt-1 block">{errors.phone.message}</span>}
                  <style jsx global>{`
                    .PhoneInput {
                      display: flex;
                      align-items: center;
                    }
                    .PhoneInputCountry {
                      margin-right: 0.5rem;
                      display: flex;
                      align-items: center;
                    }
                    .PhoneInputCountrySelect {
                      background-color: #0A0A0A;
                      color: white;
                      cursor: pointer;
                    }
                    .PhoneInputInput {
                      background: transparent;
                      border: none;
                      color: white;
                      outline: none;
                    }
                    .PhoneInputCountrySelect option {
                      background-color: #0A0A0A;
                      color: white;
                    }
                  `}</style>
                </motion.div>
              </motion.div>
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
              className="space-y-4 sm:space-y-6"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                  <RiFileTextLine className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-display font-bold uppercase">
                    {t("confirmBooking")}
                  </h3>
                  <p className="text-secondary text-xs sm:text-sm">Optional details to help us prepare</p>
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-accent/10 border border-accent/30 p-3 sm:p-4 rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] sm:text-xs uppercase tracking-widest text-accent/70 mb-0.5">Scheduled for</p>
                    <p className="text-white font-bold text-sm sm:text-lg">{selectedDay && t(selectedDay)} at {selectedTime}</p>
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent/20 rounded-full flex items-center justify-center">
                    <RiCalendarLine className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="space-y-4 sm:space-y-5"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants} className="group relative">
                  <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-secondary block mb-1.5 sm:mb-2">
                    {t("company")} <span className="text-white/40 font-normal">(Optional)</span>
                  </label>
                  <Controller
                    name="company"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="Your company or organization"
                        className="w-full bg-transparent border-b border-white/20 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:outline-none focus:border-accent transition-colors placeholder:text-white/30"
                      />
                    )}
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="group relative">
                  <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-secondary block mb-1.5 sm:mb-2">
                    {t("aboutProject")} <span className="text-white/40 font-normal">(Optional)</span>
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
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className={`flex pt-4 sm:pt-6 gap-3 sm:gap-4 ${step === 1 ? 'justify-end' : 'justify-between'}`}>
          {step > 1 && (
            <motion.button
              type="button"
              onClick={prevStep}
              whileTap={{ scale: 0.95 }}
              className="border border-white/20 text-white px-4 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2 sm:gap-3"
            >
              <RiArrowLeftLine className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{t("back")}</span>
            </motion.button>
          )}

          {step < 3 ? (
            <motion.button
              type="button"
              onClick={nextStep}
              disabled={step === 1 ? !canProceedFromStep1 : !canProceedFromStep2}
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
      </form>
    </div>
  );
}
