import { ResumeData } from '@/lib/types';

interface TemplateProps {
  data: ResumeData;
}

export default function MinimalTemplate({ data }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications } = data;

  return (
    <div className="bg-white p-12 font-serif text-gray-800" style={{ lineHeight: 1.6 }}>
      {/* Header */}
      <div className="border-b-2 border-gray-900 pb-6 mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
          {personalInfo.fullName}
        </h1>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && (
             <a href={personalInfo.linkedin} className="hover:underline text-gray-800">LinkedIn</a>
          )}
          {personalInfo.website && (
             <a href={personalInfo.website} className="hover:underline text-gray-800">Portfolio</a>
          )}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-3">Summary</h2>
          <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-4">Experience</h2>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-gray-900">{exp.jobTitle}</h3>
                  <span className="text-sm text-gray-600 font-medium whitespace-nowrap">
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>
                <div className="text-sm text-gray-700 mb-2 italic">
                  {exp.company}{exp.location ? `, ${exp.location}` : ''}
                </div>
                {exp.description && (
                  <p className="text-sm text-gray-700 mb-2">{exp.description}</p>
                )}
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="list-disc ml-4 text-sm text-gray-700 space-y-1">
                    {exp.achievements.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-4">Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-gray-900">{edu.institution}</h3>
                <span className="text-sm text-gray-600 font-medium">{edu.graduationDate}</span>
              </div>
              <div className="text-sm text-gray-700">
                {edu.degree}
                {edu.gpa && <span> • GPA: {edu.gpa}</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-3">Skills</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            {skills.join(' • ')}
          </p>
        </div>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-3">Certifications</h2>
          <ul className="list-none space-y-1">
            {certifications.map((cert, index) => (
              <li key={index} className="text-sm text-gray-700">
                <span className="font-semibold">{cert.name}</span>
                <span className="text-gray-500"> — {cert.issuer} ({cert.date})</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
