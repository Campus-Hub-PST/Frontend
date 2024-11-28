import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Event } from '../types';

interface CalendarProps {
  events: Event[];
  onEventClick?: (event: Event) => void;
}

export default function Calendar({ events, onEventClick }: CalendarProps) {
  const calendarEvents = events.map(event => ({
    id: event.id,
    title: event.title,
    start: event.date,
    classNames: [
      event.category === 'academic' ? 'bg-blue-500' :
      event.category === 'sports' ? 'bg-green-500' :
      'bg-purple-500'
    ]
  }));

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={calendarEvents}
        eventClick={(info) => {
          const event = events.find(e => e.id === info.event.id);
          if (event && onEventClick) {
            onEventClick(event);
          }
        }}
        height="auto"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek'
        }}
        theme={{
          background: '#1E1E1E',
          textColor: '#FFFFFF'
        }}
      />
    </div>
  );
}