import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ success: false, error: 'Invalid text provided' }, { status: 400 });
    }

    // Mock AI Enhancement Logic
    // In a real app, this would call OpenAI/Claude

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 800));

    let enhancedText = text;

    // Simple rule-based enhancements for the demo
    // 1. Capitalize first letter
    if (enhancedText.length > 0) {
        enhancedText = enhancedText.charAt(0).toUpperCase() + enhancedText.slice(1);
    }

    // 2. Fix common weak verbs
    const weakVerbs = {
        'worked on': 'Collaborated on',
        'made': 'Developed',
        'fixed': 'Resolved',
        'helped': 'Assisted',
        'led': 'Spearheaded',
        'managed': 'Orchestrated',
    };

    for (const [weak, strong] of Object.entries(weakVerbs)) {
        const regex = new RegExp(`\\b${weak}\\b`, 'gi');
        enhancedText = enhancedText.replace(regex, strong);
    }

    // 3. Ensure period at the end
    if (!enhancedText.endsWith('.') && enhancedText.length > 0) {
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
