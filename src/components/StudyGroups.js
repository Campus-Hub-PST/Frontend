import React, { useState } from "react";
import './StudyGroups.css';

const StudyGroups = () => {
  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState("");

  const addTopic = () => {
    setTopics([
      ...topics,
      { id: topics.length + 1, title: newTopic, participants: [] },
    ]);
    setNewTopic("");
  };

  return (
    <div className="study-groups-container">
      <h2>Study Groups</h2>
      <input
        type="text"
        placeholder="Propose a topic"
        value={newTopic}
        onChange={(e) => setNewTopic(e.target.value)}
        className="topic-input"
      />
      <button onClick={addTopic} className="add-topic-button">
        Add Topic
      </button>
      <ul className="topics-list">
        {topics.map((topic) => (
          <li key={topic.id} className="topic-item">
            <strong>{topic.title}</strong> - Participants:{" "}
            {topic.participants.length || "None"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudyGroups;
