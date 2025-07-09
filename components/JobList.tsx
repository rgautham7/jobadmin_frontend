"use client";

import { SimpleGrid, Container, Text, Center, Loader } from '@mantine/core';
import { JobCard } from './JobCard';
import { Job } from '../types/job';

interface JobListProps {
  jobs: Job[];
  loading: boolean;
  error: string | null;
}

export const JobList = ({ jobs, loading, error }: JobListProps) => {
  if (loading) {
    return (
      <Center py="xl">
        <Loader color="blue" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center py="xl">
        <Text c="red">Error: {error}</Text>
      </Center>
    );
  }

  if (jobs.length === 0) {
    return (
      <Center py="xl">
        <Text c="dimmed">No jobs found</Text>
      </Center>
    );
  }

  return (
    <Container size="xl" py="xl">
      <SimpleGrid
        cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
        spacing="lg"
        verticalSpacing="lg"
      >
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </SimpleGrid>
    </Container>
  );
};