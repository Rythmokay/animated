import { MetadataRoute } from 'next';
import { profileData } from '@/data/portfolioData';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${profileData.siteUrl}/sitemap.xml`,
  };
}
