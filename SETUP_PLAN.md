# 🛠️ Integration & Deployment Setup Plan

This project is architected as a **Static Frontend (Next.js)** + **Serverless Backend (Appwrite Functions)**. This allows for zero-cost hosting and easy scalability.

## 1. Prerequisites
*   Node.js 20+
*   Appwrite Cloud Account (or self-hosted)
*   Stripe Account
*   Google Gemini API Key

## 2. Appwrite Setup
1.  **Create Project:** Go to Appwrite Console -> Create Project.
2.  **Auth:** Enable "Email/Password" provider in Auth settings.
3.  **Database:**
    *   Create Database `resumes-db`.
    *   Create Collection `resumes`.
    *   Attributes: `user_id` (String), `title` (String), `content` (String, 1M chars), `status` (String), `last_updated` (Datetime).
    *   Permissions: Role `users` -> Create, Read, Update, Delete.
4.  **Storage:**
    *   Create Bucket `resumes-files`.
    *   Permissions: Role `users` -> Create, Read, Update, Delete.

## 3. Deploy Functions
Use the Appwrite CLI to deploy the functions in `functions/`.

```bash
# Install CLI
npm install -g appwrite-cli
appwrite login
appwrite init project

# Deploy
appwrite deploy function
```

**Environment Variables for Functions:**
Set these in Appwrite Console for each function:

*   `functions/create-payment`:
    *   `STRIPE_SECRET_KEY`: sk_...
*   `functions/stripe-webhook`:
    *   `STRIPE_SECRET_KEY`: sk_...
    *   `STRIPE_WEBHOOK_SECRET`: whsec_...
    *   `APPWRITE_API_KEY`: (API Key with users.write permission)
*   `functions/parse-resume`:
    *   `GEMINI_API_KEY`: ...
    *   `APPWRITE_API_KEY`: ...
*   `functions/enhance-text`:
    *   `GEMINI_API_KEY`: ...

## 4. Frontend Configuration (.env.local)
Create `.env.local` in the root folder:

```env
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_DB_ID=resumes-db
NEXT_PUBLIC_APPWRITE_COLLECTION_RESUMES=resumes
NEXT_PUBLIC_APPWRITE_BUCKET_ID=resumes-files

# Function IDs (Found in Appwrite Console after deploy)
NEXT_PUBLIC_APPWRITE_FUNCTION_PARSE_RESUME=65...
NEXT_PUBLIC_APPWRITE_FUNCTION_ENHANCE_TEXT=65...
NEXT_PUBLIC_APPWRITE_FUNCTION_CREATE_PAYMENT=65...
```

## 5. Build & Deploy Frontend
Since `output: 'export'` is set, running build produces an `out` folder.

**Vercel:**
*   Import Repo.
*   Build Command: `npm run build`.
*   Output Directory: `out`.
*   Add Environment Variables from Step 4.

**Appwrite (Static Site):**
*   Zip the `out` folder.
*   Upload to Appwrite Functions (if using simple hosting) or any static host.

## 6. Verification
1.  Sign up on your live site.
2.  Upload a PDF -> Checks parsing (Gemini Function).
3.  Click "Upgrade" -> Checks Stripe (Payment Function).
