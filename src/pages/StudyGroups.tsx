import React, { useState } from 'react';
import StudyGroupCard from '../components/StudyGroupCard';
import { StudyGroup } from '../types';

const sampleGroups: StudyGroup[] = [
  {
    id: '1',
    name: 'Calculus Study Group',
    course: 'MATH 201 - Calculus II',
    members: 8,
    nextSession: new Date('2024-03-18T15:00:00'),
    isOnline: true
  },
  {
    id: '2',
    name: 'Django Study Group',
    course: 'CS 301 - Python Programming',
    members: 5,
    nextSession: new Date('2024-03-19T14:00:00'),
    isOnline: false
  },
  {
    id: '3',
    name: 'Programming Workshop',
    course: 'CS 301 - Data Structures',
    members: 12,
    nextSession: new Date('2024-03-20T16:00:00'),
    isOnline: true
  }
];

export default function StudyGroups() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  const filteredGroups = sampleGroups
    .filter(group => 
      (group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       group.course.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!showOnlineOnly || group.isOnline)
    );

  const handleJoinGroup = (groupId: string) => {
    console.log(`Joined group ${groupId}`);
    // Implement join functionality
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Study Groups</h1>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Search groups..."
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                className="form-checkbox h-5 w-5 text-purple-600"
              />
              <span>Online Only</span>
            </label>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map(group => (
            <StudyGroupCard
              key={group.id}
              group={group}
              onJoin={handleJoinGroup}
            />
          ))}
        </div>
      </div>
    </div>
  );
}