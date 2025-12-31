'use client';

import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ResumeData } from '@/lib/types';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Award,
  Wrench,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  Save,
  GripVertical,
  Wand2,
  Sparkles
} from 'lucide-react';

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

// Collapsible Section Component
function Section({
  title,
  icon: Icon,
  children,
  defaultOpen = false
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md mb-4">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
            <Icon size={20} />
          </div>
          <span className="font-semibold text-gray-800">{title}</span>
        </div>
        {isOpen ? <ChevronUp size={20} className="text-gray-500" /> : <ChevronDown size={20} className="text-gray-500" />}
      </button>

      {isOpen && (
        <div className="p-5 border-t border-gray-100 animate-slide-down">
          {children}
        </div>
      )}
    </div>
  );
}

// AI Enhancement Hook
const useAIEnhancer = () => {
  const [loadingField, setLoadingField] = useState<string | null>(null);

  const enhanceText = async (text: string, fieldId: string, onComplete: (newText: string) => void) => {
    if (!text || text.length < 10) return;

    setLoadingField(fieldId);
    try {
      const res = await fetch('/api/enhance-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      if (data.success && data.enhancedText) {
        onComplete(data.enhancedText);
      }
    } catch (error) {
      console.error('AI Enhance failed:', error);
    } finally {
      setLoadingField(null);
    }
  };

  return { enhanceText, loadingField };
};

export default function ResumeEditor({ initialData, onChange }: ResumeEditorProps) {
  const [newSkill, setNewSkill] = useState('');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const { enhanceText, loadingField } = useAIEnhancer();

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
    move: moveExperience,
  } = useFieldArray({
    control,
    name: 'experience',
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
    move: moveEducation,
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
      setLastSaved(new Date());
    }, 500);

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

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    if (result.type === 'EXPERIENCE') {
      moveExperience(result.source.index, result.destination.index);
    } else if (result.type === 'EDUCATION') {
      moveEducation(result.source.index, result.destination.index);
    }
  };

  const inputClasses = 'w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-shadow text-sm';
  const labelClasses = 'block text-sm font-semibold text-gray-700 mb-1.5';
  const errorClasses = 'text-red-500 text-xs mt-1 flex items-center gap-1';

  return (
    <div className="flex flex-col h-full">
      {/* Auto-save Indicator */}
      <div className="flex items-center justify-end px-2 mb-4 text-xs text-gray-500">
        <Save size={12} className="mr-1" />
        {lastSaved ? `Saved at ${lastSaved.toLocaleTimeString()}` : 'Unsaved changes'}
      </div>

      <div className="overflow-y-auto pr-2 pb-20 custom-scrollbar" style={{ maxHeight: 'calc(100vh - 180px)' }}>

        {/* Personal Information */}
        <Section title="Personal Information" icon={User} defaultOpen={true}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1 md:col-span-2">
              <label className={labelClasses}>Full Name *</label>
              <input {...register('personalInfo.fullName')} className={inputClasses} placeholder="John Doe" />
              {errors.personalInfo?.fullName && (
                <p className={errorClasses}>{errors.personalInfo.fullName.message}</p>
              )}
            </div>
            <div>
              <label className={labelClasses}>Email *</label>
              <input type="email" {...register('personalInfo.email')} className={inputClasses} placeholder="john@example.com" />
              {errors.personalInfo?.email && (
                <p className={errorClasses}>{errors.personalInfo.email.message}</p>
              )}
            </div>
            <div>
              <label className={labelClasses}>Phone *</label>
              <input type="tel" {...register('personalInfo.phone')} className={inputClasses} placeholder="+1 (555) 000-0000" />
              {errors.personalInfo?.phone && (
                <p className={errorClasses}>{errors.personalInfo.phone.message}</p>
              )}
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className={labelClasses}>Location</label>
              <input {...register('personalInfo.location')} className={inputClasses} placeholder="New York, NY" />
            </div>
            <div>
              <label className={labelClasses}>LinkedIn URL</label>
              <input type="url" {...register('personalInfo.linkedin')} className={inputClasses} placeholder="https://linkedin.com/in/johndoe" />
              {errors.personalInfo?.linkedin && (
                <p className={errorClasses}>{errors.personalInfo.linkedin.message}</p>
              )}
            </div>
            <div>
              <label className={labelClasses}>Website URL</label>
              <input type="url" {...register('personalInfo.website')} className={inputClasses} placeholder="https://johndoe.com" />
              {errors.personalInfo?.website && (
                <p className={errorClasses}>{errors.personalInfo.website.message}</p>
              )}
            </div>
          </div>
        </Section>

        {/* Professional Summary */}
        <Section title="Professional Summary" icon={FileText} defaultOpen={true}>
          <div className="relative">
            <textarea
              {...register('summary')}
              className={`${inputClasses} min-h-32 resize-y`}
              maxLength={500}
              placeholder="Experienced software engineer with 5+ years..."
            />
            <button
              type="button"
              onClick={() => {
                const current = watch('summary') || '';
                enhanceText(current, 'summary', (text) => setValue('summary', text));
              }}
              className="absolute bottom-6 right-2 p-1.5 text-purple-600 hover:text-purple-800 bg-purple-50 hover:bg-purple-100 rounded-md transition-colors group"
              title="Enhance with AI"
            >
              {loadingField === 'summary' ? (
                <div className="animate-spin h-4 w-4 border-2 border-purple-600 border-t-transparent rounded-full" />
              ) : (
                <div className="flex items-center gap-1">
                   <Wand2 size={16} />
                   <span className="text-xs font-medium max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">Magic Fix</span>
                </div>
              )}
            </button>
            <div className="flex justify-between mt-1">
              <div>
                {errors.summary && <p className={errorClasses}>{errors.summary.message}</p>}
              </div>
              <p className={`text-xs ${
                (watch('summary')?.length || 0) > 450 ? 'text-red-500 font-bold' : 'text-gray-500'
              }`}>
                {(watch('summary')?.length || 0)}/500
              </p>
            </div>
          </div>
        </Section>

        <DragDropContext onDragEnd={onDragEnd}>
          {/* Work Experience */}
          <Section title="Work Experience" icon={Briefcase}>
            <Droppable droppableId="experience" type="EXPERIENCE">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-6"
                >
                  {experienceFields.map((field, index) => (
                    <Draggable key={field.id} draggableId={field.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`p-4 border border-gray-200 rounded-lg bg-gray-50 relative group transition-shadow ${snapshot.isDragging ? 'shadow-lg ring-2 ring-blue-500 z-10' : ''}`}
                        >
                          <div
                            {...provided.dragHandleProps}
                            className="absolute top-4 left-2 text-gray-300 hover:text-gray-600 cursor-grab active:cursor-grabbing p-1"
                          >
                            <GripVertical size={20} />
                          </div>

                          <button
                            type="button"
                            onClick={() => removeExperience(index)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-red-600 transition-colors p-1"
                            title="Remove Position"
                          >
                            <Trash2 size={18} />
                          </button>

                          <div className="pl-6">
                            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">Position {index + 1}</h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-0">
                              <div className="col-span-1 md:col-span-2">
                                <label className={labelClasses}>Job Title *</label>
                                <input {...register(`experience.${index}.jobTitle`)} className={inputClasses} placeholder="Senior Developer" />
                                {errors.experience?.[index]?.jobTitle && (
                                  <p className={errorClasses}>{errors.experience[index]?.jobTitle?.message}</p>
                                )}
                              </div>
                              <div>
                                <label className={labelClasses}>Company *</label>
                                <input {...register(`experience.${index}.company`)} className={inputClasses} placeholder="Acme Corp" />
                                {errors.experience?.[index]?.company && (
                                  <p className={errorClasses}>{errors.experience[index]?.company?.message}</p>
                                )}
                              </div>
                              <div>
                                <label className={labelClasses}>Location</label>
                                <input {...register(`experience.${index}.location`)} className={inputClasses} placeholder="Remote" />
                              </div>
                              <div>
                                <label className={labelClasses}>Start Date *</label>
                                <input
                                  {...register(`experience.${index}.startDate`)}
                                  className={inputClasses}
                                  placeholder="Jan 2020"
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
                                  placeholder="Present"
                                />
                                {errors.experience?.[index]?.endDate && (
                                  <p className={errorClasses}>{errors.experience[index]?.endDate?.message}</p>
                                )}
                              </div>
                              <div className="col-span-1 md:col-span-2 relative">
                                <label className={labelClasses}>Description</label>
                                <textarea
                                  {...register(`experience.${index}.description`)}
                                  className={`${inputClasses} min-h-24`}
                                  placeholder="Describe your responsibilities and impact..."
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const current = watch(`experience.${index}.description`) || '';
                                    enhanceText(current, `exp-${index}`, (text) => setValue(`experience.${index}.description`, text));
                                  }}
                                  className="absolute bottom-2 right-2 p-1.5 text-purple-600 hover:text-purple-800 bg-purple-50 hover:bg-purple-100 rounded-md transition-colors"
                                  title="Enhance with AI"
                                >
                                  {loadingField === `exp-${index}` ? (
                                    <div className="animate-spin h-4 w-4 border-2 border-purple-600 border-t-transparent rounded-full" />
                                  ) : (
                                    <Wand2 size={16} />
                                  )}
                                </button>
                              </div>
                              <div className="col-span-1 md:col-span-2">
                                <label className={labelClasses}>Achievements (one per line)</label>
                                <textarea
                                  {...register(`experience.${index}.achievements`)}
                                  className={`${inputClasses} min-h-24`}
                                  onChange={(e) => {
                                    const achievements = e.target.value.split('\n').filter((a) => a.trim());
                                    setValue(`experience.${index}.achievements`, achievements);
                                  }}
                                  value={(watch(`experience.${index}.achievements`) || []).join('\n')}
                                  placeholder="• Increased revenue by 20%&#10;• Led team of 5 engineers"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}

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
                    className="w-full py-2.5 px-4 bg-white border-2 border-dashed border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all text-sm font-semibold flex items-center justify-center gap-2"
                  >
                    <Plus size={16} /> Add Position
                  </button>
                </div>
              )}
            </Droppable>
          </Section>

          {/* Education */}
          <Section title="Education" icon={GraduationCap}>
            <Droppable droppableId="education" type="EDUCATION">
              {(provided) => (
                <div
                   {...provided.droppableProps}
                   ref={provided.innerRef}
                   className="space-y-6"
                >
                  {educationFields.map((field, index) => (
                    <Draggable key={field.id} draggableId={field.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                           ref={provided.innerRef}
                           {...provided.draggableProps}
                           className={`p-4 border border-gray-200 rounded-lg bg-gray-50 relative group transition-shadow ${snapshot.isDragging ? 'shadow-lg ring-2 ring-blue-500 z-10' : ''}`}
                        >
                          <div
                            {...provided.dragHandleProps}
                            className="absolute top-4 left-2 text-gray-300 hover:text-gray-600 cursor-grab active:cursor-grabbing p-1"
                          >
                            <GripVertical size={20} />
                          </div>

                          <button
                            type="button"
                            onClick={() => removeEducation(index)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-red-600 transition-colors p-1"
                          >
                            <Trash2 size={18} />
                          </button>

                          <div className="pl-6">
                            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">Education {index + 1}</h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="col-span-1 md:col-span-2">
                                <label className={labelClasses}>Degree *</label>
                                <input {...register(`education.${index}.degree`)} className={inputClasses} placeholder="Bachelor of Science in Computer Science" />
                                {errors.education?.[index]?.degree && (
                                  <p className={errorClasses}>{errors.education[index]?.degree?.message}</p>
                                )}
                              </div>
                              <div className="col-span-1 md:col-span-2">
                                <label className={labelClasses}>Institution *</label>
                                <input {...register(`education.${index}.institution`)} className={inputClasses} placeholder="University of Technology" />
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
                                  placeholder="May 2019"
                                />
                                {errors.education?.[index]?.graduationDate && (
                                  <p className={errorClasses}>{errors.education[index]?.graduationDate?.message}</p>
                                )}
                              </div>
                              <div>
                                <label className={labelClasses}>GPA</label>
                                <input {...register(`education.${index}.gpa`)} className={inputClasses} placeholder="3.8/4.0" />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                   {provided.placeholder}

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
                    className="w-full py-2.5 px-4 bg-white border-2 border-dashed border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all text-sm font-semibold flex items-center justify-center gap-2"
                  >
                    <Plus size={16} /> Add Education
                  </button>
                </div>
              )}
            </Droppable>
          </Section>
        </DragDropContext>

        {/* Skills */}
        <Section title="Skills" icon={Wrench}>
          <div>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={handleKeyPress}
                className={inputClasses}
                placeholder="Type a skill and press Enter..."
              />
              <button
                type="button"
                onClick={addSkill}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-semibold shadow-sm"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 min-h-12 p-4 bg-gray-50 rounded-lg border border-gray-200">
              {skills.length === 0 && (
                <span className="text-gray-400 text-sm italic">No skills added yet.</span>
              )}
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-blue-200 text-blue-700 rounded-full text-sm font-medium shadow-sm animate-fade-in"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="text-blue-400 hover:text-red-500 transition-colors"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </Section>

        {/* Certifications */}
        <Section title="Certifications" icon={Award}>
          <div className="space-y-6">
            {certificationFields.map((field, index) => (
              <div key={field.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 relative group">
                <button
                  type="button"
                  onClick={() => removeCertification(index)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-600 transition-colors p-1"
                >
                  <Trash2 size={18} />
                </button>

                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">Certification {index + 1}</h4>

                <div className="space-y-3">
                  <div>
                    <label className={labelClasses}>Name *</label>
                    <input {...register(`certifications.${index}.name`)} className={inputClasses} placeholder="AWS Certified Solutions Architect" />
                    {errors.certifications?.[index]?.name && (
                      <p className={errorClasses}>{errors.certifications[index]?.name?.message}</p>
                    )}
                  </div>
                  <div>
                    <label className={labelClasses}>Issuer *</label>
                    <input {...register(`certifications.${index}.issuer`)} className={inputClasses} placeholder="Amazon Web Services" />
                    {errors.certifications?.[index]?.issuer && (
                      <p className={errorClasses}>{errors.certifications[index]?.issuer?.message}</p>
                    )}
                  </div>
                  <div>
                    <label className={labelClasses}>Date</label>
                    <input
                      {...register(`certifications.${index}.date`)}
                      className={inputClasses}
                      placeholder="Aug 2021"
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
              className="w-full py-2.5 px-4 bg-white border-2 border-dashed border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Plus size={16} /> Add Certification
            </button>
          </div>
        </Section>
      </div>
    </div>
  );
}
