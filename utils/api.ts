import { Job, CreateJobData } from "../types/job";

export async function fetchJobs(): Promise<Job[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs`);
  if (!res.ok) throw new Error("Failed to fetch jobs");
  const jobs = await res.json();
  // Convert date strings to Date objects
  return jobs.map((job: Job) => ({
    id: job.id,
    title: job.title,
    company: job.company,
    companylogo: job.companylogo,
    location: job.location,
    jobtype: job.jobtype,
    experience: job.experience,
    salarymin: job.salarymin,
    salarymax: job.salarymax,
    description: job.description,
    requirements: job.requirements,
    benefits: job.benefits,
    postedat: new Date(job.postedat),
    applicationdeadline: new Date(job.applicationdeadline),
    isremote: job.isremote,
    salarydisplay: job.salarydisplay,
  }));
}

export async function createJob(data: CreateJobData): Promise<Job> {
  // Map CreateJobData to backend DTO
  const payload = {
    ...data,
    companylogo: "/logos/default.png",
    experience: "1-3 yr Exp",
    salarymin: data.salarymin,
    salarymax: data.salarymax,
    salarydisplay: "12LPA",
    requirements: [],
    benefits: [],
    isremote: data.location === "Remote",
  };
  const res = await fetch(`${API_BASE_URL}/jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create job");
  const job = await res.json();
  return {
    ...job,
    postedat: new Date(job.postedat),
    applicationdeadline: new Date(job.applicationdeadline),
    salarymin: job.salarymin,
    salarymax: job.salarymax,
  };
}