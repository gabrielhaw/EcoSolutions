/**
 * Zoho Forms used for enquiries. Each form is embedded with <ZohoForm id="…" />.
 *
 * `url` is the form's public link from Zoho Forms > Share > Embed (the iframe
 * `src`). Leave it null until the form exists: the slot then shows phone,
 * WhatsApp and email instead of an empty frame.
 *
 * For a completed enquiry to be counted (once, and separately from button
 * clicks), set the form's "Redirection after submission" in Zoho to
 *   https://ecosolutions.co.za/enquiry-received?form=<id>
 * with the "append form data" option OFF, so no customer details reach the URL.
 */
export type FormId = "callback" | "order";

export type ZohoFormConfig = {
  id: FormId;
  title: string;
  url: string | null;
  /** Initial iframe height in px; Zoho forms don't resize themselves across origins. */
  height: number;
};

export const ZOHO_HOSTS = ["https://forms.zohopublic.com", "https://forms.zoho.com"];

export const forms: Record<FormId, ZohoFormConfig> = {
  callback: {
    id: "callback",
    title: "Request a call back",
    // Zoho embed code, confirmed by Gabriel 16 Oct 2026.
    url: "https://forms.zohopublic.com/info4949/form/RequestaCallBack/formperma/97U1CuB2sLKJUXfS8lDJ4KzmjIxZ3qY97tOTt295X6A",
    height: 620,
  },
  order: {
    id: "order",
    title: "Online order form",
    // Zoho embed code, confirmed by Gabriel 16 Oct 2026.
    url: "https://forms.zohopublic.com/info4949/form/OnlineOrderForm/formperma/8269f_eP0XU139GGyaOwmqNpb-IShWusI2UgpRXzvb8",
    height: 900,
  },
};

export const isFormId = (v: string | null | undefined): v is FormId => !!v && v in forms;
