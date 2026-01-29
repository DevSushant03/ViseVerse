import { Helmet } from "react-helmet";
export const metadata = {
  title: "PDF Summarizer Online | ViseVerse AI",
  description:
    "Summarize PDF files online using ViseVerse AI. Upload your PDF and get a fast, accurate summary in seconds. Free, secure, and easy to use.",
  keywords: [
    "pdf summarizer",
    "ai pdf summarizer",
    "summarize pdf online",
    "free pdf summarizer",
    "pdf summary tool",
    "viseverse pdf summarizer",
  ],
  robots: "index, follow",
};

export default function PdfSummarizer() {
  const router = useRouter();

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4 py-10">
      {/* Header Card */}
      <div className="bg-white rounded-xl border p-8 mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-900">
          AI PDF Summarizer Online
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Summarize long PDF documents into short, clear summaries using AI.
          Perfect for students, researchers, and professionals.
        </p>
        <a
          href="/"
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
        >
          Try PDF Summarizer
        </a>
        a
      </div>

      {/* Content Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border p-6">
          <h2 className="text-xl font-semibold mb-2">
            What is a PDF Summarizer?
          </h2>
          <p className="text-gray-600">
            A PDF summarizer reads a PDF file and generates a shorter version
            containing only the most important points. It saves you time by
            removing unnecessary details.
          </p>
        </div>

        <div className="bg-white rounded-xl border p-6">
          <h2 className="text-xl font-semibold mb-2">
            How does ViseVerse work?
          </h2>
          <p className="text-gray-600">
            Upload your PDF, we extract the text (even from scanned files using
            OCR), and our AI understands the content and generates a clean
            summary instantly.
          </p>
        </div>

        <div className="bg-white rounded-xl border p-6">
          <h2 className="text-xl font-semibold mb-2">
            Why use ViseVerse PDF Summarizer?
          </h2>
          <ul className="list-disc ml-5 text-gray-600 space-y-1">
            <li>Works with large PDF files</li>
            <li>Supports scanned PDFs (OCR)</li>
            <li>Fast and accurate AI summaries</li>
            <li>Export to TXT, PDF, DOCX</li>
            <li>Simple and easy to use</li>
          </ul>
        </div>

        <div className="bg-white rounded-xl border p-6">
          <h2 className="text-xl font-semibold mb-2">Who is this for?</h2>
          <p className="text-gray-600">
            Students, researchers, teachers, writers, and professionals who work
            with books, notes, reports, and research papers.
          </p>
        </div>
      </div>
    </div>
  );
}
