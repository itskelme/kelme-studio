"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { RiArrowRightLine, RiMailLine, RiMapPinLine, RiPhoneLine } from "@remixicon/react"
import { useMessages, useTranslations } from "next-intl"

export function ContactV2() {
  const messages: any = useMessages()
  const t = useTranslations("contact")
  
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: ''
  })

  const [activeField, setActiveField] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleFocus = (field: string) => setActiveField(field)
  const handleBlur = () => setActiveField(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTimeout(() => setIsSubmitted(true), 1500)
  }

  const budgetOptions = [
    { value: "5k", label: "< $5k" },
    { value: "10k", label: "$5k - $10k" },
    { value: "20k", label: "$10k - $20k" },
    { value: "20k+", label: "$20k+" }
  ]

  return (
    <section className="min-h-screen bg-black relative overflow-hidden pt-32 pb-20">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C0392B]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column: Context */}
          <div className="w-full lg:w-5/12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C0392B] mb-4">
                {t("getInTouch")}
              </h2>
              <h1 className="font-display text-6xl md:text-8xl font-bold uppercase leading-[0.9] mb-8">
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
                    <a href="https://wa.me/5548999999999" className="text-secondary hover:text-white transition-colors">
                      +55 48 99999-9999
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
          <div className="w-full lg:w-7/12">
            {!isSubmitted ? (
              <motion.form 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="group relative">
                    <label className={`text-xs font-bold uppercase tracking-widest absolute transition-all duration-300 ${activeField === 'name' || formState.name ? '-top-3 text-[#C0392B] text-[10px]' : 'top-3 text-secondary'}`}>
                      {t("fullName")}
                    </label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-white transition-colors"
                      onFocus={() => handleFocus('name')}
                      onBlur={handleBlur}
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                    />
                  </div>

                  <div className="group relative">
                    <label className={`text-xs font-bold uppercase tracking-widest absolute transition-all duration-300 ${activeField === 'email' || formState.email ? '-top-3 text-[#C0392B] text-[10px]' : 'top-3 text-secondary'}`}>
                      {t("email")}
                    </label>
                    <input 
                      type="email" 
                      required
                      className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-white transition-colors"
                      onFocus={() => handleFocus('email')}
                      onBlur={handleBlur}
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="group relative">
                  <label className={`text-xs font-bold uppercase tracking-widest absolute transition-all duration-300 ${activeField === 'company' || formState.company ? '-top-3 text-[#C0392B] text-[10px]' : 'top-3 text-secondary'}`}>
                    {t("company")}
                  </label>
                  <input 
                    type="text" 
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-white transition-colors"
                    onFocus={() => handleFocus('company')}
                    onBlur={handleBlur}
                    onChange={(e) => setFormState({...formState, company: e.target.value})}
                  />
                </div>

                <div className="group">
                  <label className="text-xs font-bold uppercase tracking-widest text-secondary block mb-4">
                    {t("budget")}
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {budgetOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setFormState({...formState, budget: opt.value})}
                        className={`py-3 px-2 border text-sm uppercase tracking-wider transition-all duration-300 ${
                          formState.budget === opt.value 
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
                  <label className={`text-xs font-bold uppercase tracking-widest absolute transition-all duration-300 ${activeField === 'message' || formState.message ? '-top-3 text-[#C0392B] text-[10px]' : 'top-3 text-secondary'}`}>
                    {t("aboutProject")}
                  </label>
                  <textarea 
                    rows={4}
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-white transition-colors resize-none"
                    onFocus={() => handleFocus('message')}
                    onBlur={handleBlur}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                  />
                </div>

                <div className="flex justify-end pt-8">
                  <button 
                    type="submit"
                    className="bg-white text-black px-10 py-4 text-sm uppercase tracking-widest font-bold hover:bg-[#C0392B] hover:text-white transition-all duration-300 flex items-center gap-3"
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
                className="h-full flex flex-col items-center justify-center text-center border border-white/10 bg-white/5 p-12 min-h-[400px]"
              >
                <div className="w-20 h-20 bg-[#C0392B] flex items-center justify-center mb-6 text-white">
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
                  className="mt-8 text-sm uppercase tracking-widest border-b border-white pb-1 hover:text-gray-300"
                >
                  {t("sendAnother")}
                </button>
              </motion.div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
