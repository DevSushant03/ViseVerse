"use client"
import React from "react";
import { Helmet } from "react-helmet";

export default function Features() {
  const features = [
    {
      title: "AI Text Summarization",
      desc: "Summarize long documents, articles, PDFs, and notes into short, meaningful summaries using AI."
    },
    {
      title: "Extract Text from Images (OCR)",
      desc: "Upload images and extract readable text instantly using advanced OCR technology."
    },
    {
      title: "Extract Text from PDF & Docs",
      desc: "Upload PDF and DOC files and extract full text for editing, summarizing, or exporting."
    },
    {
      title: "Edit & Modify Documents",
      desc: "Modify, rewrite, or improve your extracted text using AI tools."
    },
    {
      title: "Export in Multiple Formats",
      desc: "Download your content in TXT, DOC, PDF and other formats."
    },
    {
      title: "Fast & Secure Processing",
      desc: "Your documents are processed quickly and securely."
    },
  ];

  return (
    <>
      <Helmet>
        <title>ViseVerse Features – AI Document Summarizer, OCR, PDF Text Extractor</title>
        <meta
          name="description"
          content="Explore ViseVerse features: AI text summarization, image OCR, PDF & DOC text extraction, document editing and exporting in multiple formats."
        />
        <meta
          name="keywords"
          content="AI summarizer, OCR online, extract text from pdf, image to text, document editor online, viseverse features"
        />
      </Helmet>

      <div className="min-h-screen bg-white text-black px-6 py-16">
        <div className="max-w-6xl mt-10 mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            ViseVerse Features
          </h1>

          <p className="text-gray-400 text-center mb-12">
            Everything you need to extract, summarize, edit and export documents using AI.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white border border-gray-800 rounded-xl p-6 hover:border-blue-500 transition"
              >
                <h2 className="text-xl font-semibold mb-3">
                  {feature.title}
                </h2>
                <p className="text-gray-400 text-sm">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
