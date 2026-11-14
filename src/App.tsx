/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProductsPage } from './pages/ProductsPage';
import { CategoryLandingPage } from './pages/CategoryLandingPage';
import { ProductVariantPage } from './pages/ProductVariantPage';
import { QualityPage } from './pages/QualityPage';
import { DealershipPage } from './pages/DealershipPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage, TermsPage, NotFoundPage } from './pages/LegalPages';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        {(layoutActions) => (
          <Routes>
            <Route path="/" element={<HomePage {...layoutActions} />} />
            <Route path="/about" element={<AboutPage {...layoutActions} />} />
            <Route path="/products" element={<ProductsPage {...layoutActions} />} />
            <Route
              path="/products/:categorySlug"
              element={<CategoryLandingPage {...layoutActions} />}
            />
            <Route
              path="/products/:categorySlug/:variantSlug"
              element={<ProductVariantPage />}
            />
            <Route path="/quality" element={<QualityPage {...layoutActions} />} />
            <Route path="/dealership" element={<DealershipPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-and-conditions" element={<TermsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        )}
      </Layout>
    </BrowserRouter>
  );
}
