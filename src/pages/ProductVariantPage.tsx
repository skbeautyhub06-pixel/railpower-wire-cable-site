import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Info,
  MessageSquare,
  Phone,
  MessageCircle,
  ChevronDown,
} from 'lucide-react';
import { getVariantBySlugs } from '../data/products';
import { siteConfig, buildWhatsAppUrl } from '../config/siteConfig';
import { SeoHead } from '../components/SeoHead';
import { ResilientImage } from '../components/ResilientImage';
import { ProductQuotationForm } from '../components/ProductQuotationForm';

export function ProductVariantPage() {
  const { categorySlug, variantSlug } = useParams<{
    categorySlug: string;
    variantSlug: string;
  }>();

  const match =
    categorySlug && variantSlug ? getVariantBySlugs(categorySlug, variantSlug) : undefined;

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColour, setSelectedColour] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    if (match) {
      setSelectedSize(match.variant.availableSizes[0] || '');
      setSelectedColour(match.category.colourOptions?.[0]?.name || '');
      setOpenFaqIndex(0);
    }
  }, [match]);

  if (!match) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center space-y-5">
        <SeoHead
          title="Product Variant Not Found – RAILPOWER WIRE & CABLE"
          description="The requested product variant could not be found."
        />
        <h1 className="text-3xl font-bold text-[#171717]">Product Variant Not Found</h1>
        <p className="text-neutral-600 max-w-md mx-auto">
          The requested product variant could not be located. Browse our full product catalogue
          below.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-[#171717] bg-[#D99A19] rounded-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Products</span>
        </Link>
      </div>
    );
  }

  const { category, variant } = match;
  const siblingVariants = category.variants.filter((v) => v.slug !== variant.slug).slice(0, 3);

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `RAILPOWER ${variant.name}`,
    description: variant.overview,
    category: category.catalogTitle,
    brand: {
      '@type': 'Brand',
      name: 'RAILPOWER WIRE & CABLE',
    },
  };

  return (
    <>
      <SeoHead
        title={`${variant.name} – ${category.name} | RAILPOWER WIRE & CABLE`}
        description={`${variant.shortDescription} Explore construction details, available sizes, and request a quotation from RAILPOWER WIRE & CABLE.`}
        canonicalPath={`/products/${category.slug}/${variant.slug}`}
        structuredData={productSchema}
      />

      {/* 1. PRODUCT HERO BANNER + BREADCRUMB + 2. PRODUCT NAME */}
      <section className="bg-[#171717] text-white py-14 md:py-16 border-b border-neutral-800">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="text-xs sm:text-sm text-neutral-400 mb-4 flex flex-wrap items-center gap-2"
          >
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span aria-hidden="true">&gt;</span>
            <Link to="/products" className="hover:text-white transition-colors">
              Products
            </Link>
            <span aria-hidden="true">&gt;</span>
            <Link to={`/products/${category.slug}`} className="hover:text-white transition-colors">
              {category.name}
            </Link>
            <span aria-hidden="true">&gt;</span>
            <span className="text-[#D99A19] font-semibold">{variant.name}</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-widest text-[#D99A19] mb-2">
                {category.name} · {variant.availabilityLabel}
              </p>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-3">
                {variant.name}
              </h1>
              <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
                {variant.shortDescription}
              </p>
            </div>
            <a
              href="#product-quotation-form"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-[#171717] bg-[#D99A19] hover:bg-[#e5a824] rounded-md transition-colors whitespace-nowrap shrink-0"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Request Product Quotation</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3. PROFESSIONAL PRODUCT IMAGE + 4. INTRODUCTION + 5. FEATURES */}
      <section className="py-12 md:py-16 bg-white border-b border-neutral-200">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-6 space-y-5">
              <div className="aspect-4/3 w-full rounded-lg overflow-hidden border border-neutral-200 bg-[#F5F5F5]">
                <ResilientImage
                  src={variant.image}
                  alt={variant.imageAlt}
                  loading="eager"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-5 rounded-lg bg-[#F5F5F5] border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#B87333]">
                    Instant Trade Support
                  </p>
                  <p className="text-sm font-semibold text-[#171717] mt-0.5">
                    {siteConfig.contact.phoneDisplay} · {siteConfig.contact.officeAddressDisplay}
                  </p>
                </div>
                <div className="flex items-center gap-2.5 shrink-0">
                  <a
                    href={siteConfig.contact.phoneHref}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-[#171717] hover:bg-neutral-800 rounded-md"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#D99A19]" />
                    <span>Call</span>
                  </a>
                  <a
                    href={buildWhatsAppUrl(
                      `Hello RAILPOWER WIRE & CABLE, please share availability and quotation for ${variant.name} (${category.name}).`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#171717] bg-[#D99A19] hover:bg-[#c58912] rounded-md"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#B87333] mb-2">
                  Product Introduction
                </p>
                <h2 className="text-2xl font-bold text-[#171717] mb-3">Overview &amp; Construction</h2>
                <p className="text-base text-neutral-700 leading-relaxed mb-4">
                  {variant.overview}
                </p>
                <div className="p-4 rounded-md bg-[#F5F5F5] border border-neutral-200 space-y-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#171717]">
                      Construction Information
                    </p>
                    <p className="text-sm text-neutral-700 mt-1">{variant.constructionInfo}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-neutral-200 text-xs">
                    <div>
                      <span className="font-bold text-[#171717] block">Conductor Options:</span>
                      <span className="text-neutral-600">
                        {variant.conductorOptions.join(', ')}
                      </span>
                    </div>
                    <div>
                      <span className="font-bold text-[#171717] block">Core Options:</span>
                      <span className="text-neutral-600">{variant.coreOptions.join(', ')}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#171717] mb-3">
                  Product Features
                </h3>
                <ul className="space-y-2.5">
                  {variant.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-neutral-700">
                      <Check className="w-4 h-4 text-[#9A6B06] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRODUCT VARIANTS / OPTIONS & 7. AVAILABLE SIZES */}
      <section className="py-12 md:py-16 bg-[#F5F5F5] border-b border-neutral-200">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className={category.colourOptions ? 'lg:col-span-7' : 'lg:col-span-12'}>
            <p className="text-xs font-bold uppercase tracking-widest text-[#B87333] mb-1">
              Size Options
            </p>
            <h2 className="text-2xl font-bold text-[#171717] mb-2">
              Available Sizes for {variant.name}
            </h2>
            <p className="text-sm text-neutral-600 mb-5">
              Select a size below to pre-fill the quotation request form. Availability and packing
              are confirmed on request.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {variant.availableSizes.map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2.5 text-sm font-mono font-semibold rounded-md border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#171717] text-[#D99A19] border-[#171717]'
                        : 'bg-white text-[#171717] border-neutral-200 hover:border-[#D99A19]'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {category.colourOptions && (
            <div className="lg:col-span-5 bg-white border border-neutral-200 rounded-lg p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[#B87333] mb-1">
                Colour Selector
              </p>
              <h2 className="text-xl font-bold text-[#171717] mb-1">Available Colour Options</h2>
              <p className="text-xs text-neutral-600 mb-4">
                Colour options are subject to confirmation.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {category.colourOptions.map((c) => {
                  const isSelected = selectedColour === c.name;
                  return (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColour(c.name)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md border text-sm font-semibold cursor-pointer ${
                        isSelected
                          ? 'border-[#171717] bg-[#F5F5F5] text-[#171717]'
                          : 'border-neutral-200 bg-white text-neutral-700 hover:border-[#D99A19]'
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded-sm shrink-0 border ${
                          c.borderClass || 'border-black/10'
                        }`}
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 8. TECHNICAL SPECIFICATIONS & 9. APPLICATIONS */}
      <section className="py-12 md:py-16 bg-white border-b border-neutral-200">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#B87333] mb-1">
                  Specification Sheet
                </p>
                <h2 className="text-2xl font-bold text-[#171717]">Technical Specifications</h2>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-600 bg-[#F5F5F5] border border-neutral-200 rounded-md px-3 py-2">
                <Info className="w-4 h-4 text-[#9A6B06] shrink-0" />
                <span>Editable in src/data/products.ts · Subject to company confirmation</span>
              </div>
            </div>

            <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#171717] text-white text-xs uppercase tracking-wider">
                      <th className="py-3.5 px-5 font-semibold">Parameter</th>
                      <th className="py-3.5 px-5 font-semibold">Specification Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 text-sm">
                    {variant.technicalSpecs.map((row) => (
                      <tr key={row.parameter}>
                        <td className="py-3.5 px-5 font-semibold text-[#171717] w-2/5">
                          {row.parameter}
                        </td>
                        <td className="py-3.5 px-5 font-mono text-xs sm:text-sm text-neutral-700">
                          {row.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <p className="text-xs font-bold uppercase tracking-widest text-[#B87333] mb-1">
              Usage Sectors
            </p>
            <h2 className="text-2xl font-bold text-[#171717] mb-5">Applications</h2>
            <div className="space-y-2.5">
              {variant.applications.map((app, idx) => (
                <div
                  key={app}
                  className="flex items-center gap-3 p-4 rounded-lg bg-[#F5F5F5] border border-neutral-200"
                >
                  <span className="font-mono text-xs font-bold text-[#9A6B06]">
                    0{idx + 1}.
                  </span>
                  <span className="text-sm font-semibold text-[#171717]">{app}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 12. PRODUCT ENQUIRY FORM */}
      <section className="py-12 md:py-16 bg-[#F5F5F5] border-b border-neutral-200">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <ProductQuotationForm
            categoryName={category.name}
            productTypes={category.variants.map((v) => v.name)}
            defaultProductType={variant.name}
            availableSizes={variant.availableSizes}
            defaultSize={selectedSize}
            colourOptions={category.colourOptions}
            defaultColour={selectedColour}
          />
        </div>
      </section>

      {/* 11. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-12 md:py-16 bg-white border-b border-neutral-200">
        <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-[#B87333] mb-1">
              Product FAQ
            </p>
            <h2 className="text-2xl font-bold text-[#171717]">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {variant.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.question}
                  className="bg-[#F5F5F5] border border-neutral-200 rounded-lg overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#171717] cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-[#9A6B06]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-2 text-sm text-neutral-700 bg-white border-t border-neutral-200 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. RELATED PRODUCTS */}
      <section className="py-12 md:py-16 bg-[#F5F5F5]">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[#171717]">
              More Options in {category.name}
            </h2>
            <Link
              to={`/products/${category.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#9A6B06] hover:text-[#171717]"
            >
              <span>Back to {category.name}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {siblingVariants.map((sib) => (
              <Link
                key={sib.slug}
                to={`/products/${category.slug}/${sib.slug}`}
                className="group border border-neutral-200 rounded-lg overflow-hidden bg-white hover:border-[#D99A19] transition-colors"
              >
                <div className="aspect-4/3 w-full bg-[#F5F5F5] overflow-hidden">
                  <ResilientImage
                    src={sib.image}
                    alt={sib.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs text-neutral-500 mb-1">{sib.availabilityLabel}</p>
                  <h3 className="text-base font-bold text-[#171717] group-hover:text-[#9A6B06]">
                    {sib.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
