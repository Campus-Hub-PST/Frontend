import React, { useState } from 'react';
import EventCard from '../components/EventCard';
import Calendar from '../components/Calendar';
import { Event } from '../types';

const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'End of Semester Concert',
    description: 'Join us for an amazing evening of music featuring student bands and special guests.',
    date: new Date('2024-03-25T19:00:00'),
    location: 'University Amphitheater',
    category: 'cultural',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80'
  },
  {
    id: '2',
    title: 'Final Exams Preparation Workshop',
    description: 'Learn effective study techniques and time management strategies for finals.',
    date: new Date('2024-03-20T14:00:00'),
    location: 'Library Study Hall',
    category: 'academic'
  },
  {
    id: '3',
    title: 'Inter-College Basketball Tournament',
    description: 'Support our team in the championship game!',
    date: new Date('2024-03-22T16:00:00'),
    location: 'Sports Complex',
    category: 'sports',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80'
  }
];

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [view, setView] = useState<'calendar' | 'list'>('list');

  const filteredEvents = selectedCategory
    ? sampleEvents.filter(event => event.category === selectedCategory)
    : sampleEvents;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Upcoming Events</h1>
          <div className="flex space-x-4">
            <select
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="academic">Academic</option>
              <option value="sports">Sports</option>
              <option value="cultural">Cultural</option>
            </select>
            <div className="flex rounded-lg overflow-hidden">
              <button
                className={`px-4 py-2 ${view === 'list' ? 'bg-purple-600' : 'bg-gray-800'}`}
                onClick={() => setView('list')}
              >
                List
              </button>
              <button
                className={`px-4 py-2 ${view === 'calendar' ? 'bg-purple-600' : 'bg-gray-800'}`}
                onClick={() => setView('calendar')}
              >
                Calendar
              </button>
            </div>
          </div>
        </div>
        
        {view === 'list' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <Calendar events={filteredEvents} />
        )}
      </div>
    </div>
  );
}