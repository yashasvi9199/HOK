import { useCallback } from 'react';
import { LeadFormData } from '../types';

export const STUDIO_WHATSAPP_NUMBER = '919876543210'; // House of Kalakaar Studio WhatsApp line
export const STUDIO_INSTAGRAM_URL = 'https://instagram.com/houseofkalakaar';
export const STUDIO_YOUTUBE_URL = 'https://youtube.com/@houseofkalakaar';

export function useWhatsAppRedirect() {
  const openDirectWhatsApp = useCallback((customMessage?: string) => {
    const text = customMessage || 'Hello Vrinda & House of Kalakaar! I would like to inquire about your Procreate masterclasses and digital art studio commissions.';
    const encoded = encodeURIComponent(text);
    const url = `https://wa.me/${STUDIO_WHATSAPP_NUMBER}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  const submitLeadToWhatsApp = useCallback((formData: LeadFormData) => {
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
      `Looking forward to connecting with the atelier! ✨`
    ].filter(Boolean).join('\n');

    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${STUDIO_WHATSAPP_NUMBER}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  const inquireAboutArtwork = useCallback((artworkTitle: string, category: string) => {
    const text = `Hello House of Kalakaar! I am captivated by the artwork "${artworkTitle}" (${category}) from your atelier gallery. I would love to learn more about licensing / prints / commissioned originals.`;
    const encoded = encodeURIComponent(text);
    const url = `https://wa.me/${STUDIO_WHATSAPP_NUMBER}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  return {
    openDirectWhatsApp,
    submitLeadToWhatsApp,
    inquireAboutArtwork,
    studioNumber: STUDIO_WHATSAPP_NUMBER,
  };
}
