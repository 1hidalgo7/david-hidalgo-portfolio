'use client';

import * as React from 'react';
import { MotionConfig, motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TextStaggerHoverProps {
  text: string;
  index: number;
}

interface HoverSliderImageProps {
  index: number;
  imageUrl: string;
}

interface HoverSliderContextValue {
  activeSlide: number;
  changeSlide: (index: number) => void;
}

export interface AnimatedSlideshowItem {
  title: string;
  imageUrl: string;
}

interface AnimatedSlideshowProps {
  eyebrow?: string;
  title?: string;
  items: AnimatedSlideshowItem[];
  className?: string;
}

function splitText(text: string) {
  const words = text.split(' ').map((word) => word.concat(' '));
  const characters = words.map((word) => word.split('')).flat(1);

  return { words, characters };
}

const HoverSliderContext = React.createContext<HoverSliderContextValue | undefined>(undefined);

function useHoverSliderContext() {
  const context = React.useContext(HoverSliderContext);
  if (context === undefined) {
    throw new Error('useHoverSliderContext must be used within a HoverSlider provider');
  }
  return context;
}

export const HoverSlider = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ children, className, ...props }, ref) => {
    const [activeSlide, setActiveSlide] = React.useState<number>(0);
    const changeSlide = React.useCallback((index: number) => setActiveSlide(index), []);

    return (
      <HoverSliderContext.Provider value={{ activeSlide, changeSlide }}>
        <section ref={ref} className={className} {...props}>
          {children}
        </section>
      </HoverSliderContext.Provider>
    );
  },
);
HoverSlider.displayName = 'HoverSlider';

export const TextStaggerHover = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & TextStaggerHoverProps
>(({ text, index, className, ...props }, ref) => {
  const { activeSlide, changeSlide } = useHoverSliderContext();
  const { characters } = splitText(text);
  const isActive = activeSlide === index;

  return (
    <span
      className={cn('relative inline-block origin-bottom overflow-hidden', className)}
      {...props}
      ref={ref}
      onMouseEnter={() => changeSlide(index)}
      onFocus={() => changeSlide(index)}
      tabIndex={0}
      role="button"
      aria-label={text}
    >
      {characters.map((char, charIndex) => (
        <span key={`${char}-${charIndex}`} className="relative inline-block overflow-hidden">
          <MotionConfig
            transition={{
              delay: charIndex * 0.025,
              duration: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <motion.span
              className="inline-block opacity-25"
              initial={{ y: '0%' }}
              animate={isActive ? { y: '-110%' } : { y: '0%' }}
            >
              {char}
              {char === ' ' && charIndex < characters.length - 1 && <>&nbsp;</>}
            </motion.span>
            <motion.span
              className="absolute left-0 top-0 inline-block opacity-100"
              initial={{ y: '110%' }}
              animate={isActive ? { y: '0%' } : { y: '110%' }}
            >
              {char}
            </motion.span>
          </MotionConfig>
        </span>
      ))}
    </span>
  );
});
TextStaggerHover.displayName = 'TextStaggerHover';

const clipPathVariants = {
  visible: { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
  hidden: { clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' },
};

export const HoverSliderImageWrap = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'grid overflow-hidden [&>*]:col-start-1 [&>*]:col-end-1 [&>*]:row-start-1 [&>*]:row-end-1 [&>*]:size-full',
        className,
      )}
      {...props}
    />
  );
});
HoverSliderImageWrap.displayName = 'HoverSliderImageWrap';

export const HoverSliderImage = React.forwardRef<
  HTMLImageElement,
  HTMLMotionProps<'img'> & HoverSliderImageProps
>(({ index, imageUrl, className, ...props }, ref) => {
  const { activeSlide } = useHoverSliderContext();

  return (
    <motion.img
      src={imageUrl}
      className={cn('inline-block h-full w-full align-middle object-cover', className)}
      transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.8 }}
      variants={clipPathVariants}
      animate={activeSlide === index ? 'visible' : 'hidden'}
      ref={ref}
      {...props}
    />
  );
});
HoverSliderImage.displayName = 'HoverSliderImage';

export function AnimatedSlideshow({
  eyebrow = 'Siguiente apartado',
  title = 'Experiencias destacadas',
  items,
  className,
}: AnimatedSlideshowProps) {
  return (
    <HoverSlider className={cn('bg-white px-6 py-20 md:px-10', className)}>
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 md:grid-cols-12 md:items-start">
        <div className="space-y-4 md:col-span-5">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-zinc-500">{eyebrow}</p>
          <h2 className="text-3xl font-semibold text-zinc-900 md:text-5xl">{title}</h2>
          <div className="mt-8 flex flex-col gap-2 text-2xl font-medium leading-tight text-zinc-900 md:text-4xl">
            {items.map((item, index) => (
              <TextStaggerHover key={`${item.title}-${index}`} text={item.title} index={index} />
            ))}
          </div>
        </div>

        <HoverSliderImageWrap className="relative aspect-[4/3] w-full rounded-2xl md:col-span-7">
          {items.map((item, index) => (
            <HoverSliderImage
              key={`${item.imageUrl}-${index}`}
              index={index}
              imageUrl={item.imageUrl}
              alt={item.title}
            />
          ))}
        </HoverSliderImageWrap>
      </div>
    </HoverSlider>
  );
}
