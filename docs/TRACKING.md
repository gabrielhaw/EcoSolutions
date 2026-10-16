# Measuring enquiries, contact clicks and shop visits

How the site reports to GA4, how to count each outcome once, and what must be set in GA4 and Zoho before launch.

## Current state (audit, 16 Oct 2026)

- **New Next.js site:** no tracking was loaded before this change. The Content-Security-Policy would also have blocked Google's scripts.
- **Old Plone site and Zoho Forms:** both report to the GA4 property "EcoSolutions Urban Ecology - GA4". GA4 sees the Zoho thank-you page (`/info4949/form/RequestaCallBack/thankyou/formperma/…`) as a page view, and `generate_lead` fired 6 times for 4 people. That means reloads and repeat visits to the thank-you page count as extra leads.
- **No key events are configured** on the website property, so GA4 and Google Ads report zero conversions.
- **The store is a separate GA4 property** ("EcoSolutions Shop"). Visits from the site arrive there as Direct.

## What this site sends

All events are sent from `components/site/Analytics.tsx`, `components/site/ZohoForm.tsx`, `components/site/LeadConfirmed.tsx` and `components/shop/Cart.tsx`. Nothing loads unless `NEXT_PUBLIC_GA_ID` is set.

| Event | Fires when | Counts as | Parameters |
|---|---|---|---|
| `page_view` | Every page, including client-side navigation (GA4 enhanced measurement, "page changes based on browser history events") | Traffic | GA defaults |
| `enquiry_click` | A button that leads to a form or the contact page is clicked ("Request a callback", "Book a site visit", "Book the site visit online") | Intent only, **not a lead** | `cta`, `cta_location`, `link_url` |
| `form_view` | An embedded Zoho form is at least 40% on screen, once per page view | Intent only, **not a lead** | `form_id`, `cta_location` |
| `generate_lead` | Zoho redirects to `/enquiry-received?form=<id>` after a completed submission. Sent once per form per browser tab session | **Lead (key event)** | `form_id` |
| `phone_click` | Any `tel:` link is tapped | Contact intent (optional key event) | `cta`, `cta_location` |
| `email_click` | Any `mailto:` link is clicked | Contact intent | `cta`, `cta_location` |
| `whatsapp_click` | Any `wa.me` link is clicked | Contact intent (optional key event) | `cta`, `cta_location` |
| `shop_visit` | Any link to `shop.ecosolutions.co.za` or `ecosolutions.myshopify.com` is clicked, including checkout | Hand-off to the store | `cta`, `cta_location`, `link_url` (no query string) |
| `begin_checkout` | "Secure checkout" in the cart is clicked | Ecommerce | `currency`, `value`, `items` (handle, title, variant, price, quantity) |

### Keeping each outcome separate and counted once

- **A click is not a lead.** `enquiry_click` and `form_view` measure interest. Only `generate_lead` is a completed enquiry, and only the thank-you redirect can send it, because the site can't see inside Zoho's frame.
- **One listener, one event per click.** Contact and shop clicks are classified by one document-level listener, so a link rendered by several components is never counted twice. Each click matches exactly one rule, checked in this order: phone, email, WhatsApp, shop, enquiry button.
- **Reloads don't add leads.** `generate_lead` is remembered in `sessionStorage` per form, so reloading or going back to the thank-you page doesn't count the same enquiry again. Count leads by user in reports as well: GA4 "Key events" with "Total users", not the event count.
- **GA4's own outbound `click` event** (enhanced measurement) also fires on WhatsApp and Shopify links. Don't mark `click` as a key event. Either report on `whatsapp_click` and `shop_visit` only, or switch off "Outbound clicks" in enhanced measurement.
- **Turn off Zoho's own GA4 integration** for any form embedded on the new site, or the thank-you page view and our `generate_lead` count the same submission twice. Keep exactly one source of leads: the `/enquiry-received` page.

### No customer details reach Analytics

- Form fields stay inside Zoho's iframe. The site never reads them.
- Events carry only fixed labels from the code: button ids, form ids, page sections and product handles.
- `link_url` is sent without its query string or fragment, which can carry personal data.
- The Zoho redirect must **not** "append form data to the URL". If it did, names, phone numbers and emails would land in the page URL that GA4 records automatically.
- Phone and email events say that a contact link was used. They don't send the number or address.

## Setup checklist before launch

### In GA4 ("EcoSolutions Urban Ecology - GA4")
1. Copy the web stream's measurement ID (`G-…`) from Admin > Data streams and set `NEXT_PUBLIC_GA_ID` in the hosting environment, for the production domain only. Leave it unset on previews so test clicks don't reach the real property, or use a separate test property.
2. Under Admin > Events, mark `generate_lead` as a key event. Optionally also mark `phone_click` and `whatsapp_click`, labelled as "contact intent" rather than leads.
3. Under Admin > Custom definitions, register event-scoped dimensions `cta`, `cta_location`, `form_id` and `link_url` so they appear in reports.
4. Set up cross-domain measurement under Admin > Data streams > Configure tag settings > Configure your domains. Add `ecosolutions.co.za` and `shop.ecosolutions.co.za`, then add the same measurement ID to the Shopify store (Shopify's Google & YouTube app) so one visitor is one user across both. The site already sets `linker.domains` for the store.
5. Link Google Ads (Admin > Product links) and import `generate_lead` as the Ads conversion.
6. Under Admin > Data streams > More tagging settings > List unwanted referrals, add `forms.zohopublic.com` so the Zoho redirect doesn't start a new "referral" session.

### In Zoho Forms (each embedded form)
1. Under Share > Embed, copy the iframe `src` into `lib/forms.ts`. The "Request a Call Back" URL there was inferred from GA data and needs checking.
2. Set Settings > Redirection after submission to "Redirect to URL": `https://ecosolutions.co.za/enquiry-received?form=callback` (or `form=order`). Leave "Append form fields" **off**.
3. Turn off Zoho's Google Analytics integration for these forms (see above).
4. If the redirect opens inside the frame instead of the whole page, set the form's redirect target to the parent window. Then test one real submission end to end in GA4 DebugView.

## Reports to watch (re-check four weeks after launch)

- Leads: key event `generate_lead`, by `form_id`, landing page and session source.
- Funnel per service page: page views, then `enquiry_click`, then `form_view`, then `generate_lead`.
- Contact intent: `phone_click`, `whatsapp_click` and `email_click`, by page.
- Store hand-off: `shop_visit` and `begin_checkout` on the site, then purchases on the store with source `ecosolutions.co.za` once cross-domain measurement is on.
- Exclude the China bot traffic (Country ≠ China comparison) seen in the first week's data.
