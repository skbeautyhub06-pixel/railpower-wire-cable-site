import { useState } from 'react';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Info,
} from 'lucide-react';
import { siteConfig, buildWhatsAppUrl, getFormattedAddress } from '../config/siteConfig';
import {
  submitContactEnquiry,
  validateEmail,
  validatePhoneNumber,
  type ContactEnquiryPayload,
  type SubmissionResult,
} from '../services/enquiryService';
import { SeoHead } from '../components/SeoHead';

const INITIAL_CONTACT: ContactEnquiryPayload = {
  fullName: '',
  mobileNumber: '',
  email: '',
  subject: '',
  message: '',
};

type ContactErrors = Partial<Record<keyof ContactEnquiryPayload, string>>;

export function ContactPage() {
  const [form, setForm] = useState<ContactEnquiryPayload>(INITIAL_CONTACT);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [result, setResult] = useState<SubmissionResult | null>(null);

  const updateField = (field: keyof ContactEnquiryPayload, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const nextErrors: ContactErrors = {};
    if (!form.fullName.trim() || form.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name.';
    }
    if (!validatePhoneNumber(form.mobileNumber)) {
      nextErrors.mobileNumber = 'Please enter a valid 10-digit mobile number.';
    }
    if (!validateEmail(form.email)) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!form.subject.trim()) {
      nextErrors.subject = 'Please enter an enquiry subject.';
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      nextErrors.message = 'Please enter at least 10 characters in your message.';
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
        fullName: form.fullName.trim(),
        mobileNumber: form.mobileNumber.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
      });
      setResult(res);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'Unable to process enquiry. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SeoHead
        title="Contact Us – RAILPOWER WIRE & CABLE | Satna, Madhya Pradesh, India"
        description="Contact RAILPOWER WIRE & CABLE at +91 96306 83505 in Satna, Madhya Pradesh, India for wire & cable enquiries, bulk orders, and dealership support."
        canonicalPath="/contact"
      />

      {/* Page Header */}
      <section className="bg-[#171717] text-white py-16 md:py-20 border-b border-neutral-800">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#D99A19] mb-3">
              Official Business Contact
            </p>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Contact RAILPOWER WIRE &amp; CABLE
            </h1>
            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed">
              Connect with our team in {siteConfig.contact.officeAddressDisplay} for product
              quotations, distributor enquiries, and bulk supply coordination.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href={siteConfig.contact.phoneHref}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-[#171717] bg-[#D99A19] hover:bg-[#e5a824] rounded-md transition-colors whitespace-nowrap"
            >
              <Phone className="w-4 h-4" />
              <span>Call {siteConfig.contact.phoneDisplay}</span>
            </a>
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-white border border-neutral-600 hover:border-[#D99A19] rounded-md transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 text-[#D99A19]" />
              <span>WhatsApp Enquiry</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-16 md:py-20 bg-[#F5F5F5] border-b border-neutral-200">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column: Prominent Phone, Email, Location & Map */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white border border-neutral-200 rounded-lg p-6 sm:p-8 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-[#171717] mb-1">
                    Official Contact Details
                  </h2>
                  <p className="text-xs text-neutral-500">
                    Managed centrally in <code className="font-mono">src/config/siteConfig.ts</code>
                  </p>
                </div>

                {/* Prominent Click-to-Call & WhatsApp Card */}
                <div className="p-5 rounded-lg bg-[#171717] text-white space-y-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#D99A19]">
                      Official Company Phone
                    </p>
                    <a
                      href={siteConfig.contact.phoneHref}
                      className="text-2xl sm:text-3xl font-mono font-bold text-white hover:text-[#D99A19] transition-colors block mt-1"
                    >
                      {siteConfig.contact.phoneDisplay}
                    </a>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <a
                      href={siteConfig.contact.phoneHref}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold text-[#171717] bg-[#D99A19] hover:bg-[#e5a824] rounded-md transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Click to Call</span>
                    </a>
                    <a
                      href={buildWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold text-white border border-neutral-600 hover:border-[#D99A19] rounded-md transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-[#D99A19]" />
                      <span>WhatsApp Chat</span>
                    </a>
                  </div>
                </div>

                <ul className="space-y-5 text-sm">
                  <li className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-md bg-[#F5F5F5] flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-[#B87333]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#171717]">Official Company Email</p>
                      {siteConfig.contact.isEmailVerified ? (
                        <a
                          href={`mailto:${siteConfig.contact.emailDisplay}`}
                          className="text-neutral-700 hover:text-[#9A6B06] break-all"
                        >
                          {siteConfig.contact.emailDisplay}
                        </a>
                      ) : (
                        <div className="space-y-1">
                          <p className="font-mono text-neutral-800 break-all">
                            {siteConfig.contact.emailDisplay}
                          </p>
                          <p className="text-xs text-neutral-500 flex items-start gap-1.5">
                            <Info className="w-3.5 h-3.5 text-[#9A6B06] shrink-0 mt-0.5" />
                            <span>{siteConfig.contact.emailStatusNote}</span>
                          </p>
                        </div>
                      )}
                    </div>
                  </li>

                  <li className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-md bg-[#F5F5F5] flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-[#B87333]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#171717]">Business Location</p>
                      <p className="text-neutral-700 font-medium">{getFormattedAddress()}</p>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        Street address &amp; PIN code editable in siteConfig.ts
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-md bg-[#F5F5F5] flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4 text-[#B87333]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#171717]">Business Hours</p>
                      <p className="text-neutral-600">{siteConfig.contact.businessHours}</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Google Maps Location Card */}
              <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-[#171717]">Google Maps Location</h2>
                    <p className="text-xs text-neutral-500">
                      {siteConfig.contact.officeAddressDisplay}
                    </p>
                  </div>
                  <a
                    href={siteConfig.contact.googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#9A6B06] hover:underline"
                  >
                    <span>Open in Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div className="aspect-16/10 w-full bg-[#F5F5F5]">
                  <iframe
                    title="RAILPOWER WIRE & CABLE – Satna, Madhya Pradesh, India"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(
                      siteConfig.contact.googleMapsEmbedQuery
                    )}&output=embed`}
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Contact Enquiry Form */}
            <div className="lg:col-span-7 bg-white border border-neutral-200 rounded-lg p-6 sm:p-10">
              <h2 className="text-2xl font-bold text-[#171717] mb-2">Send Us an Enquiry</h2>
              <p className="text-sm text-neutral-600 mb-6">
                Fill in your details below or call us directly at{' '}
                <a
                  href={siteConfig.contact.phoneHref}
                  className="font-mono font-bold text-[#171717] hover:text-[#9A6B06]"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
                .
              </p>

              {result ? (
                <div className="bg-[#F5F5F5] border border-neutral-200 rounded-lg p-6 space-y-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#9A6B06] shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-[#171717]">{result.title}</h3>
                      <p className="text-xs font-mono text-neutral-600">
                        Reference: {result.referenceId}
                      </p>
                      <p className="text-sm text-neutral-700 leading-relaxed">{result.detail}</p>
                    </div>
                  </div>

                  <pre className="bg-white border border-neutral-200 rounded-md p-4 text-xs font-mono text-neutral-700 whitespace-pre-wrap">
                    {result.formattedSummary}
                  </pre>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href={buildWhatsAppUrl(result.formattedSummary)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-[#171717] bg-[#D99A19] hover:bg-[#c58912] rounded-md"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send via WhatsApp</span>
                    </a>
                    <a
                      href={siteConfig.contact.phoneHref}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-[#171717] hover:bg-neutral-800 rounded-md"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call {siteConfig.contact.phoneDisplay}</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setResult(null);
                        setForm(INITIAL_CONTACT);
                      }}
                      className="px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:text-[#171717] cursor-pointer"
                    >
                      New Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {submitError && (
                    <div className="flex items-start gap-2.5 p-3.5 rounded-md bg-red-50 border border-red-200 text-red-800 text-sm">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <div>
                    <label htmlFor="cnt-fullName" className="block text-sm font-semibold text-[#171717] mb-1.5">
                      Full Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="cnt-fullName"
                      type="text"
                      value={form.fullName}
                      onChange={(e) => updateField('fullName', e.target.value)}
                      placeholder="Your full name"
                      className="w-full px-3.5 py-2.5 text-sm rounded-md border border-neutral-300 focus:border-[#D99A19] focus:outline-none focus:ring-2 focus:ring-[#D99A19]/25"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="cnt-mobile" className="block text-sm font-semibold text-[#171717] mb-1.5">
                        Mobile Number <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="cnt-mobile"
                        type="tel"
                        value={form.mobileNumber}
                        onChange={(e) => updateField('mobileNumber', e.target.value)}
                        placeholder="10-digit mobile number"
                        className="w-full px-3.5 py-2.5 text-sm rounded-md border border-neutral-300 focus:border-[#D99A19] focus:outline-none focus:ring-2 focus:ring-[#D99A19]/25"
                      />
                      {errors.mobileNumber && (
                        <p className="mt-1 text-xs text-red-600">{errors.mobileNumber}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="cnt-email" className="block text-sm font-semibold text-[#171717] mb-1.5">
                        Email Address <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="cnt-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        placeholder="name@company.com"
                        className="w-full px-3.5 py-2.5 text-sm rounded-md border border-neutral-300 focus:border-[#D99A19] focus:outline-none focus:ring-2 focus:ring-[#D99A19]/25"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cnt-subject" className="block text-sm font-semibold text-[#171717] mb-1.5">
                      Subject <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="cnt-subject"
                      type="text"
                      value={form.subject}
                      onChange={(e) => updateField('subject', e.target.value)}
                      placeholder="Product quote, bulk supply, or general enquiry"
                      className="w-full px-3.5 py-2.5 text-sm rounded-md border border-neutral-300 focus:border-[#D99A19] focus:outline-none focus:ring-2 focus:ring-[#D99A19]/25"
                    />
                    {errors.subject && (
                      <p className="mt-1 text-xs text-red-600">{errors.subject}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="cnt-message" className="block text-sm font-semibold text-[#171717] mb-1.5">
                      Message <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      id="cnt-message"
                      rows={5}
                      value={form.message}
                      onChange={(e) => updateField('message', e.target.value)}
                      placeholder="Describe the wire or cable category, quantity, or enquiry details..."
                      className="w-full px-3.5 py-2.5 text-sm rounded-md border border-neutral-300 focus:border-[#D99A19] focus:outline-none focus:ring-2 focus:ring-[#D99A19]/25"
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-600">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold text-[#171717] bg-[#D99A19] hover:bg-[#c58912] disabled:opacity-60 rounded-md transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" aria-hidden="true" />
                    <span>{isSubmitting ? 'Sending...' : 'Send Enquiry'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
