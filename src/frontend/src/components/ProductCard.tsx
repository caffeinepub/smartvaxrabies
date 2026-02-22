import { Product } from '../backend';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: bigint) => {
    return `₹${Number(price).toLocaleString('en-IN')}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 overflow-hidden border border-emerald-100 group">
      <div className="aspect-square bg-gray-200 overflow-hidden">
        <img
          src={product.image.getDirectURL()}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-5 space-y-3">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <span className="text-2xl font-bold text-emerald-700">{formatPrice(product.price)}</span>
          <button className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg font-medium hover:from-emerald-700 hover:to-green-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            <span className="text-sm">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
