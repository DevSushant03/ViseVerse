import React from "react";
import { Helmet } from "react-helmet";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About ViseVerse – AI Document Summarization & File Tools</title>
        <meta
          name="description"
          content="ViseVerse is an AI-powered platform that helps you extract text from PDFs, images, and documents, summarize content, edit text, and export files in multiple formats."
        />
      </Helmet>

      <div className="min-h-screen bg-white text-gray-900 px-6 py-16">
        <div className="max-w-5xl mt-10 mx-auto">
          
          <h1 className="text-4xl font-bold mb-6">About ViseVerse</h1>

          <p className="text-gray-700 mb-5 text-lg">
            ViseVerse is a modern AI-powered document processing platform built to
            simplify how people work with PDFs, images, and text files.
          </p>

          <p className="text-gray-700 mb-5">
            Our tools allow you to extract text from documents, summarize long
            content, edit and improve text using AI, and export files into
            different formats — all in one place.
          </p>

          <p className="text-gray-700 mb-5">
            ViseVerse is designed for students, professionals, researchers,
            writers, and anyone who works with documents daily and wants to save
            time and increase productivity.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">
            Why ViseVerse?
          </h2>

          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Extract text from PDFs, images, and scanned documents</li>
            <li>AI-powered text summarization and rewriting</li>
            <li>Multiple export formats like TXT, PDF, DOC</li>
            <li>Fast, secure, and easy to use</li>
            <li>Built for productivity and simplicity</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-10 mb-4">
            Our Mission
          </h2>

          <p className="text-gray-700">
            Our mission is to make document work faster, simpler, and smarter
            using artificial intelligence. We believe powerful tools should be
            accessible to everyone.
          </p>

        </div>
      </div>
    </>
  );
}
