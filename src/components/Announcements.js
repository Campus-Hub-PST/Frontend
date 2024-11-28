import React, { useState } from "react";
import './Announcements.css';

const Announcements = () => {
  const [search, setSearch] = useState("");
  const announcements = [
    { id: 1, title: "Holiday Notice", category: "Administrative" },
    { id: 2, title: "AI Workshop", category: "Academic" },
  ];

  const filteredAnnouncements = announcements.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="announcements-container">
      <h2>Announcements</h2>
      <input
        type="text"
        placeholder="Search announcements"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      <ul className="announcements-list">
        {filteredAnnouncements.map((announcement) => (
          <li key={announcement.id} className="announcement-item">
            <strong>{announcement.title}</strong> - {announcement.category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Announcements;
