import { motion, AnimatePresence } from 'framer-motion';

interface SitePreloaderProps {
  isVisible: boolean;
}

export const PRELOADER_DURATION_MS = 5000;
const PRELOADER_LOGO_URL =
  'https://res.cloudinary.com/dpr1qh8kr/image/upload/v1776938851/ChatGPT_Image_23_abr_2026_12_07_22_wqxtyv.png';

export function SitePreloader({ isVisible }: SitePreloaderProps) {
  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          key="site-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] } }}
          className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-black"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0)_58%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:88px_100%] opacity-15" />
          <div className="relative flex flex-col items-center gap-8 px-6">
            <motion.img
              src={PRELOADER_LOGO_URL}
              alt="D.Hidalgo preloader logo"
              className="h-auto w-[min(74vw,560px)] object-contain drop-shadow-[0_0_18px_rgba(255,255,255,0.2)]"
              initial={{ opacity: 0, scale: 0.92, y: 14, filter: 'blur(2px)' }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0.92, 1.02, 1, 1.03],
                y: [14, 0, 0, -8],
                filter: ['blur(2px)', 'blur(0px)', 'blur(0px)', 'blur(1px)'],
              }}
              transition={{
                duration: PRELOADER_DURATION_MS / 1000,
                ease: [0.22, 1, 0.36, 1],
                times: [0, 0.22, 0.75, 1],
              }}
            />
            <div className="h-px w-[min(62vw,460px)] overflow-hidden rounded-full bg-white/20">
              <motion.div
                className="h-full w-full origin-left bg-white/80"
                initial={{ scaleX: 0, opacity: 0.85 }}
                animate={{ scaleX: [0, 1, 1], opacity: [0.85, 1, 0.3] }}
                transition={{
                  duration: PRELOADER_DURATION_MS / 1000,
                  ease: [0.22, 1, 0.36, 1],
                  times: [0, 0.72, 1],
                }}
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
