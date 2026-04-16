"use client";

import { useState } from "react";
import Link from "next/link";
import { mockCompanies, industries } from "@/lib/mockData";
import Card from "@/components/ui/Card";

export default function CompaniesPage() {
  const [search, setSearch] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<typeof mockCompanies[0] | null>(null);

  const filteredCompanies = mockCompanies.filter((company) => {
    const matchesSearch = company.name.toLowerCase().includes(search.toLowerCase()) ||
      company.description.toLowerCase().includes(search.toLowerCase());
    const matchesIndustry = !selectedIndustry || company.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  const getIndustryColor = (industry: string) => {
    const colors: Record<string, string> = {
      Technology: "bg-blue-100 text-blue-700",
      FinTech: "bg-purple-100 text-purple-700",
      Healthcare: "bg-red-100 text-red-700",
      "Cloud Services": "bg-cyan-100 text-cyan-700",
      Creative: "bg-pink-100 text-pink-700",
      "Data Analytics": "bg-green-100 text-green-700",
      Sustainability: "bg-emerald-100 text-emerald-700",
      Cybersecurity: "bg-orange-100 text-orange-700",
    };
    return colors[industry] || "bg-slate-100 text-slate-700";
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
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Company Explorer</h1>
          <p className="text-slate-600 text-lg">Discover top companies and learn about their culture</p>
        </div>

        {selectedCompany ? (
          <div>
            <button
              onClick={() => setSelectedCompany(null)}
              className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 mb-8 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to companies
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card className="p-8">
                  <div className="flex items-start gap-5 mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                      {selectedCompany.logo}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">{selectedCompany.name}</h2>
                      <p className="text-slate-600">{selectedCompany.industry}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          {selectedCompany.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          {selectedCompany.size} employees
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-600 mb-6 text-lg">{selectedCompany.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedCompany.culture.split(" • ").map((c, i) => (
                      <span key={i} className="px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm">
                        {c}
                      </span>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold text-slate-900 mb-5">Benefits & Perks</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedCompany.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-3 bg-slate-50 rounded-lg px-4 py-3">
                        <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-slate-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6">
                  <h3 className="font-semibold mb-2">Open Positions</h3>
                  <p className="text-4xl font-bold mb-2">{selectedCompany.openPositions}</p>
                  <p className="text-indigo-100 text-sm">Active job openings right now</p>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="p-6">
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-6 h-6 ${star <= Math.floor(selectedCompany.rating) ? "text-yellow-400" : "text-slate-300"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-3xl font-bold text-slate-900">{selectedCompany.rating}</p>
                    <p className="text-sm text-slate-500">{selectedCompany.reviews} reviews</p>
                  </div>
                  <Link
                    href="/jobs"
                    className="block w-full text-center px-4 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
                  >
                    View Open Jobs
                  </Link>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Quick Facts</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-slate-500">Industry</span>
                      <span className="font-medium text-slate-800">{selectedCompany.industry}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-slate-500">Company Size</span>
                      <span className="font-medium text-slate-800">{selectedCompany.size}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-slate-500">Open Positions</span>
                      <span className="font-medium text-slate-800">{selectedCompany.openPositions}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-slate-500">Rating</span>
                      <span className="font-medium text-slate-800">{selectedCompany.rating}/5</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="card p-5 mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search companies..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="w-full sm:w-48">
                  <select
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">All Industries</option>
                    {industries.map((ind) => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCompanies.map((company) => (
                <Card
                  key={company.id}
                  hover
                  onClick={() => setSelectedCompany(company)}
                >
                  <div className="flex items-start gap-4 p-2">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shrink-0">
                      {company.logo}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 text-lg truncate">{company.name}</h3>
                      <p className="text-sm text-slate-500 truncate">{company.location}</p>
                      <span className={`inline-block mt-2 px-2.5 py-0.5 rounded text-xs font-medium ${getIndustryColor(company.industry)}`}>
                        {company.industry}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mt-4 px-2 line-clamp-2">{company.description}</p>
                  <div className="flex items-center justify-between mt-4 pt-4 px-2 border-t border-slate-100">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-medium text-slate-700">{company.rating}</span>
                    </div>
                    <span className="text-sm text-indigo-600 font-medium">
                      {company.openPositions} open
                    </span>
                  </div>
                </Card>
              ))}
            </div>

            {filteredCompanies.length === 0 && (
              <div className="card p-16 text-center">
                <svg className="w-20 h-20 text-slate-300 mx-auto mb-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <h3 className="text-xl font-semibold text-slate-700 mb-3">No companies found</h3>
                <p className="text-slate-500">Try adjusting your search or filters</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
