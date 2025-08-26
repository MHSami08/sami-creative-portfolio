import { useState, useEffect, RefObject } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

interface UseMouseTrackingProps {
  ref: RefObject<HTMLElement>;
  intensity?: number;
  perspective?: number;
}

export const useMouseTracking = ({ 
  ref, 
  intensity = 15, 
  perspective = 1000 
}: UseMouseTrackingProps) => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);
      
      setMousePosition({ x, y });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => {
      setIsHovering(false);
      setMousePosition({ x: 0, y: 0 });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref]);

  const getTransform = () => {
    if (!isHovering) return '';
    
    const rotateX = mousePosition.y * intensity;
    const rotateY = -mousePosition.x * intensity;
    const translateZ = isHovering ? 20 : 0;
    
    return `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
  };

  const getParallaxTransform = (depth = 1) => {
    const x = mousePosition.x * (intensity * depth * 0.5);
    const y = mousePosition.y * (intensity * depth * 0.5);
    
    return `translate3d(${x}px, ${y}px, 0)`;
  };

  return {
    mousePosition,
    isHovering,
    getTransform,
    getParallaxTransform
  };
};