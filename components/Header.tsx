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
    <Box
      style={{
        backgroundColor: "#f8f9fa",
        borderBottom: "1px solid #e9ecef",
        boxShadow: "0 2px 16px 0 rgba(44, 62, 80, 0.04)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <Navbar onCreateJob={onCreateJob} />
      <SearchFilter filters={filters} onFiltersChange={onFiltersChange} />
    </Box>
  );
};