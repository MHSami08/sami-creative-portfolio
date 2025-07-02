
// Image optimization utilities for better performance

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
}

// Lazy loading image component hook
export const useLazyImage = (src: string) => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageSrc(src);
            observer.unobserve(img);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(img);

    return () => {
      if (img) observer.unobserve(img);
    };
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return { imgRef, imageSrc, isLoaded, handleLoad };
};

// Convert images to WebP format check
export const supportsWebP = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

// Optimize image URL for better performance
export const optimizeImageUrl = (url: string, width?: number, quality = 85): string => {
  // For external URLs, return as-is
  if (url.startsWith('http')) {
    return url;
  }
  
  // For local images, you could add optimization parameters
  // This is a placeholder for image optimization service integration
  let optimizedUrl = url;
  
  if (width) {
    optimizedUrl += `?w=${width}`;
  }
  
  if (quality !== 85) {
    optimizedUrl += `${width ? '&' : '?'}q=${quality}`;
  }
  
  return optimizedUrl;
};
