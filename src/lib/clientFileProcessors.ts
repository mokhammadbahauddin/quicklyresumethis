import mammoth from 'mammoth';
import Tesseract from 'tesseract.js';
import JSZip from 'jszip';
// Use build/pdf to avoid Node canvas dependency
// @ts-ignore
import * as pdfjsLib from 'pdfjs-dist/build/pdf';

// Configure PDF.js worker
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
}

/**
 * Extract text from various file formats (Client-side)
 */
export async function extractTextFromFile(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();

  try {
    if (file.type === 'application/pdf') {
      return await extractTextFromPDF(arrayBuffer);
    } else if (
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.type === 'application/msword'
    ) {
      return await extractTextFromDOCX(arrayBuffer);
    } else if (
      file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
      file.type === 'application/vnd.ms-powerpoint'
    ) {
      return await extractTextFromPPTX(arrayBuffer);
    } else if (file.type.startsWith('image/')) {
      return await extractTextFromImage(file); // Tesseract accepts File object directly
    } else {
      throw new Error('Unsupported file type');
    }
  } catch (error) {
    console.error('Error extracting text from file:', error);
    throw new Error('Could not extract text from file');
  }
}

async function extractTextFromPDF(arrayBuffer: ArrayBuffer): Promise<string> {
  try {
    const loadingTask = pdfjsLib.getDocument({
      data: arrayBuffer,
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

    return textParts.join('\n\n').trim();
  } catch (error) {
    console.error('PDF parsing error:', error);
    throw new Error('Failed to extract text from PDF.');
  }
}

async function extractTextFromDOCX(arrayBuffer: ArrayBuffer): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value.trim();
  } catch (error) {
    console.error('DOCX parsing error:', error);
    throw new Error('Failed to extract text from DOCX');
  }
}

async function extractTextFromPPTX(arrayBuffer: ArrayBuffer): Promise<string> {
  try {
    const zip = await JSZip.loadAsync(arrayBuffer);
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

    return slideTexts.join('\n\n').trim();
  } catch (error) {
    console.error('PPTX parsing error:', error);
    throw new Error('Failed to extract text from PPTX');
  }
}

async function extractTextFromImage(file: File): Promise<string> {
  try {
    const { data: { text } } = await Tesseract.recognize(
      file,
      'eng'
    );
    return text.trim();
  } catch (error) {
    console.error('OCR error:', error);
    throw new Error('Failed to extract text from image');
  }
}
