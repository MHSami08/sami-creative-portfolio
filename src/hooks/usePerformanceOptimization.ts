import { useEffect, useCallback } from 'react';

export const usePerformanceOptimization = () => {
  // Preload critical resources
  const preloadCriticalResources = useCallback(() => {
    // Preload hero image
    const heroImage = new Image();
    heroImage.src = 'https://i.postimg.cc/MKJvV52X/Screenshot-2025-06-16-22-41-45-730-com-alightcreative-motion-edit.jpg';
    
    // Preconnect to external domains
    const preconnectLinks = [
      'https://img.youtube.com',
      'https://images.unsplash.com',
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ];
    
    preconnectLinks.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = href;
      document.head.appendChild(link);
    });
  }, []);

  // Optimize images with WebP support
  const optimizeImage = useCallback((src: string, width?: number, height?: number) => {
    // Check if browser supports WebP
    const supportsWebP = () => {
      const canvas = document.createElement('canvas');
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    };

    if (supportsWebP() && src.includes('unsplash.com')) {
      const url = new URL(src);
      url.searchParams.set('fm', 'webp');
      if (width) url.searchParams.set('w', width.toString());
      if (height) url.searchParams.set('h', height.toString());
      return url.toString();
    }

    return src;
  }, []);

  // Debounce function for performance
  const debounce = useCallback((func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }, []);

  // Throttle function for scroll events
  const throttle = useCallback((func: Function, limit: number) => {
    let inThrottle: boolean;
    return function(this: any, ...args: any[]) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }, []);

  // Monitor Core Web Vitals
  const monitorPerformance = useCallback(() => {
    if ('web-vital' in window) {
      // Monitor LCP, FID, CLS
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          console.log(`${entry.entryType}:`, entry);
        }
      }).observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    }
  }, []);

  useEffect(() => {
    preloadCriticalResources();
    monitorPerformance();
  }, [preloadCriticalResources, monitorPerformance]);

  return {
    optimizeImage,
    debounce,
    throttle
  };
};