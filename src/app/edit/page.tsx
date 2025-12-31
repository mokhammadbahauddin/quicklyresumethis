'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ResumeEditor from '@/components/ResumeEditor';
import ResumePreview, { TemplateType } from '@/components/ResumePreview';
import { ResumeData } from '@/lib/types';
import { Download, AlertCircle, LayoutTemplate } from 'lucide-react';

export default function EditPage() {
  const router = useRouter();
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [template, setTemplate] = useState<TemplateType>('modern');
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

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

  const checkDownloadLimit = () => {
    const downloads = parseInt(localStorage.getItem('downloadCount') || '0');
    const lastDownloadMonth = localStorage.getItem('lastDownloadMonth');
    const currentMonth = new Date().getMonth().toString();

    // Reset count if new month
    if (lastDownloadMonth !== currentMonth) {
      localStorage.setItem('downloadCount', '0');
      localStorage.setItem('lastDownloadMonth', currentMonth);
      return true;
    }

    // Free tier limit: 3 downloads
    if (downloads >= 3) {
      setShowUpgradeModal(true);
      return false;
    }

    return true;
  };

  const handleDownloadPDF = async () => {
    if (!resumeData) return;

    // Check limits
    if (!checkDownloadLimit()) return;

    setError(null);
    setIsDownloading(true);

    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resumeData, template }),
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
      a.download = `resume_${sanitizedName}_${template}_${timestamp}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);

      // Increment download count
      const currentCount = parseInt(localStorage.getItem('downloadCount') || '0');
      localStorage.setItem('downloadCount', (currentCount + 1).toString());

    } catch (err) {
      console.error('PDF generation error:', err);
      setError('Failed to generate PDF. Please try again');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleStartOver = () => {
    if (confirm('Are you sure? Unsaved changes will be lost.')) {
      sessionStorage.removeItem('resumeData');
      router.push('/');
    }
  };

  if (!resumeData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-start">
             <div className="flex items-center gap-2">
               <button onClick={() => router.push('/')} className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                QuicklyResumeThis
               </button>
               <span className="text-gray-300 hidden sm:inline">|</span>
               <h1 className="text-lg font-medium text-gray-600 hidden sm:inline">Editor</h1>
             </div>

             {/* Mobile Template Switcher */}
             <div className="md:hidden">
                <select
                  value={template}
                  onChange={(e) => setTemplate(e.target.value as TemplateType)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option value="modern">Modern</option>
                  <option value="minimal">Minimal</option>
                  <option value="tech">Tech</option>
                  <option value="creative">Creative</option>
                  <option value="academic">Academic</option>
                </select>
             </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            {/* Desktop Template Switcher */}
            <div className="hidden md:flex items-center bg-gray-100 p-1 rounded-lg mr-2 overflow-x-auto max-w-md no-scrollbar">
              {['modern', 'minimal', 'tech', 'creative', 'academic'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTemplate(t as TemplateType)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all capitalize whitespace-nowrap ${
                    template === t ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <button
              onClick={handleStartOver}
              className="px-4 py-2 text-gray-600 hover:text-red-600 text-sm font-medium transition-colors hidden sm:block"
            >
              Start Over
            </button>
            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm font-bold flex items-center gap-2 transition-all transform hover:scale-105 whitespace-nowrap"
            >
              {isDownloading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Download size={18} />
                  Download PDF
                </>
              )}
            </button>
          </div>
        </div>
        {error && (
          <div className="max-w-7xl mx-auto mt-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-2 animate-pulse">
            <AlertCircle size={16} />
            {error}
          </div>
        )}
      </header>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-600">
              <span className="text-3xl">👑</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Upgrade to Premium</h3>
            <p className="text-gray-600 mb-6">
              You&apos;ve reached your free download limit (3/month). Upgrade now for unlimited downloads and premium templates!
            </p>
            <div className="space-y-3">
              <button
                onClick={() => alert('Redirecting to payment... (Mock)')}
                className="w-full py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold rounded-xl hover:shadow-lg transition-all"
              >
                Upgrade for $9.99/mo
              </button>
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="text-sm text-gray-500 hover:text-gray-700 underline"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Tabs */}
      <div className="lg:hidden bg-white border-b border-gray-200 sticky top-[73px] z-10">
        <div className="flex">
          <button
            onClick={() => setActiveTab('edit')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'edit'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Edit
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'preview'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Preview
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 flex-1 w-full">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 h-full">
          {/* Editor Column */}
          <div
            className={`lg:col-span-7 xl:col-span-6 h-full ${
              activeTab === 'edit' ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full overflow-hidden flex flex-col">
              <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                 <h2 className="font-semibold text-gray-700 flex items-center gap-2">
                   Resume Content
                 </h2>
                 <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">Auto-saving</span>
              </div>
              <div className="p-0 flex-1 overflow-hidden">
                <ResumeEditor initialData={resumeData} onChange={handleDataChange} />
              </div>
            </div>
          </div>

          {/* Preview Column */}
          <div
            className={`lg:col-span-5 xl:col-span-6 ${
              activeTab === 'preview' ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="sticky top-24">
              <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700">
                <div className="p-3 border-b border-gray-700 flex justify-between items-center">
                  <span className="text-gray-300 text-sm font-medium">Live Preview</span>
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                </div>
                <div className="p-4 md:p-8 bg-gray-500/10 backdrop-blur-sm max-h-[calc(100vh-140px)] overflow-y-auto custom-scrollbar">
                  <div className="transform origin-top transition-transform duration-200">
                     <ResumePreview data={resumeData} template={template} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
