import Link from "next/link";

export const metadata = {
  title: "Free Note Summarizer Online - ViseVerse AI",
  description:
    "Summarize your notes instantly with ViseVerse AI Note Summarizer. Perfect for students, exams, and study preparation.",
};

export default function NoteSummarizerPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-4">Free AI Note Summarizer</h1>

      <p className="text-lg mb-4">
        ViseVerse Note Summarizer helps students and professionals summarize
        long notes into short, clear, and easy-to-understand content. Whether
        you are preparing for exams, revising chapters, or studying from PDFs,
        our AI makes your work faster.
      </p>

      <p className="mb-4">
        Instead of reading long pages, just paste your notes and get a short
        summary in seconds. This tool is perfect for school students, college
        students, and competitive exam preparation.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Why use ViseVerse Note Summarizer?
      </h2>
      <ul className="list-disc pl-6 mb-8">
        <li>Summarize long notes instantly</li>
        <li>Save study time</li>
        <li>Understand key points quickly</li>
        <li>Free and easy to use</li>
      </ul>

      <Link
        href="/"
        className="inline-block bg-black text-white px-6 py-3 rounded-lg"
      >
        Use Note Summarizer
      </Link>
    </div>
  );
}
