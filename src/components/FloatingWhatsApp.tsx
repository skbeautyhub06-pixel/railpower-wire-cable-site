import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl, siteConfig } from '../config/siteConfig';

export function FloatingWhatsApp() {
  return (
    <a
      href={buildWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={
        siteConfig.contact.isWhatsappConfigured
          ? 'Chat on WhatsApp with RAILPOWER WIRE & CABLE'
          : 'WhatsApp Enquiry (Configure official number in siteConfig.ts)'
      }
      title="Enquire on WhatsApp"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 inline-flex items-center gap-2.5 px-4 py-3 rounded-lg bg-[#171717] text-white border border-[#D99A19]/60 hover:bg-[#262626] hover:border-[#D99A19] shadow-lg transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D99A19]"
    >
      <MessageCircle className="w-5 h-5 text-[#D99A19] shrink-0" aria-hidden="true" />
      <span className="text-xs sm:text-sm font-bold whitespace-nowrap">WhatsApp Enquiry</span>
    </a>
  );
}
