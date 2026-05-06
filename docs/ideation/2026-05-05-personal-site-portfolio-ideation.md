---
date: 2026-05-05
topic: personal-site-portfolio
focus: improve visual design, content structure, and portfolio strategy for Catalina's personal site
mode: repo-grounded
---

# Ideation: Personal Site and Portfolio

## Grounding Context

### Codebase Context

- The project is a static Astro 5 personal site with one primary page: `src/pages/index.astro`.
- The page already has strong raw material: bilingual ES/EN copy, a profile photo, CV link, LinkedIn, Upwork, GitHub, services, selected work, 12 Canva campaigns with 75 portfolio slides, YouTube videos, an auto-updated Instagram section, toolkit, experience, and contact.
- The styling lives in `src/styles/global.css`. Current visual language is dark blue, compact, card-heavy, and technical/editorial. It has useful functionality, but the repeated grids make the page feel like a content archive instead of a professional story.
- `job-search/README.md` clarifies the strategic goal: remote creative/content roles from Colombia, especially Social Media Manager, Community Manager, Content Specialist, Content Operator, Content Manager, Short-form Video Editor, Canva Designer, Visual Content Designer, and Creative Content Coordinator.
- The site builds successfully with `npm run build`.

### External Context

- Content strategy portfolio guidance emphasizes clear positioning, a few case studies, and real artifacts. Technical Writer HQ says a strong content strategist portfolio is not a link dump; it should show positioning, process, strategic artifacts, and outcomes or proxy metrics. Source: [Technical Writer HQ, March 10, 2026](https://technicalwriterhq.com/career/content-strategist/content-strategist-portfolio-examples/).
- UX Design Institute recommends a portfolio website as the main home base, with a short homepage intro, About page, case studies, and contact. Source: [UX Design Institute](https://www.uxdesigninstitute.com/blog/hiring-managers-ux-portfolio/).
- Boundev's 2026 portfolio guidance focuses on the first 30 seconds: specialization clarity, visual quality, navigation, case-study titles with problem framing, and a problem-process-outcome structure. Source: [Boundev, March 6, 2026](https://www.boundev.ai/blog/ux-portfolio-tips-that-recruiters-notice).
- Content strategist examples such as [Driven Copy](https://www.drivencopy.com/work) and [Edit Ever After](https://editeverafter.com/portfolio/) show the same pattern: curated work, clear categories, process context, before/after examples, tools, and impact signals.

## Ranked Ideas

### 1. Make the Site the Public Professional Front Door

**Description:** Keep the portfolio inside the personal site, but turn it into a curated professional hub instead of a full archive. The homepage should answer four things fast: who you are, what you help with, what proof exists, and how someone can contact or hire you. Add a private/requestable portfolio layer only for sensitive details, full decks, rates, or client-specific context.

**Warrant:** `direct:` The current site already includes the whole professional surface, but the portfolio area has 12 campaigns and 75 slides competing on one page. `external:` Portfolio guidance consistently recommends a website as the main home base with a few strong case studies instead of a large dump of samples.

**Rationale:** This gives recruiters and clients enough proof without making them ask for access first. It also keeps your public reputation centralized: one link can serve job applications, Upwork, LinkedIn, and direct referrals.

**Downsides:** Requires deciding what becomes public, what becomes private, and what is only shown on request.

**Confidence:** 94%

**Complexity:** Medium

**Status:** Unexplored

### 2. Replace the Gallery Feeling With 3-5 Flagship Case Studies

**Description:** Promote a small set of flagship case studies and move the full Canva grid into a secondary "More samples" area or separate `/portfolio` page. Good first case studies: Scottsdale local events/news, YouTube creator support, Box Club content operations, bilingual Medellin/Scottsdale carousel packaging, and academic research as proof of research discipline.

**Warrant:** `direct:` The site has `projectHighlights`, `canvaCampaigns`, YouTube examples, Instagram feed, and an academic research link, but most work appears as thumbnails rather than stories. `external:` Content and UX portfolio sources recommend 3-5 strong case studies with process and outcomes over many surface-level samples.

**Rationale:** A recruiter can understand the quality of your thinking from one good case study faster than from scrolling through dozens of slides. This also lets the visuals breathe.

**Downsides:** It takes writing work. Each case study needs context, role, process, artifacts, and results or proxy impact.

**Confidence:** 92%

**Complexity:** Medium

**Status:** Unexplored

### 3. Add a Scan-First Homepage Path

**Description:** Reorder the homepage into a sharper scan path: hero, selected services, featured case studies, process, toolkit, experience, contact. Add a small sticky or top navigation with anchors: Work, Services, Process, Experience, Contact. Keep language switching and theme toggle, but make the first viewport calmer.

**Warrant:** `direct:` The current page has many good sections, but no navigation and no strong hierarchy after the hero. `external:` Hiring and portfolio guidance emphasizes the first scan: specialization, navigation, case-study titles, and clear contact.

**Rationale:** The page should work for someone with 30 seconds and also for someone willing to go deeper. Right now it asks everyone to scroll through the same long stream.

**Downsides:** Needs careful responsive layout so navigation and toggles do not crowd the hero on mobile.

**Confidence:** 88%

**Complexity:** Medium

**Status:** Unexplored

### 4. Use a Repeatable Case-Study Template

**Description:** Create a template for each featured work item: Problem, Context, My Role, Process, Artifacts, Output, Result, What I Would Improve. For work without hard metrics, use proxy impact: reduced ambiguity, faster publishing, reusable structure, clearer bilingual packaging, stakeholder approval, evergreen reuse, or before/after content clarity.

**Warrant:** `external:` Boundev recommends problem-process-outcome; Technical Writer HQ highlights artifacts like audits, briefs, editorial calendars, frameworks, and proxy metrics when hard data is unavailable. `direct:` The current copy says what the work is, but rarely shows how decisions were made.

**Rationale:** Your edge is not just "I made content." It is research, structure, bilingual judgment, and shipping. The case-study template makes that visible.

**Downsides:** Some client work may need anonymization or blurred screenshots.

**Confidence:** 90%

**Complexity:** Medium

**Status:** Unexplored

### 5. Shift the Visual System From Tech Archive to Warm Editorial Portfolio

**Description:** Move away from the current dark-blue, card-dense look toward a warmer editorial system: lighter default theme, strong typography, fewer boxes, larger work previews, calmer spacing, and a more intentional use of your profile photo and real project visuals. Keep the bilingual/tech-capable signal, but make the first impression feel like content strategy and creative operations, not a developer dashboard.

**Warrant:** `direct:` `global.css` uses a dark blue theme, radial gradients, many bordered cards, and dense grids. `reasoned:` Your target roles are content, social, Canva/design, community, video, and creative operations; the visual language should feel organized, human, editorial, and client-ready.

**Rationale:** A portfolio for content and creative operations should show taste, clarity, and judgment before anyone reads the full text.

**Downsides:** Visual redesign can balloon if it is treated as a full rebrand. It should stay scoped to layout, type, palette, and hierarchy first.

**Confidence:** 86%

**Complexity:** Medium

**Status:** Unexplored

### 6. Split the Calls to Action by Audience

**Description:** Give different visitors obvious next steps: recruiters can download CV or open LinkedIn; clients can email for content support; Upwork visitors can see services and selected samples; collaborators can jump to YouTube/content operations. Use two or three CTAs, not one generic contact push everywhere.

**Warrant:** `direct:` The site already links CV, LinkedIn, Upwork, GitHub, and email. `direct:` `job-search/README.md` lists specific role targets and roles to avoid, which means the site can guide the right audience more deliberately.

**Rationale:** One personal site can serve several use cases if the pathways are explicit. This avoids making the homepage choose only jobs or only freelance.

**Downsides:** Too many audience labels could feel busy. The page needs restraint.

**Confidence:** 84%

**Complexity:** Low

**Status:** Unexplored

### 7. Create a Private Portfolio Kit for Requests

**Description:** Add a private/off-site portfolio kit as a companion, not a replacement. It could be a PDF, Canva deck, or unlisted page with deeper examples, full slide sequences, rates, availability, testimonials, and project notes. Public site says "Selected work available on request" only where it adds value.

**Warrant:** `reasoned:` Public portfolios improve discovery and trust, but some work benefits from controlled sharing: full decks, process docs, client-sensitive examples, pricing, and tailored role-specific samples. This directly answers the public-vs-request question without choosing an extreme.

**Rationale:** The public site gets people interested; the private kit helps close the conversation once they are already qualified.

**Downsides:** Requires keeping two artifacts aligned so the private kit does not become stale.

**Confidence:** 82%

**Complexity:** Low to Medium

**Status:** Unexplored

## Rejection Summary

| # | Idea | Reason Rejected |
|---|------|-----------------|
| 1 | Move the entire portfolio to a separate website | Splits authority and creates maintenance work without solving the public trust problem. |
| 2 | Make the portfolio fully private/request-only | Adds friction for recruiters and clients who need quick proof before contacting. |
| 3 | Keep every Canva slide visible on the homepage | Directly preserves the current clutter problem. |
| 4 | Add a flashy animated landing page | Interesting visually, but below the strongest need: curation, proof, and hierarchy. |
| 5 | Build a blog first | Useful later, but the site needs portfolio clarity before publishing infrastructure. |
| 6 | Lead with tools and AI workflows | Tools support the offer; they should not replace the professional promise. |
| 7 | Add a CMS now | Too expensive relative to the current need. Static Astro data is enough for the next iteration. |

## Recommended Next Move

Start with idea 1 and idea 2 together: keep the portfolio inside the personal site, then redesign the homepage around a small number of proof-led case studies. The private portfolio kit can come after the public site has a clear structure.

For the next `ce-frontend-design` pass:

- **Visual thesis:** Warm editorial portfolio with calm confidence, real project visuals, and a sharper content hierarchy.
- **Content plan:** Hero, audience-specific CTAs, services, featured case studies, process, toolkit, experience, contact, then optional deeper portfolio archive.
- **Interaction plan:** Subtle section entrance, anchored navigation, case-study preview hover/focus states, and lightweight carousel behavior only inside detail areas.
