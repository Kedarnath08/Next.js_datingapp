"use client";

import { useState } from "react";
import Image from "next/image";
import { Button, Link, Stack, TextInput } from "@carbon/react";
import { useRouter } from "next/navigation";
import { auth, provider, signInWithGoogle } from "@/lib/firebase";

export default function Login() {
    const router = useRouter(); // For navigation

// State to store form data
const [formData, setFormData] = useState({
    fullName: "",
    password: "",
  });

  // State to handle success/error messages
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Function to validate form
  const validateForm = () => {
    if (!formData.fullName.trim()) {
        setMessage("Full Name is required.");
        return false;
    }
    if (!formData.password.trim()) {
        setMessage("Password is required.");
        return false;
    }
    if (formData.password.length < 6) {
        setMessage("Password must be at least 6 characters.");
        return false;
    }
    return true;
};

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents page reload

    // Validate form before proceeding
    if (!validateForm()) return;

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(formData)); // ✅ Store user first
        setMessage("Login successful! Redirecting...");

        setTimeout(() => {
          router.push("/dashboard"); // Redirect user after login
        }, 500);
      } else {
        setMessage("Invalid credentials. Please try again.");
      }
    } catch (error) {
      setMessage("Error submitting the form.");
    }
  };

  // ✅ Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    const user = await signInWithGoogle();
    if (user) {
      localStorage.setItem("user", JSON.stringify(user)); // ✅ Store user first
      setMessage("Google Login-In successful! Redirecting...");

      setTimeout(() => {
       router.push("/dashboard"); // Redirect after login
      }, 500);
    } else {
      setMessage("Google Login-In failed. Try again.");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div style={{ width: "350px", padding: "20px", border: "1px solid #ccc", borderRadius: "8px", textAlign: "left" }}>
        <h2>Login</h2>
        <br />

        <form onSubmit={handleSubmit}>
        <Stack gap={5}>
            
        {/* Full Name Input */}
        <TextInput
          id="fullName"
          labelText="Name"
          placeholder="Enter your full name"
          invalidText="Use characters only"
          warnText="Enter your full name"
          value={formData.fullName}
          onChange={handleChange}
          style={{ marginBottom: "15px",}}
        />

        {/* Password Input */}
        <TextInput
          id="password"
          type="password"
          labelText="Password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          style={{ marginBottom: "15px" }}
        />

        {/* login Button */}
        <Button type="submit" kind="tertiary">Login</Button>
        </Stack>
    </form>

    {/* Show success or error message */}
    {message && (
      <p style={{ color: message.includes("successful") ? "green" : "red", marginTop: "10px" }}>
        {message}
      </p>
      )}

<div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "10px", // Space between text and logo
    marginTop: "15px",
  }}
>
  {/* Static text (NOT clickable) */}
  <span style={{ fontSize: "16px", fontWeight: "500", color: "#333" }}>
    Login with Google
  </span>

  {/* Clickable Google Logo */}
  <button
    onClick={handleGoogleSignIn}
    style={{
      background: "transparent",
      border: "none",
      cursor: "pointer",
      padding: 0, 
    }}
  >
    <Image
      src="/icons8-google.svg" 
      alt="Login with Google"
      width={40}
      height={40}
    />
  </button>
</div>
        
        {/* Login Redirect */}
        <p style={{ marginTop: "10px", fontSize: "14px", textAlign: "right" }}>
          Already have an account? <Link href="/" style={{ color: "#0f62fe", textDecoration: "underline" }}>Sign Up</Link>
        </p>
  </div>
    </div>
  );
}
