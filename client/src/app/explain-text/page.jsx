import Link from "next/link";

export const metadata = {
  title: "Explain Any Text in Simple Words - ViseVerse AI",
  description:
    "Explain any complex text in simple words using ViseVerse AI Explain Tool. Best for students and beginners.",
};

export default function ExplainTextPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-4">
        Explain Any Text in Simple Words
      </h1>

      <p className="text-lg mb-4">
        ViseVerse Explain Text tool helps you understand difficult paragraphs,
        articles, and topics in simple language. If you don’t understand
        something, just paste it and let AI explain it.
      </p>

      <p className="mb-4">
        This tool is perfect for students, beginners, and anyone who wants easy
        explanations for complex topics, books, or online articles.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Who should use this tool?
      </h2>
      <ul className="list-disc pl-6 mb-8">
        <li>School and college students</li>
        <li>Beginners in programming or science</li>
        <li>People reading difficult articles</li>
        <li>Self-learners</li>
      </ul>

      <Link
        href="/"
        className="inline-block bg-black text-white px-6 py-3 rounded-lg"
      >
        Explain My Text
      </Link>
    </div>
  );
}
