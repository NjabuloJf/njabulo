# <div align="center"><img src="https://lannytourl.vestia.icu/api/file/6926fa12fdcdd67351cb6d08.jpg" height="85"/></div>

<div align="center"><b>Modern Portfolio – Next.js + Tailwind + Shadcn/UI</b></div>

> A clean, fast, and fully responsive personal portfolio built with **Next.js App Router**, **TypeScript**, **TailwindCSS**, and **Shadcn/UI**.

---

## ✨ Overview

> This project is a full portfolio website equipped with dynamic routes, API utilities, animations, theme switching, screenshot generator API, language detection API, and modular components.

Struktur aplikasi mengikuti folder system Next.js 14 dengan pendekatan **App Router** (`app/`).

---

## 📦 Tech Stack

> **Frontend Framework**
> Next.js 14 (App Router) + React 18 + TypeScript

> **Styling & Components**
> TailwindCSS, Shadcn/UI, clsx, tailwind-merge

> **Backend Utilities**
> API Routes (`app/api/*`)
> – Language detector API
> – Screenshot generator API

> **Utilities & Hooks**
> Custom hooks (`use-mobile`, `use-toast`)
> Helper functions (`lib/utils.ts`)

---

## 📁 Project Structure

> **`app/` – Main Application**
> • `page.tsx` — Homepage
> • `about/page.tsx` — About page
> • `projects/page.tsx` — Projects showcase
> • `contact/page.tsx` — Contact form
> • `layout.tsx` — Main layout wrapper
> • `globals.css` — Global styles

> **`app/api/` – serverless API routes**
> • `language-detect/route.ts` — Detect the language of a text
> • `screenshot/route.ts` — Generate website screenshot

> **`components/ui/` – UI Library**
> • Buttons, Cards, Navigation, ThemeSwitcher
> • Modal, Sheet, Toast, Carousel, etc.

> **`components/main/` – Sections & Page Blocks**
> • Navbar
> • Hero Section
> • About Section
> • Skill Cards
> • Project Grid
> • Contact Form
> • Footer

> **`hooks/` – Custom React Hooks**
> • `use-mobile.ts`
> • `use-toast.ts`

> **`public/` – Static Assets**
> • `anjay.jpg` + favicon + metadata

---

## 🔧 API Features

### 📌 Language Detection API

> **Endpoint:** `/api/language-detect`
> Menerima text → mengembalikan bahasa yang terdeteksi.

### 📸 Screenshot Generator API

> **Endpoint:** `/api/screenshot`
> Generate screenshot dari URL website menggunakan Node screenshot utilities.

---

## 🚀 Getting Started

> **Install dependencies**

```bash
pnpm install
```

> **Run development server**

```bash
pnpm dev
```

> Open browser:
> `http://localhost:3000`

---

## 🧪 Build for Production

> **Build static production bundle**

```bash
pnpm build
```

> **Start production server**

```bash
pnpm start
```

---

## 🎨 Customization Tips

> • Edit color theme inside `globals.css`
> • Modify sections inside `components/main/`
> • Add new pages under `app/yourpage/page.tsx`
> • Use Shadcn components to expand UI easily

---

## 📝 License

> This project is free to use and modify for personal or commercial portfolio purposes.
