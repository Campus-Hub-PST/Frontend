import React, { useState, useEffect } from "react";
import AnnouncementCard from "../components/AnnouncementCard";
import { Announcement } from "../types";
import { collection, getDocs, query, orderBy, doc, deleteDoc, addDoc } from "firebase/firestore";
import { db } from "../components/firebase";

export default function Announcements() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState<Announcement[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  // Announcement data for adding new one
  const [newAnnouncement, setNewAnnouncement] = useState<Announcement>({
    title: "",
    content: "",
    category: "",
    urgent: false,
    date: new Date(),
  });

  // Fetch announcements from Firebase
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const q = query(collection(db, "Announcements"), orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);
        const fetchedAnnouncements: Announcement[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          date: doc.data().date.toDate(), // Convert Firestore timestamp to JS Date
        })) as Announcement[];
        setAnnouncements(fetchedAnnouncements);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  // Filter announcements based on the selected category
  useEffect(() => {
    setFilteredAnnouncements(
      selectedCategory
        ? announcements.filter((announcement) => announcement.category === selectedCategory)
        : announcements
    );
  }, [selectedCategory, announcements]);

  // Handle Delete Announcement
  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "Announcements", id));
      setAnnouncements((prev) => prev.filter((announcement) => announcement.id !== id));
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };

  // Handle Add Announcement
  const handleAddAnnouncement = async () => {
    try {
      // Add new announcement to Firestore
      await addDoc(collection(db, "Announcements"), {
        title: newAnnouncement.title,
        content: newAnnouncement.content,
        category: newAnnouncement.category,
        urgent: newAnnouncement.urgent,
        date: newAnnouncement.date,
      });

      // Close the modal and reset the form
      setShowModal(false);
      setNewAnnouncement({
        title: "",
        content: "",
        category: "",
        urgent: false,
        date: new Date(),
      });
    } catch (error) {
      console.error("Error adding announcement:", error);
    }
  };

  return (
<div className="min-h-screen bg-gray-900 text-white">
  <div className="max-w-7xl mx-auto px-4 py-8">
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Announcements</h1>
      <div className="flex space-x-4">
        <select
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="academic">Academic</option>
          <option value="extracurricular">Extracurricular</option>
          <option value="administrative">Administrative</option>
        </select>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Add Announcement
        </button>
      </div>
    </div>

    {/* Announcement Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {filteredAnnouncements.map((announcement) => (
        <div key={announcement.id} className="relative">
          <AnnouncementCard announcement={announcement} />
          
          {/* Delete Button */}
          <button
            onClick={() => handleDelete(announcement.id)}
            className="absolute w-15 delete-button bg-red-600 hover:bg-red-700 text-white text-xs py-1 rounded-full"
          >
            Delete
          </button>
        </div>
      ))}
    </div>

    {/* Modal for Adding Announcement */}
    {showModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-bold text-white mb-4">Add Announcement</h2>

          {/* Form for Announcement */}
          <div className="mb-4">
            <label className="text-white">Title</label>
            <input
              type="text"
              value={newAnnouncement.title}
              onChange={(e) =>
                setNewAnnouncement({ ...newAnnouncement, title: e.target.value })
              }
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-md"
              placeholder="Title"
            />
          </div>

          <div className="mb-4">
            <label className="text-white">Content</label>
            <textarea
              value={newAnnouncement.content}
              onChange={(e) =>
                setNewAnnouncement({ ...newAnnouncement, content: e.target.value })
              }
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-md"
              placeholder="Content"
            />
          </div>

          <div className="mb-4">
            <label className="text-white">Category</label>
            <select
              value={newAnnouncement.category}
              onChange={(e) =>
                setNewAnnouncement({ ...newAnnouncement, category: e.target.value })
              }
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-md"
            >
              <option value="academic">Academic</option>
              <option value="extracurricular">Extracurricular</option>
              <option value="administrative">Administrative</option>
            </select>
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              checked={newAnnouncement.urgent}
              onChange={() =>
                setNewAnnouncement({ ...newAnnouncement, urgent: !newAnnouncement.urgent })
              }
              className="mr-2"
            />
            <label className="text-white">Urgent</label>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setShowModal(false)}
              className="bg-gray-600 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleAddAnnouncement}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
</div>


  );
}
