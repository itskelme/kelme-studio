"use client";

import { motion } from "framer-motion";
import { RiUserLine, RiCheckLine } from "@remixicon/react";
import { Controller } from "react-hook-form";
import { StepProps, CountryCode, PHONE_CONFIG } from "./types";
import { isValidEmail, isValidPhone, getPhoneDigits } from "./utils";

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

interface ContactInfoStepProps extends StepProps {
  name: string;
  email: string;
  phone: string;
  phoneCountry: CountryCode;
  onCountryChange: (country: CountryCode) => void;
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>, onChange: (value: string) => void) => void;
}

export function ContactInfoStep({ 
  control, 
  errors, 
  t, 
  variant,
  name,
  email,
  phone,
  phoneCountry,
  onCountryChange,
  onPhoneChange
}: ContactInfoStepProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent/20 rounded-lg flex items-center justify-center">
          <RiUserLine className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-display font-bold uppercase">
            {t("directContact")}
          </h3>
          <p className="text-secondary text-xs sm:text-sm">
            {variant === "br" ? "Suas informações de contato" : "Your contact information"}
          </p>
        </div>
      </div>

      <motion.div 
        className="space-y-4 sm:space-y-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Name Field */}
        <motion.div variants={itemVariants} className="group relative">
          <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-secondary block mb-1.5 sm:mb-2">
            {t("fullName")} *
          </label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder={t("fullNamePlaceholder")}
                className={`w-full bg-transparent border-b py-2.5 sm:py-3 text-sm sm:text-base text-white focus:outline-none transition-colors placeholder:text-white/30 ${
                  errors.name ? 'border-red-500' : name && name.length >= 2 ? 'border-accent' : 'border-white/20 focus:border-accent'
                }`}
              />
            )}
          />
          {errors.name && (
            <span className="text-[10px] sm:text-xs text-red-500 mt-1 block">
              {errors.name.message}
            </span>
          )}
          {name && name.length >= 2 && !errors.name && (
            <span className="absolute right-0 top-8">
              <RiCheckLine className="w-4 h-4 text-accent" />
            </span>
          )}
        </motion.div>

        {/* Email Field */}
        <motion.div variants={itemVariants} className="group relative">
          <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-secondary block mb-1.5 sm:mb-2">
            {t("email")} *
          </label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="email"
                placeholder={t("emailPlaceholder")}
                className={`w-full bg-transparent border-b py-2.5 sm:py-3 text-sm sm:text-base text-white focus:outline-none transition-colors placeholder:text-white/30 ${
                  errors.email ? 'border-red-500' : email && isValidEmail(email) ? 'border-accent' : 'border-white/20 focus:border-accent'
                }`}
              />
            )}
          />
          {errors.email && (
            <span className="text-[10px] sm:text-xs text-red-500 mt-1 block">
              {errors.email.message}
            </span>
          )}
          {email && isValidEmail(email) && !errors.email && (
            <span className="absolute right-0 top-8">
              <RiCheckLine className="w-4 h-4 text-accent" />
            </span>
          )}
        </motion.div>

        {/* Phone Field with Country Selector */}
        <motion.div variants={itemVariants} className="group relative">
          <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-secondary block mb-1.5 sm:mb-2">
            {t("phone")} *
          </label>
          <div className="flex items-center gap-2">
            {/* Country Selector */}
            <Controller
              name="phoneCountry"
              control={control}
              render={({ field }) => (
                <div className="relative">
                  <select
                    {...field}
                    onChange={(e) => onCountryChange(e.target.value as CountryCode)}
                    className="appearance-none bg-white/5 border border-white/20 hover:border-accent/50 focus:border-accent rounded-lg px-3 py-2.5 sm:py-3 text-sm text-white focus:outline-none cursor-pointer transition-all duration-200 pr-8"
                  >
                    {variant === "br" ? (
                      <>
                        <option value="BR" className="bg-[#0A0A0A] text-white py-2">🇧🇷 BR +55</option>
                        <option value="PT" className="bg-[#0A0A0A] text-white py-2">🇵🇹 PT +351</option>
                        <option value="US" className="bg-[#0A0A0A] text-white py-2">🇺🇸 US +1</option>
                        <option value="CA" className="bg-[#0A0A0A] text-white py-2">🇨🇦 CA +1</option>
                        <option value="GB" className="bg-[#0A0A0A] text-white py-2">🇬🇧 UK +44</option>
                      </>
                    ) : (
                      <>
                        <option value="US" className="bg-[#0A0A0A] text-white py-2">🇺🇸 US +1</option>
                        <option value="CA" className="bg-[#0A0A0A] text-white py-2">🇨🇦 CA +1</option>
                        <option value="BR" className="bg-[#0A0A0A] text-white py-2">🇧🇷 BR +55</option>
                        <option value="PT" className="bg-[#0A0A0A] text-white py-2">🇵🇹 PT +351</option>
                        <option value="GB" className="bg-[#0A0A0A] text-white py-2">🇬🇧 UK +44</option>
                      </>
                    )}
                  </select>
                  {/* Custom dropdown arrow */}
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              )}
            />
            
            {/* Phone Input with Mask */}
            <Controller
              name="phone"
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <input
                  type="tel"
                  value={value}
                  onChange={(e) => onPhoneChange(e, onChange)}
                  onBlur={onBlur}
                  placeholder={PHONE_CONFIG[phoneCountry].placeholder}
                  className={`flex-1 bg-transparent border-b py-2.5 sm:py-3 text-sm sm:text-base text-white focus:outline-none transition-colors placeholder:text-white/30 ${
                    errors.phone ? 'border-red-500' : phone && isValidPhone(phone, phoneCountry) ? 'border-accent' : 'border-white/20 focus:border-accent'
                  }`}
                />
              )}
            />
            
            {phone && isValidPhone(phone, phoneCountry) && !errors.phone && (
              <span className="ml-1">
                <RiCheckLine className="w-4 h-4 text-accent" />
              </span>
            )}
          </div>
          
          {/* Character count indicator */}
          <div className="flex justify-between mt-1">
            {errors.phone ? (
              <span className="text-[10px] sm:text-xs text-red-500">
                {errors.phone.message}
              </span>
            ) : (
              <span className="text-[10px] text-white/30">
                {getPhoneDigits(phone).length}/{PHONE_CONFIG[phoneCountry].maxDigits} {variant === "br" ? "dígitos" : "digits"}
              </span>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
