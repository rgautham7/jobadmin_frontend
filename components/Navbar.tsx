"use client";

import { useState } from 'react';
import { Group, Button, Box } from '@mantine/core';
import Image from 'next/image';

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
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        background: 'transparent',
        marginTop: 24,
        marginBottom: 8,
      }}
    >
      <Box
        style={{
          background: 'white',
          boxShadow: '0 4px 24px 0 rgba(34, 34, 87, 0.08)',
          borderRadius: 32,
          padding: '12px 36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: 1100,
        }}
      >
        {/* Logo */}
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <Image
            src="/cybermind.png"
            width={40}
            height={40}
            alt="Cybermind Logo"
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              objectFit: 'cover',
              marginRight: 12,
            }}
          />
        </Box>

        {/* Navigation */}
        <Group gap={32} style={{ marginLeft: 32, marginRight: 32 }}>
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              style={{
                color: active === item.label ? '#7C3AED' : '#4B5563',
                fontWeight: 500,
                fontSize: 17,
                transition: 'color 0.2s',
                textDecoration: 'none',
                padding: '4px 0',
                borderBottom: active === item.label ? '2px solid #7C3AED' : '2px solid transparent',
              }}
              onMouseOver={e => (e.currentTarget.style.color = '#7C3AED')}
              onMouseOut={e => (e.currentTarget.style.color = active === item.label ? '#7C3AED' : '#4B5563')}
              onClick={() => setActive(item.label)}
            >
              {item.label}
            </a>
          ))}
        </Group>

        {/* Create Jobs Button */}
        <Button
          onClick={onCreateJob}
          size="md"
          radius="xl"
          fw={600}
          style={{
            background: 'linear-gradient(to right, #8b5cf6, #7c3aed)',
            color: 'white',
            fontWeight: 600,
            padding: '10px 32px',
            borderRadius: 9999,
            boxShadow: '0 1px 4px rgba(124, 58, 237, 0.15)',
            border: 'none',
            fontSize: 17,
          }}
          styles={{
            root: {
              background: 'linear-gradient(to right, #8b5cf6, #7c3aed)',
              color: 'white',
              fontWeight: 600,
              padding: '10px 32px',
              borderRadius: 9999,
              boxShadow: '0 1px 4px rgba(124, 58, 237, 0.15)',
              border: 'none',
              fontSize: 17,
            },
          }}
        >
          Create Jobs
        </Button>
      </Box>
    </Box>
  );
};