// * Types for the dedicated Skiper19 Scroll Animation Effect page
export type StrokeColorOption = '#C5A059' | '#C2F84F' | '#E05A47' | '#38BDF8' | '#A855F7';
export type StrokeWidthOption = 8 | 14 | 16 | 20 | 28;

export interface Milestone {
  readonly id: string;
  readonly progress: number;
  readonly tag: string;
  readonly title: string;
  readonly description: string;
}
