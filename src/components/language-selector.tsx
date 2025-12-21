"use client";
import { useState, useEffect } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui";
import ReactCountryFlag from "react-country-flag";
import { ChevronDown } from "lucide-react";
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
        <Button variant="secondary" size="sm" className="flex items-center gap-2 min-w-[120px]">
          <ReactCountryFlag countryCode={current.country} svg style={{ width: 20, height: 20, borderRadius: '50%', objectFit: 'cover' }} />
          <span className="font-bold text-base text-[#F7F7F7]">{current.code.toUpperCase()}</span>
          <ChevronDown className="h-4 w-4 text-[#27D182]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px] p-1">
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
              className="flex items-center gap-2 px-3 py-2 rounded-lg font-satoshi text-base hover:bg-[#CB8D0F]/10 focus:bg-[#CB8D0F]/10 cursor-pointer"
            >
              <>
                <ReactCountryFlag countryCode={lang.country} svg style={{ width: 20, height: 20, borderRadius: '50%', objectFit: 'cover' }} />
                <span>{lang.label}</span>
              </>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>

  );
}
