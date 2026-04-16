"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

interface User {
  id: string;
  name: string;
  email: string;
}

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  createdAt: string;
}

interface Application {
  _id: string;
  jobId: Job;
  userName: string;
  userEmail: string;
  resume: string;
  status: string;
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [myJobs, setMyJobs] = useState<Job[]>([]);
  const [myApplications, setMyApplications] = useState<Application[]>([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/user/me");
        if (!res.ok) {
          router.push("/login");
          return;
        }
        const data = await res.json();
        setUser(data.user);

        const jobsRes = await fetch("/api/jobs/my");
        if (jobsRes.ok) {
          const jobsData = await jobsRes.json();
          setMyJobs(jobsData.jobs || []);
          setMyApplications(jobsData.applications || []);
        }
      } catch {
        router.push("/login");
      } finally {
        setLoading(false);
        setJobsLoading(false);
      }
    };
    fetchData();
  }, [router]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      toast.success("Logged out successfully");
      router.push("/login");
    } catch {
      toast.error("Logout failed");
      setLoggingOut(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "reviewed": return "bg-blue-100 text-blue-700";
      case "accepted": return "bg-emerald-100 text-emerald-700";
      case "rejected": return "bg-red-100 text-red-700";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="card p-10 space-y-5">
            <div className="skeleton h-8 w-56 rounded-lg" />
            <div className="skeleton h-40 w-full rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-10">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              Welcome back, {user?.name?.split(" ")[0]}
            </h1>
            <p className="text-slate-600 text-lg">Manage your jobs and applications</p>
          </div>
          <div className="flex gap-3">
            <Link href="/jobs">
              <Button variant="outline" size="md" className="shadow-sm">Browse Jobs</Button>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
        {/* <div className="flex flex-col md:flex-row gap-10 mb-10"> */}
        {/* <div className="gap-10 mb-10"> */}


          <Link href="/ats">
            <Card hover className="text-center p-6">
              <div className="w-14 h-14 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 mx-auto mb-4">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900 text-lg">Resume ATS</h3>
              <p className="text-sm text-slate-500 mt-1">Check your score</p>
            </Card>
          </Link>
          <Link href="/interview">
            <Card hover className="text-center p-6">
              <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto mb-4">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900 text-lg">Interview Prep</h3>
              <p className="text-sm text-slate-500 mt-1">Practice questions</p>
            </Card>
          </Link>
          <Link href="/companies">
            <Card hover className="text-center p-6">
              <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 mx-auto mb-4">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900 text-lg">Companies</h3>
              <p className="text-sm text-slate-500 mt-1">Explore workplaces</p>
            </Card>
          </Link>
          <Link href="/jobs/post">
            <Card hover className="text-center p-6">
              <div className="w-14 h-14 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 mx-auto mb-4">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900 text-lg">Post Job</h3>
              <p className="text-sm text-slate-500 mt-1">Create listing</p>
            </Card>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="text-center p-6">
            <p className="text-4xl font-bold text-indigo-600">{myJobs.length}</p>
            <p className="text-slate-500 mt-2">Jobs Posted</p>
          </Card>
          <Card className="text-center p-6">
            <p className="text-4xl font-bold text-indigo-600">{myApplications.length}</p>
            <p className="text-slate-500 mt-2">Applications Sent</p>
          </Card>
          <Card className="text-center p-6">
            <div className="w-14 h-14 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl mx-auto mb-3">
              {user?.name?.charAt(0) || "U"}
            </div>
            <p className="font-semibold text-slate-800 text-lg">{user?.name}</p>
            <p className="text-sm text-slate-500">{user?.email}</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-semibold text-slate-900">My Posted Jobs</h2>
              <Link href="/jobs/post">
                <Button variant="primary" size="sm">Post Job</Button>
              </Link>
            </div>
            
            {jobsLoading ? (
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="card p-5 space-y-2">
                    <div className="skeleton h-5 w-3/4 rounded" />
                    <div className="skeleton h-4 w-1/2 rounded" />
                  </div>
                ))}
              </div>
            ) : myJobs.length === 0 ? (
              <Card className="text-center py-10">
                <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p className="text-slate-500 mb-4">You haven&apos;t posted any jobs yet</p>
                <Link href="/jobs/post">
                  <Button variant="primary" size="sm">Post Your First Job</Button>
                </Link>
              </Card>
            ) : (
              <div className="space-y-4">
                {myJobs.map((job) => (
                  <Link key={job._id} href={`/jobs/${job._id}`}>
                    <Card hover className="flex items-center justify-between p-5">
                      <div>
                        <h3 className="font-semibold text-slate-900 text-lg">{job.title}</h3>
                        <p className="text-slate-500">{job.company} - {job.location}</p>
                        <p className="text-sm text-slate-400 mt-1">Posted {formatDate(job.createdAt)}</p>
                      </div>
                      <span className="px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium capitalize">
                        {job.type.replace("-", " ")}
                      </span>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-5">My Applications</h2>
            
            {jobsLoading ? (
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="card p-5 space-y-2">
                    <div className="skeleton h-5 w-3/4 rounded" />
                    <div className="skeleton h-4 w-1/2 rounded" />
                  </div>
                ))}
              </div>
            ) : myApplications.length === 0 ? (
              <Card className="text-center py-10">
                <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-slate-500 mb-4">You haven&apos;t applied to any jobs yet</p>
                <Link href="/jobs">
                  <Button variant="outline" size="sm">Browse Jobs</Button>
                </Link>
              </Card>
            ) : (
              <div className="space-y-4">
                {myApplications.map((app) => (
                  <Link key={app._id} href={`/jobs/${app.jobId?._id || app._id}`}>
                    <Card hover className="flex items-center justify-between p-5">
                      <div>
                        <h3 className="font-semibold text-slate-900 text-lg">{app.jobId?.title || "Job"}</h3>
                        <p className="text-slate-500">{app.jobId?.company || ""}</p>
                        <p className="text-sm text-slate-400 mt-1">Applied {formatDate(app.createdAt)}</p>
                      </div>
                      <span className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
