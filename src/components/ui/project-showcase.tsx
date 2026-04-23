'use client';

import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

export interface ProjectShowcaseItem {
  title: string;
  description: string;
  year: string;
  link: string;
  image: string;
}

interface ProjectShowcaseProps {
  heading?: string;
  projects: ProjectShowcaseItem[];
}

export function ProjectShowcase({ heading = 'Selected Work', projects }: ProjectShowcaseProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });
  const [containerOffset, setContainerOffset] = useState({ left: 0, top: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const animate = () => {
      setSmoothPosition((prev) => ({
        x: lerp(prev.x, mousePositionRef.current.x, 0.15),
        y: lerp(prev.y, mousePositionRef.current.y, 0.15),
      }));
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const updateContainerOffset = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setContainerOffset({ left: rect.left, top: rect.top });
    };

    updateContainerOffset();
    window.addEventListener('resize', updateContainerOffset);

    return () => {
      window.removeEventListener('resize', updateContainerOffset);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setContainerOffset({ left: rect.left, top: rect.top });
    mousePositionRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setIsVisible(false);
  };

  return (
    <section className="bg-transparent">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative mx-auto w-full max-w-4xl px-6 py-16"
      >
        <h2 className="type-section-title mb-10 text-foreground">
          {heading}
        </h2>

        <div
          className="pointer-events-none fixed z-50 overflow-hidden rounded-xl shadow-2xl"
          style={{
            left: containerOffset.left,
            top: containerOffset.top,
            transform: `translate3d(${smoothPosition.x + 20}px, ${smoothPosition.y - 100}px, 0)`,
            opacity: isVisible ? 1 : 0,
            scale: isVisible ? 1 : 0.8,
            transition:
              'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), scale 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <div className="relative h-[180px] w-[280px] overflow-hidden rounded-xl bg-secondary">
            {projects.map((project, index) => (
              <img
                key={project.title}
                src={project.image || '/placeholder.svg'}
                alt={project.title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-out"
                style={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  scale: hoveredIndex === index ? 1 : 1.1,
                  filter: hoveredIndex === index ? 'none' : 'blur(10px)',
                }}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
          </div>
        </div>

        <div className="space-y-0">
          {projects.map((project, index) => (
            <a
              key={project.title}
              href={project.link}
              className="group block"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative border-t border-border py-5 transition-all duration-300 ease-out">
                <div
                  className={`absolute inset-0 -mx-4 rounded-lg bg-secondary/50 px-4 transition-all duration-300 ease-out ${
                    hoveredIndex === index ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                  }`}
                />

                <div className="relative flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="inline-flex items-center gap-2">
                      <h3 className="font-sans text-lg font-semibold tracking-[-0.01em] text-foreground md:text-xl">
                        <span className="relative">
                          {project.title}
                          <span
                            className={`absolute -bottom-0.5 left-0 h-px bg-foreground transition-all duration-300 ease-out ${
                              hoveredIndex === index ? 'w-full' : 'w-0'
                            }`}
                          />
                        </span>
                      </h3>

                      <ArrowUpRight
                        className={`h-4 w-4 text-muted-foreground transition-all duration-300 ease-out ${
                          hoveredIndex === index
                            ? 'translate-x-0 translate-y-0 opacity-100'
                            : '-translate-x-2 translate-y-2 opacity-0'
                        }`}
                      />
                    </div>

                    <p
                      className={`type-body mt-1 transition-all duration-300 ease-out ${
                        hoveredIndex === index ? 'text-foreground/80' : 'text-muted-foreground'
                      }`}
                    >
                      {project.description}
                    </p>
                  </div>

                  <span
                    className={`type-meta tracking-[0.06em] transition-all duration-300 ease-out ${
                      hoveredIndex === index ? 'text-foreground/60' : ''
                    }`}
                  >
                    {project.year}
                  </span>
                </div>
              </div>
            </a>
          ))}

          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  );
}
