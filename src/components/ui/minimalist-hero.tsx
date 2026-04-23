import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import SocialTooltip from '@/components/ui/social-tooltip';
import { OddRitualNavSystem } from '@/components/layout/OddRitualNavSystem';

interface MinimalistHeroProps {
  logoText: React.ReactNode;
  navLinks?: { label: string; href: string }[];
  mainText: string;
  readMoreLink: string;
  readMoreLabel?: string;
  imageSrc: string;
  imageAlt: string;
  overlayText: {
    part1: string;
    part2: string;
  };
  locationText: string;
  className?: string;
}

export const MinimalistHero = ({
  logoText,
  mainText,
  readMoreLink,
  readMoreLabel = 'Sobre mí',
  imageSrc,
  imageAlt,
  overlayText,
  locationText,
  className,
}: MinimalistHeroProps) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div
      className={cn(
        'relative flex h-screen w-full flex-col items-center justify-between overflow-hidden bg-background p-8 font-sans md:p-12',
        className
      )}
    >
      <OddRitualNavSystem logo={logoText} locationText={locationText} onMenuStateChange={setIsMenuOpen} />

      <div className="relative grid w-full max-w-7xl flex-grow grid-cols-1 items-center md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="z-20 order-2 text-center md:order-1 md:text-left"
        >
          <p className="type-lead mx-auto max-w-md md:mx-0">
            {mainText}
          </p>
          <a
            href={readMoreLink}
            className="type-ui mt-5 inline-block text-foreground underline decoration-from-font underline-offset-4"
          >
            {readMoreLabel}
          </a>
        </motion.div>

        <div className="relative order-1 flex h-full items-center justify-center md:order-2">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="absolute z-0 h-[300px] w-[300px] rounded-full bg-yellow-400/90 md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px]"
          />
          <motion.img
            src={imageSrc}
            alt={imageAlt}
            className="relative z-10 h-auto w-72 scale-[2.05] object-cover md:w-[26rem] lg:w-[32rem]"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = 'https://placehold.co/400x600/eab308/ffffff?text=Image+Not+Found';
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="z-20 order-3 flex items-center justify-center text-center md:justify-start"
        >
          <h1 className="type-hero-display text-foreground">
            {overlayText.part1}
            <br />
            {overlayText.part2}
          </h1>
        </motion.div>
      </div>

      <footer className={cn('z-30 flex w-full max-w-7xl items-center justify-between transition-opacity duration-200', isMenuOpen ? 'pointer-events-none opacity-0' : 'opacity-100')}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex items-center"
        >
          <SocialTooltip />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="type-meta text-foreground/75"
        >
          {locationText}
        </motion.div>
      </footer>
    </div>
  );
};
