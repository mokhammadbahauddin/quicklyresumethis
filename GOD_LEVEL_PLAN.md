# GOD_LEVEL_PLAN.md

## 🚀 Phase 1: The "Student Founder" Stack (COMPLETED)

We successfully switched the architecture to maximize benefits.

| Component | Choice | Status |
| :--- | :--- | :--- |
| **Backend** | **Appwrite Cloud** | ✅ Integrated (Auth + Database) |
| **AI Brain** | **Google Gemini 1.5 Flash** | ✅ Integrated (Server-side Parsing) |
| **Payments** | **Stripe** | ✅ Integrated (Webhooks) |
| **Hosting** | **Vercel** | ✅ Configured |

---

## 💾 Phase 2: Database Schema (Appwrite Setup)

You must create these in your Appwrite Console:

### 1. Project
*   Create a project. Copy `Project ID` to `.env`.

### 2. Database
*   Create Database `resumes-db`.
*   Create Collection `resumes`.
*   **Attributes:**
    *   `user_id` (String, 255)
    *   `title` (String, 255)
    *   `content` (String, 1000000 - Large text for JSON)
    *   `status` (String, 50)
    *   `last_updated` (Datetime)

### 3. Storage
*   Create Bucket `resumes-files`.

---

## 🛠️ Phase 3: Implementation Status

*   **Step 3.1: Brain Upgrade:** `src/lib/aiParser.ts` now uses Google Generative AI (Gemini).
*   **Step 3.2: Vault Connection:** `src/lib/appwrite.ts` created.
*   **Step 3.3: Save Workflow:** `src/app/api/parse/route.ts` handles parsing, AI enhancement, and Appwrite saving.
*   **Step 3.4: The Bank:** `src/app/api/stripe/webhook/route.ts` listens for payments and updates user tier.

---

## 🔑 Environment Variables Required

Create a `.env` file with these keys:

```env
# Appwrite (Client)
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_DB_ID=resumes-db
NEXT_PUBLIC_APPWRITE_COLLECTION_RESUMES=resumes

# Appwrite (Server Admin)
APPWRITE_API_KEY=your_secret_api_key

# Google Gemini
GEMINI_API_KEY=your_gemini_key

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

---

## 💰 Phase 4: Monetization Logic

*   **Freemium Check:** Implemented in `FileUpload.tsx`. Checks `user.prefs.tier`.
*   **Upgrade Flow:** Use the Stripe Dashboard to create a product.

---

## 🗓️ Execution Roadmap (Next Steps for You)

1.  **Deploy to Vercel.**
2.  **Add Env Vars** in Vercel Dashboard.
3.  **Setup Appwrite** (Create DB/Collections as above).
4.  **Launch!**
