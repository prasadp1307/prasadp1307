"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";

export default function PostJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    description: "",
    salary: "",
    location: "",
    type: "full-time",
    requirements: "",
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/user/me");
        if (!res.ok) {
          toast.error("Please login to post a job");
          router.push("/login");
          return;
        }
        setIsAuth(true);
      } catch {
        router.push("/login");
      }
    };
    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const requirementsArray = formData.requirements
        .split("\n")
        .map((r) => r.trim())
        .filter((r) => r.length > 0);

      const res = await fetch("/api/jobs/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          requirements: requirementsArray,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to post job");
        return;
      }

      toast.success("Job posted successfully!");
      router.push("/jobs");
    } catch {
      toast.error("Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!isAuth) {
    return (
      <div className="min-h-screen pt-20 bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500">Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link href="/jobs" className="inline-flex items-center gap-2 text-slate-600 hover:text-indigo-600 mb-8 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Jobs
        </Link>

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Post a New Job</h1>
          <p className="text-slate-600 text-lg">Fill in the details to create a new job listing</p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Job Title"
              name="title"
              placeholder="e.g. Senior React Developer"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <Input
              label="Company Name"
              name="company"
              placeholder="e.g. Tech Corp"
              value={formData.company}
              onChange={handleChange}
              required
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Job Description</label>
              <textarea
                name="description"
                placeholder="Describe the role, responsibilities, and what you are looking for..."
                value={formData.description}
                onChange={handleChange}
                required
                rows={6}
                className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                label="Salary Range"
                name="salary"
                placeholder="e.g. $80,000 - $120,000"
                value={formData.salary}
                onChange={handleChange}
                required
              />

              <Input
                label="Location"
                name="location"
                placeholder="e.g. San Francisco, CA or Remote"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Job Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Requirements (one per line)</label>
              <textarea
                name="requirements"
                placeholder="5+ years of React experience&#10;TypeScript proficiency&#10;Experience with Node.js"
                value={formData.requirements}
                onChange={handleChange}
                rows={5}
                className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              />
            </div>

            <div className="flex gap-4 pt-5">
              <Link href="/jobs" className="flex-1">
                <Button type="button" variant="outline" fullWidth>Cancel</Button>
              </Link>
              <Button type="submit" variant="primary" loading={loading} fullWidth>
                Post Job
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
