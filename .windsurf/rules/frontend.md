---
trigger: always_on
globs: **/*.ts, **/*.tsx, **/*.js, **/*.jsx
---

  
# Next.js 16 Project Guidelines
  
## 1. Role & Principles  
  
Senior Next.js 16 developer with React 19, TypeScript strict mode, and Clean Architecture expertise.  
  
| Principle            | Implementation                                          |
| -------------------- | ------------------------------------------------------- |
| Server-First         | Prefer Server Components; Client only for interactivity |
| Type Safety          | Strict mode, no `any`, explicit interfaces              |
| Atomic Design        | Atoms → Molecules → Organisms → Templates → Pages       |
| Dependency Injection | Modular components with clear boundaries                |
  
---  
  
## 2. Technology Stack  
  
| Layer         | Technologies                                                   |
| ------------- | -------------------------------------------------------------- |
| **Framework** | Next.js 16 (App Router), React 19, TypeScript 5+ strict        |
| **Styling**   | TailwindCSS 4, class-variance-authority, clsx + tailwind-merge |
| **UI**        | ShadCN UI, Magic UI (magicui.design), Remix Icons              |
| **Data**      | SWR, Axios, Server Actions                                     |
| **State**     | Zustand (persistence only), React Hook Form + Zod              |
| **i18n**      | next-intl (always english is the prefered and primary reference language)                                              |
  
---  
  
## 3. Project Structure  
  

src/
├── app/ # App Router (entry points only)
│ ├── (private)/ # Auth-required routes
│ ├── (public)/ # Public routes
│ ├── globals.css
│ └── layout.tsx
│
├── presentation/pages/ # Page presentation (injected into app router)
│ └── [domain]/
│ ├── [page].view.tsx
│ ├── [page].model.ts
│ └── [page].types.ts
│
├── presentation/components/ # Atomic Design hierarchy (ONLY FOR REUSABLE COMPONENTS)
│ ├── atoms/ui/ # ShadCN primitives (NEVER MODIFY)
│ ├── molecules/[domain]/ # Branded wrappers by domain
│ ├── organisms/[domain]/ # Complex sections by domain
│ └── templates/ # Non-nested layout structures
│
├── lib/
│ ├── utils.ts # cn() helper
│ └── constants/ # Act as SSOT files, centralizing global constants
│
├── server/
│ ├── actions/
│ ├── services/
│ └── api.ts
│
├── stores/ # Zustand (persistence only)
│
├── types/ # Global type definitions
│ └── [entity].type.ts
│
└── public/

  
---  
  
## 4. Conventions  
  
| Element           | Pattern    | Example                            |
| ----------------- | ---------- | ---------------------------------- |
| File names        | kebab-case | `user-card.tsx`, `auth-service.ts` |
| Folder names      | kebab-case | `user-profile/`, `auth-actions/`   |
| Components        | PascalCase | `UserCard`, `AuthProvider`         |
| Constants         | camelCase  | `maxRetryCount`, `apiBaseUrl`      |
| Variables         | camelCase  | `userData`, `isLoading`            |
| Methods/Functions | camelCase  | `fetchUsers()`, `handleSubmit()`   |

### Component Organization  
  
- Group all components by **domain/module**  
- Each complex component uses Model-View pattern with dedicated folder  
- Page components live in `src/presentation/pages/[domain]/` and are imported into App Router `page.tsx`  
  
### File Structure (Complex Components)  
  

[component]/
├── [component].view.tsx # Pure presentation
├── [component].model.ts # Hooks, state, logic
├── [component].types.ts # Local types (when needed)
└── index.ts

  
---  
  
## 5. Component Rules  
  
### Server vs Client  
  
- **Server Components** (default): Data fetching, static content, SEO  
- **Client Components**: Interactivity, browser APIs, state, effects  
- Add `"use client"` directive only when necessary  
  
### ShadCN UI  
  
- Install via `npx shadcn@latest add <component>`  
- Never modify `atoms/ui/` primitives  
- Create branded wrappers in `molecules/[domain]/` for customization  
- ShadCN primitives are Atoms in Atomic Design  
  
### Templates  
  
- Non-nested layout structures for page composition  
- Define structure without specific content  
- Used for consistent page layouts across domains  
  
---  
  
## 6. Data & State  
  
| Type              | Solution                                 |
| ----------------- | ---------------------------------------- |
| Server data       | SWR with caching, revalidation, mutation |
| Form state        | React Hook Form + Zod validation         |
| UI state          | useState, useReducer, useContext         |
| Persistent client | Zustand (not for fetching)               |
  
### SWR Requirements  
  
- Configure globally with appropriate options  
- Use structured keys for caching 
- Implement error handling and retry logic  
- Add loading states and optimistic updates  via `mutate()`
  
---  
  
## 7. Styling  
  
### Rules  
  
- TailwindCSS only, avoid hardcoded CSS  
- Use `cn()` utility for conditional classes  
- Design tokens from `globals.css` for colors  
- Responsive-first approach  
- Fonts: Fahkwang (headings), Ubuntu (body) defined globally  
  
### Sections  
  
- Use `<section>` tag with lowercase id  
- Leverage templates for consistent layout  
- Primary Button for main actions, Secondary for alternatives  
  
---  
  
## 8. Type System  
  
### Global Types (`src/types/`)  
  
- API responses and data structures  
- Business entities  
- Cross-component interfaces  
- Shared props and state structures  
  
### Local Types  
  
Keep within component folder when used exclusively there.  
  
---  
  
## 9. Server Layer  
  
| Directory          | Purpose                               |
| ------------------ | ------------------------------------- |
| `server/actions/`  | Server Actions consuming services     |
| `server/services/` | API service layer with business logic |
| `server/api.ts`    | Axios client with interceptors        |
  
---  
  
## 10. Error Handling  
  
| Layer      | Approach                                |
| ---------- | --------------------------------------- |
| API        | Axios interceptors with typed responses |
| Components | Error boundaries with `error.tsx`       |
| Forms      | Zod validation with field-level errors  |
| SWR        | `onError` callback with retry logic     |
  
---  
  
## 11. Best Practices  
  
### Do  
  
- Embrace Server Components to minimize client JS  
- Use TypeScript generics and type guards  
- Include `loading.tsx` and `error.tsx` per route  
- Use `metadata` export for SEO  
- Ensure accessibility (ARIA, contrast)  
  
### Don't  
  
- Use `any` type  
- Overuse Client Components  
- Hardcode environment variables  
- Mix multiple state management patterns  
- Modify ShadCN primitives directly  
  
---  
  
## 12. Decision Trees  
  
### State Management  
  
| Need               | Solution            |
| ------------------ | ------------------- |
| Server data        | SWR                 |
| Form data          | React Hook Form     |
| Local UI           | useState/useReducer |
| Cross-component UI | useContext          |
| Persistent client  | Zustand             |
  
### Component Type  
  
| Condition           | Type   |
| ------------------- | ------ |
| Needs interactivity | Client |
| Needs browser API   | Client |
| Needs state/effects | Client |
| Otherwise           | Server |
  
### Type Location  
  
| Scope            | Location               |
| ---------------- | ---------------------- |
| Cross-module     | `src/types/`           |
| Single component | `[component].types.ts` |
  
---  
  
## 13. Checklists  
  
### Component Creation  
  
- [ ] Determine Server or Client Component  
- [ ] Place in correct Atomic Design level  
- [ ] Group by domain/module  
- [ ] Use Model-View pattern for complex components  
- [ ] Define explicit TypeScript interfaces  
- [ ] Use `cn()` for conditional styling  
  
### Page Creation  
  
- [ ] Create in `src/presentation/pages/[domain]/`  
- [ ] Use Model-View-Types structure  
- [ ] Import into App Router `page.tsx`  
- [ ] Add `loading.tsx` and `error.tsx`  
- [ ] Export metadata for SEO  
- [ ] Use `<section>` tags with lowercase ids  
  
---  

## 14. Documentation Access  
  
All library documentation available through **Context7 MCP**. Reference URLs for manual access:  
  
| Library         | URL                  |
| --------------- | -------------------- |
| Next.js         | nextjs.org/docs      |
| React           | react.dev            |
| SWR             | swr.vercel.app       |
| TailwindCSS     | tailwindcss.com/docs |
| ShadCN UI       | ui.shadcn.com        |
| Magic UI        | magicui.design       |
| Zod             | zod.dev              |
| React Hook Form | react-hook-form.com  |
| Zustand         | zustand-demo.pmnd.rs |
| next-intl       | next-intl.dev        |
| Axios           | axios-http.com/docs  |
| Remix Icons     | remixicon.com        |
  
---  
  
## 15. Internationalization  
  
### Configuration  
  
- Use next-intl for multi-language support  
- Review supported locales via messages folder's files
- The en.ts is the dictionary SSOT 
- Locale files organized by feature/domain  
- Server-side locale detection  
  
### Structure  
  

src/
├── messages/
│ ├── pt.json
│ └── en.json

  
---  
  
## 16. Forms  
  
### Requirements  
  
- React Hook Form for state management  
- Zod for schema validation  
- Server Actions for submission  
- Optimistic updates where appropriate  
- Clear error messaging and loading states  
  
### Validation Flow  
  
| Step              | Tool                     |
| ----------------- | ------------------------ |
| Schema definition | Zod                      |
| Form binding      | React Hook Form resolver |
| Field validation  | Real-time with Zod       |
| Submission        | Server Action            |
  
---  
  
## 17. Performance  
  
### Optimization Strategies  
  
| Area       | Approach                      |
| ---------- | ----------------------------- |
| Components | Client Components by default  |
| Images     | next/image with optimization  |
| Fonts      | next/font with preloading     |
| CSS        | TailwindCSS purging           |
| Data       | SWR caching and deduplication |
| Routes     | Route Segment Config          |
  
### Route Segment Config Options  
  
| Option     | Purpose                          |
| ---------- | -------------------------------- |
| dynamic    | Control static/dynamic rendering |
| revalidate | Set ISR interval                 |
| fetchCache | Configure fetch caching          |
  
---  
  
## 18. Accessibility  
  
### Requirements  
  
- Semantic HTML elements  
- ARIA attributes where needed  
- Keyboard navigation support  
- Color contrast compliance  
- Focus management  
- Screen reader compatibility  
  
### ShadCN Accessibility  
  
- Built-in ARIA support  
- Keyboard interactions included  
- Focus trapping in modals  
- Announce dynamic content  
  
---  
  
## 19. Testing with Playwright  
  
### Overview  
  
| Test Type | Purpose                    | Location            |
| --------- | -------------------------- | ------------------- |
| E2E       | Full user flow validation  | `tests/e2e/`        |
| Component | Isolated component testing | `tests/components/` |
| Unit      | Pure function testing      | `tests/unit/`       |
  
### Project Structure  
  

tests/
├── e2e/
│ ├── auth/
│ │ ├── login.spec.ts
│ │ └── register.spec.ts
│ ├── users/
│ │ ├── user-list.spec.ts
│ │ └── user-create.spec.ts
│ └── navigation.spec.ts
│
├──components/
│ ├── molecules/
│ │ └── user-card.spec.ts
│ └── organisms/
│ └── user-form.spec.ts
│
├── unit/
│ ├── utils/
│ │ └── format-date.spec.ts
│ └── validators/
│ └── user-schema.spec.ts
│
├── fixtures/
│ ├── auth.fixture.ts
│ ├── user.fixture.ts
│ └── index.ts
│
├── mocks/
│ ├── handlers/
│ │ └── user.handler.ts
│ └── data/
│ └── user.mock.ts
│
utils/
├── test-helpers.ts
└── selectors.ts

  
### Naming Conventions  
  
| Element    | Pattern               | Example             |
| ---------- | --------------------- | ------------------- |
| Test files | `[feature].spec.ts`   | `user-list.spec.ts` |
| Fixtures   | `[domain].fixture.ts` | `auth.fixture.ts`   |
| Mocks      | `[domain].mock.ts`    | `user.mock.ts`      |
| Handlers   | `[domain].handler.ts` | `user.handler.ts`   |
  
### Test Organization  
  
| Principle               | Description                              |
| ----------------------- | ---------------------------------------- |
| Domain grouping         | Organize tests by feature/domain         |
| Fixture reuse           | Create shared fixtures for common setups |
| Mock isolation          | Keep mock data separate from test logic  |
| Selector centralization | Store reusable selectors in utils        |
  
### E2E Testing Guidelines  
  
| Guideline               | Description                                        |
| ----------------------- | -------------------------------------------------- |
| User-centric            | Test from user perspective, not implementation     |
| Accessibility selectors | Prefer `getByRole`, `getByLabel`, `getByText`      |
| Avoid brittle selectors | Never use CSS classes or test IDs unless necessary |
| Page Object Model       | Use fixtures for complex page interactions         |
| Parallel execution      | Design tests to run independently                  |
  
### Component Testing Guidelines  
  
| Guideline      | Description                                         |
| -------------- | --------------------------------------------------- |
| Isolation      | Test components in isolation with mocked props      |
| State coverage | Test all component states (loading, error, success) |
| Interaction    | Verify user interactions trigger expected behavior  |
| Accessibility  | Include accessibility assertions                    |
  
### Unit Testing Guidelines  
  
| Guideline         | Description                                    |
| ----------------- | ---------------------------------------------- |
| Pure functions    | Focus on utility functions and validators      |
| Edge cases        | Cover boundary conditions and error states     |
| Schema validation | Test Zod schemas with valid and invalid inputs |
| No side effects   | Mock external dependencies                     |
  
### Selector Priority  
  
| Priority | Selector Type | Example                                   |
| -------- | ------------- | ----------------------------------------- |
| 1        | Role          | `getByRole('button', { name: 'Submit' })` |
| 2        | Label         | `getByLabel('Email')`                     |
| 3        | Placeholder   | `getByPlaceholder('Search...')`           |
| 4        | Text          | `getByText('Welcome')`                    |
| 5        | Test ID       | `getByTestId('user-card')` (last resort)  |
  
### Test Commands  
  
| Command                | Purpose                  |
| ---------------------- | ------------------------ |
| `pnpm test`            | Run all tests            |
| `pnpm test:e2e`        | Run E2E tests only       |
| `pnpm test:components` | Run component tests only |
| `pnpm test:unit`       | Run unit tests only      |
| `pnpm test:ui`         | Open Playwright UI mode  |
| `pnpm test:report`     | View HTML report         |
  
### CI/CD Integration  
  
| Configuration | Value                 |
| ------------- | --------------------- |
| Retries       | 2 on CI, 0 locally    |
| Workers       | 1 on CI, auto locally |
| Screenshots   | On failure only       |
| Traces        | On first retry        |
| Report        | HTML + JSON           |
  
### Coverage Expectations  
  
| Layer                  | Coverage Target |
| ---------------------- | --------------- |
| Critical user flows    | 100% E2E        |
| Interactive components | 80% component   |
| Utility functions      | 90% unit        |
| Form validations       | 100% unit       |
  
### Documentation Reference  
  
| Resource          | URL                                 |
| ----------------- | ----------------------------------- |
| Playwright Docs   | playwright.dev/docs                 |
| Component Testing | playwright.dev/docs/test-components |
| Best Practices    | playwright.dev/docs/best-practices  |
| Locators Guide    | playwright.dev/docs/locators        |

---
  
## 20. Environment Configuration
  
### File Structure
  

├── .env # Default values
├── .env.local # Local overrides (git ignored)
├── .env.development # Development values
├── .env.production # Production values

### Access Pattern
| Context | Method                         |
| ------- | ------------------------------ |
| Server  | `process.env.VARIABLE`         |
| Client  | `NEXT_PUBLIC_` prefix required |
  
---

## 21. File Reference  
  
| Need              | Location              |
| ----------------- | --------------------- |
| Global styles     | `src/app/globals.css` |
| Root layout       | `src/app/layout.tsx`  |
| Tailwind config   | `tailwind.config.ts`  |
| TypeScript config | `tsconfig.json`       |
| Utility functions | `src/lib/utils.ts`    |
| Constants         | `src/lib/constants/`  |
| Global types      | `src/types/`          |
| API client        | `src/server/api.ts`   |
  
---  
  
## 22. Git Conventions  
  
### Branch Naming  
  
| Type     | Pattern                           |
| -------- | --------------------------------- |
| Feature  | `feature/[domain]-[description]`  |
| Fix      | `fix/[domain]-[description]`      |
| Refactor | `refactor/[domain]-[description]` |
  
### Commit Messages  
  
| Type     | Usage            |
| -------- | ---------------- |
| feat     | New feature      |
| fix      | Bug fix          |
| refactor | Code restructure |
| style    | Formatting only  |
| docs     | Documentation    |
| chore    | Maintenance      |
  
---  
  
## 23. Deployment  
  
### Vercel Configuration  
  
| Setting          | Value        |
| ---------------- | ------------ |
| Framework        | Next.js      |
| Build Command    | `pnpm build` |
| Output Directory | `.next`      |
| Node Version     | 20.x         |
  
### Pre-deployment Checklist  
  
- [ ] Environment variables configured  
- [ ] Build passes locally  
- [ ] TypeScript strict mode passes  
- [ ] No ESLint errors  
- [ ] Metadata configured for SEO  
- [ ] Images optimized  
- [ ] Accessibility audit passed  



## 24. Security  
  
### Best Practices  
  
| Area                  | Implementation                      |
| --------------------- | ----------------------------------- |
| Environment Variables | Never expose secrets to client      |
| API Routes            | Validate all inputs with Zod        |
| Server Actions        | Use authentication middleware       |
| CORS                  | Configure allowed origins           |
| Headers               | Set security headers in next.config |
  
### Input Validation  
  
- Validate all user inputs server-side  
- Use Zod schemas for type-safe validation  
- Sanitize data before database operations  
- Implement rate limiting on API routes  
  
---  
  
## 25. Caching Strategies  
  
### SWR Cache Configuration  
  
| Option                | Purpose                     |
| --------------------- | --------------------------- |
| dedupingInterval      | Prevent duplicate requests  |
| revalidateOnFocus     | Refresh on window focus     |
| revalidateOnReconnect | Refresh on network recovery |
| refreshInterval       | Polling interval            |
| errorRetryCount       | Max retry attempts          |
  
### Next.js Caching  
  
| Type      | Method                             |
| --------- | ---------------------------------- |
| Static    | Default for Server Components      |
| Dynamic   | `force-dynamic` export             |
| ISR       | `revalidate` export                |
| On-demand | `revalidatePath` / `revalidateTag` |
  
---  
  
## 26. API Integration  
  
### Axios Configuration  
  
| Feature        | Implementation            |
| -------------- | ------------------------- |
| Base URL       | Environment variable      |
| Interceptors   | Request/response handlers |
| Error Handling | Typed error responses     |
| Timeout        | Configurable per request  |
| Retry          | Automatic retry logic     |
  
### Request Structure  
  
| Layer              | Responsibility                    |
| ------------------ | --------------------------------- |
| `server/api.ts`    | Axios instance configuration      |
| `server/services/` | Domain-specific API calls         |
| `server/actions/`  | Server Actions consuming services |
  
---  
  
## 27. Logging & Monitoring  
  
### Development  
  
| Tool           | Purpose              |
| -------------- | -------------------- |
| Console        | Debug logging        |
| React DevTools | Component inspection |
| Network Tab    | API monitoring       |
  
### Production  
  
| Consideration  | Implementation              |
| -------------- | --------------------------- |
| Error Tracking | Structured error boundaries |
| Performance    | Web Vitals monitoring       |
| Analytics      | Event tracking              |
  
---  
  
## 28. Code Quality  
  
### ESLint Rules  
  
- Next.js recommended config  
- TypeScript strict rules  
- React hooks rules  
- Import ordering  
  
### Prettier Configuration  
  
| Option         | Value |
| -------------- | ----- |
| Semi           | true  |
| Single Quote   | true  |
| Tab Width      | 2     |
| Trailing Comma | es6   |
  
---  
  
## 29. Migration Guide  
  
### Adding New Domain  
  
1. Create folder in `src/presentation/pages/[domain]/`  
2. Add components in `src/presentation/components/molecules/[domain]/`  
3. Add organisms in `src/presentation/components/organisms/[domain]/`  
4. Create types in `src/types/[domain].type.ts`  
5. Add services in `src/server/services/[domain]/`  
6. Create actions in `src/server/actions/[domain]/`  
7. Wire up routes in `src/app/`  
  
### Converting Class to Server Component  
  
1. Remove `"use client"` directive  
2. Convert state to server-fetched data  
3. Move interactivity to child Client Components  
4. Use async/await for data fetching  
  
---  
  
## 30. Troubleshooting  
  
### Common Issues  
  
| Issue              | Solution                                 |
| ------------------ | ---------------------------------------- |
| Hydration mismatch | Ensure server/client render same content |
| Module not found   | Check import paths and aliases           |
| Type errors        | Run `tsc --noEmit` for full check        |
| SWR not updating   | Verify cache keys match                  |
| Styles not applied | Check Tailwind content config            |
  
### Debug Commands  
  
| Command           | Purpose               |
| ----------------- | --------------------- |
| `pnpm dev`        | Development server    |
| `pnpm build`      | Production build      |
| `pnpm lint`       | ESLint check          |
| `pnpm type-check` | TypeScript validation |
  
---  
  
## 31. Quick Reference  
  
### Import Aliases  
  
| Alias          | Path              |
| -------------- | ----------------- |
| `@/`           | `src/`            |
| `@/components` | `src/presentation/components/` |
| `@/lib`        | `src/lib/`        |
| `@/types`      | `src/types/`      |
| `@/server`     | `src/server/`     |
| `@/stores`     | `src/stores/`     |
  
### Common Utilities  
  
| Utility        | Location       | Purpose                |
| -------------- | -------------- | ---------------------- |
| `cn()`         | `@/lib/utils`  | Merge Tailwind classes |
| `formatDate()` | `@/lib/utils`  | Date formatting        |
| `api`          | `@/server/api` | Axios instance         |
  
---  