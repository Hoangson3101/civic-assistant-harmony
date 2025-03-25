import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  tiltMaxAngle?: number;
  scale?: number;
  perspective?: number;
  transitionSpeed?: number;
  tiltReverse?: boolean;
  glareOpacity?: number;
  glareColor?: string;
  glarePosition?: string;
  glareMaxOpacity?: number;
  children: React.ReactNode;
}

export const TiltCard = ({
  children,
  className,
  tiltMaxAngle = 15,
  scale = 1.05,
  perspective = 1000,
  transitionSpeed = 400,
  tiltReverse = false,
  glareOpacity = 0.2,
  glareColor = "255, 255, 255",
  glarePosition = "all",
  glareMaxOpacity = 0.5,
  ...props
}: TiltCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  
  // State để lưu trữ các góc nghiêng
  const [tiltAngles, setTiltAngles] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [glareStyles, setGlareStyles] = useState({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Tính toán tọa độ chuột tương đối trong thẻ (từ -1 đến 1)
    const x = (e.clientX - rect.left) / rect.width * 2 - 1;
    const y = (e.clientY - rect.top) / rect.height * 2 - 1;
    
    // Đảo ngược góc nghiêng nếu tiltReverse = true
    const tiltX = tiltReverse ? y * tiltMaxAngle : -y * tiltMaxAngle;
    const tiltY = tiltReverse ? -x * tiltMaxAngle : x * tiltMaxAngle;
    
    setTiltAngles({ x: tiltX, y: tiltY });
    
    // Xử lý hiệu ứng glare
    if (glareRef.current) {
      // Di chuyển glare theo hướng chuột
      const glareX = x * 100;
      const glareY = y * 100;
      
      // Tính toán độ trong suốt của glare dựa trên vị trí chuột
      const glarePositionValue = 
        glarePosition === "all" 
          ? Math.sqrt(x * x + y * y) 
          : glarePosition === "horizontal" 
            ? Math.abs(x) 
            : Math.abs(y);
      
      const opacity = glareOpacity + glarePositionValue * (glareMaxOpacity - glareOpacity);
      
      setGlareStyles({
        background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgb(${glareColor}, ${opacity}) 0%, rgb(${glareColor}, 0) 80%)`,
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTiltAngles({ x: 0, y: 0 });
  };

  const tiltStyle = {
    transform: isHovered
      ? `perspective(${perspective}px) rotateX(${tiltAngles.x}deg) rotateY(${tiltAngles.y}deg) scale3d(${scale}, ${scale}, ${scale})`
      : `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
    transition: `transform ${transitionSpeed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
    transformStyle: "preserve-3d" as const,
  };

  return (
    <div
      ref={cardRef}
      className={cn("relative overflow-hidden", className)}
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
      <div 
        ref={glareRef}
        className="absolute inset-0 pointer-events-none z-10"
        style={glareStyles}
      />
    </div>
  );
};

export default TiltCard; 