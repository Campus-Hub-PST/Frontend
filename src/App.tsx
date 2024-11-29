import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Events from "./pages/Events";
import Announcements from "./pages/Announcements";
import StudyGroups from "./pages/StudyGroups";
import LostFound from "./pages/LostFound";
import Login from "./components/Login";
import Register from "./pages/Register";
import UserPage from "./pages/UserPage";
import { ToastContainer } from "react-toastify";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth } from "./components/firebase";
import "./components/Login.css";
function App() {
  // State to track if the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Set up the authentication state listener
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      setIsAuthenticated(!!user); // Set to true if user is logged in
    });
    return () => unsubscribe(); // Clean up listener on component unmount
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      console.log("User logged out successfully");
    } catch (error) {
      console.log("Error logging out:", error.message);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <ToastContainer />
        {isAuthenticated ? (
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Events />} />
              <Route path="/announcements" element={<Announcements />} />
              <Route path="/study-groups" element={<StudyGroups />} />
              <Route path="/lost-found" element={<LostFound />} />
              <Route path="/user-page" element={<UserPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
