# 🚀 Next.js Resume Builder SaaS Starter Kit (God Mode Edition)

**The only Open Source Resume Builder that doesn't lie to your users.**

Most resume builders use HTML for the preview and PDF for the download, causing "layout drift" where the download looks nothing like the screen. **QuicklyResumeThis** solves this by using a **Unified Rendering Engine** (`@react-pdf/renderer`) for both the live preview and the final file.

---

## 🌟 Key Features

*   **Unified PDF Rendering:** The `PDFViewer` runs in the browser, guaranteeing 100% WYSIWYG accuracy.
*   **5 Professional Templates:** Modern, Minimal, Tech, Creative, Academic.
*   **AI Integration Ready:** "Magic Fix" button ready for your OpenAI API key. (Includes a smart rule-based fallback).
*   **Monetization Logic:** Built-in download limit tracking (3 free downloads/month) with an "Upgrade" modal trigger.
*   **Drag-and-Drop Editor:** Reorder experience/education sections instantly.
*   **Production Ready:** TypeScript, Tailwind, Next.js 16.

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

### 2. Configuring AI (The "Brain")

The AI endpoint is located at `src/app/api/enhance-text/route.ts`.
It currently uses a smart regex-based enhancer (turning "worked on" into "Orchestrated").

**To enable Real OpenAI:**
1.  Get an API Key from [platform.openai.com](https://platform.openai.com).
2.  Uncomment the OpenAI code block in `src/app/api/enhance-text/route.ts`.
3.  Add `OPENAI_API_KEY` to your `.env` file.

### 3. Deployment (Vercel)

1.  Push your code to GitHub.
2.  Import the repository in Vercel.
3.  Add environment variables if you enabled OpenAI.
4.  Deploy.

---

## 🔮 The Roadmap to $10k MRR

This kit gives you the foundation. Here is your path to profitability:

1.  **Phase 1: Fidelity (Done ✅)**
    *   We switched to `@react-pdf` for the live preview. No more layout bugs.

2.  **Phase 2: Persistence (Next Step)**
    *   Add **Clerk** for Authentication.
    *   Add **Supabase** to save resume JSON to the cloud.
    *   *Why?* Users who can save their work return. Returning users pay.

3.  **Phase 3: Payments**
    *   Connect the "Upgrade" button to **Stripe Checkout**.
    *   Charge $9/month for "Unlimited AI" + "Cloud Save".

---

**Built with ❤️ for High-Performance Job Seekers.**
