import Link from "next/link";

export const metadata = {
  title: "Free PDF Maker Online – Create PDF from Text & Documents | ViseVerse",
  description:
    "Create professional PDFs online using ViseVerse PDF Maker. Convert text, documents and content into high-quality PDF files instantly and for free.",
};

export default function PdfMakerPage() {
  return (
    <div className="bg-white text-gray-900">
      <div className="max-w-6xl mt-10 mx-auto px-4 py-12">
        {/* HERO */}
        <div className="text-center mb-12">
          <span className="inline-block mb-4 px-4 py-1 text-sm bg-purple-100 text-purple-700 rounded-full">
            📄 Create PDFs Instantly
          </span>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Free PDF Maker Online
          </h1>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Create high-quality PDF files from text and documents instantly using
            ViseVerse PDF Maker. No installation required.
          </p>
        </div>

        {/* SEO CONTENT */}
        <div className="max-w-4xl mx-auto space-y-10 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold mb-3">What is a PDF Maker?</h2>
            <p>
              A PDF maker is an online tool that helps you create PDF files from
              text, documents, or other content. PDFs are widely used for sharing
              documents because they preserve formatting and look professional on
              all devices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Why Use ViseVerse PDF Maker?
            </h2>
            <p>
              ViseVerse PDF Maker allows you to instantly generate clean and
              professional PDFs directly in your browser. You don’t need to
              install any software or create an account to start.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              What Can You Convert to PDF?
            </h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>Text content and articles</li>
              <li>Notes and assignments</li>
              <li>Reports and documentation</li>
              <li>AI-generated content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Is ViseVerse PDF Maker Free?
            </h2>
            <p>
              Yes, ViseVerse offers a free PDF maker tool with optional premium
              features for users who need higher limits and advanced options.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Can I Convert Other Formats to PDF?
            </h2>
            <p>
              Yes! You can also use our{" "}
              <Link
                href="/text-to-pdf"
                className="text-purple-600 font-medium"
              >
                Text to PDF
              </Link>{" "}
              and{" "}
              <Link
                href="/ai-summarizer"
                className="text-purple-600 font-medium"
              >
                Ai summarizer
              </Link>{" "}
              tools to create PDFs from different formats.
            </p>
          </section>
        </div>

        {/* INTERNAL LINKS */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold mb-4">Try Other Tools</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/ai-text-summarizer"
              className="px-5 py-2 border rounded-lg hover:bg-gray-100"
            >
              AI Text Summarizer
            </Link>
            <Link
              href="/ai-humanizer"
              className="px-5 py-2 border rounded-lg hover:bg-gray-100"
            >
              AI Humanizer
            </Link>
            <Link
              href="/pdf-summarizer"
              className="px-5 py-2 border rounded-lg hover:bg-gray-100"
            >
              PDF Summarizer
            </Link>
            <Link
              href="/image-to-text"
              className="px-5 py-2 border rounded-lg hover:bg-gray-100"
            >
              Image to Text
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
