"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

export default function DraggableWhatsApp() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStarted, setDragStarted] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const activePointerIdRef = useRef<number | null>(null);
  const lastPointerDownTimeRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const initialX = Math.max(window.innerWidth - 96, 12);
      const initialY = Math.max(window.innerHeight - 112, 12);
      setPosition({ x: initialX, y: initialY });
      setInitialPosition({ x: initialX, y: initialY });
    }
  }, []);

  const updatePosition = useCallback((clientX: number, clientY: number) => {
    const newX = clientX - dragOffsetRef.current.x;
    const newY = clientY - dragOffsetRef.current.y;

    const boundedX = Math.max(0, Math.min(newX, window.innerWidth - 80));
    const boundedY = Math.max(0, Math.min(newY, window.innerHeight - 80));

    setPosition({ x: boundedX, y: boundedY });
  }, []);

  const getSnappedPosition = useCallback((current: { x: number; y: number }) => {
    const edgeX = current.x + 40 <= window.innerWidth / 2 ? 12 : window.innerWidth - 92;
    const edgeY = Math.max(12, Math.min(current.y, window.innerHeight - 92));
    return { x: edgeX, y: edgeY };
  }, []);

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      if (!isDragging || activePointerIdRef.current !== event.pointerId) return;

      event.preventDefault();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        updatePosition(event.clientX, event.clientY);
      });
    },
    [isDragging, updatePosition]
  );

  const stopDragging = useCallback(
    (snapBack = false) => {
      if (!isDragging) return;
      setIsDragging(false);
      activePointerIdRef.current = null;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (snapBack) {
        setPosition(initialPosition);
      } else {
        setPosition((current) => getSnappedPosition(current));
      }
    },
    [isDragging, initialPosition, getSnappedPosition]
  );

  const handlePointerUp = useCallback(
    (event: PointerEvent) => {
      if (activePointerIdRef.current !== event.pointerId) return;
      stopDragging();
    },
    [stopDragging]
  );

  const handlePointerCancel = useCallback(() => {
    stopDragging(true);
  }, [stopDragging]);

  const handleWindowBlur = useCallback(() => {
    stopDragging(true);
  }, [stopDragging]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
      window.addEventListener("pointercancel", handlePointerCancel);
      window.addEventListener("blur", handleWindowBlur);

      return () => {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
        window.removeEventListener("pointercancel", handlePointerCancel);
        window.removeEventListener("blur", handleWindowBlur);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }
  }, [handlePointerMove, handlePointerUp, handlePointerCancel, handleWindowBlur]);

  const handlePointerDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (!elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const now = Date.now();
    const delta = now - lastPointerDownTimeRef.current;
    lastPointerDownTimeRef.current = now;

    if (delta < 300) {
      event.preventDefault();
      setIsDragging(true);
      activePointerIdRef.current = event.pointerId;
      dragOffsetRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
      setDragStarted(false);
      elementRef.current.setPointerCapture(event.pointerId);
    }
  }, []);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (dragStarted) {
        event.preventDefault();
        event.stopPropagation();
      }
    },
    [dragStarted]
  );

  const handleDragMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || activePointerIdRef.current !== event.pointerId) return;
    setDragStarted(true);
    event.preventDefault();
    updatePosition(event.clientX, event.clientY);
  }, [isDragging, updatePosition]);

  const handlePointerLeave = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || activePointerIdRef.current !== event.pointerId) return;
    if (event.clientX < 0 || event.clientY < 0 || event.clientX > window.innerWidth || event.clientY > window.innerHeight) {
      stopDragging(true);
    }
  }, [isDragging, stopDragging]);

  return (
    <div
      ref={elementRef}
      className={`fixed z-50 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transition: isDragging ? "none" : "all 0.25s ease-out",
        touchAction: "none",
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handleDragMove}
      onPointerUp={() => stopDragging(false)}
      onPointerCancel={() => stopDragging(true)}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
    >
      <Link
        href="https://wa.link/a0m76f"
        target="_blank"
        rel="noopener noreferrer"
        onClick={(event) => {
          if (isDragging) {
            event.preventDefault();
          }
        }}
        className={`flex items-center justify-center w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-lg group pointer-events-auto transition-all ${isDragging ? "scale-110" : "hover:scale-110"}`}
        title={isDragging ? "Release to stop" : "Double-tap/click to drag"}
      >
        <Image src="/assets/whatsapp-logo.png" alt="whatsapp" width={32} height={32} />
      </Link>
      <div className="absolute bottom-full right-0 mb-2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {isDragging ? "Release to stop" : "Double-tap/click to drag"}
      </div>
    </div>
  );
}
