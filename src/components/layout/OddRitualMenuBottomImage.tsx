import SocialTooltip from '@/components/ui/social-tooltip';

interface OddRitualMenuBottomImageProps {
  imageSrc: string;
  locationText: string;
}

export function OddRitualMenuBottomImage({ imageSrc, locationText }: OddRitualMenuBottomImageProps) {
  return (
    <section className="space-y-3 border-t border-foreground/15 pt-5 md:pt-6">
      <div className="flex items-end justify-between">
        <p className="type-eyebrow">Join the fam</p>
        <a
          href="https://www.instagram.com/1hidalgo7/"
          target="_blank"
          rel="noopener noreferrer"
          className="type-ui uppercase tracking-[0.14em] text-foreground/75 transition-opacity hover:opacity-100"
        >
          Instagram
        </a>
      </div>
      <div className="relative h-32 w-full overflow-hidden border border-foreground/20 sm:h-36 md:h-40 lg:h-48">
        <img
          src={imageSrc}
          alt="Odd Ritual editorial visual"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/55 to-transparent px-3 pb-3 pt-8 sm:px-4 md:px-5">
          <div className="scale-75 origin-bottom-left sm:scale-90 md:scale-100">
            <SocialTooltip />
          </div>
          <p className="type-meta tracking-[0.06em] text-white/95 sm:text-xs md:text-sm">
            {locationText}
          </p>
        </div>
      </div>
    </section>
  );
}
