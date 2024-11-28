import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Events from './pages/Events';
import Announcements from './pages/Announcements';
import StudyGroups from './pages/StudyGroups';
import LostFound from './pages/LostFound';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Events />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/study-groups" element={<StudyGroups />} />
          <Route path="/lost-found" element={<LostFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;