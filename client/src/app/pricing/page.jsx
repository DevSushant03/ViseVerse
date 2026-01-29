import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Starter",
    tokens: "1,000",
    usd: "$0.25",
    inr: "₹20",
    desc: "Light users",
  },
  {
    name: "Basic",
    tokens: "5,000",
    usd: "$1.00",
    inr: "₹83",
    desc: "Occasional use",
    popular: true,
  },
  {
    name: "Standard",
    tokens: "20,000",
    usd: "$3.75",
    inr: "₹310",
    desc: "Regular use",
  },
  {
    name: "Pro",
    tokens: "50,000",
    usd: "$8.75",
    inr: "₹730",
    desc: "Heavy users",
  },
  {
    name: "Ultra",
    tokens: "100,000",
    usd: "$16.00",
    inr: "₹1,325",
    desc: "Power users",
  },
];

export const metadata = {
  title: "Pricing | ViseVerse AI Tools",
  description:
    "Check ViseVerse pricing plans and choose the best AI tools plan for your needs. Get access to text summarizer, PDF summarizer, OCR, and more at affordable prices.",
  keywords: [
    "viseverse pricing",
    "ai tools pricing",
    "pdf summarizer pricing",
    "text summarizer subscription",
    "viseverse plans",
    "ai productivity tools price",
  ],
  robots: "index, follow",
};

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Simple, Affordable Pricing
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto mb-12">
          Buy credits and use them for AI summaries and explanations. Bigger
          text uses more credits. No subscriptions. No hidden fees.
        </p>

        <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg border p-8 flex flex-col w-[300px] ${
                plan.popular
                  ? "border-indigo-500 scale-105"
                  : "border-slate-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                  <Sparkles size={14} /> Most Popular
                </div>
              )}

              <h2 className="text-xl font-semibold text-slate-900">
                {plan.name}
              </h2>
              <p className="text-slate-500 text-sm mt-1">{plan.desc}</p>

              <div className="mt-6">
                <p className="text-3xl font-bold text-slate-900">{plan.inr}</p>
                <p className="text-sm text-slate-500">{plan.usd}</p>
              </div>

              <div className="my-6 h-px bg-slate-200" />

              <ul className="text-sm text-slate-600 space-y-3 flex-1">
                <li className="flex items-center gap-2">
                  <Check className="text-green-600" size={16} />
                  {plan.tokens} Credits
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-green-600" size={16} />
                  No expiry
                </li>
              </ul>

              <button
                className={`mt-6 py-3 rounded-lg font-semibold transition ${
                  plan.popular
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
              >
                Buy Credits
              </button>
            </div>
          ))}
        </div>

        {/* Credits explanation */}
        <div className="mt-16 max-w-3xl mx-auto bg-white border border-slate-200 rounded-xl p-6 text-left shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-2">
            💡 What are Credits?
          </h3>
          <p className="text-slate-600 text-sm">
            Credits are used whenever you generate AI summaries or explanations.
            The longer your text, the more credits are used. Free users get
            daily credits, and purchased credits never expire.
          </p>
        </div>
      </div>
    </div>
  );
}
