# Custom-Coded Headless CMS & Dynamic Portfolio

A modern, production-ready portfolio architecture built completely from scratch with a custom-coded CMS backend, interactive admin control panel, and high-performance Next.js frontend.

---

## 🌟 Architecture Overview

```text
CMS/
├── backend/                  # Node.js + Express.js Custom CMS API
│   ├── prisma/               # Prisma Schema & SQLite Database
│   │   ├── schema.prisma     # Content models (About, Skills, Projects, Blogs, etc.)
│   │   └── dev.db
│   ├── src/
│   │   ├── controllers/      # Handlers for Auth, CRUD, Uploads, Messages
│   │   ├── middleware/       # JWT Auth verification, Multer upload
│   │   ├── routes/           # REST endpoints
│   │   ├── scripts/seed.js   # Database seeder with admin & sample content
│   │   └── index.js          # Express app entrypoint (Port 5001)
│   └── uploads/              # Local file and image storage
│
├── admin/                    # React + Vite + Tailwind CSS Admin Panel
│   ├── src/
│   │   ├── api/              # Axios instance with JWT interceptor
│   │   ├── context/          # Auth Context (login, logout, token persistence)
│   │   ├── pages/            # Dashboard, About, Skills, Projects, Blogs,
│   │   │                     # Experience, Testimonials, Services, Messages, Media
│   │   └── App.jsx           # Tab-based dashboard router (Port 5173)
│   └── package.json
│
└── frontend/                 # Next.js 14 (App Router) + Tailwind CSS Portfolio
    ├── src/
    │   ├── app/              # SSR pages: Home, Projects, Blogs, Detail views
    │   ├── components/       # Navbar, Footer, ContactForm, Cards
    │   └── lib/api.js        # Dynamic fetchers connected to Custom CMS
    └── package.json          # Public Portfolio Website (Port 3000)
```

---

## 🚀 Quick Start Guide

### 1. Default Admin Credentials
- **Email:** `admin@portfolio.local`
- **Password:** `admin123`
*(A 1-click auto-fill button is also provided on the login page)*

---

### 2. Running All 3 Applications

#### Backend CMS Server (Port 5001)
```bash
cd backend
npm run dev
```

#### Admin Panel (Port 5173)
```bash
cd admin
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser to log in and manage content.

#### Portfolio Frontend (Port 3000)
```bash
cd frontend
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** to see your live portfolio with real-time updates.

---

## 📦 Database & CMS Models

The backend uses **Prisma ORM with SQLite** (`backend/prisma/dev.db`):
- **User:** Authentication with `bcryptjs` password hashing and `jsonwebtoken` (JWT).
- **About:** Personal headline, bio, location, contact info, and social links.
- **Skills:** Categorized technical proficiencies (Frontend, Backend, Database, DevOps, etc.).
- **Projects:** Title, slug, summary, full case study, thumbnail, demo/GitHub links, and featured flags.
- **Blogs:** Articles with publishing controls (`published: true/false`), tags, slugs, and cover photos.
- **Experience:** Chronological work history and achievements.
- **Testimonials:** Client endorsements and 5-star ratings.
- **Services:** Offered engineering and consulting capabilities.
- **Messages:** Inbox for messages submitted through the portfolio contact form.
- **Media:** File uploads saved to disk and recorded in the database.

---

## 🛠️ API Reference

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Admin login | Public |
| `GET` | `/api/auth/me` | Current admin profile | Protected |
| `GET / PUT` | `/api/about` | Read / Update portfolio bio | Public (GET) / Protected (PUT) |
| `GET / POST / PUT / DELETE` | `/api/skills` | Skills CRUD | Public (GET) / Protected (Write) |
| `GET / POST / PUT / DELETE` | `/api/projects` | Projects CRUD | Public (GET) / Protected (Write) |
| `GET / POST / PUT / DELETE` | `/api/blogs` | Blogs CRUD | Public (GET) / Protected (Write) |
| `GET / POST / PUT / DELETE` | `/api/experience` | Career timeline CRUD | Public (GET) / Protected (Write) |
| `GET / POST / PUT / DELETE` | `/api/testimonials`| Testimonials CRUD | Public (GET) / Protected (Write) |
| `GET / POST / PUT / DELETE` | `/api/services` | Services CRUD | Public (GET) / Protected (Write) |
| `POST` | `/api/contact` | Submit contact form message | Public |
| `GET / DELETE` | `/api/contact/messages` | Admin inquiries inbox | Protected |
| `POST` | `/api/media/upload` | Upload image/file (Multer) | Protected |
| `GET / DELETE` | `/api/media` | Media library | Protected |
