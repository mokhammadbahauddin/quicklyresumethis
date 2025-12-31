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
*   **Static Export Ready:** Runs entirely in the browser (Client-Side). Host for free on GitHub Pages or Vercel.

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

### 2. Hosting (Zero Cost)

This app is architected as a **Static Site** (SPA). It does not require a Node.js server.

**GitHub Pages:**
1.  Push your code to GitHub.
2.  Go to Settings > Pages > Build and deployment > Source: **GitHub Actions**.
3.  The included `.github/workflows/deploy.yml` will automatically build and deploy your site.

**Vercel / Netlify:**
Just import the repo. It detects `next.config.ts` and deploys automatically.

### 3. Configuring AI (The "Brain")

The AI logic is located in `src/lib/clientAI.ts`. It currently uses a smart regex-based enhancer.

**To enable Real OpenAI:**
Since this is a client-side app, calling OpenAI directly exposes your API Key.
**Recommended:** Create a small proxy server (Cloudflare Worker) to handle the API call and update `src/lib/clientAI.ts` to fetch from there.

---

## 🔮 The Roadmap to $10k MRR

This kit gives you the foundation. Here is your path to profitability:

1.  **Phase 1: Fidelity (Done ✅)**
    *   We switched to `@react-pdf` for the live preview. No more layout bugs.

2.  **Phase 2: Persistence (Done ✅)**
    *   Added **URL Sharing**. Users can "Save" their resume by bookmarking the unique link (compressed state).

3.  **Phase 3: Payments (Done ✅)**
    *   Added **Watermarking**. Free PDFs have a footer.
    *   Added "Remove Watermark" flow (Mocked).
    *   *Next Step:* Connect the "Upgrade" button to a Stripe Payment Link.

---

**Built with ❤️ for High-Performance Job Seekers.**
