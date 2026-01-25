"use client"
import React from "react";
import { Helmet } from "react-helmet";

export default function Tools() {
  return (
    <>
      <Helmet>
        <title>ViseVerse Tools – AI PDF, Image & Document Utilities</title>
        <meta
          name="description"
          content="Explore all ViseVerse tools including PDF text extraction, image OCR, AI summarizer, text editor, and multi-format export tools."
        />
      </Helmet>

      <div className="min-h-screen bg-white text-gray-900 px-6 py-16">
        <div className="max-w-6xl mt-10 mx-auto">
          
          <h1 className="text-4xl font-bold mb-6">ViseVerse Tools</h1>

          <p className="text-gray-700 mb-10 text-lg">
            ViseVerse provides a complete suite of AI-powered tools to work with
            PDFs, images, and documents efficiently.
          </p>

          <div className="grid md:grid-cols-2 gap-8">

            {/* Tool Card */}
            <div className="border rounded-xl p-6 hover:shadow-md transition">
              <h2 className="text-xl font-semibold mb-2">📄 PDF Text Extractor</h2>
              <p className="text-gray-700">
                Extract text from PDF files including scanned and digital PDFs
                using advanced text processing.
              </p>
            </div>

            <div className="border rounded-xl p-6 hover:shadow-md transition">
              <h2 className="text-xl font-semibold mb-2">🖼 Image to Text (OCR)</h2>
              <p className="text-gray-700">
                Convert images and screenshots into editable text using OCR
                technology.
              </p>
            </div>

            <div className="border rounded-xl p-6 hover:shadow-md transition">
              <h2 className="text-xl font-semibold mb-2">🤖 AI Text Summarizer</h2>
              <p className="text-gray-700">
                Summarize long articles, documents, and notes into short and
                meaningful summaries.
              </p>
            </div>

            <div className="border rounded-xl p-6 hover:shadow-md transition">
              <h2 className="text-xl font-semibold mb-2">✍️ AI Text Editor</h2>
              <p className="text-gray-700">
                Rewrite, improve, and modify your text using AI-powered editing
                tools.
              </p>
            </div>

            <div className="border rounded-xl p-6 hover:shadow-md transition">
              <h2 className="text-xl font-semibold mb-2">📤 Export Tools</h2>
              <p className="text-gray-700">
                Export your content into different formats like TXT, DOC, and
                PDF easily.
              </p>
            </div>

            <div className="border rounded-xl p-6 hover:shadow-md transition">
              <h2 className="text-xl font-semibold mb-2">🔒 Secure Processing</h2>
              <p className="text-gray-700">
                Your documents are processed securely and not shared with
                anyone.
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
