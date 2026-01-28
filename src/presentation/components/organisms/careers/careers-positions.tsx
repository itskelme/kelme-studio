"use client"

import { motion } from "framer-motion"
import { RiAddLine } from "@remixicon/react"
import { useMessages } from "next-intl"

const roles = [
  {
    department: "Design",
    title: "Senior Product Designer",
    location: "Remote / Brazil",
    type: "fullTime"
  },
  {
    department: "Engineering",
    title: "Frontend Developer (React/WebGL)",
    location: "Remote / Global",
    type: "contract"
  },
  {
    department: "Strategy",
    title: "Growth Marketing Manager",
    location: "Miami / Hybrid",
    type: "fullTime"
  }
]

export function CareersPositions() {
  const messages: any = useMessages()
  const careers = messages?.careers

  if (!careers) return null

  return (
    <div className="lg:col-span-5">
      <h3 className="font-display text-2xl uppercase font-bold mb-8 border-b border-white/10 pb-4">
        {careers.openPositions}
      </h3>
      <div className="space-y-6">
        {roles.map((role, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-accent uppercase tracking-widest">{role.department}</span>
              <RiAddLine className="text-secondary group-hover:text-white transition-colors" />
            </div>
            <h4 className="text-xl font-bold text-white group-hover:text-gray-300 transition-colors mb-1">
              {role.title}
            </h4>
            <div className="text-xs text-secondary uppercase tracking-wider flex gap-3">
              <span>{role.location}</span>
              <span>•</span>
              <span>{careers[role.type]}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 p-6 border border-white/10 bg-white/5">
        <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-2">
          {careers.dontSeeRole}
        </h4>
        <p className="text-secondary text-sm mb-4">
          {careers.talentBank}
        </p>
      </div>
    </div>
  )
}
