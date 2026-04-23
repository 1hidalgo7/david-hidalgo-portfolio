import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { OddRitualNavLinks } from '@/components/layout/OddRitualNavLinks';
import { OddRitualMenuBottomImage } from '@/components/layout/OddRitualMenuBottomImage';
import { createMenuPanelTimeline } from '@/lib/gsap/menu-panel-timeline';
import { MenuHoverPreview, type MenuPreviewCluster } from '@/components/menu/menu-hover-preview';

gsap.registerPlugin(useGSAP);

interface OddRitualNavSystemProps {
  logo: React.ReactNode;
  locationText: string;
  onMenuStateChange?: (isOpen: boolean) => void;
}

const NAV_ITEMS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Formación Académica', href: '#formacion-academica' },
  { label: 'Experiencia Laboral', href: '#experiencia-laboral' },
  { label: 'Ponte en Contacto', href: '#contacto' },
];
const MENU_BOTTOM_IMAGE =
  'https://res.cloudinary.com/dpr1qh8kr/image/upload/v1776940391/ciuda_de_Ciencias_fxukwu.webp';
const MENU_PREVIEW_CLUSTERS: readonly MenuPreviewCluster[] = [
  [
    'https://res.cloudinary.com/dpr1qh8kr/image/upload/v1776852731/WhatsApp_Image_2026-04-22_at_12.11.54_ocblp2.jpg',
    'https://res.cloudinary.com/dpr1qh8kr/image/upload/v1776852422/WhatsApp_Image_2026-04-22_at_12.01.43_iseqz4.jpg',
  ],
  [
    'https://res.cloudinary.com/dpr1qh8kr/image/upload/v1776885415/ESIC_rx5chl.jpg',
    'https://res.cloudinary.com/dpr1qh8kr/image/upload/v1776885408/instituto_np0gy4.jpg',
  ],
  [
    'https://res.cloudinary.com/dpr1qh8kr/image/upload/v1776896583/IFEMA_MADRID_pjdzki.png',
    'https://res.cloudinary.com/dpr1qh8kr/image/upload/v1776896055/alianza_jhmxkk.jpg',
  ],
  [
    'https://res.cloudinary.com/dpr1qh8kr/image/upload/v1776777924/hf_20260421_131312_cb848027-0a86-4ce1-8798-89590e9e5a20_1_kxo76z.png',
    'https://res.cloudinary.com/dpr1qh8kr/image/upload/v1776940391/ciuda_de_Ciencias_fxukwu.webp',
  ],
];

export function OddRitualNavSystem({ logo, locationText, onMenuStateChange }: OddRitualNavSystemProps) {
  const scopeRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelInnerRef = useRef<HTMLDivElement>(null);
  const menuLabelRef = useRef<HTMLSpanElement>(null);
  const closeLabelRef = useRef<HTMLSpanElement>(null);
  const menuItemRefs = useRef<HTMLAnchorElement[]>([]);
  const menuTlRef = useRef<gsap.core.Timeline | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const uniqueNavItems = Array.from(new Map(NAV_ITEMS.map((item) => [item.href, item])).values());

  useEffect(() => {
    onMenuStateChange?.(isOpen);
  }, [isOpen, onMenuStateChange]);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (!isOpen) {
      html.style.overflow = '';
      body.style.overflow = '';
      return;
    }

    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';

    return () => {
      html.style.overflow = '';
      body.style.overflow = '';
    };
  }, [isOpen]);

  useGSAP(
    () => {
      if (
        !panelRef.current ||
        !panelInnerRef.current ||
        !menuLabelRef.current ||
        !closeLabelRef.current
      ) {
        return;
      }

      menuTlRef.current = createMenuPanelTimeline({
        panel: panelRef.current,
        panelInner: panelInnerRef.current,
        menuItems: menuItemRefs.current,
        menuLabel: menuLabelRef.current,
        closeLabel: closeLabelRef.current,
        setIsOpen,
        resetHover: () => {
          setHoveredItem(null);
          setActiveIndex(null);
        },
      });
    },
    { scope: scopeRef }
  );

  const setItemRef = (index: number, el: HTMLAnchorElement | null) => {
    if (!el) return;
    menuItemRefs.current[index] = el;
  };

  const toggleMenu = () => {
    const menuTl = menuTlRef.current;
    if (!menuTl || menuTl.isActive()) return;

    const shouldOpen = menuTl.reversed() || menuTl.progress() === 0;
    if (shouldOpen) {
      menuTl.play();
      return;
    }
    menuTl.reverse();
  };

  const handleNavItemClick = (href: string) => {
    const menuTl = menuTlRef.current;
    if (!menuTl || menuTl.isActive()) return;

    const targetSection = document.querySelector<HTMLElement>(href);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', href);
    }

    menuTl.reverse();
  };

  return (
    <header ref={scopeRef} className="relative z-30 w-full max-w-7xl">
      <div className="flex items-start justify-between">
        <div className="text-xl font-bold tracking-wider">{logo}</div>

        <button
          type="button"
          aria-expanded={isOpen}
          onClick={toggleMenu}
          className="type-ui relative min-w-20 text-right uppercase tracking-[0.18em] text-foreground/90 transition-opacity duration-200 hover:opacity-100"
        >
          <span ref={menuLabelRef} className="inline-block">
            Menu
          </span>
          <span ref={closeLabelRef} className="absolute right-0 top-0 inline-block">
            Close
          </span>
        </button>
      </div>

      <div
        ref={panelRef}
        className="fixed inset-0 z-20 origin-top bg-background/96 pt-24 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)] backdrop-blur-sm"
      >
        <button
          type="button"
          onClick={toggleMenu}
          className="type-ui absolute right-6 top-6 uppercase tracking-[0.2em] text-foreground/80 transition-opacity hover:opacity-100 md:right-10 md:top-8 lg:right-12"
        >
          Cerrar
        </button>
        <div ref={panelInnerRef} className="mx-auto flex h-full w-full max-w-7xl flex-col overflow-y-auto px-6 pb-8 md:px-10 md:pb-10 lg:px-12">
          <div className="flex min-h-[calc(100vh-8rem)] flex-col justify-between gap-8 border-t border-foreground/15 pt-6 md:min-h-[calc(100vh-9rem)] md:gap-10 md:pt-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(18rem,1fr)_minmax(24rem,36rem)] md:items-start md:gap-16 lg:gap-20">
              <div className="space-y-5 md:space-y-6">
                <p className="type-eyebrow">Índice</p>
                <OddRitualNavLinks
                  items={uniqueNavItems}
                  activeItem="Inicio"
                  activeIndex={activeIndex}
                  hoveredItem={hoveredItem}
                  onHoverItem={setHoveredItem}
                  onHoverIndex={setActiveIndex}
                  setItemRef={setItemRef}
                  onItemClick={handleNavItemClick}
                />
              </div>
              <div className="relative ml-auto w-full max-w-[36rem] pt-1 md:pt-2">
                <div className="absolute -left-8 top-3 hidden h-[80%] w-px bg-foreground/15 md:block lg:-left-10" />
                <MenuHoverPreview clusters={MENU_PREVIEW_CLUSTERS} activeIndex={activeIndex} />
              </div>
            </div>
            <OddRitualMenuBottomImage imageSrc={MENU_BOTTOM_IMAGE} locationText={locationText} />
          </div>
        </div>
      </div>
    </header>
  );
}
