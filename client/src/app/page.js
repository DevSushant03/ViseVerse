"use client";
import { useState, useContext } from "react";
import { useAiActions } from "@/features/ai/hooks/uiAiAction";
import { FileText, Sparkles } from "lucide-react";
import About from "../shared/components/About";
import { AppContext } from "@/context/AppContext";
import { ExtractText } from "@/features/filesAndDocument/Extract_services";
import {
  downloadAsDocx,
  downloadAsPdf,
  downloadAsTxt,
} from "@/features/filesAndDocument/download_services";
import InputSection from "@/features/ai/components/InputSection";
import FileUploader from "@/shared/components/FileUploader";
import LoadingSnipper from "@/shared/components/LoadingSnipper";
import ActionSection from "@/features/ai/components/ActionSection";
import ResultSection from "@/features/ai/components/ResultSection";

export default function Home() {
  const { setUser, user, isLoggedIn } = useContext(AppContext);
  const { result, setResult, sendToAi, cancelRequest } = useAiActions();

  const [rawText, setRawText] = useState("");
  const [title, setTitle] = useState("Result");
  const [loading, setLoading] = useState(false);
  const [activeAction, setActiveAction] = useState("");
  const [copied, setCopied] = useState(false);

  const [file, setFile] = useState(null);
  const [preview, setpreview] = useState(null);
  const [fileType, setfileType] = useState("");

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

  const selectAction = async (action) => {
    setActiveAction(action);
    setLoading(true);
    let res = "";
    let ttl = "";

    switch (action) {
      case "summarize":
        res = await sendToAi(rawText, action);
        ttl = "Text Summary";
        break;
      case "extract-Text":
        res = await ExtractText(fileType, file);
        ttl = "Extract Text";
        break;
      case "bulletFormat":
        res = await sendToAi(rawText, action);
        ttl = "Bullet Format";
        break;
      case "humanize":
        res = await sendToAi(rawText, action);
        ttl = "humanize";
        break;
      case "Polish_Text":
        res = await sendToAi(rawText, action);
        ttl = "Polish Text";
        break;
      case "grammer_spell_Check":
        res = await sendToAi(rawText, action);
        ttl = "Grammar/Spell Check";
        break;
      case "translate":
        res = await sendToAi(rawText, action);
        ttl = "Translation";
        break;
      case "explain":
        res = await sendToAi(rawText, action);
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
    setResult(res.data);
    setUser(res.user);
    setTitle(ttl);
    setLoading(false);
  };

  const copyResult = () => {
    navigator.clipboard.writeText(result).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

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
              <InputSection
                rawText={rawText}
                setRawText={setRawText}
                user={user}
                isLoggedIn={isLoggedIn}
              />

              {/* Image Upload */}
              <FileUploader
                file={file}
                setFile={setFile}
                preview={preview}
                setpreview={setpreview}
                handleFileChange={handleFileChange}
                fileType={fileType}
              />
            </div>
          </div>

          {loading && (
            <LoadingSnipper
              cancelRequest={() => {
                (cancelRequest, setLoading(false));
              }}
            />
          )}

          {/* Results Section */}
          {result && !loading && (
            <ResultSection
              title={title}
              result={result}
              copyResult={copyResult}
              copied={copied}
            />
          )}

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
            <ActionSection
              selectAction={selectAction}
              rawText={rawText}
              loading={loading}
              activeAction={activeAction}
            />
          </div>
        </div>
      </div>
      <About />
    </div>
  );
}
