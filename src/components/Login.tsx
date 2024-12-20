import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      window.location.href = "/App";
      toast.success("User logged in Successfully", {
        position: "top-center",
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        toast.error(error.message, {
          position: "bottom-center",
        });
      } else {
        console.log("An unknown error occurred.");
        toast.error("An unknown error occurred.", {
          position: "bottom-center",
        });
      }
    }
  };

  return (
    <div className = "form-container">
      <form onSubmit={handleSubmit} >
      <h3>Login</h3>

      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      <p className="forgot-password text-right">
        New user <a href="/register">Register Here</a>
      </p>
      {/* <SignInwithGoogle /> */}
    </form>
    </div>
  );
}

export default Login;
