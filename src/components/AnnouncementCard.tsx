import React from 'react';
import { Bell, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { Announcement } from '../types';
import { clsx } from 'clsx';

interface AnnouncementCardProps {
  announcement: Announcement;
}

export default function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  return (
    <div className={clsx(
      "bg-gray-800 rounded-lg p-6 shadow-lg",
      announcement.urgent && "border-2 border-red-500"
    )}>
      <div className="flex items-center justify-between mb-4">
        <span className={clsx(
          "px-3 py-1 rounded-full text-sm",
          announcement.category === 'academic' && "bg-blue-500",
          announcement.category === 'extracurricular' && "bg-green-500",
          announcement.category === 'administrative' && "bg-purple-500"
        )}>
          {announcement.category}
        </span>
        {announcement.urgent && (
          <span className="flex items-center text-red-500">
            <Bell size={16} className="mr-1" />
            Urgent
          </span>
        )}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{announcement.title}</h3>
      <p className="text-gray-400 mb-4">{announcement.content}</p>
      <div className="flex items-center text-gray-300">
        <Clock size={16} className="mr-2" />
        <span>{format(announcement.date, 'PPp')}</span>
      </div>
    </div>
  );
}