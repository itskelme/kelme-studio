"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Home, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui";

export default function LocaleNotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Brand Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-bold text-white/2 pointer-events-none select-none z-0 tracking-tighter">
        404
      </div>

      {/* Background Gradients */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-[800px] mx-auto px-6 z-10 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex"
        >
          <div className="flex items-center gap-3 px-4 py-2 border border-white/20 rounded-full text-sm font-bold tracking-widest uppercase text-white bg-white/5 backdrop-blur-sm">
            <Zap className="w-4 h-4 text-red-500 fill-current" />
            Error 404
          </div>
        </motion.div>

        {/* 404 Number */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-8xl md:text-9xl lg:text-[12rem] font-bold leading-none tracking-tighter text-white"
          >
            404
          </motion.h1>
        </div>

        {/* Title */}
        <div className="overflow-hidden mb-6">
          <motion.h2
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl md:text-5xl font-bold leading-tight tracking-tight text-gradient-primary"
          >
            {t("title")}
          </motion.h2>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg md:text-xl text-neutral-400 max-w-lg mx-auto mb-12 leading-relaxed"
        >
          {t("description")}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/">
            <Button size="default" className="group relative overflow-hidden">
              <Home className="mr-2 h-4 w-4 relative z-10" />
              <span className="relative z-10">{t("goHome").toUpperCase()}</span>
              <div className="absolute inset-0 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
            </Button>
          </Link>
          <button onClick={() => window.history.back()}>
            <Button variant="secondary" size="default">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("goBack").toUpperCase()}
            </Button>
          </button>
        </motion.div>

        {/* Floating Error Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            scale: [0.8, 1.2, 1.2, 0.8],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 right-10 w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center backdrop-blur-xl border border-red-500/20"
        >
          <Zap className="w-10 h-10 text-red-500" />
        </motion.div>
      </div>
    </div>
  );
}
