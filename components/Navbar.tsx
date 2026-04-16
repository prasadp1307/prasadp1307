"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import { toast } from "sonner";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/user/me");
        setIsAuth(res.ok);
      } catch {
        setIsAuth(false);
      }
    };
    checkAuth();
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      toast.success("Logged out successfully");
      router.push("/login");
      router.refresh();
    } catch {
      toast.error("Logout failed");
    } finally {
      setLoggingOut(false);
    }
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-lg py-1" 
          : "bg-white border-b border-slate-100 py-2"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group transition-transform hover:scale-105">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:shadow-indigo-300 transition-all">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-xl sm:text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
              JobBoard
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 mx-4 overflow-hidden">
            <Link href="/jobs">
              <button className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive("/jobs") 
                  ? "bg-indigo-50 text-indigo-700" 
                  : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
              }`}>
                Browse Jobs
              </button>
            </Link>
            
            {isAuth && (
              <>
                <Link href="/companies">
                  <button className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive("/companies") 
                      ? "bg-indigo-50 text-indigo-700" 
                      : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
                  }`}>
                    Companies
                  </button>
                </Link>
                <Link href="/interview">
                  <button className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive("/interview") 
                      ? "bg-indigo-50 text-indigo-700" 
                      : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
                  }`}>
                    Interview
                  </button>
                </Link>
                <Link href="/ats">
                  <button className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive("/ats") 
                      ? "bg-indigo-50 text-indigo-700" 
                      : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
                  }`}>
                    Resume ATS
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Right Side Buttons (Desktop) */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {isAuth ? (
              <>
                <Link href="/dashboard">
                  <button className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive("/dashboard")
                      ? "bg-indigo-600 text-white"
                      : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
                  }`}>
                    Dashboard
                  </button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  loading={loggingOut}
                  onClick={handleLogout}
                  className="!rounded-xl"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <button className="px-5 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition-all">
                    Login
                  </button>
                </Link>
                <Link href="/signup">
                  <Button variant="primary" size="sm">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 sm:p-3 rounded-2xl text-slate-600 hover:bg-slate-50 focus:outline-none transition-all border border-slate-100 shadow-sm active:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out bg-white/95 backdrop-blur-md border-t border-slate-100 shadow-2xl ${
          mobileMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0 invisible"
        }`}
      >
        <div className="px-6 py-8 space-y-3">
          <Link href="/jobs" className="flex items-center gap-3 px-5 py-4 rounded-2xl text-lg font-bold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all">
            <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Browse Jobs
          </Link>
          {isAuth ? (
            <>
              <Link href="/companies" className="flex items-center gap-3 px-5 py-4 rounded-2xl text-lg font-bold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Companies
              </Link>
              <Link href="/interview" className="flex items-center gap-3 px-5 py-4 rounded-2xl text-lg font-bold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Interview Prep
              </Link>
              <Link href="/ats" className="flex items-center gap-3 px-5 py-4 rounded-2xl text-lg font-bold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Resume ATS
              </Link>
              <Link href="/dashboard" className="flex items-center gap-3 px-5 py-4 rounded-2xl text-lg font-bold text-indigo-600 bg-indigo-50 transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                My Dashboard
              </Link>
              <div className="pt-6">
                <Button
                  variant="danger"
                  fullWidth
                  size="lg"
                  loading={loggingOut}
                  onClick={handleLogout}
                  className="!rounded-2xl"
                >
                  Logout from Account
                </Button>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 gap-4 pt-4">
              <Link href="/login">
                <Button variant="outline" fullWidth size="lg">Login</Button>
              </Link>
              <Link href="/signup">
                <Button variant="primary" fullWidth size="lg">Get Started</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
