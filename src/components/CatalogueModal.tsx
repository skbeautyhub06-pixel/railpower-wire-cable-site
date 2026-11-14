import { X, FileText, Download, MessageCircle, Phone } from 'lucide-react';
import { siteConfig, buildWhatsAppUrl } from '../config/siteConfig';
import { PRODUCT_CATEGORIES } from '../data/products';

interface CatalogueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CatalogueModal({ isOpen, onClose }: CatalogueModalProps) {
  if (!isOpen) return null;

  const hasOfficialPdf = Boolean(siteConfig.catalogue.pdfUrl);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="catalogue-modal-title"
    >
      <div className="relative w-full max-w-lg bg-white rounded-lg border border-neutral-200 shadow-2xl overflow-hidden my-8">
        <div className="flex items-center justify-between px-6 py-4 bg-[#171717] text-white">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-[#D99A19]" />
            <h2 id="catalogue-modal-title" className="text-lg font-bold">
              RAILPOWER Product Catalogue
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close catalogue modal"
            className="w-10 h-10 inline-flex items-center justify-center rounded-md text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {hasOfficialPdf ? (
            <div className="space-y-4">
              <p className="text-sm text-neutral-700 leading-relaxed">
                Download the official RAILPOWER WIRE &amp; CABLE Product Catalogue PDF covering our
                full wire and cable range.
              </p>
              <a
                href={siteConfig.catalogue.pdfUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 text-sm font-bold text-[#171717] bg-[#D99A19] hover:bg-[#c58912] rounded-md transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download Official Catalogue (PDF)</span>
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-md bg-[#F5F5F5] border border-neutral-200">
                <p className="text-xs font-semibold text-[#9A6B06] uppercase tracking-wider mb-1">
                  PDF Brochure Slot Ready · Official PDF Pending
                </p>
                <p className="text-sm text-[#171717] font-medium leading-relaxed">
                  {siteConfig.catalogue.lastUpdatedNote}
                </p>
                <p className="text-xs text-neutral-600 mt-2">
                  No unverified specs or placeholder PDFs are published. Configure{' '}
                  <code className="font-mono bg-white px-1 py-0.5 rounded border border-neutral-200">
                    siteConfig.catalogue.pdfUrl
                  </code>{' '}
                  when your official brochure is finalized.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#171717] mb-2">
                  Seven Main Catalogue Categories
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-sm text-neutral-700">
                  {PRODUCT_CATEGORIES.map((item, idx) => (
                    <li key={item.id} className="flex items-center gap-2">
                      <span className="font-mono text-xs text-[#9A6B06]">
                        0{idx + 1}.
                      </span>
                      <span>{item.name}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  href={buildWhatsAppUrl(
                    'Hello RAILPOWER WIRE & CABLE team, please share your latest Product Catalogue and Dealer Price List.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-[#171717] bg-[#D99A19] hover:bg-[#c58912] rounded-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Request via WhatsApp</span>
                </a>
                <a
                  href={siteConfig.contact.phoneHref}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#171717] hover:bg-neutral-800 rounded-md transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {siteConfig.contact.phoneDisplay}</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
