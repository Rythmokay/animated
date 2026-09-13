import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import { profileData } from "@/data/portfolioData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#090d16",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(profileData.siteUrl),
  title: {
    default: `${profileData.name} | Senior Full Stack Engineer & AI Systems Architect`,
    template: `%s | ${profileData.name}`,
  },
  description: profileData.bio,
  keywords: [
    "Alex Rivera",
    "Full Stack Developer",
    "Next.js Portfolio",
    "React 19 Engineer",
    "AI Systems Architect",
    "TypeScript Developer",
    "Core Web Vitals SEO",
    "Software Engineer Portfolio",
    "San Francisco Web Developer",
  ],
  authors: [{ name: profileData.name, url: profileData.siteUrl }],
  creator: profileData.name,
  publisher: profileData.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: profileData.siteUrl,
    title: `${profileData.name} | Senior Full Stack & AI Systems Architect`,
    description: profileData.bio,
    siteName: `${profileData.name} Portfolio`,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${profileData.name} — Senior Full Stack & AI Architect`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profileData.name} | Senior Full Stack & AI Systems Architect`,
    description: profileData.bio,
    creator: "@alexrivera_dev",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: profileData.siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <StructuredData />
      </head>
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
