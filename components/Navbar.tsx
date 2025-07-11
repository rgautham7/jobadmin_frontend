"use client";

import { useState } from 'react';
import { Group, Button, Box } from '@mantine/core';
import Image from 'next/image';
import styles from '../styles/Navbar.module.css';

interface NavbarProps {
  onCreateJob: () => void;
}

export const Navbar = ({ onCreateJob }: NavbarProps) => {
  const [active, setActive] = useState('Home');

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Find Jobs', href: '/jobs' },
    { label: 'Find Talents', href: '/talents' },
    { label: 'About us', href: '/about' },
    { label: 'Testimonials', href: '/testimonials' },
  ];

  return (
    <Box className={styles.navbarContainer}>
      <Box className={styles.navbarInner}>
        {/* Logo */}
        <Box className={styles.navbarLogo}>
          <Image
            src="/cybermind.png"
            width={40}
            height={40}
            alt="Cybermind Logo"
            className={styles.navbarLogoImg}
          />
        </Box>

        {/* Navigation */}
        <nav className={styles.navbarLinks}>
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`${styles.navbarLink} ${active === item.label ? styles.navbarLinkActive : ''}`}
              onClick={() => setActive(item.label)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Create Jobs Button */}
        <Button
          onClick={onCreateJob}
          size="md"
          radius="xl"
          fw={600}
          className={styles.createJobBtn}
        >
          Create Jobs
        </Button>
      </Box>
    </Box>
  );
};