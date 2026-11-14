import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Layers,
  Cog,
  SearchCheck,
  Gauge,
  Smile,
  ArrowRight,
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { SeoHead } from '../components/SeoHead';
import { ResilientImage } from '../components/ResilientImage';
import type { LayoutOutletProps } from '../components/Layout';

const QUALITY_PILLARS = [
  {
    number: '01',
    title: 'Quality Commitment',
    description:
      'Quality at RAILPOWER WIRE & CABLE is approached as an everyday operational discipline—ensuring every coil and cable length supplied to dealers, contractors, and end users meets consistent functional expectations.',
    icon: ShieldCheck,
  },
  {
    number: '02',
    title: 'Raw Material Selection',
    description:
      'Consistent wire performance begins with careful screening of conductor rod purity and polymer insulation compounds before production begins, helping support uniform conductivity and clean sheath finish.',
    icon: Layers,
  },
  {
    number: '03',
    title: 'Manufacturing Standards',
    description:
      'Wire drawing, stranding, and polymer extrusion stages follow structured process parameters aimed at maintaining uniform conductor cross-section, concentric insulation thickness, and smooth outer jacketing.',
    icon: Cog,
  },
  {
    number: '04',
    title: 'Product Inspection',
    description:
      'In-process and final visual checks monitor surface smoothness, colour consistency, print legibility, coil length accuracy, and protective packaging integrity prior to dispatch.',
    icon: SearchCheck,
  },
  {
    number: '05',
    title: 'Testing Procedures',
    description:
      'Finished wire and cable batches undergo systematic verification checks covering conductor resistance, dimensional uniformity, and insulation integrity in line with internal quality protocols.',
    icon: Gauge,
  },
  {
    number: '06',
    title: 'Customer Satisfaction',
    description:
      'Our responsibility continues beyond dispatch through responsive communication with distributors, electrical retailers, and project contractors to ensure reliable supply continuity.',
    icon: Smile,
  },
];

export function QualityPage({ openEnquiryModal }: LayoutOutletProps) {
  return (
    <>
      <SeoHead
        title="Quality Assurance – RAILPOWER WIRE & CABLE"
        description="Discover RAILPOWER WIRE & CABLE's quality assurance practices covering raw material selection, manufacturing standards, product inspection, testing procedures, and customer satisfaction."
        canonicalPath="/quality"
      />

      {/* Hero Header */}
      <section className="bg-[#171717] text-white py-16 md:py-20 border-b border-neutral-800">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[#D99A19] mb-3">
            Quality Assurance
          </p>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-3xl mb-4">
            Disciplined Processes for Dependable Electrical Supply
          </h1>
          <p className="text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed">
            Every wire and cable supplied under the RAILPOWER brand is backed by a structured
            focus on material integrity, process oversight, and batch inspection.
          </p>
        </div>
      </section>

      {/* Visual Feature Split */}
      <section className="py-14 md:py-20 bg-white border-b border-neutral-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            <div className="lg:col-span-7">
              <div className="aspect-16/9 lg:h-full rounded-lg overflow-hidden border border-neutral-200 bg-[#F5F5F5]">
                <ResilientImage
                  src={siteConfig.media.qualityMachinery}
                  alt="Modern wire drawing and extrusion line inside electrical cable manufacturing facility"
                  loading="eager"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-5 flex flex-col justify-center space-y-5 bg-[#F5F5F5] border border-neutral-200 rounded-lg p-7 sm:p-8">
              <h2 className="text-2xl font-bold text-[#171717] tracking-tight">
                Consistent Quality Across Every Category
              </h2>
              <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
                Electrical installations demand reliability at every junction. We prioritize clean
                stranding, uniform polymer extrusion, and organized packaging so electricians and
                industrial buyers receive ready-to-install coils and drums.
              </p>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Official product test reports and standard compliance documents are shared directly
                with trade partners and institutional buyers upon verified product enquiry.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => openEnquiryModal('Quality & Specification Request')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-[#171717] bg-[#D99A19] hover:bg-[#c58912] rounded-md transition-colors cursor-pointer"
                >
                  <span>Request Product Information</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Quality Assurance Pillars */}
      <section className="py-16 md:py-24 bg-[#F5F5F5] border-b border-neutral-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-[#B87333] mb-2">
              Six-Stage Focus
            </p>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#171717] tracking-tight">
              Our Quality Framework
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {QUALITY_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <article
                  key={pillar.title}
                  className="bg-white border border-neutral-200 rounded-lg p-7 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="font-mono text-xs font-semibold text-[#9A6B06]">
                        {pillar.number}.
                      </span>
                      <div className="w-10 h-10 rounded-md bg-[#F5F5F5] flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#B87333]" aria-hidden="true" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-[#171717] mb-3">{pillar.title}</h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">{pillar.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-14 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-[#171717]">
              Explore Our Complete Wire &amp; Cable Portfolio
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 mt-1">
              Review all seven product categories or speak with our team for trade pricing.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-white bg-[#171717] hover:bg-neutral-800 rounded-md transition-colors"
            >
              <span>Browse Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/dealership"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-[#171717] bg-[#D99A19] hover:bg-[#c58912] rounded-md transition-colors"
            >
              <span>Become a Dealer</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
