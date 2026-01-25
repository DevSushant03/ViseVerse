import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContextProvider } from "@/context/AppContext";
import { Poppins  } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "ViseVerse – All-in-one AI Writing & Document Tool",
  description:
    "ViseVerse is a free AI-powered text summarizer and explanation tool. Summarize long articles, notes, PDFs, and understand text instantly.",
  keywords: [
    "ai text summarizer",
    "text summarizer online",
    "summarize text",
    "ai summary tool",
    "explain text ai",
  ],
  authors: [{ name: "ViseVerse" }],
  verification: {
    google: "mxOAT__9AtlEVNYM6rAeEU-zWCZRwVE0c_aDZPwQPZ8",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/icon128.png",
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
