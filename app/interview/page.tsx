"use client";

import { useState } from "react";
import Link from "next/link";
import { interviewQuestions, interviewTips, questionCategories, type InterviewQuestion } from "@/lib/interviewData";
import Card from "@/components/ui/Card";

export default function InterviewPage() {
  const [activeCategory, setActiveCategory] = useState<"behavioral" | "technical" | "situational">("behavioral");
  const [selectedQuestion, setSelectedQuestion] = useState<InterviewQuestion | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const currentQuestions = interviewQuestions[activeCategory];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-emerald-100 text-emerald-700";
      case "Medium": return "bg-yellow-100 text-yellow-700";
      case "Hard": return "bg-red-100 text-red-700";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      teamwork: "bg-indigo-100 text-indigo-700",
      "time management": "bg-purple-100 text-purple-700",
      achievements: "bg-emerald-100 text-emerald-700",
      "career goals": "bg-blue-100 text-blue-700",
      "growth mindset": "bg-orange-100 text-orange-700",
      javascript: "bg-yellow-100 text-yellow-700",
      databases: "bg-blue-100 text-blue-700",
      architecture: "bg-purple-100 text-purple-700",
      devops: "bg-green-100 text-green-700",
      "system design": "bg-pink-100 text-pink-700",
      communication: "bg-cyan-100 text-cyan-700",
      "problem solving": "bg-indigo-100 text-indigo-700",
      "self-development": "bg-teal-100 text-teal-700",
    };
    return colors[category.toLowerCase()] || "bg-slate-100 text-slate-700";
  };

  return (
    <div className="min-h-screen pt-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-600 hover:text-indigo-600 mb-6 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Interview Prep</h1>
          <p className="text-slate-600 text-lg">Practice common interview questions with tips and sample answers</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex gap-2 mb-8 flex-wrap">
              {questionCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id as "behavioral" | "technical" | "situational");
                    setSelectedQuestion(null);
                    setShowAnswer(false);
                  }}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeCategory === cat.id
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {cat.name} ({cat.count})
                </button>
              ))}
            </div>

            {selectedQuestion ? (
              <Card className="p-8">
                <button
                  onClick={() => {
                    setSelectedQuestion(null);
                    setShowAnswer(false);
                  }}
                  className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 mb-6 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to questions
                </button>

                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(selectedQuestion.difficulty)}`}>
                      {selectedQuestion.difficulty}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(selectedQuestion.category)}`}>
                      {selectedQuestion.category}
                    </span>
                  </div>
                  <h2 className="text-2xl font-semibold text-slate-900">{selectedQuestion.question}</h2>
                </div>

                {selectedQuestion.scenario && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
                    <p className="text-sm text-amber-800">
                      <span className="font-semibold">Scenario:</span> {selectedQuestion.scenario}
                    </p>
                  </div>
                )}

                {selectedQuestion.tips && selectedQuestion.tips.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-slate-900 mb-3">Tips to Answer</h3>
                    <ul className="space-y-2">
                      {selectedQuestion.tips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-600">
                          <svg className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedQuestion.sampleAnswer && (
                  <div className="mb-6">
                    <button
                      onClick={() => setShowAnswer(!showAnswer)}
                      className="flex items-center gap-2 text-indigo-600 font-medium mb-3"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showAnswer ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                      </svg>
                      {showAnswer ? "Hide Sample Answer" : "Show Sample Answer"}
                    </button>
                    {showAnswer && (
                      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
                        <p className="text-slate-700 whitespace-pre-wrap">{selectedQuestion.sampleAnswer}</p>
                      </div>
                    )}
                  </div>
                )}

                {selectedQuestion.codeExample && (
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-3">Code Example</h3>
                    <pre className="bg-slate-900 text-slate-100 rounded-xl p-5 overflow-x-auto text-sm">
                      <code>{selectedQuestion.codeExample}</code>
                    </pre>
                  </div>
                )}
              </Card>
            ) : (
              <div className="space-y-4">
                {currentQuestions.map((q) => (
                  <Card
                    key={q.id}
                    hover
                    onClick={() => setSelectedQuestion(q)}
                  >
                    <div className="flex items-start justify-between gap-4 p-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`px-2.5 py-0.5 rounded text-xs font-medium ${getDifficultyColor(q.difficulty)}`}>
                            {q.difficulty}
                          </span>
                          <span className={`px-2.5 py-0.5 rounded text-xs font-medium ${getCategoryColor(q.category)}`}>
                            {q.category}
                          </span>
                        </div>
                        <p className="text-slate-900 font-medium text-lg">{q.question}</p>
                      </div>
                      <svg className="w-6 h-6 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-slate-900 mb-5">Quick Tips</h3>
              <div className="space-y-5">
                {interviewTips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-3xl">{tip.icon}</span>
                    <div>
                      <h4 className="font-medium text-slate-800 text-sm">{tip.title}</h4>
                      <p className="text-xs text-slate-500 mt-1">{tip.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-slate-900 mb-5">STAR Method</h3>
              <p className="text-sm text-slate-600 mb-4">
                Structure your answers using the STAR method for behavioral questions.
              </p>
              <div className="space-y-3">
                {[
                  { letter: "S", title: "Situation", desc: "Set the context" },
                  { letter: "T", title: "Task", desc: "Your responsibility" },
                  { letter: "A", title: "Action", desc: "What you did" },
                  { letter: "R", title: "Result", desc: "Outcome achieved" },
                ].map((item) => (
                  <div key={item.letter} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                      {item.letter}
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 text-sm">{item.title}</p>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6">
              <h3 className="font-semibold mb-2">Pro Tip</h3>
              <p className="text-sm text-indigo-100">
                Practice out loud! Speaking your answers helps you articulate thoughts more clearly and builds confidence.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
