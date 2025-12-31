import { ResumeData } from '@/lib/types';

interface TemplateProps {
  data: ResumeData;
}

export default function CreativeTemplate({ data }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications } = data;

  return (
    <div className="bg-white min-h-full font-sans text-gray-800 flex flex-col">
      {/* Creative Header */}
      <div className="bg-purple-600 text-white p-8 rounded-br-[4rem] shadow-lg mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-black opacity-10 rounded-full -ml-10 -mb-10"></div>

        <h1 className="text-4xl font-extrabold mb-2 tracking-tight">
          {personalInfo.fullName}
        </h1>
        <div className="text-purple-100 font-medium flex flex-wrap gap-4 text-sm">
          {personalInfo.email && <span className="flex items-center gap-1">✉ {personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1">☎ {personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center gap-1">📍 {personalInfo.location}</span>}
        </div>
        <div className="mt-4 flex gap-4 text-xs font-bold uppercase tracking-wider text-purple-200">
           {personalInfo.linkedin && (
             <a href={personalInfo.linkedin} className="hover:text-white border-b border-transparent hover:border-white transition-colors">LinkedIn</a>
           )}
           {personalInfo.website && (
             <a href={personalInfo.website} className="hover:text-white border-b border-transparent hover:border-white transition-colors">Portfolio</a>
           )}
        </div>
      </div>

      <div className="px-8 pb-8 flex flex-col md:flex-row gap-8">
        {/* Left Sidebar */}
        <div className="md:w-1/3 flex flex-col gap-8">
           {skills && skills.length > 0 && (
            <div className="bg-purple-50 p-6 rounded-2xl">
              <h2 className="text-purple-700 font-bold text-lg mb-4 flex items-center gap-2">
                <span>⚡</span> Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-white text-purple-600 px-3 py-1 text-sm rounded-full font-bold shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {education && education.length > 0 && (
            <div>
              <h2 className="text-gray-900 font-bold text-lg mb-4 border-b-2 border-purple-200 pb-1">Education</h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="relative pl-4 border-l-2 border-purple-200">
                    <div className="font-bold text-gray-800">{edu.degree}</div>
                    <div className="text-purple-600 font-medium text-sm">{edu.institution}</div>
                    <div className="text-gray-500 text-xs mt-1">{edu.graduationDate}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {certifications && certifications.length > 0 && (
            <div>
              <h2 className="text-gray-900 font-bold text-lg mb-4 border-b-2 border-purple-200 pb-1">Awards</h2>
              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <div className="font-bold text-gray-800 text-sm">{cert.name}</div>
                    <div className="text-gray-500 text-xs">{cert.issuer}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="md:w-2/3 flex flex-col gap-8">
          {summary && (
            <div>
              <h2 className="text-gray-900 font-bold text-xl mb-3">About Me</h2>
              <p className="text-gray-600 leading-relaxed bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                {summary}
              </p>
            </div>
          )}

          {experience && experience.length > 0 && (
            <div>
               <h2 className="text-gray-900 font-bold text-xl mb-4 flex items-center gap-2">
                <span>💼</span> Experience
              </h2>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={index} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                        {exp.jobTitle}
                      </h3>
                      <span className="text-xs font-bold bg-purple-100 text-purple-700 px-2 py-1 rounded-md">
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-gray-500 mb-3">
                      {exp.company} • {exp.location}
                    </div>

                    {exp.description && (
                      <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                        {exp.description}
                      </p>
                    )}

                    {exp.achievements && exp.achievements.length > 0 && (
                      <ul className="grid grid-cols-1 gap-2">
                        {exp.achievements.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="text-purple-400 mt-1">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
