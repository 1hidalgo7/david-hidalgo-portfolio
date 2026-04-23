'use client';

import { useEffect, useRef, useState } from 'react';
import { BrainCircuit, Clapperboard, Globe, Sparkles, Workflow } from 'lucide-react';
import type { ReactNode } from 'react';

interface VideoOption {
  title: string;
  description: string;
  video: string;
  icon: ReactNode;
}

const options: VideoOption[] = [
  {
    title: 'Vibe Coding',
    description: 'Desarrollo asistido por IA enfocado en velocidad y ejecución real.',
    video:
      'https://res.cloudinary.com/dpr1qh8kr/video/upload/v1776897022/gRABACI%C3%93N_cursor_ynb1df.mp4',
    icon: <Sparkles className="h-5 w-5 text-white" />,
  },
  {
    title: 'Automatización de flujos',
    description: 'Optimización de procesos mediante sistemas automatizados conectados.',
    video: 'https://res.cloudinary.com/dpr1qh8kr/video/upload/v1776897421/N8N_VIDEO_y2t75y.mp4',
    icon: <Workflow className="h-5 w-5 text-white" />,
  },
  {
    title: 'Apps y webs funcionales',
    description: 'Desarrollo de productos digitales completos y operativos.',
    video: 'https://res.cloudinary.com/dpr1qh8kr/video/upload/v1776897817/vIDEO_lANDO_WEB_xriqos.mp4',
    icon: <Globe className="h-5 w-5 text-white" />,
  },
  {
    title: 'Modelos de lenguaje (LLMs)',
    description: 'Uso avanzado de IA para generación, análisis y automatización.',
    video: 'https://res.cloudinary.com/dpr1qh8kr/video/upload/v1776897662/cLAUDE_VIDEO_iv2pro.mp4',
    icon: <BrainCircuit className="h-5 w-5 text-white" />,
  },
  {
    title: 'Contenido visual y audiovisual',
    description: 'Producción de imágenes y vídeo mediante inteligencia artificial.',
    video: 'https://res.cloudinary.com/dpr1qh8kr/video/upload/v1776897745/vIDEO_CONTENIDO_nozr1w.mp4',
    icon: <Clapperboard className="h-5 w-5 text-white" />,
  },
];

export function AboutTransitionSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  useEffect(() => {
    const timers = options.map((_, i) =>
      window.setTimeout(() => {
        setAnimatedOptions((prev) => (prev.includes(i) ? prev : [...prev, i]));
      }, 160 * i)
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === activeIndex) {
        void video.play().catch(() => {
          // Ignore autoplay errors from browser policies.
        });
      } else {
        video.pause();
      }
    });
  }, [activeIndex]);

  return (
    <section className="bg-transparent py-16 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="type-section-title text-foreground">
            INTELIGENCIA ARTIFICIAL Y DESARROLLO
          </h2>
          <p className="type-lead mt-4 text-foreground/75">
            Me especializo en LLMs, automatización de flujos, desarrollo de apps y webs, y
            creación de contenido digital.
          </p>
        </div>

        <div className="flex h-[420px] w-full min-h-[360px] overflow-hidden rounded-2xl border border-border bg-black">
          {options.map((option, index) => {
            const isActive = activeIndex === index;
            const isAnimated = animatedOptions.includes(index);

            return (
              <button
                type="button"
                key={option.title}
                onClick={() => setActiveIndex(index)}
                className="group relative flex h-full min-w-[56px] flex-1 cursor-pointer items-end overflow-hidden border-r border-white/10 text-left transition-[flex] duration-700 ease-in-out last:border-r-0"
                style={{
                  flex: isActive ? '7 1 0%' : '1 1 0%',
                  opacity: isAnimated ? 1 : 0,
                  transform: isAnimated ? 'translateX(0)' : 'translateX(-42px)',
                }}
              >
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  className="absolute inset-0 h-full w-full object-cover"
                  src={option.video}
                  preload="metadata"
                  autoPlay={isActive}
                  muted
                  loop
                  playsInline
                />

                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 transition-opacity duration-500"
                  style={{ opacity: isActive ? 0.95 : 0.72 }}
                />

                <div className="relative z-10 flex w-full items-center gap-3 px-3 pb-5 md:px-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-black/45 backdrop-blur-sm">
                    {option.icon}
                  </div>

                  <div className="min-w-0">
                    <p
                      className="font-sans text-base font-semibold tracking-[-0.01em] text-white transition-all duration-500 md:text-lg"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? 'translateX(0)' : 'translateX(24px)',
                      }}
                    >
                      {option.title}
                    </p>
                    <p
                      className="mt-0.5 max-w-sm font-sans text-sm leading-relaxed tracking-[-0.004em] text-white/80 transition-all duration-500"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? 'translateX(0)' : 'translateX(24px)',
                      }}
                    >
                      {option.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
