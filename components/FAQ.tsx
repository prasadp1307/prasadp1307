"use client";

import { useState } from "react";
import Card from "./ui/Card";

const faqs = [
  {
    question: "How do I apply for a job?",
    answer: "Browse through our job listings, click on a job that interests you, and hit the 'Apply Now' button. You'll need to be logged in and provide a brief cover letter.",
  },
  {
    question: "Is this platform free for job seekers?",
    answer: "Yes! JobBoard is 100% free for candidates to browse and apply for as many roles as they like.",
  },
  {
    question: "How can I post a job as an employer?",
    answer: "Simply log in to your account and navigate to the 'Post a Job' section in the navbar. Fill in the job details, and it will be live immediately.",
  },
  {
    question: "Can I track my applications?",
    answer: "Absolutely. Head over to your Dashboard to see a full history of the jobs you've applied for and their current status.",
  },
  {
    question: "Is my personal data secure?",
    answer: "We take security seriously. All your data is encrypted, and we use secure JWT authentication with HttpOnly cookies to protect your sessions.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 px-4 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-500 text-lg">Everything you need to know about the JobBoard platform</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card
              key={index}
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "ring-2 ring-indigo-500 border-transparent" : "border-slate-100"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-bold text-slate-800 text-lg">{faq.question}</span>
                <span className={`transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}>
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
