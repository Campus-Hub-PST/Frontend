import React, { useState } from "react";
import './LostAndFound.css';

const LostAndFound = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  const addItem = () => {
    setItems([...items, { id: items.length + 1, description: newItem }]);
    setNewItem("");
  };

  return (
    <div className="lost-found-container">
      <h2>Lost and Found</h2>
      <input
        type="text"
        placeholder="Describe the lost item"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        className="item-input"
      />
      <button onClick={addItem} className="add-item-button">
        Add Item
      </button>
      <ul className="items-list">
        {items.map((item) => (
          <li key={item.id} className="item">
            {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LostAndFound;
