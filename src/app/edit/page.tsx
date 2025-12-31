'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ResumeEditor from '@/components/ResumeEditor';
import ResumePreview from '@/components/ResumePreview';
import { ResumeData } from '@/lib/types';

export default function EditPage() {
  const router = useRouter();
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load resume data from sessionStorage
    const storedData = sessionStorage.getItem('resumeData');
    if (!storedData) {
      router.push('/');
      return;
    }

    try {
      const data: ResumeData = JSON.parse(storedData);
      setResumeData(data);
    } catch (err) {
      console.error('Error loading resume data:', err);
      router.push('/');
    }
  }, [router]);

  const handleDataChange = (newData: ResumeData) => {
    setResumeData(newData);
  };

  const handleDownloadPDF = async () => {
    if (!resumeData) return;

    setError(null);
    setIsDownloading(true);

    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resumeData }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      // Create download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const sanitizedName = resumeData.personalInfo.fullName
        .replace(/[^a-zA-Z0-9]/g, '_')
        .toLowerCase();
      const timestamp = Date.now();
      a.download = `resume_${sanitizedName}_${timestamp}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('PDF generation error:', err);
      setError('Failed to generate PDF. Please try again');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleStartOver = () => {
    sessionStorage.removeItem('resumeData');
    router.push('/');
  };

  if (!resumeData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Edit Your Resume</h1>
          <div className="flex gap-4">
            <button
              onClick={handleStartOver}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium"
            >
              Start Over
            </button>
            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium flex items-center gap-2"
            >
              {isDownloading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Generating PDF...
                </>
              ) : (
                'Download PDF'
              )}
            </button>
          </div>
        </div>
        {error && (
          <div className="max-w-7xl mx-auto mt-2 p-3 bg-red-50 border border-red-400 rounded text-red-700 text-sm">
            {error}
          </div>
        )}
      </header>

      {/* Mobile Tabs */}
      <div className="lg:hidden bg-white border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('edit')}
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === 'edit'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600'
            }`}
          >
            Edit
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === 'preview'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600'
            }`}
          >
            Preview
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="lg:grid lg:grid-cols-5 lg:gap-6">
          {/* Editor Column */}
          <div
            className={`lg:col-span-3 ${
              activeTab === 'edit' ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="bg-white rounded-lg shadow p-6">
              <ResumeEditor initialData={resumeData} onChange={handleDataChange} />
            </div>
          </div>

          {/* Preview Column */}
          <div
            className={`lg:col-span-2 ${
              activeTab === 'preview' ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="sticky top-24">
              <ResumePreview data={resumeData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
