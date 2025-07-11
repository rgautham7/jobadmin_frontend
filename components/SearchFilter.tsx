"use client";

import {
  TextInput,
  Select,
  Group,
  Box,
  Text,
  RangeSlider,
  Container,
  Divider,
} from "@mantine/core";
import { IconSearch, IconMapPin, IconBriefcase } from "@tabler/icons-react";
import { JobFilter } from "../types/job";

interface SearchFilterProps {
  filters: JobFilter;
  onFiltersChange: (filters: JobFilter) => void;
}

export const SearchFilter = ({
  filters,
  onFiltersChange,
}: SearchFilterProps) => {
  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value });
  };

  const handleLocationChange = (value: string | null) => {
    onFiltersChange({ ...filters, location: value || "" });
  };

  const handleJobTypeChange = (value: string | null) => {
    onFiltersChange({ ...filters, jobtype: value || "" });
  };

  // --- LOGIC FIX: Use 0–200 for slider, but convert to 1000s for filter ---
  const handleSalaryRangeChange = (value: [number, number]) => {
    onFiltersChange({
      ...filters,
      salaryRange: { min: value[0] * 1000, max: value[1] * 1000 },
    });
  };

  // For displaying the slider, convert from filter (which is in actual value) to "k" values
  const sliderValue: [number, number] = [
    Math.round(filters.salaryRange.min / 1000),
    Math.round(filters.salaryRange.max / 1000),
  ];

  return (
    <Box
      style={{
        backgroundColor: "#f8f9fa",
        borderBottom: "1px solid #e9ecef",
        padding: "0 0 8px 0",
      }}
    >
      <Container size="xl" px="xl" py={0}>
        <Group justify="space-between" align="center" w="100%" gap={0}>
          {/* Search Input */}
          <TextInput
            placeholder="Search By Job Title, Role"
            leftSection={<IconSearch size={20} />}
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            styles={{
              root: { width: 300 },
              input: {
                border: "none",
                backgroundColor: "white",
                borderRadius: 8,
                fontSize: 15,
                height: 44,
                paddingLeft: 40,
                boxShadow: "0 1px 4px 0 rgba(44, 62, 80, 0.04)",
              },
            }}
          />

          <Divider orientation="vertical" size="sm" style={{ height: 40, margin: "0 16px" }} />

          {/* Location and Job Type Selects */}
          <Group gap={0}>
            <Select
              placeholder="Preferred Location"
              leftSection={<IconMapPin size={20} />}
              value={filters.location}
              onChange={handleLocationChange}
              data={[
                { value: "", label: "All Locations" },
                { value: "Remote", label: "Remote" },
                { value: "New York", label: "New York" },
                { value: "San Francisco", label: "San Francisco" },
                { value: "London", label: "London" },
                { value: "Mumbai", label: "Mumbai" },
                { value: "Bangalore", label: "Bangalore" },
              ]}
              styles={{
                root: { width: 180 },
                input: {
                  border: "none",
                  backgroundColor: "white",
                  borderRadius: 8,
                  height: 44,
                  paddingLeft: 40,
                  fontSize: 15,
                  boxShadow: "0 1px 4px 0 rgba(44, 62, 80, 0.04)",
                },
              }}
            />
            <Divider orientation="vertical" size="sm" style={{ height: 40, margin: "0 16px" }} />
            <Select
              placeholder="Job type"
              leftSection={<IconBriefcase size={20} />}
              value={filters.jobtype}
              onChange={handleJobTypeChange}
              data={[
                { value: "", label: "All Types" },
                { value: "Full-time", label: "Full-time" },
                { value: "Part-time", label: "Part-time" },
                { value: "Contract", label: "Contract" },
                { value: "Freelance", label: "Freelance" },
              ]}
              styles={{
                root: { width: 150 },
                input: {
                  border: "none",
                  backgroundColor: "white",
                  borderRadius: 8,
                  height: 44,
                  paddingLeft: 40,
                  fontSize: 15,
                  boxShadow: "0 1px 4px 0 rgba(44, 62, 80, 0.04)",
                },
              }}
            />
          </Group>

          <Divider orientation="vertical" size="sm" style={{ height: 40, margin: "0 16px" }} />

          {/* Salary Range Slider */}
          <Box style={{ width: 260 }}>
            <Text size="sm" fw={500} mb={8} c="#666">
              Salary Per Month
            </Text>
            <Group justify="space-between" mb={8}>
              <Text size="sm" c="dimmed">
                ₹{sliderValue[0]}k
              </Text>
              <Text size="sm" c="dimmed">
                ₹{sliderValue[1]}k
              </Text>
            </Group>
            <RangeSlider
              value={sliderValue}
              onChange={handleSalaryRangeChange}
              min={0}
              max={200}
              step={1}
              styles={{
                thumb: {
                  backgroundColor: "#fff",
                  border: "7px solid #000",
                  width: 20,
                  height: 20,
                  boxShadow: "none",
                },
                track: {
                  backgroundColor: "#000",
                  height: 2,
                },
                bar: {
                  backgroundColor: "#000",
                  height: 2,
                },
              }}
            />
          </Box>
        </Group>
      </Container>
    </Box>
  );
};
