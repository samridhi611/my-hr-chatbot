export default function ChatIntro({
  onSend,
}: {
  onSend: (msg: string) => void;
}) {
  const predefinedQuestions = [
    "How can I apply for leave?",
    "How can I check my remaining leave balance?",
    "What types of leave are available?",
    "What is the approval process for leave requests?",
  ];

  return (
    <div className="flex flex-col items-center justify-center text-center mt-20">
      <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-8 max-w-lg">
        <h2 className="text-xl font-semibold text-[#002d72] mb-2">
          SK Finance HR Assistant
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          I’m your virtual HR chatbot. Select a question below or type your own
          query to get started.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {predefinedQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => onSend(q)}
              className="border border-gray-300 bg-white text-gray-700 rounded-lg px-4 py-2 text-sm hover:bg-[#f0f4f8] transition text-left"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
