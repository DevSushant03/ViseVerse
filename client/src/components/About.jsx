"use client"
import { Languages, Download, Sparkles, Star, FileText, Zap, Globe, Shield } from "lucide-react";

export default function About() {
  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI-Powered Processing",
      description:
        "Advanced machine learning algorithms analyze and transform your text with unprecedented accuracy and speed.",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "OCR Text Extraction",
      description: "Extract text from any image format with industry-leading optical character recognition technology.",
    },
    {
      icon: <Languages className="w-6 h-6" />,
      title: "Multi-Language Support",
      description:
        "Translate and process content across 100+ languages with context-aware AI translation.",
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Flexible Export Options",
      description:
        "Export your processed content as PDF, DOCX, or plain text with professional formatting.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Process documents in seconds, not minutes. Built for speed without compromising quality.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Private",
      description: "Your data is encrypted and never stored. We prioritize your privacy and security.",
    },
  ];

  const stats = [
    { number: "10M+", label: "Documents Processed" },
    { number: "150+", label: "Languages Supported" },
    { number: "99.9%", label: "Uptime Guarantee" },
    { number: "50K+", label: "Active Users" },
  ];

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        {/* Trust Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-full mb-8">
          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span className="text-sm font-medium text-amber-700">
            Trusted by 50,000+ professionals worldwide
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
          Transform text with
          <span className="block mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            AI-powered intelligence
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          Summarize, explain, translate, and export your content in seconds.
          The modern text processing platform built for professionals.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition shadow-lg shadow-indigo-200">
            Get Started Free
          </button>
          <button className="px-8 py-4 bg-white text-slate-700 font-semibold rounded-xl border-2 border-slate-200 hover:border-indigo-300 hover:bg-slate-50 transition">
            Watch Demo
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white border border-slate-200 rounded-2xl p-6 text-center hover:shadow-lg hover:border-indigo-200 transition group"
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                {stat.number}
              </div>
              <div className="text-sm text-slate-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-20">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-4">
            <Globe className="w-4 h-4" />
            Everything you need
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Powerful features for text processing
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Built with cutting-edge AI to handle all your text transformation needs
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-xl hover:border-indigo-200 transition-all group"
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <div className="text-indigo-600">
                  {feature.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
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
                description: "Add your text or upload an image with text content"
              },
              {
                step: "02",
                title: "Choose Action",
                description: "Select from extract, summarize, translate, or polish"
              },
              {
                step: "03",
                title: "Export & Use",
                description: "Download in your preferred format or copy to clipboard"
              }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-lg transition">
                  <div className="text-6xl font-bold text-indigo-100 mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-600">
                    {item.description}
                  </p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-indigo-300 to-purple-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to transform your workflow?
            </h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who process text smarter, not harder
            </p>
            <button className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition shadow-xl">
              Start Processing Now
            </button>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl" />
        </div>
      </section>
    </div>
  );
}