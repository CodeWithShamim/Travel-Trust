import { Variants } from 'framer-motion';

// ----------------------
// 🔹 Custom Types
// ----------------------
type IDirection = 'up' | 'down' | 'left' | 'right' | '';
type IType = 'spring' | 'tween' | 'transform' | 'scroll';

// ----------------------
// 🔹 Text Animation
// ----------------------
export const textVariant = (delay: number = 0): Variants => ({
  hidden: {
    y: -50,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 1.25,
      delay,
    },
  },
});

// ----------------------
// 🔹 Fade In Animation
// ----------------------
export const fadeIn = (
  direction: IDirection = '',
  type: IType = 'tween',
  delay: number = 0,
  duration: number = 0.6,
): any => ({
  hidden: {
    x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
    y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type,
      delay,
      duration,
      ease: 'easeOut',
    },
  },
});

// ----------------------
export const zoomIn = (delay: number = 0, duration: number = 0.45): Variants => ({
  hidden: {
    scale: 0.85, // start closer for smoother zoom
    opacity: 0,
    filter: 'blur(4px)', // subtle pop effect
    transformOrigin: 'center',
  },
  show: {
    scale: 1,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      delay,
      duration,
      ease: [0.25, 0.1, 0.25, 1], // cubic-bezier smoother than easeOut
      type: 'spring', // feels more natural than tween
      stiffness: 120,
      damping: 15,
    },
  },
});

// ----------------------
// 🔹 Slide In Animation
// ----------------------
export const slideIn = (
  direction: IDirection = '',
  type: IType = 'tween',
  delay: number = 0,
  duration: number = 0.6,
): any => ({
  hidden: {
    x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
    y: direction === 'up' ? '100%' : direction === 'down' ? '100%' : 0,
  },
  show: {
    x: 0,
    y: 0,
    transition: {
      type,
      delay,
      duration,
      ease: 'easeOut',
    },
  },
});

// ----------------------
// 🔹 Image Hover Animation
// ----------------------
export const imageVariants = (type: string = 'tween', duration: number = 3): any => ({
  hidden: {
    scale: 1,
    transition: {
      type,
      duration,
      ease: 'easeInOut',
    },
  },
  show: {
    scale: 1.1, // smaller zoom to reduce GPU load
    transition: {
      type,
      duration,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse', // smoothly zooms in/out
    },
  },
});

// ----------------------
// 🔹 Stagger Container
// ----------------------
export const staggerContainer = (
  staggerChildren: number = 0.1,
  delayChildren: number = 0,
): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});
