interface OddRitualNavLinksProps {
  items: { label: string; href: string }[];
  activeItem: string;
  activeIndex: number | null;
  hoveredItem: string | null;
  onHoverItem: (item: string | null) => void;
  onHoverIndex: (index: number | null) => void;
  setItemRef: (index: number, el: HTMLAnchorElement | null) => void;
  onItemClick?: (href: string) => void;
}

export function OddRitualNavLinks({
  items,
  activeItem,
  activeIndex,
  hoveredItem,
  onHoverItem,
  onHoverIndex,
  setItemRef,
  onItemClick,
}: OddRitualNavLinksProps) {
  return (
    <nav aria-label="Odd Ritual navigation">
      <ul className="space-y-5 md:space-y-6">
        {items.map((item, index) => {
          const isActive = item.label === activeItem;
          const isDimmed =
            (hoveredItem !== null && hoveredItem !== item.label) ||
            (activeIndex !== null && activeIndex !== index);

          return (
            <li key={item.label}>
              <a
                ref={(el) => setItemRef(index, el)}
                href={item.href}
                onMouseEnter={() => {
                  onHoverItem(item.label);
                  onHoverIndex(index);
                }}
                onFocus={() => {
                  onHoverItem(item.label);
                  onHoverIndex(index);
                }}
                onMouseLeave={() => {
                  onHoverItem(null);
                  onHoverIndex(null);
                }}
                onBlur={() => {
                  onHoverItem(null);
                  onHoverIndex(null);
                }}
                onClick={(event) => {
                  event.preventDefault();
                  onItemClick?.(item.href);
                }}
                className={[
                  'inline-flex min-h-11 items-center py-2 font-sans text-[0.95rem] leading-none tracking-[0.08em] text-foreground transition-opacity duration-200 md:text-[1.05rem]',
                  isActive ? 'font-semibold' : 'font-medium',
                  isDimmed ? 'opacity-40' : 'opacity-100',
                ].join(' ')}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
