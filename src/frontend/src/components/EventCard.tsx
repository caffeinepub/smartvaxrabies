import { Event } from '../backend';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isPast = Number(event.date) < Date.now() * 1000000;

  return (
    <div
      className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden border ${
        isPast ? 'border-gray-300 opacity-75' : 'border-emerald-100'
      }`}
    >
      <div className={`h-2 ${isPast ? 'bg-gray-400' : 'bg-gradient-to-r from-emerald-500 to-green-500'}`} />
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
          {isPast && <span className="inline-block px-3 py-1 bg-gray-200 text-gray-700 text-xs font-medium rounded-full">Past Event</span>}
        </div>

        <div className="space-y-2">
          <div className="flex items-start gap-2 text-gray-700">
            <Calendar className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">{formatDate(event.date)}</p>
              <p className="text-sm text-gray-600">{formatTime(event.date)}</p>
            </div>
          </div>

          <div className="flex items-start gap-2 text-gray-700">
            <MapPin className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>{event.location}</span>
          </div>
        </div>

        <p className="text-gray-600 line-clamp-3">{event.description}</p>

        {!isPast && event.registrationLink && (
          <a
            href={event.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-green-700 transition-all shadow-md hover:shadow-lg"
          >
            Register Now
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
}
