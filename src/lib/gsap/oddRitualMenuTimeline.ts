import { gsap } from 'gsap';

interface OddRitualMenuTimelineArgs {
  menuContainer: HTMLDivElement;
  menuItems: HTMLAnchorElement[];
  menuLabel: HTMLSpanElement;
  closeLabel: HTMLSpanElement;
  secondaryControls: HTMLDivElement;
  setIsOpen: (value: boolean) => void;
  resetHover: () => void;
}

export function createOddRitualMenuTimeline({
  menuContainer,
  menuItems,
  menuLabel,
  closeLabel,
  secondaryControls,
  setIsOpen,
  resetHover,
}: OddRitualMenuTimelineArgs) {
  gsap.set(menuContainer, { autoAlpha: 0, pointerEvents: 'none' });
  gsap.set(menuItems, { y: 8, autoAlpha: 0 });
  gsap.set(menuLabel, { autoAlpha: 1, y: 0 });
  gsap.set(closeLabel, { autoAlpha: 0, y: 8 });
  gsap.set(secondaryControls, { autoAlpha: 1 });

  const menuTl = gsap.timeline({
    paused: true,
    defaults: { ease: 'power2.out' },
  });

  menuTl
    .to(menuContainer, {
      autoAlpha: 1,
      duration: 0.14,
      onStart: () => gsap.set(menuContainer, { pointerEvents: 'auto' }),
    })
    .to(
      menuLabel,
      {
        autoAlpha: 0,
        y: -6,
        duration: 0.2,
        ease: 'power2.inOut',
      },
      0
    )
    .to(
      closeLabel,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.2,
        ease: 'power2.inOut',
      },
      0.02
    )
    .to(
      secondaryControls,
      {
        autoAlpha: 0.45,
        duration: 0.2,
        ease: 'power2.inOut',
      },
      0
    )
    .to(
      menuItems,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.32,
        stagger: 0.04,
        ease: 'power2.out',
      },
      0.12
    );

  menuTl.eventCallback('onComplete', () => setIsOpen(true));
  menuTl.eventCallback('onReverseComplete', () => {
    setIsOpen(false);
    resetHover();
    gsap.set(menuContainer, { pointerEvents: 'none' });
  });

  return menuTl;
}
