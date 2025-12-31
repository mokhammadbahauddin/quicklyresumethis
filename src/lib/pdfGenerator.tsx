import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { ResumeData } from './types';

// Register fonts if needed, but we'll use standard fonts for simplicity/reliability
// Helvetica, Times-Roman, Courier are standard.

const stylesModern = StyleSheet.create({
  page: { padding: 40, fontSize: 12, fontFamily: 'Helvetica', lineHeight: 1.5, position: 'relative' },
  header: { textAlign: 'center', marginBottom: 20 },
  name: { fontSize: 32, fontFamily: 'Helvetica-Bold', marginBottom: 8, color: '#111827' },
  contact: { fontSize: 10, color: '#6b7280' },
  summary: { fontSize: 12, fontStyle: 'italic', color: '#4b5563', marginBottom: 16 },
  sectionHeader: { fontSize: 16, fontFamily: 'Helvetica-Bold', color: '#3b82f6', textTransform: 'uppercase', borderBottomWidth: 2, borderBottomColor: '#3b82f6', paddingBottom: 4, marginTop: 16, marginBottom: 12 },
  item: { marginBottom: 12 },
  title: { fontSize: 14, fontFamily: 'Helvetica-Bold', color: '#111827' },
  subtitle: { fontSize: 12, fontStyle: 'italic', color: '#6b7280', marginTop: 2 },
  meta: { fontSize: 10, color: '#6b7280', marginTop: 2, marginBottom: 4 },
  body: { fontSize: 12, color: '#374151', marginTop: 4 },
  bullet: { fontSize: 12, color: '#374151', marginBottom: 2, marginLeft: 10 },
});

const stylesMinimal = StyleSheet.create({
  page: { padding: 48, fontSize: 11, fontFamily: 'Times-Roman', lineHeight: 1.4, color: '#000', position: 'relative' },
  header: { borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 16, marginBottom: 24 },
  name: { fontSize: 28, fontFamily: 'Times-Bold', marginBottom: 6 },
  contact: { fontSize: 10, color: '#333', flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  sectionHeader: { fontSize: 12, fontFamily: 'Times-Bold', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 12, marginTop: 20 },
  item: { marginBottom: 10 },
  titleLine: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 2 },
  title: { fontSize: 12, fontFamily: 'Times-Bold' },
  date: { fontSize: 10, fontFamily: 'Times-Roman' },
  subtitle: { fontSize: 11, fontFamily: 'Times-Italic', marginBottom: 4 },
  body: { fontSize: 11, textAlign: 'justify' },
  bullet: { fontSize: 11, marginLeft: 12, marginBottom: 2 },
});

const stylesTech = StyleSheet.create({
  page: { padding: 40, fontSize: 10, fontFamily: 'Courier', backgroundColor: '#f8fafc', color: '#334155', position: 'relative' },
  header: { marginBottom: 24, padding: 16, backgroundColor: '#1e293b', color: '#f1f5f9' },
  name: { fontSize: 24, fontFamily: 'Courier-Bold', color: '#60a5fa', marginBottom: 8 },
  contact: { fontSize: 9, color: '#cbd5e1' },
  sectionHeader: { fontSize: 14, fontFamily: 'Courier-Bold', color: '#0f172a', borderLeftWidth: 4, borderLeftColor: '#3b82f6', paddingLeft: 8, marginBottom: 12, marginTop: 20 },
  item: { marginBottom: 16, paddingLeft: 12, borderLeftWidth: 1, borderLeftColor: '#e2e8f0' },
  title: { fontSize: 12, fontFamily: 'Courier-Bold', color: '#0f172a' },
  meta: { fontSize: 9, color: '#64748b', marginBottom: 4, backgroundColor: '#f1f5f9', padding: 2, alignSelf: 'flex-start' },
  body: { fontSize: 10, lineHeight: 1.4 },
  skillTag: { backgroundColor: '#1e293b', color: '#e2e8f0', padding: '2 4', borderRadius: 2, marginRight: 4, fontSize: 9 },
  skillsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
});

const stylesCreative = StyleSheet.create({
  page: { fontSize: 11, fontFamily: 'Helvetica', color: '#333', position: 'relative' },
  header: { backgroundColor: '#7c3aed', padding: 30, color: 'white', marginBottom: 20 },
  name: { fontSize: 30, fontFamily: 'Helvetica-Bold', marginBottom: 5 },
  contact: { fontSize: 10, opacity: 0.9, marginBottom: 10 },
  mainContainer: { flexDirection: 'row', paddingHorizontal: 30 },
  leftColumn: { width: '35%', paddingRight: 20 },
  rightColumn: { width: '65%' },
  sectionHeader: { fontSize: 14, fontFamily: 'Helvetica-Bold', color: '#7c3aed', marginBottom: 10, marginTop: 15 },
  item: { marginBottom: 15 },
  title: { fontSize: 12, fontFamily: 'Helvetica-Bold', color: '#111827' },
  subtitle: { fontSize: 10, color: '#6b7280', marginBottom: 4 },
  body: { fontSize: 11, lineHeight: 1.4, color: '#4b5563' },
  skillPill: { backgroundColor: '#f3e8ff', color: '#7c3aed', padding: '4 8', borderRadius: 10, marginBottom: 4, marginRight: 4, fontSize: 10, alignSelf: 'flex-start' },
  skillsContainer: { flexDirection: 'row', flexWrap: 'wrap' },
});

const stylesAcademic = StyleSheet.create({
  page: { padding: 50, fontSize: 11, fontFamily: 'Times-Roman', color: '#000', position: 'relative' },
  header: { textAlign: 'center', borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 10, marginBottom: 20 },
  name: { fontSize: 24, fontFamily: 'Times-Bold', marginBottom: 5, textTransform: 'uppercase' },
  contact: { fontSize: 10, marginBottom: 2 },
  sectionHeader: { fontSize: 12, fontFamily: 'Times-Bold', borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 10, marginTop: 15, textTransform: 'uppercase' },
  item: { marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  bold: { fontFamily: 'Times-Bold', fontSize: 11 },
  italic: { fontFamily: 'Times-Italic', fontSize: 11 },
  body: { fontSize: 11, lineHeight: 1.4, textAlign: 'justify' },
});

const Watermark = () => (
  <View style={{ position: 'absolute', bottom: 20, left: 0, right: 0, alignItems: 'center', opacity: 0.5 }}>
    <Text style={{ fontSize: 9, color: '#6b7280', fontFamily: 'Helvetica' }}>
      Built with QuicklyResumeThis • Get Pro to remove this
    </Text>
  </View>
);

interface ResumePDFDocumentProps {
  data: ResumeData;
  template?: 'modern' | 'minimal' | 'tech' | 'creative' | 'academic';
  isPremium?: boolean;
}

export function ResumePDFDocument({ data, template = 'modern', isPremium = false }: ResumePDFDocumentProps) {
  const { personalInfo, summary, experience, education, skills, certifications } = data;

  const RenderModern = () => (
    <Page size="A4" style={stylesModern.page}>
      <View style={stylesModern.header}>
        <Text style={stylesModern.name}>{personalInfo.fullName}</Text>
        <Text style={stylesModern.contact}>
          {[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.linkedin, personalInfo.website].filter(Boolean).join(' | ')}
        </Text>
      </View>
      {summary && <View><Text style={stylesModern.summary}>{summary}</Text></View>}

      {experience && experience.length > 0 && (
        <View>
          <Text style={stylesModern.sectionHeader}>Experience</Text>
          {experience.map((exp, index) => (
            <View key={index} style={stylesModern.item}>
              <Text style={stylesModern.title}>{exp.jobTitle}</Text>
              <Text style={stylesModern.subtitle}>{exp.company}</Text>
              <Text style={stylesModern.meta}>{[exp.location, `${exp.startDate} - ${exp.endDate}`].filter(Boolean).join(' | ')}</Text>
              <Text style={stylesModern.body}>{exp.description}</Text>
              {exp.achievements?.map((ach, i) => <Text key={i} style={stylesModern.bullet}>• {ach}</Text>)}
            </View>
          ))}
        </View>
      )}

      {education && education.length > 0 && (
        <View>
          <Text style={stylesModern.sectionHeader}>Education</Text>
          {education.map((edu, index) => (
            <View key={index} style={stylesModern.item}>
              <Text style={stylesModern.title}>{edu.degree}</Text>
              <Text style={stylesModern.subtitle}>{edu.institution}</Text>
              <Text style={stylesModern.meta}>{[edu.location, edu.graduationDate, edu.gpa ? `GPA: ${edu.gpa}` : ''].filter(Boolean).join(' | ')}</Text>
            </View>
          ))}
        </View>
      )}

      {skills && skills.length > 0 && (
        <View>
          <Text style={stylesModern.sectionHeader}>Skills</Text>
          <Text style={stylesModern.body}>{skills.join(', ')}</Text>
        </View>
      )}

      {certifications && certifications.length > 0 && (
        <View>
          <Text style={stylesModern.sectionHeader}>Certifications</Text>
          {certifications.map((cert, index) => (
            <View key={index} style={stylesModern.item}>
              <Text style={stylesModern.title}>{cert.name}</Text>
              <Text style={stylesModern.subtitle}>{cert.issuer}</Text>
              <Text style={stylesModern.meta}>{cert.date}</Text>
            </View>
          ))}
        </View>
      )}
      {!isPremium && <Watermark />}
    </Page>
  );

  const RenderMinimal = () => (
    <Page size="A4" style={stylesMinimal.page}>
      <View style={stylesMinimal.header}>
        <Text style={stylesMinimal.name}>{personalInfo.fullName}</Text>
        <Text style={stylesMinimal.contact}>
           {[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.linkedin].filter(Boolean).join('  •  ')}
        </Text>
      </View>

      {summary && (
        <View style={{ marginBottom: 16 }}>
          <Text style={stylesMinimal.body}>{summary}</Text>
        </View>
      )}

      {experience && experience.length > 0 && (
        <View>
          <Text style={stylesMinimal.sectionHeader}>Experience</Text>
          {experience.map((exp, index) => (
            <View key={index} style={stylesMinimal.item}>
              <View style={stylesMinimal.titleLine}>
                <Text style={stylesMinimal.title}>{exp.jobTitle}</Text>
                <Text style={stylesMinimal.date}>{exp.startDate} – {exp.endDate}</Text>
              </View>
              <Text style={stylesMinimal.subtitle}>{exp.company}, {exp.location}</Text>
              <Text style={stylesMinimal.body}>{exp.description}</Text>
              {exp.achievements?.map((ach, i) => <Text key={i} style={stylesMinimal.bullet}>- {ach}</Text>)}
            </View>
          ))}
        </View>
      )}

      {education && education.length > 0 && (
        <View>
          <Text style={stylesMinimal.sectionHeader}>Education</Text>
          {education.map((edu, index) => (
            <View key={index} style={stylesMinimal.item}>
              <View style={stylesMinimal.titleLine}>
                <Text style={stylesMinimal.title}>{edu.institution}</Text>
                <Text style={stylesMinimal.date}>{edu.graduationDate}</Text>
              </View>
              <Text style={stylesMinimal.body}>{edu.degree} {edu.gpa ? `(GPA: ${edu.gpa})` : ''}</Text>
            </View>
          ))}
        </View>
      )}

      {skills && skills.length > 0 && (
        <View>
          <Text style={stylesMinimal.sectionHeader}>Skills</Text>
          <Text style={stylesMinimal.body}>{skills.join(' • ')}</Text>
        </View>
      )}
      {!isPremium && <Watermark />}
    </Page>
  );

  const RenderTech = () => (
    <Page size="A4" style={stylesTech.page}>
      <View style={stylesTech.header}>
        <Text style={stylesTech.name}>{personalInfo.fullName}</Text>
        <Text style={stylesTech.contact}>
           {[personalInfo.email, personalInfo.phone, personalInfo.location].filter(Boolean).join('\n')}
        </Text>
        {personalInfo.linkedin && <Text style={stylesTech.contact}>in/ {personalInfo.linkedin}</Text>}
      </View>

      <View style={{ flexDirection: 'row' }}>
        {/* Main Column */}
        <View style={{ width: '65%', paddingRight: 10 }}>
          {summary && (
            <View style={{ marginBottom: 20 }}>
              <Text style={stylesTech.sectionHeader}>&gt; SUMMARY</Text>
              <Text style={stylesTech.body}>{summary}</Text>
            </View>
          )}

          {experience && experience.length > 0 && (
            <View>
              <Text style={stylesTech.sectionHeader}>&gt; EXPERIENCE</Text>
              {experience.map((exp, index) => (
                <View key={index} style={stylesTech.item}>
                  <Text style={stylesTech.title}>{exp.jobTitle}</Text>
                  <Text style={stylesTech.meta}>{exp.startDate} - {exp.endDate}</Text>
                  <Text style={{ ...stylesTech.body, color: '#3b82f6', marginBottom: 4 }}>@{exp.company}</Text>
                  <Text style={stylesTech.body}>{exp.description}</Text>
                  {exp.achievements?.map((ach, i) => <Text key={i} style={{ ...stylesTech.body, marginLeft: 8 }}>▹ {ach}</Text>)}
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Side Column */}
        <View style={{ width: '35%' }}>
          {skills && skills.length > 0 && (
            <View style={{ marginBottom: 20 }}>
              <Text style={stylesTech.sectionHeader}>&gt; STACK</Text>
              <View style={stylesTech.skillsContainer}>
                {skills.map((skill, i) => (
                  <Text key={i} style={stylesTech.skillTag}>{skill}</Text>
                ))}
              </View>
            </View>
          )}

          {education && education.length > 0 && (
            <View style={{ marginBottom: 20 }}>
              <Text style={stylesTech.sectionHeader}>&gt; EDUCATION</Text>
              {education.map((edu, index) => (
                <View key={index} style={{ marginBottom: 12 }}>
                  <Text style={stylesTech.title}>{edu.degree}</Text>
                  <Text style={stylesTech.meta}>{edu.institution}</Text>
                  <Text style={stylesTech.meta}>{edu.graduationDate}</Text>
                </View>
              ))}
            </View>
          )}

          {certifications && certifications.length > 0 && (
            <View>
              <Text style={stylesTech.sectionHeader}>&gt; CERTS</Text>
              {certifications.map((cert, index) => (
                <View key={index} style={{ marginBottom: 8 }}>
                  <Text style={stylesTech.title}>{cert.name}</Text>
                  <Text style={stylesTech.meta}>{cert.issuer}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
      {!isPremium && <Watermark />}
    </Page>
  );

  const RenderCreative = () => (
    <Page size="A4" style={stylesCreative.page}>
      <View style={stylesCreative.header}>
        <Text style={stylesCreative.name}>{personalInfo.fullName}</Text>
        <Text style={stylesCreative.contact}>
          {[personalInfo.email, personalInfo.phone, personalInfo.location].filter(Boolean).join(' | ')}
        </Text>
        {personalInfo.linkedin && <Text style={stylesCreative.contact}>{personalInfo.linkedin}</Text>}
      </View>

      <View style={stylesCreative.mainContainer}>
        {/* Left Column */}
        <View style={stylesCreative.leftColumn}>
          {skills && skills.length > 0 && (
            <View>
              <Text style={stylesCreative.sectionHeader}>SKILLS</Text>
              <View style={stylesCreative.skillsContainer}>
                {skills.map((skill, i) => (
                  <Text key={i} style={stylesCreative.skillPill}>{skill}</Text>
                ))}
              </View>
            </View>
          )}

          {education && education.length > 0 && (
            <View>
              <Text style={stylesCreative.sectionHeader}>EDUCATION</Text>
              {education.map((edu, index) => (
                <View key={index} style={stylesCreative.item}>
                  <Text style={stylesCreative.title}>{edu.degree}</Text>
                  <Text style={stylesCreative.subtitle}>{edu.institution}</Text>
                  <Text style={stylesCreative.subtitle}>{edu.graduationDate}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Right Column */}
        <View style={stylesCreative.rightColumn}>
          {summary && (
            <View>
              <Text style={stylesCreative.sectionHeader}>PROFILE</Text>
              <Text style={stylesCreative.body}>{summary}</Text>
            </View>
          )}

          {experience && experience.length > 0 && (
            <View>
              <Text style={stylesCreative.sectionHeader}>EXPERIENCE</Text>
              {experience.map((exp, index) => (
                <View key={index} style={stylesCreative.item}>
                  <Text style={stylesCreative.title}>{exp.jobTitle}</Text>
                  <Text style={stylesCreative.subtitle}>{exp.company} | {exp.startDate} - {exp.endDate}</Text>
                  <Text style={stylesCreative.body}>{exp.description}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
      {!isPremium && <Watermark />}
    </Page>
  );

  const RenderAcademic = () => (
    <Page size="A4" style={stylesAcademic.page}>
      <View style={stylesAcademic.header}>
        <Text style={stylesAcademic.name}>{personalInfo.fullName}</Text>
        <Text style={stylesAcademic.contact}>
           {[personalInfo.location, personalInfo.email, personalInfo.phone].filter(Boolean).join(' • ')}
        </Text>
        {personalInfo.linkedin && <Text style={stylesAcademic.contact}>{personalInfo.linkedin}</Text>}
      </View>

      {summary && (
        <View style={{ marginBottom: 15 }}>
          <Text style={stylesAcademic.sectionHeader}>Professional Summary</Text>
          <Text style={stylesAcademic.body}>{summary}</Text>
        </View>
      )}

      {/* Education First */}
      {education && education.length > 0 && (
        <View>
          <Text style={stylesAcademic.sectionHeader}>Education</Text>
          {education.map((edu, index) => (
            <View key={index} style={stylesAcademic.item}>
              <View style={stylesAcademic.row}>
                <Text style={stylesAcademic.bold}>{edu.institution}</Text>
                <Text style={stylesAcademic.bold}>{edu.location}</Text>
              </View>
              <View style={stylesAcademic.row}>
                <Text style={stylesAcademic.italic}>{edu.degree}</Text>
                <Text style={stylesAcademic.italic}>{edu.graduationDate}</Text>
              </View>
              {edu.gpa && <Text style={{ fontSize: 10 }}>GPA: {edu.gpa}</Text>}
            </View>
          ))}
        </View>
      )}

      {experience && experience.length > 0 && (
        <View>
          <Text style={stylesAcademic.sectionHeader}>Professional Experience</Text>
          {experience.map((exp, index) => (
            <View key={index} style={stylesAcademic.item}>
              <View style={stylesAcademic.row}>
                <Text style={stylesAcademic.bold}>{exp.company}</Text>
                <Text style={stylesAcademic.bold}>{exp.location}</Text>
              </View>
              <View style={stylesAcademic.row}>
                <Text style={stylesAcademic.italic}>{exp.jobTitle}</Text>
                <Text style={stylesAcademic.italic}>{exp.startDate} – {exp.endDate}</Text>
              </View>
              <Text style={stylesAcademic.body}>{exp.description}</Text>
            </View>
          ))}
        </View>
      )}

      {skills && skills.length > 0 && (
        <View>
          <Text style={stylesAcademic.sectionHeader}>Skills</Text>
          <Text style={stylesAcademic.body}>{skills.join(' • ')}</Text>
        </View>
      )}
      {!isPremium && <Watermark />}
    </Page>
  );

  return (
    <Document>
      {template === 'minimal' ? <RenderMinimal /> :
       template === 'tech' ? <RenderTech /> :
       template === 'creative' ? <RenderCreative /> :
       template === 'academic' ? <RenderAcademic /> :
       <RenderModern />}
    </Document>
  );
}
