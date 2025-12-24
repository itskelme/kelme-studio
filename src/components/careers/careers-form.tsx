"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { RiArrowRightLine, RiUploadCloud2Line, RiLinkedinFill } from "@remixicon/react"
import { useMessages } from "next-intl"

export function CareersForm() {
  const messages: any = useMessages()
  const careers = messages?.careers

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    whatsapp: '',
    area: '',
    linkedin: '',
    portfolio: '',
    salary: '',
    cv: null as File | null
  })

  const [activeField, setActiveField] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleFocus = (field: string) => setActiveField(field)
  const handleBlur = () => setActiveField(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormState({ ...formState, cv: e.target.files[0] })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTimeout(() => setIsSubmitted(true), 1500)
  }

  if (!careers) return null

  return (
    <div className="lg:col-span-7">
      <div className="bg-black border border-white/10 p-8 md:p-12 relative">
        <div className="absolute top-0 right-0 p-4">
          <span className="text-[10px] uppercase tracking-widest text-secondary border border-white/20 px-2 py-1">
            {careers.application}
          </span>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-8 mt-4">
            
            {/* Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group relative">
                <label className={`text-xs font-bold uppercase tracking-widest absolute transition-all duration-300 ${activeField === 'name' || formState.name ? '-top-3 text-[#C0392B] text-[10px]' : 'top-3 text-secondary'}`}>
                  {careers.fullName} *
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
                  {careers.emailAddress} *
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

            {/* WhatsApp & Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group relative">
                <label className={`text-xs font-bold uppercase tracking-widest absolute transition-all duration-300 ${activeField === 'whatsapp' || formState.whatsapp ? '-top-3 text-[#C0392B] text-[10px]' : 'top-3 text-secondary'}`}>
                  {careers.whatsapp} *
                </label>
                <input 
                  type="tel" 
                  required
                  className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-white transition-colors"
                  onFocus={() => handleFocus('whatsapp')}
                  onBlur={handleBlur}
                  onChange={(e) => setFormState({...formState, whatsapp: e.target.value})}
                />
              </div>
              <div className="group relative">
                <label className="text-xs font-bold uppercase tracking-widest absolute transition-all duration-300 -top-3 text-secondary">
                  {careers.areaOfExpertise} *
                </label>
                <select 
                  required
                  className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-white transition-colors appearance-none"
                  onChange={(e) => setFormState({...formState, area: e.target.value})}
                >
                  <option value="" className="bg-black text-secondary">{careers.selectOption}</option>
                  <option value="Design" className="bg-black">{careers.design}</option>
                  <option value="Development" className="bg-black">{careers.development}</option>
                  <option value="Strategy" className="bg-black">{careers.strategy}</option>
                  <option value="Management" className="bg-black">{careers.management}</option>
                  <option value="Other" className="bg-black">{careers.other}</option>
                </select>
              </div>
            </div>

            {/* LinkedIn & Portfolio */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group relative">
                <label className={`text-xs font-bold uppercase tracking-widest absolute transition-all duration-300 ${activeField === 'linkedin' || formState.linkedin ? '-top-3 text-[#C0392B] text-[10px]' : 'top-3 text-secondary'}`}>
                  {careers.linkedinUrl} *
                </label>
                <div className="relative">
                  <input 
                    type="url" 
                    required
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-white transition-colors pr-8"
                    onFocus={() => handleFocus('linkedin')}
                    onBlur={handleBlur}
                    onChange={(e) => setFormState({...formState, linkedin: e.target.value})}
                  />
                  <RiLinkedinFill className="absolute right-0 top-3 text-secondary pointer-events-none w-4 h-4" />
                </div>
              </div>
              <div className="group relative">
                <label className={`text-xs font-bold uppercase tracking-widest absolute transition-all duration-300 ${activeField === 'portfolio' || formState.portfolio ? '-top-3 text-[#C0392B] text-[10px]' : 'top-3 text-secondary'}`}>
                  {careers.portfolioUrl}
                </label>
                <input 
                  type="url" 
                  className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-white transition-colors"
                  onFocus={() => handleFocus('portfolio')}
                  onBlur={handleBlur}
                  onChange={(e) => setFormState({...formState, portfolio: e.target.value})}
                />
              </div>
            </div>

            {/* Salary */}
            <div className="group relative">
              <label className={`text-xs font-bold uppercase tracking-widest absolute transition-all duration-300 ${activeField === 'salary' || formState.salary ? '-top-3 text-[#C0392B] text-[10px]' : 'top-3 text-secondary'}`}>
                {careers.salaryExpectations} *
              </label>
              <input 
                type="text" 
                required
                className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-white transition-colors"
                onFocus={() => handleFocus('salary')}
                onBlur={handleBlur}
                onChange={(e) => setFormState({...formState, salary: e.target.value})}
              />
            </div>

            {/* Upload CV */}
            <div className="group mt-4">
              <label className="text-xs font-bold uppercase tracking-widest text-secondary block mb-4">
                {careers.attachCV} *
              </label>
              <label className="flex flex-col items-center justify-center w-full h-32 border border-white/20 border-dashed hover:border-white hover:bg-white/5 transition-all cursor-pointer group/upload">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <RiUploadCloud2Line className="w-8 h-8 mb-3 text-secondary group-hover/upload:text-[#C0392B] transition-colors" />
                  <p className="text-xs text-secondary uppercase tracking-wider">
                    {formState.cv ? formState.cv.name : <span className="group-hover/upload:text-white transition-colors">{careers.uploadText}</span>}
                  </p>
                  <p className="text-[10px] text-secondary/50 mt-1">{careers.fileFormat}</p>
                </div>
                <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleFileChange} required />
              </label>
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-4">
              <button 
                type="submit"
                className="bg-white text-black px-12 py-4 text-sm uppercase tracking-widest font-bold hover:bg-[#C0392B] hover:text-white transition-all duration-300 flex items-center gap-3"
              >
                <span>{careers.submitApplication}</span>
                <RiArrowRightLine className="w-4 h-4" />
              </button>
            </div>

          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-[600px] flex flex-col items-center justify-center text-center"
          >
            <h3 className="font-display text-4xl font-bold uppercase mb-4">{careers.applicationReceived}</h3>
            <p className="text-secondary max-w-md mb-8">
              {careers.receivedMessage}
            </p>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="text-xs uppercase tracking-widest border-b border-white pb-1 hover:text-gray-300"
            >
              {careers.submitAnother}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
