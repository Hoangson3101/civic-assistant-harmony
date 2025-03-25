
import React, { useState, useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";

export interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  depth?: number;
  highlight?: boolean;
  onClick?: () => void;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className,
  depth = 3,
  highlight = false,
  onClick
}) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / (rect.height / 2) * depth;
    const rotateY = (centerX - x) / (rect.width / 2) * depth;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const style = {
    transform: isHovered
      ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.02, 1.02, 1.02)`
      : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    transition: isHovered
      ? 'transform 0.1s ease'
      : 'transform 0.3s ease',
    boxShadow: isHovered
      ? `0 10px 25px -5px rgba(0, 0, 0, 0.1), 
         0 5px 10px -5px rgba(0, 0, 0, 0.04),
         0 0 ${highlight ? '15px' : '5px'} rgba(var(--primary), ${highlight ? '0.35' : '0.1'})`
      : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
  };

  return (
    <div
      ref={cardRef}
      className={cn("bg-card rounded-lg border border-border overflow-hidden transition-all", className)}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default AnimatedCard;
