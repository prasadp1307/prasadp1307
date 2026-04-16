# Job Board POC - Next.js App Router

A simple Job Board application demonstrating core Next.js 14+ concepts including App Router, Server Components, Server Actions, dynamic routing, cookie-based authentication, and middleware.

## Features

- 📋 Browse job listings
- 👤 View job details with dynamic routes
- ✍️ Post new jobs (requires login)
- 📝 Apply for jobs
- 🔐 Mock authentication with HttpOnly cookies
- 👨‍💼 Protected dashboard for logged-in users
- 📱 Simple, clean UI with basic HTML and CSS

## Tech Stack

- **Next.js 14+** - App Router
- **React 18** - Server and Client Components
- **JavaScript** - No TypeScript
- **Fetch API** - Data fetching
- **JSON Server** - Mock backend
- **Next/Headers & Cookies** - Authentication
- **Next/Navigation** - Redirects and navigation

## Next.js Concepts Demonstrated

✅ **App Router structure** - Organized folder-based routing  
✅ **Server Components** - Default components for data fetching  
✅ **Client Components** - Using `'use client'` for error handling  
✅ **Dynamic routes** - `/jobs/[id]` and `/apply/[id]`  
✅ **Data fetching** - Using native Fetch API  
✅ **Server Actions** - Form submissions with `action` attribute  
✅ **Redirect** - After successful form actions  
✅ **Cookies** - HttpOnly cookie for authentication via `next/headers`  
✅ **Middleware** - Protected `/dashboard` route  
✅ **Loading UI** - `loading.js` with skeleton effect  
✅ **Error handling** - `error.js` for error boundaries  
✅ **Metadata API** - Dynamic page titles and descriptions  

## Project Structure

```
job-board/
├── app/
│   ├── page.js                 # Home page
│   ├── layout.js               # Root layout
│   ├── globals.css             # Global styles
│   ├── loading.js              # Loading skeleton
│   ├── error.js                # Error boundary
│   ├── jobs/
│   │   ├── page.js             # Jobs listing
│   │   └── [id]/
│   │       └── page.js         # Job details (dynamic)
│   ├── post-job/
│   │   └── page.js             # Create job form
│   ├── apply/
│   │   └── [id]/
│   │       └── page.js         # Apply form (dynamic)
│   ├── login/
│   │   └── page.js             # Login form
│   ├── dashboard/
│   │   └── page.js             # Protected dashboard
│   ├── actions/
│   │   ├── authActions.js      # Login/logout server actions
│   │   └── jobActions.js       # Job creation/application actions
│   └── components/
│       ├── Navbar.js           # Navigation bar
│       ├── JobCard.js          # Job card component
│       └── JobList.js          # Job list component
├── middleware.js               # Route protection middleware
├── db.json                      # JSON Server mock database
├── package.json
└── README.md
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start JSON Server (Mock Backend)

Open a new terminal and run:

```bash
npm run json-server
```

This starts JSON Server on `http://localhost:3001` with the mock data from `db.json`.

### 3. Start Next.js Development Server

In your original terminal:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Demo Credentials

Use these credentials to test the login functionality:

**Account 1 (Employer):**
- Email: `john@example.com`
- Password: `pass123`

**Account 2 (Employer):**
- Email: `jane@example.com`
- Password: `pass123`

**Account 3 (Job Seeker):**
- Email: `bob@example.com`
- Password: `pass123`

## How It Works

### Authentication Flow

1. User submits login form on `/login`
2. `loginUser` server action validates credentials against JSON Server
3. On success, an HttpOnly cookie `auth_token` is set
4. User is redirected to `/dashboard`
5. Middleware protects `/dashboard` route - redirects to login if no cookie

### Job Posting

1. Logged-in user navigates to `/post-job`
2. Submits job form with `createJob` server action
3. Server action creates job in JSON Server (associated with user ID)
4. User is redirected to `/jobs` listing

### Job Application

1. User views job details at `/jobs/[id]`
2. Clicks "Apply Now" to go to `/apply/[id]`
3. Submits application form with `applyJob` server action
4. Application is saved to JSON Server
5. User is redirected to `/jobs`

### Middleware Protection

The `middleware.js` checks for `auth_token` cookie and protects the `/dashboard` route:

```javascript
if (request.nextUrl.pathname === '/dashboard' && !cookie) {
  return NextResponse.redirect(new URL('/login', request.url));
}
```

## API Endpoints Used

**JSON Server provides these endpoints:**

- `GET /jobs` - List all jobs
- `GET /jobs/:id` - Get job details
- `POST /jobs` - Create new job
- `GET /users?email=X&password=Y` - Authenticate user
- `POST /applications` - Submit job application

## Building for Production

```bash
npm run build
npm run start
```

## Notes

- This is a POC demonstrating Next.js concepts, not production-ready
- JSON Server is a mock backend; in production, use a real API
- Authentication is simplified for demo purposes
- Styling is minimal using inline styles to keep focus on Next.js features
- The application uses `cache: 'no-store'` for real-time data fetching

## Learning Resources

This project demonstrates these key Next.js topics:

1. **App Router** - File-based routing with folders
2. **Server Components** - Default, run on server for data fetching
3. **Client Components** - `'use client'` for interactive features
4. **Dynamic Routing** - `[id]` for dynamic segments
5. **Server Actions** - `'use server'` for form handling
6. **Middleware** - Protect routes before they render
7. **Headers & Cookies** - Via `next/headers`
8. **Error Boundaries** - `error.js` files
9. **Loading States** - `loading.js` files
10. **Metadata** - SEO with `metadata` export

For more information, visit the [Next.js documentation](https://nextjs.org/docs).
