import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: NextRequest) {
  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json(
      { success: false, error: "Server Error: Missing Gemini API Key" },
      { status: 500 }
    );
  }
  
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json(
        { success: false, error: "Missing text" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Rewrite this resume bullet point to be more professional, action-oriented, and result-driven. Use strong verbs. Return only the enhanced text.\n\nInput: "${text}"`;

    const result = await model.generateContent(prompt);
    const enhancedText = result.response.text().trim();

    return NextResponse.json({ success: true, enhancedText });

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown Error';
    console.error("Enhance Error: " + msg);
    return NextResponse.json(
      { success: false, error: "Failed to enhance text" },
      { status: 500 }
    );
  }
}
