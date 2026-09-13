import React from 'react';
import { profileData, projectsData } from '@/data/portfolioData';

export default function StructuredData() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${profileData.siteUrl}/#person`,
    name: profileData.name,
    jobTitle: profileData.title,
    description: profileData.bio,
    url: profileData.siteUrl,
    sameAs: [
      profileData.github,
      profileData.linkedin,
      profileData.twitter,
    ],
    knowsAbout: [
      'Next.js',
      'React',
      'TypeScript',
      'Artificial Intelligence',
      'Search Engine Optimization (SEO)',
      'Full Stack Development',
      'Web Development',
      'Software Architecture',
      'Cloud Computing'
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Apex Tech Labs'
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'San Francisco',
      addressRegion: 'CA',
      addressCountry: 'US'
    }
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${profileData.siteUrl}/#website`,
    url: profileData.siteUrl,
    name: `${profileData.name} Portfolio`,
    description: profileData.bio,
    publisher: {
      '@id': `${profileData.siteUrl}/#person`
    },
    inLanguage: 'en-US'
  };

  const profilePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${profileData.siteUrl}/#profilepage`,
    url: profileData.siteUrl,
    name: `${profileData.name} — ${profileData.title}`,
    mainEntity: {
      '@id': `${profileData.siteUrl}/#person`
    },
    hasPart: projectsData.map((project) => ({
      '@type': 'CreativeWork',
      name: project.title,
      description: project.description,
      url: project.demoUrl,
      author: {
        '@id': `${profileData.siteUrl}/#person`
      },
      keywords: project.tags.join(', ')
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
    </>
  );
}
