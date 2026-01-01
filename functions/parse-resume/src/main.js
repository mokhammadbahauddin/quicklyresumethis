import { Client, Databases, Storage, ID } from 'node-appwrite';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default async ({ req, res, log, error }) => {
  // Appwrite Setup
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const databases = new Databases(client);
  const storage = new Storage(client);

  if (!process.env.GEMINI_API_KEY) {
      return res.json({ success: false, error: "Server Error: Missing Gemini API Key" }, 500);
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  try {
    const payload = JSON.parse(req.body);
    const { fileId, userId } = payload;

    if (!fileId) {
        return res.json({ success: false, error: "Missing fileId" }, 400);
    }

    log(`Processing file: ${fileId} for user: ${userId}`);

    // 1. Get File Info (MimeType)
    const fileInfo = await storage.getFile(
        process.env.APPWRITE_BUCKET_ID,
        fileId
    );

    // 2. Download File Content
    const fileBuffer = await storage.getFileDownload(
      process.env.APPWRITE_BUCKET_ID,
      fileId
    );

    const base64Data = Buffer.from(fileBuffer).toString('base64');

    // 3. Call Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `
    You are an expert resume parser. Extract the information and return a valid JSON object with:
    {
      "personalInfo": { "fullName": "", "email": "", "phone": "", "location": "", "linkedin": "", "website": "" },
      "summary": "",
      "experience": [{ "jobTitle": "", "company": "", "startDate": "", "endDate": "", "description": "", "achievements": [] }],
      "education": [{ "degree": "", "institution": "", "location": "", "graduationDate": "", "gpa": "" }],
      "skills": [],
      "certifications": [{ "name": "", "issuer": "", "date": "" }]
    }
    Return ONLY the JSON string.
    `;

    const result = await model.generateContent([
      {
        inlineData: {
          data: base64Data,
          mimeType: fileInfo.mimeType,
        },
      },
      prompt
    ]);

    const responseText = result.response.text();
    const jsonString = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const resumeData = JSON.parse(jsonString);

    // 4. Save to DB
    let resumeId = null;
    if (userId) {
        const doc = await databases.createDocument(
          process.env.APPWRITE_DB_ID,
          process.env.APPWRITE_COLLECTION_RESUMES,
          ID.unique(),
          {
            user_id: userId,
            title: fileInfo.name,
            content: JSON.stringify(resumeData),
            status: 'draft',
            last_updated: new Date().toISOString(),
            original_file_id: fileId
          }
        );
        resumeId = doc.$id;
    }

    return res.json({ success: true, data: resumeData, resumeId });

  } catch (err) {
    error("Parse Error: " + err.toString());
    return res.json({ success: false, error: "Failed to parse resume: " + err.message }, 500);
  }
};
