// Este arquivo está obsoleto e foi substituído por @/components/schema
// Mantido apenas para compatibilidade, será removido em uma futura refatoração

"use client";

import { OrganizationSchema as NewOrgSchema } from "@/presentation/components/molecules/seo/schema";

/**
 * Componente cliente para renderizar o schema JSON-LD da Organização
 * @deprecated Use OrganizationSchema de @/components/schema
 */
export default function OrganizationSchema() {
  return <NewOrgSchema />;
}
