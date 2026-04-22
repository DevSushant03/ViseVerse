import {
  downloadAsDocx,
  downloadAsPdf,
  downloadAsTxt,
} from "@/features/filesAndDocument/download_services";
import { Check, Copy, File, FileText, FileType2 } from "lucide-react";
import React from "react";

export default function ResultSection({ title, result, copyResult, copied }) {
  return (
    <div className="p-8 border-t border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
            <Check className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
            <p className="text-sm text-slate-500">Your processed content</p>
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
  );
}
