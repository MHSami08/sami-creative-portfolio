export const seoConfig = {
  siteName: "MH_officialYT Portfolio",
  defaultTitle: "Masrafi Haque Sami - Islamic Content Creator & Developer",
  defaultDescription: "Professional Islamic content creator specializing in video editing, nasheed production, and C programming education. Explore my portfolio of Islamic videos and educational content.",
  siteUrl: "https://masrafi-portfolio.lovable.app",
  defaultImage: "https://i.postimg.cc/MKJvV52X/Screenshot-2025-06-16-22-41-45-730-com-alightcreative-motion-edit.jpg",
  author: "Masrafi Haque Sami",
  keywords: [
    "Islamic content creator",
    "Video editing",
    "Nasheed videos", 
    "C programming tutorials",
    "Motion graphics",
    "Islamic educational content",
    "MH_officialYT",
    "Masrafi Haque Sami",
    "Professional video editor",
    "Islamic video production"
  ],
  social: {
    youtube: "https://youtu.be/9ovxlUmrAEA?si=gj3cnKNddsWvqspO"
  }
};

export const generatePageMeta = (page?: {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}) => {
  return {
    title: page?.title ? `${page.title} | ${seoConfig.siteName}` : seoConfig.defaultTitle,
    description: page?.description || seoConfig.defaultDescription,
    image: page?.image || seoConfig.defaultImage,
    url: page?.url ? `${seoConfig.siteUrl}${page.url}` : seoConfig.siteUrl
  };
};