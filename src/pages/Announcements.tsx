import React, { useState } from 'react';
import AnnouncementCard from '../components/AnnouncementCard';
import { Announcement } from '../types';

const sampleAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Campus Closure Due to Weather',
    content: 'Due to severe weather conditions, the campus will be closed tomorrow. All classes will be conducted online.',
    category: 'administrative',
    date: new Date('2024-03-15T08:00:00'),
    urgent: true
  },
  {
    id: '2',
    title: 'Spring Break Activities',
    content: 'Check out the exciting activities planned for spring break! Register now to secure your spot.',
    category: 'extracurricular',
    date: new Date('2024-03-18T10:00:00')
  },
  {
    id: '3',
    title: 'Midterm Schedule Released',
    content: 'The midterm examination schedule has been published. Please check your student portal for details.',
    category: 'academic',
    date: new Date('2024-03-20T09:00:00')
  }
];

export default function Announcements() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const filteredAnnouncements = selectedCategory
    ? sampleAnnouncements.filter(announcement => announcement.category === selectedCategory)
    : sampleAnnouncements;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Announcements</h1>
          <select
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="academic">Academic</option>
            <option value="extracurricular">Extracurricular</option>
            <option value="administrative">Administrative</option>
          </select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredAnnouncements.map(announcement => (
            <AnnouncementCard key={announcement.id} announcement={announcement} />
          ))}
        </div>
      </div>
    </div>
  );
}