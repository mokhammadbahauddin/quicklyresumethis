import { GoogleGenerativeAI } from '@google/generative-ai';
import { ResumeData } from './types';

/**
 * Parse resume text using Google Gemini to extract structured data
 */
export async function parseResumeWithGemini(rawText: string): Promise<ResumeData> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY not configured');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: {
      responseMimeType: "application/json",
    },
  });

  const prompt = `You are a resume parsing expert. Extract structured information from the following resume text.

Return ONLY valid JSON with this exact structure:
{
  "personalInfo": {
    "fullName": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": ""
  },
  "summary": "",
  "experience": [
    {
      "jobTitle": "",
      "company": "",
      "location": "",
      "startDate": "",
      "endDate": "",
      "description": "",
      "achievements": []
    }
  ],
  "education": [
    {
      "degree": "",
      "institution": "",
      "location": "",
      "graduationDate": "",
      "gpa": ""
    }
  ],
  "skills": [],
  "certifications": [
    {
      "name": "",
      "issuer": "",
      "date": ""
    }
  ]
}

Rules:
- Extract all information accurately
- Use empty strings for missing fields
- For dates, use format: "Month YYYY" (e.g., "January 2023")
- If currently employed, use "Present" for endDate
- Achievements should be bullet points from job descriptions
- Skills should be individual items (not grouped)

Resume text:
${rawText}`;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Try to parse JSON from the response
    let parsedData: ResumeData;

    try {
      parsedData = JSON.parse(responseText);
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      console.error('Response text:', responseText);
      throw new Error('Failed to parse AI response');
    }

    // Validate the structure
    if (!parsedData.personalInfo || !parsedData.experience || !parsedData.education || !parsedData.skills) {
      throw new Error('AI parsing failed: Invalid data structure');
    }

    return parsedData;
  } catch (error) {
    console.error('Gemini API error:', error);
    if (error instanceof Error) {
      throw new Error(`AI parsing failed: ${error.message}`);
    }
    throw new Error('AI parsing failed');
  }
}
