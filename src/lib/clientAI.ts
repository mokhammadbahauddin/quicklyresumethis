export async function enhanceTextClient(text: string): Promise<string> {
  // Simulate processing delay to feel "heavy" (like real AI)
  await new Promise(resolve => setTimeout(resolve, 600));

  // ------------------------------------------------------------------------
  // CLIENT-SIDE MOCK AI IMPLEMENTATION (Rule-based)
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

  return enhancedText;
}
