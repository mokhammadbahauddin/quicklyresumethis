'use client';

import FileUpload from '@/components/FileUpload';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Main content */}
        <main className="relative w-full max-w-6xl mx-auto px-4 py-12 md:py-20">
          {/* Trust badge */}
          <div className="flex justify-center mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-gray-200">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Trusted by 10,000+ job seekers</span>
            </div>
          </div>

          {/* Hero heading */}
          <div className="text-center mb-12 space-y-6">
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 animate-fade-in">
              Transform Your Resume
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                in Seconds
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto animate-fade-in animation-delay-200">
              Upload any resume format - PDF, Word, PowerPoint, or even images.
              <br />
              Get a professional, ATS-friendly resume instantly.
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-8 animate-fade-in animation-delay-400">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">30s</div>
                <div className="text-sm text-gray-600">Average time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">AI-Powered</div>
                <div className="text-sm text-gray-600">Claude 3.5</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600">100%</div>
                <div className="text-sm text-gray-600">Secure & Private</div>
              </div>
            </div>
          </div>

          {/* Upload section */}
          <div className="animate-fade-in animation-delay-600">
            <FileUpload />
          </div>

          {/* Supported formats */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500 mb-4">Supported formats:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-gray-700">PDF</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-gray-700">Word</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
                <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-gray-700">PowerPoint</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-gray-700">Images</span>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Why Choose QuicklyResumeThis?
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Powered by AI, designed for results
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 mx-auto mb-6 bg-blue-500 rounded-2xl flex items-center justify-center transform hover:rotate-6 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
              <p className="text-gray-600">
                Transform your resume in under 30 seconds. No waiting, no hassle.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 mx-auto mb-6 bg-purple-500 rounded-2xl flex items-center justify-center transform hover:rotate-6 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI-Powered</h3>
              <p className="text-gray-600">
                Claude 3.5 intelligently parses and structures your resume data.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-pink-50 to-pink-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 mx-auto mb-6 bg-pink-500 rounded-2xl flex items-center justify-center transform hover:rotate-6 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">100% Private</h3>
              <p className="text-gray-600">
                Your data is never stored. Process and download, that&apos;s it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Three simple steps to a perfect resume
          </p>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center relative">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Upload</h3>
              <p className="text-gray-600">
                Drop your resume in any format - PDF, Word, PowerPoint, or image
              </p>
              {/* Arrow */}
              <div className="hidden md:block absolute top-10 left-full w-12 h-0.5 bg-gradient-to-r from-blue-300 to-transparent transform -translate-x-6"></div>
            </div>

            {/* Step 2 */}
            <div className="text-center relative">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Transform</h3>
              <p className="text-gray-600">
                AI extracts and structures your information professionally
              </p>
              {/* Arrow */}
              <div className="hidden md:block absolute top-10 left-full w-12 h-0.5 bg-gradient-to-r from-purple-300 to-transparent transform -translate-x-6"></div>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Download</h3>
              <p className="text-gray-600">
                Edit if needed, then download your polished resume as PDF
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to land your dream job?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands who&apos;ve transformed their resumes with QuicklyResumeThis
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-xl"
          >
              Get Started - It&apos;s Free
          </button>
        </div>
      </section>
    </div>
  );
}
