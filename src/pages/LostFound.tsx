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
  const [contactPhone, setContactPhone] = useState<string | null>(null);

  const filteredItems = sampleItems.filter(item =>
    (status === 'all' || item.status === status) &&
    (item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleContact = (itemId: string) => {
    console.log(`Contacting about item ${itemId}`);
    // Simulate fetching phone number (replace with actual logic if necessary)
    const phoneNumber = '123-456-7890'; // Replace with dynamic data if needed
    setContactPhone(phoneNumber);
  };

  const closeModal = () => {
    setContactPhone(null);
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

        {/* Modal for Contact Phone */}
        {contactPhone && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-11/12 max-w-md">
              <h2 className="text-lg font-bold mb-4">Contact Information</h2>
              <p className="mb-4">
                Phone Number: <span className="text-purple-500">{contactPhone}</span>
              </p>
              <button
                onClick={closeModal}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
