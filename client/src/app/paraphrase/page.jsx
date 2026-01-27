import Link from "next/link";

export const metadata = {
  title: "Free Paraphrasing Tool Online - ViseVerse AI",
  description:
    "Paraphrase and rewrite text instantly using ViseVerse AI. Improve clarity, uniqueness, and quality of your content.",
};

export default function ParaphrasePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-4">Free AI Paraphrasing Tool</h1>

      <p className="text-lg mb-4">
        ViseVerse Paraphrasing Tool helps you rewrite sentences, paragraphs, and articles in a better
        and more professional way without changing the meaning.
      </p>

      <p className="mb-4">
        This tool is useful for students, bloggers, content writers, and anyone who wants to improve
        their writing or avoid repetition.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">What can you do with this tool?</h2>
      <ul className="list-disc pl-6 mb-8">
        <li>Rewrite content</li>
        <li>Improve clarity</li>
        <li>Avoid plagiarism</li>
        <li>Make text more professional</li>
      </ul>

      <Link
        href="/"
        className="inline-block bg-black text-white px-6 py-3 rounded-lg"
      >
        Paraphrase My Text
      </Link>
    </div>
  );
}
