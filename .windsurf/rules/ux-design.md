---
trigger: model_decision
description: Use this System Prompt whenever creating,generating or reviewing a new user interface from scratch. Rigorously apply Nielsen’s 10 usability heuristics with strong emphasis on mobile‑first, performance and consistency.
---

# Nielsen's 10 Usability Heuristics — UX/UI Best Practices  
  
This document provides comprehensive UX/UI best practices for each of Nielsen's 10 usability heuristics. Apply these principles when designing, reviewing, or generating any user interface to ensure clarity, accessibility, and consistency.  
  
---  
  
## Core Design Priorities  
  
Before applying individual heuristics, maintain these foundational priorities across all interface decisions:  
  
1. **Mobile-first responsive design** — Design for smallest screens first, then enhance for larger viewports  
2. **Accessibility (WCAG 2.1 AA)** — Keyboard navigation, visible focus states, accessible names, sufficient contrast, appropriate ARIA usage  
3. **Performance** — Optimize for Core Web Vitals; minimize layout shifts; provide immediate feedback  
4. **Consistency** — Adhere to design system tokens, component patterns, and platform conventions  
5. **Semantic structure** — Use proper HTML elements, logical heading hierarchy, and landmark regions  
  
---  
  
## Heuristic 1: Visibility of System Status  
  
### Principle  
Keep users continuously informed about what is happening through immediate, appropriate, and contextual feedback.  
  
### Implementation Guidelines  
  
**Feedback Timing Thresholds**  
- **Immediate (< 100ms)**: Visual acknowledgment that an action was received (button press, click highlight)  
- **Short delay (100–300ms)**: Subtle transition animations, micro-interactions  
- **Loading indication (> 300ms)**: Display skeleton screens, shimmer placeholders, or contextual spinners  
- **Progress communication (> 1s)**: Show progress bars with percentage or time remaining estimates  
  
**Interactive Element States**  
- Define and implement all states: default, hover, focus, active, disabled, loading  
- Use smooth transitions (200–300ms) between states to feel responsive without being jarring  
- Ensure loading states on buttons prevent double-submission while remaining visually distinct  
  
**Progress and Status Indicators**  
- Use determinate progress bars when duration is predictable; indeterminate when unknown  
- Display real-time counters for: items selected, characters remaining, cart quantities, upload progress  
- Implement breadcrumbs for navigation depth of 3+ levels  
- Highlight active navigation items clearly  
  
**Loading Patterns**  
- Skeleton screens should mirror the layout of incoming content  
- Contextual spinners belong within the component loading, not blocking the entire interface  
- Lazy load content below the fold while prioritizing above-fold rendering  
- Never leave users staring at a blank screen without indication of activity  
  
### Quality Checklist  
- [ ] Every user action produces visible feedback within 100ms  
- [ ] Loading states appear for any operation exceeding 300ms  
- [ ] Progress indicators provide meaningful information for operations over 1s  
- [ ] Users always know where they are in navigation hierarchies  
- [ ] Loading states do not block unrelated interface interactions  
  
---  
  
## Heuristic 2: Match Between System and Real World  
  
### Principle  
Speak the user's language with familiar words, phrases, icons, and concepts. Follow real-world conventions and present information in a natural, logical order.  
  
### Implementation Guidelines  
  
**Language and Terminology**  
- Use plain, conversational language that non-technical users understand  
- Write clear, concise instructions without jargon or internal terminology  
- Craft empathetic messages that acknowledge user goals and feelings  
- Localize date, time, currency, and number formats appropriately  
  
**Visual Metaphors and Icons**  
- Select universally recognized icons (magnifying glass for search, trash can for delete, heart for favorite)  
- Leverage physical-world analogies when helpful (folders, envelopes, shopping carts)  
- Avoid abstract or ambiguous symbols without supporting labels  
- Test icon comprehension across different cultural contexts  
  
**Information Flow**  
- Organize steps in natural, expected sequences (e.g., shipping address before payment method)  
- Group related information logically by task or category  
- Establish clear visual hierarchy that guides reading order  
- Present choices in order of frequency, importance, or logical progression  
  
### Quality Checklist  
- [ ] All terminology is understandable by target users without explanation  
- [ ] Icons are internationally recognizable or paired with text labels  
- [ ] Task flows mirror how users think about the real-world activity  
- [ ] No metaphors create confusion or misinterpretation  
  
---  
  
## Heuristic 3: User Control and Freedom  
  
### Principle  
Users often perform actions by mistake. Provide clearly marked exits, undo capabilities, and the freedom to reverse decisions without penalty.  
  
### Implementation Guidelines  
  
**Escape Routes**  
- Provide visible Cancel and Back buttons in all flows  
- Ensure the Escape key closes modals, drawers, and overlays  
- Make breadcrumbs clickable for direct navigation to previous levels  
- Include clear exit paths from multi-step processes  
  
**Confirmation and Prevention**  
- Preview the impact of destructive actions before execution  
- Require explicit double-confirmation for irreversible operations (account deletion, permanent data removal)  
- Warn users before costly operations (sending mass communications, publishing to production)  
- Offer batch confirmation for bulk operations with clear item counts  
  
**Data Recovery**  
- Auto-save drafts at regular intervals and on navigation away  
- Implement undo/redo for editing operations  
- Maintain version history for important content  
- Preserve form data when users navigate back  
  
### Quality Checklist  
- [ ] Users can exit any state without losing important data  
- [ ] Accidental actions can be reversed or recovered from  
- [ ] Destructive actions require appropriate confirmation  
- [ ] Navigation away from unsaved work triggers a warning  
  
---  
  
## Heuristic 4: Consistency and Standards  
  
### Principle  
Users should not have to wonder whether different words, situations, or actions mean the same thing. Follow platform conventions and maintain internal consistency.  
  
### Implementation Guidelines  
  
**Design System Foundations**  
- Define and use consistent tokens for colors, typography, spacing, shadows, and radii  
- Build from a component library with documented usage patterns  
- Establish grid systems and breakpoints used throughout  
- Maintain cohesive iconography style and sizing  
  
**Platform Conventions**  
- Follow established patterns from platform guidelines (Human Interface Guidelines, Material Design) where appropriate  
- Place navigation elements where users expect them based on platform norms  
- Use standard interaction patterns (swipe, pull-to-refresh, long-press) consistently  
- Implement appropriate haptic feedback on touch devices  
  
**Naming and Behavior**  
- Use identical terms for identical concepts throughout (never mix "Save" and "Record" for the same action)  
- Establish clear action hierarchy: primary, secondary, tertiary, destructive  
- Apply consistent visual states across all interactive elements  
- Position recurring elements (navigation, search, user menu) in the same location across views  
  
### Quality Checklist  
- [ ] Identical components behave identically everywhere they appear  
- [ ] Navigation elements are positioned where users expect  
- [ ] Colors, typography, and spacing follow design system tokens  
- [ ] Interaction patterns are predictable based on established conventions  
  
---  
  
## Heuristic 5: Error Prevention  
  
### Principle  
Even better than good error messages is a careful design that prevents problems from occurring in the first place.  
  
### Implementation Guidelines  
  
**Real-Time Validation**  
- Validate input inline as users type or on field blur, not only on submission  
- Use appropriate input types (email, tel, number, date) to invoke correct keyboards and enable native validation  
- Implement input masks for formatted data (phone numbers, credit cards, dates)  
- Offer smart suggestions and autocomplete to reduce typing errors  
  
**Constraints and Limits**  
- Display character counters for fields with length limits  
- Disable submit buttons until form is valid (with clear indication of what's missing)  
- Communicate file size, quantity, and format limits before users attempt uploads  
- Validate formats (email, URL, postal code) with helpful pattern guidance  
  
**Preventive Confirmations**  
- Require confirmation before irreversible actions  
- Show previews of changes before applying them  
- Warn when leaving pages with unsaved changes  
- Check for dependencies before allowing deletions  
  
### Quality Checklist  
- [ ] Forms cannot be submitted in an invalid state  
- [ ] Input requirements and limits are communicated upfront  
- [ ] Validation feedback appears at appropriate times (not too early, not too late)  
- [ ] Users are warned before potentially destructive actions  
  
---  
  
## Heuristic 6: Recognition Rather Than Recall  
  
### Principle  
Minimize the user's memory load by making objects, actions, and options visible. Users should not have to remember information from one part of the interface to another.  
  
### Implementation Guidelines  
  
**Visible Information**  
- Use persistent, visible labels rather than relying on placeholders alone  
- Pair icons with text labels when meaning might be ambiguous  
- Display clear visual states that communicate what's selected, active, or available  
- Establish strong visual hierarchy to guide attention  
  
**Contextual Assistance**  
- Provide informative tooltips for complex controls or terminology  
- Use meaningful placeholder text as examples, not as labels  
- Offer inline hints for expected formats

# Nielsen's 10 Usability Heuristics — UX/UI Best Practices  
  
---  
  
## Heuristic 6: Recognition Rather Than Recall  
  
### Principle  
  
Minimize the user's memory load by making objects, actions, and options visible. Users should not have to remember information from one part of the interface to another.  
  
### Implementation Guidelines  
  
**Visible Information**  
  
- Use persistent, visible labels rather than relying on placeholders alone  
- Pair icons with text labels when meaning might be ambiguous  
- Display clear visual states that communicate what's selected, active, or available  
- Establish strong visual hierarchy to guide attention to important elements first  
  
**Contextual Assistance**  
  
- Provide informative tooltips for complex controls, features, or terminology  
- Use meaningful placeholder text as format examples, never as the only label  
- Offer inline hints adjacent to inputs explaining expected formats or requirements  
- Design educational empty states that guide users on how to populate content  
  
**Search and Discovery**  
  
- Implement smart search with autocomplete, suggestions, and typo tolerance  
- Provide visual filters using chips, tags, or faceted navigation for easy refinement  
- Surface recently accessed items, favorites, and frequently used actions  
- Offer category shortcuts and quick-access panels for common destinations  
  
**Defaults and Persistence**  
  
- Pre-populate forms with sensible defaults based on context or user history  
- Remember user preferences, filter states, and view settings across sessions  
- Display recent searches and selections for quick re-access  
- Show previously entered information when users return to incomplete flows  
  
### Quality Checklist  
  
- [ ] Users can complete tasks without memorizing information from previous screens  
- [ ] All options and actions are visible or easily discoverable when needed  
- [ ] Contextual help is available without disrupting the primary workflow  
- [ ] The interface leverages recognition patterns over recall requirements  
  
---  
  
## Heuristic 7: Flexibility and Efficiency of Use  
  
### Principle  
  
Accelerators—unseen by novice users—may speed up interaction for expert users. Allow users to tailor frequent actions and provide multiple paths to accomplish goals.  
  
### Implementation Guidelines  
  
**Keyboard Shortcuts and Accelerators**  
  
- Implement keyboard shortcuts for frequent actions (Ctrl/Cmd+S to save, Ctrl/Cmd+K for command palette)  
- Display shortcut hints in tooltips and menu items to aid discovery  
- Support standard platform shortcuts users already know  
- Provide a discoverable shortcut reference or cheat sheet  
  
**Quick Actions and Batch Operations**  
  
- Offer contextual quick actions on hover, right-click, or swipe gestures  
- Enable bulk selection and batch operations for repetitive tasks  
- Provide inline editing capabilities to avoid full-page navigation for simple changes  
- Support drag-and-drop for reordering, organizing, and file operations  
  
**Customization and Personalization**  
  
- Allow users to save custom filters, views, and search queries  
- Provide rearrangeable dashboards, widgets, or layout preferences  
- Offer theme options (light/dark mode) and display density settings  
- Remember workspace states and restore them on return  
  
**Progressive Enhancement**  
  
- Design the basic flow to work well for first-time users  
- Layer advanced features that become discoverable with experience  
- Provide templates, presets, and starting points to accelerate common tasks  
- Support import/export functionality for power users managing data externally  
  
**Responsive and Adaptive Design**  
  
- Adapt interaction patterns appropriately for touch versus pointer devices  
- Provide gesture alternatives on mobile (swipe to delete, pull to refresh)  
- Maintain feature parity across device sizes where possible, with appropriate adaptations  
- Support offline capabilities for critical workflows when feasible  
  
### Quality Checklist  
  
- [ ] First-time users can complete tasks without confusion  
- [ ] Experienced users have paths to accomplish tasks more efficiently  
- [ ] Keyboard shortcuts exist for frequent actions and are discoverable  
- [ ] User preferences and customizations persist across sessions  
- [ ] The interface adapts appropriately to different devices and input methods  
  
---  
  
## Heuristic 8: Aesthetic and Minimalist Design  
  
### Principle  
  
Interfaces should not contain information that is irrelevant or rarely needed. Every extra unit of information competes with relevant information and diminishes their relative visibility.  
  
### Implementation Guidelines  
  
**Visual Hierarchy and Focus**  
  
- Establish clear typographic hierarchy with distinct heading levels and body text  
- Use size, weight, color, and position to indicate importance and relationships  
- Ensure the primary action on each screen is immediately obvious  
- Guide the eye through intentional visual flow from most to least important  
  
**Whitespace and Breathing Room**  
  
- Use generous spacing to separate distinct content groups and reduce cognitive load  
- Avoid cramming too many elements into a single view  
- Let important elements breathe with adequate padding and margins  
- Use whitespace strategically to draw attention to key actions  
  
**Restrained Visual Design**  
  
- Limit the color palette to a cohesive set with clear semantic meanings  
- Use accent colors sparingly to highlight important elements and actions  
- Minimize decorative elements that don't serve functional purposes  
- Prefer subtle shadows, borders, and backgrounds over heavy visual treatments  
  
**Progressive Disclosure**  
  
- Show only essential information by default; reveal details on demand  
- Use expandable sections, accordions, and "show more" patterns for secondary content  
- Hide advanced options behind clearly labeled toggles or separate views  
- Present complex forms in logical steps rather than overwhelming single pages  
  
**Content Prioritization**  
  
- Lead with the most important content and actions above the fold  
- Remove or relocate rarely-used features to reduce noise  
- Audit interfaces regularly to identify and eliminate unnecessary elements  
- Ensure every visible element serves a clear purpose for the user's current task  
  
### Quality Checklist  
  
- [ ] Every element on screen serves a clear, identifiable purpose  
- [ ] The primary action is immediately obvious on each view  
- [ ] Visual hierarchy guides users through content in logical order  
- [ ] The interface feels calm and uncluttered, not overwhelming  
- [ ] Secondary information is accessible but doesn't compete with primary content  
  
---  
  
## Heuristic 9: Help Users Recognize, Diagnose, and Recover from Errors  
  
### Principle  
  
Error messages should be expressed in plain language (no codes), precisely indicate the problem, and constructively suggest a solution.  
  
### Implementation Guidelines  
  
**Effective Error Message Content**  
  
- State clearly what happened in plain, non-technical language  
- Explain why it happened when that information helps the user  
- Provide specific, actionable guidance on how to fix the problem  
- Use an empathetic, helpful tone—never blame the user  
  
**Error Message Structure Template**  
  

[What happened] + [Why, if helpful] + [How to fix it]

Example: "We couldn't send your message because the email address format is invalid. Please use a format like name@example.com."

  
**Visual Presentation**  
  
- Position error messages near the source of the problem, not in distant alerts  
- Use color, icons, and borders together—never rely on color alone for meaning  
- Ensure error states are visually distinct but not alarming or aggressive  
- Maintain sufficient contrast for error text against its background  
  
**Data Preservation and Recovery**  
  
- Never clear form fields when displaying validation errors  
- Preserve user input across page reloads, navigation, and error states  
- Highlight specific fields with problems while keeping valid entries intact  
- Offer suggestions, corrections, or alternatives when possible  
  
**System Error Handling**  
  
- Provide meaningful error identifiers users can reference when seeking support  
- Include relevant context (timestamp, affected item) for support purposes  
- Display current system status when errors relate to service availability  
- Offer alternative paths, retry options, or workarounds when available  
  
**Error Message Patterns to Avoid**  
  
- Technical jargon, error codes, or stack traces shown to end users  
- Vague messages like "An error occurred" or "Invalid input"  
- Blaming language ("You entered an invalid email")  
- Messages displayed far from the source of the problem  
- Relying solely on color to indicate error states  
  
### Quality Checklist  
  
- [ ] Error messages clearly explain what happened, why, and how to fix it  
- [ ] User-entered data is preserved when errors occur  
- [ ] Error indicators appear adjacent to the source of the problem  
- [ ] Recovery from errors doesn't require restarting the entire task  
- [ ] Error presentation doesn't rely on color alone  
  
---  

## Heuristic 10: Help and Documentation  
  
### Principle  
  
Even though it's better if the system can be used without documentation, it may be necessary to provide help and documentation. Such information should be easy to search, focused on the user's task, list concrete steps, and not be too large.  
  
### Implementation Guidelines  
  
**Contextual Help**  
  
- Provide tooltips and info icons adjacent to complex features or terminology  
- Offer inline hints within forms explaining requirements or expected formats  
- Implement interactive onboarding tours for first-time users on complex interfaces  
- Design educational empty states that guide users on how to get started  
- Surface relevant help content based on the user's current context or task  
  
**Searchable Documentation**  
  
- Provide a searchable FAQ or help center with common questions and answers  
- Implement intelligent search with autocomplete, synonyms, and typo tolerance  
- Organize content by task and user goal, not by product feature or internal structure  
- Include a glossary of terms for domain-specific or technical vocabulary  
- Ensure documentation is mobile-friendly and accessible  
  
**Visual and Interactive Tutorials**  
  
- Create step-by-step visual guides with screenshots or illustrations  
- Offer video tutorials for complex workflows, with transcripts for accessibility  
- Provide interactive walkthroughs that guide users through actual interface elements  
- Include practical examples and use cases that relate to real user scenarios  
  
**Progressive Onboarding**  
  
- Introduce features gradually as users encounter them, not all at once  
- Use subtle coach marks or highlights to draw attention to new or undiscovered features  
- Allow users to skip, pause, or revisit onboarding at any time  
- Celebrate milestones and provide encouragement during initial learning  
- Tailor onboarding paths based on user role, experience level, or stated goals  
  
**Self-Service Support**  
  
- Provide clear pathways to contact human support when self-service isn't sufficient  
- Offer chatbots or virtual assistants for common questions with easy escalation  
- Display system status pages for service-related issues  
- Include troubleshooting wizards for common problems  
- Make support contact information easy to find, not buried in menus  
  
**Documentation Maintenance**  
  
- Keep help content current with interface changes and new features  
- Date documentation and indicate version relevance  
- Gather feedback on help content usefulness and iterate accordingly  
- Monitor search queries to identify gaps in documentation coverage  
  
### Quality Checklist  
  
- [ ] Contextual help is available without leaving the current task  
- [ ] Documentation is searchable and organized by user goals  
- [ ] Onboarding introduces features progressively without overwhelming  
- [ ] Help content is current, accurate, and accessible  
- [ ] Users can easily escalate to human support when needed  
  
---  
  
## Contextual Micro-Checklists  
  
Use these targeted checklists when designing specific interface patterns.  
  
### Forms  
  
- [ ] Every input has a visible, persistent label (not placeholder-only)  
- [ ] Input masks and formatting help are provided for structured data  
- [ ] Example formats are shown where helpful  
- [ ] Character counters appear for fields with length limits  
- [ ] Inline validation provides feedback on blur or as users type  
- [ ] User input is preserved when validation errors occur  
- [ ] Submit button is disabled until form is valid, with clear indication of missing requirements  
- [ ] Error messages appear adjacent to the problematic field  
- [ ] Success confirmation is clear and immediate upon submission  
  
### Navigation  
  
- [ ] Current location is clearly indicated in navigation elements  
- [ ] Breadcrumbs are provided for hierarchies of 3+ levels  
- [ ] Search is prominent and easily accessible for content-heavy interfaces  
- [ ] Clear escape routes exist from every state (back, cancel, close)  
- [ ] Navigation remains consistent across all views  
- [ ] Mobile navigation is thumb-friendly and doesn't obscure content  
  
### Search and Filtering  
  
- [ ] Autocomplete suggestions appear as users type  
- [ ] Spelling corrections and "did you mean" suggestions are offered  
- [ ] Filter states persist across sessions and page navigation  
- [ ] Active filters are clearly displayed with easy removal  
- [ ] Empty search results provide helpful guidance and alternatives  
- [ ] Search supports common query patterns users expect  
  
### Multi-Step Flows and Checkout  
  
- [ ] Progress indicator shows current step and remaining steps  
- [ ] Users can navigate back to previous steps without losing data  
- [ ] Save and resume functionality is available for complex flows  
- [ ] Final confirmation screen summarizes all choices before commitment  
- [ ] Undo or edit options are available after completion where appropriate  
- [ ] Timeout warnings appear before session expiration with save options  
  
### Settings and Preferences  
  
- [ ] Impact of changes is previewed before applying  
- [ ] Undo is available for preference changes  
- [ ] Destructive changes require explicit confirmation  
- [ ] Change history is available for important settings  
- [ ] Default/reset options are provided with clear warnings  
- [ ] Settings are organized logically by category or frequency of use  
  
### Data Tables and Lists  
  
- [ ] Column headers clearly describe content  
- [ ] Sorting and filtering controls are intuitive and visible  
- [ ] Pagination or infinite scroll handles large datasets gracefully  
- [ ] Row actions are discoverable but don't clutter the interface  
- [ ] Bulk selection and batch actions are available for efficiency  
- [ ] Empty states guide users on how to populate data  
  
### Modals and Overlays  
  
- [ ] Purpose and context are immediately clear  
- [ ] Close button is visible and Escape key dismisses the modal  
- [ ] Focus is trapped within the modal while open  
- [ ] Background content is visually dimmed but modal remains clearly focused  
- [ ] Modals don't spawn additional modals (avoid modal stacking)  
- [ ] Critical information isn't hidden in modals that can be easily dismissed  
  
---  
  
## Anti-Patterns to Avoid  
  
### Form Design Anti-Patterns  
  
- Using placeholders as the only labels (they disappear on input)  
- Clearing all form fields when a single validation error occurs  
- Validating only on submit, forcing users to hunt for errors  
- Disabling submit buttons without explaining why  
- Using generic error messages like "Invalid input"  
  
### Navigation Anti-Patterns  
  
- Hiding primary navigation behind hamburger menus on desktop  
- Inconsistent positioning of navigation elements across views  
- Dead-end pages with no clear next action or escape route  
- Breadcrumbs that don't reflect the actual user journey  
- Links that look like buttons or buttons that look like links  
  
### Feedback Anti-Patterns  
  
- Silent failures with no error indication  
- Infinite spinners with no timeout or escape  
- Success messages that disappear too quickly to read  
- Error messages displayed far from the source of the problem  
- Relying on color alone to convey status or errors  
  
### Content Anti-Patterns  
  
- Walls of text without visual hierarchy or structure  
- Jargon, technical terms, or internal naming exposed to users  
- Ambiguous icons without text labels  
- Inconsistent terminology (mixing "Save," "Submit," "Record," "Confirm")  
- Important information buried below the fold or in collapsed sections  
  
### Interaction Anti-Patterns  
  
- Destructive actions without confirmation  
- No undo capability for reversible actions  
- Unsaved changes lost without warning on navigation  
- Double-click or double-tap required without indication  
- Hover-only interactions that don't work on touch devices  
  
### Accessibility Anti-Patterns  
  
- Missing focus indicators on interactive elements  
- Non-semantic markup (divs and spans instead of proper elements)  
- Images without alt text or decorative images with redundant alt text  
- Insufficient color contrast for text and interactive elements  
- Keyboard traps that prevent users from navigating away  
  
---  
  
## UX Quality Targets  
  
Establish these operational targets for consistent, high-quality user experiences.  
  
### Feedback Timing  
  
| Scenario                      | Target                             |
| ----------------------------- | ---------------------------------- |
| Action acknowledgment         | Visible indicator < 100ms          |
| Skeleton/placeholder display  | Appears after 300ms of loading     |
| Progress indicator            | Appears for operations > 1s        |
| Form validation response      | Feedback < 300ms after blur/submit |
| Search/filter results (local) | P95 < 500ms with local data        |
  
### Accessibility Requirements  
  
| Requirement                  | Standard                         |
| ---------------------------- | -------------------------------- |
| Color contrast (normal text) | Minimum 4.5:1 ratio (AA)         |
| Color contrast (large text)  | Minimum 3:1 ratio (AA)           |
| Focus visibility             | Always visible, high contrast    |
| Interactive elements         | All have accessible names        |
| Keyboard navigation          | Full functionality without mouse |
| Screen reader compatibility  | Proper ARIA and semantic markup  |
  
### Performance Targets  
  
| Metric                         | Target             |
| ------------------------------ | ------------------ |
| Largest Contentful Paint (LCP) | < 2.5 seconds      |
| First Input Delay (FID)        | < 100 milliseconds |
| Cumulative Layout Shift (CLS)  | < 0.1              |
| Time to Interactive (TTI)      | < 3.               |