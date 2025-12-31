import mammoth from 'mammoth';
import Tesseract from 'tesseract.js';
import JSZip from 'jszip';
import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker
if (typeof window === 'undefined') {
  // Server-side: use the worker from node_modules
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
}

/**
 * Extract text from various file formats
 */
export async function extractTextFromFile(file: Buffer, mimeType: string): Promise<string> {
  try {
    if (mimeType === 'application/pdf') {
      return await extractTextFromPDF(file);
    } else if (
      mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      mimeType === 'application/msword'
    ) {
      return await extractTextFromDOCX(file);
    } else if (
      mimeType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
      mimeType === 'application/vnd.ms-powerpoint'
    ) {
      return await extractTextFromPPTX(file);
    } else if (mimeType.startsWith('image/')) {
      return await extractTextFromImage(file);
    } else {
      throw new Error('Unsupported file type');
    }
  } catch (error) {
    console.error('Error extracting text from file:', error);
    throw new Error('Could not extract text from file');
  }
}

/**
 * Extract text from PDF files using PDF.js
 */
async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    // Convert Buffer to Uint8Array
    const uint8Array = new Uint8Array(buffer);

    // Load the PDF document
    const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
    const pdfDocument = await loadingTask.promise;

    const textParts: string[] = [];

    // Extract text from each page
    for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
      const page = await pdfDocument.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      textParts.push(pageText);
    }

    const text = textParts.join('\n\n').trim();

    if (!text) {
      throw new Error('No text found in PDF');
    }

    return text;
  } catch (error) {
    console.error('PDF parsing error:', error);
    throw new Error('Failed to extract text from PDF');
  }
}

/**
 * Extract text from DOCX files
 */
async function extractTextFromDOCX(buffer: Buffer): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ buffer });
    const text = result.value.trim();

    if (!text) {
      throw new Error('No text found in DOCX');
    }

    return text;
  } catch (error) {
    console.error('DOCX parsing error:', error);
    throw new Error('Failed to extract text from DOCX');
  }
}

/**
 * Extract text from PPTX files
 * PPTX files are ZIP archives containing XML files
 */
async function extractTextFromPPTX(buffer: Buffer): Promise<string> {
  try {
    const zip = await JSZip.loadAsync(buffer);
    const slideTexts: string[] = [];

    // PPTX slide content is in ppt/slides/slide*.xml files
    const slideFiles = Object.keys(zip.files).filter(
      (fileName) => fileName.startsWith('ppt/slides/slide') && fileName.endsWith('.xml')
    );

    for (const slideFile of slideFiles) {
      const content = await zip.files[slideFile].async('text');
      // Extract text from XML by removing tags
      const textMatches = content.match(/<a:t>([^<]+)<\/a:t>/g);
      if (textMatches) {
        const slideText = textMatches
          .map((match) => match.replace(/<\/?a:t>/g, ''))
          .join(' ');
        slideTexts.push(slideText);
      }
    }

    const text = slideTexts.join('\n\n').trim();

    if (!text) {
      throw new Error('No text found in PPTX');
    }

    return text;
  } catch (error) {
    console.error('PPTX parsing error:', error);
    throw new Error('Failed to extract text from PPTX');
  }
}

/**
 * Extract text from image files using OCR
 */
async function extractTextFromImage(buffer: Buffer): Promise<string> {
  try {
    const { data: { text } } = await Tesseract.recognize(
      buffer,
      'eng',
      {
        logger: () => {}, // Suppress logging
      }
    );

    const cleanedText = text.trim();

    if (!cleanedText) {
      throw new Error('No text found in image');
    }

    return cleanedText;
  } catch (error) {
    console.error('OCR error:', error);
    throw new Error('Failed to extract text from image');
  }
}
