"use client";

import {
  Modal,
  TextInput,
  Select,
  Group,
  Button,
  Stack,
  NumberInput,
  Textarea,
  Box,
  Divider,
  Menu,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CreateJobData } from "../types/job";
import { createJob } from "../utils/api";
import { notifications } from "@mantine/notifications";
import { IconChevronDown, IconCalendar, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { Controller } from "react-hook-form";

const createJobSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company name is required"),
  location: z.string().min(1, "Location is required"),
  jobtype: z.string().min(1, "Job type is required"),
  salarymin: z.number().min(0, "Minimum salary must be positive"),
  salarymax: z.number().min(0, "Maximum salary must be positive"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  applicationdeadline: z.date(),
});

interface CreateJobModalProps {
  opened: boolean;
  onClose: () => void;
  onJobCreated: () => void;
}

export const CreateJobModal = ({
  opened,
  onClose,
  onJobCreated,
}: CreateJobModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
    control,
  } = useForm<CreateJobData>({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      salarymin: 0,
      salarymax: 1200000,
    },
  });

  const [showSaveDraftDropdown, setShowSaveDraftDropdown] = useState(false);

  const locations = [
    { value: "Remote", label: "Remote" },
    { value: "New York", label: "New York" },
    { value: "San Francisco", label: "San Francisco" },
    { value: "London", label: "London" },
    { value: "Berlin", label: "Berlin" },
    { value: "Mumbai", label: "Mumbai" },
    { value: "Bangalore", label: "Bangalore" },
    { value: "Seattle", label: "Seattle" },
    { value: "Austin", label: "Austin" },
  ];

  const jobTypes = [
    { value: "FullTime", label: "FullTime" },
    { value: "Part-time", label: "Part-time" },
    { value: "Contract", label: "Contract" },
    { value: "Freelance", label: "Freelance" },
    { value: "Internship", label: "Internship" },
  ];

  const onSubmit = async (data: CreateJobData) => {
    try {
      await createJob(data);
      notifications.show({
        title: "Success",
        message: "Job created successfully!",
        color: "green",
      });
      reset();
      onClose();
      onJobCreated();
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to create job. Please try again.",
        color: "red",
      });
    }
  };

  const handleSaveDraft = () => {
    notifications.show({
      title: "Draft Saved",
      message: "Job draft saved successfully!",
      color: "blue",
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      size="lg"
      centered
      styles={{
        body: { padding: 0 },
        content: {
          borderRadius: 24,
          boxShadow: "0 8px 32px 0 rgba(34, 34, 87, 0.12)",
          padding: 0,
        },
      }}
    >
      <Box
        style={{
          background: "#fff",
          borderRadius: 24,
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <Group
          justify="space-between"
          align="center"
          px={24}
          py={20}
          style={{ borderBottom: "1px solid #e5e7eb" }}
        >
          <Box style={{ fontSize: 24, fontWeight: 600, color: "#1a1a1a" }}>
            Create Job Opening
          </Box>
          <Button
            variant="subtle"
            onClick={onClose}
            px={8}
            py={8}
            style={{ borderRadius: "50%" }}
          >
            <IconX size={24} color="#6b7280" />
          </Button>
        </Group>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack px={24} py={24} gap={24}>
            {/* Job Title and Company Name */}
            <Group grow gap={24}>
              <TextInput
                label={<span style={{ fontWeight: 500 }}>Job Title</span>}
                placeholder="Full Stack Developer"
                {...register("title")}
                error={errors.title?.message}
                radius="md"
                size="md"
                styles={{ input: { padding: "16px 16px" } }}
              />
              <TextInput
                label={<span style={{ fontWeight: 500 }}>Company Name</span>}
                placeholder="Amazon, Microsoft, Swiggy"
                {...register("company")}
                error={errors.company?.message}
                radius="md"
                size="md"
                styles={{ input: { padding: "16px 16px" } }}
              />
            </Group>

            {/* Location and Job Type */}
            <Group grow gap={24}>
              <Select
                label={<span style={{ fontWeight: 500 }}>Location</span>}
                placeholder="Choose Preferred Location"
                data={locations}
                {...register("location")}
                error={errors.location?.message}
                radius="md"
                size="md"
                value={watch("location")}
                onChange={(value) => setValue("location", value || "")}
                rightSection={<IconChevronDown size={18} />}
                styles={{ input: { padding: "16px 16px" } }}
              />
              <Select
                label={<span style={{ fontWeight: 500 }}>Job Type</span>}
                placeholder="FullTime"
                data={jobTypes}
                {...register("jobtype")}
                error={errors.jobtype?.message}
                radius="md"
                size="md"
                value={watch("jobtype")}
                onChange={(value) => setValue("jobtype", value || "")}
                rightSection={<IconChevronDown size={18} />}
                styles={{ input: { padding: "16px 16px" } }}
              />
            </Group>

            {/* Salary Range and Application Deadline */}
            <Group grow gap={24}>
              <Box style={{ width: "100%" }}>
                <Box style={{ fontWeight: 500, marginBottom: 8 }}>
                  Salary Range
                </Box>
                <Group gap={12} wrap="nowrap" style={{ width: "100%" }}>
                  <NumberInput
                    leftSection="₹"
                    placeholder="0"
                    min={0}
                    {...register("salarymin", { valueAsNumber: true })}
                    error={errors.salarymin?.message}
                    radius="md"
                    size="md"
                    value={
                      typeof watch("salarymin") === "number"
                        ? watch("salarymin")
                        : Number(watch("salarymin")) || 0
                    }
                    onChange={(value) =>
                      setValue(
                        "salarymin",
                        typeof value === "number" ? value : Number(value) || 0
                      )
                    }
                    styles={{
                      input: {
                        paddingLeft: 32,
                        paddingRight: 16,
                        paddingTop: 16,
                        paddingBottom: 16,
                        minWidth: 0,
                      },
                      root: { flex: 1 },
                    }}
                  />
                  <NumberInput
                    leftSection="₹"
                    placeholder="12,00,000"
                    min={0}
                    {...register("salarymax", { valueAsNumber: true })}
                    error={errors.salarymax?.message}
                    radius="md"
                    size="md"
                    value={
                      typeof watch("salarymax") === "number"
                        ? watch("salarymax")
                        : Number(watch("salarymax")) || 0
                    }
                    onChange={(value) =>
                      setValue(
                        "salarymax",
                        typeof value === "number" ? value : Number(value) || 0
                      )
                    }
                    styles={{
                      input: {
                        paddingLeft: 32,
                        paddingRight: 16,
                        paddingTop: 16,
                        paddingBottom: 16,
                        minWidth: 0,
                      },
                      root: { flex: 1 },
                    }}
                  />
                </Group>
                {(errors.salarymin || errors.salarymax) && (
                  <Box style={{ marginTop: 4, fontSize: 14, color: "#e53e3e" }}>
                    {errors.salarymin?.message || errors.salarymax?.message}
                  </Box>
                )}
              </Box>
              <Box style={{ width: "100%" }}>
                <Box style={{ fontWeight: 500, marginBottom: 8 }}>
                  Application Deadline
                </Box>
                <Controller
                  name="applicationdeadline"
                  control={control}
                  render={({ field }) => (
                    <DateInput
                      leftSection={<IconCalendar size={18} />}
                      placeholder="Select date"
                      error={errors.applicationdeadline?.message}
                      radius="md"
                      size="md"
                      value={field.value}
                      onChange={field.onChange}
                      styles={{
                        input: {
                          paddingLeft: 40,
                          paddingRight: 16,
                          paddingTop: 16,
                          paddingBottom: 16,
                        },
                      }}
                    />
                  )}
                />
              </Box>
            </Group>

            {/* Job Description */}
            <Box>
              <Box style={{ fontWeight: 500, marginBottom: 8 }}>
                Job Description
              </Box>
              <Textarea
                placeholder="Please share a description to let the candidate know more about the job role..."
                minRows={4}
                {...register("description")}
                error={errors.description?.message}
                radius="md"
                size="md"
                styles={{ input: { padding: "16px 16px", resize: "none" } }}
              />
            </Box>

            {/* Action Buttons */}
            <Group
              justify="space-between"
              align="center"
              pt={16}
              mt={8}
              style={{ borderTop: "1px solid #e5e7eb" }}
            >
              <Menu
                shadow="md"
                width={180}
                opened={showSaveDraftDropdown}
                onChange={setShowSaveDraftDropdown}
                position="bottom-start"
                withinPortal
              >
                <Menu.Target>
                  <Button
                    variant="outline"
                    color="gray"
                    radius="md"
                    px={24}
                    py={12}
                    style={{
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={() => setShowSaveDraftDropdown((o) => !o)}
                    rightSection={<IconChevronDown size={16} />}
                  >
                    Save Draft
                  </Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item onClick={handleSaveDraft}>Save as Draft</Menu.Item>
                </Menu.Dropdown>
              </Menu>
              <Button
                type="submit"
                loading={isSubmitting}
                radius="md"
                px={32}
                py={12}
                style={{
                  background:
                    "linear-gradient(90deg, #3b82f6 0%, #7c3aed 100%)",
                  color: "white",
                  fontWeight: 600,
                  fontSize: 16,
                  boxShadow: "0 1px 4px rgba(124, 58, 237, 0.15)",
                  transition: "all 0.2s",
                  border: "none",
                }}
                styles={{
                  root: {
                    background:
                      "linear-gradient(90deg, #3b82f6 0%, #7c3aed 100%)",
                    color: "white",
                    fontWeight: 600,
                    fontSize: 16,
                    border: "none",
                  },
                }}
              >
                Publish{" "}
                <span style={{ marginLeft: 8, fontWeight: 700, fontSize: 18 }}>
                  »
                </span>
              </Button>
            </Group>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};
