import React from "react";

export default function Loader() {
  return (
    <div className="flex-col gap-4 w-full flex items-center justify-center">
      <div className="w-9 h-9 border-2 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-purple-400 rounded-full">
        <div className="w-7 h-7 border-2 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"></div>
      </div>
    </div>
  );
}
