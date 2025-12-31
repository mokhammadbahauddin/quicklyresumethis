import { ResumeData } from '@/lib/types';

interface ModernTemplateProps {
  data: ResumeData;
}

export default function ModernTemplate({ data }: ModernTemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications } = data;

  return (
    <div className="bg-white p-10 font-sans" style={{ lineHeight: 1.5 }}>
      {/* Header Section */}
      <div className="text-center mb-5">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {personalInfo.fullName}
        </h1>
        <div className="text-xs text-gray-600">
          {[
            personalInfo.email,
            personalInfo.phone,
            personalInfo.location,
            personalInfo.linkedin,
            personalInfo.website,
          ]
            .filter(Boolean)
            .join(' | ')}
        </div>
      </div>

      {/* Summary Section */}
      {summary && (
        <div className="mb-6">
          <p className="text-sm italic text-gray-700">{summary}</p>
        </div>
      )}

      {/* Experience Section */}
      {experience && experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase text-blue-600 border-b-2 border-blue-600 mb-3">
            Experience
          </h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-5">
              <div className="font-bold text-base text-gray-900">
                {exp.jobTitle}
              </div>
              <div className="text-sm italic text-gray-600">
                {exp.company}
              </div>
              <div className="text-xs text-gray-500 mb-2">
                {[exp.location, `${exp.startDate} - ${exp.endDate}`]
                  .filter(Boolean)
                  .join(' | ')}
              </div>
              {exp.description && (
                <p className="text-sm text-gray-800 mb-2">{exp.description}</p>
              )}
              {exp.achievements && exp.achievements.length > 0 && (
                <ul className="list-disc ml-5 text-sm text-gray-800">
                  {exp.achievements.map((achievement, idx) => (
                    <li key={idx} className="mb-1">
                      {achievement}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education Section */}
      {education && education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase text-blue-600 border-b-2 border-blue-600 mb-3">
            Education
          </h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="font-bold text-base text-gray-900">
                {edu.degree}
              </div>
              <div className="text-sm italic text-gray-600">
                {edu.institution}
              </div>
              <div className="text-xs text-gray-500">
                {[edu.location, edu.graduationDate].filter(Boolean).join(' | ')}
              </div>
              {edu.gpa && (
                <div className="text-xs text-gray-500">GPA: {edu.gpa}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills Section */}
      {skills && skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase text-blue-600 border-b-2 border-blue-600 mb-3">
            Skills
          </h2>
          <div className="text-sm text-gray-800">
            {skills.join(', ')}
          </div>
        </div>
      )}

      {/* Certifications Section */}
      {certifications && certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase text-blue-600 border-b-2 border-blue-600 mb-3">
            Certifications
          </h2>
          {certifications.map((cert, index) => (
            <div key={index} className="mb-3">
              <div className="font-bold text-sm text-gray-900">
                {cert.name}
              </div>
              <div className="text-sm italic text-gray-600">
                {cert.issuer}
              </div>
              {cert.date && (
                <div className="text-xs text-gray-500">{cert.date}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
