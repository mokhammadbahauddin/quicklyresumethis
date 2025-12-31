import { ResumeData } from '@/lib/types';
import ModernTemplate from './templates/ModernTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import TechTemplate from './templates/TechTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import AcademicTemplate from './templates/AcademicTemplate';

export type TemplateType = 'modern' | 'minimal' | 'tech' | 'creative' | 'academic';

interface ResumePreviewProps {
  data: ResumeData;
  template: TemplateType;
}

export default function ResumePreview({ data, template }: ResumePreviewProps) {
  const getTemplate = () => {
    switch (template) {
      case 'minimal':
        return <MinimalTemplate data={data} />;
      case 'tech':
        return <TechTemplate data={data} />;
      case 'creative':
        return <CreativeTemplate data={data} />;
      case 'academic':
        return <AcademicTemplate data={data} />;
      case 'modern':
      default:
        return <ModernTemplate data={data} />;
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-start p-4">
      <div
        className="bg-white shadow-2xl transition-all duration-300 w-full"
        style={{
          width: '210mm',
          minHeight: '297mm',
          transform: 'scale(0.85)', // Slight scale down to fit comfortably
          transformOrigin: 'top center',
        }}
      >
        {getTemplate()}
      </div>
    </div>
  );
}
