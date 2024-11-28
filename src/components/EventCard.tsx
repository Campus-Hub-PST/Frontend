import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { Event } from '../types';
import { format } from 'date-fns';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      {event.image && (
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className={`px-3 py-1 rounded-full text-sm ${
            event.category === 'academic' ? 'bg-blue-500' :
            event.category === 'sports' ? 'bg-green-500' :
            'bg-purple-500'
          }`}>
            {event.category}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{event.title}</h3>
        <p className="text-gray-400 mb-4">{event.description}</p>
        <div className="flex items-center text-gray-300 mb-2">
          <Calendar size={16} className="mr-2" />
          <span>{format(event.date, 'PPp')}</span>
        </div>
        <div className="flex items-center text-gray-300">
          <MapPin size={16} className="mr-2" />
          <span>{event.location}</span>
        </div>
      </div>
    </div>
  );
}