import React from "react";

export default function InputSection({
  rawText,
  setRawText,
  user,
  isLoggedIn,
}) {
  return (
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
  );
}
