import Anthropic from '@anthropic-ai/sdk';
import { ResumeData } from './types';

/**
 * Parse resume text using Claude AI to extract structured data
 */
export async function parseResumeWithClaude(rawText: string): Promise<ResumeData> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY not configured');
  }

  const anthropic = new Anthropic({
    apiKey,
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
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      temperature: 0,
      system: 'You are a helpful assistant that extracts resume data into structured JSON format.',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    // Extract text content from the response
    const responseText = message.content
      .filter((block) => block.type === 'text')
      .map((block) => (block as { type: 'text'; text: string }).text)
      .join('');

    // Try to parse JSON from the response
    let parsedData: ResumeData;

    try {
      // Remove markdown code blocks if present
      const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      const jsonString = jsonMatch ? jsonMatch[1] : responseText;

      parsedData = JSON.parse(jsonString.trim());
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
    console.error('Claude API error:', error);
    if (error instanceof Error) {
      throw new Error(`AI parsing failed: ${error.message}`);
    }
    throw new Error('AI parsing failed');
  }
}
