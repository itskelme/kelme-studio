"use client";

import { useTranslations } from "next-intl";
import { MapPin, Phone } from "lucide-react";

/**
 * Componente que exibe os escritórios da empresa
 */
export function ContactOffices() {
  const t = useTranslations("contact");
  
  return (
    <section className="mt-24">
      <header className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4 font-satoshi">{t("ourOffices")}</h2>
        <p className="text-xl opacity-80 max-w-2xl mx-auto">
          {t("officesDescription")}
        </p>
      </header>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {offices.map((office, index) => (
          <OfficeCard 
            key={index}
            title={t(office.titleKey)}
            address={office.address}
            phone={office.phone}
            phoneHref={office.phoneHref}
          />
        ))}
      </div>
    </section>
  );
}

/**
 * Dados dos escritórios
 */
const offices = [
  {
    titleKey: "florianopolis",
    address: [
      "ImpactHub - Passeio Primavera",
      "Rod. José Carlos Daux, 4150",
      "Florianópolis, SC",
      "Brasil"
    ],
    phone: "+55 48 99151-5420",
    phoneHref: "https://wa.me/5548991515420",
    whatsappHref: "https://wa.me/5548991515420"
  }
];

/**
 * Componente de cartão de escritório
 */
type OfficeCardProps = {
  title: string;
  address: string[];
  phone: string;
  phoneHref: string;
  whatsappHref?: string;
};

function OfficeCard({ title, address, phone, phoneHref, whatsappHref }: OfficeCardProps) {
  const t = useTranslations("contact");
  
  return (
    <div className="bg-dark-card p-6 rounded-xl border border-[#27D182]/20 transition-transform hover:scale-[1.02] duration-300">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-[#27D182]/20 rounded-lg">
          <MapPin className="h-6 w-6 text-[#27D182]" />
        </div>
        <h3 className="text-lg font-bold font-satoshi">{title}</h3>
      </div>
      
      <div className="mb-6">
        {address.map((line, i) => (
          <p key={i} className="text-sm mb-0.5">{line}</p>
        ))}
      </div>
      
      <div className="flex items-center space-x-2 text-sm mb-4">
        <Phone className="h-4 w-4 text-[#27D182]" />
        <a href={phoneHref} className="hover:text-[#27D182] transition-colors">
          {phone}
        </a>
      </div>
      
      {whatsappHref && (
        <a 
          href={whatsappHref} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 bg-[#27D182]/20 hover:bg-[#27D182]/30 text-[#27D182] px-3 py-2 rounded-lg transition-colors text-sm"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span>{t("chatOnWhatsApp")}</span>
        </a>
      )}
    </div>
  );
}
