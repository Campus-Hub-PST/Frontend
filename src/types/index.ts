export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  category: 'academic' | 'sports' | 'cultural';
  image?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: 'academic' | 'extracurricular' | 'administrative';
  date: Date;
  urgent?: boolean;
}

export interface StudyGroup {
  id: string;
  name: string;
  course: string;
  members: number;
  nextSession?: Date;
  isOnline: boolean;
}

export interface LostItem {
  id: string;
  title: string;
  description: string;
  lastSeen: string;
  date: Date;
  category: string;
  status: 'lost' | 'found';
  image?: string;
}