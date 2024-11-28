import React from 'react';
import { Users, Calendar, Wifi, WifiOff } from 'lucide-react';
import { StudyGroup } from '../types';
import { format } from 'date-fns';

interface StudyGroupCardProps {
  group: StudyGroup;
  onJoin?: (groupId: string) => void;
}

export default function StudyGroupCard({ group, onJoin }: StudyGroupCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-white">{group.name}</h3>
        {group.isOnline ? (
          <Wifi className="text-green-500" size={20} />
        ) : (
          <WifiOff className="text-gray-500" size={20} />
        )}
      </div>
      <p className="text-gray-400 mb-4">{group.course}</p>
      <div className="flex items-center text-gray-300 mb-3">
        <Users size={16} className="mr-2" />
        <span>{group.members} members</span>
      </div>
      {group.nextSession && (
        <div className="flex items-center text-gray-300 mb-4">
          <Calendar size={16} className="mr-2" />
          <span>Next: {format(group.nextSession, 'PPp')}</span>
        </div>
      )}
      <button
        onClick={() => onJoin?.(group.id)}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors"
      >
        Join Group
      </button>
    </div>
  );
}