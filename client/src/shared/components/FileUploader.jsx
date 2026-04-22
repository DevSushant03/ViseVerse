import { Image } from "lucide-react";
import React from "react";

export default function FileUploader({
  file,
  setFile,
  preview,
  setpreview,
  handleFileChange,
  fileType,
}) {
  return (
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
              <p className="text-xs text-gray-500">DOC/DOCX file selected</p>
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
  );
}
