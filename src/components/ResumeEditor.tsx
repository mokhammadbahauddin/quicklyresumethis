'use client';

import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ResumeData } from '@/lib/types';

// Zod validation schema
const resumeSchema = z.object({
  personalInfo: z.object({
    fullName: z.string().min(1, 'Full name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(1, 'Phone is required'),
    location: z.string(),
    linkedin: z.string().url('Invalid URL').optional().or(z.literal('')),
    website: z.string().url('Invalid URL').optional().or(z.literal('')),
  }),
  summary: z.string().max(500, 'Summary must be 500 characters or less').optional(),
  experience: z.array(
    z.object({
      jobTitle: z.string().min(1, 'Job title is required'),
      company: z.string().min(1, 'Company is required'),
      location: z.string().optional(),
      startDate: z.string().min(1, 'Start date is required'),
      endDate: z.string().min(1, 'End date is required'),
      description: z.string().optional(),
      achievements: z.array(z.string()),
    })
  ),
  education: z.array(
    z.object({
      degree: z.string().min(1, 'Degree is required'),
      institution: z.string().min(1, 'Institution is required'),
      location: z.string().optional(),
      graduationDate: z.string().min(1, 'Graduation date is required'),
      gpa: z.string().optional(),
    })
  ),
  skills: z.array(z.string()),
  certifications: z.array(
    z.object({
      name: z.string().min(1, 'Certification name is required'),
      issuer: z.string().min(1, 'Issuer is required'),
      date: z.string().optional(),
    })
  ).optional(),
});

type ResumeFormData = z.infer<typeof resumeSchema>;

interface ResumeEditorProps {
  initialData: ResumeData;
  onChange: (data: ResumeData) => void;
}

export default function ResumeEditor({ initialData, onChange }: ResumeEditorProps) {
  const [newSkill, setNewSkill] = useState('');

  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ResumeFormData>({
    resolver: zodResolver(resumeSchema),
    defaultValues: initialData,
  });

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control,
    name: 'experience',
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: 'education',
  });

  const {
    fields: certificationFields,
    append: appendCertification,
    remove: removeCertification,
  } = useFieldArray({
    control,
    name: 'certifications',
  });

  // Watch form changes and update parent
  const formData = watch();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onChange(formData as ResumeData);
      sessionStorage.setItem('resumeData', JSON.stringify(formData));
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [formData, onChange]);

  const skills = watch('skills') || [];

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setValue('skills', [...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    setValue(
      'skills',
      skills.filter((_, i) => i !== index)
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const inputClasses = 'w-full px-2 py-1.5 border border-gray-300 rounded focus:border-blue-500 focus:outline-none text-sm';
  const labelClasses = 'block text-sm font-bold text-gray-700 mb-1';
  const errorClasses = 'text-red-600 text-xs mt-1';

  return (
    <div className="space-y-6 overflow-auto pr-4" style={{ maxHeight: 'calc(100vh - 120px)' }}>
      {/* Personal Information */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
          Personal Information
        </h2>
        <div className="space-y-3">
          <div>
            <label className={labelClasses}>Full Name *</label>
            <input {...register('personalInfo.fullName')} className={inputClasses} />
            {errors.personalInfo?.fullName && (
              <p className={errorClasses}>{errors.personalInfo.fullName.message}</p>
            )}
          </div>
          <div>
            <label className={labelClasses}>Email *</label>
            <input type="email" {...register('personalInfo.email')} className={inputClasses} />
            {errors.personalInfo?.email && (
              <p className={errorClasses}>{errors.personalInfo.email.message}</p>
            )}
          </div>
          <div>
            <label className={labelClasses}>Phone *</label>
            <input type="tel" {...register('personalInfo.phone')} className={inputClasses} />
            {errors.personalInfo?.phone && (
              <p className={errorClasses}>{errors.personalInfo.phone.message}</p>
            )}
          </div>
          <div>
            <label className={labelClasses}>Location</label>
            <input {...register('personalInfo.location')} className={inputClasses} />
          </div>
          <div>
            <label className={labelClasses}>LinkedIn URL</label>
            <input type="url" {...register('personalInfo.linkedin')} className={inputClasses} />
            {errors.personalInfo?.linkedin && (
              <p className={errorClasses}>{errors.personalInfo.linkedin.message}</p>
            )}
          </div>
          <div>
            <label className={labelClasses}>Website URL</label>
            <input type="url" {...register('personalInfo.website')} className={inputClasses} />
            {errors.personalInfo?.website && (
              <p className={errorClasses}>{errors.personalInfo.website.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
          Professional Summary
        </h2>
        <textarea
          {...register('summary')}
          className={`${inputClasses} min-h-24`}
          maxLength={500}
          placeholder="Brief professional summary..."
        />
        <div className="flex justify-between mt-1">
          <div>
            {errors.summary && <p className={errorClasses}>{errors.summary.message}</p>}
          </div>
          <p className="text-xs text-gray-500">{(watch('summary')?.length || 0)}/500</p>
        </div>
      </div>

      {/* Work Experience */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
          Work Experience
        </h2>
        {experienceFields.map((field, index) => (
          <div key={field.id} className="mb-6 p-4 border border-gray-200 rounded bg-gray-50">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-700">Experience {index + 1}</h3>
              {experienceFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="text-red-600 text-sm hover:text-red-800"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="space-y-3">
              <div>
                <label className={labelClasses}>Job Title *</label>
                <input {...register(`experience.${index}.jobTitle`)} className={inputClasses} />
                {errors.experience?.[index]?.jobTitle && (
                  <p className={errorClasses}>{errors.experience[index]?.jobTitle?.message}</p>
                )}
              </div>
              <div>
                <label className={labelClasses}>Company *</label>
                <input {...register(`experience.${index}.company`)} className={inputClasses} />
                {errors.experience?.[index]?.company && (
                  <p className={errorClasses}>{errors.experience[index]?.company?.message}</p>
                )}
              </div>
              <div>
                <label className={labelClasses}>Location</label>
                <input {...register(`experience.${index}.location`)} className={inputClasses} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClasses}>Start Date *</label>
                  <input
                    {...register(`experience.${index}.startDate`)}
                    className={inputClasses}
                    placeholder="Month YYYY"
                  />
                  {errors.experience?.[index]?.startDate && (
                    <p className={errorClasses}>{errors.experience[index]?.startDate?.message}</p>
                  )}
                </div>
                <div>
                  <label className={labelClasses}>End Date *</label>
                  <input
                    {...register(`experience.${index}.endDate`)}
                    className={inputClasses}
                    placeholder="Month YYYY or Present"
                  />
                  {errors.experience?.[index]?.endDate && (
                    <p className={errorClasses}>{errors.experience[index]?.endDate?.message}</p>
                  )}
                </div>
              </div>
              <div>
                <label className={labelClasses}>Description</label>
                <textarea
                  {...register(`experience.${index}.description`)}
                  className={`${inputClasses} min-h-20`}
                />
              </div>
              <div>
                <label className={labelClasses}>Achievements (one per line)</label>
                <textarea
                  {...register(`experience.${index}.achievements`)}
                  className={`${inputClasses} min-h-20`}
                  onChange={(e) => {
                    const achievements = e.target.value.split('\n').filter((a) => a.trim());
                    setValue(`experience.${index}.achievements`, achievements);
                  }}
                  value={(watch(`experience.${index}.achievements`) || []).join('\n')}
                  placeholder="• Achievement 1&#10;• Achievement 2"
                />
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            appendExperience({
              jobTitle: '',
              company: '',
              location: '',
              startDate: '',
              endDate: '',
              description: '',
              achievements: [],
            })
          }
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium"
        >
          + Add Experience
        </button>
      </div>

      {/* Education */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
          Education
        </h2>
        {educationFields.map((field, index) => (
          <div key={field.id} className="mb-6 p-4 border border-gray-200 rounded bg-gray-50">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-700">Education {index + 1}</h3>
              {educationFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="text-red-600 text-sm hover:text-red-800"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="space-y-3">
              <div>
                <label className={labelClasses}>Degree *</label>
                <input {...register(`education.${index}.degree`)} className={inputClasses} />
                {errors.education?.[index]?.degree && (
                  <p className={errorClasses}>{errors.education[index]?.degree?.message}</p>
                )}
              </div>
              <div>
                <label className={labelClasses}>Institution *</label>
                <input {...register(`education.${index}.institution`)} className={inputClasses} />
                {errors.education?.[index]?.institution && (
                  <p className={errorClasses}>{errors.education[index]?.institution?.message}</p>
                )}
              </div>
              <div>
                <label className={labelClasses}>Location</label>
                <input {...register(`education.${index}.location`)} className={inputClasses} />
              </div>
              <div>
                <label className={labelClasses}>Graduation Date *</label>
                <input
                  {...register(`education.${index}.graduationDate`)}
                  className={inputClasses}
                  placeholder="Month YYYY"
                />
                {errors.education?.[index]?.graduationDate && (
                  <p className={errorClasses}>{errors.education[index]?.graduationDate?.message}</p>
                )}
              </div>
              <div>
                <label className={labelClasses}>GPA</label>
                <input {...register(`education.${index}.gpa`)} className={inputClasses} />
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            appendEducation({
              degree: '',
              institution: '',
              location: '',
              graduationDate: '',
              gpa: '',
            })
          }
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium"
        >
          + Add Education
        </button>
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
          Skills
        </h2>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            className={inputClasses}
            placeholder="Add a skill..."
          />
          <button
            type="button"
            onClick={addSkill}
            className="px-4 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="text-blue-600 hover:text-blue-800 font-bold"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
          Certifications (Optional)
        </h2>
        {certificationFields.map((field, index) => (
          <div key={field.id} className="mb-6 p-4 border border-gray-200 rounded bg-gray-50">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-700">Certification {index + 1}</h3>
              <button
                type="button"
                onClick={() => removeCertification(index)}
                className="text-red-600 text-sm hover:text-red-800"
              >
                Remove
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className={labelClasses}>Name *</label>
                <input {...register(`certifications.${index}.name`)} className={inputClasses} />
                {errors.certifications?.[index]?.name && (
                  <p className={errorClasses}>{errors.certifications[index]?.name?.message}</p>
                )}
              </div>
              <div>
                <label className={labelClasses}>Issuer *</label>
                <input {...register(`certifications.${index}.issuer`)} className={inputClasses} />
                {errors.certifications?.[index]?.issuer && (
                  <p className={errorClasses}>{errors.certifications[index]?.issuer?.message}</p>
                )}
              </div>
              <div>
                <label className={labelClasses}>Date</label>
                <input
                  {...register(`certifications.${index}.date`)}
                  className={inputClasses}
                  placeholder="Month YYYY"
                />
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            appendCertification({
              name: '',
              issuer: '',
              date: '',
            })
          }
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium"
        >
          + Add Certification
        </button>
      </div>
    </div>
  );
}
