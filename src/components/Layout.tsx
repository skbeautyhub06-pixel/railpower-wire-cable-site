import { useState, type ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingWhatsApp } from './FloatingWhatsApp';
import { EnquiryModal } from './EnquiryModal';
import { CatalogueModal } from './CatalogueModal';

export interface LayoutOutletProps {
  openEnquiryModal: (productName?: string) => void;
  openCatalogueModal: () => void;
}

interface LayoutProps {
  children: (actions: LayoutOutletProps) => ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | undefined>(undefined);
  const [catalogueOpen, setCatalogueOpen] = useState(false);

  const openEnquiryModal = (productName?: string) => {
    setSelectedProduct(productName);
    setEnquiryModalOpen(true);
  };

  const openCatalogueModal = () => {
    setCatalogueOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#171717] overflow-x-hidden">
      <Header />
      <main className="flex-1">
        {children({ openEnquiryModal, openCatalogueModal })}
      </main>
      <Footer />
      <FloatingWhatsApp />

      <EnquiryModal
        isOpen={enquiryModalOpen}
        productName={selectedProduct}
        onClose={() => setEnquiryModalOpen(false)}
      />
      <CatalogueModal
        isOpen={catalogueOpen}
        onClose={() => setCatalogueOpen(false)}
      />
    </div>
  );
}
