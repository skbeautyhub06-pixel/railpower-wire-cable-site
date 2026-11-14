import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, ArrowRight } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { PRODUCT_CATEGORIES } from '../data/products';

const MAIN_NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Quality', to: '/quality' },
  { label: 'Dealership', to: '/dealership' },
  { label: 'Contact Us', to: '/contact' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
    setProductsDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProductsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isProductsActive = location.pathname.startsWith('/products');

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between gap-4 lg:gap-6">
        {/* Zone 1: Official RAILPOWER Logo */}
        <Link
          to="/"
          className="flex items-center shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D99A19]"
          aria-label="RAILPOWER WIRE & CABLE Home"
        >
          <img
            src={siteConfig.brand.logoPath}
            alt={siteConfig.brand.logoAlt}
            className="h-12 md:h-14 w-auto object-contain"
          />
        </Link>

        {/* Zone 2: Desktop Navigation + Advanced Products Dropdown */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-5 xl:gap-7"
        >
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `relative py-2 text-sm font-semibold whitespace-nowrap shrink-0 transition-colors ${
                isActive ? 'text-[#9A6B06]' : 'text-[#171717] hover:text-[#9A6B06]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>Home</span>
                <span
                  aria-hidden="true"
                  className={`absolute left-0 right-0 bottom-0 h-0.5 bg-[#D99A19] transition-transform duration-150 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </>
            )}
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `relative py-2 text-sm font-semibold whitespace-nowrap shrink-0 transition-colors ${
                isActive ? 'text-[#9A6B06]' : 'text-[#171717] hover:text-[#9A6B06]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>About Us</span>
                <span
                  aria-hidden="true"
                  className={`absolute left-0 right-0 bottom-0 h-0.5 bg-[#D99A19] transition-transform duration-150 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </>
            )}
          </NavLink>

          {/* Products Dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setProductsDropdownOpen(true)}
            onMouseLeave={() => setProductsDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={() => setProductsDropdownOpen((prev) => !prev)}
              aria-expanded={productsDropdownOpen}
              aria-haspopup="true"
              className={`relative inline-flex items-center gap-1 py-2 text-sm font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                isProductsActive ? 'text-[#9A6B06]' : 'text-[#171717] hover:text-[#9A6B06]'
              }`}
            >
              <span>Products</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-150 ${
                  productsDropdownOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
              <span
                aria-hidden="true"
                className={`absolute left-0 right-0 bottom-0 h-0.5 bg-[#D99A19] transition-transform duration-150 origin-left ${
                  isProductsActive ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </button>

            {productsDropdownOpen && (
              <div className="absolute left-0 top-full pt-2 w-[340px] z-50">
                <div className="bg-white border border-neutral-200 rounded-lg shadow-xl overflow-hidden">
                  <div className="px-4 py-3 bg-[#171717] text-white flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#D99A19]">
                      Product Categories
                    </span>
                    <Link
                      to="/products"
                      onClick={() => setProductsDropdownOpen(false)}
                      className="text-xs font-semibold text-white hover:text-[#D99A19] inline-flex items-center gap-1"
                    >
                      <span>View All</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                  <div className="py-2 divide-y divide-neutral-100">
                    {PRODUCT_CATEGORIES.map((category) => (
                      <Link
                        key={category.id}
                        to={`/products/${category.slug}`}
                        onClick={() => setProductsDropdownOpen(false)}
                        className="flex items-center justify-between px-4 py-2.5 hover:bg-[#F5F5F5] transition-colors group"
                      >
                        <div>
                          <p className="text-sm font-semibold text-[#171717] group-hover:text-[#9A6B06]">
                            {category.name}
                          </p>
                          <p className="text-xs text-neutral-500">
                            {category.variants.length} product options
                          </p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#9A6B06]" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {MAIN_NAV_LINKS.slice(2).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative py-2 text-sm font-semibold whitespace-nowrap shrink-0 transition-colors ${
                  isActive ? 'text-[#9A6B06]' : 'text-[#171717] hover:text-[#9A6B06]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{item.label}</span>
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 right-0 bottom-0 h-0.5 bg-[#D99A19] transition-transform duration-150 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Zone 3: Official Phone Contact Button + Gold Dealership Button + Mobile Hamburger */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <a
            href={siteConfig.contact.phoneHref}
            aria-label={`Call RAILPOWER WIRE & CABLE at ${siteConfig.contact.phoneDisplay}`}
            className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#171717] bg-[#F5F5F5] hover:bg-neutral-200 border border-neutral-200 rounded-md transition-colors whitespace-nowrap shrink-0"
          >
            <Phone className="w-3.5 h-3.5 text-[#B87333]" aria-hidden="true" />
            <span className="font-mono">{siteConfig.contact.phoneDisplay}</span>
          </a>

          <Link
            to="/dealership"
            className="hidden sm:inline-flex items-center justify-center px-4 md:px-5 py-2.5 text-sm font-bold text-[#171717] bg-[#D99A19] hover:bg-[#c58912] rounded-md transition-colors whitespace-nowrap shrink-0 shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#171717]"
          >
            Become a Dealer
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-md border border-neutral-200 text-[#171717] hover:bg-[#F5F5F5] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="lg:hidden bg-white border-t border-neutral-200 px-4 py-4 shadow-lg max-h-[82vh] overflow-y-auto"
        >
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-4 py-3 text-base font-semibold rounded-md ${
                  isActive ? 'bg-[#F5F5F5] text-[#9A6B06]' : 'text-[#171717] hover:bg-[#F5F5F5]'
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-4 py-3 text-base font-semibold rounded-md ${
                  isActive ? 'bg-[#F5F5F5] text-[#9A6B06]' : 'text-[#171717] hover:bg-[#F5F5F5]'
                }`
              }
            >
              About Us
            </NavLink>

            {/* Mobile Products Accordion */}
            <div>
              <div className="flex items-center justify-between">
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    `flex-1 px-4 py-3 text-base font-semibold rounded-md ${
                      isActive
                        ? 'bg-[#F5F5F5] text-[#9A6B06]'
                        : 'text-[#171717] hover:bg-[#F5F5F5]'
                    }`
                  }
                >
                  Products
                </NavLink>
                <button
                  type="button"
                  onClick={() => setMobileProductsOpen((prev) => !prev)}
                  aria-expanded={mobileProductsOpen}
                  aria-label="Toggle product categories"
                  className="p-3 text-[#171717] hover:bg-[#F5F5F5] rounded-md"
                >
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      mobileProductsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>
              {mobileProductsOpen && (
                <div className="pl-4 pr-2 py-1 space-y-1 border-l-2 border-[#D99A19]/40 ml-4">
                  {PRODUCT_CATEGORIES.map((category) => (
                    <Link
                      key={category.id}
                      to={`/products/${category.slug}`}
                      className="block px-3 py-2 text-sm font-medium text-neutral-700 hover:text-[#9A6B06] rounded-md hover:bg-[#F5F5F5]"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {MAIN_NAV_LINKS.slice(2).map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-4 py-3 text-base font-semibold rounded-md ${
                    isActive
                      ? 'bg-[#F5F5F5] text-[#9A6B06]'
                      : 'text-[#171717] hover:bg-[#F5F5F5]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            <div className="pt-3 mt-2 border-t border-neutral-200 space-y-2.5">
              <a
                href={siteConfig.contact.phoneHref}
                className="flex items-center justify-center gap-2 w-full px-5 py-3 text-sm font-bold text-[#171717] bg-[#F5F5F5] border border-neutral-200 rounded-md"
              >
                <Phone className="w-4 h-4 text-[#B87333]" />
                <span>Call {siteConfig.contact.phoneDisplay}</span>
              </a>
              <Link
                to="/dealership"
                className="flex items-center justify-center w-full px-5 py-3 text-base font-bold text-[#171717] bg-[#D99A19] hover:bg-[#c58912] rounded-md"
              >
                Become a Dealer
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
