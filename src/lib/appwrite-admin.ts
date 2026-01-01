import { Client, Users, Databases } from 'node-appwrite';

const client = new Client();

if (process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID && process.env.APPWRITE_API_KEY) {
    client
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
        .setKey(process.env.APPWRITE_API_KEY);
}

export const users = new Users(client);
export const databasesAdmin = new Databases(client);
