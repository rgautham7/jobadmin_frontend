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
  IconUser,
  IconBuilding,
  IconLayersOff,
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
      radius={16}
      withBorder
      style={{
        height: "100%",
        minHeight: 340,
        maxWidth: 320,
        border: "none",
        boxShadow: "0 2px 12px 0 rgba(44, 62, 80, 0.08)",
        background: "#fff",
        padding: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Stack gap={0} h="100%" style={{ padding: 20 }}>
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
              boxShadow: "0 2px 8px 0 rgba(44, 62, 80, 0.08)",
            }}
          >
            <Image
              src={logoSrc}
              alt={job.company}
              width={36}
              height={36}
              fallbackSrc="/logos/default.png"
              style={{ objectFit: "contain" }}
            />
          </Box>
          <Badge
            variant="light"
            color="blue"
            size="md"
            radius="xl"
            style={{
              backgroundColor: "#b3daff",
              fontWeight: 500,
              fontSize: 16,
              borderRadius: 12,
              padding: "4px 18px",
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
        <Text
          size="xl"
          fw={700}
          style={{
            marginTop: 12,
            marginBottom: 10,
            color: "#222",
            lineHeight: 1.2,
          }}
        >
          {job.title}
        </Text>

        {/* Job details */}
        <Group gap="md" style={{ marginBottom: 8 }}>
          <Group gap={4}>
            <IconUser size={18} color="#888" stroke={1.7} />
            <Text size="sm" c="dimmed" style={{ fontWeight: 500 }}>
              {job.experience}
            </Text>
          </Group>
          <Group gap={4}>
            <IconBuilding size={18} color="#888" stroke={1.7} />
            <Text size="sm" c="dimmed" style={{ fontWeight: 500 }}>
              {job.isremote ? "Remote" : "Onsite"}
            </Text>
          </Group>
          <Group gap={4}>
            <IconLayersOff size={18} color="#888" stroke={1.7} />
            <Text size="sm" c="dimmed" style={{ fontWeight: 500 }}>
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
                  marginBottom: 4,
                  listStyle: "disc",
                  fontWeight: 400,
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
          radius="xl"
          size="md"
          styles={{
            root: {
              backgroundColor: "#1da1f2",
              fontWeight: 600,
              fontSize: 18,
              borderRadius: 12,
              marginTop: 16,
              "&:hover": {
                backgroundColor: "#1a8cd8",
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
