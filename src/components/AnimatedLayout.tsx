
import { ReactNode, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

interface AnimatedLayoutProps {
  children: ReactNode;
}

const AnimatedLayout = ({ children }: AnimatedLayoutProps) => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add animation classes when route changes
    if (containerRef.current) {
      containerRef.current.classList.add("animate-fade-in");
      
      const timeout = setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.classList.remove("animate-fade-in");
        }
      }, 500);
      
      return () => clearTimeout(timeout);
    }
  }, [location.pathname]);

  useEffect(() => {
    // Animate elements as they scroll into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => elements.forEach(el => observer.unobserve(el));
  }, [children]);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen pt-16 px-4 md:px-8"
    >
      {children}
    </div>
  );
};

export default AnimatedLayout;
