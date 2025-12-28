---
trigger: model_decision
description: Undestand about project business plan
---

# Project Specification: Pandami  
  
## 1. Overview  
  
### Product Identity  
  
| Attribute    | Value                                                                         |
| ------------ | ----------------------------------------------------------------------------- |
| Product Name | Pandami                                                                       |
| Category     | BeautyTech SaaS + Consumer Health                                             |
| Tagline      | Democratizing beauty intelligence through AI and personalized supplementation |
  
### Elevator Pitch  
  
Pandami is a beautytech startup operating a dual-sided ecosystem: a B2B SuperApp for salons and barbershops featuring AI-powered visagism, standardized process management (CRM), and affiliate monetization; paired with a B2C platform delivering personalized nutraceutical supplementation with continuous tracking and professional recommendations.  
  
### Core Value Proposition  
  
**For B2B (Beauty Professionals):**  
- Increase digital visibility and client acquisition  
- Access democratized visagism technology (previously cost-prohibitive)  
- Generate additional revenue through nutraceutical affiliate sales  
- Standardize service processes across team members  
  
**For B2C (End Consumers):**  
- Improve beauty and health through intelligent supplementation  
- Preview hair and beard changes before commitment  
- Connect with qualified beauty professionals  
- Track supplementation journey with personalized guidance  
  
### Business Model Summary  
  
Hybrid revenue model combining:  
- Recurring subscriptions (B2B SaaS)  
- Direct product sales (B2C nutraceuticals)  
- Transaction-based credits (B2B feature usage)  
- Affiliate commissions (B2B partner sales)  
  
---  
  
## 2. Problem Space  
  
### Primary Problems (Ranked by Priority)  
  
| Priority | Problem                                                           | Affected Segment | Severity |
| -------- | ----------------------------------------------------------------- | ---------------- | -------- |
| P0       | Lack of digital presence for beauty professionals                 | B2B              | Critical |
| P0       | Absence of continuous product and follow-up for beauty nutrition  | B2C              | Critical |
| P1       | Low lifetime value (LTV) of male clients in beauty establishments | B2B              | High     |
| P1       | Lack of process standardization among professionals in same salon | B2B              | High     |
| P2       | High cost of visagism training                                    | B2B              | Medium   |
| P2       | Absence of technological tools to assist service delivery         | B2B              | Medium   |
  
### Current Alternatives and Limitations  
  
| Competitor    | Solution Approach                                   | Key Limitations                                |
| ------------- | --------------------------------------------------- | ---------------------------------------------- |
| Nutrafol      | Personalized nutraceutical experience for women     | Female-focused only; no professional ecosystem |
| Luminus       | Seasonal beauty product lineup with strong branding | Product-only; no technology platform           |
| HUM Nutrition | Gamified quiz for personalized supplementation      | No B2B component; no visagism                  |
| MAPS          | Local visibility profiles for establishments        | Directory only; no integrated tools            |
| BLZ NA WEB    | Affiliate program for beauty products               | Low commissions; no ecosystem integration      |
  
### Market Gap Analysis  
  
**Unaddressed Opportunities:**  
1. No integrated B2B-B2C beautytech ecosystem in Brazilian market  
2. AI visagism technology not democratized for independent professionals  
3. Male beauty segment underserved in retention strategies  
4. No platform connecting nutraceutical supplementation with professional beauty services  
5. Process standardization tools absent from beauty industry software  
  
---  
  
## 3. Solution Space  
  
### Product Offerings  
  
#### 3.1 SuperApp (B2B Platform)  
  
| Module                | Description                                                                                        | Problems Addressed                 |
| --------------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------- |
| Professional Showcase | Online platform connecting qualified clients to beauty professionals with search engine visibility | P0: Digital presence               |
| AI Visagism Engine    | Image manipulation tool for hair/beard style previews                                              | P2: Training costs, P2: Tech tools |
| CRM Module            | Standardized process and procedure management for establishments                                   | P1: Process standardization        |
| Affiliate System      | Nutraceutical sales commission program for professionals                                           | P1: Low LTV                        |
  
#### 3.2 Consumer Platform (B2C)  
  
| Feature                        | Description                                                    | Problems Addressed              |
| ------------------------------ | -------------------------------------------------------------- | ------------------------------- |
| Supplementation Tracking       | Continuous monitoring of supplement usage with recommendations | P0: Continuous follow-up        |
| Professional Discovery         | Salon and barbershop recommendations based on user profile     | P0: Digital presence (indirect) |
| Visual Preview                 | Pre-visualization of hair/beard changes before decision        | Consumer confidence             |
| Personalized Product Selection | Curated nutraceutical recommendations                          | P0: Continuous follow-up        |
  
### Feature-to-Problem Mapping  
  

P0: Digital Presence
├── Professional Showcase → SEO visibility
├── Partner Directory → Search engine indexing
└── Professional Discovery → Client-professional matching

P0: Continuous Follow-up
├── Supplementation Tracking → Usage monitoring
├── Personalized Recommendations → AI-driven suggestions
└── Progress Visualization → Results tracking

P1: Low LTV
├── Affiliate System → Additional revenue stream
├── Male-focused Features → Retention optimization
└── Upsell Integration → Cross-selling opportunities

P1: Process Standardization
├── CRM Module → Procedure templates
├── Team Management → Role-based workflows
└── Service Protocols → Quality consistency

P2: Training Costs
├── AI Visagism → Automated analysis
├── Guided Recommendations → Decision support
└── Knowledge Base → Self-service learning

  
---  
  
## 4. User Personas  
  
### B2B Segment  
  
#### Persona 1: Solo Hairdresser  
  
| Attribute   | Value                                                        |
| ----------- | ------------------------------------------------------------ |
| Profile     | Autonomous beauty professional                               |
| Location    | Greater Florianópolis region (initial market)                |
| Pain Points | Limited visibility, no marketing budget, high training costs |
| Goals       | Attract new clients, differentiate services, increase income |
  
**Jobs-to-be-Done:**  
1. Appear in search results when potential clients look for services  
2. Offer visagism consultations without expensive certification  
3. Generate passive income through product recommendations  
4. Build professional credibility online  
  
#### Persona 2: Beauty Salon (SMB)  
  
| Attribute   | Value                                                                       |
| ----------- | --------------------------------------------------------------------------- |
| Profile     | Small-to-medium business with multiple professionals                        |
| Structure   | Legal entity (PJ) with team coordination needs                              |
| Pain Points | Inconsistent service quality, team training costs, low male retention       |
| Goals       | Standardize operations, increase team productivity, grow revenue per client |
  
**Jobs-to-be-Done:**  
1. Ensure consistent service quality across all team members  
2. Reduce onboarding time for new professionals  
3. Track individual and team performance metrics  
4. Implement upselling strategies systematically  
  
#### Persona 3: Barbershop  
  
| Attribute   | Value                                                        |
| ----------- | ------------------------------------------------------------ |
| Profile     | Male-focused grooming establishment                          |
| Opportunity | Underserved segment with low LTV                             |
| Pain Points | Limited service differentiation, low product attachment rate |
| Goals       | Increase client lifetime value, expand service offerings     |
  
**Jobs-to-be-Done:**  
1. Visualize beard styling options for clients  
2. Recommend complementary products (supplements, grooming)  
3. Build recurring client relationships  
4. Differentiate from commodity haircut services  
  
### B2C Segment  
  
#### Primary End-User Persona  
  
| Attribute      | Value                                                               |
| -------------- | ------------------------------------------------------------------- |
| Demographics   | Brazilian, Class B+, 30-60 years old                                |
| Gender         | Male and female                                                     |
| Psychographics | Low self-esteem due to beauty concerns, seeks scientific validation |
| Behavior       | Research-oriented, values proven treatments and procedures          |
  
**User Journey:**  
  

Awareness
├── Discovers beauty/health concern
├── Researches scientific solutions
└── Finds Pandami through content/ads

Consideration
├── Takes personalized assessment
├── Reviews recommended supplements
└── Previews visual changes (hair/beard)

Conversion
├── Purchases initial supplement package
├── Downloads tracking app
└── Optionally books salon appointment

Retention
├── Tracks daily supplementation
├── Receives progress updates
├── Gets personalized recommendations
└── Engages with professional network

Advocacy
├── Shares results
├── Refers friends
└── Provides testimonials

  
**Pain Points:**  
- Uncertainty about supplement effectiveness  
- Fear of drastic appearance changes  
- Difficulty finding qualified professionals  
- Lack of personalized guidance  
  