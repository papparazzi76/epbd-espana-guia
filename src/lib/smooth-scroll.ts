import type React from 'react';

/**
 * Utility function for smooth scrolling to page sections
 * Uses a JS animation to guarantee smoothness even when the browser/OS
 * ignores CSS or native smooth scrolling (e.g., prefers-reduced-motion)
 */
const smoothScrollTo = (targetY: number, duration = 600) => {
  const startY = window.pageYOffset || document.documentElement.scrollTop;
  const distance = targetY - startY;
  const startTime = performance.now();

  const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  const step = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);
    window.scrollTo(0, startY + distance * eased);
    if (elapsed < duration) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
};

export const scrollToSection = (sectionId: string, offset = 0) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const rect = element.getBoundingClientRect();
    const targetY = rect.top + window.pageYOffset - offset;
    smoothScrollTo(targetY);
  }
};

/**
 * Handle smooth scrolling for anchor links
 */
export const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  // Only handle internal links that start with #
  if (href.startsWith('#')) {
    e.preventDefault();
    const sectionId = href.substring(1);
    scrollToSection(sectionId);
  }
};