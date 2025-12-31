import { ResumeData } from '@/lib/types';
import ModernTemplate from './templates/ModernTemplate';

interface ResumePreviewProps {
  data: ResumeData;
}

export default function ResumePreview({ data }: ResumePreviewProps) {
  return (
    <div className="w-full">
      <div
        className="bg-white shadow-lg rounded mx-auto overflow-auto"
        style={{
          maxWidth: '800px',
          maxHeight: '1100px',
        }}
      >
        <ModernTemplate data={data} />
      </div>
    </div>
  );
}
