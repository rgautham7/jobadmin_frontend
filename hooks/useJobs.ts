"use client";

import { useState, useEffect } from "react";
import { Job, JobFilter } from "../types/job";
import { fetchJobs } from "../utils/api";

export const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<JobFilter>({
    search: "",
    location: "",
    jobtype: "",
    salaryRange: { min: 0, max: 1000 },
  });

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        const jobsData = await fetchJobs();
        setJobs(jobsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      job.company.toLowerCase().includes(filters.search.toLowerCase());
    const matchesLocation =
      !filters.location ||
      job.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesJobType = !filters.jobtype || job.jobtype === filters.jobtype;
    const matchesSalary =
      job.salarymin >= filters.salaryRange.min &&
      job.salarymax <= filters.salaryRange.max;

    return matchesSearch && matchesLocation && matchesJobType && matchesSalary;
  });

  return {
    jobs: filteredJobs,
    loading,
    error,
    filters,
    setFilters,
    refreshJobs: () => {
      setJobs([]);
      setLoading(true);
      fetchJobs()
        .then(setJobs)
        .catch(setError)
        .finally(() => setLoading(false));
    },
  };
};
