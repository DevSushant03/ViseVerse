import React from "react";

export default function LoadingSnipper({ cancelRequest }) {
  return (
    <div className="p-8 border-t border-slate-200 bg-slate-50">
      <div className="flex items-center justify-center gap-3 text-indigo-600">
        <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm font-medium">Processing your request...</span>
        <button
          onClick={() => cancelRequest()}
          className="text-sm font-medium bg-red-500 p-3 cursor-pointer hover:bg-red-400 text-white rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
