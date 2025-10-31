"use client";
import { useState, KeyboardEvent } from "react";
import { Send } from "lucide-react";

export default function ChatBox({ onSend }: { onSend: (msg: string) => void }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // prevent newline
      handleSubmit(e as any); // send message
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-start gap-2 bg-white border border-gray-300 rounded-2xl px-3 py-2 shadow-sm"
    >
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask HR anything..."
        rows={3}
        className="flex-1 resize-none outline-none text-sm bg-transparent placeholder-gray-400"
      />
      <button
        type="submit"
        className="p-2 rounded-lg bg-[#002d72] text-white hover:bg-[#013b91] transition"
      >
        <Send className="w-4 h-4" />
      </button>
    </form>
  );
}
