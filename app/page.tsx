// // import React from 'react';
// // import ChatBox from '@/components/ChatBot';
// // import Image from 'next/image';

// // export default function Home() {
// //   const userId = 'user-hr-01';
// //   const sessionId = 'session-hr-2025';

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-[#f2f9f5] to-white">
// //       {/* Sticky Navbar */}
// //       <nav className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-200 z-10 px-6 py-3 flex items-center justify-between">
// //         <div className="flex items-center gap-3">
// //           <Image src="/skfinance-logo.png" alt="SK Finance Logo" width={40} height={40} />
// //           <h1 className="text-lg font-semibold text-[#1b4332]">SK Finance HR Bot</h1>
// //         </div>
// //       </nav>

// //       {/* Chat Section */}
// //       <ChatBox userId={userId} sessionId={sessionId} />
// //     </div>
// //   );
// // }

// "use client";
// import { useState } from "react";
// import ChatBox from "../components/ChatBot";
// import ChatMessage from "../components/ChatMessage";
// import ChatIntro from "../components/ChatIntro";

// type Message = {
//   role: 'user' | 'assistant';
//   content: string;
// };


// export default function Home() {
//   const agentId = process.env.NEXT_PUBLIC_LYZR_AGENT_ID
//   const [messages, setMessages] = useState<
//     { role: "user" | "assistant"; content: string }[]
//   >([]);

// const handleSend = async (msg: string) => {
//   // Prevent sending empty messages
//   if (!msg.trim()) return;

//   // Create user message
//   const userMessage: Message = { role: 'user', content: msg };
//   setMessages((prev) => [...prev, userMessage]);

//   try {
//     // Send message to backend API
//     const res = await fetch('/api/chat', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         agentId,
//         userId: 'local-user', // could also use uuid for unique sessions
//         message: msg,
//         sessionId: 'session-1',
//       }),
//     });

//     // Parse response
//     const { reply } = await res.json();

//     // Add assistant reply to chat
//     const botMessage: Message = { role: 'assistant', content: reply };
//     setMessages((prev) => [...prev, botMessage]);
//   } catch (error) {
//     console.error('Chat error:', error);
//     // Show fallback message
//     const errorMessage: Message = {
//       role: 'assistant',
//       content: 'Sorry, something went wrong.',
//     };
//     setMessages((prev) => [...prev, errorMessage]);
//   }
// };

//   return (
//     <div className="flex flex-col h-full max-w-5xl mx-auto px-4 pb-24">
//       {/* Chat messages or intro */}
//       <div className="flex-1 overflow-y-auto space-y-4 py-6">
//         {messages.length === 0 ? (
//           <ChatIntro onSend={handleSend} />
//         ) : (
//           messages.map((m, i) => (
//             <ChatMessage key={i} role={m.role} content={m.content} />
//           ))
//         )}
//       </div>

//       {/* Sticky ChatBox */}
//       <div className="fixed bottom-14 left-0 right-0 flex justify-center bg-[#f2f9f5]/80 backdrop-blur-md">
//         <div className="w-full max-w-3xl px-4 py-2">
//           <ChatBox onSend={handleSend} />
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import ChatBox from "./components/ChatBot";
import ChatMessage from "./components/ChatMessage";
import ChatIntro from "./components/ChatIntro";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Home() {
  const agentId = process.env.NEXT_PUBLIC_LYZR_AGENT_ID;
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false); // 👈 Track loading state

  const handleSend = async (msg: string) => {
    if (!msg.trim()) return;

    const userMessage: Message = { role: "user", content: msg };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true); // 👈 Start loader when sending

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId,
          userId: "local-user",
          message: msg,
          sessionId: "session-1",
        }),
      });

      const { reply } = await res.json();

      const botMessage: Message = { role: "assistant", content: reply };
      console.log("Bot reply:", reply);
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, something went wrong.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false); // 👈 Stop loader when reply or error received
    }
  };

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto px-4 pb-24">
      {/* Chat messages or intro */}
      <div className="flex-1 overflow-y-auto space-y-4 py-6">
        {messages.length === 0 ? (
          <ChatIntro onSend={handleSend} />
        ) : (
          <>
            {messages.map((m, i) => (
              <ChatMessage key={i} role={m.role} content={m.content} />
            ))}

            {/* 👇 Show chat loader when bot is replying */}
            {isLoading && (
              <div className="flex items-center gap-2">
                <div className="p-3 bg-white border border-gray-200  rounded-lg text-gray-800 rounded-bl-none">
                  <div className="flex space-x-1">
                    <span className="w-1 h-1 bg-gray-800 rounded-full animate-bounce"></span>
                    <span className="w-1 h-1 bg-gray-800 rounded-full animate-bounce [animation-delay:-0.2s]"></span>
                    <span className="w-1 h-1 bg-gray-800 rounded-full animate-bounce [animation-delay:-0.4s]"></span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Sticky ChatBox */}
      <div className="fixed bottom-8 left-0 right-0 flex justify-center bg-[#f2f9f5]/80 backdrop-blur-md">
        <div className="w-full max-w-3xl px-4 py-2">
          <ChatBox onSend={handleSend} />
        </div>
      </div>
    </div>
  );
}
