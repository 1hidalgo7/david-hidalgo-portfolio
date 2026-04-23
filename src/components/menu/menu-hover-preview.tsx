'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export type MenuPreviewCluster = readonly [string, string];

type MenuHoverPreviewProps = {
  clusters: readonly MenuPreviewCluster[];
  activeIndex: number | null;
};

export function MenuHoverPreview({ clusters, activeIndex }: MenuHoverPreviewProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const lastShownRef = useRef<number | null>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const clusterEls = gsap.utils.toArray<HTMLElement>(root.querySelectorAll('[data-preview-cluster]'));

      const allCards = gsap.utils.toArray<HTMLElement>(root.querySelectorAll('[data-preview-card]'));

      gsap.killTweensOf([...clusterEls, ...allCards]);

      if (!clusterEls.length) return;

      if (activeIndex === null) {
        const was = lastShownRef.current;
        lastShownRef.current = null;

        if (was === null) {
          gsap.set(clusterEls, { autoAlpha: 0 });
          return;
        }

        const prevEl = clusterEls[was];
        if (!prevEl) return;

        const prevCards = gsap.utils.toArray<HTMLElement>(prevEl.querySelectorAll('[data-preview-card]'));

        gsap
          .timeline({ defaults: { ease: 'power2.in', overwrite: 'auto' } })
          .to(
            prevCards,
            {
              autoAlpha: 0,
              y: -6,
              duration: 0.12,
              stagger: 0.025,
            },
            0
          )
          .to(
            prevEl,
            {
              autoAlpha: 0,
              y: -10,
              duration: 0.18,
            },
            0
          );

        return;
      }

      const nextIdx = activeIndex;
      const prevIdx = lastShownRef.current;

      if (prevIdx === nextIdx) return;

      const nextEl = clusterEls[nextIdx];
      if (!nextEl) return;

      const nextCards = gsap.utils.toArray<HTMLElement>(nextEl.querySelectorAll('[data-preview-card]'));

      gsap.set(nextEl, { autoAlpha: 1 });

      const tl = gsap.timeline({ defaults: { overwrite: 'auto' } });

      if (prevIdx !== null && prevIdx !== nextIdx) {
        const oldEl = clusterEls[prevIdx];

        if (oldEl) {
          const oldCards = gsap.utils.toArray<HTMLElement>(oldEl.querySelectorAll('[data-preview-card]'));

          tl.to(
            oldEl,
            {
              autoAlpha: 0,
              y: -12,
              duration: 0.18,
              ease: 'power2.in',
            },
            0
          ).to(
            oldCards,
            {
              autoAlpha: 0,
              y: -8,
              duration: 0.14,
              stagger: 0.03,
              ease: 'power2.in',
            },
            0
          );
        }
      }

      tl.fromTo(
        nextCards,
        {
          autoAlpha: 0,
          y: 20,
          scale: 0.96,
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.36,
          ease: 'power3.out',
          stagger: { each: 0.085, from: 'start' },
        },
        prevIdx !== null && prevIdx !== nextIdx ? 0.06 : 0
      );

      lastShownRef.current = nextIdx;
    },
    {
      dependencies: [activeIndex],
      scope: rootRef,
      revertOnUpdate: true,
    }
  );

  return (
    <div
      ref={rootRef}
      className="pointer-events-none relative ml-auto aspect-[5/4] w-full max-w-[21rem] overflow-visible sm:max-w-[24rem] md:max-w-[30rem] lg:max-w-[36rem]"
    >
      {clusters.map((cluster, idx) => (
        <div key={idx} data-preview-cluster className="pointer-events-none absolute inset-0 opacity-0">
          <div
            data-preview-card
            className="absolute left-[2%] top-[3%] h-[62%] w-[64%] overflow-hidden border border-white/55 bg-white/10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.55)]"
          >
            <img src={cluster[0]} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
          </div>

          <div
            data-preview-card
            className="absolute bottom-[1%] right-[1%] h-[67%] w-[70%] overflow-hidden border border-white/55 bg-white/10 shadow-[0_22px_68px_-22px_rgba(0,0,0,0.6)]"
          >
            <img src={cluster[1]} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
          </div>
        </div>
      ))}
    </div>
  );
}
