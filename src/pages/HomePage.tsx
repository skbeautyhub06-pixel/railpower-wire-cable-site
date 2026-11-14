import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  Headphones,
  Handshake,
  Building2,
  Home,
  Factory,
  Landmark,
  Wrench,
  FileDown,
  MessageSquare,
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { PRODUCT_CATEGORIES } from '../data/products';
import { SeoHead } from '../components/SeoHead';
import { ResilientImage } from '../components/ResilientImage';
import { ProductCard } from '../components/ProductCard';
import type { LayoutOutletProps } from '../components/Layout';

const WHY_CHOOSE_US = [
  {
    title: 'Quality-Focused Approach',
    description:
      'Disciplined attention to raw material selection, conductor consistency, and systematic pre-dispatch inspection across every batch.',
    icon: ShieldCheck,
  },
  {
    title: 'Reliable Electrical Solutions',
    description:
      'Engineered to support dependable residential wiring, commercial distribution panels, and continuous industrial operations.',
    icon: Zap,
  },
  {
    title: 'Wide Product Range',
    description:
      'Seven dedicated wire and cable categories covering house wires, flexible cords, power cables, and aluminium conductors.',
    icon: Layers,
  },
  {
    title: 'Customer-Oriented Service',
    description:
      'Responsive enquiry handling, clear order coordination, and dependable dispatch schedules for buyers and contractors.',
    icon: Headphones,
  },
  {
    title: 'Dealer & Distributor Opportunities',
    description:
      'Transparent trade policies and growth-oriented partnership opportunities for electrical dealers and regional distributors.',
    icon: Handshake,
  },
];

const INDUSTRY_APPLICATIONS = [
  {
    title: 'Residential Buildings',
    description: 'Internal conduit wiring, lighting circuits, and domestic distribution boards.',
    icon: Home,
  },
  {
    title: 'Commercial Projects',
    description: 'Offices, retail spaces, hospitality complexes, and institutional buildings.',
    icon: Building2,
  },
  {
    title: 'Industrial Facilities',
    description: 'Manufacturing units, workshops, heavy machinery feeders, and control panels.',
    icon: Factory,
  },
  {
    title: 'Infrastructure',
    description: 'Overhead distribution networks, utility lines, and public campus feeders.',
    icon: Landmark,
  },
  {
    title: 'Electrical Installations',
    description: 'Switchgear assemblies, contractor installations, and panel interconnections.',
    icon: Wrench,
  },
];

export function HomePage({ openEnquiryModal, openCatalogueModal }: LayoutOutletProps) {
  return (
    <>
      <SeoHead
        title="RAILPOWER WIRE & CABLE – Electrical Wire & Cable Solutions"
        description="RAILPOWER WIRE & CABLE is an electrical wire and cable supplier offering house wires, PVC insulated wires, flexible wires, industrial cables, aluminium conductors, and dealership opportunities."
        canonicalPath="/"
      />

      {/* SECTION A: HERO BANNER */}
      <section className="relative bg-[#171717] text-white overflow-hidden">
        <div className="absolute inset-0">
          <ResilientImage
            src={siteConfig.media.heroCopperCables}
            alt="RAILPOWER high-purity copper electrical wires and power cables inside a modern manufacturing plant"
            loading="eager"
            className="w-full h-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#171717]/95 via-[#171717]/82 to-[#171717]/45"
          />
        </div>

        <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
          <div className="max-w-3xl">
            <p className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#D99A19] mb-4">
              RAILPOWER WIRE &amp; CABLE
            </p>
            <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight leading-[1.1] text-white mb-6">
              POWERING CONNECTIONS.
              <br />
              BUILDING A STRONGER TOMORROW.
            </h1>
            <p className="text-base sm:text-xl text-neutral-200 leading-relaxed max-w-2xl mb-9">
              Reliable Electrical Wire &amp; Cable Solutions for Homes, Industries and Infrastructure.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-bold text-[#171717] bg-[#D99A19] hover:bg-[#e5a824] rounded-md transition-colors whitespace-nowrap shadow-sm"
              >
                <span>Explore Our Products</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                to="/dealership"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-bold text-white border border-white/40 hover:border-[#D99A19] hover:text-[#D99A19] bg-black/30 rounded-md transition-colors whitespace-nowrap"
              >
                <span>Become a Dealer</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION B: INTRODUCTION */}
      <section className="py-16 md:py-24 bg-white border-b border-neutral-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-center space-y-5">
              <p className="text-xs font-bold uppercase tracking-widest text-[#B87333]">
                About Our Company
              </p>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#171717] tracking-tight">
                Welcome to RAILPOWER WIRE &amp; CABLE
              </h2>
              <p className="text-base sm:text-lg text-neutral-700 leading-relaxed">
                RAILPOWER WIRE &amp; CABLE is focused on providing electrical wire and cable
                solutions for residential, commercial and industrial applications. Our product
                portfolio is designed to serve the diverse requirements of the electrical industry.
              </p>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                From internal residential conduit wiring to heavy industrial feeders and overhead
                distribution lines, we partner with electrical dealers, contractors, and institutional
                buyers to ensure consistent supply and reliable support.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-[#171717] hover:bg-neutral-800 rounded-md transition-colors whitespace-nowrap"
                >
                  <span>Read About Us</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <button
                  type="button"
                  onClick={openCatalogueModal}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#171717] border border-neutral-300 hover:border-[#D99A19] hover:bg-[#F5F5F5] rounded-md transition-colors whitespace-nowrap cursor-pointer"
                >
                  <FileDown className="w-4 h-4 text-[#9A6B06]" aria-hidden="true" />
                  <span>Download Catalogue</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="aspect-16/10 lg:aspect-auto lg:h-full min-h-[280px] rounded-lg overflow-hidden border border-neutral-200 bg-[#F5F5F5]">
                <ResilientImage
                  src={siteConfig.media.qualityMachinery}
                  alt="Precision wire drawing and cable manufacturing machinery in clean industrial facility"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION C: PRODUCT CATEGORIES */}
      <section className="py-16 md:py-24 bg-[#F5F5F5] border-b border-neutral-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-widest text-[#B87333] mb-2">
                Product Portfolio
              </p>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#171717] tracking-tight">
                Engineered Wires &amp; Cables for Every Application
              </h2>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#171717] hover:text-[#9A6B06] transition-colors whitespace-nowrap shrink-0"
            >
              <span>View Full Catalogue</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {PRODUCT_CATEGORIES.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onEnquire={(name) => openEnquiryModal(name)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION D: WHY CHOOSE US */}
      <section className="py-16 md:py-24 bg-white border-b border-neutral-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-[#B87333] mb-2">
              Our Strengths
            </p>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#171717] tracking-tight">
              Why Trade Partners &amp; Contractors Choose RAILPOWER
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
            {WHY_CHOOSE_US.map((item, idx) => {
              const Icon = item.icon;
              // Top 2 cards span 3 columns each on lg, bottom 3 cards span 2 columns each for balanced 5-card hierarchy
              const spanClass = idx < 2 ? 'lg:col-span-3' : 'lg:col-span-2';
              return (
                <div
                  key={item.title}
                  className={`${spanClass} flex flex-col justify-between p-6 sm:p-7 rounded-lg bg-[#F5F5F5] border border-neutral-200`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="font-mono text-xs font-semibold text-[#9A6B06]">
                        0{idx + 1}.
                      </span>
                      <div className="w-10 h-10 rounded-md bg-white border border-neutral-200 flex items-center justify-center text-[#171717]">
                        <Icon className="w-5 h-5 text-[#B87333]" aria-hidden="true" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-[#171717] mb-2">{item.title}</h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION E: BUSINESS PARTNERSHIP (BLACK & GOLD PROMOTIONAL SECTION) */}
      <section className="py-16 md:py-24 bg-[#171717] text-white relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#D99A19]/10 to-transparent pointer-events-none"
        />
        <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-[#D99A19]">
                Dealer &amp; Distributor Network
              </p>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                LET&apos;S GROW TOGETHER
              </h2>
              <p className="text-base sm:text-xl text-neutral-300 leading-relaxed max-w-2xl">
                Become a business partner of RAILPOWER WIRE &amp; CABLE and explore new
                opportunities in the electrical industry.
              </p>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <Link
                to="/dealership"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 text-base font-bold text-[#171717] bg-[#D99A19] hover:bg-[#e5a824] rounded-md transition-colors whitespace-nowrap shadow-md"
              >
                <span>Apply for Dealership</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION F: INDUSTRY APPLICATIONS */}
      <section className="py-16 md:py-24 bg-white border-b border-neutral-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-[#B87333] mb-2">
              Sectors Served
            </p>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#171717] tracking-tight">
              Industry Applications
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {INDUSTRY_APPLICATIONS.map((app) => {
              const Icon = app.icon;
              return (
                <div
                  key={app.title}
                  className="p-6 rounded-lg border border-neutral-200 bg-white hover:border-[#D99A19] transition-colors"
                >
                  <div className="w-10 h-10 rounded-md bg-[#F5F5F5] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#B87333]" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-bold text-[#171717] mb-2">{app.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{app.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION G: FINAL CTA */}
      <section className="py-16 md:py-20 bg-[#F5F5F5]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-neutral-200 rounded-lg p-8 sm:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171717] tracking-tight">
                Looking for Reliable Wire &amp; Cable Solutions?
              </h2>
              <p className="text-base text-neutral-600 leading-relaxed">
                Connect with our commercial team for product availability, bulk project enquiries,
                or regional dealership opportunities.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-white bg-[#171717] hover:bg-neutral-800 rounded-md transition-colors whitespace-nowrap"
              >
                <span>Contact Us</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <button
                type="button"
                onClick={() => openEnquiryModal()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-[#171717] bg-[#D99A19] hover:bg-[#c58912] rounded-md transition-colors whitespace-nowrap cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" aria-hidden="true" />
                <span>Send Enquiry</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
