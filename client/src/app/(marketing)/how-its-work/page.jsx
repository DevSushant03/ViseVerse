"use client"
import React from "react";

export default function HowItsWork() {
  return (
    <section className="bg-gradient-to-br from-indigo-50 to-purple-50 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            How it works
          </h2>
          <p className="text-xl text-slate-600">
            Simple, fast, and powerful in just three steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Upload or Paste",
              description: "Add your text or upload an image with text content",
            },
            {
              step: "02",
              title: "Choose Action",
              description:
                "Select from extract, summarize, translate, or polish",
            },
            {
              step: "03",
              title: "Export & Use",
              description:
                "Download in your preferred format or copy to clipboard",
            },
          ].map((item, index) => (
            <div key={index} className="relative">
              <div className="bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-lg transition">
                <div className="text-6xl font-bold text-indigo-100 mb-4">
                  {item.step}
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600">{item.description}</p>
              </div>
              {index < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-indigo-300 to-purple-300" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
