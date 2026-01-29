"use client";
import { useState, useContext, useRef } from "react";

import {
  Copy,
  FileText,
  FileType2,
  File,
  Image,
  Sparkles,
  Check,
} from "lucide-react";
import About from "../components/About";
import { useRouter } from "next/navigation";
import { AppContext } from "@/context/AppContext";
import { toast } from "react-toastify";

export default function Home() {
  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
  const { setUser, user, isLoggedIn } = useContext(AppContext);
  const controllerRef = useRef(null);

  const [rawText, setRawText] = useState("");
  const [result, setResult] = useState("");
  const [title, setTitle] = useState("Result");
  const [loading, setLoading] = useState(false);
  const [activeAction, setActiveAction] = useState("");
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const [file, setFile] = useState(null);
  const [preview, setpreview] = useState(null);
  const [fileType, setfileType] = useState("");

  const cancelRequest = () => {
    controllerRef.current?.abort();
    setLoading(false);
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return alert("please select file!");

    const fileUrl = URL.createObjectURL(selectedFile);
    setpreview(fileUrl);

    setFile(selectedFile);

    const type = selectedFile.type;

    if (type.startsWith("image/")) {
      setfileType("image");
    } else if (type === "application/pdf") {
      setfileType("pdf");
    } else if (
      type === "application/msword" ||
      type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      setfileType("docs");
    } else {
      alert("Unsupported file type");
    }
  };

  async function sendToBackground(text, action) {
    controllerRef.current = new AbortController();
    try {
      const res = await fetch(SERVER_URL + "/aiResponse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ text, action }),
        signal: controllerRef.current.signal,
      });

      const data = await res.json();
      if (!data.success) {
        if (data.errorType === "AUTH") {
          router.push("/login");
        } else {
          return data.message;
        }
      }

      setUser(data.user);
      return data.data;
    } catch (err) {
      return "Server error";
    }
  }

  async function downloadAsPdf(rawText) {
    const filename = prompt("Enter a file name");
    if (filename === null) {
      return;
    }

    if (filename?.trim() === "") {
      alert("Filename cannot be empty");
      return;
    }
    setLoading(true);
    const response = await fetch(SERVER_URL + "/downloadPdf", {
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
    a.download = filename || "Viseverse.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  }

  async function downloadAsDocx(rawText) {
    const filename = prompt("Enter a file name");
    if (filename === null) {
      return;
    }

    if (filename?.trim() === "") {
      alert("Filename cannot be empty");
      return;
    }
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
    const filename = prompt("Enter a file name");
    if (filename === null) {
      return;
    }

    if (filename?.trim() === "") {
      alert("Filename cannot be empty");
      return;
    }

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
    formdata.append(fileType, file);
    let res = null;
    if (!fileType) {
      toast.info("Please select a file");
      return;
    }
    if (fileType == "image") {
      res = await fetch(SERVER_URL + "/ocr", {
        method: "POST",
        body: formdata,
        credentials: "include",
      });
    }
    if (fileType == "pdf") {
      res = await fetch(SERVER_URL + "/pdf", {
        method: "POST",
        body: formdata,
        credentials: "include",
      });
    }
    if (fileType == "docs") {
      res = await fetch(SERVER_URL + "/docs", {
        method: "POST",
        body: formdata,
        credentials: "include",
      });
    }
    const data = await res.json();
    if (!data.success) {
      console.log(data.errorType);
      if (data.errorType === "AUTH") {
        router.push("/login");
      } else {
        return data.message;
      }
    }
    setRawText(data.text);
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
        res = await ExtractText(file);
        ttl = "Extract Text";
        break;
      case "bulletFormat":
        res = await sendToBackground(rawText, action);
        ttl = "Bullet Format";
        break;
      case "Polish_Text":
        res = await sendToBackground(rawText, action);
        ttl = "Polish Text";
        break;
      case "grammer_spell_Check":
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
    navigator.clipboard.writeText(result).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const actions = [
    {
      id: "extract-Text",
      label: "Extract Text",
      icon: "📝",
      desc: "Pull text from images",
    },
    { id: "summarize", label: "Summarize", icon: "📊", desc: "Get key points" },
    {
      id: "bulletFormat",
      label: "Bullet Points",
      icon: "•",
      desc: "Format as list",
    },
    { id: "Polish_Text", label: "Polish", icon: "✨", desc: "Improve writing" },
    {
      id: "grammer_spell_Check",
      label: "Grammar Check",
      icon: "✓",
      desc: "Fix errors",
    },
    {
      id: "humanize",
      label: "Humanise Content",
      icon: "👱",
      desc: "look real",
    },
    {
      id: "translate",
      label: "Translate",
      icon: "🌐",
      desc: "Into English",
    },
    { id: "explain", label: "Explain", icon: "💡", desc: "Clarify content" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-12 text-center"></div>

      {/* Main App Card */}
      <div className="max-w-6xl mx-auto  px-6 pb-20">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
          {/* Input Section */}
          <div className="p-8 border-b border-slate-100 ">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Input</h2>
                <p className="text-sm text-slate-500">
                  Paste text or upload an image
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Text Input */}
              <div className="relative">
                <textarea
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  placeholder="Type or paste your text here..."
                  className={`w-full h-48 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl resize-none text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${rawText?.length >= (user?.tokens || 0) * 4 && isLoggedIn ? "focus:ring-red-500" : "focus:ring-indigo-500"}  focus:border-transparent transition`}
                />
                <div className="absolute bottom-3 right-3 text-xs text-slate-400">
                  {rawText?.length} characters
                </div>
                <button
                  className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white text-xs rounded-md hover:bg-red-600"
                  onClick={() => setRawText("")}
                >
                  clear
                </button>
                <div
                  className={`${
                    rawText?.length >= (user?.tokens || 0) * 4 && isLoggedIn
                      ? "absolute"
                      : "hidden"
                  } bottom-3 left-3 text-xs text-red-600`}
                >
                  Not enough credits
                </div>
              </div>

              {/* Image Upload */}
              <div className="relative">
                <input
                  type="file"
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/50 transition group"
                >
                  {preview ? (
                    fileType === "image" ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : fileType === "pdf" ? (
                      <iframe
                        src={preview}
                        className="w-full h-full rounded-xl"
                        title="PDF Preview"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full">
                        <span className="text-5xl">📄</span>
                        <p className="mt-2 font-semibold text-sm text-center px-2">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          DOC/DOCX file selected
                        </p>
                      </div>
                    )
                  ) : (
                    <>
                      <Image className="w-10 h-10 text-slate-400 group-hover:text-indigo-500 mb-3 transition" />
                      <span className="text-sm font-medium text-slate-600 group-hover:text-indigo-600">
                        Click to upload files
                      </span>
                      <span className="text-xs text-slate-400 mt-1">
                        PNG, JPG, WEBP, PDF, DOCS up to 10MB
                      </span>
                    </>
                  )}
                </label>
                {preview && (
                  <button
                    onClick={() => {
                      setFile(null);
                      setpreview(null);
                    }}
                    className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white text-xs rounded-md hover:bg-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>

          {loading && (
            <div className="p-8 border-t border-slate-200 bg-slate-50">
              <div className="flex items-center justify-center gap-3 text-indigo-600">
                <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm font-medium">
                  Processing your request...
                </span>
                <button
                  onClick={() => cancelRequest()}
                  className="text-sm font-medium bg-red-500 p-3 cursor-pointer hover:bg-red-400 text-white rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Actions Section */}
          <div className="p-8 bg-slate-50/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Actions
                </h2>
                <p className="text-sm text-slate-500">
                  Choose how to process your content
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {actions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => selectAction(action.id)}
                  disabled={loading}
                  className={`p-4 rounded-xl border-2 transition text-left disabled:opacity-50 disabled:cursor-not-allowed ${
                    activeAction === action.id
                      ? "border-indigo-500 bg-indigo-50 shadow-sm"
                      : "border-slate-200 bg-white hover:border-indigo-300 hover:shadow-sm"
                  }`}
                >
                  <div className="text-2xl mb-2">{action.icon}</div>
                  <div className="text-sm font-semibold text-slate-900">
                    {action.label}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {action.desc}
                  </div>
                </button>
              ))}
            </div>

            {/* Download Actions */}
            <div className="border-t border-slate-200 pt-6 mt-6">
              <h3 className="text-sm font-medium text-slate-700 mb-3">
                Export Options
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => selectAction("downloadTxt")}
                  disabled={!rawText || loading}
                  className="p-3 bg-white border border-slate-200 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition disabled:opacity-50 disabled:cursor-not-allowed text-center"
                >
                  <FileText className="w-5 h-5 text-slate-600 mx-auto mb-1" />
                  <span className="text-xs font-medium text-slate-700">
                    TXT
                  </span>
                </button>
                <button
                  onClick={() => selectAction("downloadPdf")}
                  disabled={!rawText || loading}
                  className="p-3 bg-white border border-slate-200 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition disabled:opacity-50 disabled:cursor-not-allowed text-center"
                >
                  <FileType2 className="w-5 h-5 text-slate-600 mx-auto mb-1" />
                  <span className="text-xs font-medium text-slate-700">
                    PDF
                  </span>
                </button>
                <button
                  onClick={() => selectAction("downloadDocx")}
                  disabled={!rawText || loading}
                  className="p-3 bg-white border border-slate-200 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition disabled:opacity-50 disabled:cursor-not-allowed text-center"
                >
                  <File className="w-5 h-5 text-slate-600 mx-auto mb-1" />
                  <span className="text-xs font-medium text-slate-700">
                    DOCX
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="p-8 border-t border-slate-200 bg-slate-50">
              <div className="flex items-center justify-center gap-3 text-indigo-600">
                <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm font-medium">
                  Processing your request...
                </span>
                <button
                  onClick={() => cancelRequest()}
                  className="text-sm font-medium bg-red-500 p-3 cursor-pointer hover:bg-red-400 text-white rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Results Section */}
          {result && !loading && (
            <div className="p-8 border-t border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      {title}
                    </h2>
                    <p className="text-sm text-slate-500">
                      Your processed content
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={copyResult}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition flex items-center gap-2"
                  >
                    {copied ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>

              <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl max-h-96 overflow-y-auto">
                <pre className="whitespace-pre-wrap font-sans text-slate-800 leading-relaxed">
                  {result}
                </pre>
              </div>

              <div className="mt-4 flex gap-2 flex-wrap">
                <button
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition flex items-center gap-2"
                  onClick={() => downloadAsTxt(result)}
                >
                  <FileText className="w-4 h-4" />
                  Download TXT
                </button>
                <button
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition flex items-center gap-2"
                  onClick={() => downloadAsPdf(result)}
                >
                  <FileType2 className="w-4 h-4" />
                  Download PDF
                </button>
                <button
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition flex items-center gap-2"
                  onClick={() => downloadAsDocx(result)}
                >
                  <File className="w-4 h-4" />
                  Download DOCX
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <About />
    </div>
  );
}
