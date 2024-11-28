import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import EventCalendar from "./components/EventCalendar";
import StudyGroups from "./components/StudyGroups";
import LostAndFound from "./components/LostAndFound";
import Announcements from "./components/Announcements";
import LoginRegisterPage from "./components/LoginRegisterPage";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route path="/" element={<Homepage />} />
          <Route path="/event-calendar" element={<EventCalendar />} />
          <Route path="/study-groups" element={<StudyGroups />} />
          <Route path="/lost-and-found" element={<LostAndFound />} />
          <Route path="/announcements" element={<Announcements />} /> */}
          <Route path="/" element={<LoginRegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
