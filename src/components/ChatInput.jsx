import React, { useState } from "react";

export default function ChatInput({ onSend, sending }) {
  const [text, setText] = useState("");

  function submit(){
    if(!text.trim()) return;
    onSend(text.trim());
    setText("");
  }

  return (
    <div className="px-4 py-3 border-t bg-white flex gap-2">
      <textarea rows={1} value={text} onChange={e=>setText(e.target.value)} placeholder={sending ? "Waiting..." : "Type a message"} disabled={sending}
        className="flex-1 resize-none rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"/>
      <button onClick={submit} disabled={sending||!text.trim()} className="px-4 py-2 rounded-xl bg-indigo-600 text-white disabled:opacity-50">Send</button>
    </div>
  );
}
