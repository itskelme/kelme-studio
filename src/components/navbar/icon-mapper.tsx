import React from "react";
import { 
  // Ícones de serviços
  Globe, 
  ShoppingBag, 
  Layout, 
  Boxes, 
  Lightbulb, 
  Facebook, 
  Mail, 
  Search, 
  Brush, 
  Figma, 
  FileVideo, 
  PaintBucket,
  
  // Ícones de categorias  
  Code, 
  Megaphone, 
  Palette, 
  Video,
  
  // Tipos do Lucide
  LucideIcon,
  LucideProps
} from "lucide-react";

/**
 * Interface para propriedades de ícones que garante consistência
 * Estende as props nativas do Lucide para maior compatibilidade
 */
export interface IconProps extends Omit<LucideProps, 'ref'> {
  className?: string;
  size?: number;
}

/**
 * Tipo para representar todas as chaves de serviços suportados.
 * Isso garante type safety na nossa aplicação.
 */
type ServiceIconKey = 
  | 'WordPress'
  | 'Shopify'
  | 'Landing Pages'
  | 'Micro-SaaS'
  | 'MVP'
  | 'Meta Ads'
  | 'Google Ads'
  | 'TikTok Ads'
  | 'Social Media'
  | 'Email Marketing'
  | 'SEO'
  | 'Branding'
  | 'UI/UX Research'
  | 'VSL'
  | 'Creative Ads';

/**
 * Mapeamento de serviços para seus componentes de ícone do Lucide
 * Este objeto associa cada serviço ao seu respectivo componente de ícone
 */
const SERVICE_ICON_COMPONENTS: Record<ServiceIconKey, LucideIcon> = {
  "WordPress": Globe,
  "Shopify": ShoppingBag,
  "Landing Pages": Layout,
  "Micro-SaaS": Boxes,
  "MVP": Lightbulb,
  "Meta Ads": Facebook,
  "Google Ads": Search,
  "TikTok Ads": Video,
  "Social Media": Megaphone,
  "Email Marketing": Mail,
  "SEO": Search,
  "Branding": Brush,
  "UI/UX Research": Figma,
  "VSL": FileVideo,
  "Creative Ads": PaintBucket
};

/**
 * Retorna o componente de ícone apropriado para um serviço
 * @param service - Nome do serviço
 * @param defaultIcon - Ícone padrão para usar se o serviço não for encontrado
 * @param iconProps - Propriedades a serem passadas para o componente de ícone
 * @returns Componente de ícone React
 */
export const getServiceIcon = (
  service: string, 
  defaultIcon: React.ReactNode,
  iconProps: IconProps = { className: "h-5 w-5" }
): React.ReactNode => {
  // Verifica se o serviço está no nosso mapeamento
  if (service in SERVICE_ICON_COMPONENTS) {
    const IconComponent = SERVICE_ICON_COMPONENTS[service as ServiceIconKey];
    return <IconComponent {...iconProps} />;
  }
  
  // Retorna o ícone padrão para serviços não mapeados
  return defaultIcon;
};

/**
 * Tipo para as categorias de serviços
 */
type CategoryKey = 'development' | 'marketing' | 'strategy' | 'video';

/**
 * Mapeamento de categorias para seus componentes de ícone padrão
 */
const CATEGORY_ICON_COMPONENTS: Record<CategoryKey, LucideIcon> = {
  "development": Code,
  "marketing": Megaphone,
  "strategy": Palette,
  "video": Video
};

/**
 * Retorna o ícone padrão para uma categoria
 * @param category - Nome da categoria
 * @param iconProps - Propriedades a serem passadas para o componente de ícone
 * @returns Componente de ícone React para a categoria
 */
export const getCategoryDefaultIcon = (
  category: string,
  iconProps: IconProps = { className: "h-5 w-5" }
): React.ReactNode => {
  const normalizedCategory = category.toLowerCase() as CategoryKey;
  
  // Verifica se a categoria existe no nosso mapeamento
  if (normalizedCategory in CATEGORY_ICON_COMPONENTS) {
    const IconComponent = CATEGORY_ICON_COMPONENTS[normalizedCategory];
    return <IconComponent {...iconProps} />;
  }
  
  // Categoria não encontrada, retorna um ícone padrão (Code)
  return <Code {...iconProps} />;
};


