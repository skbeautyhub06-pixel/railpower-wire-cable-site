import { useState } from 'react';
import {
  TrendingUp,
  Map,
  Package,
  Store,
  Boxes,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Phone,
  Copy,
  Check,
  Send,
} from 'lucide-react';
import { siteConfig, buildWhatsAppUrl } from '../config/siteConfig';
import { PRODUCT_CATEGORIES } from '../data/products';
import {
  submitDealershipApplication,
  validateEmail,
  validatePhoneNumber,
  validatePinCode,
  type DealershipApplicationPayload,
  type SubmissionResult,
} from '../services/enquiryService';
import { SeoHead } from '../components/SeoHead';
import { ResilientImage } from '../components/ResilientImage';

const PARTNERSHIP_CHANNELS = [
  {
    title: 'Dealership Opportunities',
    description:
      'Authorized district and town-level dealership opportunities for established electrical businesses.',
    icon: TrendingUp,
  },
  {
    title: 'Distributor Enquiries',
    description:
      'Regional distribution partnerships serving retail networks, sub-dealers, and local supply chains.',
    icon: Map,
  },
  {
    title: 'Wholesale Enquiries',
    description:
      'Bulk trade pricing and scheduled coil/drum dispatches for wholesale electrical merchants.',
    icon: Package,
  },
  {
    title: 'Retailer Partnerships',
    description:
      'Fast-moving residential house wires, flexible cords, and submersible cables for electrical counters.',
    icon: Store,
  },
  {
    title: 'Bulk Order Enquiries',
    description:
      'Direct project quotations for contractors, infrastructure builders, and industrial procurement teams.',
    icon: Boxes,
  },
];

const INITIAL_FORM: DealershipApplicationPayload = {
  fullName: '',
  businessName: '',
  mobileNumber: '',
  whatsappNumber: '',
  email: '',
  city: '',
  state: '',
  pinCode: '',
  businessType: '',
  interestedCategory: '',
  quantityRequirement: '',
  message: '',
};

type FormErrors = Partial<Record<keyof DealershipApplicationPayload, string>>;

export function DealershipPage() {
  const [form, setForm] = useState<DealershipApplicationPayload>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [result, setResult] = useState<SubmissionResult | null>(null);
  const [copied, setCopied] = useState(false);

  const updateField = (field: keyof DealershipApplicationPayload, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};

    if (!form.fullName.trim() || form.fullName.trim().length < 2) {
      nextErrors.fullName = 'Full name is required.';
    }
    if (!form.businessName.trim() || form.businessName.trim().length < 2) {
      nextErrors.businessName = 'Business or firm name is required.';
    }
    if (!validatePhoneNumber(form.mobileNumber)) {
      nextErrors.mobileNumber = 'Enter a valid 10-digit mobile number.';
    }
    if (!validatePhoneNumber(form.whatsappNumber)) {
      nextErrors.whatsappNumber = 'Enter a valid 10-digit WhatsApp number.';
    }
    if (!validateEmail(form.email)) {
      nextErrors.email = 'Enter a valid email address.';
    }
    if (!form.city.trim()) {
      nextErrors.city = 'City is required.';
    }
    if (!form.state.trim()) {
      nextErrors.state = 'State is required.';
    }
    if (!validatePinCode(form.pinCode)) {
      nextErrors.pinCode = 'Enter a valid 6-digit PIN code.';
    }
    if (!form.businessType) {
      nextErrors.businessType = 'Please select your business type.';
    }
    if (!form.interestedCategory) {
      nextErrors.interestedCategory = 'Please select an interested product category.';
    }
    if (!form.quantityRequirement.trim()) {
      nextErrors.quantityRequirement = 'Please specify your estimated quantity requirement.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      const firstErrorEl = document.querySelector('[data-field-error="true"]');
      firstErrorEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitDealershipApplication({
        ...form,
        fullName: form.fullName.trim(),
        businessName: form.businessName.trim(),
        mobileNumber: form.mobileNumber.trim(),
        whatsappNumber: form.whatsappNumber.trim(),
        email: form.email.trim(),
        city: form.city.trim(),
        state: form.state.trim(),
        pinCode: form.pinCode.trim(),
        quantityRequirement: form.quantityRequirement.trim(),
        message: form.message.trim(),
      });
      setResult(res);
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Failed to submit application. Please review your details and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopySummary = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.formattedSummary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard fallback ignored silently
    }
  };

  return (
    <>
      <SeoHead
        title="Become a Dealer of RAILPOWER WIRE & CABLE | Distributor & Wholesale Enquiries"
        description="Become a dealer or distributor of RAILPOWER WIRE & CABLE. Submit dealership, wholesale, retailer partnership, and bulk order enquiries."
        canonicalPath="/dealership"
      />

      {/* Hero Section */}
      <section className="relative bg-[#171717] text-white overflow-hidden border-b border-neutral-800">
        <div className="absolute inset-0">
          <ResilientImage
            src={siteConfig.media.heroCopperCables}
            alt="RAILPOWER copper electrical wires and power cables"
            loading="eager"
            className="w-full h-full object-cover opacity-35"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#171717] via-[#171717]/90 to-[#171717]/70"
          />
        </div>

        <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#D99A19] mb-3">
              Partner Network · {siteConfig.contact.officeAddressDisplay}
            </p>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4">
              Become a Dealer of RAILPOWER WIRE &amp; CABLE
            </h1>
            <p className="text-base sm:text-xl text-neutral-200 leading-relaxed mb-8">
              Build your electrical business with a dedicated wire and cable brand welcoming
              dealers, regional distributors, wholesalers, retailers, and bulk buyers.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#dealership-form"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-bold text-[#171717] bg-[#D99A19] hover:bg-[#e5a824] rounded-md transition-colors"
              >
                <span>Submit Dealership Enquiry</span>
              </a>
              <a
                href={siteConfig.contact.phoneHref}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-bold text-white border border-white/30 hover:border-[#D99A19] rounded-md transition-colors"
              >
                <Phone className="w-4 h-4 text-[#D99A19]" />
                <span>Call {siteConfig.contact.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Categories */}
      <section className="py-16 md:py-20 bg-[#F5F5F5] border-b border-neutral-200">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-[#B87333] mb-2">
              Trade &amp; Commercial Channels
            </p>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#171717] tracking-tight">
              Partnership &amp; Enquiry Opportunities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
            {PARTNERSHIP_CHANNELS.map((item, idx) => {
              const Icon = item.icon;
              const spanClass = idx < 2 ? 'lg:col-span-3' : 'lg:col-span-2';
              return (
                <div
                  key={item.title}
                  className={`${spanClass} bg-white border border-neutral-200 rounded-lg p-6 sm:p-7`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-semibold text-[#9A6B06]">
                      0{idx + 1}.
                    </span>
                    <div className="w-10 h-10 rounded-md bg-[#F5F5F5] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#B87333]" aria-hidden="true" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-[#171717] mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dealership Application Form Section */}
      <section id="dealership-form" className="py-16 md:py-24 bg-white">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-widest text-[#B87333] mb-2">
                Partner Onboarding
              </p>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#171717] tracking-tight mb-3">
                Dealership &amp; Trade Enquiry Form
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                Complete your firm and requirement details below. Direct dealership desk:{' '}
                <a
                  href={siteConfig.contact.phoneHref}
                  className="font-mono font-bold text-[#171717] hover:text-[#9A6B06]"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
                .
              </p>
            </div>

            <a
              href={buildWhatsAppUrl(
                'Hello RAILPOWER WIRE & CABLE team, I am interested in Dealership / Distribution opportunities.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-[#171717] hover:bg-neutral-800 rounded-md transition-colors whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-4 h-4 text-[#D99A19]" />
              <span>WhatsApp Dealership Desk</span>
            </a>
          </div>

          {result ? (
            <div className="bg-[#F5F5F5] border border-neutral-200 rounded-lg p-6 sm:p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-md bg-[#171717] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-[#D99A19]" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-xl font-bold text-[#171717]">{result.title}</h3>
                  <p className="text-xs font-mono text-neutral-600">
                    Application Reference: {result.referenceId}
                  </p>
                  <p className="text-sm text-neutral-700 leading-relaxed">{result.detail}</p>
                </div>
              </div>

              <div className="bg-white border border-neutral-200 rounded-md p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                    Prepared Application Summary
                  </span>
                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#171717] hover:text-[#9A6B06] cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy Details'}</span>
                  </button>
                </div>
                <pre className="text-xs font-mono text-neutral-700 whitespace-pre-wrap leading-relaxed">
                  {result.formattedSummary}
                </pre>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={buildWhatsAppUrl(result.formattedSummary)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-[#171717] bg-[#D99A19] hover:bg-[#c58912] rounded-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Application via WhatsApp</span>
                </a>
                <a
                  href={siteConfig.contact.phoneHref}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-white bg-[#171717] hover:bg-neutral-800 rounded-md transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {siteConfig.contact.phoneDisplay}</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setResult(null);
                    setForm(INITIAL_FORM);
                  }}
                  className="px-4 py-3 text-sm font-semibold text-neutral-700 hover:text-[#171717] cursor-pointer"
                >
                  Submit Another Application
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="bg-[#F5F5F5] border border-neutral-200 rounded-lg p-6 sm:p-10 space-y-6"
            >
              {submitError && (
                <div className="flex items-start gap-3 p-4 rounded-md bg-red-50 border border-red-200 text-red-800 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* 1. Full Name */}
                <div data-field-error={Boolean(errors.fullName)}>
                  <label htmlFor="dlr-fullName" className="block text-sm font-semibold text-[#171717] mb-1.5">
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="dlr-fullName"
                    type="text"
                    value={form.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    placeholder="Applicant full name"
                    className="w-full px-3.5 py-2.5 text-sm bg-white rounded-md border border-neutral-300 focus:border-[#D99A19] focus:outline-none focus:ring-2 focus:ring-[#D99A19]/25"
                  />
                  {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>}
                </div>

                {/* 2. Business Name */}
                <div data-field-error={Boolean(errors.businessName)}>
                  <label htmlFor="dlr-businessName" className="block text-sm font-semibold text-[#171717] mb-1.5">
                    Business Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="dlr-businessName"
                    type="text"
                    value={form.businessName}
                    onChange={(e) => updateField('businessName', e.target.value)}
                    placeholder="Firm / Shop / Company name"
                    className="w-full px-3.5 py-2.5 text-sm bg-white rounded-md border border-neutral-300 focus:border-[#D99A19] focus:outline-none focus:ring-2 focus:ring-[#D99A19]/25"
                  />
                  {errors.businessName && (
                    <p className="mt-1 text-xs text-red-600">{errors.businessName}</p>
                  )}
                </div>

                {/* 3. Mobile Number */}
                <div data-field-error={Boolean(errors.mobileNumber)}>
                  <label htmlFor="dlr-mobile" className="block text-sm font-semibold text-[#171717] mb-1.5">
                    Mobile Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="dlr-mobile"
                    type="tel"
                    value={form.mobileNumber}
                    onChange={(e) => updateField('mobileNumber', e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full px-3.5 py-2.5 text-sm bg-white rounded-md border border-neutral-300 focus:border-[#D99A19] focus:outline-none focus:ring-2 focus:ring-[#D99A19]/25"
                  />
                  {errors.mobileNumber && (
                    <p className="mt-1 text-xs text-red-600">{errors.mobileNumber}</p>
                  )}
                </div>

                {/* 4. WhatsApp Number */}
                <div data-field-error={Boolean(errors.whatsappNumber)}>
                  <label htmlFor="dlr-whatsapp" className="block text-sm font-semibold text-[#171717] mb-1.5">
                    WhatsApp Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="dlr-whatsapp"
                    type="tel"
                    value={form.whatsappNumber}
                    onChange={(e) => updateField('whatsappNumber', e.target.value)}
                    placeholder="10-digit WhatsApp number"
                    className="w-full px-3.5 py-2.5 text-sm bg-white rounded-md border border-neutral-300 focus:border-[#D99A19] focus:outline-none focus:ring-2 focus:ring-[#D99A19]/25"
                  />
                  {errors.whatsappNumber && (
                    <p className="mt-1 text-xs text-red-600">{errors.whatsappNumber}</p>
                  )}
                </div>

                {/* 5. Email */}
                <div data-field-error={Boolean(errors.email)}>
                  <label htmlFor="dlr-email" className="block text-sm font-semibold text-[#171717] mb-1.5">
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="dlr-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="business@example.com"
                    className="w-full px-3.5 py-2.5 text-sm bg-white rounded-md border border-neutral-300 focus:border-[#D99A19] focus:outline-none focus:ring-2 focus:ring-[#D99A19]/25"
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                </div>

                {/* 6. City */}
                <div data-field-error={Boolean(errors.city)}>
                  <label htmlFor="dlr-city" className="block text-sm font-semibold text-[#171717] mb-1.5">
                    City <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="dlr-city"
                    type="text"
                    value={form.city}
                    onChange={(e) => updateField('city', e.target.value)}
                    placeholder="City / District"
                    className="w-full px-3.5 py-2.5 text-sm bg-white rounded-md border border-neutral-300 focus:border-[#D99A19] focus:outline-none focus:ring-2 focus:ring-[#D99A19]/25"
                  />
                  {errors.city && <p className="mt-1 text-xs text-red-600">{errors.city}</p>}
                </div>

                {/* 7. State */}
                <div data-field-error={Boolean(errors.state)}>
                  <label htmlFor="dlr-state" className="block text-sm font-semibold text-[#171717] mb-1.5">
                    State <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="dlr-state"
                    type="text"
                    value={form.state}
                    onChange={(e) => updateField('state', e.target.value)}
                    placeholder="State"
                    className="w-full px-3.5 py-2.5 text-sm bg-white rounded-md border border-neutral-300 focus:border-[#D99A19] focus:outline-none focus:ring-2 focus:ring-[#D99A19]/25"
                  />
                  {errors.state && <p className="mt-1 text-xs text-red-600">{errors.state}</p>}
                </div>

                {/* 8. PIN Code */}
                <div data-field-error={Boolean(errors.pinCode)}>
                  <label htmlFor="dlr-pinCode" className="block text-sm font-semibold text-[#171717] mb-1.5">
                    PIN Code <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="dlr-pinCode"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={form.pinCode}
                    onChange={(e) => updateField('pinCode', e.target.value)}
                    placeholder="6-digit PIN code"
                    className="w-full px-3.5 py-2.5 text-sm bg-white rounded-md border border-neutral-300 focus:border-[#D99A19] focus:outline-none focus:ring-2 focus:ring-[#D99A19]/25"
                  />
                  {errors.pinCode && <p className="mt-1 text-xs text-red-600">{errors.pinCode}</p>}
                </div>

                {/* 9. Business Type */}
                <div data-field-error={Boolean(errors.businessType)}>
                  <label htmlFor="dlr-businessType" className="block text-sm font-semibold text-[#171717] mb-1.5">
                    Business Type <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="dlr-businessType"
                    value={form.businessType}
                    onChange={(e) => updateField('businessType', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white rounded-md border border-neutral-300 focus:border-[#D99A19] focus:outline-none focus:ring-2 focus:ring-[#D99A19]/25"
                  >
                    <option value="">Select Business Type</option>
                    <option value="Dealership">Dealership</option>
                    <option value="Distributor / Stockist">Distributor / Stockist</option>
                    <option value="Wholesaler">Wholesaler</option>
                    <option value="Retailer Partner">Retailer Partner</option>
                    <option value="Bulk Order / EPC Contractor">
                      Bulk Order / EPC Contractor
                    </option>
                  </select>
                  {errors.businessType && (
                    <p className="mt-1 text-xs text-red-600">{errors.businessType}</p>
                  )}
                </div>

                {/* 10. Interested Product Category */}
                <div data-field-error={Boolean(errors.interestedCategory)}>
                  <label htmlFor="dlr-category" className="block text-sm font-semibold text-[#171717] mb-1.5">
                    Interested Product Category <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="dlr-category"
                    value={form.interestedCategory}
                    onChange={(e) => updateField('interestedCategory', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white rounded-md border border-neutral-300 focus:border-[#D99A19] focus:outline-none focus:ring-2 focus:ring-[#D99A19]/25"
                  >
                    <option value="">Select Product Category</option>
                    <option value="All Product Categories">All Product Categories</option>
                    {PRODUCT_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.catalogTitle}>
                        {cat.catalogTitle}
                      </option>
                    ))}
                  </select>
                  {errors.interestedCategory && (
                    <p className="mt-1 text-xs text-red-600">{errors.interestedCategory}</p>
                  )}
                </div>

                {/* 11. Quantity Requirement */}
                <div className="sm:col-span-2" data-field-error={Boolean(errors.quantityRequirement)}>
                  <label htmlFor="dlr-qty" className="block text-sm font-semibold text-[#171717] mb-1.5">
                    Quantity Requirement <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="dlr-qty"
                    type="text"
                    value={form.quantityRequirement}
                    onChange={(e) => updateField('quantityRequirement', e.target.value)}
                    placeholder="e.g. Monthly 200+ coils / Project requirement 5,000 metres"
                    className="w-full px-3.5 py-2.5 text-sm bg-white rounded-md border border-neutral-300 focus:border-[#D99A19] focus:outline-none focus:ring-2 focus:ring-[#D99A19]/25"
                  />
                  {errors.quantityRequirement && (
                    <p className="mt-1 text-xs text-red-600">{errors.quantityRequirement}</p>
                  )}
                </div>

                {/* 12. Message */}
                <div className="sm:col-span-2">
                  <label htmlFor="dlr-message" className="block text-sm font-semibold text-[#171717] mb-1.5">
                    Message (Optional)
                  </label>
                  <textarea
                    id="dlr-message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    placeholder="Share your existing electrical lines, territory coverage, or bulk order timeline..."
                    className="w-full px-3.5 py-2.5 text-sm bg-white rounded-md border border-neutral-300 focus:border-[#D99A19] focus:outline-none focus:ring-2 focus:ring-[#D99A19]/25"
                  />
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-xs text-neutral-600 max-w-md">
                  {siteConfig.backendIntegration.isConfigured
                    ? 'Your application will be submitted directly to our dealership onboarding team.'
                    : 'Validates locally and generates a ready-to-send summary for WhatsApp (+91 96306 83505) until server email credentials are configured.'}
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-extrabold tracking-wide text-[#171717] bg-[#D99A19] hover:bg-[#c58912] disabled:opacity-60 rounded-md transition-colors whitespace-nowrap cursor-pointer"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>
                    {isSubmitting ? 'VALIDATING APPLICATION...' : 'SUBMIT DEALERSHIP APPLICATION'}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
