import React from "react";

export default function TypingDots(){
  return (
    <div className="inline-flex items-center gap-1 px-3 py-2 bg-gray-100 rounded-xl">
      <span className="w-2 h-2 rounded-full animate-pulse bg-gray-400" />
      <span className="w-2 h-2 rounded-full animate-pulse bg-gray-400 delay-75" />
      <span className="w-2 h-2 rounded-full animate-pulse bg-gray-400 delay-150" />
    </div>
  );
}
