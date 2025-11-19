import { Languages, Download, Sparkles, Star, Text } from "lucide-react";

export default function TextFlowLanding() {
  const features = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "AI Summarization",
      description:
        "Transform lengthy documents into concise, meaningful summaries with advanced AI technology.",
    },
    {
      icon: <Text className="w-8 h-8" />,
      title: "Extract Text from Image",
      description: "Extracted text from image and Summaries with Viseverse",
    },
    {
      icon: <Languages className="w-8 h-8" />,
      title: "Multi-Language Translation",
      description:
        "Translate your content across 100+ languages with high accuracy and context awareness.",
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: "Multiple Export Formats",
      description:
        "Export your processed content as PDF, DOCX, or plain text with one click.",
    },
  ];

  const stats = [
    { number: "10M+", label: "Documents Processed" },
    { number: "150+", label: "Languages Supported" },
    { number: "99.9%", label: "Uptime" },
    { number: "50K+", label: "Happy Users" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a12] via-[#120d1c] to-[#1a1030] text-white overflow-hidden relative">
      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="text-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full mb-10 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
            <Star className="w-4 h-4 mr-2 text-yellow-400" />
            <span className="text-sm text-gray-300">
              Trusted by 50,000+ users worldwide
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-6xl md:text-8xl font-extrabold mb-8 bg-gradient-to-r from-white via-purple-200 to-purple-300 bg-clip-text text-transparent leading-tight drop-shadow-[0_0_18px_rgba(255,255,255,0.2)]">
            Transform Text with
            <span className="block bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(168,85,247,0.35)]">
              AI Power
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-xl md:text-2xl text-purple-200 mb-16 max-w-3xl mx-auto leading-relaxed">
            Summarize, explain, translate, and export your content in seconds.
            The ultimate AI-powered text processing platform for modern
            professionals.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 
                hover:bg-white/10 transition-all duration-300 hover:scale-105 
                shadow-[0_0_25px_rgba(0,0,0,0.3)] hover:shadow-[0_0_40px_rgba(138,43,226,0.25)]"
              >
                <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-transparent mb-3">
                  {stat.number}
                </div>
                <div className="text-purple-200 tracking-wide">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="relative z-10 max-w-7xl mx-auto px-6 py-24"
      >
        {/* Section Heading */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]">
            Powerful Features
          </h2>

          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Everything you need to process, understand, and transform your text
            with AI precision.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 
              transition-all duration-500 hover:bg-white/10 hover:scale-105 
              shadow-[0_0_30px_rgba(0,0,0,0.2)] hover:shadow-[0_0_40px_rgba(168,85,247,0.25)]"
            >
              {/* Icon */}
              <div
                className="w-16 h-16 bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl flex items-center justify-center mb-8 
                group-hover:scale-110 transition-transform duration-300 shadow-[0_0_25px_rgba(168,85,247,0.3)]"
              >
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-3xl font-bold mb-4 text-white group-hover:text-purple-200 transition-colors">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-purple-200 text-lg leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
