'use client';

import dynamic from 'next/dynamic';
import { ResumeData } from '@/lib/types';
import { ResumePDFDocument } from '@/lib/pdfGenerator';

export type TemplateType = 'modern' | 'minimal' | 'tech' | 'creative' | 'academic';

// Dynamically import PDFViewer to avoid SSR issues
const PDFViewer = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full min-h-[500px] bg-gray-50 text-gray-400 rounded-lg border-2 border-dashed border-gray-200">
        <div className="animate-pulse flex flex-col items-center gap-3">
          <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
          <span className="text-sm font-medium">Generating Preview...</span>
        </div>
      </div>
    ),
  }
);

interface ResumePreviewProps {
  data: ResumeData;
  template: TemplateType;
  isPremium?: boolean;
}

export default function ResumePreview({ data, template, isPremium = false }: ResumePreviewProps) {
  return (
    <div className="w-full h-full flex justify-center items-start overflow-hidden rounded-xl">
      <PDFViewer
        className="w-full h-full min-h-[calc(100vh-180px)] border-0 shadow-lg"
        showToolbar={true} 
        style={{
             width: '100%',
             height: '100%',
        }}
      >
        <ResumePDFDocument data={data} template={template} isPremium={isPremium} />
      </PDFViewer>
    </div>
  );
}
