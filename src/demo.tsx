import { MinimalistHero } from '@/components/ui/minimalist-hero';
import Lenis from 'lenis';
import React from 'react';
import { PRELOADER_DURATION_MS, SitePreloader } from '@/components/ui/site-preloader';

const Waves = React.lazy(() =>
  import('@/components/ui/wave-background').then((module) => ({ default: module.Waves }))
);
const ZoomParallax = React.lazy(() =>
  import('@/components/ui/zoom-parallax').then((module) => ({ default: module.ZoomParallax }))
);
const EditorialLineReveal = React.lazy(() =>
  import('@/lib/animations/editorial-line-reveal').then((module) => ({
    default: module.EditorialLineReveal,
  }))
);
const ProjectShowcase = React.lazy(() =>
  import('@/components/ui/project-showcase').then((module) => ({ default: module.ProjectShowcase }))
);
const AboutTransitionSection = React.lazy(() =>
  import('@/components/sections/about-transition-section').then((module) => ({
    default: module.AboutTransitionSection,
  }))
);
const HoverFooter = React.lazy(() =>
  import('@/components/ui/hover-footer').then((module) => ({ default: module.default }))
);

const MinimalistHeroDemo = () => {
  const [isPreloading, setIsPreloading] = React.useState(true);

  React.useEffect(() => {
    const forceInicio = () => {
      window.history.replaceState(null, '', '#inicio');
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    };

    forceInicio();
    const timeoutId = window.setTimeout(() => {
      forceInicio();
      setIsPreloading(false);
    }, PRELOADER_DURATION_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  React.useEffect(() => {
    if (isPreloading) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      return () => {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
      };
    }

    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }, [isPreloading]);

  React.useEffect(() => {
    if (isPreloading) return;

    const lenis = new Lenis();
    let rafId = 0;
    let isActive = true;

    function raf(time: number) {
      if (!isActive) return;
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      isActive = false;
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [isPreloading]);

  const images = [
    {
      src: 'https://res.cloudinary.com/dpr1qh8kr/image/upload/v1776855194/imagen_portfolioweb_tsotyu.webp',
      alt: 'Imagen central rascacielos',
      objectPosition: '50% 50%',
    },
    {
      src: 'https://res.cloudinary.com/dpr1qh8kr/image/upload/v1776851773/WhatsApp_Image_2026-04-21_at_14.57.10_1_z3yai7.jpg',
      alt: 'Foto personal 1',
      objectPosition: '50% 28%',
    },
    {
      src: 'https://res.cloudinary.com/dpr1qh8kr/image/upload/v1776851768/WhatsApp_Image_2026-04-22_at_11.53.22_d98pyn.jpg',
      alt: 'Foto personal 2',
      objectPosition: '50% 15%',
    },
    {
      src: 'https://res.cloudinary.com/dpr1qh8kr/image/upload/v1776852417/WhatsApp_Image_2026-04-22_at_12.06.01_h7c7hr.jpg',
      alt: 'Foto personal 3',
      objectPosition: '50% 20%',
    },
    {
      src: 'https://res.cloudinary.com/dpr1qh8kr/image/upload/v1776852420/WhatsApp_Image_2026-04-22_at_12.05.44_nd0so3.jpg',
      alt: 'Foto personal 4',
      objectPosition: '50% 30%',
    },
    {
      src: 'https://res.cloudinary.com/dpr1qh8kr/image/upload/v1776852422/WhatsApp_Image_2026-04-22_at_12.01.43_iseqz4.jpg',
      alt: 'Foto personal 5',
      objectPosition: '50% 22%',
    },
    {
      src: 'https://res.cloudinary.com/dpr1qh8kr/image/upload/v1776852731/WhatsApp_Image_2026-04-22_at_12.11.54_ocblp2.jpg',
      alt: 'Foto personal 6',
      objectPosition: '50% 28%',
    },
  ];

  const educationProjects = [
    {
      title: 'IES MARIA CARBONELL Y SANCHEZ',
      description: 'Bachiller en Ciencias Sociales',
      year: '2018 - 2020',
      link: '#formacion-academica',
      image: 'https://res.cloudinary.com/dpr1qh8kr/image/upload/v1776885408/instituto_np0gy4.jpg',
    },
    {
      title: 'TYLER JUNIOR COLLEGE TX',
      description: 'Management Degree',
      year: '2021',
      link: '#formacion-academica',
      image: 'https://res.cloudinary.com/dpr1qh8kr/image/upload/v1776885420/tjc_xcikye.jpg',
    },
    {
      title: 'ESIC VALENCIA',
      description: 'Grado en International Business',
      year: '2021 - 2025',
      link: '#formacion-academica',
      image: 'https://res.cloudinary.com/dpr1qh8kr/image/upload/v1776885415/ESIC_rx5chl.jpg',
    },
    {
      title: 'EBIS BUSINESS TECHSCHOOL',
      description: 'Master en Agentes de IA e Hiperautomatizacion de procesos',
      year: '2025 - 2026',
      link: '#formacion-academica',
      image: 'https://res.cloudinary.com/dpr1qh8kr/image/upload/v1776885426/ebis_1_cjjh4y.jpg',
    },
    {
      title: 'EBIS BUSINESS TECHSCHOOL',
      description: 'Master IA Generativa',
      year: '2025 - 2026',
      link: '#formacion-academica',
      image: 'https://res.cloudinary.com/dpr1qh8kr/image/upload/v1776885429/EBIS_2_ovkehu.png',
    },
  ];

  const workExperienceProjects = [
    {
      title: 'Traductor de Inglés',
      description: 'Traductor de inglés en ferias para empresas del sector agrícola',
      year: '2020 - 2024',
      link: '#experiencia-laboral',
      image: 'https://res.cloudinary.com/dpr1qh8kr/image/upload/v1776896583/IFEMA_MADRID_pjdzki.png',
    },
    {
      title: 'Contabilidad y Administración',
      description: 'Labores de Administración y Contabilidad con la empresa Alianza Cítricos SL',
      year: '2021 - 2023',
      link: '#experiencia-laboral',
      image: 'https://res.cloudinary.com/dpr1qh8kr/image/upload/v1776896055/alianza_jhmxkk.jpg',
    },
    {
      title: 'Prácticas Curriculares',
      description: 'Realización de prácticas curriculares en la empresa TRANSITAINER S.A.',
      year: '2024 - 2025',
      link: '#experiencia-laboral',
      image: 'https://res.cloudinary.com/dpr1qh8kr/image/upload/v1776896446/TRANSITAINER_LOGO_amdfhd.png',
    },
    {
      title: 'Recepcionista',
      description:
        'Labores de administración, contabilidad y atención al cliente en la empresa NOVASALUT',
      year: '2025 - 2026',
      link: '#experiencia-laboral',
      image: 'https://res.cloudinary.com/dpr1qh8kr/image/upload/v1776896116/NOVASALUT_tiinqm.jpg',
    },
  ];

  return (
    <>
      <SitePreloader isVisible={isPreloading} />
      <div className="relative bg-background">
        <React.Suspense fallback={null}>
          <Waves
            className="absolute inset-0 z-0 h-full w-full opacity-80 mix-blend-multiply pointer-events-none"
            strokeColor="#00000066"
            backgroundColor="transparent"
            pointerSize={0.35}
          />
        </React.Suspense>
        <main id="contenido-principal" className="relative z-10">
          <section id="inicio">
            <MinimalistHero
              className="!bg-transparent"
              logoText={
                <img
                  src="https://res.cloudinary.com/dpr1qh8kr/image/upload/v1776778014/ChatGPT_Image_21_abr_2026_15_26_48_fyv6bg.png"
                  alt="D.Hidalgo logo"
                  className="h-20 w-auto object-contain md:h-24 lg:h-28"
                />
              }
              mainText="Especialista en IA aplicada, automatización y desarrollo digital, con visión de negocio y entorno internacional."
              readMoreLink="#inteligencia-artificial-desarrollo"
              readMoreLabel="Sobre mí"
              imageSrc="https://res.cloudinary.com/dpr1qh8kr/image/upload/v1776777924/hf_20260421_131312_cb848027-0a86-4ce1-8798-89590e9e5a20_1_kxo76z.png"
              imageAlt="Portrait in profile wearing black turtleneck."
              overlayText={{
                part1: 'David',
                part2: 'Hidalgo',
              }}
              locationText="Valencia, ES"
            />
          </section>
          <React.Suspense fallback={<div className="h-32" />}>
            <ZoomParallax images={images} />
            <EditorialLineReveal
              eyebrow="David Hidalgo"
              text="Perfil especializado en inteligencia artificial, automatización y desarrollo digital, con base en negocio y entorno internacional."
              wipeColor="#facc15"
              start="top 72%"
              once
            />
            <section id="formacion-academica">
              <ProjectShowcase heading="FORMACIÓN ACADÉMICA" projects={educationProjects} />
            </section>
            <section id="experiencia-laboral">
              <ProjectShowcase heading="EXPERIENCIA LABORAL" projects={workExperienceProjects} />
            </section>
            <section id="inteligencia-artificial-desarrollo">
              <AboutTransitionSection />
            </section>
            <HoverFooter />
          </React.Suspense>
        </main>
      </div>
    </>
  );
};

export default MinimalistHeroDemo;
