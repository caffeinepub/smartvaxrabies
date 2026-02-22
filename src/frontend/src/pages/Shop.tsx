import { useQuery } from '@tanstack/react-query';
import { useActor } from '../hooks/useActor';
import ProductCard from '../components/ProductCard';
import { Loader2, ShoppingBag } from 'lucide-react';

export default function Shop() {
  const { actor, isFetching } = useActor();

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProducts();
    },
    enabled: !!actor && !isFetching,
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Banner */}
      <div className="relative rounded-2xl overflow-hidden mb-12 shadow-xl">
        <img
          src="/assets/generated/shop-banner-dog.dim_900x500.png"
          alt="Dog Supplies"
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-green-900/60 flex items-center">
          <div className="container mx-auto px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Dog Supplies Shop</h1>
            <p className="text-xl text-emerald-50">Quality products for your beloved pets</p>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-12 w-12 animate-spin text-emerald-600" />
        </div>
      ) : products && products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={Number(product.id)} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="bg-emerald-50 rounded-2xl p-12 max-w-md mx-auto">
            <ShoppingBag className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Available</h3>
            <p className="text-gray-600">Check back soon for quality dog supplies and products.</p>
          </div>
        </div>
      )}
    </div>
  );
}
