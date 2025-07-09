export interface Job {
  id: string;
  title: string;
  company: string;
  companylogo: string;
  location: string;
  jobtype: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance';
  experience: string;
  salarymin: number;
  salarymax: number;
  description: string;
  requirements: string[];
  benefits: string[];
  postedat: Date;
  applicationdeadline: Date;
  isremote: boolean;
  salarydisplay: string;
}

export interface JobFilter {
  search: string;
  location: string;
  jobtype: string;
  salaryRange: {
    min: number;
    max: number;
  };
  experience?: string;
  company?: string;
}

export interface CreateJobData {
  title: string;
  company: string;
  location: string;
  jobtype: string;
  salarymin: number;
  salarymax: number;
  description: string;
  applicationdeadline: Date;
}