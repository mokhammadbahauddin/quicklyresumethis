import mammoth from 'mammoth';
import Tesseract from 'tesseract.js';
import JSZip from 'jszip';

// Import pdfjs-dist using the legacy build for Node.js support
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');

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
    if (error instanceof Error && error.message !== 'Could not extract text from file') {
        throw error;
    }
    throw new Error('Could not extract text from file');
  }
}

/**
 * Extract text from PDF files using pdfjs-dist (Node compatible)
 */
async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    // Convert Buffer to Uint8Array which pdfjs expects
    const uint8Array = new Uint8Array(buffer);

    // Loading document
    const loadingTask = pdfjsLib.getDocument({
      data: uint8Array,
      // Disable worker to run in main thread (Node.js)
      disableFontFace: true,
      verbosity: 0
    });

    const pdfDocument = await loadingTask.promise;
    const numPages = pdfDocument.numPages;
    const textParts: string[] = [];

    for (let i = 1; i <= numPages; i++) {
      const page = await pdfDocument.getPage(i);
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
    throw new Error('Failed to extract text from PDF. The file might be password protected or corrupted.');
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
 */
async function extractTextFromPPTX(buffer: Buffer): Promise<string> {
  try {
    const zip = await JSZip.loadAsync(buffer);
    const slideTexts: string[] = [];

    const slideFiles = Object.keys(zip.files).filter(
      (fileName) => fileName.startsWith('ppt/slides/slide') && fileName.endsWith('.xml')
    );

    slideFiles.sort((a, b) => {
        const numA = parseInt(a.match(/slide(\d+)\.xml/)?.[1] || '0');
        const numB = parseInt(b.match(/slide(\d+)\.xml/)?.[1] || '0');
        return numA - numB;
    });

    for (const slideFile of slideFiles) {
      const content = await zip.files[slideFile].async('text');
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
        logger: () => {},
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
