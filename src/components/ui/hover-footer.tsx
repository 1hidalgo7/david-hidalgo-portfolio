'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

export const TextHoverEffect = ({
  text,
  duration,
  className,
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
  className?: string;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: '50%', cy: '50%' });

  useEffect(() => {
    if (svgRef.current) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={cn('select-none uppercase cursor-pointer', className)}
    >
      <defs>
        <linearGradient id="textGradient" gradientUnits="userSpaceOnUse" cx="50%" cy="50%" r="25%">
          {hovered && (
            <>
              <stop offset="0%" stopColor="#d6a94b" />
              <stop offset="25%" stopColor="#c2902d" />
              <stop offset="50%" stopColor="#8d6a2b" />
              <stop offset="75%" stopColor="#d4d0c8" />
              <stop offset="100%" stopColor="#d6a94b" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: '50%', cy: '50%' }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: 'easeOut' }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#revealMask)" />
        </mask>
      </defs>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="stardom-svg-text fill-transparent stroke-[#d8d2c7] text-7xl font-normal"
        style={{ opacity: hovered ? 0.7 : 0 }}
      >
        {text}
      </text>
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="stardom-svg-text fill-transparent stroke-[#d6a94b] text-7xl font-normal"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 4,
          ease: 'easeInOut',
        }}
      >
        {text}
      </motion.text>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.3"
        mask="url(#textMask)"
        className="stardom-svg-text fill-transparent text-7xl font-normal"
      >
        {text}
      </text>
    </svg>
  );
};

export const FooterBackgroundGradient = () => {
  return (
    <div
      className="absolute inset-0 z-0"
      style={{
        background: 'radial-gradient(125% 125% at 50% 10%, #0E0E0E4D 45%, #D6A94B33 100%)',
      }}
    />
  );
};

function HoverFooter() {
  const aboutLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Formación Académica', href: '#formacion-academica' },
    { label: 'Experiencia Laboral', href: '#experiencia-laboral' },
    {
      label: 'Inteligencia Artificial y Desarrollo',
      href: '#inteligencia-artificial-desarrollo',
    },
  ];

  const contactInfo = [
    {
      icon: <Mail size={18} className="text-accent" />,
      text: '1hidalgo7ortiz@gmail.com',
      href: 'mailto:1hidalgo7ortiz@gmail.com',
    },
    {
      icon: <Phone size={18} className="text-accent" />,
      text: '+34 696 277 107',
      href: 'tel:+34696277107',
    },
    {
      icon: <MapPin size={18} className="text-accent" />,
      text: 'Benetússer, Valencia',
      href: 'https://www.google.com/maps/search/?api=1&query=Benet%C3%BAsser%2C+Valencia',
    },
  ];

  return (
    <footer
      id="contacto"
      className="relative m-6 h-fit overflow-hidden rounded-3xl border border-border bg-primary/92 text-primary-foreground md:m-8"
    >
      <div className="max-w-7xl mx-auto p-8 md:p-12 lg:p-14 z-40 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-20 pb-12">
          <div className="flex flex-col space-y-5">
            <img
              src="https://res.cloudinary.com/dpr1qh8kr/image/upload/v1776938851/ChatGPT_Image_23_abr_2026_12_07_22_wqxtyv.png"
              alt="D.Hidalgo logo"
              loading="lazy"
              decoding="async"
              className="h-24 w-auto object-contain md:h-28 lg:h-32"
            />
            <p className="type-body max-w-xl text-primary-foreground/86">
              Perfil orientado a inteligencia artificial, automatización y desarrollo digital, con 24
              años y enfoque práctico en productos reales.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div>
              <h3 className="type-section-title mb-5 text-[clamp(1.8rem,5vw,2.4rem)] text-primary-foreground">
                Sobre mí
              </h3>
              <ul className="space-y-3">
                {aboutLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="type-ui rounded-sm text-primary-foreground/90 transition-colors hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="type-section-title mb-5 text-[clamp(1.8rem,5vw,2.4rem)] text-primary-foreground">
                Contáctame
              </h3>
              <ul className="space-y-4">
                {contactInfo.map((item) => (
                  <li key={item.text} className="flex items-center space-x-3">
                    {item.icon}
                    <a
                      href={item.href}
                      target={item.text.includes('Benetússer') ? '_blank' : undefined}
                      rel={item.text.includes('Benetússer') ? 'noopener noreferrer' : undefined}
                      className="type-ui rounded-sm text-primary-foreground/90 transition-colors hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-8 border-t border-primary-foreground/35" />

        <div className="flex items-center justify-center md:justify-start">
          <p className="type-meta text-center text-primary-foreground/75 md:text-left">
            &copy; 2026 D.HIDALGO, all rights reserved.
          </p>
        </div>
      </div>

      <div className="lg:flex hidden h-[30rem] -mt-52 -mb-36">
        <TextHoverEffect text="DAVID" className="z-50" />
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}

export default HoverFooter;
