import { ResumeData } from '@/lib/types';

interface TemplateProps {
  data: ResumeData;
}

export default function TechTemplate({ data }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications } = data;

  return (
    <div className="bg-slate-50 min-h-full font-mono text-slate-800">
      {/* Sidebar / Header Layout */}
      <div className="flex flex-col md:flex-row min-h-full">

        {/* Left Column (Header + Skills) */}
        <div className="md:w-1/3 bg-slate-900 text-slate-100 p-8 flex flex-col gap-8">
          <div>
            <h1 className="text-2xl font-bold mb-2 tracking-tighter text-blue-400">
              {personalInfo.fullName}
            </h1>
            <div className="text-xs text-slate-400 flex flex-col gap-1.5">
              {personalInfo.email && <div>✉ {personalInfo.email}</div>}
              {personalInfo.phone && <div>☎ {personalInfo.phone}</div>}
              {personalInfo.location && <div>📍 {personalInfo.location}</div>}
              {personalInfo.linkedin && (
                <a href={personalInfo.linkedin} className="text-blue-300 hover:underline truncate block">
                  in/ {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}
                </a>
              )}
              {personalInfo.website && (
                 <a href={personalInfo.website} className="text-blue-300 hover:underline truncate block">
                   🌐 {personalInfo.website.replace(/^https?:\/\//, '')}
                 </a>
              )}
            </div>
          </div>

          {skills && skills.length > 0 && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-3 border-b border-slate-700 pb-1">
                Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-slate-800 text-blue-200 px-2 py-1 text-xs rounded border border-slate-700 font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {education && education.length > 0 && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-3 border-b border-slate-700 pb-1">
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="text-sm">
                    <div className="font-bold text-slate-200">{edu.degree}</div>
                    <div className="text-slate-400 text-xs">{edu.institution}</div>
                    <div className="text-slate-500 text-xs">{edu.graduationDate}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

           {certifications && certifications.length > 0 && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-3 border-b border-slate-700 pb-1">
                Certs
              </h2>
              <ul className="text-xs space-y-2 text-slate-300">
                {certifications.map((cert, index) => (
                  <li key={index}>
                    <span className="block font-semibold text-blue-200">{cert.name}</span>
                    <span className="text-slate-500">{cert.issuer}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column (Content) */}
        <div className="md:w-2/3 p-8 bg-white">
          {summary && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 border-l-4 border-blue-500 pl-3 mb-3">
                &gt; summary
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">{summary}</p>
            </div>
          )}

          {experience && experience.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-slate-900 border-l-4 border-blue-500 pl-3 mb-6">
                &gt; experience
              </h2>
              <div className="space-y-8">
                {experience.map((exp, index) => (
                  <div key={index} className="relative pl-4 border-l border-slate-200">
                    <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-white"></div>

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                      <h3 className="font-bold text-slate-800 text-base">{exp.jobTitle}</h3>
                      <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>

                    <div className="text-sm text-blue-600 font-medium mb-2">
                      @{exp.company}
                    </div>

                    {exp.description && (
                      <p className="text-sm text-slate-600 mb-2 leading-relaxed">
                        {exp.description}
                      </p>
                    )}

                    {exp.achievements && exp.achievements.length > 0 && (
                      <ul className="space-y-1 mt-2">
                        {exp.achievements.map((item, idx) => (
                          <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                            <span className="text-blue-400 mt-1">▹</span>
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
