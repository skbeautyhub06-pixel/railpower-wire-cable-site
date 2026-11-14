import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare } from 'lucide-react';
import type { ProductCategory } from '../data/products';
import { ResilientImage } from './ResilientImage';

interface ProductCardProps {
  product: ProductCategory;
  index: number;
  onEnquire: (productName: string) => void;
}

export function ProductCard({ product, index, onEnquire }: ProductCardProps) {
  return (
    <article className="group flex flex-col bg-white border border-neutral-200 rounded-lg overflow-hidden transition-colors duration-150 hover:border-[#D99A19]">
      {/* 4:3 Studio Product Photography */}
      <Link
        to={`/products/${product.slug}`}
        className="block aspect-4/3 w-full bg-[#F5F5F5] overflow-hidden"
        aria-label={`Explore ${product.name}`}
      >
        <ResilientImage
          src={product.image}
          alt={product.imageAlt}
          fallbackLabel={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </Link>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium mb-2">
          <span className="font-mono text-[#9A6B06]">0{index + 1}</span>
          <span aria-hidden="true">/</span>
          <span>{product.categoryGroup}</span>
          <span aria-hidden="true">·</span>
          <span>{product.variants.length} Variants</span>
        </div>

        <h3 className="text-xl font-bold text-[#171717] tracking-tight mb-2">
          <Link
            to={`/products/${product.slug}`}
            className="hover:text-[#9A6B06] transition-colors"
          >
            {product.name}
          </Link>
        </h3>

        <p className="text-sm text-neutral-600 leading-relaxed mb-4 flex-1">
          {product.shortDescription}
        </p>

        {/* Preview of key product options */}
        <div className="text-xs text-neutral-500 mb-5 leading-relaxed">
          <span className="font-semibold text-neutral-700">Includes: </span>
          {product.variants
            .slice(0, 3)
            .map((v) => v.name)
            .join(', ')}
          {product.variants.length > 3 ? ` +${product.variants.length - 3} more` : ''}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
          <Link
            to={`/products/${product.slug}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-sm font-semibold text-[#171717] bg-[#F5F5F5] hover:bg-neutral-200 rounded-md transition-colors whitespace-nowrap"
          >
            <span>Explore Range</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <button
            type="button"
            onClick={() => onEnquire(product.name)}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-bold text-[#171717] bg-[#D99A19] hover:bg-[#c58912] rounded-md transition-colors whitespace-nowrap cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" aria-hidden="true" />
            <span>Enquiry</span>
          </button>
        </div>
      </div>
    </article>
  );
}
