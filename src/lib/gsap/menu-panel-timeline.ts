import { gsap } from 'gsap';

interface MenuPanelTimelineArgs {
  panel: HTMLDivElement;
  panelInner: HTMLDivElement;
  menuItems: HTMLAnchorElement[];
  menuLabel: HTMLSpanElement;
  closeLabel: HTMLSpanElement;
  setIsOpen: (value: boolean) => void;
  resetHover: () => void;
}

export function createMenuPanelTimeline({
  panel,
  panelInner,
  menuItems,
  menuLabel,
  closeLabel,
  setIsOpen,
  resetHover,
}: MenuPanelTimelineArgs) {
  gsap.set(panel, { autoAlpha: 0, yPercent: -4, pointerEvents: 'none' });
  gsap.set(panelInner, { autoAlpha: 0, y: -12 });
  gsap.set(menuItems, { y: 10, autoAlpha: 0 });
  gsap.set(menuLabel, { autoAlpha: 1, y: 0 });
  gsap.set(closeLabel, { autoAlpha: 0, y: 8 });

  const menuTl = gsap.timeline({
    paused: true,
    defaults: { ease: 'power2.out' },
  });

  menuTl
    .to(panel, {
      autoAlpha: 1,
      yPercent: 0,
      duration: 0.24,
      onStart: () => gsap.set(panel, { pointerEvents: 'auto' }),
    })
    .to(
      panelInner,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.24,
        ease: 'power2.out',
      },
      0.03
    )
    .to(
      menuLabel,
      {
        autoAlpha: 0,
        y: -6,
        duration: 0.22,
        ease: 'power2.inOut',
      },
      0
    )
    .to(
      closeLabel,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.22,
        ease: 'power2.inOut',
      },
      0.02
    )
    .to(
      menuItems,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.34,
        stagger: 0.05,
        ease: 'power2.out',
      },
      0.18
    );

  menuTl.eventCallback('onComplete', () => setIsOpen(true));
  menuTl.eventCallback('onReverseComplete', () => {
    setIsOpen(false);
    resetHover();
    gsap.set(panel, { pointerEvents: 'none' });
  });

  return menuTl;
}
