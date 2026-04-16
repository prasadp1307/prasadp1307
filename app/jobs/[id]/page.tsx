"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";

interface Job {
  _id: string;
  title: string;
  company: string;
  description: string;
  salary: string;
  location: string;
  type: string;
  requirements: string[];
  postedBy: { name: string; email: string };
  createdAt: string;
}

interface User {
  name: string;
  email: string;
  phone?: string;
}

export default function JobDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applying, setApplying] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/user/me");
        if (res.ok) {
          const data = await res.json();
          setIsAuth(true);
          setUser(data.user);
        }
      } catch {
        setIsAuth(false);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${params.id}`);
        const data = await res.json();
        if (res.ok) {
          setJob(data.job);
          setAlreadyApplied(data.alreadyApplied || false);
        } else {
          toast.error("Job not found");
          router.push("/jobs");
        }
      } catch (error) {
        toast.error("Failed to load job");
        router.push("/jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [params.id, router]);

  const handleApplyClick = () => {
    if (!isAuth) {
      toast.error("Please login to apply for this job");
      router.push("/login");
      return;
    }
    setShowApplyModal(true);
  };

  const handleSubmitApplication = async () => {
    if (!coverLetter.trim()) {
      toast.error("Please write a cover letter");
      return;
    }

    setApplying(true);
    try {
      const res = await fetch(`/api/jobs/${params.id}/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          coverLetter: coverLetter,
          phone: phone,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to submit application");
        return;
      }

      toast.success("Application submitted successfully! We will contact you soon.");
      setShowApplyModal(false);
      setAlreadyApplied(true);
    } catch {
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setApplying(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getDaysAgo = (date: string) => {
    const days = Math.floor((Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return formatDate(date);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="card p-10 space-y-5">
            <div className="skeleton h-10 w-3/4 rounded-lg" />
            <div className="skeleton h-6 w-1/2 rounded-lg" />
            <div className="skeleton h-40 w-full rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (!job) return null;

  return (
    <div className="min-h-screen pt-20 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link href="/jobs" className="inline-flex items-center gap-2 text-slate-600 hover:text-indigo-600 mb-8 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Jobs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-8">
              <div className="flex items-start gap-5 mb-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl">
                  {job.company.charAt(0)}
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-slate-900 mb-1">{job.title}</h1>
                  <p className="text-xl text-slate-600 mb-3">{job.company}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium capitalize">
                      {job.type.replace("-", " ")}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm">
                      {job.location}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm">
                      {job.salary}
                    </span>
                  </div>
                </div>
              </div>

              {alreadyApplied ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-6 py-4 rounded-xl text-center">
                  <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="font-semibold">You have already applied for this job!</p>
                  <p className="text-sm mt-1">Check your dashboard for application status.</p>
                </div>
              ) : (
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleApplyClick}
                >
                  Apply Now
                </Button>
              )}
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">About This Role</h2>
              <p className="text-slate-600 whitespace-pre-wrap leading-relaxed">{job.description}</p>
            </Card>

            {job.requirements && job.requirements.length > 0 && (
              <Card className="p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Requirements</h2>
                <ul className="space-y-3">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600">
                      <svg className="w-5 h-5 text-indigo-500 shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {req}
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-bold text-slate-900 mb-4">Job Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-slate-100">
                  <span className="text-slate-500">Location</span>
                  <span className="font-medium text-slate-800">{job.location}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-slate-100">
                  <span className="text-slate-500">Salary</span>
                  <span className="font-medium text-slate-800">{job.salary}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-slate-100">
                  <span className="text-slate-500">Job Type</span>
                  <span className="font-medium text-slate-800 capitalize">{job.type.replace("-", " ")}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-slate-500">Posted</span>
                  <span className="font-medium text-slate-800">{getDaysAgo(job.createdAt)}</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold text-slate-900 mb-4">About Employer</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                  {job.postedBy?.name?.charAt(0) || "U"}
                </div>
                <div>
                  <p className="font-semibold text-slate-800">{job.postedBy?.name || "Unknown"}</p>
                  <p className="text-sm text-slate-500">{job.postedBy?.email || ""}</p>
                </div>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-500 mb-1">Response rate</p>
                <p className="font-semibold text-slate-800">Usually responds within 2 days</p>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
              <h3 className="font-bold mb-2">Quick Apply</h3>
              <p className="text-sm text-indigo-100 mb-4">Apply in just 2 minutes with your profile</p>
              <Button
                variant="primary"
                fullWidth
                onClick={handleApplyClick}
                className="bg-white text-indigo-600 hover:bg-indigo-50"
              >
                Apply Now
              </Button>
            </Card>
          </div>
        </div>
      </div>

      {showApplyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Apply for this job</h2>
              <button onClick={() => setShowApplyModal(false)} className="text-slate-400 hover:text-slate-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 mb-6">
              <p className="font-semibold text-slate-800">{job.title}</p>
              <p className="text-slate-600">{job.company} - {job.location}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={user?.name || ""}
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-800 bg-slate-50"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  value={user?.email || ""}
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-800 bg-slate-50"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Cover Letter *</label>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Write why you are a good fit for this role..."
                  rows={5}
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="outline" fullWidth onClick={() => setShowApplyModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" fullWidth loading={applying} onClick={handleSubmitApplication}>
                Submit Application
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
