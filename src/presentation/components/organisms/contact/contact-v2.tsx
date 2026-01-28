"use client";

import { motion } from "framer-motion"
import { useState } from "react"
import { RiArrowRightLine, RiMailLine, RiMapPinLine, RiPhoneLine } from "@remixicon/react"
import { useMessages, useTranslations, useLocale } from "next-intl"
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { CONTACT_PHONE, CONTACT_EMAIL } from "@/lib/constants/contact"
import { Testimonials } from "@/presentation/components/organisms/home/testimonials"
import { FAQ } from "@/presentation/components/organisms/home/faq"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CallScheduler } from "./call-scheduler"

const createFormSchema = (t: any) => z.object({
  name: z.string().min(2, { message: t("errors.nameRequired") }),
  contactMethod: z.enum(["email", "whatsapp"]),
  contactValue: z.string().min(1, { message: t("errors.contactRequired") }),
  budget: z.string().optional(),
  message: z.string().min(10, { message: t("errors.messageRequired") })
}).superRefine((data, ctx) => {
  if (data.contactMethod === "email") {
    const emailSchema = z.string().email();
    if (!emailSchema.safeParse(data.contactValue).success) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t("errors.invalidEmail"),
        path: ["contactValue"],
      });
    }
  } else {
    if (!data.contactValue || !isValidPhoneNumber(data.contactValue)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t("errors.invalidPhone"),
        path: ["contactValue"],
      });
    }
  }
});

type FormValues = z.infer<ReturnType<typeof createFormSchema>>;

export function ContactV2() {
  const t = useTranslations("contact")
  const locale = useLocale();
  const isEnglish = locale === "en";
  
  // Create schema with translations
  const formSchema = createFormSchema(t);

  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      contactMethod: 'whatsapp', // Default to WhatsApp as requested
      contactValue: '',
      budget: '',
      message: ''
    }
  })

  const contactMethod = watch("contactMethod");
  const [activeField, setActiveField] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleFocus = (field: string) => setActiveField(field)
  const handleBlur = () => setActiveField(null)

  const onSubmit = (data: FormValues) => {
    console.log(data)
    setTimeout(() => setIsSubmitted(true), 1500)
  }

  const budgetOptions = [
    { value: "5k", label: "< $5k" },
    { value: "10k", label: "$5k - $10k" },
    { value: "20k", label: "$10k - $20k" },
    { value: "20k+", label: "$20k+" }
  ]

  // Helper to check if a field has a value for label positioning
  const hasValue = (fieldName: keyof FormValues) => {
    const value = watch(fieldName);
    return !!value;
  };

  return (
    <>
      <section className="min-h-screen bg-black relative overflow-hidden pt-20 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20">
        {/* Background Ambience */}
        <div className="absolute top-0 right-0 w-[300px] sm:w-[450px] md:w-[600px] h-[300px] sm:h-[450px] md:h-[600px] bg-accent/5 rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[250px] sm:w-[400px] md:w-[500px] h-[250px] sm:h-[400px] md:h-[500px] bg-white/5 rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-24 items-start justify-center">
            
            {/* Left Column: Context */}
            <div className="w-full lg:w-5/12 lg:sticky lg:top-32">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              >
                <h2 className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-accent mb-3 sm:mb-4">
                  {t("getInTouch")}
                </h2>
                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold uppercase leading-[0.95] sm:leading-[0.9] mb-4 sm:mb-6 md:mb-8">
                  {t("formTitle")}
                </h1>
                
                <p className="text-secondary text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 md:mb-12 max-w-md">
                  {t("formSubtitle")}
                </p>

                <div className="space-y-4 sm:space-y-6 md:space-y-8">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex items-start gap-3 sm:gap-4"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 border border-accent/30 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                      <RiMailLine className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white mb-1 sm:mb-2">Email</h4>
                      <a href={`mailto:${CONTACT_EMAIL.primary}`} className="text-secondary hover:text-accent transition-colors text-sm sm:text-base">
                        {CONTACT_EMAIL.primary}
                      </a>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="flex items-start gap-3 sm:gap-4"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 border border-accent/30 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                      <RiPhoneLine className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white mb-1 sm:mb-2">
                        {isEnglish ? t("callUs") : t("whatsapp")}
                      </h4>
                      <a 
                        href={isEnglish ? CONTACT_PHONE.us.telUrl : CONTACT_PHONE.brazil.whatsappUrl} 
                        target={isEnglish ? undefined : "_blank"} 
                        rel={isEnglish ? undefined : "noopener noreferrer"} 
                        className="text-secondary hover:text-accent transition-colors text-sm sm:text-base"
                      >
                        {isEnglish ? CONTACT_PHONE.us.formatted : CONTACT_PHONE.brazil.formatted}
                      </a>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="flex items-start gap-3 sm:gap-4"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 border border-accent/30 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                      <RiMapPinLine className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white mb-1 sm:mb-2">
                        {t("ourOffices")}
                      </h4>
                      <p className="text-secondary text-sm sm:text-base">
                        {t("city")} <br />
                        {t("country")}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Form */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="w-full lg:w-6/12 bg-[#0A0A0A] p-4 sm:p-6 md:p-8 lg:p-12 border border-white/5 rounded-xl sm:rounded-2xl"
            >
              {isEnglish ? (
                <CallScheduler />
              ) : !isSubmitted ? (
                <motion.form 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-5 sm:gap-6 md:gap-8"
                >
                  <div className="group relative">
                    <label className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest absolute transition-all duration-300 ${activeField === 'name' || hasValue('name') ? '-top-3 text-accent text-[10px]' : 'top-3 text-secondary'}`}>
                      {t("fullName")}
                    </label>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="w-full bg-transparent border-b border-white/20 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:outline-none focus:border-accent transition-colors"
                          onFocus={() => handleFocus('name')}
                          onBlur={(e) => {
                            field.onBlur();
                            handleBlur();
                          }}
                        />
                      )}
                    />
                    {errors.name && <span className="text-[10px] sm:text-xs text-red-500 mt-1">{errors.name.message}</span>}
                  </div>

                  <div className="group">
                    <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-secondary block mb-3 sm:mb-4">
                      {t("contactMethod")}
                    </label>
                    <div className="flex gap-2 sm:gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          setValue('contactMethod', 'whatsapp');
                          setValue('contactValue', '');
                        }}
                        className={`py-2.5 sm:py-3 px-4 sm:px-6 border text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 flex-1 sm:flex-none ${
                           contactMethod === 'whatsapp' 
                            ? 'bg-accent text-white border-accent shadow-md shadow-accent/20' 
                            : 'bg-transparent text-secondary border-white/20 hover:border-accent/50 hover:text-white'
                        }`}
                      >
                        WhatsApp
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                           setValue('contactMethod', 'email');
                           setValue('contactValue', '');
                        }}
                        className={`py-2.5 sm:py-3 px-4 sm:px-6 border text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 flex-1 sm:flex-none ${
                           contactMethod === 'email' 
                            ? 'bg-accent text-white border-accent shadow-md shadow-accent/20' 
                            : 'bg-transparent text-secondary border-white/20 hover:border-accent/50 hover:text-white'
                        }`}
                      >
                        Email
                      </button>
                    </div>
                  </div>

                  <div className="group relative">
                    {contactMethod === 'whatsapp' ? (
                      <div className="phone-input-container">
                        <label className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest block mb-1.5 sm:mb-2 text-secondary`}>
                          WhatsApp
                        </label>
                        <Controller
                          name="contactValue"
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <PhoneInput
                              defaultCountry="BR"
                              value={value}
                              onChange={onChange}
                              className="bg-transparent border-b border-white/20 py-2.5 sm:py-3 text-white focus-within:border-accent transition-colors flex items-center"
                              numberInputProps={{
                                className: "bg-transparent border-none text-sm sm:text-base text-white focus:outline-none w-full ml-2 placeholder-white/30 h-full",
                              }}
                            />
                          )}
                        />
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
                      </div>
                    ) : (
                      <>
                        <label className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest absolute transition-all duration-300 ${activeField === 'contactValue' || hasValue('contactValue') ? '-top-3 text-accent text-[10px]' : 'top-3 text-secondary'}`}>
                          Email
                        </label>
                        <Controller
                          name="contactValue"
                          control={control}
                          render={({ field }) => (
                            <input
                              {...field}
                              type="email"
                              className="w-full bg-transparent border-b border-white/20 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:outline-none focus:border-accent transition-colors"
                              onFocus={() => handleFocus('contactValue')}
                              onBlur={(e) => {
                                field.onBlur();
                                handleBlur();
                              }}
                            />
                          )}
                        />
                      </>
                    )}
                    {errors.contactValue && <span className="text-[10px] sm:text-xs text-red-500 mt-1">{errors.contactValue.message}</span>}
                  </div>

                  <div className="group">
                    <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-accent block mb-3 sm:mb-4">
                      {t("budget")} (Opcional)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                      {budgetOptions.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => {
                             const current = watch('budget');
                             setValue('budget', current === opt.value ? '' : opt.value);
                          }}
                          className={`py-2 sm:py-2.5 px-2 border text-[10px] sm:text-xs uppercase tracking-wider transition-all duration-300 rounded-sm ${
                            watch('budget') === opt.value 
                              ? 'bg-accent text-white border-accent shadow-md shadow-accent/20' 
                              : 'bg-transparent text-secondary border-white/20 hover:border-accent/50 hover:text-white'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="group relative">
                    <label className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest absolute transition-all duration-300 ${activeField === 'message' || hasValue('message') ? '-top-3 text-accent text-[10px]' : 'top-3 text-secondary'}`}>
                      {t("aboutProject")}
                    </label>
                    <Controller
                      name="message"
                      control={control}
                      render={({ field }) => (
                         <textarea
                          {...field}
                          rows={3}
                          className="w-full bg-transparent border-b border-white/20 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:outline-none focus:border-accent transition-colors resize-none"
                          onFocus={() => handleFocus('message')}
                          onBlur={(e) => {
                            field.onBlur();
                            handleBlur();
                          }}
                        />
                      )}
                    />
                    {errors.message && <span className="text-[10px] sm:text-xs text-red-500 mt-1">{errors.message.message}</span>}
                  </div>

                  <div className="flex justify-end pt-3 sm:pt-4">
                    <button 
                      type="submit"
                      className="bg-accent text-white px-6 sm:px-10 py-3 sm:py-4 text-xs sm:text-sm uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center shadow-lg shadow-accent/20"
                    >
                      <span>{t("sendMessage")}</span>
                      <RiArrowRightLine className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  className="flex flex-col items-center justify-center text-center p-6 sm:p-10 md:p-12 min-h-[350px] sm:min-h-[400px]"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-16 h-16 sm:w-20 sm:h-20 bg-accent flex items-center justify-center mb-5 sm:mb-6 text-white rounded-full shadow-lg shadow-accent/30"
                  >
                    <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold uppercase mb-3 sm:mb-4">{t("successTitle")}</h3>
                  <p className="text-secondary max-w-md text-sm sm:text-base">
                    {t("successMessage")}
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 sm:mt-8 text-xs sm:text-sm uppercase tracking-widest border-b border-white/50 pb-1 hover:text-accent hover:border-accent transition-colors"
                  >
                    {t("sendAnother")}
                  </button>
                </motion.div>
              )}
            </motion.div>

          </div>
        </div>
      </section>

      {/* Additional Sections */}
      <Testimonials />
      <FAQ />
    </>
  )
}
