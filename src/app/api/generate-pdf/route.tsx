import { NextRequest, NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { ResumePDFDocument } from '@/lib/pdfGenerator';
import { ResumeData } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { resumeData, template } = body as { resumeData: ResumeData, template?: any };

    if (!resumeData) {
      return NextResponse.json(
        { success: false, error: 'No resume data provided' },
        { status: 400 }
      );
    }

    // Validate required fields
    if (
      !resumeData.personalInfo?.fullName ||
      !resumeData.personalInfo?.email ||
      !resumeData.personalInfo?.phone
    ) {
      return NextResponse.json(
        { success: false, error: 'Please fill all required fields' },
        { status: 400 }
      );
    }

    // Generate PDF with selected template
    const pdfBuffer = await renderToBuffer(
      <ResumePDFDocument
        data={resumeData}
        template={template}
      />
    );

    // Return PDF as downloadable file
    return new NextResponse(pdfBuffer as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="resume.pdf"',
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}
