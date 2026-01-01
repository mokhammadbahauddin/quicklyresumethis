import { GoogleGenerativeAI } from "@google/generative-ai";
import { ResumeData } from "./types";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function parseResumeWithGemini(text: string): Promise<ResumeData> {
  if (!genAI) {
    throw new Error("GEMINI_API_KEY is not set.");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    You are an expert resume parser. Extract the following information from the resume text below and return it as a valid JSON object matching this structure:

    interface ResumeData {
      personalInfo: {
        fullName: string;
        email: string;
        phone: string;
        location: string;
        linkedin?: string;
        website?: string;
      };
      summary?: string;
      experience: {
        jobTitle: string;
        company: string;
        location?: string;
        startDate: string;
        endDate: string;
        description: string;
        achievements: string[];
      }[];
      education: {
        degree: string;
        institution: string;
        location?: string;
        graduationDate: string;
        gpa?: string;
      }[];
      skills: string[];
      certifications?: {
        name: string;
        issuer: string;
        date?: string;
      }[];
    }

    Resume Text:
    ${text}

    Return ONLY the JSON. Do not include markdown formatting like \`\`\`json.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const jsonString = response.text().replace(/```json/g, '').replace(/```/g, '').trim();

    const data: ResumeData = JSON.parse(jsonString);
    return data;
  } catch (error) {
    console.error("Gemini Parse Error:", error);
    throw new Error("Failed to parse resume with Gemini.");
  }
}

export async function enhanceTextWithGemini(text: string): Promise<string> {
    if (!genAI) return text;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Rewrite this resume bullet point to be more professional, action-oriented, and result-driven. Use strong verbs. Return only the enhanced text.\n\nInput: "${text}"`;

    try {
        const result = await model.generateContent(prompt);
        return result.response.text().trim();
    } catch (error) {
        console.error("Gemini Enhance Error:", error);
        return text;
    }
}
