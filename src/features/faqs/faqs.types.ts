// * Frequently Asked Questions accordion entries
export interface FAQItem {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
  readonly category: 'Prerequisites & Hardware' | 'Curriculum & Workshops' | 'Commissions & Licensing';
}
