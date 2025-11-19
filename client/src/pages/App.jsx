import React, { useState, useRef } from "react";
import About from "../components/About.jsx";
import { Copy, FileText, FileType2, File } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer.jsx";
export default function App() {
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  const navigate = useNavigate();
  const [rawText, setRawText] = useState("");
  const [result, setResult] = useState("");
  const [title, setTitle] = useState("Result");
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeAction, setActiveAction] = useState("");

  const previewRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg(file);
      const imgurl = URL.createObjectURL(file);
      previewRef.current.src = imgurl;
      previewRef.current.style.display = "block";
    }
  };

  async function sendToBackground(text, action) {
    try {
      const res = await fetch(SERVER_URL + "/aiResponse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ text, action }),
      });

      const data = await res.json();
      console.log(data);

      if (!data.success) {
        navigate("/login");
      }
      return data.data;
    } catch (err) {
      return "Server error";
    }
  }

  async function downloadAsPdf(rawText) {
    const filename = prompt("Enter a file name").toString();
    setLoading(true);
    const response = await fetch(SERVER_URL + "/downloadPdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rawText }),
    });
    console.log(response);

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename || "Viseverse.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  }

  async function downloadAsDocx(rawText) {
    const filename = prompt("Enter a file name").toString();
    setLoading(true);
    const response = await fetch(SERVER_URL + "/downloadDocx", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rawText }),
    });

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename || "Viseverse.docx";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  }

  async function downloadAsTxt(rawText) {
    const filename = prompt("Enter a file name").toString();
    setLoading(true);

    const blob = new Blob([rawText], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename || "Viseverse.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  }

  async function ExtractText(file) {
    const formdata = new FormData();
    formdata.append("image", file);
    const res = await fetch(SERVER_URL + "/ocr", {
      method: "POST",
      body: formdata,
      credentials: "include",
    });
    const data = await res.json();
    setRawText(data.ocrtext);
    return data.text;
  }

  const selectAction = async (action) => {
    setActiveAction(action);
    setLoading(true);
    let res = "";
    let ttl = "";

    switch (action) {
      case "summarize":
        res = await sendToBackground(rawText, action);
        ttl = "Text Summary";
        break;
      case "extract-Text":
        res = await ExtractText(img);
        ttl = "Extract Text";
        break;
      case "bulletFormat":
        res = await sendToBackground(rawText, action);
        ttl = "Bullet Format";
        break;
      case "Polish-Text":
        res = await sendToBackground(rawText, action);
        ttl = "Polish Text";
        break;
      case "grammer_spell-Check":
        res = await sendToBackground(rawText, action);
        ttl = "Grammar/Spell Check";
        break;
      case "translate":
        res = await sendToBackground(rawText, action);
        ttl = "Translation";
        break;
      case "explain":
        res = await sendToBackground(rawText, action);
        ttl = "Text Explanation";
        break;
      case "downloadPdf":
        await downloadAsPdf(rawText);
        ttl = "Download as PDF";
        break;
      case "downloadDocx":
        await downloadAsDocx(rawText);
        ttl = "Download as Docx";
        break;
      case "downloadTxt":
        await downloadAsTxt(rawText);
        ttl = "Download as Text";
        break;
      default:
        res = rawText;
        ttl = "Result";
    }

    setResult(res);
    setTitle(ttl);
    setLoading(false);
  };

  const copyResult = () => {
    navigator.clipboard.writeText(result).then(() => alert("Copied!"));
  };

  return (
    <>
      <div className="max-w-[1200px] mx-auto mt-32 bg-[#0f0f17] border border-white/10 backdrop-blur-xl rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.6)] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#4b50ff] to-[#b45cff] text-white p-8 text-center shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
          <h1 className="text-4xl font-light mb-2 tracking-wide">
            📸 ViseVerse
          </h1>
          <p className="opacity-90 text-lg">
            Upload text and extract, analyze, or translate with AI
          </p>
        </div>

        <div className="p-10 text-gray-300">
          {/* Text Upload */}
          <div className="bg-[#1a1a23] border border-white/10 rounded-xl p-3 mb-8 transition shadow-[0_0_10px_rgba(0,0,0,0.4)] hover:border-indigo-400">
            <textarea
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="Drop your text..."
              className="h-52 w-full p-4 bg-[#0f0f17] border border-white/10 rounded-lg resize-none text-base 
        shadow-inner focus:outline-none focus:border-indigo-400 focus:shadow-[0_0_10px_rgba(99,102,241,0.4)]"
            />
          </div>

          {/* Hidden file input */}
          <input
            type="file"
            accept="image/*"
            id="imagefile"
            className="hidden"
            onChange={handleImageChange}
          />

          {/* Upload Button */}
          <label
            htmlFor="imagefile"
            className="inline-block px-6 py-3 rounded-xl cursor-pointer text-white mb-4
      bg-gradient-to-r from-indigo-500 to-purple-600 shadow-[0_4px_20px_rgba(0,0,0,0.5)]
      font-medium tracking-wide transition hover:opacity-90 active:scale-95"
          >
            Upload Image
          </label>

          <img
            ref={previewRef}
            style={{ width: "50%", display: "none" }}
            alt="preview"
          />

          {/* Action Buttons */}
          <div className="mb-10 mt-6">
            <h3 className="mb-5 text-gray-400 text-lg">Choose an action:</h3>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-3">
              {[
                { action: "extract-Text", label: "Extract Text", icon: "✂️" },
                { action: "summarize", label: "Summarize", icon: "🔍" },
                { action: "bulletFormat", label: "Bullet Points", icon: "🅱️" },
                { action: "Polish-Text", label: "Polish Text", icon: "✨" },
                {
                  action: "grammer_spell-Check",
                  label: "Grammar / Spell Check",
                  icon: "☑️",
                },
                { action: "translate", label: "Translate", icon: "🌐" },
                { action: "explain", label: "Explain", icon: "🧠" },
                { action: "downloadTxt", label: "Download TXT", icon: "📄" },
                { action: "downloadPdf", label: "Download PDF", icon: "📁" },
                { action: "downloadDocx", label: "Download DOCX", icon: "📃" },
              ].map((btn) => (
                <div
                  key={btn.action}
                  onClick={() => selectAction(btn.action)}
                  className={`cursor-pointer text-center font-medium text-[1.05em] p-5 rounded-xl border 
            transition shadow-[0_0_15px_rgba(0,0,0,0.4)]
            ${
              activeAction === btn.action
                ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-indigo-400"
                : "bg-[#13131a] border-white/10 hover:border-indigo-400 hover:bg-[#1c1c26]"
            }
          `}
                >
                  <span className="block text-2xl mb-1">{btn.icon}</span>
                  {btn.label}
                </div>
              ))}
            </div>
          </div>

          {/* Loading Spinner */}
          {loading && (
            <div className="flex items-center justify-center h-24 text-indigo-400 text-lg">
              Processing your request...
              <span className="ml-3 w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></span>
            </div>
          )}

          {/* Result Section */}
          {result && (
            <div className="bg-[#14141d] rounded-xl p-6 mt-5 border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)] relative">
              <div className="flex justify-between items-center pb-3 mb-3 border-b border-white/10">
                <div className="text-xl font-semibold text-white/90">
                  {title}
                </div>
              </div>

              <div className="text-[1.1em] leading-relaxed max-h-52 overflow-y-scroll bg-[#0f0f17] p-5 rounded-lg border border-white/10 whitespace-pre-wrap text-gray-300 shadow-inner">
                {result}
              </div>

              <div className="mt-3 flex gap-3 flex-wrap">
                <button
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm shadow hover:bg-indigo-700"
                  onClick={copyResult}
                >
                  <Copy />
                </button>

                <button
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm shadow hover:bg-indigo-700"
                  onClick={() => downloadAsTxt(result)}
                >
                  <FileText />
                </button>

                <button
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm shadow hover:bg-indigo-700"
                  onClick={() => downloadAsPdf(result)}
                >
                  <FileType2 />
                </button>

                <button
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm shadow hover:bg-indigo-700"
                  onClick={() => downloadAsDocx(result)}
                >
                  <File />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <About />
      <Footer />
    </>
  );
}
