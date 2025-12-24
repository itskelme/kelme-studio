import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RiArrowRightLine, RiUploadCloud2Line, RiLinkedinFill, RiAddLine } from 'remixicon';

const roles = [
  {
    department: "Design",
    title: "Senior Product Designer",
    location: "Remote / Brazil",
    type: "Full-time"
  },
  {
    department: "Engineering",
    title: "Frontend Developer (React/WebGL)",
    location: "Remote / Global",
    type: "Contract"
  },
  {
    department: "Strategy",
    title: "Growth Marketing Manager",
    location: "Miami / Hybrid",
    type: "Full-time"
  }
];

const Careers: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    whatsapp: '',
    area: '',
    linkedin: '',
    portfolio: '',
    salary: '',
    cv: null as File | null
  });

  const [activeField, setActiveField] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFocus = (field: string) => setActiveField(field);
  const handleBlur = () => setActiveField(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormState({ ...formState, cv: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => setIsSubmitted(true), 1500);
  };

  return (
    <section className="min-h-screen bg-black relative overflow-hidden pt-32 pb-20">
      {/* Background Ambience */}
      <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header / Manifesto */}
        <div className="mb-24 max-w-4xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold uppercase tracking-[0.2em] text-[#C0392B] mb-4"
          >
            Talent Acquisition
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-6xl md:text-8xl font-bold uppercase leading-[0.9] text-white mb-8"
          >
            Join the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600">
              Elite Squad.
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-secondary text-lg md:text-xl max-w-2xl leading-relaxed"
          >
            We don't hire employees. We recruit obsessives. 
            If you believe "good enough" is an insult, and you want to build digital experiences that define the decade, you belong here.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Open Roles List */}
          <div className="lg:col-span-5">
            <h3 className="font-display text-2xl uppercase font-bold mb-8 border-b border-white/10 pb-4">
              Open Positions
            </h3>
            <div className="space-y-6">
              {roles.map((role, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-[#C0392B] uppercase tracking-widest">{role.department}</span>
                    <RiAddLine className="text-secondary group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="text-xl font-bold text-white group-hover:text-gray-300 transition-colors mb-1">
                    {role.title}
                  </h4>
                  <div className="text-xs text-secondary uppercase tracking-wider flex gap-3">
                    <span>{role.location}</span>
                    <span>•</span>
                    <span>{role.type}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 p-6 border border-white/10 bg-white/5">
                <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-2">Don't see your role?</h4>
                <p className="text-secondary text-sm mb-4">
                    We are always looking for exceptional talent. Fill out the application form to enter our Talent Bank.
                </p>
            </div>
          </div>

          {/* Right Column: Application Form */}
          <div className="lg:col-span-7">
            <div className="bg-black border border-white/10 p-8 md:p-12 relative">
                <div className="absolute top-0 right-0 p-4">
                    <span className="text-[10px] uppercase tracking-widest text-secondary border border-white/20 px-2 py-1">Application</span>
                </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-8 mt-4">
                  
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="group relative">
                      <label className={`text-xs font-bold uppercase tracking-widest absolute transition-all duration-300 ${activeField === 'name' || formState.name ? '-top-3 text-[#C0392B] text-[10px]' : 'top-3 text-secondary'}`}>
                        Full Name *
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
                        Email Address *
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

                  {/* Whatsapp & Area */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="group relative">
                      <label className={`text-xs font-bold uppercase tracking-widest absolute transition-all duration-300 ${activeField === 'whatsapp' || formState.whatsapp ? '-top-3 text-[#C0392B] text-[10px]' : 'top-3 text-secondary'}`}>
                        WhatsApp *
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
                        <label className={`text-xs font-bold uppercase tracking-widest absolute transition-all duration-300 -top-3 text-secondary`}>
                            Area of Expertise *
                        </label>
                        <select 
                            required
                            className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-white transition-colors appearance-none"
                            onChange={(e) => setFormState({...formState, area: e.target.value})}
                        >
                            <option value="" className="bg-black text-secondary">Select Option...</option>
                            <option value="Design" className="bg-black">Design (UI/UX/Brand)</option>
                            <option value="Development" className="bg-black">Development (Frontend/Backend)</option>
                            <option value="Strategy" className="bg-black">Strategy & Growth</option>
                            <option value="Management" className="bg-black">Project Management</option>
                            <option value="Other" className="bg-black">Other</option>
                        </select>
                    </div>
                  </div>

                  {/* LinkedIn & Portfolio */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="group relative">
                      <label className={`text-xs font-bold uppercase tracking-widest absolute transition-all duration-300 ${activeField === 'linkedin' || formState.linkedin ? '-top-3 text-[#C0392B] text-[10px]' : 'top-3 text-secondary'}`}>
                        LinkedIn URL *
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
                        Portfolio URL
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
                        Salary Expectations (Monthly/Hourly) *
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
                        Attach CV / Resume *
                    </label>
                    <label className="flex flex-col items-center justify-center w-full h-32 border border-white/20 border-dashed hover:border-white hover:bg-white/5 transition-all cursor-pointer group/upload">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <RiUploadCloud2Line className="w-8 h-8 mb-3 text-secondary group-hover/upload:text-[#C0392B] transition-colors" />
                            <p className="text-xs text-secondary uppercase tracking-wider">
                                {formState.cv ? formState.cv.name : <span className="group-hover/upload:text-white transition-colors">Click to upload or drag and drop</span>}
                            </p>
                            <p className="text-[10px] text-secondary/50 mt-1">PDF, DOCX (Max 5MB)</p>
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
                      <span>Submit Application</span>
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
                  <h3 className="font-display text-4xl font-bold uppercase mb-4">Application Received</h3>
                  <p className="text-secondary max-w-md mb-8">
                    Your profile has been added to our talent database. <br/>
                    If your skills match our current obsessions, we will be in touch.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs uppercase tracking-widest border-b border-white pb-1 hover:text-gray-300"
                  >
                    Submit another
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Careers;