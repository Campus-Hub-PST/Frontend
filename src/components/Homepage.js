import React from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaUsers, FaSearch, FaBullhorn } from "react-icons/fa";
import './Homepage.css';

const Homepage = () => {
  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1>Welcome to Campus Hub!</h1>
        <p>Your centralized platform for campus activities and services.</p>
      </header>
      <div className="quick-links">
        <h2>Explore Features</h2>
        <div className="link-grid">
          <Link to="/event-calendar" className="feature-link">
            <FaCalendarAlt size={30} />
            <span>Event Calendar</span>
          </Link>
          <Link to="/study-groups" className="feature-link">
            <FaUsers size={30} />
            <span>Study Groups</span>
          </Link>
          <Link to="/lost-and-found" className="feature-link">
            <FaSearch size={30} />
            <span>Lost and Found</span>
          </Link>
          <Link to="/announcements" className="feature-link">
            <FaBullhorn size={30} />
            <span>Announcements</span>
          </Link>
        </div>
      </div>
      <footer className="homepage-footer">
        <p>© 2024 Campus Hub - All rights reserved</p>
      </footer>
    </div>
  );
};

export default Homepage;
