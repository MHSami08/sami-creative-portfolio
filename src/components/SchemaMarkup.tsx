import React from 'react';
import { seoConfig } from '@/utils/seoConfig';

interface SchemaMarkupProps {
  type?: 'person' | 'portfolio' | 'video';
  data?: any;
}

const SchemaMarkup: React.FC<SchemaMarkupProps> = ({ type = 'person', data }) => {
  const generateSchema = () => {
    switch (type) {
      case 'person':
        return {
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Masrafi Haque Sami",
          "alternateName": "MH_officialYT",
          "description": "Islamic Content Creator, Video Editor, and C Programming Educator",
          "url": seoConfig.siteUrl,
          "image": seoConfig.defaultImage,
          "sameAs": [seoConfig.social.youtube],
          "jobTitle": "Content Creator & Developer",
          "worksFor": {
            "@type": "Organization",
            "name": "MH_officialYT"
          },
          "knowsAbout": [
            "Islamic Content Creation",
            "Video Editing", 
            "C Programming",
            "Motion Graphics",
            "Educational Content"
          ],
          "hasOccupation": {
            "@type": "Occupation",
            "name": "Content Creator and Programmer",
            "description": "Creates Islamic educational content and programming tutorials"
          }
        };

      case 'portfolio':
        return {
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "name": `${seoConfig.siteName} - Portfolio`,
          "description": seoConfig.defaultDescription,
          "url": seoConfig.siteUrl,
          "author": {
            "@type": "Person",
            "name": seoConfig.author
          },
          "creator": {
            "@type": "Person", 
            "name": seoConfig.author
          }
        };

      case 'video':
        return data ? {
          "@context": "https://schema.org",
          "@type": "VideoObject",
          "name": data.title,
          "description": data.description,
          "thumbnailUrl": data.thumbnail,
          "uploadDate": data.uploadDate || new Date().toISOString(),
          "duration": data.duration,
          "contentUrl": data.videoUrl,
          "embedUrl": data.embedUrl,
          "creator": {
            "@type": "Person",
            "name": seoConfig.author
          }
        } : null;

      default:
        return null;
    }
  };

  const schema = generateSchema();

  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default SchemaMarkup;