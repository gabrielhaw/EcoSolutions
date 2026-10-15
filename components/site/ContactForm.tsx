"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { site } from "@/lib/site";

const topics = {
  rodents: "Rats or mice",
  bats: "Bats in my roof",
  owls: "Owl box: new installation",
  service: "Owl box or bat house service",
  farm: "Farm, estate or agricultural project",
  other: "Something else",
} as const;

type Topic = keyof typeof topics;

/**
 * No form backend yet: on submit we open the visitor's email app with the
 * message filled in, addressed to info@. Swap `onSubmit` for a server action
 * or form service when one is set up.
 */
export default function ContactForm() {
  const params = useSearchParams();
  const initial = (params.get("topic") as Topic) ?? "rodents";
  const [topic, setTopic] = useState<Topic>(initial in topics ? initial : "rodents");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = [
      `Name: ${f.get("name")}`,
      `Phone: ${f.get("phone")}`,
      `Suburb / area: ${f.get("area")}`,
      `Topic: ${topics[topic]}`,
      "",
      String(f.get("message") ?? ""),
    ].join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Website enquiry: ${topics[topic]}`)}&body=${encodeURIComponent(body)}`;
  }

  const field = "mt-2 w-full rounded-xl border border-line-strong bg-canvas-2 px-4 py-3 text-[16px] text-fg placeholder:text-fg-3 focus:border-fg focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="grid gap-6">
      <fieldset>
        <legend className="label text-fg-3">What can we help with?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {(Object.keys(topics) as Topic[]).map((t) => (
            <label
              key={t}
              className={`cursor-pointer rounded-full border px-3.5 py-2 text-[14.5px] transition-colors ${
                topic === t ? "border-fg bg-fg text-canvas" : "border-line-strong text-fg-2 hover:border-fg"
              }`}
            >
              <input type="radio" name="topic" value={t} checked={topic === t} onChange={() => setTopic(t)} className="sr-only" />
              {topics[t]}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block text-[14.5px] font-medium">
          Your name
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="block text-[14.5px] font-medium">
          Phone
          <input name="phone" type="tel" required autoComplete="tel" className={field} />
        </label>
      </div>
      <label className="block text-[14.5px] font-medium">
        Suburb or area
        <input name="area" autoComplete="address-level2" placeholder="e.g. Linden, Johannesburg" className={field} />
      </label>
      <label className="block text-[14.5px] font-medium">
        Tell us what’s happening
        <textarea name="message" rows={5} placeholder="Where you're seeing activity, how long it's been going on…" className={field} />
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="rounded-full bg-accent px-6 py-3.5 text-[15px] font-medium text-canvas transition-colors hover:bg-accent-2">
          Send enquiry
        </button>
        <p className="text-[13.5px] text-fg-3">Opens your email app with your message ready to send.</p>
      </div>
    </form>
  );
}
