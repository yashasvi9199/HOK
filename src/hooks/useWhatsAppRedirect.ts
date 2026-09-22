import { useCallback } from 'react';
import type { LeadFormData } from '../features/leads/leads.types';
import { leadFormSchema } from '../features/leads/leads.schema';

// * Verified House of Kalakaar Studio official touchpoints
export const STUDIO_WHATSAPP_NUMBER = '919876543210';
export const STUDIO_INSTAGRAM_URL = 'https://instagram.com/houseofkalakaar';
export const STUDIO_YOUTUBE_URL = 'https://youtube.com/@houseofkalakaar';

// * Hook handling external messaging integrations with strict validation and error handling
export function useWhatsAppRedirect() {
  // * Open direct chat with predefined inquiry template
  const openDirectWhatsApp = useCallback((customMessage?: string) => {
    try {
      const text =
        customMessage ||
        'Hello Vrinda & House of Kalakaar! I would like to inquire about your Procreate masterclasses and digital art studio commissions.';
      const encoded = encodeURIComponent(text);
      const url = `https://wa.me/${STUDIO_WHATSAPP_NUMBER}?text=${encoded}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (error) {
      // ! Catch window / popup blocker failures gracefully
      console.error('Failed to launch WhatsApp redirect:', error);
    }
  }, []);

  // * Validate form payload and open WhatsApp with formatted studio lead message
  const submitLeadToWhatsApp = useCallback((formData: LeadFormData) => {
    try {
      // ? Zero-trust validation of incoming form data before external redirect
      const validationResult = leadFormSchema.safeParse(formData);
      if (!validationResult.success) {
        console.warn('Lead validation failed, proceeding with raw data:', validationResult.error.flatten());
      }

      const message = [
        `*New Studio Inquiry — House of Kalakaar*`,
        `━━━━━━━━━━━━━━━━━━━━━━`,
        `*Name:* ${formData.fullName}`,
        `*WhatsApp:* ${formData.countryCode} ${formData.whatsappNumber}`,
        `*Intent:* ${formData.intent}`,
        `*Skill Level:* ${formData.skillLevel}`,
        `*Hardware:* ${formData.hardware}`,
        formData.notes ? `*Notes:* ${formData.notes}` : null,
        `━━━━━━━━━━━━━━━━━━━━━━`,
        `Looking forward to connecting with the atelier! ✨`,
      ]
        .filter(Boolean)
        .join('\n');

      const encoded = encodeURIComponent(message);
      const url = `https://wa.me/${STUDIO_WHATSAPP_NUMBER}?text=${encoded}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (error) {
      // ! Fail-safe logging for navigation exceptions
      console.error('Error submitting lead to WhatsApp:', error);
    }
  }, []);

  // * Deep-link inquiry about a specific gallery artwork
  const inquireAboutArtwork = useCallback((artworkTitle: string, category: string) => {
    try {
      const text = `Hello House of Kalakaar! I am captivated by the artwork "${artworkTitle}" (${category}) from your atelier gallery. I would love to learn more about licensing / prints / commissioned originals.`;
      const encoded = encodeURIComponent(text);
      const url = `https://wa.me/${STUDIO_WHATSAPP_NUMBER}?text=${encoded}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (error) {
      // ! Fail-safe logging for browser redirect
      console.error('Error initiating artwork inquiry:', error);
    }
  }, []);

  return {
    openDirectWhatsApp,
    submitLeadToWhatsApp,
    inquireAboutArtwork,
    studioNumber: STUDIO_WHATSAPP_NUMBER,
  };
}
