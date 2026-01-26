import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContextProvider } from "@/context/AppContext";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "ViseVerse – AI Tools for Productivity",
  description:
    "ViseVerse is a free AI-powered text summarizer and explanation tool. Summarize long articles, notes, PDFs, and understand text instantly.",
  keywords: [
    "ai text summarizer",
    "text summarizer online",
    "summarize text",
    "ai summary tool",
    "explain text ai",
  ],

  manifest: "/manifest.json",

  openGraph: {
    title: "ViseVerse – AI Tools for Productivity",
    description:
      "ViseVerse is your AI companion for smarter work, productivity, and creativity.",
    siteName: "ViseVerse",
    url: "https://viseverse.vercel.app",
    type: "website",
  },
  authors: [{ name: "ViseVerse" }],
  verification: {
    google: "hLLV_ZPmUxhmqmfsGWjmuFq52v3N-q4EV51RRjUXgXM",
  },
  icons: {
    icon: "public/favicon.ico",
    apple: "public/icon128.png",
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AppContextProvider>
          <Navbar />
          <ToastContainer position="top-center" />
          {children}
          <Footer />
        </AppContextProvider>
      </body>
    </html>
  );
}
