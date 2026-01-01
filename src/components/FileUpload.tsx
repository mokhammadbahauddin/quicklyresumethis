'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDropzone } from 'react-dropzone';
import { useToast } from '@/hooks/useToast';
import { ToastContainer } from './Toast';
import { useAuth } from '@/context/AuthContext';

type UploadStage = 'idle' | 'uploading' | 'extracting' | 'processing' | 'finalizing';

const STAGE_MESSAGES = {
  idle: '',
  uploading: 'Uploading your file...',
  extracting: 'AI is analyzing your resume...',
  processing: 'Structuring data...',
  finalizing: 'Finalizing...',
};

const STAGE_PROGRESS = {
  idle: 0,
  uploading: 25,
  extracting: 50,
  processing: 85,
  finalizing: 95,
};

export default function FileUpload() {
  const router = useRouter();
  const { toasts, removeToast, error: showError, success: showSuccess } = useToast();
  const { user, loading } = useAuth();

  const [stage, setStage] = useState<UploadStage>('idle');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    if (!loading && !user) {
        router.push('/signup');
        return;
    }

    if (user) {
        // @ts-expect-error - prefs might not be typed on the user object from context
        const tier = user.prefs?.tier || 'free';
        // @ts-expect-error - prefs might not be typed on the user object from context
        const credits = user.prefs?.credits !== undefined ? user.prefs.credits : 3;

        if (tier === 'free' && credits <= 0) {
            showError("You have reached your free limit. Please upgrade to Pro.");
            return;
        }
    }

    const file = acceptedFiles[0];
    setFileName(file.name);
    setError(null);
    setStage('uploading');
    setProgress(0);

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('File must be under 10MB.');
      showError('File must be under 10MB.');
      setStage('idle');
      return;
    }

    try {
      setProgress(STAGE_PROGRESS.uploading);

      const formData = new FormData();
      formData.append('file', file);

      setStage('extracting');
      setProgress(STAGE_PROGRESS.extracting);

      const response = await fetch('/api/parse', {
        method: 'POST',
        body: formData,
      });

      setStage('processing');
      setProgress(STAGE_PROGRESS.processing);

      const responseBody = await response.json();

      if (responseBody.success) {
          setStage('finalizing');
          setProgress(STAGE_PROGRESS.finalizing);
          
          sessionStorage.setItem('resumeData', JSON.stringify(responseBody.data));
          setProgress(100);
          showSuccess('Resume processed successfully! Redirecting...');

          setTimeout(() => {
            router.push('/edit');
          }, 800);
      } else {
          throw new Error(responseBody.error || "Parsing failed");
      }

    } catch (err: unknown) {
      console.error('Upload error:', err);
      const msg = err instanceof Error ? err.message : 'Something went wrong.';
      setError(msg);
      showError(msg);
      setStage('idle');
      setProgress(0);
    }
  }, [router, showError, showSuccess, user, loading]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    maxFiles: 1,
    multiple: false,
    disabled: stage !== 'idle',
  });

  const isProcessing = stage !== 'idle';

  return (
    <>
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      <div className="w-full max-w-2xl mx-auto">
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300
            ${isDragActive ? 'border-blue-500 bg-blue-50 scale-105' : 'border-gray-300 bg-white'}
            ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-500 hover:bg-blue-50 hover:scale-102'}
          `}
        >
          <input {...getInputProps()} disabled={isProcessing} />

          {isProcessing ? (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="relative w-20 h-20">
                <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200"></div>
                <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500 absolute top-0 left-0"></div>
              </div>

              <div className="w-full max-w-xs">
                <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-blue-500 h-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-gray-600 text-sm font-medium">{STAGE_MESSAGES[stage]}</p>
                  <p className="text-blue-600 text-sm font-bold">{progress}%</p>
                </div>
              </div>

              {fileName && (
                <p className="text-gray-500 text-xs truncate max-w-xs">{fileName}</p>
              )}
            </div>
          ) : (
            <>
              <svg
                className={`mx-auto h-16 w-16 mb-4 transition-all duration-300 ${
                  isDragActive ? 'text-blue-500 scale-110' : 'text-gray-400'
                }`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-gray-700 text-lg font-medium mb-2">
                {isDragActive ? 'Drop your resume here!' : 'Drop your resume here or click to browse'}
              </p>
              <p className="text-gray-500 text-sm mb-4">
                PDF, Word, or Image (Max 10MB)
              </p>
              <div className="flex justify-center gap-3 flex-wrap">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  📄 PDF
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  📝 Word
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  🖼️ Image
                </span>
              </div>
            </>
          )}
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg animate-fade-in">
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="flex-1">
                <p className="text-red-800 text-sm font-medium">{error}</p>
                <button
                  onClick={() => {
                    setError(null);
                    setStage('idle');
                    setProgress(0);
                  }}
                  className="mt-2 text-red-700 hover:text-red-900 text-sm font-semibold underline"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
