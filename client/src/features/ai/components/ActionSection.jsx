import React from "react";
import { actions } from "@/features/ai/constants/actions";
import { File, FileText, FileType2 } from "lucide-react";

export default function ActionSection({rawText, selectAction, loading, activeAction }) {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => selectAction(action.id)}
            disabled={loading}
            className={`p-4 rounded-xl relative border-2 transition text-left disabled:opacity-50 disabled:cursor-not-allowed ${
              activeAction === action.id
                ? "border-indigo-500 bg-indigo-50 shadow-sm"
                : "border-slate-200 bg-white hover:border-indigo-300 hover:shadow-sm"
            }`}
          >
            {action.isFree ? (
              <div className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                Free
              </div>
            ) : (
              <div className="w-5 h-5 absolute top-2 right-2 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white text-sm font-bold">
                ⚡
              </div>
            )}
            <div className="text-2xl mb-2">{action.icon}</div>
            <div className="text-sm font-semibold text-slate-900">
              {action.label}
            </div>
            <div className="text-xs text-slate-500 mt-1">{action.desc}</div>
          </button>
        ))}
      </div>

      {/* Download Actions */}
      <div className="border-t border-slate-200 pt-6 mt-6">
        <div className="w-10 bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
          Free
        </div>
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
            <span className="text-xs font-medium text-slate-700">TXT</span>
          </button>
          <button
            onClick={() => selectAction("downloadPdf")}
            disabled={!rawText || loading}
            className="p-3 bg-white border border-slate-200 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition disabled:opacity-50 disabled:cursor-not-allowed text-center"
          >
            <FileType2 className="w-5 h-5 text-slate-600 mx-auto mb-1" />
            <span className="text-xs font-medium text-slate-700">PDF</span>
          </button>
          <button
            onClick={() => selectAction("downloadDocx")}
            disabled={!rawText || loading}
            className="p-3 bg-white border border-slate-200 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition disabled:opacity-50 disabled:cursor-not-allowed text-center"
          >
            <File className="w-5 h-5 text-slate-600 mx-auto mb-1" />
            <span className="text-xs font-medium text-slate-700">DOCX</span>
          </button>
        </div>
      </div>
    </>
  );
}
