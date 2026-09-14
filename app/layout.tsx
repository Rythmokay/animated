import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frame Scroll Animation',
  description: 'Full screen frame-by-frame scroll canvas animation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
