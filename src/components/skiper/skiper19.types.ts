import type { MotionValue } from 'motion/react';
import type { RefObject } from 'react';

// * Component props for @skiper-ui/skiper19 scroll-following SVG path animation
export interface Skiper19Props {
  readonly className?: string;
  readonly scrollYProgress?: MotionValue<number>;
  readonly containerRef?: RefObject<HTMLElement | null>;
  readonly strokeColor?: string;
  readonly strokeWidth?: number | string;
  readonly pathLengthRange?: readonly [number, number];
  readonly preserveAspectRatio?: string;
}

