import { Client, Account, Databases, Storage, Functions } from 'appwrite';

const client = new Client();

if (process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID) {
    client
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);
} else {
    console.warn("⚠️ Appwrite Project ID not found. Features relying on backend will fail.");
}

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const functions = new Functions(client);

// Appwrite Constants
export const APPWRITE_DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DB_ID || 'resumes-db';
export const APPWRITE_COLLECTION_RESUMES = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_RESUMES || 'resumes';
export const APPWRITE_COLLECTION_USERS = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_USERS || 'users';
export const APPWRITE_BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || 'resumes-files';
export const APPWRITE_FUNCTION_PARSE_RESUME = process.env.NEXT_PUBLIC_APPWRITE_FUNCTION_PARSE_RESUME || 'parse-resume';
export const APPWRITE_FUNCTION_ENHANCE_TEXT = process.env.NEXT_PUBLIC_APPWRITE_FUNCTION_ENHANCE_TEXT || 'enhance-text';
export const APPWRITE_FUNCTION_CREATE_PAYMENT = process.env.NEXT_PUBLIC_APPWRITE_FUNCTION_CREATE_PAYMENT || 'create-payment';
