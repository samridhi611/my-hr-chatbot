// interface ChatMessageProps {
//   role: "user" | "assistant";
//   content: string;
// }

// export default function ChatMessage({ role, content }: ChatMessageProps) {
//   const isUser = role === "user";

//   return (
//     <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
//       <div
//         className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow-sm ${
//           isUser
//             ? "bg-[#002d72] text-white rounded-br-none"
//             : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"
//         }`}
//       >
//         {content}
//       </div>
//     </div>
//   );
// }

"use client";

"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export default function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl text-[15px] shadow-sm leading-normal ${
          isUser
            ? "bg-[#002d72] text-white rounded-br-none"
            : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"
        }`}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // ✅ Bold text
            strong: ({ node, ...props }) => (
              <strong
                className={`${
                  isUser ? "text-yellow-200" : "text-gray-900"
                } font-semibold`}
                {...props}
              />
            ),

            // ✅ Ordered List (numbered)
            ol: ({ node, ...props }) => (
              <ol
                className="list-decimal ml-5 space-y-0.5 leading-snug mb-2"
                {...props}
              />
            ),

            // ✅ Unordered List (bulleted)
            ul: ({ node, ...props }) => (
              <ul
                className="list-disc ml-5 space-y-0.5 leading-snug"
                {...props}
              />
            ),

            // ✅ List item
            li: ({ node, ...props }) => (
              <li className="pl-1 text-[14px]" {...props} />
            ),

            // ✅ Paragraphs — tighten vertical gaps
            p: ({ node, ...props }) => (
              <p className="mb-1.5 last:mb-0 leading-snug" {...props} />
            ),

            // ✅ Links
            a: ({ node, ...props }) => (
              <a
                className="text-[#002d72] underline hover:text-blue-800"
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}

