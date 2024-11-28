import React from 'react';
import { MapPin, Calendar } from 'lucide-react';
import { LostItem } from '../types';
import { format } from 'date-fns';
import { clsx } from 'clsx';

interface LostItemCardProps {
  item: LostItem;
  onContact?: (itemId: string) => void;
}

export default function LostItemCard({ item, onContact }: LostItemCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      {item.image && (
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className={clsx(
            "px-3 py-1 rounded-full text-sm",
            item.status === 'lost' ? "bg-red-500" : "bg-green-500"
          )}>
            {item.status.toUpperCase()}
          </span>
          <span className="text-gray-400">{item.category}</span>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
        <p className="text-gray-400 mb-4">{item.description}</p>
        <div className="flex items-center text-gray-300 mb-2">
          <MapPin size={16} className="mr-2" />
          <span>{item.lastSeen}</span>
        </div>
        <div className="flex items-center text-gray-300 mb-4">
          <Calendar size={16} className="mr-2" />
          <span>{format(item.date, 'PP')}</span>
        </div>
        <button
          onClick={() => onContact?.(item.id)}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors"
        >
          Contact
        </button>
      </div>
    </div>
  );
}