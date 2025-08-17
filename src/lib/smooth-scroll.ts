/**
 * Utility function for smooth scrolling to page sections
 */
export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
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