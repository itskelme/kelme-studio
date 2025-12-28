"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { GradientButton } from "@/presentation/components/atoms/ui/gradient-button";
import { Check, AlertCircle } from "lucide-react";

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
  select: "w-full px-4 py-3 bg-[#0F0E0D] border border-[#27D182]/20 text-[#F7F7F7] focus:outline-none focus:border-[#27D182] transition-colors appearance-none rounded-none cursor-pointer",
  checkbox: "w-5 h-5 border-2 border-[#27D182]/30 bg-[#0F0E0D] checked:bg-[#27D182] checked:border-[#27D182] focus:ring-2 focus:ring-[#27D182]/50 transition-all cursor-pointer rounded-none"
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
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState<"idle" | "success" | "error">("idle");
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simular envio do formulário (substitua por sua implementação real)
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFormState("success");
    } catch (error) {
      setFormState("error");
    } finally {
      setIsLoading(false);
    }
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
        <SuccessMessage resetForm={() => setFormState("idle")} />
      ) : formState === "error" ? (
        <ErrorMessage resetForm={() => setFormState("idle")} />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField
            id="fullName"
            label={t("fullName")}
            type="text"
            required
            placeholder={t("fullNamePlaceholder")}
          />
          
          <FormField
            id="email"
            label={t("email")}
            type="email"
            required
            placeholder={t("emailPlaceholder")}
          />
          
          <FormField
            id="phone"
            label={t("phone")}
            type="tel"
            placeholder={t("phonePlaceholder")}
          />
          
          <div>
            <label htmlFor="budget" className={formStyles.label}>
              {t("budget")} *
            </label>
            <div className="relative">
              <select
                id="budget"
                required
                defaultValue=""
                className={formStyles.select}
              >
                <option value="" disabled>{t("selectBudget")}</option>
                <option value="5000-15000">R$5.000 - R$15.000</option>
                <option value="15000-30000">R$15.000 - R$30.000</option>
                <option value="30000-50000">R$30.000 - R$50.000</option>
                <option value="50000+">R$50.000+</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-[#27D182]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <FormField
            id="message"
            label={t("aboutProject")}
            type="textarea"
            required
            placeholder={t("aboutProjectPlaceholder")}
          />
          
          <div>
            <label className="flex items-center space-x-3 hover:text-[#27D182] cursor-pointer transition-colors group">
              <input 
                type="checkbox" 
                className={formStyles.checkbox} 
              />
              <span className="text-sm">{t("signNDA")}</span>
            </label>
          </div>
          
          <div className="pt-4">
            <p className="text-xs text-[#D7D7D7] mb-6">
              {t("privacyNotice")} 
              <a href="/privacy-policy" className="text-[#27D182] hover:underline">
                {t("privacyPolicy")}
              </a>
            </p>
            
            <GradientButton type="submit" className="w-full" disabled={isLoading}>
              {isLoading 
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
 * Componente de campo de formulário padronizado
 */
type FormFieldProps = {
  id: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea";
  required?: boolean;
  placeholder?: string;
};

function FormField({ id, label, type, required, placeholder }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className={formStyles.label}>
        {label} {required && "*"}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          required={required}
          rows={4}
          className={formStyles.input}
          placeholder={placeholder}
        ></textarea>
      ) : (
        <input
          type={type}
          id={id}
          required={required}
          className={formStyles.input}
          placeholder={placeholder}
        />
      )}
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
