import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowUpRight, MessageCircle } from 'lucide-react';
import { siteConfig, buildWhatsAppUrl, getFormattedAddress } from '../config/siteConfig';
import { PRODUCT_CATEGORIES } from '../data/products';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#171717] text-neutral-300 border-t border-neutral-800">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Brand Identity & Dealership CTA */}
          <div className="lg:col-span-4 space-y-5">
            <Link
              to="/"
              className="inline-block bg-white rounded-md px-3.5 py-2 shadow-sm focus-visible:outline-2 focus-visible:outline-[#D99A19]"
              aria-label="RAILPOWER WIRE & CABLE Home"
            >
              <img
                src={siteConfig.brand.logoPath}
                alt={siteConfig.brand.logoAlt}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-neutral-300 leading-relaxed max-w-sm">
              RAILPOWER WIRE &amp; CABLE supplies dependable electrical wire and cable solutions
              for residential buildings, commercial projects, industrial plants, and power
              distribution networks from Satna, Madhya Pradesh, India.
            </p>
            <div className="pt-1">
              <Link
                to="/dealership"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-[#171717] bg-[#D99A19] hover:bg-[#e5a824] rounded-md transition-colors whitespace-nowrap"
              >
                <span>Apply for Dealership</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-bold text-white tracking-wide">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-[#D99A19] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#D99A19] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#D99A19] transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/quality" className="hover:text-[#D99A19] transition-colors">
                  Quality Assurance
                </Link>
              </li>
              <li>
                <Link to="/dealership" className="hover:text-[#D99A19] transition-colors">
                  Dealership
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#D99A19] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Products */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-sm font-bold text-white tracking-wide">Our Products</h3>
            <ul className="space-y-2.5 text-sm">
              {PRODUCT_CATEGORIES.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/products/${category.slug}`}
                    className="hover:text-[#D99A19] transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Official Contact Information */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-sm font-bold text-white tracking-wide">Contact Information</h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D99A19] shrink-0 mt-1" aria-hidden="true" />
                <span className="text-neutral-300 leading-relaxed">{getFormattedAddress()}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#D99A19] shrink-0" aria-hidden="true" />
                <a
                  href={siteConfig.contact.phoneHref}
                  className="font-mono text-white hover:text-[#D99A19] transition-colors"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#D99A19] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  {siteConfig.contact.isEmailVerified ? (
                    <a
                      href={`mailto:${siteConfig.contact.emailDisplay}`}
                      className="hover:text-[#D99A19] transition-colors break-all"
                    >
                      {siteConfig.contact.emailDisplay}
                    </a>
                  ) : (
                    <div className="space-y-0.5">
                      <span className="text-neutral-200 break-all">
                        {siteConfig.contact.emailDisplay}
                      </span>
                      <p className="text-[11px] text-neutral-400">
                        {siteConfig.contact.emailStatusNote}
                      </p>
                    </div>
                  )}
                </div>
              </li>
              <li className="pt-1">
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md border border-neutral-700 hover:border-[#D99A19] text-white hover:text-[#D99A19] text-xs font-semibold transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#D99A19]" aria-hidden="true" />
                  <span>WhatsApp: {siteConfig.contact.phoneDisplay}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-neutral-400">
          <p>
            &copy; {currentYear} {siteConfig.brand.name} · Satna, Madhya Pradesh, India. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
