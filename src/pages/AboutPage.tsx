import { Link } from 'react-router-dom';
import { ArrowRight, Target, Compass, ShieldCheck, Handshake, Award } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { SeoHead } from '../components/SeoHead';
import { ResilientImage } from '../components/ResilientImage';
import type { LayoutOutletProps } from '../components/Layout';

export function AboutPage({ openEnquiryModal }: LayoutOutletProps) {
  const pillars = [
    {
      number: '02',
      title: 'Our Vision',
      content: siteConfig.aboutContent.vision,
      icon: Target,
    },
    {
      number: '03',
      title: 'Our Mission',
      content: siteConfig.aboutContent.mission,
      icon: Compass,
    },
    {
      number: '04',
      title: 'Our Commitment',
      content: siteConfig.aboutContent.commitment,
      icon: ShieldCheck,
    },
    {
      number: '05',
      title: 'Our Business Philosophy',
      content: siteConfig.aboutContent.businessPhilosophy,
      icon: Handshake,
    },
    {
      number: '06',
      title: 'Our Focus on Quality',
      content: siteConfig.aboutContent.qualityFocus,
      icon: Award,
    },
  ];

  return (
    <>
      <SeoHead
        title="About Us – RAILPOWER WIRE & CABLE | Electrical Wire Supplier"
        description="Learn about RAILPOWER WIRE & CABLE — our vision, mission, commitment to quality, and business philosophy in serving India's electrical wire and cable industry."
        canonicalPath="/about"
      />

      {/* Page Hero Banner */}
      <section className="bg-[#171717] text-white py-16 md:py-20 border-b border-neutral-800">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[#D99A19] mb-3">
            Corporate Profile
          </p>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-3xl mb-4">
            About RAILPOWER WIRE &amp; CABLE
          </h1>
          <p className="text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed">
            Focused on dependable electrical wire and cable solutions backed by principled trade
            partnerships and consistent product standards.
          </p>
        </div>
      </section>

      {/* Section 1: Brand Introduction */}
      <section className="py-16 md:py-20 bg-white border-b border-neutral-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-center space-y-5">
              <div className="flex items-center gap-2 text-xs font-mono text-[#9A6B06]">
                <span>01.</span>
                <span className="uppercase tracking-wider font-sans font-bold">
                  Brand Introduction
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171717] tracking-tight">
                Serving Residential, Commercial &amp; Industrial Electrical Networks
              </h2>
              <p className="text-base text-neutral-700 leading-relaxed">
                {siteConfig.aboutContent.introduction}
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-[#171717] bg-[#D99A19] hover:bg-[#c58912] rounded-md transition-colors"
                >
                  <span>Explore Products</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  type="button"
                  onClick={() => openEnquiryModal('Corporate / Trade Enquiry')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#171717] border border-neutral-300 hover:bg-[#F5F5F5] rounded-md transition-colors cursor-pointer"
                >
                  <span>Connect With Us</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="aspect-16/10 lg:aspect-auto lg:h-full min-h-[280px] rounded-lg overflow-hidden border border-neutral-200 bg-[#F5F5F5]">
                <ResilientImage
                  src={siteConfig.media.aboutManufacturingFacility}
                  alt="Electrical wire and cable manufacturing facility with cable drums and extrusion lines"
                  loading="eager"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sections 2 to 6: Vision, Mission, Commitment, Philosophy, Focus on Quality */}
      <section className="py-16 md:py-24 bg-[#F5F5F5] border-b border-neutral-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="bg-white border border-neutral-200 rounded-lg p-7 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="font-mono text-xs font-semibold text-[#9A6B06]">
                        {item.number}.
                      </span>
                      <div className="w-10 h-10 rounded-md bg-[#F5F5F5] flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#B87333]" aria-hidden="true" />
                      </div>
                    </div>
                    <h2 className="text-xl font-bold text-[#171717] mb-3">{item.title}</h2>
                    <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                </article>
              );
            })}

            {/* Industrial Visual Card */}
            <div className="rounded-lg overflow-hidden border border-neutral-200 bg-[#171717] text-white flex flex-col">
              <div className="aspect-16/10 w-full overflow-hidden">
                <ResilientImage
                  src={siteConfig.media.qualityMachinery}
                  alt="Industrial wire drawing and extrusion line"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Partner With RAILPOWER
                  </h3>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    Interested in representing RAILPOWER WIRE &amp; CABLE in your district or city?
                  </p>
                </div>
                <div className="pt-4">
                  <Link
                    to="/dealership"
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#D99A19] hover:text-[#e5a824] transition-colors"
                  >
                    <span>Explore Dealership Program</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industrial Operations Visual Showcase */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-[#B87333] mb-2">
              Industrial Operations
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#171717] tracking-tight">
              Production Machinery &amp; Supply Operations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <figure className="rounded-lg overflow-hidden border border-neutral-200 bg-[#F5F5F5]">
              <div className="aspect-16/9 w-full overflow-hidden">
                <ResilientImage
                  src={siteConfig.media.copperWireProduction}
                  alt="Copper wire stranding and spooling production machinery in operation"
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="p-5 bg-white border-t border-neutral-200">
                <h3 className="text-base font-bold text-[#171717]">Copper Conductor Stranding</h3>
                <p className="text-sm text-neutral-600 mt-1">
                  Structured conductor drawing and stranding lines supporting consistent wire
                  geometry across residential and industrial categories.
                </p>
              </figcaption>
            </figure>

            <figure className="rounded-lg overflow-hidden border border-neutral-200 bg-[#F5F5F5]">
              <div className="aspect-16/9 w-full overflow-hidden">
                <ResilientImage
                  src={siteConfig.media.dealershipDistribution}
                  alt="Industrial electrical cable warehouse and drum dispatch operations"
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="p-5 bg-white border-t border-neutral-200">
                <h3 className="text-base font-bold text-[#171717]">
                  Inventory &amp; Dispatch Coordination
                </h3>
                <p className="text-sm text-neutral-600 mt-1">
                  Organized coil packaging and drum storage designed for reliable dealer supply and
                  project dispatch.
                </p>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
    </>
  );
}
