# JobBoard - Premium Career Portal Documentation

## 1. Project Overview
JobBoard is a modern, full-stack career platform designed to connect top talent with industry-leading companies. Built with a focus on rich aesthetics and smooth user experience, it allows companies to post opportunities and candidates to browse and apply for jobs effortlessly.

### Mission
To provide a seamless, bug-free, and visually stunning experience for both job seekers and recruiters, bridging the gap between talent and opportunity.

---

## 2. Technology Stack
The project leverages modern web technologies for performance, scalability, and developer experience:

- **Frontend**: Next.js 15 (App Router), React 19
- **Styling**: Tailwind CSS, Lucide Icons
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT (JSON Web Tokens) with Secure Cookies
- **State Management**: React Hooks (useState, useEffect, etc.)
- **Notifications**: Sonner (Rich Toast Notifications)
- **Deployment**: Production-ready Next.js architecture

---

## 3. Key Features
### For Candidates
- **Browse Jobs**: Search and filter jobs by title, company, location, and type (Full-time, Internship, Remote, etc.).
- **Job Details**: View comprehensive job requirements and employer summaries.
- **Easy Apply**: Apply for positions with a single click and a brief cover letter.
- **Dashboard**: Track all sent applications and their current status.

### For Recruiters
- **Post Jobs**: Simple, intuitive form to list new opportunities.
- **Manage Listings**: View and track applications for posted jobs.
- **Employer Profile**: Showcase brand identity on every listing.

### Platform-wide
- **Mobile Responsive**: Fully optimized for smartphones, tablets, and desktops.
- **Auth Protected**: Secure login and signup flows to protect user data.
- **Premium UI**: Glassmorphism effects, smooth animations, and curated color palettes.

---

## 4. Project Structure
```text
/home/user/Downloads/job-board
├── app/                  # Next.js App Router (Pages & API)
│   ├── api/              # Backend API Routes
│   ├── dashboard/        # User Dashboard
│   ├── jobs/             # Job Listing and Details Pages
│   ├── login/            # Authentication Pages
│   └── layout.tsx        # Global Root Layout
├── components/           # Reusable UI Components
│   ├── ui/               # Primary UI Atomic Components (Button, Card, Input)
│   ├── JobCard.tsx       # Unified Job Display Component
│   └── Navbar.tsx        # Responsive Navigation Bar
├── lib/                  # Shared Utilities (Auth, DB, Common logic)
├── models/               # Mongoose Database Schemas (User, Job, Application)
├── public/               # Static Assets
└── tailwind.config.js    # Design System Configuration
```

---

## 5. API Documentation

### Authentication
#### `POST /api/auth/signup`
- **Description**: Registers a new user.
- **Body**: `{ name, email, password }`
- **Response**: Success message and user session.

#### `POST /api/auth/login`
- **Description**: Authenticates user and sets session cookie.
- **Body**: `{ email, password }`

#### `POST /api/auth/logout`
- **Description**: Clears the session cookie.

### Users
#### `GET /api/user/me`
- **Description**: Returns details of the currently authenticated user.
- **Response**: `{ user: { id, name, email } }`

### Jobs
#### `GET /api/jobs`
- **Description**: Fetches all jobs with optional filtering.
- **Query Params**: `search`, `location`, `type`
- **Response**: `{ jobs: [] }`

#### `GET /api/jobs/[id]`
- **Description**: Fetches details for a specific job.
- **Response**: `{ job, alreadyApplied: boolean }`

#### `POST /api/jobs/create`
- **Description**: Creates a new job listing (Requires Auth).
- **Body**: `{ title, company, description, salary, location, type, requirements[] }`

#### `GET /api/jobs/my`
- **Description**: Returns jobs posted by the user and applications sent by the user (Requires Auth).
- **Response**: `{ jobs: [], applications: [] }`

### Applications
#### `POST /api/jobs/[id]/apply`
- **Description**: Submits a job application (Requires Auth).
- **Body**: `{ coverLetter, phone }`
- **Response**: `{ message: "Application submitted successfully" }`

---

## 6. Summary of Recent Improvements
- **Data Scaling**: Added 42 structured job listings for Google, Microsoft, Amazon, etc.
- **Responsive Navbar**: Completely rebuilt the navigation system with a mobile-first approach.
- **Unified UI**: Consolidated all job displays into a single, high-performance `JobCard` component.
- **Bug Fixes**: Resolved duplicate logout buttons, fixed API/Frontend mismatches in the application flow, and ensured persistent application states.
- **Performance**: Optimized Tailwind configuration for 100% component coverage.

---
*Documentation Generated for Project Presentation - 2026*
