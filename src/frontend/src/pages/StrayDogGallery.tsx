import { useQuery } from '@tanstack/react-query';
import { useActor } from '../hooks/useActor';
import { MapPin, Clock, User, Loader2 } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function StrayDogGallery() {
  const { actor, isFetching } = useActor();

  const { data: strayDogs, isLoading } = useQuery({
    queryKey: ['strayDogImages'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllStrayDogImages();
    },
    enabled: !!actor && !isFetching,
  });

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Stray Dogs Needing Help</h1>
        <p className="text-lg text-gray-600 mb-6">
          Browse submitted stray dog reports and help connect them with shelters
        </p>
        <Link
          to="/stray-dogs/submit"
          className="inline-block px-8 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-teal-700 transition-all shadow-lg"
        >
          Submit New Report
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-12 w-12 animate-spin text-emerald-600" />
        </div>
      ) : strayDogs && strayDogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {strayDogs.map((dog, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-emerald-100 hover:shadow-xl transition-shadow"
            >
              <div className="aspect-video bg-gray-200 overflow-hidden">
                <img
                  src={dog.image.getDirectURL()}
                  alt={`Stray dog at ${dog.location}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-start gap-2 text-gray-700">
                  <MapPin className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="font-medium">{dog.location}</span>
                </div>
                <p className="text-gray-600 line-clamp-3">{dog.description}</p>
                <div className="pt-3 border-t border-gray-200 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <User className="h-4 w-4" />
                    <span>Reported by {dog.uploadedBy}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>{formatDate(dog.timestamp)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="bg-emerald-50 rounded-2xl p-12 max-w-md mx-auto">
            <MapPin className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Reports Yet</h3>
            <p className="text-gray-600 mb-6">Be the first to help a stray dog by submitting a report.</p>
            <Link
              to="/stray-dogs/submit"
              className="inline-block px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-teal-700 transition-all"
            >
              Submit Report
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
