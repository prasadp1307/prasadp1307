export interface ATSAnalysis {
  overallScore: number;
  breakdown: {
    keywordOptimization: number;
    formatScore: number;
    readabilityScore: number;
    impactScore: number;
    completenessScore: number;
  };
  strengths: string[];
  weaknesses: string[];
  recommendations: {
    priority: "high" | "medium" | "low";
    title: string;
    description: string;
  }[];
  keywordAnalysis: {
    found: string[];
    missing: string[];
    suggestions: string[];
  };
  formattingCheck: {
    passed: boolean;
    issues: string[];
  };
  atsCompatibility: {
    score: number;
    tips: string[];
  };
}

export const atsKeywords = [
  "leadership",
  "project management",
  "team collaboration",
  "problem solving",
  "communication",
  "analytical",
  "strategic",
  "innovative",
  "agile",
  "scrum",
  "stakeholder",
  "metrics",
  "roi",
  "performance",
  "optimization",
  "implementation",
  "architecture",
  "deployment",
  "automation",
  "ci/cd",
];

export function analyzeResume(text: string): ATSAnalysis {
  const lowerText = text.toLowerCase();
  
  const keywordFound = atsKeywords.filter(keyword => 
    lowerText.includes(keyword.toLowerCase())
  );
  
  const keywordMissing = atsKeywords.filter(keyword => 
    !lowerText.includes(keyword.toLowerCase())
  );

  const wordCount = text.split(/\s+/).filter(w => w.length > 0).length;
  const hasContactInfo = /email|phone|@\b/.test(lowerText);
  const hasExperience = /experience|work|position|role|company/.test(lowerText);
  const hasEducation = /education|degree|bachelor|master|university|college/.test(lowerText);
  const hasSkills = /skills|technologies|tools|programming|languages/.test(lowerText);
  
  const sections = [hasContactInfo, hasExperience, hasEducation, hasSkills].filter(Boolean).length;
  
  const completenessScore = Math.min(100, sections * 25 + (wordCount > 300 ? 10 : wordCount / 30));

  const keywordScore = Math.min(100, (keywordFound.length / atsKeywords.length) * 100 + 20);

  const formatIssues: string[] = [];
  let formatScore = 100;
  
  if (text.length > 8000) {
    formatIssues.push("Resume is too long - consider condensing to 1-2 pages");
    formatScore -= 15;
  }
  if (text.length < 300) {
    formatIssues.push("Resume may be too short - add more relevant details");
    formatScore -= 20;
  }
  if (!hasContactInfo) {
    formatIssues.push("Missing contact information (email, phone)");
    formatScore -= 25;
  }

  const bullets = (text.match(/[-•*]\s/g) || []).length;
  const readabilityScore = Math.min(100, 50 + bullets * 5 + (wordCount > 500 ? 20 : wordCount / 25));

  const impactWords = /increased|decreased|improved|reduced|achieved|delivered|led|managed|won|launched/.test(lowerText);
  const numbers = (text.match(/\d+%/g) || []).length + (text.match(/\$[\d,]+/g) || []).length;
  const impactScore = Math.min(100, (impactWords ? 40 : 0) + (numbers * 15) + (bullets > 5 ? 20 : bullets * 4));

  const strengths: string[] = [];
  if (keywordFound.length > 10) strengths.push("Strong use of industry keywords");
  if (hasContactInfo) strengths.push("Complete contact information");
  if (impactWords) strengths.push("Includes quantifiable achievements");
  if (bullets > 5) strengths.push("Good use of bullet points");
  if (sections >= 3) strengths.push("Well-structured sections");

  const weaknesses: string[] = [];
  if (keywordMissing.length > 10) weaknesses.push("Missing many industry-relevant keywords");
  if (!impactWords) weaknesses.push("Lacks quantifiable achievements");
  if (numbers === 0) weaknesses.push("No metrics or numbers to show impact");
  if (wordCount < 300) weaknesses.push("Resume may be too brief");

  const recommendations: ATSAnalysis["recommendations"] = [];
  
  if (keywordMissing.length > 5) {
    recommendations.push({
      priority: "high",
      title: "Add Missing Keywords",
      description: `Include these relevant terms: ${keywordMissing.slice(0, 5).join(", ")}`,
    });
  }
  
  if (!impactWords || numbers === 0) {
    recommendations.push({
      priority: "high",
      title: "Add Quantifiable Achievements",
      description: "Include specific numbers, percentages, and metrics to demonstrate impact",
    });
  }
  
  if (formatIssues.length > 0) {
    recommendations.push({
      priority: "medium",
      title: "Improve Formatting",
      description: formatIssues[0],
    });
  }
  
  if (wordCount < 400) {
    recommendations.push({
      priority: "medium",
      title: "Add More Details",
      description: "Consider expanding your experience descriptions with more context",
    });
  }

  const keywordSuggestions = keywordMissing
    .slice(0, 5)
    .map(k => `Consider adding "${k}" if relevant to your experience`);

  const overallScore = Math.round(
    keywordScore * 0.3 +
    formatScore * 0.15 +
    readabilityScore * 0.2 +
    impactScore * 0.2 +
    completenessScore * 0.15
  );

  return {
    overallScore,
    breakdown: {
      keywordOptimization: Math.round(keywordScore),
      formatScore: Math.round(formatScore),
      readabilityScore: Math.round(readabilityScore),
      impactScore: Math.round(impactScore),
      completenessScore: Math.round(completenessScore),
    },
    strengths,
    weaknesses,
    recommendations,
    keywordAnalysis: {
      found: keywordFound,
      missing: keywordMissing.slice(0, 10),
      suggestions: keywordSuggestions,
    },
    formattingCheck: {
      passed: formatIssues.length === 0,
      issues: formatIssues,
    },
    atsCompatibility: {
      score: overallScore,
      tips: overallScore > 70 
        ? ["Your resume is well-optimized for ATS systems", "Keep refining your keyword usage"]
        : overallScore > 50
        ? ["Consider the recommendations to improve your ATS score", "Focus on adding relevant keywords"]
        : ["Significant improvements needed for ATS compatibility", "Review all high-priority recommendations"],
    },
  };
}
