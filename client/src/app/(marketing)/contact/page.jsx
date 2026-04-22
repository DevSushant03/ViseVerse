import React from "react";

export const metadata = {
  title: "Contact Us | ViseVerse",
  description:
    "Contact the ViseVerse team for support, feedback, or business inquiries. We are here to help you with our AI tools and services.",
  keywords: [
    "contact ViseVerse",
    "ViseVerse support",
    "ViseVerse help",
    "AI tools support",
    "contact AI tool website",
  ],
  robots: "index, follow",
};

export default function Contact() {
  return (
    <div className="min-h-screen bg-white text-gray-900 px-6 py-16">
      <div className="max-w-5xl mt-10 mx-auto grid md:grid-cols-2 gap-12">
        {/* Left Info */}
        <div>
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-700 mb-6">
            Have questions, feedback, or need help with ViseVerse? Feel free to
            contact us. We usually reply within 24 hours.
          </p>

          <div className="space-y-4 text-gray-700">
            <p>
              📧 <strong>Email:</strong> mrsushant2005@gmail.com
            </p>
            <p>
              🌍 <strong>Website:</strong> https://viseverse.netlify.app
            </p>
            <p>
              📍 <strong>Location:</strong> India
            </p>
          </div>

          <p className="mt-6 text-gray-600 text-sm">
            For bug reports, feature requests, or business inquiries, please use
            the form.
          </p>
        </div>

        {/* Contact Form */}
        <div className="border rounded-xl p-6 shadow-sm">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Your Name
              </label>
              <input
                type="text"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                rows="5"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Write your message here..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
