import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Job Management Admin',
  description: 'A clean and professional job management admin interface',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
      <link
        rel="stylesheet"
        href="https://api.fontshare.com/v2/css?f[]=satoshi@1&display=swap"
      />
      </head>
      <body className="font-satoshi">{children}</body>
    </html>
  );
}