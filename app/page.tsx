"use client";

import { useState } from 'react';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Header } from '../components/Header';
import { JobList } from '../components/JobList';
import { CreateJobModal } from '../components/CreateJobModal';
import { useJobs } from '../hooks/useJobs';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';

export default function Home() {
  const [createJobModalOpened, setCreateJobModalOpened] = useState(false);
  const { jobs, loading, error, filters, setFilters, refreshJobs } = useJobs();

  const handleCreateJob = () => {
    setCreateJobModalOpened(true);
  };

  const handleJobCreated = () => {
    refreshJobs();
  };

  return (
    <MantineProvider>
      <Notifications />
      <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        <Header
          filters={filters}
          onFiltersChange={setFilters}
          onCreateJob={handleCreateJob}
        />
        <JobList jobs={jobs} loading={loading} error={error} />
        <CreateJobModal
          opened={createJobModalOpened}
          onClose={() => setCreateJobModalOpened(false)}
          onJobCreated={handleJobCreated}
        />
      </div>
    </MantineProvider>
  );
}