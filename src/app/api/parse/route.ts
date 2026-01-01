import { NextRequest, NextResponse } from 'next/server';
import { extractTextFromFile } from '@/lib/fileProcessors';
import { parseResumeWithGemini } from '@/lib/aiParser';
import { databasesAdmin } from '@/lib/appwrite-admin';
import { APPWRITE_DB_ID, APPWRITE_COLLECTION_RESUMES } from '@/lib/appwrite';
import { ID } from 'node-appwrite';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const userId = formData.get('userId') as string;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const text = await extractTextFromFile(buffer, file.type);
    const resumeData = await parseResumeWithGemini(text);

    // Save to Appwrite
    let resumeId = null;
    if (userId && process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID) {
       try {
         // Ensure DB/Collection exists (usually manual setup, but we'll try to insert)
         const doc = await databasesAdmin.createDocument(
            APPWRITE_DB_ID,
            APPWRITE_COLLECTION_RESUMES,
            ID.unique(),
            {
               user_id: userId,
               title: file.name,
               content: JSON.stringify(resumeData),
               status: 'draft',
               last_updated: new Date().toISOString()
            }
         );
         resumeId = doc.$id;
       } catch (e) {
         console.error("Appwrite Save Failed (Make sure Collections exist)", e);
       }
    }

    return NextResponse.json({ success: true, data: resumeData, resumeId });

  } catch (error: any) {
    console.error('Parse error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
