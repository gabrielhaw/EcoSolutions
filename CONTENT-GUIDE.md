# Content Management Guide for EcoSolutions

## Overview
This guide explains how to add new content-rich pages to the EcoSolutions website without changing the design. All pages use a **JSON-based content system** that separates content from code.

---

## File Structure

```
ecosolutions-site/
├── app/(marketing)/
│   └── non-toxic-pest-control/
│       └── bats-and-agricultural-pest-control/
│           └── page.tsx          # Page component (minimal logic)
├── content/
│   ├── bats-agricultural-pest-control.json    # Page content
│   └── owlproject-education.json              # OWL Project content
├── components/
│   ├── ui/
│   │   └── Accordion.tsx         # For "Read the science" sections
│   └── sections/
│       └── ContactBar.tsx        # WhatsApp/Call/Email CTAs
└── lib/
    └── site.ts                   # Navigation configuration
```

---

## Adding a New Page (Step-by-Step)

### Step 1: Create Content JSON File

Create a new file in `content/` folder (e.g., `content/owls-rodent-control.json`):

```json
{
  "slug": "owls-and-agricultural-rodent-control",
  "title": "Owls and Agricultural Rodent Control",
  "quickSummary": "2-4 sentences summarizing the page content. This appears at the top and in meta descriptions.",
  "keyTakeaways": [
    "First key point with clear benefit",
    "Second key point with measurable outcome",
    "Third key point highlighting uniqueness"
  ],
  "scienceTitle": "The Science Behind Owl-Based Rodent Control",
  "scienceLongText": "<p>Your detailed HTML content goes here...</p><h3>Subheading</h3><p>More paragraphs...</p><ul><li>List items</li></ul>",
  "citations": [
    "Author, A. et al. (2020). 'Study title.' Journal Name 12(3): 45-67.",
    "Author, B. & Author, C. (2019). 'Another study.' Conference Proceedings."
  ]
}
```

**Content Structure:**
- `slug`: URL-friendly identifier
- `title`: Page H1 title
- `quickSummary`: Brief overview (shows at top, used for SEO)
- `keyTakeaways`: 3 bullet points highlighting main benefits
- `scienceTitle`: Title for the accordion section
- `scienceLongText`: Full HTML content (use `<p>`, `<h3>`, `<ul>`, `<li>`, etc.)
- `citations`: Array of academic references

---

### Step 2: Create Page Route

Create the page file at `app/(marketing)/non-toxic-pest-control/[your-page-slug]/page.tsx`:

```tsx
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/sections/SectionHeading";
import ContactBar from "@/components/sections/ContactBar";
import Accordion from "@/components/ui/Accordion";
import CTA from "@/components/sections/CTA";
import content from "@/content/[your-content-file].json";

export const metadata = {
  title: content.title,
  description: content.quickSummary,
};

export default function YourPageName() {
  return (
    <>
      {/* Quick Contact Bar */}
      <ContactBar variant="compact" />

      {/* Main Content */}
      <section className="py-14 pt-28">
        <Container>
          {/* Page Title */}
          <SectionHeading
            title={content.title}
            subtitle={content.quickSummary}
          />

          {/* Key Takeaways */}
          <div className="mt-10 bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">
              Key Takeaways
            </h3>
            <ul className="space-y-2">
              {content.keyTakeaways.map((takeaway, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm text-neutral-700">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Full Content in Accordion */}
          <div className="mt-10">
            <Accordion title={content.scienceTitle}>
              <div
                dangerouslySetInnerHTML={{ __html: content.scienceLongText }}
              />
              {content.citations && content.citations.length > 0 && (
                <div className="mt-8 pt-6 border-t border-neutral-200">
                  <h4 className="text-sm font-semibold text-neutral-900 mb-3">
                    References
                  </h4>
                  <ul className="space-y-2">
                    {content.citations.map((citation, index) => (
                      <li key={index} className="text-xs text-neutral-600">
                        {citation}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Accordion>
          </div>

          {/* Contact Section */}
          <div className="mt-10">
            <ContactBar />
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <CTA />
    </>
  );
}
```

---

### Step 3: Update Navigation (Optional)

If you want the page in the main navigation, edit `lib/site.ts`:

```typescript
pestControlPages: [
  { 
    label: "Bats & Agricultural Pest Control", 
    href: "/non-toxic-pest-control/bats-and-agricultural-pest-control",
    description: "How bats provide natural pest control"
  },
  { 
    label: "Owls & Rodent Control", 
    href: "/non-toxic-pest-control/owls-and-agricultural-rodent-control",
    description: "Your new page description here"
  },
],
```

---

## Components Available

### 1. **ContactBar** - WhatsApp/Call/Email CTAs

```tsx
<ContactBar />              // Full version with buttons
<ContactBar variant="compact" />  // Compact horizontal bar
```

**Update contact details in:**
`components/sections/ContactBar.tsx` (lines 7-9)

---

### 2. **Accordion** - For long content sections

```tsx
<Accordion title="Read the science" defaultOpen={false}>
  <p>Your content here...</p>
</Accordion>
```

**Features:**
- ✅ Keyboard accessible
- ✅ Click to expand/collapse
- ✅ Smooth animations
- ✅ Works with HTML content

---

### 3. **SectionHeading** - Page titles

```tsx
<SectionHeading 
  title="Page Title"
  subtitle="Brief description"
/>
```

---

### 4. **CTA** - Bottom call-to-action

```tsx
<CTA />  // Standard "Request a consultation" section
```

---

## Content Guidelines

### Quick Summary
- Length: 2-4 sentences
- Purpose: Hook + overview
- Used for: SEO meta descriptions, social sharing, page intro

### Key Takeaways
- Quantity: Exactly 3 bullet points
- Format: One sentence each
- Focus: Benefits, outcomes, uniqueness
- Example: "One bat can eat up to 3,000 insects per night"

### Science Long Text
- Format: HTML string
- Allowed tags: `<p>`, `<h3>`, `<h4>`, `<ul>`, `<li>`, `<strong>`, `<em>`
- Structure:
  ```html
  <p>Introduction paragraph...</p>
  
  <h3>Section Heading</h3>
  <p>Content...</p>
  
  <ul>
    <li>Bullet point 1</li>
    <li>Bullet point 2</li>
  </ul>
  ```

### Citations
- Format: Author-date style
- Include: Authors, year, title, journal, volume/pages
- Example: `"Smith, J. et al. (2021). 'Article Title.' Nature 590(7845): 234-240."`

---

## Planned Pages (Content Needed)

Add content JSON files for these pages:

1. **Owls & Agricultural Rodent Control**
   - Route: `/non-toxic-pest-control/owls-and-agricultural-rodent-control`
   - Content: Similar to bats page, focus on owls

2. **Non-toxic Rodent Control**
   - Route: `/non-toxic-pest-control/non-toxic-rodent-control`
   - Content: General rodent control methods

3. **Poison-free Suburbs**
   - Route: `/non-toxic-pest-control/poison-free-suburbs`
   - Content: Residential/suburban focus

4. **Main Landing Page**
   - Route: `/non-toxic-pest-control`
   - Content: Overview with links to all sub-pages

---

## Testing

After creating a new page:

```bash
# Build to check for errors
npm run build

# Run dev server to preview
npm run dev
# Visit: http://localhost:3000/your-page-route
```

---

## Design System (Do Not Change)

**Colors:**
- Primary: Emerald green (`emerald-600`, `emerald-700`)
- Backgrounds: White, `neutral-50`, `neutral-100`
- Text: `neutral-900` (headings), `neutral-700` (body), `neutral-600` (secondary)
- Borders: `neutral-200`, `emerald-200`

**Spacing:**
- Page sections: `py-14` or `py-20`
- Top padding (navbar clearance): `pt-28`
- Container: Max-width responsive with padding

**Typography:**
- H1: `text-3xl` to `text-4xl`, `font-bold`
- H2: `text-2xl`, `font-semibold`
- H3: `text-lg` to `text-xl`, `font-semibold`
- Body: `text-sm` to `text-base`, `leading-relaxed`

---

## Need Help?

1. **Check existing pages:** Look at `/bats-and-agricultural-pest-control/page.tsx`
2. **Copy the template:** Duplicate an existing page and swap the content import
3. **Validate JSON:** Use https://jsonlint.com/ to check JSON syntax
4. **Test locally:** Always run `npm run build` before deploying

---

## Quick Reference: Adding a Page in 3 Commands

```bash
# 1. Create content file
echo '{"slug":"your-page","title":"Your Title",...}' > content/your-page.json

# 2. Create page directory and copy template
mkdir -p "app/(marketing)/non-toxic-pest-control/your-page-slug"
cp "app/(marketing)/non-toxic-pest-control/bats-and-agricultural-pest-control/page.tsx" \
   "app/(marketing)/non-toxic-pest-control/your-page-slug/page.tsx"

# 3. Update the import in the new page.tsx to point to your content file
# Then build and test
npm run build
```

---

**Last Updated:** February 2026  
**Maintained by:** EcoSolutions Development Team
