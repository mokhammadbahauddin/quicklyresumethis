import { Client } from 'node-appwrite';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default async ({ req, res, log, error }) => {
  if (!process.env.GEMINI_API_KEY) {
      return res.json({ success: false, error: "Server Error: Missing Gemini API Key" }, 500);
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  try {
    const { text } = JSON.parse(req.body);

    if (!text) {
        return res.json({ success: false, error: "Missing text" }, 400);
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Rewrite this resume bullet point to be more professional, action-oriented, and result-driven. Use strong verbs. Return only the enhanced text.\n\nInput: "${text}"`;

    const result = await model.generateContent(prompt);
    const enhancedText = result.response.text().trim();

    return res.json({ success: true, enhancedText });

  } catch (err) {
    error("Enhance Error: " + err.toString());
    return res.json({ success: false, error: "Failed to enhance text" }, 500);
  }
};
