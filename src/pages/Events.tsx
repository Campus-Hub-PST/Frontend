import React, { useState } from "react";
import EventCard from "../components/EventCard";
import Calendar from "../components/Calendar";
import { Event } from "../types";
import { toast } from "react-toastify";
import { db } from "../components/firebase"; // Ensure this points to your Firebase config
import { collection, addDoc } from "firebase/firestore";
import "./Events.css"

const sampleEvents: Event[] = [
  {
    id: "1",
    title: "End of Semester Concert",
    description:
      "Join us for an amazing evening of music featuring student bands and special guests.",
    date: new Date("2024-12-25T19:00:00"),
    location: "Polaris School of Technology",
    category: "cultural",
    image:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80",
  },
  {
    id: "2",
    title: "Final Exams Preparation Workshop",
    description:
      "Learn effective study techniques and time management strategies for finals.",
    date: new Date("2024-12-20T14:00:00"),
    location: "Library Study Hall",
    category: "academic",
  },
  {
    id: "3",
    title: "Inter-College Basketball Tournament",
    description: "Support our team in the championship game!",
    date: new Date("2024-12-22T16:00:00"),
    location: "Sports Complex",
    category: "sports",
    image:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80",
  },
];

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [view, setView] = useState<"calendar" | "list">("list");
  const [showForm, setShowForm] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const filteredEvents = selectedCategory
    ? sampleEvents.filter((event) => event.category === selectedCategory)
    : sampleEvents;

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const newEvent = {
        title,
        description,
        date: new Date(date), // Convert string to Date object
        location,
        category,
      };

      await addDoc(collection(db, "events"), newEvent); // Add to Firestore
      toast.success("Event added successfully!");
      setShowForm(false); // Close the modal after saving

      // Clear form fields
      setTitle("");
      setDescription("");
      setDate("");
      setLocation("");
      setCategory("");
    } catch (error) {
      console.error("Error adding event:", error);
      toast.error("Error adding event. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Upcoming Events</h1>
          <div className="flex space-x-4 navbar-buttons justify-end">
            <button
              className="bg-purple-600 px-4 py-2 rounded-lg add-event-button"
              onClick={() => setShowForm(true)}
            >
              Add Event
            </button>
            <select
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="academic">Academic</option>
              <option value="sports">Sports</option>
              <option value="cultural">Cultural</option>
            </select>
            <div className="flex rounded-lg overflow-hidden">
              <button
                className={`px-4 py-2 ${
                  view === "list" ? "bg-purple-600" : "bg-gray-800"
                }`}
                onClick={() => setView("list")}
              >
                List
              </button>
              <button
                className={`px-4 py-2 ${
                  view === "calendar" ? "bg-purple-600" : "bg-gray-800"
                }`}
                onClick={() => setView("calendar")}
              >
                Calendar
              </button>
            </div>
          </div>
        </div>

        {view === "list" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <Calendar events={filteredEvents} />
        )}

        {/* Modal Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-8 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Add New Event</h2>
              <form onSubmit={handleFormSubmit}>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Event Title"
                  className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
                  required
                />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Event Description"
                  className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
                  required
                />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
                  required
                />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Event Location"
                  className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
                  required
                />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="academic">Academic</option>
                  <option value="sports">Sports</option>
                  <option value="cultural">Cultural</option>
                </select>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    className="bg-gray-600 px-4 py-2 rounded-lg"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-purple-600 px-4 py-2 rounded-lg"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
