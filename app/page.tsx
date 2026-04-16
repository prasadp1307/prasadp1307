import JobCard from "@/components/JobCard";
import FAQ from "@/components/FAQ";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Job from "@/models/Job";
// import Card from "@/components/ui/Card"; // Removed as we use JobCard
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JobBoard - Find Your Dream Job",
  description: "Browse thousands of job opportunities and find your perfect match.",
};

export default async function HomePage() {
  let session = null;
  try {
    session = await getSession();
  } catch {
    // Not logged in
  }

  let jobs: any[] = [];
  try {
    await connectDB();
    const fetchedJobs = await Job.find().populate("postedBy", "name").sort({ createdAt: -1 }).limit(6).lean();
    jobs = JSON.parse(JSON.stringify(fetchedJobs));
  } catch (error) {
    console.error("DB Error:", error);
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-gradient-to-br from-indigo-600 to-purple-600 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6">
            Find Your Dream Job Today
          </h1>
          <p className="text-lg sm:text-xl text-indigo-100 max-w-2xl mx-auto mb-8">
            Browse thousands of job opportunities from top companies. 
            Post jobs, apply easily, and take the next step in your career.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/jobs"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold bg-white text-indigo-600 rounded-xl shadow-lg hover:bg-indigo-50 transition-colors"
            >
              Browse Jobs
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>
            {session ? (
              <Link
                href="/jobs/post"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold bg-indigo-700 text-white rounded-xl hover:bg-indigo-800 transition-colors"
              >
                Post a Job
              </Link>
            ) : (
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold bg-indigo-700 text-white rounded-xl hover:bg-indigo-800 transition-colors"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Latest Jobs</h2>
              <p className="text-slate-500 text-sm mt-1">Fresh opportunities posted recently</p>
            </div>
            <Link href="/jobs" className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
              View all →
            </Link>
          </div>

          {jobs.length === 0 ? (
            <div className="card p-12 text-center bg-white border border-slate-100 rounded-3xl shadow-sm">
              <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3 className="text-xl font-bold text-slate-700 mb-2">No jobs yet</h3>
              <p className="text-slate-500 mb-6">Be the first to post a job on our platform!</p>
              {session && (
                <Link href="/jobs/post">
                  <span className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                    Post a Job
                  </span>
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job: any) => (
                <JobCard key={job._id.toString()} job={job} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">How It Works</h2>
            <p className="text-slate-500">Get started in three simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-2xl mx-auto mb-4">1</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Create Account</h3>
              <p className="text-slate-500">Sign up for free in seconds. No credit card required.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-2xl mx-auto mb-4">2</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Search Jobs</h3>
              <p className="text-slate-500">Browse thousands of job listings from top companies.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-2xl mx-auto mb-4">3</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Apply & Get Hired</h3>
              <p className="text-slate-500">Submit applications and take the next step in your career.</p>
            </div>
          </div>
        </div>
      </section>

      <FAQ />

      <footer className="py-8 px-4 text-center border-t border-slate-200">
        <p className="text-sm text-slate-500">
          © 2026 JobBoard. Built with Next.js and MongoDB.
        </p>
      </footer>
    </div>
  );
}
