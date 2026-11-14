import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, FileDown, ArrowRight, Phone } from 'lucide-react';
import { PRODUCT_CATEGORIES, type ProductCategory } from '../data/products';
import { siteConfig } from '../config/siteConfig';
import { SeoHead } from '../components/SeoHead';
import { ProductCard } from '../components/ProductCard';
import type { LayoutOutletProps } from '../components/Layout';

const FILTER_OPTIONS: Array<'All' | ProductCategory['categoryGroup']> = [
  'All',
  'Building & Residential',
  'Industrial & Power',
  'Conductors & Special',
];

export function ProductsPage({ openEnquiryModal, openCatalogueModal }: LayoutOutletProps) {
  const [selectedGroup, setSelectedGroup] = useState<'All' | ProductCategory['categoryGroup']>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = useMemo(() => {
    return PRODUCT_CATEGORIES.filter((category) => {
      const matchesGroup = selectedGroup === 'All' || category.categoryGroup === selectedGroup;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        category.name.toLowerCase().includes(q) ||
        category.catalogTitle.toLowerCase().includes(q) ||
        category.shortDescription.toLowerCase().includes(q) ||
        category.variants.some((v) => v.name.toLowerCase().includes(q));
      return matchesGroup && matchesSearch;
    });
  }, [selectedGroup, searchQuery]);

  return (
    <>
      <SeoHead
        title="Products Catalogue – RAILPOWER WIRE & CABLE | House Wires, PVC, Industrial & Power Cables"
        description="Explore RAILPOWER WIRE & CABLE's complete product catalogue: House Wires, PVC Wires, Industrial Cables, Aluminium Conductors, Power Cables, Flexible Wires, and Special Cables."
        canonicalPath="/products"
      />

      {/* Header Banner */}
      <section className="bg-[#171717] text-white py-16 md:py-20 border-b border-neutral-800">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <nav aria-label="Breadcrumb" className="text-xs text-neutral-400 mb-3 flex items-center gap-2">
              <Link to="/" className="hover:text-white">
                Home
              </Link>
              <span aria-hidden="true">&gt;</span>
              <span className="text-[#D99A19] font-semibold">Products</span>
            </nav>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Complete Wire &amp; Cable Catalogue
            </h1>
            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed">
              Select a primary product category below to explore dedicated product families, size
              options, technical specifications, and quotation support.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={siteConfig.contact.phoneHref}
              className="inline-flex items-center gap-2 px-4 py-3 text-sm font-bold text-white border border-neutral-700 hover:border-[#D99A19] rounded-md transition-colors whitespace-nowrap"
            >
              <Phone className="w-4 h-4 text-[#D99A19]" />
              <span>{siteConfig.contact.phoneDisplay}</span>
            </a>
            <button
              type="button"
              onClick={openCatalogueModal}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-[#171717] bg-[#D99A19] hover:bg-[#e5a824] rounded-md transition-colors whitespace-nowrap cursor-pointer"
            >
              <FileDown className="w-4 h-4" aria-hidden="true" />
              <span>Download Catalogue</span>
            </button>
          </div>
        </div>
      </section>

      {/* Quick Category Jump Bar & Search */}
      <section className="bg-white border-b border-neutral-200 sticky top-16 md:top-20 z-30">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div
            role="group"
            aria-label="Filter product categories"
            className="flex flex-wrap items-center gap-1.5"
          >
            {FILTER_OPTIONS.map((group) => {
              const isActive = selectedGroup === group;
              return (
                <button
                  key={group}
                  type="button"
                  onClick={() => setSelectedGroup(group)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#171717] text-[#D99A19]'
                      : 'bg-[#F5F5F5] text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {group}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-80">
            <Search
              className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search wire, XLPE, ACSR, solar..."
              aria-label="Search product categories and variants"
              className="w-full pl-10 pr-4 py-2 text-sm bg-[#F5F5F5] border border-neutral-200 rounded-md focus:bg-white focus:border-[#D99A19] focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* Main Category Cards */}
      <section className="py-12 md:py-16 bg-[#F5F5F5] border-b border-neutral-200">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          {filteredCategories.length === 0 ? (
            <div className="bg-white border border-neutral-200 rounded-lg p-12 text-center space-y-3">
              <p className="text-lg font-bold text-[#171717]">No matching product categories found</p>
              <p className="text-sm text-neutral-600">
                Try clearing your search or switching back to All categories.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedGroup('All');
                  setSearchQuery('');
                }}
                className="inline-flex items-center px-4 py-2 text-sm font-bold text-[#171717] bg-[#D99A19] rounded-md cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredCategories.map((category, index) => (
                <ProductCard
                  key={category.id}
                  product={category}
                  index={index}
                  onEnquire={(name) => openEnquiryModal(name)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Complete Catalogue Directory Matrix */}
      <section className="py-14 md:py-20 bg-white border-b border-neutral-200">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-[#B87333] mb-2">
              Quick Index
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#171717] tracking-tight">
              Browse All Product Families by Category
            </h2>
            <p className="text-sm text-neutral-600 mt-2">
              Click any individual product family below to view construction information,
              applications, editable specifications, and quotation options.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCT_CATEGORIES.map((category) => (
              <div
                key={category.id}
                className="border border-neutral-200 rounded-lg p-6 bg-[#F5F5F5] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-neutral-200">
                    <Link
                      to={`/products/${category.slug}`}
                      className="text-lg font-bold text-[#171717] hover:text-[#9A6B06]"
                    >
                      {category.name}
                    </Link>
                    <Link
                      to={`/products/${category.slug}`}
                      className="text-xs font-bold text-[#9A6B06] hover:underline whitespace-nowrap"
                    >
                      Category Page
                    </Link>
                  </div>
                  <ul className="space-y-2">
                    {category.variants.map((variant) => (
                      <li key={variant.slug}>
                        <Link
                          to={`/products/${category.slug}/${variant.slug}`}
                          className="flex items-center justify-between text-sm text-neutral-700 hover:text-[#171717] group py-0.5"
                        >
                          <span className="group-hover:underline">{variant.name}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#9A6B06]" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloadable Product Catalogue Banner */}
      <section className="py-12 bg-[#171717] text-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <h2 className="text-2xl font-bold">Need the Official RAILPOWER Product Catalogue?</h2>
            <p className="text-sm text-neutral-300">
              {siteConfig.catalogue.pdfUrl
                ? 'Download our latest PDF brochure with full product listings.'
                : 'Our downloadable PDF catalogue section is prepared for future official PDF integration. Request current pricing or trade sheets directly via WhatsApp or phone.'}
            </p>
          </div>
          <button
            type="button"
            onClick={openCatalogueModal}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-[#171717] bg-[#D99A19] hover:bg-[#e5a824] rounded-md transition-colors whitespace-nowrap cursor-pointer"
          >
            <FileDown className="w-4 h-4" />
            <span>Download Catalogue</span>
          </button>
        </div>
      </section>
    </>
  );
}
