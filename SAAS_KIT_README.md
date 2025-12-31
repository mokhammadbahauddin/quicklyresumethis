# 🚀 Next.js Resume Builder SaaS Starter Kit

**Launch your own AI-powered Resume Builder in minutes.**

This kit is a production-ready, full-stack Next.js application designed for speed, scalability, and monetization. It includes 5 professional resume templates, AI-powered text enhancement, and a "freemium" monetization logic built-in.

---

## 🌟 Key Features

*   **Modern Tech Stack:** Next.js 16, TypeScript, Tailwind CSS, Lucide Icons.
*   **5 Professional Templates:** Modern, Minimal, Tech, Creative, Academic.
*   **AI Integration Ready:** "Magic Fix" button stubbed and ready for your OpenAI/Anthropic API key.
*   **Robust PDF Generation:** Server-side generation using `@react-pdf/renderer` ensuring perfect downloads every time.
*   **Monetization Logic:** Built-in download limit tracking (3 free downloads/month) with an "Upgrade" modal trigger.
*   **Drag-and-Drop Editor:** Smooth, intuitive UX for reordering experience/education sections.
*   **Real-time Preview:** Split-screen editor with instant visual feedback.

---

## 🛠️ Quick Start Guide

### 1. Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000` to see your app in action.

### 2. Deployment (Vercel)

This app is optimized for Vercel.

1.  Push your code to GitHub.
2.  Import the repository in Vercel.
3.  Deploy. (No complex configuration needed).

### 3. Configuring AI (Magic Wand)

The AI endpoint is located at `src/app/api/enhance-text/route.ts`.
Currently, it uses a mock implementation for demonstration. To make it real:

1.  Get an API Key from OpenAI.
2.  Install the SDK: `npm install openai`
3.  Update the route:

```typescript
import OpenAI from 'openai';
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Inside POST handler...
const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [{ role: "user", content: \`Rewrite this resume bullet point to be more professional: "\${text}"\` }],
});
return NextResponse.json({ success: true, enhancedText: response.choices[0].message.content });
```

### 4. Monetization Strategy

The app currently uses `localStorage` to track downloads for a frictionless "Freemium" experience.

**To add real payments (Stripe/LemonSqueezy):**

1.  **Frontend:** Update the "Upgrade" button in `src/app/edit/page.tsx` to redirect to your Stripe Checkout URL.
2.  **Backend:** Use a webhook to listen for successful payments and store the user's "Premium" status in a database (Supabase/Postgres).

---

## 💰 How to Market & Sell This

You have the code. Now get the customers.

1.  **Niche Down:** Don't just be "Resume Builder". Be "Resume Builder for Nurses" or "CV Maker for Junior Developers". Customize the landing page text to match.
2.  **SEO:** The landing page (`src/app/page.tsx`) is Server-Side Rendered (SSR) for optimal SEO. Add a blog folder using MDX to drive traffic.
3.  **Social Proof:** Add testimonials to the landing page.
4.  **Launch:** Post on Product Hunt, Reddit (r/webdev, r/jobsearch), and Hacker News.

---

## 📂 Project Structure

*   `src/app/` - Next.js App Router pages.
*   `src/components/templates/` - The React components for the Resume Designs.
*   `src/lib/pdfGenerator.tsx` - The engine that converts data + templates to PDF.
*   `src/lib/fileProcessors.ts` - Logic for parsing uploaded resumes.

---

**Built with ❤️ for High-Performance Job Seekers.**
