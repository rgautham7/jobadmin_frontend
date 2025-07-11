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
import styles from '../styles/JobCard.module.css';

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
      className={styles.jobCardRoot}
    >
      <Stack className={styles.jobCardStack}>
        {/* Header: logo left, time right */}
        <Group justify="space-between" align="center" mb={-8}>
          <Box className={styles.jobCardLogoBox}>
            <Image
              src={logoSrc}
              alt={job.company}
              width={36}
              height={36}
              fallbackSrc="/logos/default.png"
              className={styles.jobCardLogoImg}
            />
          </Box>
          <Badge
            variant="light"
            color="blue"
            size="md"
            radius="xl"
            className={styles.jobCardBadge}
          >
            {formatTimeAgo(job.postedat)}
          </Badge>
        </Group>

        {/* Job title */}
        <Text className={styles.jobCardTitle}>
          {job.title}
        </Text>

        {/* Job details */}
        <Group className={styles.jobCardDetails}>
          <Group className={styles.jobCardDetailGroup}>
            <IconUser size={18} color="#888" />
            <Text className={styles.jobCardDetailText}>
              {job.experience}
            </Text>
          </Group>
          <Group className={styles.jobCardDetailGroup}>
            <IconBuilding size={18} color="#888" />
            <Text className={styles.jobCardDetailText}>
              {job.isremote ? "Remote" : "Onsite"}
            </Text>
          </Group>
          <Group className={styles.jobCardDetailGroup}>
            <IconLayersOff size={18} color="#888" />
            <Text className={styles.jobCardDetailText}>
              {job.salarydisplay}
            </Text>
          </Group>
        </Group>

        {/* Description */}
        <Box className={styles.jobCardDescBox}>
          <ul className={styles.jobCardDescList}>
            {job.description.split("\n").map((line, idx) => (
              <li key={idx} className={styles.jobCardDescItem}>
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
          className={styles.jobCardButton}
        >
          Apply Now
        </Button>
      </Stack>
    </Card>
  );
};
