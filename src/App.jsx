import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatMessage from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";
import TypingDots from "./components/TypingDots";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [provider, setProvider] = useState("free"); // default free
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function handleSend(content) {
    setError(null);
    const userMsg = { id: Date.now()+"-u", role:"user", content };
    setMessages((m)=>[...m, userMsg]);
    setSending(true);

    try {
      const res = await fetch(`/api/${provider}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: content, messages }),
      });
      if(!res.ok) throw new Error("API error");
      const data = await res.json();
      const aiMsg = { id: Date.now()+"-ai", role:"ai", content: data.text || "[No response]" };
      setMessages((m)=>[...m, aiMsg]);
    } catch (e) {
      setError(e.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl h-[80vh] bg-white border rounded-2xl shadow-xl flex flex-col overflow-hidden">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h1 className="text-lg font-bold">AI Chatbot</h1>
          <select value={provider} onChange={e=>setProvider(e.target.value)} className="border rounded px-2 py-1 text-sm">
            <option value="openai">OpenAI GPT</option>
            <option value="gemini">Gemini</option>
            <option value="free">Free Model</option>
          </select>
        </div>
        <div ref={scrollRef} className="flex-1 overflow-auto p-6 space-y-2">
          <AnimatePresence initial={false} mode="popLayout">
            {messages.map(m=><ChatMessage key={m.id} message={m}/>)}
          </AnimatePresence>
          {sending && <TypingDots />}
        </div>
        {error && <div className="px-4 py-2 bg-red-100 text-red-700 text-sm">Error: {error}</div>}
        <ChatInput onSend={handleSend} sending={sending} />
      </div>
    </div>
  );
}
