import LZString from 'lz-string';
import { ResumeData } from './types';

export function compressData(data: ResumeData): string {
  return LZString.compressToEncodedURIComponent(JSON.stringify(data));
}

export function decompressData(encoded: string): ResumeData | null {
  try {
    const decompressed = LZString.decompressFromEncodedURIComponent(encoded);
    if (!decompressed) return null;
    return JSON.parse(decompressed);
  } catch (e) {
    console.error('Failed to decompress data', e);
    return null;
  }
}
