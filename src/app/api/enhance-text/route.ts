import { NextResponse } from 'next/server';

// ----------------------------------------------------------------------------
// ⚡ UNCOMMENT THIS SECTION TO ENABLE REAL AI (OPENAI)
// ----------------------------------------------------------------------------
// import OpenAI from 'openai';
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
//
// async function realAI(text: string) {
//   const response = await openai.chat.completions.create({
//     model: "gpt-4o-mini",
//     messages: [
//       {
//         role: "system",
//         content: "You are an expert resume writer. Improve the following text to be more professional, action-oriented, and concise. Use strong verbs. Return only the improved text."
//       },
//       { role: "user", content: text }
//     ],
//   });
//   return response.choices[0].message.content;
// }
// ----------------------------------------------------------------------------

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ success: false, error: 'Invalid text provided' }, { status: 400 });
    }

    // Simulate processing delay to feel "heavy" (like real AI)
    await new Promise(resolve => setTimeout(resolve, 600));

    // ------------------------------------------------------------------------
    // MOCK AI IMPLEMENTATION (Rule-based)
    // ------------------------------------------------------------------------
    let enhancedText = text.trim();

    // 1. Capitalize first letter
    if (enhancedText.length > 0) {
        enhancedText = enhancedText.charAt(0).toUpperCase() + enhancedText.slice(1);
    }

    // 2. Strong Verb Replacement Dictionary
    const weakVerbs: Record<string, string> = {
        'worked on': 'Orchestrated',
        'helped': 'Facilitated',
        'made': 'Engineered',
        'fixed': 'Resolved',
        'managed': 'Directed',
        'led': 'Spearheaded',
        'created': 'Architected',
        'used': 'Leveraged',
        'talked to': 'Negotiated with',
        'responsible for': 'Accountable for',
        'saw': 'Identified',
        'did': 'Executed',
        'got': 'Achieved',
    };

    // Case-insensitive replacement
    for (const [weak, strong] of Object.entries(weakVerbs)) {
        const regex = new RegExp(`\\b${weak}\\b`, 'gi');
        enhancedText = enhancedText.replace(regex, strong);
    }

    // 3. Remove passive voice indicators (simple heuristic)
    enhancedText = enhancedText.replace(/\bwas responsible for\b/gi, 'Led');

    // 4. Ensure period at the end (if it looks like a sentence)
    if (enhancedText.length > 20 && !enhancedText.endsWith('.') && !enhancedText.endsWith('!')) {
        enhancedText += '.';
    }

    return NextResponse.json({
      success: true,
      enhancedText
    });

  } catch (error) {
    console.error('Enhancement error:', error);
    return NextResponse.json({ success: false, error: 'Failed to process text' }, { status: 500 });
  }
}
