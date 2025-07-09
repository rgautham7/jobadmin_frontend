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
      }}
    >
      <Box
        style={{
          background: 'white',
          boxShadow: '0 4px 24px 0 rgba(34, 34, 87, 0.08)',
          borderRadius: '9999px',
          padding: '1rem 2.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '56rem', // max-w-4xl
          marginTop: '1.5rem',
          marginBottom: '1rem',
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
              borderRadius: '0.5rem',
              objectFit: 'cover',
            }}
          />
        </Box>

        {/* Navigation */}
        <Group gap={32} style={{ marginLeft: '2rem', marginRight: '2rem' }}>
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              style={{
                color: '#4B5563', // text-gray-700
                fontWeight: 500,
                fontSize: '1rem',
                transition: 'color 0.2s',
                textDecoration: 'none',
                ...(active === item.label
                  ? { color: '#7C3AED' } // violet-600
                  : {}),
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
            background: 'linear-gradient(to right, #8b5cf6, #7c3aed)', // from-violet-500 to-purple-600
            color: 'white',
            fontWeight: 600,
            padding: '0.5rem 1.75rem',
            borderRadius: '9999px',
            boxShadow: '0 1px 4px rgba(124, 58, 237, 0.15)',
            transition: 'all 0.2s',
            border: 'none',
          }}
          styles={{
            root: {
              background: 'linear-gradient(to right, #8b5cf6, #7c3aed)',
              color: 'white',
              fontWeight: 600,
              padding: '0.5rem 1.75rem',
              borderRadius: '9999px',
              boxShadow: '0 1px 4px rgba(124, 58, 237, 0.15)',
              border: 'none',
            },
          }}
          onMouseOver={e => {
            (e.currentTarget as HTMLButtonElement).style.background =
              'linear-gradient(to right, #7c3aed, #6d28d9)';
          }}
          onMouseOut={e => {
            (e.currentTarget as HTMLButtonElement).style.background =
              'linear-gradient(to right, #8b5cf6, #7c3aed)';
          }}
        >
          Create Jobs
        </Button>
      </Box>
    </Box>
  );
};