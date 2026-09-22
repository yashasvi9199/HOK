// * Client and student feedback testimonials
export interface Testimonial {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly location: string;
  readonly avatarUrl: string;
  readonly rating: number;
  readonly content: string;
  readonly courseOrProject: string;
}
