import React, { useRef, useState, useEffect, ReactNode } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'motion/react';

export interface BendProps {
  children: ReactNode;
  className?: string;
  intensity?: number; // 0 to 1
  maxAngle?: number; // degrees (e.g. 24)
  perspective?: number; // px (e.g. 1000)
  direction?: 'both' | 'horizontal' | 'vertical';
  interactive?: boolean;
  ambientFloat?: boolean;
  showSheen?: boolean;
  bendRadius?: number;
  id?: string;
  key?: React.Key;
}

export function Bend({
  children,
  className = '',
  intensity = 0.85,
  maxAngle = 22,
  perspective = 1100,
  direction = 'both',
  interactive = true,
  ambientFloat = false,
  showSheen = true,
  bendRadius = 40,
  id,
}: BendProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for smooth physical mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for buttery smooth damping and natural inertia
  const springConfig = { damping: 22, stiffness: 140, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Derive 3D rotation angles
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [
    direction === 'horizontal' ? 0 : maxAngle * intensity,
    direction === 'horizontal' ? 0 : -maxAngle * intensity
  ]);
  
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [
    direction === 'vertical' ? 0 : -maxAngle * intensity,
    direction === 'vertical' ? 0 : maxAngle * intensity
  ]);

  // Dynamic light reflection sheen coordinate
  const sheenX = useTransform(smoothX, [-0.5, 0.5], ['10%', '90%']);
  const sheenY = useTransform(smoothY, [-0.5, 0.5], ['10%', '90%']);
  const sheenOpacity = useTransform(smoothX, [-0.5, 0, 0.5], [0.35, 0.15, 0.35]);

  // Subtle curvature offset
  const translateZ = useTransform(smoothX, [-0.5, 0, 0.5], [14, 0, 14]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Touch support for mobile devices
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!interactive || !containerRef.current || !e.touches[0]) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = Math.max(-0.5, Math.min(0.5, (touch.clientX - rect.left) / rect.width - 0.5));
    const y = Math.max(-0.5, Math.min(0.5, (touch.clientY - rect.top) / rect.height - 0.5));
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleTouchEnd = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      id={id}
      className={`relative inline-block ${className}`}
      style={{
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <motion.div
        className="relative preserve-3d will-change-transform"
        style={{
          rotateX,
          rotateY,
          z: translateZ,
          transformStyle: 'preserve-3d',
        }}
        animate={
          ambientFloat && !isHovered
            ? {
                rotateZ: [0, 0.4, -0.4, 0],
                y: [0, -6, 0],
              }
            : {}
        }
        transition={{
          repeat: Infinity,
          duration: 7,
          ease: 'easeInOut',
        }}
      >
        {children}

        {/* Dynamic Specular Light Sheen */}
        {showSheen && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden mix-blend-overlay z-20"
            style={{
              opacity: sheenOpacity,
              background: `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0) 65%)`,
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
