/**
 * Utilitários de estilo para o Kelme Studio
 * Centraliza classes CSS e variáveis para manter a consistência visual
 */

/**
 * Classes para formulários padronizados
 */
export const formStyles = {
  input: "w-full bg-dark border border-[#27D182]/30 rounded-lg p-3 text-light focus:outline-none focus:ring-2 focus:ring-[#27D182]/50 transition-all hover:border-[#27D182]/50",
  select: "w-full bg-dark border border-[#27D182]/30 rounded-lg p-3 text-light focus:outline-none focus:ring-2 focus:ring-[#27D182]/50 appearance-none transition-all hover:border-[#27D182]/50",
  label: "block text-sm font-medium mb-2 text-[#F7F7F7]",
  checkbox: "h-5 w-5 rounded border-[#27D182] accent-[#27D182] bg-dark",
  container: "bg-dark-card p-6 md:p-10 rounded-xl border relative overflow-hidden group",
  
  // Estados de borda para formulários
  borderStates: {
    idle: "border-[#27D182]/20 hover:shadow-[0_0_15px_rgba(39,209,130,0.15)] transition-shadow",
    success: "border-[#27D182]/50 shadow-[0_0_20px_rgba(39,209,130,0.3)]",
    error: "border-destructive/50 shadow-[0_0_20px_rgba(255,0,0,0.2)]",
  }
};

/**
 * Gradientes principais da marca
 */
export const brandGradients = {
  primary: "bg-gradient-to-r from-blue via-emerald to-yellow",
  text: "bg-clip-text text-transparent bg-gradient-to-r from-blue via-emerald to-yellow",
  hover: "hover:bg-gradient-to-r hover:from-blue hover:via-emerald hover:to-yellow",
};

/**
 * Estilos para ícones
 */
export const iconStyles = {
  primary: "text-emerald",
  secondary: "text-blue",
  tertiary: "text-yellow",
  neutral: "text-light opacity-70",
};

/**
 * Estilos para botões
 */
export const buttonStyles = {
  primary: "bg-emerald text-dark font-medium rounded-lg px-5 py-2.5 hover:bg-emerald-light transition-colors",
  secondary: "bg-dark border border-emerald text-emerald font-medium rounded-lg px-5 py-2.5 hover:bg-emerald/10 transition-colors",
  outline: "border border-emerald/30 text-light font-medium rounded-lg px-5 py-2.5 hover:border-emerald hover:text-emerald transition-colors",
  text: "text-emerald font-medium hover:underline",
};

/**
 * Estilos para cards
 */
export const cardStyles = {
  base: "bg-dark-card rounded-xl p-6",
  interactive: "bg-dark-card rounded-xl p-6 hover:border-emerald/50 border border-transparent transition-colors",
  glassmorphism: "bg-dark-card/80 backdrop-blur-md rounded-xl p-6 border border-emerald/10",
};

/**
 * Estilos para headings
 */
export const headingStyles = {
  h1: "text-4xl md:text-5xl lg:text-6xl font-bold font-rubik uppercase tracking-tight",
  h2: "text-3xl md:text-4xl font-bold font-rubik uppercase tracking-tight",
  h3: "text-2xl md:text-3xl font-bold font-rubik uppercase tracking-tight",
  h4: "text-xl md:text-2xl font-semibold font-rubik uppercase",
  gradient: "bg-clip-text text-transparent bg-gradient-to-r from-blue via-emerald to-yellow",
};
