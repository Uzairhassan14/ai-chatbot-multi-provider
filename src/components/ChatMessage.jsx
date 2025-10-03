import React from "react";
import { motion } from "framer-motion";

export default function ChatMessage({ message }) {
  const isUser = message.role === "user";
  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} layout
      className={`w-full flex ${isUser ? "justify-end" : "justify-start"} my-2`}>
      <div className={`max-w-[80%] px-4 py-2 rounded-2xl shadow-sm text-sm ${isUser ? "bg-indigo-600 text-white rounded-br-none" : "bg-gray-100 text-gray-900 rounded-bl-none"}`}>
        <div>{message.content}</div>
      </div>
    </motion.div>
  );
}
