"use client";

import { useEffect, useState } from "react";

const CHAT_URL = "https://interfaces.zapier.com/embed/chatbot/cm1q3bpt9001x73eb6ipicc30";

/**
 * Our own quiet "Ask us" button. The Zapier chatbot frame only loads once
 * someone opens it, and fills our panel exactly (Zapier's web component
 * collapsed to ~150px and hid the message box).
 */
export default function ChatLauncher() {
  const [open, setOpen] = useState(false);
  const [started, setStarted] = useState(false);

  // Marks that the page's scripts have started (read by the dev error reporter).
  useEffect(() => document.documentElement.setAttribute("data-hydrated", ""), []);

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {started && (
        <div
          role="dialog"
          aria-label="Ask EcoSolutions"
          className={`flex h-[min(600px,calc(100dvh-7rem))] w-[min(400px,calc(100vw-2rem))] origin-bottom-right flex-col overflow-hidden rounded-3xl border border-line bg-canvas shadow-2xl shadow-black/30 transition duration-300 ${
            open ? "pointer-events-auto scale-100 opacity-100" : "invisible scale-95 opacity-0"
          }`}
        >
          <div className="flex shrink-0 items-center justify-between border-b border-line px-5 py-3.5">
            <p className="text-[15px] font-medium">Ask EcoSolutions</p>
            <button type="button" onClick={() => setOpen(false)} className="rounded-full px-3 py-1 text-[13px] text-fg-2 hover:bg-canvas-2 hover:text-fg">
              Close
            </button>
          </div>
          <iframe title="EcoSolutions chat assistant" src={CHAT_URL} allow="clipboard-write" className="block w-full flex-1 border-0 bg-white" />
        </div>
      )}
      <button
        type="button"
        aria-expanded={open}
        onClick={() => {
          setStarted(true);
          setOpen((o) => !o);
        }}
        aria-label={open ? "Close chat" : "Ask us a question"}
        className="pointer-events-auto flex items-center gap-2 rounded-full border border-line bg-canvas/90 p-2 sm:py-2.5 sm:pl-3 sm:pr-4 text-[14px] font-medium shadow-lg shadow-black/15 backdrop-blur-xl transition hover:border-line-strong"
      >
        <span className="grid size-7 place-items-center rounded-full bg-accent text-canvas">
          <svg aria-hidden viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 18.5V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H8l-3 2.5Z" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="hidden sm:inline">{open ? "Close chat" : "Ask us"}</span>
      </button>
    </div>
  );
}
