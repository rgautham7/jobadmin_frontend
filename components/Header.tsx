"use client";

import { Box } from '@mantine/core';
import { Navbar } from './Navbar';
import { SearchFilter } from './SearchFilter';
import { JobFilter } from '../types/job';

interface HeaderProps {
  filters: JobFilter;
  onFiltersChange: (filters: JobFilter) => void;
  onCreateJob: () => void;
}

export const Header = ({ filters, onFiltersChange, onCreateJob }: HeaderProps) => {
  return (
    <Box style={{ backgroundColor: 'white', borderBottom: '1px solid #e9ecef' }}>
      <Navbar onCreateJob={onCreateJob} />
      <SearchFilter filters={filters} onFiltersChange={onFiltersChange} />
    </Box>
  );
};