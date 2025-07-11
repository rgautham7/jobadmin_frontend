"use client";

import { Box } from '@mantine/core';
import { Navbar } from './Navbar';
import { SearchFilter } from './SearchFilter';
import { JobFilter } from '../types/job';
import styles from '../styles/Header.module.css';

interface HeaderProps {
  filters: JobFilter;
  onFiltersChange: (filters: JobFilter) => void;
  onCreateJob: () => void;
}

export const Header = ({ filters, onFiltersChange, onCreateJob }: HeaderProps) => {
  return (
    <Box className={styles.headerRoot}>
      <Navbar onCreateJob={onCreateJob} />
      <SearchFilter filters={filters} onFiltersChange={onFiltersChange} />
    </Box>
  );
};