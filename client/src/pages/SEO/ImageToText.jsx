

import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

export default function ImageToText() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Image to Text Converter (OCR) – Extract Text from Images | ViseVerse</title>
        <meta
          name="description"
          content="Convert images to text using AI OCR. Extract text from JPG, PNG, and scanned images instantly with ViseVerse Image to Text tool."
        />
      </Helmet>

      <div className="max-w-6xl mx-auto mt-10 px-4 py-10">
        {/* Header Card */}
        <div className="bg-white rounded-xl border p-8 mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-900">
            Image to Text Converter (OCR)
          </h1>

          <p className="text-gray-600 text-lg mb-6">
            Extract text from images using AI-powered OCR. Upload screenshots,
            scanned documents, or photos and convert them into editable text in
            seconds.
          </p>

          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            Try Image to Text
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border p-6">
            <h2 className="text-xl font-semibold mb-2">
              What is Image to Text (OCR)?
            </h2>
            <p className="text-gray-600">
              Image to Text (also called OCR – Optical Character Recognition) is a
              technology that reads text from images and converts it into
              editable digital text. It works with screenshots, photos, and
              scanned documents.
            </p>
          </div>

          <div className="bg-white rounded-xl border p-6">
            <h2 className="text-xl font-semibold mb-2">
              How does ViseVerse OCR work?
            </h2>
            <p className="text-gray-600">
              You upload an image, our system detects the text inside it using
              OCR, and then you can edit, summarize, translate, or export that
              text using ViseVerse tools.
            </p>
          </div>

          <div className="bg-white rounded-xl border p-6">
            <h2 className="text-xl font-semibold mb-2">
              Why use ViseVerse Image to Text?
            </h2>
            <ul className="list-disc ml-5 text-gray-600 space-y-1">
              <li>Supports JPG, PNG, WEBP images</li>
              <li>Works with scanned documents and photos</li>
              <li>Fast and accurate text extraction</li>
              <li>Edit, summarize, or translate extracted text</li>
              <li>Export to TXT, PDF, or DOCX</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl border p-6">
            <h2 className="text-xl font-semibold mb-2">Who is this useful for?</h2>
            <p className="text-gray-600">
              Students, office workers, teachers, and anyone who wants to copy
              text from images, screenshots, or scanned pages.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
