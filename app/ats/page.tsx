"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { analyzeResume, type ATSAnalysis } from "@/lib/atsAnalysis";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function ATSPage() {
  const [resumeText, setResumeText] = useState("");
  const [analysis, setAnalysis] = useState<ATSAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "keywords" | "recommendations">("overview");

  const handleAnalyze = useCallback(async () => {
    if (!resumeText.trim()) return;
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const result = analyzeResume(resumeText);
      setAnalysis(result);
      setIsAnalyzing(false);
    }, 2000);
  }, [resumeText]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600 bg-emerald-100";
    if (score >= 60) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Needs Work";
    return "Poor";
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
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Resume ATS Analyzer</h1>
          <p className="text-slate-600 text-lg">Upload your resume and get actionable feedback to improve your ATS score</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Card className="mb-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Paste Your Resume</h2>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume text here...&#10;&#10;Example:&#10;John Smith&#10;Email: john@example.com&#10;Phone: (555) 123-4567&#10;&#10;Experience&#10;Senior Developer at Tech Corp (2020-2024)&#10;- Led team of 5 developers&#10;- Increased code deployment frequency by 40%&#10;- Improved system performance by 60%"
                className="w-full h-80 border border-slate-300 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none font-mono text-sm"
              />
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-slate-500">{resumeText.length} characters</p>
                <Button
                  variant="primary"
                  onClick={handleAnalyze}
                  loading={isAnalyzing}
                  disabled={!resumeText.trim()}
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
                </Button>
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold text-slate-900 mb-3">What is ATS?</h3>
              <p className="text-sm text-slate-600 mb-4">
                Applicant Tracking Systems (ATS) are used by 98% of Fortune 500 companies to filter job applications. 
                Our analyzer checks how well your resume would perform against these systems.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="font-medium text-slate-800 text-sm">Keyword Analysis</p>
                  <p className="text-xs text-slate-500">Checks for industry-relevant keywords</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="font-medium text-slate-800 text-sm">Format Score</p>
                  <p className="text-xs text-slate-500">Validates resume structure</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="font-medium text-slate-800 text-sm">Readability</p>
                  <p className="text-xs text-slate-500">Ensures easy parsing</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="font-medium text-slate-800 text-sm">Impact Score</p>
                  <p className="text-xs text-slate-500">Reviews achievement metrics</p>
                </div>
              </div>
            </Card>
          </div>

          <div>
            {analysis ? (
              <div className="space-y-6">
                <Card className="text-center">
                  <div className="mb-4">
                    <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full ${getScoreColor(analysis.overallScore)}`}>
                      <span className="text-3xl font-bold">{analysis.overallScore}</span>
                      <span className="font-medium">/ 100</span>
                    </div>
                    <p className="text-xl font-semibold text-slate-900 mt-4">{getScoreLabel(analysis.overallScore)}</p>
                    <p className="text-sm text-slate-500">ATS Compatibility Score</p>
                  </div>
                  <div className="grid grid-cols-5 gap-3 mt-8">
                    {Object.entries(analysis.breakdown).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center ${getScoreColor(value)}`}>
                          <span className="font-bold text-lg">{value}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">{key.replace("Score", "")}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                <div className="flex gap-2">
                  {(["overview", "keywords", "recommendations"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === tab
                          ? "bg-indigo-600 text-white"
                          : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>

                {activeTab === "overview" && (
                  <Card>
                    <h3 className="font-semibold text-slate-900 mb-4">Analysis Overview</h3>
                    
                    {analysis.strengths.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-emerald-600 mb-3">Your Strengths</h4>
                        <ul className="space-y-2">
                          {analysis.strengths.map((strength, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                              <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {analysis.weaknesses.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-red-600 mb-3">Areas for Improvement</h4>
                        <ul className="space-y-2">
                          {analysis.weaknesses.map((weakness, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                              <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                              </svg>
                              {weakness}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </Card>
                )}

                {activeTab === "keywords" && (
                  <Card>
                    <h3 className="font-semibold text-slate-900 mb-4">Keyword Analysis</h3>
                    
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-emerald-600 mb-3">Keywords Found ({analysis.keywordAnalysis.found.length})</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysis.keywordAnalysis.found.map((keyword, i) => (
                          <span key={i} className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-amber-600 mb-3">Missing Keywords</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysis.keywordAnalysis.missing.map((keyword, i) => (
                          <span key={i} className="px-3 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                )}

                {activeTab === "recommendations" && (
                  <Card>
                    <h3 className="font-semibold text-slate-900 mb-4">Recommendations</h3>
                    <div className="space-y-4">
                      {analysis.recommendations.map((rec, i) => (
                        <div
                          key={i}
                          className={`p-4 rounded-xl ${
                            rec.priority === "high"
                              ? "bg-red-50 border border-red-200"
                              : rec.priority === "medium"
                              ? "bg-yellow-50 border border-yellow-200"
                              : "bg-blue-50 border border-blue-200"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`px-2 py-0.5 rounded text-xs font-medium uppercase ${
                              rec.priority === "high"
                                ? "bg-red-100 text-red-700"
                                : rec.priority === "medium"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-blue-100 text-blue-700"
                            }`}>
                              {rec.priority}
                            </span>
                            <h4 className="font-medium text-slate-900">{rec.title}</h4>
                          </div>
                          <p className="text-sm text-slate-600">{rec.description}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </div>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <div className="text-center py-16">
                  <div className="w-28 h-28 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-14 h-14 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-900 mb-3">Ready to Analyze</h3>
                  <p className="text-slate-500 max-w-sm mx-auto">
                    Paste your resume text on the left and click &quot;Analyze Resume&quot; to get your ATS score and personalized recommendations.
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
