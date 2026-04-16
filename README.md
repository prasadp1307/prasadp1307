# 🚀 JobBoard Premium - Modern Career Portal

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**JobBoard Premium** is a full-stack, state-of-the-art job portal designed to provide a seamless experience for both recruiters and job seekers. Built with **Next.js 15 (App Router)** and **MongoDB**, it features a stunning responsive UI, secure JWT authentication, and a robust job management system.

---

## ✨ Key Features

- **🎯 Massive Job Database**: Seeded with **40+ high-quality jobs** from top companies like Google, Microsoft, Amazon, and leading Indian unicorns.
- **📱 Fully Responsive Design**: A mobile-first approach with a custom-built, animated navigation bar and fluid layouts.
- **🔐 Secure Authentication**: JWT-based session management with HttpOnly cookies for maximum security.
- **💼 Comprehensive Dashboards**: Dedicated views for users to track their applications and for recruiters to manage listings.
- **✨ Rich UI/UX**: Glassmorphism effects, smooth transitions, and premium typography using Inter and Outfit.
- **🛠️ Recruiters Tools**: Intuitive job posting flow and application tracking.

---

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, Lucide Icons, Headless UI
- **Styling**: Tailwind CSS, CSS Variables for dynamic themes
- **Backend**: Next.js API Routes, Mongoose ODM
- **Database**: MongoDB Atlas / Local MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Notifications**: Sonner (Rich Toast Notifications)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB (Local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/prasadp1307/job-portal-premium.git
   cd job-portal-premium
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/signup` | Register a new user |
| `POST` | `/api/auth/login` | Login and get session |
| `GET` | `/api/user/me` | Get current user details |
| `GET` | `/api/jobs` | Fetch and filter job listings |
| `POST` | `/api/jobs/create` | Post a new job (Recruiter) |
| `POST` | `/api/jobs/[id]/apply` | Apply for a specific job |

---

## 🎨 UI Preview

*(Add your screenshots here)*

- **Home Page**: A stunning hero section with latest job highlights.
- **Job Details**: Comprehensive job overview with requirements and quick apply.
- **Dashboard**: Track all your activities in one place.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👤 Author

**Prasad P**
- GitHub: [@prasadp1307](https://github.com/prasadp1307)
- Email: prasaddp1137@gmail.com

---
*Built with ❤️ for the community.*
