import React, { useState, useRef } from "react";

export default function App() {
  const SERVER_URL = "https://viseverse.onrender.com";

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
        body: JSON.stringify({ text, action }),
      });
      if (!res.ok) return "Error processing request";
      const data = await res.json();
      return data.data;
    } catch (err) {
      return "Server error";
    }
  }

  async function downloadAsPdf(rawText) {
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
    a.download = "SnapGuruResult.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  }

  async function downloadAsDocx(rawText) {
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
    a.download = "SnapGuruResult.docx";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  }

  async function downloadAsTxt(rawText) {
    setLoading(true);
    const response = await fetch(SERVER_URL + "/downloadTxt", {
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
    a.download = "SnapGuruResult.txt";
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
      case "numericFormat":
        res = await sendToBackground(rawText, action);
        ttl = "Numeric Format";
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
      <div className="container">
        <div className="header">
          <h1>📸 ViseVerse</h1>
          <p>Upload a text and extract, analyze, or translate text with AI</p>
        </div>

        <div className="main-content">
          <div className="upload-section">
            <textarea
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="Drop your text..."
            />
          </div>

          <input
            type="file"
            className="uploadimage"
            accept="image/*"
            id="imagefile"
            onChange={handleImageChange}
          />
          <label htmlFor="imagefile" className="upload-label">
            Upload Image
          </label>
          <img
            ref={previewRef}
            style={{ width: "100%", display: "none" }}
            alt="preview"
          />

          <div className="options-section">
            <h3 style={{ marginBottom: "20px", color: "#495057" }}>
              Choose an action:
            </h3>
            <div className="options-grid">
              {[
                { action: "extract-Text", label: "Extract Text", icon: "✂️" },
                { action: "summarize", label: "Summarize", icon: "🔍" },
                { action: "bulletFormat", label: "Bullet Points", icon: "🅱️" },
                {
                  action: "numericFormat",
                  label: "Numerical Points",
                  icon: "🔢",
                },
                {
                  action: "grammer_spell-Check",
                  label: "Grammar / Spell Check",
                  icon: "☑️",
                },
                { action: "translate", label: "Translate", icon: "🌐" },
                { action: "explain", label: "Explain", icon: "🧠" },
                {
                  action: "downloadTxt",
                  label: "Download as text",
                  icon: "📄",
                },
                { action: "downloadPdf", label: "Download as Pdf", icon: "📁" },
                {
                  action: "downloadDocx",
                  label: "Download as Docx",
                  icon: "📃",
                },
              ].map((btn) => (
                <div
                  key={btn.action}
                  className={`option-btn ${
                    activeAction === btn.action ? "active" : ""
                  }`}
                  onClick={() => selectAction(btn.action)}
                >
                  <span className="icon">{btn.icon}</span>
                  {btn.label}
                </div>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="loading">Processing your request...</div>
          ) : (
            ""
          )}
          <div
            className="result-container"
            style={{ display: result ? "block" : "none" }}
          >
            <div className="result-header">
              <div className="result-title">{title}</div>
            </div>
            <div className="result-content">{result}</div>
            <button
              title="Copy to Clipboard"
              className="copy-btn"
              onClick={copyResult}
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
