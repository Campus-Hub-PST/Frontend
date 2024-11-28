import React, { useState } from 'react';
import LostItemCard from '../components/LostItemCard';
import { LostItem } from '../types';

const sampleItems: LostItem[] = [
  {
    id: '1',
    title: 'MacBook Pro',
    description: 'Space Gray MacBook Pro 13" with stickers on the cover',
    lastSeen: 'Library Study Room 204',
    date: new Date('2024-03-14T16:30:00'),
    category: 'Electronics',
    status: 'lost',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80'
  },
  {
    id: '2',
    title: 'Student ID Card',
    description: 'Found student ID card for Sarah Johnson',
    lastSeen: 'Student Center Cafeteria',
    date: new Date('2024-03-15T12:00:00'),
    category: 'Documents',
    status: 'found'
  },
  {
    id: '3',
    title: 'Blue Hydroflask',
    description: '32oz Blue Hydroflask with university stickers',
    lastSeen: 'Gym Locker Room',
    date: new Date('2024-03-15T09:00:00'),
    category: 'Personal Items',
    status: 'lost'
  }
];

export default function LostFound() {
  const [status, setStatus] = useState<'all' | 'lost' | 'found'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = sampleItems.filter(item => 
    (status === 'all' || item.status === status) &&
    (item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleContact = (itemId: string) => {
    console.log(`Contacting about item ${itemId}`);
    // Implement contact functionality
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Lost & Found</h1>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Search items..."
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
              value={status}
              onChange={(e) => setStatus(e.target.value as 'all' | 'lost' | 'found')}
            >
              <option value="all">All Items</option>
              <option value="lost">Lost Items</option>
              <option value="found">Found Items</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <LostItemCard
              key={item.id}
              item={item}
              onContact={handleContact}
            />
          ))}
        </div>
      </div>
    </div>
  );
}