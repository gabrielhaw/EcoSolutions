# Page structure and editorial guidance

Replaces the earlier 12-section homepage proposal and the compulsory nine-block page template.
Structures here are **considered recommendations to test**, not conclusions proven by data:

- Main-site GA4 holds only two days of activity; advice-page engagement often reflects one or two users.
- The shop's Search Console export covers about 16 months; the ~75% mobile share applies to the shop's Google search clicks only.
- Average engagement time is not how long every visitor stays.
- Six `generate_lead` events from four users are not six confirmed enquiries, nor proof they all came from the callback form.
- Low traffic alone is not a reason to delete content.

Priority routes: humane bat exclusion · non-toxic rodent control · owl boxes (buy, install, service) · bat houses · farms and orchards · help for existing box owners.

---

## 1. Homepage (implemented)

About 470 visible words (guideline 500–700; no filler added). Mobile reading order matches the list.

| # | Section | Purpose | Words (approx.) | Notes |
|---|---|---|---|---|
| 1 | Hero | What we do, where, next step | 37 + heading | Heading kept; text names the services and coverage so it works without the video. Primary **Contact our team** → `/contact-us`; secondary **Shop owl & bat boxes** → `/shop`. Video fallbacks and chat clearance unchanged. |
| 2 | Partner banner | Credibility, compact | 4 | Moving banner kept (requested), logos only and slightly larger, all ten organisations ("Worked with & recognised by"; relationships confirmed by Gabriel, 16 Oct 2026). Stands still for reduced motion. |
| 3 | How can we help? | Route to the right service | 110 | Four cards: Bats in your roof · Rats or mice · Owl boxes · Bat houses (13–19 words each). Two small routes: Farms and orchards (two links) · Already have an owl box? (servicing, empty box). Replaces "Most requested" and "What's the problem?". |
| 4 | Our approach | Why no poison; how any job works | 100 | Poison argument in two sentences; three steps true for every service (assess; recommend and do the work; explain what comes next). Link to `/non-toxic-pest-control`. |
| 5 | Results and experiences | Evidence in context | 110 | Live occupied-box map count with its definition and start year; Irene labelled as a case study; four customer testimonials in full (Kiran Reddy, Ian Hall, Beryl Scott-Payet, Jaxon Rice), each with the job. No carousel controls. |
| 6 | From the field | Recent activity, nonprofit | 85 | Two newest items (date · source · one sentence), All news, compact Owlproject.org block. No scrolling rail. |
| 7 | Contact | For people unsure what they need | 45 | What to describe, what happens next, Contact our team, WhatsApp and call (central numbers). |

A separate product rail is **not** recommended: the hero, header menu, help cards and footer already lead to the shop. Revisit only if shop analytics show home-page visitors failing to find products.

### Where displaced homepage content went

| Content | Status |
|---|---|
| Six "What's the problem?" cards | Folded into section 3. Farm cards → farms route; "owls in my garden" → Owl boxes card (Owl Box Project still linked from the owl boxes page and menu); "box still empty" → existing-owner route. |
| "Most requested" cards | Folded into section 3 (same four destinations). |
| Statistics band: 160+ boxes | Replaced by the live map count (see "Unverified" below). |
| Statistics band: 9,000+ Irene | Kept in section 5, labelled as a case study. Full context remains on `/non-toxic-pest-control/owls-and-agricultural-rodent-control-1`. |
| Statistics band: GDARD accreditation | Removed from the homepage; remains on `/bats-and-bat-boxes/bat-exclusions`. Needs verification (below). |
| Statistics band: 260,000 children and parents | Removed from the homepage; remains on `/owlproject` and `/about`. |
| Three poison news headlines | Removed from the homepage; the articles remain under `/news`. Candidate home: a "Further reading" list on the rodent control page. |
| "How we do it" steps (6 mm gaps, 2–3 rodents a night, 60,000 insects, annual service) | Replaced by steps that hold for every service. The specific figures belong on their service pages: proofing detail on rodent control, servicing on owl box servicing. The 60,000-insects and 2–3-rodents figures need sources before reuse. |
| Jane Goodall quotation | Full letter and quotation remain on `/testimonials`. Recommend adding it to `/about` or `/owlproject` with its context (handwritten note to Jonathan Haw). |
| Three testimonials | Four of the five customer testimonials shown in full; all, with the Jane Goodall letter, remain on `/testimonials`. |
| Eight-item news rail | Two items shown; full archive on `/news`. |
| Featured products rail | Removed earlier at your request; products remain on `/shop`. |

### Unverified or conflicting claims (please confirm)

1. **Occupied owl boxes.** Site sources disagree: 130 (FAQ), 150 nationally (product pages), 160+ in Gauteng (map pages, Dec 2021–Jan 2022), 150+ in Gauteng (news, Oct 2023). The live Google My Maps data lists **190 boxes with a recorded occupancy since 2013**, i.e. ever occupied, not currently occupied. The homepage now uses that figure with that definition. Still to update after confirmation: `lib/site.ts` owls section intro ("more than 160"), `lib/seo.ts` owls hub and owl boxes descriptions ("160+", "more than 150 nationally"), and the legacy pages that repeat these numbers.
2. **GDARD.** "The only permitted company accredited by GDARD to undertake bat exclusions in Gauteng" appears on one page with no date or reference. Confirm wording and current status.
3. **Partner logos.** Confirmed by Gabriel (16 Oct 2026) as organisations EcoSolutions has worked with, so all ten are on the banner. Dainfern, The Coves, Nestlé, BirdLife, the NSPCA and GDARD have no write-up on the site yet. A short project or case-study line for each (e.g. on About) would back the logos up.
4. **Coverage.** "Working with homes, estates and farms across South Africa" follows the team's recent "across South Africa" wording and the Noordhoek testimonial. Confirm per service (e.g. whether annual servicing or rodent proofing is offered outside Gauteng).
5. **Callback form scope.** The Zoho "Request a Call Back" form asks only for name, phone, email and province (nothing bat-specific), and `/request-a-callback` presents it as general. The brief calls it the bat callback form, so the homepage uses the general contact page. If it is in fact general, the hero could point to it, and completed requests would then be counted as leads.
6. Contact page meta description still says "Book a site visit".

### Missing destinations

- **A single farms and orchards page.** The homepage route links the two existing farm pages instead. Recommended: a short farm hub per the farming template, linking both programmes.
- No dedicated "why we don't use poison" page. The services hub intro serves for now.

---

## 2. Site-wide rules

- One clear purpose, one descriptive H1, logical headings; every page must make sense when reached straight from Google.
- Proof sits beside the claim it supports. Statistics are optional.
- Essential facts stay visible; accordions only for supplementary detail.
- Actions fit the page: purchase, enquiry, servicing, participation or reading. Don't stack call, WhatsApp and enquiry buttons in every introduction.
- Location wording only where accurate; the office address doesn't define every service's coverage.
- Keep URLs and metadata; central contact details (`lib/site.ts`); prices and stock only from Shopify.
- Flag missing facts rather than inventing them. No invented prices, response times or guarantees.
- Don't repeat generic homepage sections across the site. The shared contact band is fine once per page.
- Button wording: **Request a callback** only to a destination that takes callback requests; **Contact our team** for the general contact page; never "Book a site visit" unless the flow confirms an appointment.

## 3. Flexible templates

Word ranges are editorial guidance, not SEO targets. Combine sections when it reads better.

| Page type | Typical length | Order |
|---|---|---|
| Individual service | 450–700 incl. FAQs | Introduction and relevant action · suitability, verified coverage, key facts · included work and process · evidence or credentials · useful FAQs · final action. Verified pricing or how quotes work. Bat exclusion: distinguish exclusion/proofing from an alternative roost; a bat house alone doesn't stop bats returning. Owl boxes: separate buying, installing, servicing and occupancy advice; never guarantee occupation. |
| Services overview | 200–350 | Short intro · service choices immediately · how assessments work · help or enquiry. |
| Owls / Bats hubs | 250–400 | Short intro · grouped destinations · brief guidance · next action. Bats: in a roof / buying or installing a bat house / learning. Owls: buying or installing / servicing / occupancy advice / learning and conservation. |
| Shop | 50–150 editorial | Title and short intro · categories, filters, products · concise shopping help. No large hero or stats before the grid. |
| Product | 250–500 editorial | Images, name, price, options, availability, purchase · suitability · specifications and installation requirements · delivery, installation, maintenance, returns · related products or FAQs. |
| Farming / commercial | 450–750 | Customer and problem · situations and property types · assessment and programme · included work · project evidence · practical requirements and FAQs · enquiry. |
| Advice | ~400–900 as needed | Direct answer first · explanation or checklist · supporting detail · contextual next step. No marketing preamble; no forced sales pitch. |
| About | 350–600 | Who we are · people and verified credentials · approach · selected projects · brief history · contact. |
| Owlproject.org | 450–750 | Purpose and communities · verified impact · activities · stories and partnerships · participation and support (kept separate from commercial purchases). |
| News | Index: short intro + listings. Article: 250–450 for updates, longer when warranted | Title, date, author or source · summary · content · related reading or next action. |
| Contact | 100–250 excl. fields | What to enquire about · what happens next · the right form and alternatives · verified coverage and hours. Keep order form, callback form and general enquiries distinct. |

## 4. Recommendations per page (for individual review)

Measured on the current build (visible words in the main content).

| Page | Now | Recommendation |
|---|---|---|
| Services overview `/non-toxic-pest-control` | ~160 words; intro + contact band | Close to template. Add the service choices as cards straight after the intro (same four as the homepage plus farms) and two sentences on how assessments work. |
| Bat exclusion `/bats-and-bat-boxes/bat-exclusions` | ~2,000 words, 19 headings, 6 different actions (Book a consultant, Book the site visit online, Order online, Request a call back…) | Highest priority. Cut to ~600–700: intro and one action, suitability and coverage, process (dusk survey, sealing, one-way valve, alternative roost, kept distinct), the GDARD credential once it's verified, existing FAQs, final action. Move legal background, conflict and "bats as an asset" material to a linked advice page (keep the URL content). Use one consistent action wording; check "Book the site visit online" against what the shop product actually confirms. |
| Rodent control `/non-toxic-pest-control/non-toxic-rodent-control-1` | ~1,650 words, 6 actions | Same treatment: ~600 words on the service; move the detailed proofing guide (sheds, ceilings, landscape) to an advice page linked from here. Good home for the three poison news links as further reading. |
| Owl boxes `/products-services/owl-boxes` | ~790 words, 6 actions | Restructure around four clear parts: buy · install · service · occupancy advice. Prices from Shopify only. Remove "150 occupied nationally" until confirmed. |
| Bat houses `/products-services/bat-boxes` | ~790 words | Similar: products (from Shopify), installation, suitability; link bats-in-roof for exclusion rather than implying a bat house solves a roof colony. |
| Owl box servicing `/owls-and-owl-boxes/servicing` | ~550 words | Mostly fits. Add what the service includes and how booking works; one action (Book your service). |
| Join the Owl Box Project | ~520 words | Fits the service template; clarify how it differs from buying a box plus annual service. |
| Owls hub / Bats hub | ~220 / ~180 words; intro + contact band | Add the grouped destinations from the hub template; avoid repeating service explanations. |
| Farm: owls / Farm: bats | ~1,300 / ~1,600 words; WhatsApp only as action | Apply the farming template; add a proper enquiry action, the Irene and macadamia projects as evidence (labelled as case studies), practical requirements and FAQs. Consider the single farms page above. |
| Advice: box empty `/owls-and-owl-boxes/empty` | ~350 words | Good length. Lead with the direct answer (substrate, location, orientation, servicing) before anything else. |
| Advice: owl box FAQ | ~1,060 words; one heading is empty | Fix the empty heading. Fine as a longer guide; answer first in each part. Update the "130 occupied" figure after confirmation. |
| Shop `/shop` | Products near the top; ~3 lines of intro | Fits. Add 2–3 lines of shopping help below the grid (delivery vs installation, collection, how service bookings work). |
| Product pages | ~400 words, Details + related | Add suitability and installation requirements before checkout where Shopify descriptions lack them (editorial, never prices). |
| About `/about` | ~330 words | Slightly short. Add verified credentials and the Jane Goodall letter with its context; selected projects (Steyn City, Irene, macadamia research). |
| Owlproject `/owlproject` | ~640 words; "Call Us / WhatsApp Us" actions | Fits length. Make participation and support actions specific to the nonprofit, distinct from commercial enquiries. |
| News index | Long listing with archive | Fine. Show date and source on each item, as the homepage now does. |
| Contact `/contact-us` | ~100 words | Add what happens next and which form to use (order form, callback, general message). Update the meta description wording. |
| Testimonials | Letter + quotes | Fine. Keep as the full source for homepage excerpts. |
