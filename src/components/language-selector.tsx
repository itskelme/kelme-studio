"use client";
import { useState, useEffect } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui";
import ReactCountryFlag from "react-country-flag";
import { RiArrowDownSLine } from "@remixicon/react";
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';

import { getLocale } from "next-intl/server";

const languages = [
  { code: 'pt', label: 'Português', country: 'BR' },
  { code: 'en', label: 'English', country: 'US' }
];

export function LanguageSelector() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [selected, setSelected] = useState(locale);
  useEffect(() => setSelected(locale), [locale]);
  const current = languages.find(l => l.code === selected) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 transition-colors rounded-none border border-white/20 mix-blend-difference">
          <ReactCountryFlag countryCode={current.country} svg className="rounded-full" style={{ width: 16, height: 16, objectFit: 'cover' }} />
          <span className="font-bold text-xs uppercase tracking-widest text-white">{current.code}</span>
          <RiArrowDownSLine className="h-4 w-4 text-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px] p-2 bg-black border border-white/20 rounded-none">
        {languages.map(lang => {
          if (lang.code === locale) return null; // não mostrar o já selecionado
          return (
            <DropdownMenuItem
              key={lang.code}
              onSelect={(e) => {
                e.preventDefault();
                // Implementação baseada na documentação official do next-intl
                
                // 1. Usar uma abordagem diferente para forçar uma navegação completa
                const href = pathname === '/' ? '/' : pathname;
                
                // 2. Definir cookie de locale manualmente antes de navegar
                document.cookie = `NEXT_LOCALE=${lang.code};path=/;max-age=31536000`;
                
                // 3. Em vez de usar o router, redirecionar usando window.location
                // Isso garante um refresh completo da página e aplicação imediata das mudanças de locale
                window.location.href = pathname === '/' 
                  ? `/${lang.code}` 
                  : `/${lang.code}${pathname}`;
              }}
              className="flex items-center gap-3 px-4 py-3 rounded-none font-bold text-sm uppercase tracking-wider text-white hover:bg-white/10 focus:bg-white/10 cursor-pointer transition-colors"
            >
              <>
                <ReactCountryFlag countryCode={lang.country} svg className="rounded-full" style={{ width: 20, height: 20, objectFit: 'cover' }} />
                <span>{lang.label}</span>
              </>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>

  );
}
