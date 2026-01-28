import { WorkDetail } from './en';
import { EXTERNAL_LINKS } from "@/lib/constants/links";

export const works: WorkDetail[] = [
  {
    id: "1",
    slug: "steez-drink",
    title: "Steez Drink",
    category: "E-Commerce",
    year: "2023",
    client: "Steez",
    heroImage: "/images/works/work_banner_steez-min.png",
    description: "Uma experiência de e-commerce minimalista e de alto impacto para uma marca de bebidas low-carb, com verificação de idade e fluxo de pagamento (checkout) contínuo.",
    challenge: "A Steez precisava de uma presença digital que correspondesse à sua estética urbana e ousada, ao mesmo tempo em que navegava pelos requisitos regulatórios de venda de bebidas alcoólicas. O desafio era criar um processo de verificação de idade sem atrito e uma experiência de compra fluida.",
    solution: "Engenheiramos uma solução de e-commerce headless usando Next.js e Shopify. O design utiliza pretos profundos e tipografia vibrante para destacar as latas do produto. Implementamos um age-gate personalizado e um checkout de página única que aumentou drasticamente as taxas de conversão.",
    services: ["UI/UX Design", "Desenvolvimento Full Stack", "Estratégia de E-commerce"],
    stack: ["Next.js", "Shopify Storefront API", "Tailwind CSS", "Vercel"],
    link: EXTERNAL_LINKS.STEEZ_DRINK,
    images: [
       { src: "/images/works/work_banner_steez-min.png", alt: "Steez Homepage", colSpan: 2 },
    ]
  },
  {
    id: "2",
    slug: "turbinou-insta",
    title: "TurbinouInsta",
    category: "Web App",
    year: "2022",
    client: "TurbinouInsta",
    heroImage: "/images/works/work_banner_turbinouinsta-min.png",
    description: "Uma plataforma abrangente para marketing de influência no Instagram, com sistema de pagamento integrado e painel de métricas detalhadas.",
    challenge: "O cliente precisava de uma plataforma robusta para gerenciar milhares de microtransações. Escalabilidade e segurança eram primordiais, assim como um painel que pudesse visualizar dados complexos de forma simples e acionável para os usuários.",
    solution: "Construímos uma aplicação web segura e escalável com um painel em tempo real. O sistema lida com processamento automatizado de pedidos e verificação de pagamentos. A UI foi projetada para ser limpa e utilitária, priorizando a visibilidade dos dados.",
    services: ["Desenvolvimento de Web App", "Arquitetura de Banco de Dados", "Integração de Pagamentos"],
    stack: ["React", "Node.js", "PostgreSQL", "Stripe"],
    images: [
        { src: "/images/works/work_banner_turbinouinsta-min.png", alt: "Dashboard View", colSpan: 2 }
    ]
  },
  {
    id: "3",
    slug: "pppi",
    title: "PPPI",
    category: "Branding & Corporativo",
    year: "2024",
    client: "PPPI",
    heroImage: "/images/works/work_banner_pppi-min.png",
    description: "Um site institucional para uma empresa de registro de marcas, apresentando um sistema automatizado de consulta online.",
    challenge: "A lei de marcas pode parecer arcaica e burocrática. A PPPI queria se posicionar como uma parceira moderna e acessível para empresas digitais. Eles precisavam de uma maneira de automatizar a triagem inicial de consultas.",
    solution: "Criamos uma identidade refinada, profissional e moderna. O site apresenta um formulário de consulta interativo passo a passo que qualifica leads antes que cheguem a um humano. O design inspira confiança através da tipografia e estrutura.",
    services: ["Identidade de Marca", "Web Design", "Desenvolvimento WordPress"],
    stack: ["WordPress", "PHP", "Tema Personalizado", "GSAP"],
    link: EXTERNAL_LINKS.PPPI,
    images: [
        { src: "/images/works/work_banner_pppi-min.png", alt: "PPPI Homepage", colSpan: 2 }
    ]
  },
  {
    id: "4",
    slug: "flikta",
    title: "Flikta",
    category: "SaaS",
    year: "2024",
    client: "Flikta",
    heroImage: "/images/works/work_banner_flikta-min.png",
    description: "Uma plataforma impulsionada por IA para gerenciar campanhas de influenciadores com rastreamento de ROI em tempo real.",
    challenge: "Agências de marketing lutam para rastrear o ROI real de campanhas de influenciadores em várias plataformas. A Flikta precisava de um mecanismo complexo de agregação de dados sobreposto a uma UI simples e amigável para profissionais de marketing.",
    solution: "Projetamos um painel rico em dados em modo escuro que agrega métricas de integrações de API. A interface usa as melhores práticas de visualização de dados para tornar tendências complexas óbvias num relance.",
    services: ["Design de Produto SaaS", "Implementação Frontend", "Visualização de Dados"],
    stack: ["Next.js", "Recharts", "OpenAI API", "Tailwind CSS"],
    link: EXTERNAL_LINKS.FLIKTA,
    images: [
        { src: "/images/works/work_banner_flikta-min.png", alt: "Flikta Analytics", colSpan: 2 }
    ]
  },
  {
    id: "5",
    slug: "ponte-americas",
    title: "Ponte Américas",
    category: "Landing Page",
    year: "2025",
    client: "Ponte Américas",
    heroImage: "/images/works/work_banner_ponteamericas-min.png",
    description: "Uma landing page moderna e de alta conversão para uma empresa de logística conectando as Américas do Norte e do Sul.",
    challenge: "Sites de logística são notoriamente desatualizados. A Ponte Américas queria mostrar que é diferente: rápida, tecnológica e confiável. O objetivo era gerar leads para contratos de transporte internacional.",
    solution: "Construímos uma landing page de alto desempenho com animações acionadas por rolagem que contam a história de uma cadeia logística contínua. O uso de visualizações de mapas comunica seu alcance sem a necessidade de paredes de texto.",
    services: ["Design de Landing Page", "Copywriting", "Desenvolvimento"],
    stack: ["Next.js", "Framer Motion", "React Hook Form"],
    link: EXTERNAL_LINKS.PONTE_AMERICAS,
    images: [
        { src: "/images/works/work_banner_ponteamericas-min.png", alt: "Hero Section", colSpan: 2 }
    ]
  },
  {
    id: "6",
    slug: "pandami",
    title: "Pandami",
    category: "AI SaaS",
    year: "2025",
    client: "Pandami",
    heroImage: "/images/works/work_banner_pandami-min.png",
    description: "Uma plataforma de visagismo com IA que recomenda estilos com base na análise de características faciais.",
    challenge: "A tecnologia de beleza requer uma mistura única de precisão científica e apelo estético. O aplicativo precisava parecer mágico — tirar uma foto e obter conselhos instantâneos, personalizados e de alta moda.",
    solution: "Criamos um aplicativo web mobile-first que parece um aplicativo nativo. A interface de digitalização é intuitiva e a página de resultados apresenta recomendações com imagens de alta qualidade e explicações claras.",
    services: ["Estratégia de Produto", "UI/UX Design", "Desenvolvimento Full Stack"],
    stack: ["Next.js", "TensorFlow.js", "PWA", "Tailwind CSS"],
    link: EXTERNAL_LINKS.PANDAMI,
    images: [
        { src: "/images/works/work_banner_pandami-min.png", alt: "Interface de Escaneamento", colSpan: 2 }
    ]
  }
];
