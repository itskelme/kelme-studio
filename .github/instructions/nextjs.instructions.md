---
applyTo: '**'
---

# Next JS AI Agent Guide

## Project Overview

This is a multilingual website for a digital agency/creative studio built with Next.js 15, using the modern App Router and following frontend architecture and development best practices.

The page is built using Next.js 15 and TailwindCSS 4.1, with Shadcn UI dependencies.

## Font Import Setup

When modifying font configuration, reference #file:globals.css #file:layout.tsx #file:tailwind.config.js as fonts are configured in these files. Ensure consistency to avoid build errors. Follow Clean Code principles and development best practices.

## Page Styling

- Always prefer TailwindCSS for styling, avoid pure CSS
- Use TailwindCSS CSS variables from "#file:@/styles/globals.css" for backgrounds, foregrounds, primary colors, and gradients
- Maintain visual consistency with TailwindCSS utility classes

## When Creating New Sections
- Check existing sections for styling and semantic structure consistency
- Follow componentization patterns, creating reusable components when needed
- Design responsively from the start using TailwindCSS utility classes
- Always use the <section> tag for new page sections
- Define an id for each section (lowercase, no spaces) - e.g., id="pricing"
- Wrap section content with <Container> for consistent alignment and spacing
- Use descriptive titles with appropriate heading tags (<h2> or <h3>)
- Prefer CSS variables from "#file:@/styles/globals.css" for colors
- Use "lucide-react" icons for visual consistency; use simple-icons for brand/social media icons
- Use "neutral" gray color classes
- Style sections with TailwindCSS utility classes matching overall design
- Use Primary Button for primary actions and Secondary Button for secondary actions

## Using Fonts

- Global styles already define Fahkwang for h1, h2, h3 and Ubuntu at :root
- Prefer using project-defined fonts unless specifically needed otherwise
- Avoid 'font-['Fahkwang']' or 'font-['Ubuntu']' in Tailwind classes - global classes are already defined
- Use TailwindCSS utility classes for additional styling (font weight, size, spacing)

## Core Technologies

- **Next.js 15**: React application with App Router
- **next-intl**: Internationalization system for multi-language support (pt/en)
- **TailwindCSS**: Styling with custom color scheme
- **Radix UI**: Accessible UI components
- **Lucide Icons**: Icon library used throughout the application

## Project Architecture & Structure

### Folder Structure

```
kelme-studio/
├── app/                      # Next.js route structure with App Router
│   ├── [locale]/             # Localized language routes
│   │   ├── layout.tsx        # Main layout for localized pages
│   │   ├── page.tsx          # Home page
│   │   └── contact/          # Subpages (example: contact)
│   └── globals.css           # Global styles and theme variables
├── components/               # Reusable components
│   ├── ui/                   # Basic reusable components
│   ├── blocks/               # Larger blocks composing sections
│   ├── navbar/               # Navigation-related components
│   ├── contact/              # Components specific to contact page
│   └── [others]/             # Components specific to each site section
├── i18n/                     # Internationalization system configuration
├── layouts/                  # Reusable layouts
├── lib/                      # Utilities and helpers
├── messages/                 # JSON files containing translations (en.json, pt.json)
└── public/                   # Static files and images
```

### Design Patterns

We follow Atomic Design and Clean Architecture principles:

#### 1. Atomic Design

Components organized by complexity hierarchy:
- **Atoms**: Basic components like buttons, inputs, icons (`components/ui/`)
- **Molecules**: Combinations of atoms forming simple functional components
- **Organisms**: Complex UI sections like headers, footers, etc.
- **Templates**: Layouts defining structure without specific content
- **Pages**: Templates populated with real data for user interaction

#### 2. Container-Presentational Pattern

Separation of business logic components (containers) from pure presentation components:
- **Container Components**: Handle logic, state, and requests
- **Presentational Components**: Focus only on rendering UI based on props

#### 3. Data Fetching Patterns

Using Next.js recommended data fetching patterns:
- **Server Components**: Prioritize server-side data fetching when possible
- **Parallelization**: Use parallel requests when appropriate
- **Fetch Where Needed**: Fetch data in the component that needs it, leveraging Next.js automatic memoization

## Patterns & Conventions

### Internationalization

- Use `next-intl` system for managing translations and localized routes
- Strings defined in JSON files at `messages/[locale].json`
- Access translations with hooks: `useTranslations()` and `useMessages()`
- For inter-page links, use `Link` component from nextjs's `@/i18n/navigation`

```tsx
// Example translation usage
import { useTranslations, useMessages } from 'next-intl';

export function Component() {
  const t = useTranslations();
  const messages: any = useMessages();
  
  return (
    <div>
      <h2>{t("section.title")}</h2>
      <p>{messages.section.content}</p>
    </div>
  );
}
```

### Interface Components

- Main page components are in `/components/`
- Each major section has its own component (Hero, Services, Work, etc.)
- Reusable UI components are in `/components/ui/`

### Navigation

- Main navigation managed by `Navbar` component
- `useNavMenus()` hook in `components/navbar/use-nav-menus.tsx` manages menu data
- Menu item icons mapped in `components/navbar/icon-mapper.tsx`
- Visual interface uses new highlight green color (#27D182) replacing previous gold

### State Management

- Primarily use React Hooks (`useState`, `useReducer`) for local state
- Use React Context for global state when needed
- Minimize client state using Server Components when possible

### Error Handling

- Implement error boundaries to catch rendering errors
- Use try/catch for API calls
- Provide user-friendly error messages

## Best Practices

### Components

1. **Naming**: Use PascalCase for components and camelCase for functions/variables
2. **Organization**: Each component should have its own directory when needed
3. **Typing**: Use TypeScript to explicitly define props with interfaces and maps
4. **Props**: Destructure props and use default values when applicable
5. **Server vs Client**: Prefer Server Components when no state or interactivity is needed
6. **Modularization**: Keep components small and focused on single responsibility

```tsx
// Example component structure
// components/feature/FeatureName/FeatureName.tsx

import styles from './FeatureName.module.css';

export interface IFeatureName {
  prop1: string;
  prop2?: number;
}

export default function FeatureName({ prop1, prop2 = 0 }: IFeatureName) {
  return (
    <div className={styles.container}>
      <h3>{prop1}</h3>
      <p>{prop2}</p>
    </div>
  );
}
```

### Performance

1. **Lazy Loading**: Use dynamic imports for large or rarely used components
2. **Images**: Optimize images using `next/image` component
3. **Memoization**: Use `useMemo` and `useCallback` to prevent unnecessary re-renders
4. **Server Components**: Prioritize Server Components to reduce client-side JavaScript

### SEO & Accessibility

1. **Metadata**: Use appropriate metadata on each page
2. **Semantics**: Use semantic and appropriate HTML elements
3. **ARIA**: Add ARIA attributes and ALT text when needed for accessibility
4. **Contrast**: Ensure colors have sufficient contrast

## Workflows

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Adding New Sections/Components

1. Determine if component should be Server or Client Component
2. Create component in `/components/`
3. Add translation strings in `messages/en.json` and `messages/pt.json`
4. Prioritize using styles from variables defined in `globals.css`
5. Import and use component in relevant pages

### Modifying Styles

- Prioritize using styles from variables defined in `globals.css` for accent, primary, secondary, background, text colors
- Use Tailwind classes directly in components when no corresponding variable exists in `globals.css`
- For consistent colors, use variables defined in globals.css
- Main scheme: Dark background (#0F0E0D), light text (#F7F7F7), green highlight (#27D182)
- Main gradient: Blue (#017DDD) → Green (#27D182) → Yellow (#FAD007) with stops at 0%, 52%, 100%

## Scalability & Maintenance

As the project grows, follow these practices to ensure scalability and maintainability:

### Clean & Readable Code

1. **Naming Conventions**: Maintain consistency in file, component, and function naming
2. **Comments**: Document complex or non-intuitive code
3. **Formatting**: Use formatters like Prettier to maintain consistency
4. **Refactoring**: Regularly refactor to improve code quality

### Performance Monitoring

1. **Lighthouse**: Run regular performance tests with Lighthouse
2. **Bundle Size**: Monitor JavaScript bundle size to avoid excessive growth
3. **Web Vitals**: Track metrics like CLS, FID, and LCP
4. **Server Rendering**: Use Server Components to reduce client workload

### Testing

1. **Unit Tests**: Write tests for isolated components and functions
2. **Integration Tests**: Test interaction between different system parts
3. **UI Tests**: Verify component appearance and behavior
4. **Accessibility Tests**: Ensure site accessibility using Playwright MCP

### MCP (Model-Centric Programming)

1. **Firecrawl**: For online site research and data extraction in markdown format
2. **Playwright**: For end-to-end UI and accessibility testing

## Copywriting & Content Strategy

### Voice Tone & Writing Style

- **Dave Gerhardt Style**: Direct, conversational, and results-oriented
- **Voice Tone**: Confident, innovative, professional yet accessible, inspiring
- **Key Characteristics**:
  - Clear and direct language
  - Focus on innovation, growth, and sustainable results
  - Storytelling to illustrate digital transformations
  - Selective use of rhetorical questions for engagement
  - Incorporation of innovation and sustainability elements

### Text Structure

1. **Titles & Headers**:
   - Direct and benefit-oriented
   - Preferably under 60 characters
   - Include relevant SEO keywords

2. **Body Text**:
   - Short paragraphs (max 3-4 lines)
   - Use lists and bullets for readability
   - Clear information hierarchy (inverted pyramid)

3. **CTAs (Calls to Action)**:
   - Action verbs in imperative form
   - Create sense of urgency when appropriate
   - Emphasize value user will receive

### Section Guidelines

- **Home Page**: Focus on communicating Kelme's vision and differentiators
- **About Us**: Storytelling about agency history and values
- **Services**: Highlight benefits before technical features
- **Portfolio**: Results-oriented narrative for each case study
- **Contact**: Welcoming and accessible tone

## Visual Identity

### Color Palette

- **Green** (#27D182): Primary highlight color, represents growth and innovation
- **Blue** (#017DDD): Complementary color, represents trust and professionalism
- **Yellow** (#FAD007): Support color, represents creativity and optimism
- **White** (#F7F7): Secondary color, represents clarity and space
- **Black/Dark Gray** (#0F0E0D): Background color, represents solidity and elegance
- **Secondary Green** (#3F9E59): Support color for green areas
- **Light Gray** (#D7D7D7): Color for secondary neutral elements

**Color Usage:**
- Green: Highlight elements, CTAs, main accents
- Blue: Secondary interactive elements, highlight sections
- Yellow: Notification elements, tertiary highlights
- White: Main text, breathing space areas
- Black/Dark Gray: Backgrounds, secondary text

### Brand Symbolism & Elements

- **Key Concepts**: Growth, innovation, fluidity, vision beyond horizon, superior perspective
- **Logo**: Eagle with head turned left, visible claws, with elements highlighted in green-blue gradient
- **Visual Metaphors**: Altitude, expansion, freedom, strategic vision, digital transformation

### Design Components

- **Iconography**:
  - Main library: Lucide Icons for interface
  - Simple Icons for social media and companies
  - Minimalist style with thin lines
- **Cards**: Futuristic design with glassmorphism effect and green-blue gradient accents
- **Buttons**: Rounded with green-to-blue gradients or green borders (radius: 8px)
- **Typography**:
  - Main font: Satoshi (weights: 300, 400, 500, 700)
  - Headings: Rubik
  - Body: Satoshi Regular/Light

### Image Guidelines

- **Photographic Style**: High-resolution images with contrasting tones
- **Treatment**: Light overlay with green-blue gradient on images for visual unity
- **Visual Themes**: Modern environments, technology, professionalism, innovation, sustainability
- **Composition**: Generous negative space, rule of thirds, ascending directional lines

### Animations & Interactions

- **Principles**: Smooth, elegant, with functional purpose
- Use GSAP library for animations
- **Transitions**: Natural easing curves, average duration 300-500ms
- **Hover**: Subtle scale effects (1.02-1.05) with green highlight (#27D182)
- **Scroll**: Fade and slide animations for elements entering viewport
- **Microinteractions**: Visual feedback for user actions with green-blue gradient accents
- **Gradients**: Fluid transitions between blue (#017DDD), green (#27D182), and yellow (#FAD007)

### Responsive Design

- **Approach**: Mobile-first with strategic breakpoints
- **Main Breakpoints**:
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px
  - Large Desktop: > 1280px
- **Techniques**:
  - Flexible units (rem, %, vh/vw)
  - Grid and Flexbox for adaptive layouts
  - Content prioritized by relevance on smaller screens
- **Images**: Responsive with srcset for different pixel densities
- **Touch**: Generous touch areas (minimum 44x44px) for mobile interfaces

### Accessibility Guidelines

- **Compliance**: Follows WCAG 2.1 level AA guidelines
- **Color Contrast**: Minimum 4.5:1 for standard text, 3:1 for large text (green #27D182 should be used on larger elements or with reinforced contrast)
- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **ARIA Attributes**: Used to improve screen reader experience
- **Focus States**: Visible and consistent with green outlines (#27D182)
- **Alt Text**: All images have appropriate descriptions
- **Semantic Structure**: Proper use of headings (H1-H6) and HTML5 elements
- **Forms**: Explicit labels and accessible error messages
- **Testing**: Regular verification with automated tools and manual testing

### Development Principles

1. **DRY (Don't Repeat Yourself)**: Avoid code duplication
2. **KISS (Keep It Simple, Stupid)**: Keep solutions simple and straightforward
3. **YAGNI (You Aren't Gonna Need It)**: Don't add functionality before needing it
4. **Composition over Inheritance**: Prefer component composition over inheritance
5. **Immutability**: Treat data as immutable to avoid side effects

This guide serves as a reference for maintaining code consistency and quality in the Kelme Studio project. The practices and patterns described here should be followed by all team members to ensure efficient and sustainable development.
