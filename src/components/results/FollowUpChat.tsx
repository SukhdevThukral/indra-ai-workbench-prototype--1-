import { useEffect, useRef, useState } from "react";
import {
  FileOutput,
  FileSearch,
  GitCompare,
  MessagesSquare,
  Send,
  Sparkles,
  UserRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Logo from "../Logo";
import { SectionHeader } from "./Shared";
import {
  CHAT_SEED,
  COMPANY,
  DEFAULT_REPLY,
  INTENT_REPLIES,
  QUICK_ACTIONS,
  QUICK_RESPONSES,
} from "../../data/mockData";
import type { ChatMessage } from "../../data/mockData";

// icon for each quick-action chip
const ACTION_ICONS: Record<string, LucideIcon> = {
  "Explain Further": Sparkles,
  "Show Evidence": FileSearch,
  "Compare With SOP": GitCompare,
  "Generate Report": FileOutput,
};

interface Props {
  onShowEvidence: () => void;
  onGenerateReport: () => void;
}

/**
 * Simulated follow-up conversation. Answers are canned / keyword-matched
 * against the analysis above — no real AI calls.
 */
export default function FollowUpChat({ onShowEvidence, onGenerateReport }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>(CHAT_SEED);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // keep the newest message in view
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text || typing) return;

    setMessages((m) => [...m, { role: "customer", text }]);
    setInput("");
    setTyping(true);

    // choose a simulated reply: quick-action > keyword intent > default
    const lower = text.toLowerCase();
    const intent = INTENT_REPLIES.find((i) => i.keys.some((k) => lower.includes(k)));
    const reply = QUICK_RESPONSES[text] ?? intent?.reply ?? DEFAULT_REPLY;

    if (text === "Show Evidence") onShowEvidence();
    if (text === "Generate Report") onGenerateReport();

    setTimeout(() => {
      setMessages((m) => [...m, { role: "indra", text: reply }]);
      setTyping(false);
    }, 1000);
  };

  return (
    <section>
      <SectionHeader
        index="09 · Customer response"
        icon={MessagesSquare}
        title="Ask INDRA AI About This Analysis"
        sub="Follow-up questions are answered against the local analysis context — still fully on-premise."
      />

      <div className="card overflow-hidden">
        {/* conversation */}
        <div ref={scrollRef} className="max-h-[26rem] space-y-4 overflow-y-auto p-5">
          {messages.map((m, i) =>
            m.role === "customer" ? (
              <div key={i} className="flex items-end justify-end gap-2.5">
                <div className="max-w-[80%] animate-fade-up rounded-2xl rounded-br-md bg-navy-900 px-4 py-3 shadow-md shadow-navy-900/15">
                  <p className="mb-1 text-right text-[9.5px] font-bold tracking-[0.16em] text-cyan-300">
                    CUSTOMER · PLANT 2
                  </p>
                  <p className="text-[13.5px] leading-relaxed text-blue-50">{m.text}</p>
                </div>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm">
                  <UserRound size={15} />
                </span>
              </div>
            ) : (
              <div key={i} className="flex items-end gap-2.5">
                <Logo size={30} />
                <div className="max-w-[85%] animate-fade-up rounded-2xl rounded-bl-md border border-slate-200 bg-slate-50/80 px-4 py-3">
                  <p className="mb-1 bg-gradient-to-r from-brand-600 to-cyan-500 bg-clip-text text-[9.5px] font-bold tracking-[0.16em] text-transparent">
                    INDRA AI · LOCAL INFERENCE
                  </p>
                  <p className="text-[13.5px] leading-relaxed text-slate-600">{m.text}</p>
                </div>
              </div>
            )
          )}

          {/* typing indicator */}
          {typing && (
            <div className="flex items-end gap-2.5">
              <Logo size={30} />
              <div className="rounded-2xl rounded-bl-md border border-slate-200 bg-slate-50/80 px-4 py-3">
                <span className="flex gap-1 py-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-500/60"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* quick actions + input */}
        <div className="border-t border-slate-100 bg-slate-50/60 p-4">
          <div className="mb-3 flex flex-wrap gap-1.5">
            {QUICK_ACTIONS.map((action) => {
              const Icon = ACTION_ICONS[action];
              return (
                <button
                  key={action}
                  onClick={() => send(action)}
                  disabled={typing}
                  className="chip border border-slate-200 bg-white text-slate-600 transition hover:border-brand-500/40 hover:text-brand-600 disabled:opacity-50"
                >
                  <Icon size={12} />
                  {action}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 transition focus-within:border-brand-500/50">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
              placeholder="Ask INDRA AI about this analysis..."
              className="h-9 flex-1 bg-transparent text-[13.5px] text-navy-900 outline-none placeholder:text-slate-400"
            />
            <button
              onClick={() => send(input)}
              disabled={!input.trim() || typing}
              className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-r from-brand-600 to-cyan-500 text-white shadow-md shadow-blue-600/25 transition hover:brightness-105 disabled:opacity-40"
              title="Send"
            >
              <Send size={15} />
            </button>
          </div>
          <p className="mt-2 text-[10.5px] text-slate-400">
            Simulated responses · {COMPANY} (fictional) — answers are pre-computed demo data.
          </p>
        </div>
      </div>
    </section>
  );
}
