'use client';

import FileUpload from '@/components/FileUpload';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Shield, Clock, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              Q
            </div>
            <span className="font-bold text-xl tracking-tight">QuicklyResumeThis</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How it Works</a>
            <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
            <button
              onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-4 py-2 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all hover:shadow-lg"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100 rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-100 rounded-full blur-3xl opacity-30 animate-pulse-slow delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto mb-12"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium border border-blue-100 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              v2.0 Now Available with AI Enhancement
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6">
              Build your dream resume <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                in seconds, not hours.
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Upload your old resume and let our AI transform it into a professional, ATS-friendly masterpiece. No sign-up required.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-white/50 backdrop-blur-xl rounded-2xl p-2 shadow-2xl border border-white/20 ring-1 ring-slate-900/5">
              <FileUpload />
            </div>
            <p className="text-center text-sm text-slate-500 mt-4">
              Supported: PDF, DOCX, PNG, JPG • 100% Private Processing
            </p>
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 border-y border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-8">Trusted by candidates hired at</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {['Google', 'Microsoft', 'Spotify', 'Airbnb', 'Netflix'].map((company) => (
              <span key={company} className="text-xl md:text-2xl font-bold text-slate-800">{company}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything you need to get hired</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">We analyzed 1M+ resumes to build a tool that actually works.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-6 h-6 text-yellow-500" />,
                title: "AI-Powered Parsing",
                desc: "Our engine extracts skills, experience, and education from any messy file instantly."
              },
              {
                icon: <Shield className="w-6 h-6 text-green-500" />,
                title: "ATS-Friendly PDF",
                desc: "Generated PDFs pass 99% of Applicant Tracking Systems. No broken layouts."
              },
              {
                icon: <Clock className="w-6 h-6 text-blue-500" />,
                title: "Real-Time Preview",
                desc: "See your changes instantly. WYSIWYG editor guarantees no surprises."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-slate-400">Start for free, upgrade for power.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="p-8 rounded-3xl bg-slate-800 border border-slate-700 hover:border-slate-600 transition-all">
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-100 mb-2">Starter</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-slate-400">/forever</span>
                </div>
                <p className="text-slate-400 mt-4">Perfect for a quick update.</p>
              </div>
              <ul className="space-y-4 mb-8">
                {['3 Downloads per month', 'Access to Modern Template', 'Basic AI Parsing', 'Watermarked PDF'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-300">
                    <Check className="w-5 h-5 text-blue-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full py-4 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-semibold transition-all"
              >
                Start for Free
              </button>
            </div>

            {/* Pro Plan */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-blue-600 to-blue-700 shadow-2xl transform md:scale-105 border border-blue-400 relative">
              <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl uppercase tracking-wider">
                Best Value
              </div>
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-2">Pro</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">$9</span>
                  <span className="text-blue-100">/month</span>
                </div>
                <p className="text-blue-100 mt-4">For serious job seekers.</p>
              </div>
              <ul className="space-y-4 mb-8">
                {['Unlimited Downloads', 'All 5 Premium Templates', 'Advanced AI Writer', 'No Watermark', 'Priority Support'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white">
                    <div className="bg-blue-500 rounded-full p-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 bg-white text-blue-600 hover:bg-blue-50 rounded-xl font-bold transition-all shadow-lg">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Is it really free?", a: "Yes! You can build and download 3 resumes per month completely free." },
              { q: "Will this pass ATS?", a: "Absolutely. We use standard fonts and structures that are optimized for Applicant Tracking Systems." },
              { q: "Can I cancel anytime?", a: "Yes. If you upgrade to Pro, you can cancel your subscription instantly from your dashboard." },
            ].map((faq, i) => (
              <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-slate-900">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-slate-600 animate-slide-down">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              Q
            </div>
            <span className="font-bold text-slate-700">QuicklyResumeThis</span>
          </div>
          <div className="text-slate-500 text-sm">
            © {new Date().getFullYear()} QuicklyResumeThis. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
