export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export interface Artwork {
  id: string;
  title: string;
  category: 'Fashion Illustration' | 'Bridal & Couture' | 'Digital Portraits' | 'Concept Art' | 'Procreate Timelapses';
  year: string;
  medium: string;
  description: string;
  imageUrl: string;
  aspectRatio: 'portrait' | 'square' | 'landscape';
  featured?: boolean;
  brushDetails?: string;
  canvasSpecs?: string;
  procreateLayers?: number;
  tags?: string[];
}

export interface StudentWork {
  id: string;
  studentName: string;
  studentHandle?: string;
  city: string;
  title: string;
  tag: "Beginner's First Piece" | 'Fashion Sketching' | 'Portrait Shading' | 'Couture Rendering';
  beforeNote?: string;
  quote: string;
  artworkUrl: string;
  workshopBatch: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  avatarUrl: string;
  rating: number;
  content: string;
  courseOrProject: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Prerequisites & Hardware' | 'Curriculum & Workshops' | 'Commissions & Licensing';
}

export type LeadIntent = 'Learn Digital Art' | 'Commission Illustration' | 'Brand Collaboration';
export type SkillLevel = 'Absolute Beginner' | 'Intermediate' | 'Traditional Artist going Digital';
export type HardwareStatus = 'Have iPad & Apple Pencil' | 'Planning to get one' | 'Other Tablet (Galaxy/Wacom)';

export interface LeadFormData {
  intent: LeadIntent;
  skillLevel: SkillLevel;
  hardware: HardwareStatus;
  fullName: string;
  whatsappNumber: string;
  countryCode: string;
  notes?: string;
}
