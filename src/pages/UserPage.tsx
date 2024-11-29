import React, { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../components/firebase";

const UserInfo: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // Fetch user data from Firestore collection "user" using uid
        const userDocRef = doc(db, "user", currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setFirstName(userDoc.data().firstName || "No Name");
        } else {
          console.log("No such document!");
        }
      }
    });

    return () => unsubscribe(); // Clean up listener
  }, []);

  return (
    <div style={styles.container}>
      {user ? (
        <div style={styles.card}>
          <h2 style={styles.heading}>Welcome, {firstName || "User"}!</h2>
          <p style={styles.email}>Email: {user.email}</p>
          <button style={styles.button} onClick={() => auth.signOut()}>
            Logout
          </button>
        </div>
      ) : (
        <p>Please log in to see user information.</p>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  card: {
    width: "300px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "10px",
  },
  email: {
    fontSize: "16px",
    color: "#555",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default UserInfo;
