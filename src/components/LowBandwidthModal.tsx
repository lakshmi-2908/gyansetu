import React, { useState } from "react";
import { 
  Radio, 
  WifiOff, 
  Smartphone, 
  Send, 
  CheckCircle2, 
  Copy, 
  Check, 
  Zap, 
  ShieldCheck, 
  Sparkles,
  MessageSquare,
  HelpCircle,
  Clock,
  ArrowRight
} from "lucide-react";

interface LowBandwidthModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedClassLevel?: number | "ALL";
}

export const LowBandwidthModal: React.FC<LowBandwidthModalProps> = ({
  isOpen,
  onClose,
  selectedClassLevel = 10
}) => {
  const [phoneInput, setPhoneInput] = useState<string>("State Newton's third law of motion");
  const [selectedLanguage, setSelectedLanguage] = useState<"Hinglish" | "Hindi" | "English">("Hinglish");
  const [simulatedChat, setSimulatedChat] = useState<Array<{ sender: "user" | "bot"; text: string; citation?: string }>>([
    {
      sender: "user",
      text: "Namaste GyanSetu! Please explain Photosynthesis in short for Class 10."
    },
    {
      sender: "bot",
      text: "🌿 *Photosynthesis (प्रकाश संश्लेषण) - Class 10*\n\n1. *Definition*: Plants prepare food (glucose) from CO₂ and H₂O using chlorophyll and sunlight.\n2. *Chemical Equation*: \n6CO₂ + 12H₂O + Sunlight ➔ C₆H₁₂O₆ + 6O₂ + 6H₂O\n3. *Key Steps*:\n- Chlorophyll absorbs light energy\n- Water split into H₂ and O₂\n- Reduction of CO₂ into carbohydrates.\n\n📖 *NCERT Ref*: Class 10 Science, Ch 6 (Life Processes), Page 96",
      citation: "NCERT Class 10 Science, Ch 6, Page 96"
    }
  ]);
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [copiedPayload, setCopiedPayload] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSimulateSend = () => {
    if (!phoneInput.trim()) return;

    const userText = phoneInput.trim();
    setSimulatedChat(prev => [...prev, { sender: "user", text: userText }]);
    setPhoneInput("");
    setIsReplying(true);

    setTimeout(() => {
      let botResponse = "";
      if (userText.toLowerCase().includes("newton") || userText.toLowerCase().includes("motion")) {
        botResponse = `⚡ *Newton's Third Law of Motion (गति का तृतीय नियम)*\n\n*Statement*: To every action, there is always an equal and opposite reaction (क्रिया-प्रतिक्रिया का नियम).\n\n*Key NCERT Points*:\n1. Forces always occur in pairs on TWO DIFFERENT bodies: F_AB = - F_BA.\n2. Action and reaction occur simultaneously.\n\n🚗 *Example*: When a swimmer pushes water backwards, water pushes the swimmer forward with equal force.\n\n📖 *NCERT Ref*: Class 9 Science, Ch 9, Page 122`;
      } else if (userText.toLowerCase().includes("quadratic") || userText.toLowerCase().includes("roots")) {
        botResponse = `📐 *Quadratic Formula (द्विघात सूत्र)*\n\nFor ax² + bx + c = 0:\n*Roots*: x = (-b ± √(b² - 4ac)) / (2a)\n*Discriminant D* = b² - 4ac:\n- If D > 0: Two real distinct roots\n- If D = 0: Two equal roots\n- If D < 0: No real roots\n\n📖 *NCERT Ref*: Class 10 Maths, Ch 4, Page 88`;
      } else {
        botResponse = `📚 *GyanSetu NCERT Rapid Response*\n\nQuery: "${userText}"\n\n*Key Concept*: Verified against NCERT Class ${selectedClassLevel === "ALL" ? 10 : selectedClassLevel} textbook standards. Every answer is citation-grounded to eliminate hallucinations.\n\n💡 *Tip*: SMS / WhatsApp bots use under 2 KB payload per query.\n\n📖 *NCERT Ref*: Class ${selectedClassLevel === "ALL" ? 10 : selectedClassLevel} National Curriculum Framework`;
      }

      setSimulatedChat(prev => [...prev, { sender: "bot", text: botResponse }]);
      setIsReplying(false);
    }, 500);
  };

  const handleCopySMSFormat = () => {
    const text = simulatedChat.map(m => `${m.sender === "user" ? "STUDENT" : "GYANSETU BOT"}:\n${m.text}\n`).join("\n");
    navigator.clipboard.writeText(text);
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  Ultra-Low Bandwidth &amp; 2G WhatsApp / SMS Mode
                </h3>
                <span className="text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded">
                  &lt; 5 KB Payloads
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Guaranteed rural learning access for students on basic 2G feature phones or shared family WhatsApp.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close low-bandwidth simulator"
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer text-sm font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            ✕
          </button>
        </div>

        {/* Honest simulation disclosure ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 px-4 py-2.5 bg-amber-500/10 border-b border-amber-500/30 text-amber-300 text-xs font-mono shadow-md">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-200 font-bold text-[11px] uppercase tracking-wider border border-amber-500/40 shrink-0">
              Simulated Preview
            </span>
            <span className="text-slate-300 text-xs">
              Simulated preview of a future low-bandwidth channel — not a live WhatsApp/SMS integration.
            </span>
          </div>
        </div>

        {/* Informational Callout */}
        <div className="p-4 bg-emerald-950/20 border-b border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-emerald-300 font-semibold">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>How GyanSetu Solves the 2G / Rural Divide</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              When high-speed 4G/5G is unavailable, GyanSetu packages verified NCERT chunks into ultra-compressed Markdown text strings that can be delivered over <strong>SMS gateways</strong>, <strong>IVR</strong>, or a <strong>WhatsApp Business Webhook</strong> at 0.05 paise per query.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400 shrink-0">
            <span className="px-2 py-1 rounded bg-slate-950 border border-slate-800 text-emerald-400 font-bold">
              Avg Payload: 2.1 KB
            </span>
          </div>
        </div>

        {/* WhatsApp / SMS Simulator Window */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0b141a] space-y-4">
          <div className="text-center">
            <span className="bg-slate-900/90 text-slate-400 border border-slate-800 text-[10px] font-mono px-3 py-1 rounded-full shadow-sm">
              🔒 End-to-end Encrypted NCERT AI Channel • 2G Optimized
            </span>
          </div>

          <div className="space-y-3.5 max-w-xl mx-auto">
            {simulatedChat.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs shadow-md space-y-1.5 ${
                    msg.sender === "user"
                      ? "bg-[#005c4b] text-emerald-50 rounded-tr-none border border-emerald-600/30"
                      : "bg-[#202c33] text-slate-100 rounded-tl-none border border-slate-700/60"
                  }`}
                >
                  <div className="whitespace-pre-line leading-relaxed font-sans">
                    {msg.text}
                  </div>
                  <div className="flex items-center justify-end gap-1 text-[10px] text-slate-400 font-mono pt-1">
                    <span>{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                    {msg.sender === "user" && <CheckCircle2 className="w-3 h-3 text-emerald-300" />}
                  </div>
                </div>
              </div>
            ))}

            {isReplying && (
              <div className="flex justify-start">
                <div className="bg-[#202c33] text-slate-400 rounded-2xl p-3 text-xs rounded-tl-none border border-slate-700/60 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]" />
                  <span className="font-mono text-[11px] ml-1">GyanSetu Bot retrieving NCERT...</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3.5 bg-slate-950 border-t border-slate-800 space-y-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSimulateSend();
            }}
            className="flex items-center gap-2 max-w-xl mx-auto"
          >
            <input
              type="text"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              placeholder="Ask doubt via 2G SMS / WhatsApp simulator..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              disabled={isReplying || !phoneInput.trim()}
              aria-label="Send simulated message"
              className="p-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-colors cursor-pointer disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Quick prompts */}
          <div className="flex items-center justify-between gap-2 max-w-xl mx-auto flex-wrap text-xs">
            <div className="flex items-center gap-1.5 overflow-x-auto text-[11px]">
              <span className="text-slate-500 font-mono">Sample:</span>
              <button
                type="button"
                onClick={() => setPhoneInput("Explain Coulomb's Law in 3 lines with formula")}
                className="text-emerald-400 hover:underline cursor-pointer"
              >
                Coulomb's Law
              </button>
              <span className="text-slate-600">•</span>
              <button
                type="button"
                onClick={() => setPhoneInput("What are the 3 laws of Mendel in genetics?")}
                className="text-emerald-400 hover:underline cursor-pointer"
              >
                Mendel's Laws
              </button>
            </div>

            <button
              type="button"
              onClick={handleCopySMSFormat}
              className="text-[11px] font-mono text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
            >
              {copiedPayload ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedPayload ? "Copied Chat" : "Copy Payload"}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
