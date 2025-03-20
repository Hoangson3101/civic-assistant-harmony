import { useState, useRef, ReactNode, useEffect } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  depth?: number;
  highlight?: boolean;
}

const AnimatedCard = ({ 
  children, 
  className = "", 
  depth = 5,
  highlight = false 
}: AnimatedCardProps) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mouseOver, setMouseOver] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Tính toán góc xoay dựa trên vị trí chuột tương đối với tâm card
    const rotateYValue = ((mouseX - centerX) / (rect.width / 2)) * depth;
    const rotateXValue = ((centerY - mouseY) / (rect.height / 2)) * depth;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseEnter = () => {
    setMouseOver(true);
  };

  const handleMouseLeave = () => {
    setMouseOver(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-200 ease-out ${className}`}
      style={{
        transform: mouseOver 
          ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)` 
          : "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)",
        boxShadow: mouseOver 
          ? `0 10px 30px -10px rgba(0, 0, 0, 0.2), 
             ${rotateY / 5}px ${rotateX / -5}px 20px rgba(0, 0, 0, 0.1), 
             inset 0 0 0 1px ${highlight ? "rgba(var(--primary-rgb), 0.4)" : "rgba(var(--border-rgb), 0.15)"},
             inset 0 -20px 30px -20px rgba(var(--border-rgb), 0.15)`
          : "0 4px 15px -3px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(var(--border-rgb), 0.05)",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

export default AnimatedCard; 