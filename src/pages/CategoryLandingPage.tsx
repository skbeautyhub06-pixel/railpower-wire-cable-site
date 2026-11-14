import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Info,
  MessageSquare,
  ChevronDown,
  Phone,
  MessageCircle,
  FileDown,
} from 'lucide-react';
import { getCategoryBySlug, PRODUCT_CATEGORIES } from '../data/products';
import { siteConfig, buildWhatsAppUrl } from '../config/siteConfig';
import { SeoHead } from '../components/SeoHead';
import { ResilientImage } from '../components/ResilientImage';
import { ProductQuotationForm } from '../components/ProductQuotationForm';
import type { LayoutOutletProps } from '../components/Layout';

export function CategoryLandingPage({ openCatalogueModal }: LayoutOutletProps) {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const category = categorySlug ? getCategoryBySlug(categorySlug) : undefined;

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColour, setSelectedColour] = useState<string>('');
  const [selectedProductType, setSelectedProductType] = useState<string>('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    if (category) {
      setSelectedSize(category.availableSizes[0] || '');
      setSelectedColour(category.colourOptions?.[0]?.name || '');
      setSelectedProductType(category.variants[0]?.name || category.name);
      setOpenFaqIndex(0);
    }
  }, [category]);

  if (!category) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center space-y-5">
        <SeoHead
          title="Product Category Not Found – RAILPOWER WIRE & CABLE"
          description="The requested product category could not be found."
        />
        <h1 className="text-3xl font-bold text-[#171717]">Product Category Not Found</h1>
        <p className="text-neutral-600 max-w-md mx-auto">
          The product category you requested could not be located. Browse all seven wire and cable
          categories below.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-[#171717] bg-[#D99A19] rounded-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>View All Product Categories</span>
        </Link>
      </div>
    );
  }

  const relatedCategories = PRODUCT_CATEGORIES.filter((c) => c.slug !== category.slug).slice(0, 3);

  const handleVariantEnquire = (variantName: string) => {
    setSelectedProductType(variantName);
    const formEl = document.getElementById('product-quotation-form');
    formEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const categorySchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.pageHeading} – RAILPOWER WIRE & CABLE`,
    description: category.shortDescription,
  };

  return (
    <>
      <SeoHead
        title={`${category.catalogTitle} – RAILPOWER WIRE & CABLE`}
        description={`${category.subheading} Explore ${category.variants.length} selectable product options, reference sizes, specifications, and request a quotation from RAILPOWER WIRE & CABLE.`}
        canonicalPath={`/products/${category.slug}`}
        structuredData={categorySchema}
      />

      {/* 1. PRODUCT HERO BANNER + BREADCRUMB + 2. PRODUCT NAME */}
      <section className="bg-[#171717] text-white py-14 md:py-20 border-b border-neutral-800">
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
            <span className="text-[#D99A19] font-semibold">{category.name}</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-widest text-[#D99A19] mb-2">
                {category.categoryGroup}
              </p>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
                {category.pageHeading}
              </h1>
              <p className="text-base sm:text-xl text-neutral-200 leading-relaxed">
                {category.subheading}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href="#product-quotation-form"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-[#171717] bg-[#D99A19] hover:bg-[#e5a824] rounded-md transition-colors whitespace-nowrap"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Request Quotation</span>
              </a>
              <button
                type="button"
                onClick={openCatalogueModal}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-white border border-neutral-600 hover:border-[#D99A19] rounded-md transition-colors whitespace-nowrap cursor-pointer"
              >
                <FileDown className="w-4 h-4 text-[#D99A19]" />
                <span>Download Catalogue</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROFESSIONAL PRODUCT IMAGE + 4. PRODUCT INTRODUCTION + 5. PRODUCT FEATURES */}
      <section className="py-12 md:py-16 bg-white border-b border-neutral-200">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Image + Quick Contact Strip */}
            <div className="lg:col-span-6 space-y-5">
              <div className="aspect-4/3 w-full rounded-lg overflow-hidden border border-neutral-200 bg-[#F5F5F5]">
                <ResilientImage
                  src={category.image}
                  alt={category.imageAlt}
                  loading="eager"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-5 rounded-lg bg-[#F5F5F5] border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#B87333]">
                    Direct Product Enquiry
                  </p>
                  <p className="text-sm font-semibold text-[#171717] mt-0.5">
                    Speak with RAILPOWER Sales: {siteConfig.contact.phoneDisplay}
                  </p>
                </div>
                <div className="flex items-center gap-2.5 shrink-0">
                  <a
                    href={siteConfig.contact.phoneHref}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-[#171717] hover:bg-neutral-800 rounded-md"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#D99A19]" />
                    <span>Call Now</span>
                  </a>
                  <a
                    href={buildWhatsAppUrl(
                      `Hello RAILPOWER WIRE & CABLE, I would like information and pricing for ${category.catalogTitle}.`
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

            {/* Introduction, Construction & Features */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#B87333] mb-2">
                  Product Introduction
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#171717] tracking-tight mb-3">
                  {category.catalogTitle} Overview
                </h2>
                <p className="text-base text-neutral-700 leading-relaxed mb-4">
                  {category.overview}
                </p>
                <div className="p-4 rounded-md bg-[#F5F5F5] border border-neutral-200">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#171717] mb-1">
                    Construction Overview
                  </h3>
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    {category.constructionInfo}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#171717] mb-3">
                  Product Features
                </h3>
                <ul className="space-y-2.5">
                  {category.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-neutral-700">
                      <Check className="w-4 h-4 text-[#9A6B06] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRODUCT VARIANTS (WITH INDIVIDUAL DETAIL PAGE LINKS & ENQUIRY) */}
      <section className="py-12 md:py-16 bg-[#F5F5F5] border-b border-neutral-200">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#B87333] mb-1">
                Product Families &amp; Variants
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171717] tracking-tight">
                Selectable {category.name} Options ({category.variants.length})
              </h2>
            </div>
            <p className="text-xs text-neutral-600 max-w-md bg-white border border-neutral-200 rounded-md px-3.5 py-2">
              Note: Listed product families represent selectable catalogue categories. Exact supply
              availability is confirmed upon enquiry.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.variants.map((variant, idx) => (
              <article
                key={variant.slug}
                className="group bg-white border border-neutral-200 rounded-lg overflow-hidden flex flex-col hover:border-[#D99A19] transition-colors"
              >
                <Link
                  to={`/products/${category.slug}/${variant.slug}`}
                  className="block aspect-4/3 w-full bg-[#F5F5F5] overflow-hidden"
                >
                  <ResilientImage
                    src={variant.image}
                    alt={variant.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                </Link>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between gap-2 text-xs text-neutral-500 mb-2">
                    <span className="font-mono text-[#9A6B06]">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="font-medium text-neutral-600">
                      {variant.availabilityLabel}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#171717] mb-2">
                    <Link
                      to={`/products/${category.slug}/${variant.slug}`}
                      className="hover:text-[#9A6B06] transition-colors"
                    >
                      {variant.name}
                    </Link>
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed mb-4 flex-1">
                    {variant.shortDescription}
                  </p>
                  <div className="text-xs text-neutral-500 mb-5">
                    <span className="font-semibold text-neutral-700">Conductor: </span>
                    {variant.conductorOptions.join(', ')}
                  </div>
                  <div className="flex items-center gap-2.5 pt-4 border-t border-neutral-100">
                    <Link
                      to={`/products/${category.slug}/${variant.slug}`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold text-[#171717] bg-[#F5F5F5] hover:bg-neutral-200 rounded-md transition-colors whitespace-nowrap"
                    >
                      <span>View Specs</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleVariantEnquire(variant.name)}
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-bold text-[#171717] bg-[#D99A19] hover:bg-[#c58912] rounded-md transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <span>Enquire</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7. AVAILABLE SIZES & COLOUR SELECTOR */}
      <section className="py-12 md:py-16 bg-white border-b border-neutral-200">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Interactive Size Selector */}
          <div className={category.colourOptions ? 'lg:col-span-7' : 'lg:col-span-12'}>
            <p className="text-xs font-bold uppercase tracking-widest text-[#B87333] mb-1">
              Conductor Cross-Sections
            </p>
            <h2 className="text-2xl font-bold text-[#171717] mb-2">
              Available Sizes (Select to Pre-fill Quotation)
            </h2>
            <p className="text-sm text-neutral-600 mb-5">
              Click any reference size below to select it for your product quotation request. All
              sizes are subject to order confirmation.
            </p>

            <div className="flex flex-wrap gap-2.5">
              {category.availableSizes.map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2.5 text-sm font-mono font-semibold rounded-md border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#171717] text-[#D99A19] border-[#171717]'
                        : 'bg-[#F5F5F5] text-[#171717] border-neutral-200 hover:border-[#D99A19]'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Colour Selector (where applicable) */}
          {category.colourOptions && (
            <div className="lg:col-span-5 bg-[#F5F5F5] border border-neutral-200 rounded-lg p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[#B87333] mb-1">
                Insulation Colours
              </p>
              <h2 className="text-xl font-bold text-[#171717] mb-1">Available Colour Options</h2>
              <p className="text-xs text-neutral-600 mb-4">
                Colour options shown below are subject to stock and production confirmation.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {category.colourOptions.map((c) => {
                  const isSelected = selectedColour === c.name;
                  return (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColour(c.name)}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-md border text-sm font-semibold transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-white border-[#171717] text-[#171717] ring-2 ring-[#D99A19]/40'
                          : 'bg-white border-neutral-200 text-neutral-700 hover:border-[#D99A19]'
                      }`}
                    >
                      <span
                        aria-hidden="true"
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
      <section className="py-12 md:py-16 bg-[#F5F5F5] border-b border-neutral-200">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Technical Specifications Table */}
          <div className="lg:col-span-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#B87333] mb-1">
                  Configurable Datasheet
                </p>
                <h2 className="text-2xl font-bold text-[#171717]">Technical Specifications</h2>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-600 bg-white border border-neutral-200 rounded-md px-3 py-2">
                <Info className="w-4 h-4 text-[#9A6B06] shrink-0" />
                <span>Editable in src/data/products.ts · Subject to confirmation</span>
              </div>
            </div>

            <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#171717] text-white text-xs uppercase tracking-wider">
                      <th className="py-3.5 px-5 font-semibold">Specification Parameter</th>
                      <th className="py-3.5 px-5 font-semibold">Details (Subject to Confirmation)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 text-sm">
                    {category.technicalSpecs.map((row) => (
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

          {/* 9. Applications */}
          <div className="lg:col-span-4">
            <p className="text-xs font-bold uppercase tracking-widest text-[#B87333] mb-1">
              Usage Sectors
            </p>
            <h2 className="text-2xl font-bold text-[#171717] mb-5">Applications</h2>
            <div className="space-y-2.5">
              {category.applications.map((app, idx) => (
                <div
                  key={app}
                  className="flex items-center gap-3 p-4 rounded-lg bg-white border border-neutral-200"
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
      <section className="py-12 md:py-16 bg-white border-b border-neutral-200">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <ProductQuotationForm
            categoryName={category.catalogTitle}
            productTypes={category.variants.map((v) => v.name)}
            defaultProductType={selectedProductType}
            availableSizes={category.availableSizes}
            defaultSize={selectedSize}
            colourOptions={category.colourOptions}
            defaultColour={selectedColour}
          />
        </div>
      </section>

      {/* 11. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-12 md:py-16 bg-[#F5F5F5] border-b border-neutral-200">
        <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-[#B87333] mb-1">
              Buyer Questions
            </p>
            <h2 className="text-2xl font-bold text-[#171717]">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {category.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.question}
                  className="bg-white border border-neutral-200 rounded-lg overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#171717] hover:bg-neutral-50 cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-[#9A6B06]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-sm text-neutral-600 leading-relaxed border-t border-neutral-100">
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
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[#171717]">Related Product Categories</h2>
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#9A6B06] hover:text-[#171717]"
            >
              <span>All Categories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedCategories.map((rel) => (
              <Link
                key={rel.id}
                to={`/products/${rel.slug}`}
                className="group border border-neutral-200 rounded-lg overflow-hidden bg-white hover:border-[#D99A19] transition-colors"
              >
                <div className="aspect-4/3 w-full bg-[#F5F5F5] overflow-hidden">
                  <ResilientImage
                    src={rel.image}
                    alt={rel.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs text-neutral-500 mb-1">{rel.categoryGroup}</p>
                  <h3 className="text-base font-bold text-[#171717] group-hover:text-[#9A6B06]">
                    {rel.catalogTitle}
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
