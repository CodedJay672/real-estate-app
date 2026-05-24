"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    // Only run on non-touch devices (laptops/desktops)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let requestRef: number;
    
    const onMouseMove = (e: MouseEvent) => {
      // Use requestAnimationFrame for buttery smooth performance
      cancelAnimationFrame(requestRef);
      requestRef = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
        if (isHidden) setIsHidden(false);
      });
    };

    const onMouseLeave = () => setIsHidden(true);
    const onMouseEnter = () => setIsHidden(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Expand cursor if hovering over anything clickable
      if (
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(requestRef);
    };
  }, [isHidden]);

  // Don't render anything on mobile phones
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Outer trailing circle */}
      <div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-amber-500/60 pointer-events-none z-[9999] hidden lg:block transition-all duration-150 ease-out shadow-[0_0_15px_rgba(245,158,11,0.2)]"
        style={{
          transform: `translate3d(${position.x - 16}px, ${position.y - 16}px, 0) scale(${isPointer ? 1.6 : 1})`,
          opacity: isHidden ? 0 : 1,
          backgroundColor: isPointer ? "rgba(245, 158, 11, 0.1)" : "transparent",
        }}
      />
      {/* Inner solid dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-amber-500 pointer-events-none z-[10000] hidden lg:block"
        style={{
          transform: `translate3d(${position.x - 4}px, ${position.y - 4}px, 0)`,
          opacity: isHidden ? 0 : (isPointer ? 0 : 1), // Hide inner dot when hovering over links for a hollow effect
        }}
      />
    </>
  );
}
