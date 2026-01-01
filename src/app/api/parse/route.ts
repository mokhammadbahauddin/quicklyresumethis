import { NextRequest, NextResponse } from 'next/server';
import { extractTextFromFile } from '@/lib/fileProcessors';
import { parseResumeWithGemini } from '@/lib/aiParser';
import { ApiResponse, ResumeData } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: 'No file provided',
        },
        { status: 400 }
      );
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: 'File must be under 10MB',
        },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/vnd.ms-powerpoint',
      'image/jpeg',
      'image/jpg',
      'image/png',
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: 'Please upload PDF, Word, PowerPoint, or image files',
        },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Extract text from file
    let extractedText: string;
    try {
      extractedText = await extractTextFromFile(buffer, file.type);
    } catch (error) {
      console.error('Text extraction error:', error);
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: 'Could not extract text from file',
        },
        { status: 400 }
      );
    }

    // Check if extracted text is empty
    if (!extractedText || extractedText.trim().length === 0) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: 'File appears to be empty',
        },
        { status: 400 }
      );
    }

    // Check API key configuration
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY not configured');
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: 'API key not configured. Please add GEMINI_API_KEY to your .env.local file.',
        },
        { status: 500 }
      );
    }

    // Parse resume data using Gemini AI
    let resumeData: ResumeData;
    try {
      resumeData = await parseResumeWithGemini(extractedText);
    } catch (error) {
      console.error('AI parsing error:', error);

      // Enhanced error messages based on error type
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      // Check for API key related errors
      if (errorMessage.includes('api_key') || errorMessage.includes('authentication')) {
        return NextResponse.json<ApiResponse<null>>(
          {
            success: false,
            error: 'Invalid API key. Please check your GEMINI_API_KEY in .env.local.',
          },
          { status: 401 }
        );
      }

      // Check for rate limiting
      if (errorMessage.includes('rate_limit') || errorMessage.includes('429')) {
        return NextResponse.json<ApiResponse<null>>(
          {
            success: false,
            error: 'API rate limit reached. Please wait a moment and try again.',
          },
          { status: 429 }
        );
      }

      // Generic AI error
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: 'Failed to process resume data. Please try again.',
        },
        { status: 500 }
      );
    }

    // Return parsed data
    return NextResponse.json<ApiResponse<ResumeData>>(
      {
        success: true,
        data: resumeData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Parse API error:', error);
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: 'Something went wrong. Please try again',
      },
      { status: 500 }
    );
  }
}
