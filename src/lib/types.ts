export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
}

export interface Experience {
  jobTitle: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string; // "Present" if current
  description: string;
  achievements: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location?: string;
  graduationDate: string;
  gpa?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date?: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary?: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  certifications?: Certification[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
