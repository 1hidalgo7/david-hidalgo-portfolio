interface OddRitualCartTriggerProps {
  count?: number;
  className?: string;
}

export function OddRitualCartTrigger({ count = 0, className = '' }: OddRitualCartTriggerProps) {
  return (
    <button
      type="button"
      className={[
        'text-[11px] uppercase tracking-[0.18em] text-foreground/85 transition-opacity duration-200 hover:opacity-100',
        className,
      ].join(' ')}
      aria-label={`Cart ${count}`}
    >
      Cart {count}
    </button>
  );
}
