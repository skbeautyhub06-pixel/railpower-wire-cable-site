import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { SeoHead } from '../components/SeoHead';

export function PrivacyPolicyPage() {
  return (
    <>
      <SeoHead
        title="Privacy Policy – RAILPOWER WIRE & CABLE"
        description="Privacy Policy for RAILPOWER WIRE & CABLE describing how enquiry and dealership application details are handled."
        canonicalPath="/privacy-policy"
      />
      <section className="bg-[#171717] text-white py-14 border-b border-neutral-800">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[#D99A19] mb-2">Legal</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
          <p className="text-xs font-mono text-neutral-400 mt-2">
            Effective Date: {siteConfig.legal.effectiveDate}
          </p>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-sm sm:text-base text-neutral-700 leading-relaxed">
          <div className="p-4 rounded-md bg-[#F5F5F5] border border-neutral-200 text-xs text-neutral-600">
            Entity details below are editable via{' '}
            <code className="font-mono">siteConfig.legal</code> in{' '}
            <code className="font-mono">src/config/siteConfig.ts</code>.
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-[#171717]">1. Overview</h2>
            <p>
              {siteConfig.legal.legalEntityName} (&ldquo;RAILPOWER WIRE &amp; CABLE&rdquo;,{' '}
              {siteConfig.contact.officeAddressDisplay}) respects the privacy of visitors, trade
              partners, and prospective dealers using this website.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-[#171717]">2. Information You Provide</h2>
            <p>
              When you submit a product quotation, contact request, or dealership application, you
              may provide business and contact details including your name, firm name, mobile and
              WhatsApp numbers, email address, city, state, PIN code, quantity requirement, and
              enquiry message.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-[#171717]">3. Purpose of Use</h2>
            <p>
              Submitted details are used solely to respond to product quotations, evaluate
              dealership or distributorship applications, coordinate order enquiries, and maintain
              authorized business communication.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-[#171717]">4. Contact &amp; Updates</h2>
            <p>
              For privacy questions or data correction requests, contact us at{' '}
              <a
                href={siteConfig.contact.phoneHref}
                className="font-mono font-semibold text-[#171717] hover:text-[#9A6B06]"
              >
                {siteConfig.contact.phoneDisplay}
              </a>{' '}
              or via our{' '}
              <Link to="/contact" className="text-[#9A6B06] font-semibold hover:underline">
                Contact Us page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export function TermsPage() {
  return (
    <>
      <SeoHead
        title="Terms & Conditions – RAILPOWER WIRE & CABLE"
        description="Terms and Conditions governing use of the RAILPOWER WIRE & CABLE corporate website and enquiry channels."
        canonicalPath="/terms-and-conditions"
      />
      <section className="bg-[#171717] text-white py-14 border-b border-neutral-800">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[#D99A19] mb-2">Legal</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Terms &amp; Conditions
          </h1>
          <p className="text-xs font-mono text-neutral-400 mt-2">
            Effective Date: {siteConfig.legal.effectiveDate}
          </p>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-sm sm:text-base text-neutral-700 leading-relaxed">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-[#171717]">1. Website Information</h2>
            <p>
              This website is operated by {siteConfig.legal.legalEntityName}. Product descriptions,
              variants, colours, and category listings are provided for catalogue reference and
              commercial enquiry purposes, subject to confirmation.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-[#171717]">2. Commercial Quotes &amp; Dealerships</h2>
            <p>
              Submitting a product quotation request or dealership application does not create an
              automatic supply agreement or territorial appointment. All pricing, stock
              availability, dispatch schedules, and dealership approvals remain subject to formal
              written confirmation.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-[#171717]">3. Intellectual Property</h2>
            <p>
              The RAILPOWER WIRE &amp; CABLE name, official logo, and product photography presented
              on this website are proprietary assets and may not be reproduced without prior written
              authorization.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-[#171717]">4. Governing Jurisdiction</h2>
            <p>
              These terms are governed by the applicable laws of India, subject to the jurisdiction
              of {siteConfig.legal.jurisdiction}.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export function NotFoundPage() {
  return (
    <>
      <SeoHead
        title="Page Not Found – RAILPOWER WIRE & CABLE"
        description="The requested page was not found on the RAILPOWER WIRE & CABLE website."
      />
      <section className="py-24 bg-[#F5F5F5]">
        <div className="max-w-[640px] mx-auto px-4 text-center space-y-5">
          <p className="font-mono text-sm font-bold text-[#9A6B06]">404 ERROR</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#171717]">Page Not Found</h1>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            The page you are looking for does not exist or has been relocated. Return to our
            homepage or browse our product catalogue.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-[#171717] bg-[#D99A19] hover:bg-[#c58912] rounded-md transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Home</span>
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center px-6 py-3 text-sm font-bold text-white bg-[#171717] hover:bg-neutral-800 rounded-md transition-colors"
            >
              <span>Explore Products</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
