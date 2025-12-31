import { ResumeData } from '@/lib/types';

interface TemplateProps {
  data: ResumeData;
}

export default function AcademicTemplate({ data }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications } = data;

  return (
    <div className="bg-white p-12 font-serif text-gray-900 leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
      {/* Centered Classic Header */}
      <div className="text-center border-b-2 border-gray-900 pb-4 mb-6">
        <h1 className="text-2xl font-bold uppercase tracking-widest mb-2">
          {personalInfo.fullName}
        </h1>
        <div className="text-sm text-gray-700 flex justify-center gap-4 flex-wrap">
          <span>{personalInfo.location}</span>
          <span>•</span>
          <span>{personalInfo.email}</span>
          <span>•</span>
          <span>{personalInfo.phone}</span>
        </div>
        <div className="text-sm text-blue-800 mt-1 flex justify-center gap-4">
           {personalInfo.linkedin && <a href={personalInfo.linkedin} className="hover:underline">LinkedIn</a>}
           {personalInfo.website && <a href={personalInfo.website} className="hover:underline">Website</a>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-3 pb-1">Professional Profile</h2>
          <p className="text-sm text-justify">{summary}</p>
        </div>
      )}

      {/* Education First for Academic */}
      {education && education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-3 pb-1">Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between font-bold text-sm">
                <span>{edu.institution}</span>
                <span>{edu.location}</span>
              </div>
              <div className="flex justify-between text-sm italic">
                <span>{edu.degree}</span>
                <span>{edu.graduationDate}</span>
              </div>
              {edu.gpa && <div className="text-xs mt-1">GPA: {edu.gpa}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-3 pb-1">Professional Experience</h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between font-bold text-sm">
                <span>{exp.company}</span>
                <span>{exp.location}</span>
              </div>
              <div className="flex justify-between text-sm italic mb-1">
                <span>{exp.jobTitle}</span>
                <span>{exp.startDate} – {exp.endDate}</span>
              </div>
              {exp.description && <p className="text-sm mb-2">{exp.description}</p>}
              {exp.achievements && exp.achievements.length > 0 && (
                <ul className="list-disc ml-5 text-sm space-y-0.5">
                  {exp.achievements.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills & Certs Compact */}
      <div className="grid grid-cols-2 gap-8">
        {skills && skills.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-3 pb-1">Skills</h2>
            <div className="text-sm">
              {skills.join(' • ')}
            </div>
          </div>
        )}

        {certifications && certifications.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-3 pb-1">Certifications</h2>
            <ul className="list-none text-sm space-y-1">
              {certifications.map((cert, index) => (
                <li key={index}>
                  <span className="font-semibold">{cert.name}</span> <span className="text-gray-600">- {cert.issuer}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
