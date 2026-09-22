// * Core artwork portfolio schema used across gallery and carousel views
export interface Artwork {
  readonly id: string;
  readonly title: string;
  readonly category: 'Fashion Illustration' | 'Bridal & Couture' | 'Digital Portraits' | 'Concept Art' | 'Procreate Timelapses';
  readonly year: string;
  readonly medium: string;
  readonly description: string;
  readonly imageUrl: string;
  readonly aspectRatio: 'portrait' | 'square' | 'landscape';
  readonly featured?: boolean;
  readonly brushDetails?: string;
  readonly canvasSpecs?: string;
  readonly procreateLayers?: number;
  readonly tags?: readonly string[];
}
