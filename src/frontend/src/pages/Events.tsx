import { useQuery } from '@tanstack/react-query';
import { useActor } from '../hooks/useActor';
import EventCard from '../components/EventCard';
import { Loader2, Calendar } from 'lucide-react';

export default function Events() {
  const { actor, isFetching } = useActor();

  const { data: events, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllEvents();
    },
    enabled: !!actor && !isFetching,
  });

  const sortedEvents = events?.sort((a, b) => Number(a.date - b.date));

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Banner */}
      <div className="relative rounded-2xl overflow-hidden mb-12 shadow-xl">
        <img
          src="/assets/generated/charity-event-dogs.dim_1000x600.png"
          alt="Charity Events"
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-green-900/60 flex items-center">
          <div className="container mx-auto px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Charity Events</h1>
            <p className="text-xl text-emerald-50">Join us in supporting animal welfare across Kerala</p>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-12 w-12 animate-spin text-emerald-600" />
        </div>
      ) : sortedEvents && sortedEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedEvents.map((event) => (
            <EventCard key={Number(event.id)} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="bg-emerald-50 rounded-2xl p-12 max-w-md mx-auto">
            <Calendar className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Upcoming Events</h3>
            <p className="text-gray-600">Check back soon for exciting charity events and fundraisers.</p>
          </div>
        </div>
      )}
    </div>
  );
}
