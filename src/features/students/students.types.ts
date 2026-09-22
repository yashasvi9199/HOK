// * Student exhibition cards rendered in grid showcase
export interface StudentWork {
  readonly id: string;
  readonly studentName: string;
  readonly studentHandle?: string;
  readonly city: string;
  readonly title: string;
  readonly tag: "Beginner's First Piece" | 'Fashion Sketching' | 'Portrait Shading' | 'Couture Rendering';
  readonly beforeNote?: string;
  readonly quote: string;
  readonly artworkUrl: string;
  readonly workshopBatch: string;
}
