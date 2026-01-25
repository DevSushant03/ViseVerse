"use client"
import React from "react";
import { Sparkles, Twitter, Github, Linkedin, Mail, Heart } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const footerLinks = {
    product: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Image To Text", href: "/image-to-text" },
      { label: "Pdf Summarizer", href: "/pdf-summarizer" },
      { label: "Tools", href: "/tools" },
    ],
    company: [
      { label: "About", href: "/about" },
      { label: "How its work", href: "/how-its-work" },
      { label: "Contact", href: "/contact" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/legal/privacy-policy" },
      { label: "Terms of Service", href: "/legal/terms-and-conditions" },
      { label: "Cookie Policy", href: "/legal/cookies-policy" },
      { label: "License", href: "/legal/license" },
    ],
  };

  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl overflow-hidden flex items-center justify-center">
                <Image src="/icon128.png" alt="logo" width={40} height={40} />

              </div>
              <span className="text-xl font-semibold text-slate-900">
                ViseVerse
              </span>
            </div>
            <p className="text-slate-600 mb-6 max-w-sm leading-relaxed">
              Transform your text workflow with AI-powered processing. Extract,
              analyze, translate, and export with unprecedented accuracy.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/DevSushant03"
                className="w-10 h-10 bg-slate-100 hover:bg-indigo-100 rounded-lg flex items-center justify-center transition group"
              >
                <Github className="w-5 h-5 text-slate-600 group-hover:text-indigo-600" />
              </a>
              <a
                href="https://www.linkedin.com/in/sushant-nachanekar"
                className="w-10 h-10 bg-slate-100 hover:bg-indigo-100 rounded-lg flex items-center justify-center transition group"
              >
                <Linkedin className="w-5 h-5 text-slate-600 group-hover:text-indigo-600" />
              </a>
              <a
                href="#email"
                className="w-10 h-10 bg-slate-100 hover:bg-indigo-100 rounded-lg flex items-center justify-center transition group"
              >
                <Mail className="w-5 h-5 text-slate-600 group-hover:text-indigo-600" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-slate-600 hover:text-indigo-600 transition text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-slate-600 hover:text-indigo-600 transition text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-slate-600 hover:text-indigo-600 transition text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-slate-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-slate-600">
              © {new Date().getFullYear()} ViseVerse. All rights reserved.
            </p>

            {/* Developer Credit */}
            <p className="text-sm text-slate-600 flex items-center gap-1">
              Built with{" "}
              <Heart className="w-4 h-4 text-red-500 fill-red-500 inline" /> by{" "}
              <a
                href="https://devsushant03.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-indigo-600 hover:text-indigo-700 transition"
              >
                Sushant Nachanekar
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Demo wrapper to show footer with content above it
function FooterDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Redesigned Footer
          </h1>
          <p className="text-slate-600">Scroll down to see the footer</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
