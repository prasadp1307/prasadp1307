"use client";

import Link from "next/link";
import Card from "@/components/ui/Card";

interface JobCardProps {
  job: {
    _id: string;
    title: string;
    company: string;
    location: string;
    salary: string;
    type: string;
    description: string;
    createdAt: string | Date;
    postedBy?: { name: string };
  };
  showDescription?: boolean;
}

export default function JobCard({ job, showDescription = true }: JobCardProps) {
  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getJobTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "full-time": return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "internship": return "bg-blue-50 text-blue-700 border-blue-100";
      case "remote": return "bg-purple-50 text-purple-700 border-purple-100";
      case "contract": return "bg-orange-50 text-orange-700 border-orange-100";
      default: return "bg-slate-50 text-slate-700 border-slate-100";
    }
  };

  return (
    <Link href={`/jobs/${job._id}`}>
      <Card hover className="h-full group border-slate-100 hover:border-indigo-200 transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 flex items-center justify-center text-indigo-600 font-bold text-xl transition-colors group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600">
            {job.company.charAt(0)}
          </div>
          <span className={`px-3 py-1 rounded-lg border text-xs font-bold uppercase tracking-wider ${getJobTypeColor(job.type)}`}>
            {job.type.replace("-", " ")}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
          {job.title}
        </h3>
        <p className="text-slate-600 font-medium mb-3 flex items-center gap-1.5">
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          {job.company}
        </p>
        
        {showDescription && (
          <p className="text-slate-500 text-sm line-clamp-2 mb-4 leading-relaxed">
            {job.description}
          </p>
        )}
        
        <div className="flex flex-wrap gap-4 text-sm text-slate-500 mt-auto">
          <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-md">
            <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            {job.location}
          </span>
          <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-md">
            <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {job.salary}
          </span>
        </div>
        
        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span>Posted {formatDate(job.createdAt)}</span>
          {job.postedBy && <span>by {job.postedBy.name}</span>}
        </div>
      </Card>
    </Link>
  );
}
