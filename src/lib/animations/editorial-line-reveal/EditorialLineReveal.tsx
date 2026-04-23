"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import "./editorial-line-reveal.css";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

type LinkItem = {
  label: string;
  href: string;
};

export interface EditorialLineRevealProps {
  eyebrow?: string;
  text: string;
  wipeColor?: string;
  sectionClassName?: string;
  containerClassName?: string;
  textClassName?: string;
  start?: string;
  once?: boolean;
  reducedMotionBypass?: boolean;
  footerLinks?: LinkItem[];
}

export function EditorialLineReveal({
  eyebrow = "Editorial Reveal",
  text,
  wipeColor = "#c7ff3d",
  sectionClassName = "",
  containerClassName = "",
  textClassName = "",
  start = "top 72%",
  once = true,
  reducedMotionBypass = false,
  footerLinks = [],
}: EditorialLineRevealProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const textElement = textRef.current;
      if (!section || !textElement) return;

      const prefersReducedMotion =
        !reducedMotionBypass &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      let split: SplitText | null = null;
      let trigger: ScrollTrigger | null = null;
      const masks: HTMLDivElement[] = [];
      const wipes: HTMLDivElement[] = [];

      if (prefersReducedMotion) {
        gsap.set(textElement, { autoAlpha: 1, yPercent: 0 });
        return;
      }

      split = SplitText.create(textElement, {
        type: "lines,words",
        linesClass: "elr-line",
        wordsClass: "elr-word",
      });

      const lines = split.lines as HTMLElement[];
      if (lines.length === 0) return;

      lines.forEach((line) => {
        const mask = document.createElement("div");
        mask.className = "elr-line-mask";
        line.parentNode?.insertBefore(mask, line);
        mask.appendChild(line);
        masks.push(mask);

        const wipe = document.createElement("div");
        wipe.className = "elr-line-wipe";
        wipe.style.backgroundColor = wipeColor;
        mask.appendChild(wipe);
        wipes.push(wipe);
      });

      gsap.set(lines, {
        yPercent: 132,
        autoAlpha: 0.22,
        willChange: "transform, opacity",
      });
      gsap.set(wipes, { xPercent: -112, autoAlpha: 1 });

      const timeline = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out", overwrite: "auto" },
      });

      let cursor = 0;
      const baseRevealDur = 0.76;
      const baseWipeInDur = 0.31;
      const baseWipeOutDur = 0.42;

      lines.forEach((line, i) => {
        const wipe = wipes[i];
        if (!wipe) return;

        const revealDur = Math.max(0.62, baseRevealDur - i * 0.035);
        const wipeInDur = Math.max(0.24, baseWipeInDur - i * 0.012);
        const wipeOutDur = Math.max(0.33, baseWipeOutDur - i * 0.018);
        const lineStart = i === 0 ? 0 : cursor - 0.14;

        timeline
          .fromTo(
            wipe,
            { xPercent: -112, autoAlpha: 1 },
            { xPercent: 10, duration: wipeInDur, ease: "power2.out" },
            lineStart,
          )
          .to(
            line,
            {
              yPercent: 0,
              autoAlpha: 1,
              duration: revealDur,
              ease: "power3.out",
            },
            lineStart + 0.055,
          )
          .to(
            wipe,
            { xPercent: 112, duration: wipeOutDur, ease: "power2.in" },
            lineStart + 0.205,
          )
          .to(
            wipe,
            { autoAlpha: 0, duration: 0.04, ease: "none" },
            lineStart + wipeInDur + wipeOutDur - 0.06,
          );

        const nextWipe = wipes[i + 1];
        if (nextWipe) {
          timeline.fromTo(
            nextWipe,
            { xPercent: -112, autoAlpha: 1 },
            { xPercent: -34, duration: 0.16, ease: "none" },
            lineStart + 0.23,
          );
        }

        cursor = lineStart + 0.39;
      });

      trigger = ScrollTrigger.create({
        trigger: section,
        start,
        once,
        onEnter: () => timeline.play(0),
      });

      return () => {
        trigger?.kill();
        timeline.kill();
        split?.revert();
        wipes.forEach((wipe) => wipe.remove());
        masks.forEach((mask) => mask.remove());
      };
    },
    {
      scope: sectionRef,
      dependencies: [wipeColor, start, once, reducedMotionBypass],
    },
  );

  return (
    <section ref={sectionRef} className={`elr-section ${sectionClassName}`.trim()}>
      <div className={`elr-container ${containerClassName}`.trim()}>
        <p className="elr-eyebrow">{eyebrow}</p>
        <p ref={textRef} className={`elr-text ${textClassName}`.trim()}>
          {text}
        </p>

        {footerLinks.length > 0 && (
          <div className="elr-links" aria-label="Editorial links">
            {footerLinks.map((item) => (
              <a key={`${item.label}-${item.href}`} href={item.href} className="elr-link">
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
