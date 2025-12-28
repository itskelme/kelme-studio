"use client";

import { motion } from "framer-motion"
import { useState } from "react"
import { RiArrowRightLine, RiMailLine, RiMapPinLine, RiPhoneLine } from "@remixicon/react"
import { useMessages, useTranslations } from "next-intl"
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { CONTACT_PHONE } from "@/lib/constants/contact"
import { Testimonials } from "@/presentation/components/organisms/home/testimonials"
import { FAQ } from "@/presentation/components/organisms/home/faq"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

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
      <section className="min-h-screen bg-black relative overflow-hidden pt-32 pb-20">
        {/* Background Ambience */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C0392B]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start justify-center">
            
            {/* Left Column: Context */}
            <div className="w-full lg:w-5/12 lg:sticky lg:top-32">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C0392B] mb-4">
                  {t("getInTouch")}
                </h2>
                <h1 className="font-display text-5xl md:text-7xl font-bold uppercase leading-[0.9] mb-8">
                  {t("formTitle")}
                </h1>
                
                <p className="text-secondary text-lg leading-relaxed mb-12 max-w-md">
                  {t("formSubtitle")}
                </p>

                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-white/20 flex items-center justify-center shrink-0">
                      <RiMailLine className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-2">Email</h4>
                      <a href="mailto:hello@kelme.studio" className="text-secondary hover:text-white transition-colors">
                        hello@kelme.studio
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-white/20 flex items-center justify-center shrink-0">
                      <RiPhoneLine className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-2">
                        {t("whatsapp")}
                      </h4>
                      <a href={CONTACT_PHONE.brazil.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-white transition-colors">
                        {CONTACT_PHONE.brazil.formatted}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-white/20 flex items-center justify-center shrink-0">
                      <RiMapPinLine className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-2">
                        {t("ourOffices")}
                      </h4>
                      <p className="text-secondary">
                        {t("city")} <br />
                        {t("country")}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Form */}
            <div className="w-full lg:w-6/12 bg-[#0A0A0A] p-8 md:p-12 border border-white/5 rounded-2xl">
              {!isSubmitted ? (
                <motion.form 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-8"
                >
                  <div className="group relative">
                    <label className={`text-xs font-bold uppercase tracking-widest absolute transition-all duration-300 ${activeField === 'name' || hasValue('name') ? '-top-3 text-[#C0392B] text-[10px]' : 'top-3 text-secondary'}`}>
                      {t("fullName")}
                    </label>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-white transition-colors"
                          onFocus={() => handleFocus('name')}
                          onBlur={(e) => {
                            field.onBlur();
                            handleBlur();
                          }}
                        />
                      )}
                    />
                    {errors.name && <span className="text-xs text-red-500 mt-1">{errors.name.message}</span>}
                  </div>

                  <div className="group">
                    <label className="text-xs font-bold uppercase tracking-widest text-secondary block mb-4">
                      {t("contactMethod")}
                    </label>
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          setValue('contactMethod', 'whatsapp');
                          setValue('contactValue', ''); // Clear value on switch
                        }}
                        className={`py-3 px-6 border text-sm uppercase tracking-wider transition-all duration-300 w-1/2 md:w-auto ${
                           contactMethod === 'whatsapp' 
                            ? 'bg-white text-black border-white' 
                            : 'bg-transparent text-secondary border-white/20 hover:border-white hover:text-white'
                        }`}
                      >
                        WhatsApp
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                           setValue('contactMethod', 'email');
                           setValue('contactValue', ''); // Clear value on switch
                        }}
                        className={`py-3 px-6 border text-sm uppercase tracking-wider transition-all duration-300 w-1/2 md:w-auto ${
                           contactMethod === 'email' 
                            ? 'bg-white text-black border-white' 
                            : 'bg-transparent text-secondary border-white/20 hover:border-white hover:text-white'
                        }`}
                      >
                        Email
                      </button>
                    </div>
                  </div>

                  <div className="group relative">
                    {contactMethod === 'whatsapp' ? (
                      <div className="phone-input-container">
                        <label className={`text-xs font-bold uppercase tracking-widest block mb-2 text-secondary`}>
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
                              className="bg-transparent border-b border-white/20 py-3 text-white focus-within:border-white transition-colors flex items-center"
                              numberInputProps={{
                                className: "bg-transparent border-none text-white focus:outline-none w-full ml-2 placeholder-white/30 h-full",
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
                        <label className={`text-xs font-bold uppercase tracking-widest absolute transition-all duration-300 ${activeField === 'contactValue' || hasValue('contactValue') ? '-top-3 text-[#C0392B] text-[10px]' : 'top-3 text-secondary'}`}>
                          Email
                        </label>
                        <Controller
                          name="contactValue"
                          control={control}
                          render={({ field }) => (
                            <input
                              {...field}
                              type="email"
                              className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-white transition-colors"
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
                    {errors.contactValue && <span className="text-xs text-red-500 mt-1">{errors.contactValue.message}</span>}
                  </div>

                  <div className="group">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#27D182] block mb-4">
                      {t("budget")} (Opcional)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {budgetOptions.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => {
                             const current = watch('budget');
                             setValue('budget', current === opt.value ? '' : opt.value);
                          }}
                          className={`py-2 px-2 border text-[11px] md:text-xs uppercase tracking-wider transition-all duration-300 ${
                            watch('budget') === opt.value 
                              ? 'bg-white text-black border-white' 
                              : 'bg-transparent text-secondary border-white/20 hover:border-white hover:text-white'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="group relative">
                    <label className={`text-xs font-bold uppercase tracking-widest absolute transition-all duration-300 ${activeField === 'message' || hasValue('message') ? '-top-3 text-[#C0392B] text-[10px]' : 'top-3 text-secondary'}`}>
                      {t("aboutProject")}
                    </label>
                    <Controller
                      name="message"
                      control={control}
                      render={({ field }) => (
                         <textarea
                          {...field}
                          rows={4}
                          className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-white transition-colors resize-none"
                          onFocus={() => handleFocus('message')}
                          onBlur={(e) => {
                            field.onBlur();
                            handleBlur();
                          }}
                        />
                      )}
                    />
                    {errors.message && <span className="text-xs text-red-500 mt-1">{errors.message.message}</span>}
                  </div>

                  <div className="flex justify-end pt-4">
                    <button 
                      type="submit"
                      className="bg-[#C0392B] text-white px-10 py-4 text-sm uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-3 w-full md:w-auto justify-center"
                    >
                      <span>{t("sendMessage")}</span>
                      <RiArrowRightLine className="w-4 h-4" />
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center p-12 min-h-[400px]"
                >
                  <div className="w-20 h-20 bg-[#27D182] flex items-center justify-center mb-6 text-black rounded-full">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-display font-bold uppercase mb-4">{t("successTitle")}</h3>
                  <p className="text-secondary max-w-md">
                    {t("successMessage")}
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="mt-8 text-sm uppercase tracking-widest border-b border-white pb-1 hover:text-[#27D182]"
                  >
                    {t("sendAnother")}
                  </button>
                </motion.div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Additional Sections */}
      <Testimonials />
      <FAQ />
    </>
  )
}
