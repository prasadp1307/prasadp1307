"use client";

import { useState, useRef, useEffect } from "react";
import Button from "./ui/Button";

type Message = {
  text: string;
  sender: "user" | "bot";
};

const BOT_RESPONSES: Record<string, string> = {
  "hello": "Hi there! Welcome to JobBoard. How can I help you today?",
  "jobs": "We have over 40 active job listings from top companies like Google, Amazon, and Razorpay. Check them out in the 'Browse Jobs' section!",
  "apply": "To apply for a job, just click on any job listing and press the 'Apply Now' button. Make sure you are logged in first!",
  "recruit": "As an employer, you can post a job by navigating to the 'Post a Job' section in your dashboard.",
  "contact": "You can reach our support team at support@jobboard.ai",
  "default": "I'm sorry, I didn't quite catch that. Try asking about 'jobs', 'apply', or 'hello'!",
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! I'm your JobBoard assistant. Ask me anything about finding or posting jobs!", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { text: userMessage, sender: "user" }]);
    setInput("");

    // Simulate bot thinking
    setTimeout(() => {
      const lowerInput = userMessage.toLowerCase();
      let botResponse = BOT_RESPONSES.default;

      if (lowerInput.includes("hello") || lowerInput.includes("hi")) botResponse = BOT_RESPONSES.hello;
      else if (lowerInput.includes("job") || lowerInput.includes("openings")) botResponse = BOT_RESPONSES.jobs;
      else if (lowerInput.includes("apply") || lowerInput.includes("how to")) botResponse = BOT_RESPONSES.apply;
      else if (lowerInput.includes("recruit") || lowerInput.includes("post")) botResponse = BOT_RESPONSES.recruit;
      else if (lowerInput.includes("contact") || lowerInput.includes("support")) botResponse = BOT_RESPONSES.contact;

      setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-6 text-white">
            <h3 className="font-bold text-lg">JobBoard Assistant</h3>
            <p className="text-xs text-indigo-100 flex items-center gap-1">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              Online | Usually responds instantly
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 h-96 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    m.sender === "user"
                      ? "bg-indigo-600 text-white rounded-tr-none"
                      : "bg-white text-slate-800 rounded-tl-none border border-slate-100"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-slate-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleSend}
                className="bg-indigo-600 text-white p-2 rounded-xl hover:bg-indigo-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
          isOpen ? "bg-slate-800 rotate-90" : "bg-indigo-600 hover:bg-indigo-700 hover:scale-110"
        } text-white`}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>
    </div>
  );
}
