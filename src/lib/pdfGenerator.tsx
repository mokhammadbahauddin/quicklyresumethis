import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from './types';

// PDF Styles matching ModernTemplate design
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: 'Helvetica',
    lineHeight: 1.5,
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 32,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 8,
    color: '#111827',
  },
  contact: {
    fontSize: 10,
    color: '#6b7280',
  },
  summary: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#4b5563',
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: '#3b82f6',
    textTransform: 'uppercase',
    borderBottomWidth: 2,
    borderBottomColor: '#3b82f6',
    paddingBottom: 4,
    marginTop: 16,
    marginBottom: 12,
  },
  experienceItem: {
    marginBottom: 16,
  },
  jobTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
  },
  company: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#6b7280',
    marginTop: 2,
  },
  dateLocation: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 2,
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#374151',
    marginTop: 4,
  },
  achievementsList: {
    marginTop: 4,
    marginLeft: 20,
  },
  achievement: {
    fontSize: 12,
    color: '#374151',
    marginBottom: 2,
  },
  educationItem: {
    marginBottom: 12,
  },
  degree: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
  },
  institution: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#6b7280',
    marginTop: 2,
  },
  eduDateLocation: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 2,
  },
  skills: {
    fontSize: 12,
    color: '#374151',
  },
  certificationItem: {
    marginBottom: 10,
  },
  certName: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
  },
  certIssuer: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#6b7280',
    marginTop: 2,
  },
  certDate: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 2,
  },
});

interface ResumePDFDocumentProps {
  data: ResumeData;
}

export function ResumePDFDocument({ data }: ResumePDFDocumentProps) {
  const { personalInfo, summary, experience, education, skills, certifications } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.fullName}</Text>
          <Text style={styles.contact}>
            {[
              personalInfo.email,
              personalInfo.phone,
              personalInfo.location,
              personalInfo.linkedin,
              personalInfo.website,
            ]
              .filter(Boolean)
              .join(' | ')}
          </Text>
        </View>

        {/* Summary */}
        {summary && (
          <View>
            <Text style={styles.summary}>{summary}</Text>
          </View>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <View>
            <Text style={styles.sectionHeader}>Experience</Text>
            {experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.jobTitle}>{exp.jobTitle}</Text>
                <Text style={styles.company}>{exp.company}</Text>
                <Text style={styles.dateLocation}>
                  {[exp.location, `${exp.startDate} - ${exp.endDate}`]
                    .filter(Boolean)
                    .join(' | ')}
                </Text>
                {exp.description && (
                  <Text style={styles.description}>{exp.description}</Text>
                )}
                {exp.achievements && exp.achievements.length > 0 && (
                  <View style={styles.achievementsList}>
                    {exp.achievements.map((achievement, idx) => (
                      <Text key={idx} style={styles.achievement}>
                        • {achievement}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <View>
            <Text style={styles.sectionHeader}>Education</Text>
            {education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <Text style={styles.degree}>{edu.degree}</Text>
                <Text style={styles.institution}>{edu.institution}</Text>
                <Text style={styles.eduDateLocation}>
                  {[edu.location, edu.graduationDate].filter(Boolean).join(' | ')}
                </Text>
                {edu.gpa && (
                  <Text style={styles.eduDateLocation}>GPA: {edu.gpa}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <View>
            <Text style={styles.sectionHeader}>Skills</Text>
            <Text style={styles.skills}>{skills.join(', ')}</Text>
          </View>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <View>
            <Text style={styles.sectionHeader}>Certifications</Text>
            {certifications.map((cert, index) => (
              <View key={index} style={styles.certificationItem}>
                <Text style={styles.certName}>{cert.name}</Text>
                <Text style={styles.certIssuer}>{cert.issuer}</Text>
                {cert.date && <Text style={styles.certDate}>{cert.date}</Text>}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
