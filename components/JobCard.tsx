"use client";

import {
  Card,
  Group,
  Text,
  Badge,
  Button,
  Stack,
  Box,
  Image,
} from "@mantine/core";
import {
  IconUsers,
  IconBriefcase,
  IconCurrencyRupee,
} from "@tabler/icons-react";
import { Job } from "../types/job";

interface JobCardProps {
  job: Job;
}

export const JobCard = ({ job }: JobCardProps) => {
  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );
    if (diffInHours < 24) {
      return `${diffInHours}h Ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d Ago`;
    }
  };

  // Use public folder images for company logos
  const logoMap: Record<string, string> = {
    Tesla: "/tesla.png",
    Google: "/google.webp",
    Flipkart: "/flipkart.png",
    Swiggy: "/swiggy.png",
    Microsoft: "/microsoft.webp",
    Amazon: "/amazon.jpg",
    "Creative Studio": "/creative_studio.png",
    "Design Hub": "/design_hub.jpg",
    Cybermind: "/cybermind.png",
  };
  const logoSrc = logoMap[job.company] || "/logos/default.png";

  return (
    <Card
      shadow="sm"
      radius="md"
      withBorder
      style={{
        height: "100%",
        position: "relative",
        transition: "all 0.2s ease",
      }}
    >
      <Stack gap="md" h="100%">
        {/* Header: logo left, time right */}
        <Group justify="space-between" align="center" mb={-8}>
          <Box
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              backgroundColor: "#f5f5f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <Image
              src={logoSrc}
              alt={job.company}
              width={40}
              height={40}
              fallbackSrc="/logos/default.png"
            />
          </Box>
          <Badge
            variant="light"
            color="blue"
            size="md"
            radius="md"
            style={{
              backgroundColor: "#b3daff",
              fontWeight: 500,
              fontSize: 32,
              borderRadius: 16,
              padding: "12px 32px",
              minWidth: 0,
              height: "auto",
              lineHeight: 1,
              color: "#000",
              boxShadow: "none",
              letterSpacing: 0,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {formatTimeAgo(job.postedat)}
          </Badge>
        </Group>

        {/* Job title */}
        <Text size="lg" fw={600} lineClamp={2} style={{ marginTop: 0 }}>
          {job.title}
        </Text>

        {/* Job details */}
        <Group gap="lg">
          <Group gap={4}>
            <IconUsers size={16} color="#666" />
            <Text size="sm" c="dimmed">
              {job.experience}
            </Text>
          </Group>
          <Group gap={4}>
            <IconBriefcase size={16} color="#666" />
            <Text size="sm" c="dimmed">
              {job.isremote ? "Remote" : "Onsite"}
            </Text>
          </Group>
          <Group gap={4}>
            <IconCurrencyRupee size={16} color="#666" />
            <Text size="sm" c="dimmed">
              {job.salarydisplay}
            </Text>
          </Group>
        </Group>

        {/* Description */}
        <Box style={{ flex: 1 }}>
          <ul style={{ paddingLeft: 18, margin: 0 }}>
            {job.description.split("\n").map((line, idx) => (
              <li
                key={idx}
                style={{
                  fontSize: 14,
                  color: "#666",
                  marginBottom: 2,
                  listStyle: "disc",
                }}
              >
                {line}
              </li>
            ))}
          </ul>
        </Box>

        {/* Apply button */}
        <Button
          fullWidth
          radius="md"
          size="md"
          styles={{
            root: {
              backgroundColor: "#00bcd4",
              fontWeight: 600,
              fontSize: 18,
              borderRadius: 12,
              marginTop: 8,
              "&:hover": {
                backgroundColor: "#00acc1",
              },
            },
          }}
        >
          Apply Now
        </Button>
      </Stack>
    </Card>
  );
};
