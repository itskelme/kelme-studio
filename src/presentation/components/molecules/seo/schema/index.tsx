import { FAQItem } from "@/presentation/components/atoms/ui/faq-schema";
import { SchemaProvider } from "./schema-provider";

/**
 * Props para Organization Schema
 */
type OrganizationSchemaProps = {
  name?: string;
  url?: string;
  logoUrl?: string;
  sameAs?: string[];
};

/**
 * Props para FAQ Schema
 */
type FAQSchemaProps = {
  items: FAQItem[];
};

/**
 * Wrapper para o Organization Schema 
 */
export function OrganizationSchema(props: Partial<OrganizationSchemaProps> = {}) {
  return (
    <SchemaProvider
      type="Organization"
      organizationData={props}
    />
  );
}

/**
 * Wrapper para o FAQ Schema
 */
export function FAQSchema({ items }: FAQSchemaProps) {
  return (
    <SchemaProvider
      type="FAQPage"
      faqData={{ items }}
    />
  );
}

/**
 * Wrapper genérico para qualquer tipo de schema
 */
export function CustomSchema({
  type,
  data
}: {
  type: "WebSite" | "BreadcrumbList" | string;
  data: Record<string, any>;
}) {
  return (
    <SchemaProvider
      type={type as any}
      customData={data}
    />
  );
}
