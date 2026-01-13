# QuicklyResumeThis

Transform messy resumes into clean, professional PDFs in seconds. Upload any resume format (PDF, Word, PowerPoint, or image) and get back a polished, ATS-friendly resume.

## Features

- **Multi-Format Support**: Upload PDF, DOCX, PPTX, or images (JPG, PNG)
- **AI-Powered Parsing**: Uses Claude AI to intelligently extract resume data
- **OCR Support**: Extract text from resume images using Tesseract.js
- **Live Preview**: See your resume as you edit with real-time updates
- **Professional Templates**: Modern, clean resume design
- **PDF Generation**: Download high-quality PDF resumes
- **Fully Editable**: Edit all sections including experience, education, skills, and certifications
- **Mobile Responsive**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **AI**: Anthropic Claude API
- **File Processing**: pdf-parse, mammoth, jszip, tesseract.js
- **PDF Generation**: react-pdf/renderer
- **Form Management**: react-hook-form + zod validation

## Getting Started

### Prerequisites

Make sure you have the following installed:
- Node.js (v18 or later)
- npm or yarn or bun

### 1. Clone the Repository

First, clone the repository to your local machine:

**Using HTTPS:**
```bash
git clone https://github.com/mokhammadbahauddin/quicklyresumethis.git
cd quicklyresumethis
```

**Using SSH:**
```bash
git clone git@github.com:mokhammadbahauddin/quicklyresumethis.git
cd quicklyresumethis
```

### 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Set Up Environment Variables

Create a \`.env.local\` file:

\`\`\`bash
ANTHROPIC_API_KEY=your_api_key_here
\`\`\`

Get your API key from [console.anthropic.com](https://console.anthropic.com/).

### 4. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Usage

1. **Upload**: Drop your resume file (PDF, Word, PowerPoint, or image)
2. **Edit**: Review and modify the auto-extracted data
3. **Download**: Click "Download PDF" to get your professional resume

## Project Structure

\`\`\`
src/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── edit/page.tsx               # Resume editing page
│   └── api/
│       ├── parse/route.ts          # File processing endpoint
│       └── generate-pdf/route.tsx  # PDF generation endpoint
├── components/
│   ├── FileUpload.tsx              # File upload component
│   ├── ResumeEditor.tsx            # Editable form component
│   ├── ResumePreview.tsx           # Live preview component
│   └── templates/
│       └── ModernTemplate.tsx      # Resume template
└── lib/
    ├── fileProcessors.ts           # File text extraction
    ├── aiParser.ts                 # Claude AI integration
    ├── pdfGenerator.tsx            # PDF generation logic
    └── types.ts                    # TypeScript interfaces
\`\`\`

## Deployment

Deploy to Vercel:

1. Push code to GitHub
2. Import project in Vercel
3. Add \`ANTHROPIC_API_KEY\` environment variable
4. Deploy

## License

MIT
