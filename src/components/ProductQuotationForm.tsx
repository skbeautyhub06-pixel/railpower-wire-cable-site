import { useState, useEffect } from 'react';
import { Phone, MessageCircle, CheckCircle2, AlertCircle, Send } from 'lucide-react';
import { siteConfig, buildWhatsAppUrl } from '../config/siteConfig';
import type { ProductColourOption } from '../data/products';
import {
  submitProductQuotation,
  validatePhoneNumber,
  type SubmissionResult,
} from '../services/enquiryService';

interface ProductQuotationFormProps {
  categoryName: string;
  productTypes: string[];
  defaultProductType?: string;
  availableSizes: string[];
  defaultSize?: string;
  colourOptions?: ProductColourOption[];
  defaultColour?: string;
}

interface FormErrors {
  productType?: string;
  wireSize?: string;
  quantity?: string;
  name?: string;
  mobileNumber?: string;
}

export function ProductQuotationForm({
  categoryName,
  productTypes,
  defaultProductType,
  availableSizes,
  defaultSize,
  colourOptions,
  defaultColour,
}: ProductQuotationFormProps) {
  const [productType, setProductType] = useState(defaultProductType || productTypes[0] || categoryName);
  const [wireSize, setWireSize] = useState(defaultSize || availableSizes[0] || '');
  const [colour, setColour] = useState(defaultColour || colourOptions?.[0]?.name || '');
  const [quantity, setQuantity] = useState('');
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [result, setResult] = useState<SubmissionResult | null>(null);

  useEffect(() => {
    if (defaultProductType) setProductType(defaultProductType);
  }, [defaultProductType]);

  useEffect(() => {
    if (defaultSize) setWireSize(defaultSize);
  }, [defaultSize]);

  useEffect(() => {
    if (defaultColour) setColour(defaultColour);
  }, [defaultColour]);

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};
    if (!productType.trim()) nextErrors.productType = 'Please select a product type.';
    if (!wireSize.trim()) nextErrors.wireSize = 'Please select a wire/cable size.';
    if (!quantity.trim()) nextErrors.quantity = 'Please enter approximate quantity required.';
    if (!name.trim() || name.trim().length < 2) nextErrors.name = 'Please enter your name.';
    if (!validatePhoneNumber(mobileNumber)) {
      nextErrors.mobileNumber = 'Please enter a valid 10-digit mobile number.';
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
      const res = await submitProductQuotation({
        categoryName,
        productType,
        wireSize,
        colour: colourOptions ? colour : undefined,
        quantity: quantity.trim(),
        name: name.trim(),
        mobileNumber: mobileNumber.trim(),
        message: message.trim(),
      });
      setResult(res);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'Unable to prepare quotation request. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="product-quotation-form"
      className="bg-white border border-neutral-200 rounded-lg overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Info Panel */}
        <div className="lg:col-span-4 bg-[#171717] text-white p-7 sm:p-8 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-[#D99A19]">
              Direct Sales &amp; Trade Desk
            </p>
            <h3 className="text-2xl font-bold tracking-tight">
              Request Product Quotation
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Select your preferred product variant, conductor size, and approximate quantity to
              receive confirmation on availability and trade pricing.
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-neutral-800 text-sm">
            <div>
              <p className="text-xs text-neutral-400 mb-1">Official Business Phone</p>
              <a
                href={siteConfig.contact.phoneHref}
                className="inline-flex items-center gap-2 font-mono font-bold text-white hover:text-[#D99A19] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#D99A19]" />
                <span>{siteConfig.contact.phoneDisplay}</span>
              </a>
            </div>

            <div>
              <p className="text-xs text-neutral-400 mb-1">Business Location</p>
              <p className="text-neutral-200">{siteConfig.contact.officeAddressDisplay}</p>
            </div>

            <div className="pt-2">
              <a
                href={buildWhatsAppUrl(
                  `Hello RAILPOWER WIRE & CABLE, I need a quotation for ${productType} (${wireSize}${
                    colour ? `, ${colour}` : ''
                  }).`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-bold text-[#171717] bg-[#D99A19] hover:bg-[#e5a824] rounded-md transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: {siteConfig.contact.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="lg:col-span-8 p-7 sm:p-8">
          {result ? (
            <div className="space-y-5">
              <div className="flex items-start gap-3 p-4 rounded-md bg-[#F5F5F5] border border-neutral-200">
                <CheckCircle2 className="w-6 h-6 text-[#9A6B06] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-[#171717]">{result.title}</h4>
                  <p className="text-xs font-mono text-neutral-600">Ref: {result.referenceId}</p>
                  <p className="text-sm text-neutral-700 leading-relaxed">{result.detail}</p>
                </div>
              </div>

              <pre className="bg-[#F5F5F5] border border-neutral-200 rounded-md p-4 text-xs font-mono text-neutral-700 whitespace-pre-wrap">
                {result.formattedSummary}
              </pre>

              <div className="flex flex-wrap gap-3">
                <a
                  href={buildWhatsAppUrl(result.formattedSummary)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-[#171717] bg-[#D99A19] hover:bg-[#c58912] rounded-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Quotation via WhatsApp</span>
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
                  onClick={() => setResult(null)}
                  className="px-4 py-3 text-sm font-semibold text-neutral-700 hover:text-[#171717] cursor-pointer"
                >
                  Request Another Quote
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {submitError && (
                <div className="flex items-start gap-2.5 p-3 rounded-md bg-red-50 border border-red-200 text-red-800 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="qt-type" className="block text-sm font-semibold text-[#171717] mb-1">
                    Product Type <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="qt-type"
                    value={productType}
                    onChange={(e) => setProductType(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white rounded-md border border-neutral-300 focus:border-[#D99A19] focus:outline-none focus:ring-2 focus:ring-[#D99A19]/25"
                  >
                    {productTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.productType && (
                    <p className="mt-1 text-xs text-red-600">{errors.productType}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="qt-size" className="block text-sm font-semibold text-[#171717] mb-1">
                    Wire / Cable Size <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="qt-size"
                    value={wireSize}
                    onChange={(e) => setWireSize(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white rounded-md border border-neutral-300 focus:border-[#D99A19] focus:outline-none focus:ring-2 focus:ring-[#D99A19]/25"
                  >
                    {availableSizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                  {errors.wireSize && (
                    <p className="mt-1 text-xs text-red-600">{errors.wireSize}</p>
                  )}
                </div>

                {colourOptions && colourOptions.length > 0 && (
                  <div>
                    <label htmlFor="qt-colour" className="block text-sm font-semibold text-[#171717] mb-1">
                      Colour Option <span className="text-xs font-normal text-neutral-500">(Subject to confirmation)</span>
                    </label>
                    <select
                      id="qt-colour"
                      value={colour}
                      onChange={(e) => setColour(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white rounded-md border border-neutral-300 focus:border-[#D99A19] focus:outline-none focus:ring-2 focus:ring-[#D99A19]/25"
                    >
                      {colourOptions.map((c) => (
                        <option key={c.name} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label htmlFor="qt-qty" className="block text-sm font-semibold text-[#171717] mb-1">
                    Quantity <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="qt-qty"
                    type="text"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="e.g. 50 coils / 2000 metres"
                    className="w-full px-3.5 py-2.5 text-sm rounded-md border border-neutral-300 focus:border-[#D99A19] focus:outline-none focus:ring-2 focus:ring-[#D99A19]/25"
                  />
                  {errors.quantity && (
                    <p className="mt-1 text-xs text-red-600">{errors.quantity}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="qt-name" className="block text-sm font-semibold text-[#171717] mb-1">
                    Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="qt-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full px-3.5 py-2.5 text-sm rounded-md border border-neutral-300 focus:border-[#D99A19] focus:outline-none focus:ring-2 focus:ring-[#D99A19]/25"
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="qt-mobile" className="block text-sm font-semibold text-[#171717] mb-1">
                    Mobile Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="qt-mobile"
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
              </div>

              <div>
                <label htmlFor="qt-message" className="block text-sm font-semibold text-[#171717] mb-1">
                  Message / Delivery City (Optional)
                </label>
                <textarea
                  id="qt-message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share delivery location, dealer enquiry notes, or conductor preferences..."
                  className="w-full px-3.5 py-2.5 text-sm rounded-md border border-neutral-300 focus:border-[#D99A19] focus:outline-none focus:ring-2 focus:ring-[#D99A19]/25"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-extrabold tracking-wide text-[#171717] bg-[#D99A19] hover:bg-[#c58912] disabled:opacity-60 rounded-md transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>{isSubmitting ? 'VALIDATING...' : 'REQUEST PRODUCT QUOTATION'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
