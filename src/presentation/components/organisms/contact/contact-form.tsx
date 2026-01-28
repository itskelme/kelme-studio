"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { GradientButton } from "@/presentation/components/atoms/ui/gradient-button";
import { Check, AlertCircle } from "lucide-react";

/**
 * Phone format configuration per country
 */
const PHONE_CONFIG = {
  BR: { code: "+55", maxDigits: 11, mask: "(##) #####-####", placeholder: "(11) 99999-9999" },
  US: { code: "+1", maxDigits: 10, mask: "(###) ###-####", placeholder: "(555) 123-4567" },
  PT: { code: "+351", maxDigits: 9, mask: "### ### ###", placeholder: "912 345 678" },
} as const;

type CountryCode = keyof typeof PHONE_CONFIG;

/**
 * Apply phone mask to input value
 */
function applyPhoneMask(value: string, country: CountryCode): string {
  // Remove all non-digits
  const digits = value.replace(/\D/g, "");
  const config = PHONE_CONFIG[country];
  
  // Limit to max digits
  const limitedDigits = digits.slice(0, config.maxDigits);
  
  // Apply mask
  let result = "";
  let digitIndex = 0;
  
  for (const char of config.mask) {
    if (digitIndex >= limitedDigits.length) break;
    if (char === "#") {
      result += limitedDigits[digitIndex];
      digitIndex++;
    } else {
      result += char;
    }
  }
  
  return result;
}

/**
 * Form validation schema with Zod
 */
const createFormSchema = (t: ReturnType<typeof useTranslations>) => z.object({
  fullName: z.string().min(2, { message: t("errors.nameRequired") }),
  email: z.string().email({ message: t("errors.invalidEmail") }),
  phone: z.string().optional(),
  country: z.enum(["BR", "US", "PT"]).default("US"),
  budget: z.string().min(1, { message: "Budget is required" }),
  message: z.string().min(10, { message: t("errors.messageRequired") }),
  signNDA: z.boolean().optional(),
});

type FormData = z.infer<ReturnType<typeof createFormSchema>>;

/**
 * Estilos do formulário
 */
const formStyles = {
  container: "bg-[#1A1918] border-2 rounded-none p-8 md:p-10",
  borderStates: {
    idle: "border-[#27D182]/30",
    success: "border-[#27D182]",
    error: "border-red-500"
  },
  label: "block text-sm font-medium mb-2 text-[#F7F7F7]",
  input: "w-full px-4 py-3 bg-[#0F0E0D] border border-[#27D182]/20 text-[#F7F7F7] placeholder-[#D7D7D7]/40 focus:outline-none focus:border-[#27D182] transition-colors rounded-none",
  inputError: "w-full px-4 py-3 bg-[#0F0E0D] border border-red-500 text-[#F7F7F7] placeholder-[#D7D7D7]/40 focus:outline-none focus:border-red-400 transition-colors rounded-none",
  select: "w-full px-4 py-3 bg-[#0F0E0D] border border-[#27D182]/20 text-[#F7F7F7] focus:outline-none focus:border-[#27D182] transition-colors appearance-none rounded-none cursor-pointer",
  checkbox: "w-5 h-5 border-2 border-[#27D182]/30 bg-[#0F0E0D] checked:bg-[#27D182] checked:border-[#27D182] focus:ring-2 focus:ring-[#27D182]/50 transition-all cursor-pointer rounded-none",
  errorText: "text-red-400 text-xs mt-1",
  countrySelect: "w-24 px-2 py-3 bg-[#0F0E0D] border border-[#27D182]/20 border-r-0 text-[#F7F7F7] focus:outline-none focus:border-[#27D182] transition-colors rounded-none cursor-pointer"
};

/**
 * Lista de chaves para benefícios do formulário
 */
const formBenefits = [
  "responseTime",
  "ndaAvailable",
  "dedicatedTeam"
];

/**
 * Componente de formulário de contato
 */
export function ContactForm() {
  const t = useTranslations("contact");
  const formSchema = createFormSchema(t);
  
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      country: "US",
      budget: "",
      message: "",
      signNDA: false
    }
  });
  
  const [formState, setFormState] = useState<"idle" | "success" | "error">("idle");
  
  // Watch country and phone for real-time masking
  const selectedCountry = watch("country") as CountryCode;
  const phoneValue = watch("phone") || "";
  
  // Apply mask when phone value changes
  useEffect(() => {
    const maskedValue = applyPhoneMask(phoneValue, selectedCountry);
    if (maskedValue !== phoneValue) {
      setValue("phone", maskedValue, { shouldValidate: false });
    }
  }, [phoneValue, selectedCountry, setValue]);
  
  // Handle phone input with character limit
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const config = PHONE_CONFIG[selectedCountry];
    
    // Extract only digits
    const digits = rawValue.replace(/\D/g, "");
    
    // Check if we're at max digits
    if (digits.length <= config.maxDigits) {
      const maskedValue = applyPhoneMask(rawValue, selectedCountry);
      setValue("phone", maskedValue, { shouldValidate: true });
    }
    // If over limit, don't update (prevents typing)
  };
  
  // Handle country change - reset phone
  const handleCountryChange = (newCountry: CountryCode) => {
    setValue("country", newCountry);
    setValue("phone", "", { shouldValidate: false });
  };
  
  const onSubmit = async (data: FormData) => {
    try {
      // Format phone with country code
      const config = PHONE_CONFIG[data.country as CountryCode];
      const fullPhone = data.phone ? `${config.code} ${data.phone}` : "";
      
      console.log("Form submitted:", { ...data, phone: fullPhone });
      
      // Simular envio do formulário (substitua por sua implementação real)
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFormState("success");
    } catch (error) {
      setFormState("error");
    }
  };
  
  const resetForm = () => {
    setFormState("idle");
    reset();
  };
  
  return (
    <div className={`${formStyles.container} ${formStyles.borderStates[formState]} transition-colors duration-300`}>
      <h2 className="text-2xl font-bold mb-6 font-satoshi">
        <span className="border-b-2 border-[#27D182] pb-1">{t("getInTouch")}</span>
      </h2>
      
      <div className="space-y-4 mb-10">
        {/* Benefícios destacados */}
        {formBenefits.map((benefit, index) => (
          <BenefitItem key={index} text={t(benefit)} />
        ))}
      </div>
      
      {formState === "success" ? (
        <SuccessMessage resetForm={resetForm} />
      ) : formState === "error" ? (
        <ErrorMessage resetForm={resetForm} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className={formStyles.label}>
              {t("fullName")} *
            </label>
            <input
              type="text"
              id="fullName"
              {...register("fullName")}
              className={errors.fullName ? formStyles.inputError : formStyles.input}
              placeholder={t("fullNamePlaceholder")}
            />
            {errors.fullName && (
              <p className={formStyles.errorText}>{errors.fullName.message}</p>
            )}
          </div>
          
          {/* Email */}
          <div>
            <label htmlFor="email" className={formStyles.label}>
              {t("email")} *
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className={errors.email ? formStyles.inputError : formStyles.input}
              placeholder={t("emailPlaceholder")}
            />
            {errors.email && (
              <p className={formStyles.errorText}>{errors.email.message}</p>
            )}
          </div>
          
          {/* Phone with Country Selector */}
          <div>
            <label htmlFor="phone" className={formStyles.label}>
              {t("phone")}
            </label>
            <div className="flex">
              {/* Country Code Selector */}
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    onChange={(e) => handleCountryChange(e.target.value as CountryCode)}
                    className={formStyles.countrySelect}
                  >
                    <option value="US">🇺🇸 +1</option>
                    <option value="BR">🇧🇷 +55</option>
                    <option value="PT">🇵🇹 +351</option>
                  </select>
                )}
              />
              
              {/* Phone Input with Mask */}
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <input
                    type="tel"
                    id="phone"
                    value={field.value}
                    onChange={handlePhoneChange}
                    onBlur={field.onBlur}
                    className={`flex-1 ${formStyles.input} border-l-0`}
                    placeholder={PHONE_CONFIG[selectedCountry].placeholder}
                  />
                )}
              />
            </div>
            <p className="text-xs text-[#D7D7D7]/50 mt-1">
              {PHONE_CONFIG[selectedCountry].maxDigits} digits max
            </p>
          </div>
          
          {/* Budget */}
          <div>
            <label htmlFor="budget" className={formStyles.label}>
              {t("budget")} *
            </label>
            <div className="relative">
              <select
                id="budget"
                {...register("budget")}
                defaultValue=""
                className={errors.budget ? formStyles.inputError : formStyles.select}
              >
                <option value="" disabled>{t("selectBudget")}</option>
                <option value="5000-15000">$5,000 - $15,000</option>
                <option value="15000-30000">$15,000 - $30,000</option>
                <option value="30000-50000">$30,000 - $50,000</option>
                <option value="50000+">$50,000+</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-[#27D182]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
            {errors.budget && (
              <p className={formStyles.errorText}>{errors.budget.message}</p>
            )}
          </div>
          
          {/* Message */}
          <div>
            <label htmlFor="message" className={formStyles.label}>
              {t("aboutProject")} *
            </label>
            <textarea
              id="message"
              {...register("message")}
              rows={4}
              className={errors.message ? formStyles.inputError : formStyles.input}
              placeholder={t("aboutProjectPlaceholder")}
            />
            {errors.message && (
              <p className={formStyles.errorText}>{errors.message.message}</p>
            )}
          </div>
          
          {/* NDA Checkbox */}
          <div>
            <label className="flex items-center space-x-3 hover:text-[#27D182] cursor-pointer transition-colors group">
              <input 
                type="checkbox" 
                {...register("signNDA")}
                className={formStyles.checkbox} 
              />
              <span className="text-sm">{t("signNDA")}</span>
            </label>
          </div>
          
          {/* Submit */}
          <div className="pt-4">
            <p className="text-xs text-[#D7D7D7] mb-6">
              {t("privacyNotice")} 
              <a href="/privacy-policy" className="text-[#27D182] hover:underline">
                {t("privacyPolicy")}
              </a>
            </p>
            
            <GradientButton type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting 
                ? t("sending")
                : t("sendMessage")
              }
            </GradientButton>
          </div>
        </form>
      )}
    </div>
  );
}

/**
 * Componente para item de benefício com ícone circular
 */
function BenefitItem({ text }: { text: string }) {
  return (
    <div className="flex items-center space-x-3 text-sm group">
      <span className="flex h-6 w-6 rounded-full bg-[#27D182]/20 items-center justify-center flex-shrink-0 transition-all group-hover:scale-110">
        <span className="h-4 w-4 rounded-full bg-[#27D182]"></span>
      </span>
      <span className="text-[#F7F7F7]">{text}</span>
    </div>
  );
}

/**
 * Mensagem de sucesso do formulário
 */
function SuccessMessage({ resetForm }: { resetForm: () => void }) {
  const t = useTranslations("contact");
  
  return (
    <div className="text-center py-8 relative">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-[#017DDD] via-[#27D182] to-[#FAD007] rounded-full opacity-70"></div>
      <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-[#27D182]/20 mb-6 mt-6">
        <Check className="h-8 w-8 text-[#27D182]" />
      </div>
      <h3 className="text-xl font-bold mb-3 font-satoshi">{t("successTitle")}</h3>
      <p className="mb-8 text-[#D7D7D7]">
        {t("successMessage")}
      </p>
      <GradientButton onClick={resetForm} size="sm" className="hover:scale-105 transition-transform">
        {t("sendAnother")}
      </GradientButton>
    </div>
  );
}

/**
 * Mensagem de erro do formulário
 */
function ErrorMessage({ resetForm }: { resetForm: () => void }) {
  const t = useTranslations("contact");
  
  return (
    <div className="text-center py-8 relative">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-red-500/50 rounded-full"></div>
      <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-500/20 mb-6 mt-6">
        <AlertCircle className="h-8 w-8 text-red-500" />
      </div>
      <h3 className="text-xl font-bold mb-3 font-satoshi">{t("errorTitle")}</h3>
      <p className="mb-8 text-[#D7D7D7]">
        {t("errorMessage")}
      </p>
      <GradientButton onClick={resetForm} size="sm" className="hover:scale-105 transition-transform">
        {t("tryAgain")}
      </GradientButton>
    </div>
  );
}
