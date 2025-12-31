import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from './types';

// Template Types
export type TemplateStyle = 'modern' | 'classic' | 'minimal' | 'bold';

export interface TemplateConfig {
  id: TemplateStyle;
  name: string;
  description: string;
  primaryColor: string;
  accentColor: string;
}

export const templates: TemplateConfig[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and professional with blue accents',
    primaryColor: '#3b82f6',
    accentColor: '#2563eb',
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional and conservative',
    primaryColor: '#1f2937',
    accentColor: '#374151',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and elegant',
    primaryColor: '#6b7280',
    accentColor: '#4b5563',
  },
  {
    id: 'bold',
    name: 'Bold',
    description: 'Stand out with vibrant colors',
    primaryColor: '#7c3aed',
    accentColor: '#6d28d9',
  },
];

// Modern Template (Blue)
const modernStyles = StyleSheet.create({
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

// Classic Template (Black/Gray)
const classicStyles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 11,
    fontFamily: 'Times-Roman',
    lineHeight: 1.6,
  },
  header: {
    textAlign: 'center',
    marginBottom: 25,
    borderBottomWidth: 3,
    borderBottomColor: '#000000',
    paddingBottom: 15,
  },
  name: {
    fontSize: 28,
    fontFamily: 'Times-Bold',
    marginBottom: 10,
    color: '#000000',
    letterSpacing: 2,
  },
  contact: {
    fontSize: 10,
    color: '#333333',
  },
  summary: {
    fontSize: 11,
    color: '#333333',
    marginBottom: 20,
    textAlign: 'justify',
  },
  sectionHeader: {
    fontSize: 14,
    fontFamily: 'Times-Bold',
    color: '#000000',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 20,
    marginBottom: 12,
  },
  experienceItem: {
    marginBottom: 15,
  },
  jobTitle: {
    fontSize: 13,
    fontFamily: 'Times-Bold',
    color: '#000000',
  },
  company: {
    fontSize: 11,
    fontFamily: 'Times-Italic',
    color: '#333333',
    marginTop: 2,
  },
  dateLocation: {
    fontSize: 10,
    color: '#666666',
    marginTop: 2,
    marginBottom: 4,
  },
  description: {
    fontSize: 11,
    color: '#333333',
    marginTop: 4,
  },
  achievementsList: {
    marginTop: 4,
    marginLeft: 25,
  },
  achievement: {
    fontSize: 11,
    color: '#333333',
    marginBottom: 2,
  },
  educationItem: {
    marginBottom: 12,
  },
  degree: {
    fontSize: 13,
    fontFamily: 'Times-Bold',
    color: '#000000',
  },
  institution: {
    fontSize: 11,
    fontFamily: 'Times-Italic',
    color: '#333333',
    marginTop: 2,
  },
  eduDateLocation: {
    fontSize: 10,
    color: '#666666',
    marginTop: 2,
  },
  skills: {
    fontSize: 11,
    color: '#333333',
  },
  certificationItem: {
    marginBottom: 10,
  },
  certName: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
    color: '#000000',
  },
  certIssuer: {
    fontSize: 11,
    fontFamily: 'Times-Italic',
    color: '#333333',
    marginTop: 2,
  },
  certDate: {
    fontSize: 10,
    color: '#666666',
    marginTop: 2,
  },
});

// Minimal Template (Gray)
const minimalStyles = StyleSheet.create({
  page: {
    padding: 35,
    fontSize: 11,
    fontFamily: 'Helvetica',
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 25,
  },
  name: {
    fontSize: 36,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 6,
    color: '#1f2937',
  },
  contact: {
    fontSize: 9,
    color: '#9ca3af',
  },
  summary: {
    fontSize: 11,
    color: '#6b7280',
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    color: '#4b5563',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginTop: 18,
    marginBottom: 10,
  },
  experienceItem: {
    marginBottom: 14,
  },
  jobTitle: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    color: '#1f2937',
  },
  company: {
    fontSize: 11,
    color: '#6b7280',
    marginTop: 2,
  },
  dateLocation: {
    fontSize: 9,
    color: '#9ca3af',
    marginTop: 2,
    marginBottom: 4,
  },
  description: {
    fontSize: 11,
    color: '#4b5563',
    marginTop: 4,
  },
  achievementsList: {
    marginTop: 4,
    marginLeft: 15,
  },
  achievement: {
    fontSize: 11,
    color: '#4b5563',
    marginBottom: 2,
  },
  educationItem: {
    marginBottom: 12,
  },
  degree: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    color: '#1f2937',
  },
  institution: {
    fontSize: 11,
    color: '#6b7280',
    marginTop: 2,
  },
  eduDateLocation: {
    fontSize: 9,
    color: '#9ca3af',
    marginTop: 2,
  },
  skills: {
    fontSize: 11,
    color: '#4b5563',
  },
  certificationItem: {
    marginBottom: 10,
  },
  certName: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#1f2937',
  },
  certIssuer: {
    fontSize: 11,
    color: '#6b7280',
    marginTop: 2,
  },
  certDate: {
    fontSize: 9,
    color: '#9ca3af',
    marginTop: 2,
  },
});

// Bold Template (Purple)
const boldStyles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: 'Helvetica',
    lineHeight: 1.5,
    backgroundColor: '#faf5ff',
  },
  header: {
    backgroundColor: '#7c3aed',
    padding: 20,
    marginBottom: 20,
    marginHorizontal: -40,
    marginTop: -40,
  },
  name: {
    fontSize: 34,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 8,
    color: '#ffffff',
  },
  contact: {
    fontSize: 10,
    color: '#e9d5ff',
  },
  summary: {
    fontSize: 12,
    color: '#6b21a8',
    marginBottom: 16,
    backgroundColor: '#f3e8ff',
    padding: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#7c3aed',
  },
  sectionHeader: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: '#7c3aed',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 16,
    marginBottom: 12,
    backgroundColor: '#f3e8ff',
    padding: 8,
  },
  experienceItem: {
    marginBottom: 16,
    paddingLeft: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#c084fc',
  },
  jobTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#6b21a8',
  },
  company: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#7c3aed',
    marginTop: 2,
  },
  dateLocation: {
    fontSize: 10,
    color: '#a855f7',
    marginTop: 2,
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#1f2937',
    marginTop: 4,
  },
  achievementsList: {
    marginTop: 4,
    marginLeft: 20,
  },
  achievement: {
    fontSize: 12,
    color: '#1f2937',
    marginBottom: 2,
  },
  educationItem: {
    marginBottom: 12,
    paddingLeft: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#c084fc',
  },
  degree: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#6b21a8',
  },
  institution: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#7c3aed',
    marginTop: 2,
  },
  eduDateLocation: {
    fontSize: 10,
    color: '#a855f7',
    marginTop: 2,
  },
  skills: {
    fontSize: 12,
    color: '#1f2937',
  },
  certificationItem: {
    marginBottom: 10,
  },
  certName: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#6b21a8',
  },
  certIssuer: {
    fontSize: 12,
    color: '#7c3aed',
    marginTop: 2,
  },
  certDate: {
    fontSize: 10,
    color: '#a855f7',
    marginTop: 2,
  },
});

interface ResumePDFDocumentProps {
  data: ResumeData;
  template?: TemplateStyle;
}

export function ResumePDFDocument({ data, template = 'modern' }: ResumePDFDocumentProps) {
  const { personalInfo, summary, experience, education, skills, certifications } = data;

  // Select styles based on template
  const styles =
    template === 'classic'
      ? classicStyles
      : template === 'minimal'
      ? minimalStyles
      : template === 'bold'
      ? boldStyles
      : modernStyles;

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
