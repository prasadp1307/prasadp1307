export interface InterviewQuestion {
  id: string;
  question: string;
  tips?: string[];
  sampleAnswer?: string;
  category: string;
  difficulty: string;
  scenario?: string;
  codeExample?: string;
}

export const interviewQuestions: Record<string, InterviewQuestion[]> = {
  behavioral: [
    {
      id: "b1",
      question: "Tell me about a time when you had to work with a difficult team member. How did you handle it?",
      tips: ["Focus on the situation and your actions", "Avoid blaming others", "Highlight conflict resolution skills", "Show emotional intelligence"],
      sampleAnswer: "I once worked with a team member who had a very different working style. They preferred detailed specs while I was more agile. I scheduled a 1-on-1 meeting to understand their perspective and we agreed on a middle ground that worked for both of us. This improved our collaboration significantly.",
      category: "Teamwork",
      difficulty: "Medium",
    },
    {
      id: "b2",
      question: "Describe a situation where you had to meet a tight deadline. How did you prioritize?",
      tips: ["Show time management skills", "Demonstrate adaptability", "Explain your decision-making process", "Mention any tools used"],
      sampleAnswer: "During a product launch, we faced a 2-week deadline reduction. I immediately assessed all tasks, identified critical path items, and eliminated non-essential features. I communicated transparently with stakeholders about what could be delivered, and we successfully launched on time with all core features.",
      category: "Time Management",
      difficulty: "Medium",
    },
    {
      id: "b3",
      question: "What is your greatest professional achievement and why?",
      tips: ["Quantify results when possible", "Choose relevant achievements", "Explain the impact", "Keep it professional"],
      sampleAnswer: "I led a project that reduced our API response time by 60%. By implementing caching strategies and optimizing database queries, we not only improved performance but also reduced server costs by 40%. This directly contributed to a 15% increase in user retention.",
      category: "Achievements",
      difficulty: "Easy",
    },
    {
      id: "b4",
      question: "Where do you see yourself in 5 years?",
      tips: ["Show ambition but be realistic", "Align with company goals", "Focus on growth", "Avoid sounding transactional"],
      sampleAnswer: "In 5 years, I see myself growing into a technical leadership role where I can mentor junior developers while continuing to architect scalable solutions. I'm particularly interested in developing expertise in distributed systems and would love to contribute to open-source projects in this space.",
      category: "Career Goals",
      difficulty: "Medium",
    },
    {
      id: "b5",
      question: "Tell me about a time you failed and what you learned from it.",
      tips: ["Be honest but strategic", "Focus on lessons learned", "Show resilience", "Demonstrate self-awareness"],
      sampleAnswer: "Early in my career, I deployed a change without proper testing, causing a production outage. I learned the hard way why CI/CD practices and thorough testing are essential. Now I'm an advocate for best practices and ensure new team members are properly trained on deployment procedures.",
      category: "Growth Mindset",
      difficulty: "Hard",
    },
  ],
  technical: [
    {
      id: "t1",
      question: "Explain the difference between var, let, and const in JavaScript.",
      tips: ["Cover scoping rules", "Mention hoisting", "Explain immutability", "Give examples"],
      category: "JavaScript",
      difficulty: "Easy",
      codeExample: `var x = 1; // function-scoped, can be redeclared
let y = 2; // block-scoped, can be reassigned
const z = 3; // block-scoped, cannot be reassigned`,
    },
    {
      id: "t2",
      question: "What is the difference between SQL and NoSQL databases?",
      tips: ["Cover data models", "Mention scaling", "Discuss use cases", "Explain transactions"],
      category: "Databases",
      difficulty: "Medium",
    },
    {
      id: "t3",
      question: "Explain the concept of microservices architecture and its pros/cons.",
      tips: ["Define microservices", "List advantages", "List disadvantages", "Mention alternatives"],
      category: "Architecture",
      difficulty: "Hard",
    },
    {
      id: "t4",
      question: "What is your experience with CI/CD pipelines?",
      tips: ["Describe tools used", "Explain the process", "Mention automation", "Discuss testing"],
      category: "DevOps",
      difficulty: "Medium",
    },
    {
      id: "t5",
      question: "How would you design a URL shortening service like Bit.ly?",
      tips: ["Cover system design", "Discuss scaling", "Mention caching", "Explain analytics"],
      category: "System Design",
      difficulty: "Hard",
    },
  ],
  situational: [
    {
      id: "s1",
      question: "How would you explain a complex technical concept to a non-technical stakeholder?",
      scenario: "A product manager doesn't understand why a bug fix requires 2 weeks of work.",
      tips: ["Use analogies", "Simplify language", "Visual aids help", "Check understanding"],
      category: "Communication",
      difficulty: "Medium",
    },
    {
      id: "s2",
      question: "You're given a task with unclear requirements. What do you do?",
      tips: ["Ask clarifying questions", "Propose assumptions", "Show initiative", "Document decisions"],
      category: "Problem Solving",
      difficulty: "Medium",
    },
    {
      id: "s3",
      question: "How do you stay updated with the latest technologies?",
      tips: ["Mention specific resources", "Show continuous learning", "Discuss side projects", "Mention communities"],
      category: "Self-Development",
      difficulty: "Easy",
    },
  ],
};

export const interviewTips = [
  {
    title: "Research the Company",
    description: "Before your interview, thoroughly research the company's products, services, culture, and recent news.",
    icon: "🔍",
  },
  {
    title: "Practice Aloud",
    description: "Practice your answers out loud. This helps you articulate thoughts more clearly during the actual interview.",
    icon: "🎤",
  },
  {
    title: "Prepare Questions",
    description: "Always have thoughtful questions ready for the interviewer. It shows genuine interest in the role.",
    icon: "❓",
  },
  {
    title: "Follow Up",
    description: "Send a thank-you email within 24 hours. Reference specific topics discussed to stand out.",
    icon: "📧",
  },
];

export const questionCategories = [
  { id: "behavioral", name: "Behavioral", color: "indigo", count: 5 },
  { id: "technical", name: "Technical", color: "emerald", count: 5 },
  { id: "situational", name: "Situational", color: "purple", count: 3 },
];
