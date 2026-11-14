import { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, Send, MessageCircle, Phone } from 'lucide-react';
import {
  submitContactEnquiry,
  validateEmail,
  validatePhoneNumber,
  type SubmissionResult,
} from '../services/enquiryService';
import { buildWhatsAppUrl, siteConfig } from '../config/siteConfig';

interface EnquiryModalProps {
  isOpen: boolean;
  productName?: string;
  onClose: () => void;
}

interface FormErrors {
  fullName?: string;
  mobileNumber?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export function EnquiryModal({ isOpen, productName, onClose }: EnquiryModalProps) {
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(
    productName ? `Product Enquiry: ${productName}` : 'Product & Price Enquiry'
  );
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [result, setResult] = useState<SubmissionResult | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSubject(productName ? `Product Enquiry: ${productName}` : 'Product & Price Enquiry');
      setErrors({});
      setSubmitError(null);
      setResult(null);
    }
  }, [isOpen, productName]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name.';
    }
    if (!validatePhoneNumber(mobileNumber)) {
      nextErrors.mobileNumber = 'Please enter a valid 10-digit mobile number.';
    }
    if (!validateEmail(email)) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!subject.trim()) {
      nextErrors.subject = 'Please specify a subject for your enquiry.';
    }
    if (!message.trim() || message.trim().length < 10) {
      nextErrors.message = 'Please enter at least 10 characters describing your requirement.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await submitContactEnquiry({
        fullName: fullName.trim(),
        mobileNumber: mobileNumber.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
        productName,
      });
      setResult(res);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'An unexpected error occurred while preparing your enquiry.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
    >
      <div className="relative w-full max-w-lg bg-white rounded-lg border border-neutral-200 shadow-2xl overflow-hidden my-8">
        <div className="flex items-center justify-between px-6 py-4 bg-[#171717] text-white border-b border-neutral-800">
          <div>
            <p className="text-xs font-semibold text-[#D99A19] uppercase tracking-wider">
              RAILPOWER WIRE &amp; CABLE · {siteConfig.contact.phoneDisplay}
            </p>
            <h2 id="enquiry-modal-title" className="text-lg font-bold text-white mt-0.5">
              {productName ? `Enquire About ${productName}` : 'Send Product Enquiry'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close enquiry modal"
            className="w-10 h-10 inline-flex items-center justify-center rounded-md text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {result ? (
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 rounded-md bg-[#F5F5F5] border border-neutral-200">
                <CheckCircle2 className="w-5 h-5 text-[#9A6B06] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-[#171717]">{result.title}</h3>
                  <p className="text-xs font-mono text-neutral-600">Ref: {result.referenceId}</p>
                  <p className="text-sm text-neutral-700 leading-relaxed">{result.detail}</p>
                </div>
              </div>

              <div className="bg-neutral-50 border border-neutral-200 rounded-md p-3.5 text-xs font-mono text-neutral-700 whitespace-pre-wrap max-h-40 overflow-y-auto">
                {result.formattedSummary}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  href={buildWhatsAppUrl(result.formattedSummary)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-[#171717] bg-[#D99A19] hover:bg-[#c58912] rounded-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send via WhatsApp</span>
                </a>
                <a
                  href={siteConfig.contact.phoneHref}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#171717] hover:bg-neutral-800 rounded-md transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {siteConfig.contact.phoneDisplay}</span>
                </a>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 text-sm font-semibold text-neutral-600 hover:text-[#171717] transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {submitError && (
                <div className="flex items-start gap-2.5 p-3 rounded-md bg-red-50 border border-red-200 text-red-800 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              <div>
                <label htmlFor="modal-fullName" className="block text-sm font-semibold text-[#171717] mb-1">
                  Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  id="modal-fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-3.5 py-2.5 text-sm rounded-md border border-neutral-300 focus:border-[#D99A19] focus:outline-none focus:ring-2 focus:ring-[#D99A19]/25"
                />
                {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="modal-mobile" className="block text-sm font-semibold text-[#171717] mb-1">
                    Mobile Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="modal-mobile"
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full px-3.5 py-2.5 text-sm rounded-md border border-neutral-300 focus:border-[#D99A19] focus:outline-none focus:ring-2 focus:ring-[#D99A19]/25"
                  />
                  {errors.mobileNumber && (
                    <p className="mt-1 text-xs text-red-600">{errors.mobileNumber}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="modal-email" className="block text-sm font-semibold text-[#171717] mb-1">
                    Email Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="modal-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 text-sm rounded-md border border-neutral-300 focus:border-[#D99A19] focus:outline-none focus:ring-2 focus:ring-[#D99A19]/25"
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="modal-subject" className="block text-sm font-semibold text-[#171717] mb-1">
                  Subject <span className="text-red-600">*</span>
                </label>
                <input
                  id="modal-subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-md border border-neutral-300 focus:border-[#D99A19] focus:outline-none focus:ring-2 focus:ring-[#D99A19]/25"
                />
                {errors.subject && <p className="mt-1 text-xs text-red-600">{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="modal-message" className="block text-sm font-semibold text-[#171717] mb-1">
                  Requirement Details <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="modal-message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share wire/cable type, size, quantity, or delivery city..."
                  className="w-full px-3.5 py-2.5 text-sm rounded-md border border-neutral-300 focus:border-[#D99A19] focus:outline-none focus:ring-2 focus:ring-[#D99A19]/25"
                />
                {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-[#F5F5F5] rounded-md transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-[#171717] bg-[#D99A19] hover:bg-[#c58912] disabled:opacity-60 rounded-md transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Validating...' : 'Submit Enquiry'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
