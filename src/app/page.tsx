"use client";

import { useState } from "react";
import { Button, Stack, TextInput } from "@carbon/react";
import Link from "next/link";

export default function Home() {
  // State to store form data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  // State for error messages
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  // State to handle success/error messages
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    // Clear error message when user types
    setErrors({ ...errors, [id]: "" });
  };

  // Form validation function
  const validateForm = () => {
    let valid = true;
    let newErrors = { fullName: "", email: "", password: "" };

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required.";
      valid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
      valid = false;
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh

    if (!validateForm()) {
      return; // Stop form submission if validation fails
    }

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setMessage("Signup successful! Redirecting...");
        setFormData({ fullName: "", email: "", password: "" });

        // Redirect to login after 2 seconds
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        setMessage("Signup failed. Please try again.");
      }
    } catch (error) {
      setMessage("Error submitting the form.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: "url('/bg2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          width: "350px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          textAlign: "left",
          backgroundColor: "rgba(255, 255, 255, 0.8)", // Slight transparency for readability
        }}
      >
        <h2>Signup</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <Stack gap={5}>
            {/* Full Name Input (Fixed id & Controlled Input) */}
            <TextInput
              id="fullName"
              labelText="Name"
              placeholder="Enter your full name"
              invalid={!!errors.fullName}
              invalidText={errors.fullName}
              warnText="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              style={{ marginBottom: "15px" }}
            />

            {/* Email Input (Controlled Input) */}
            <TextInput
              id="email"
              type="email"
              labelText="Email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              invalid={!!errors.email}
              invalidText={errors.email}
              style={{ marginBottom: "15px" }}
            />

            {/* Password Input (Controlled Input) */}
            <TextInput
              id="password"
              type="password"
              labelText="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              invalid={!!errors.password}
              invalidText={errors.password}
              style={{ marginBottom: "15px" }}
            />

            {/* Signup Button */}
            <Button
              type="submit"
              kind="tertiary"
              disabled={
                !formData.fullName || !formData.email || !formData.password
              }
            >
              Signup
            </Button>
          </Stack>
        </form>

        {/* Show success or error message */}
        {message && (
          <p
            style={{
              color: message.includes("successful") ? "green" : "red",
              marginTop: "10px",
            }}
          >
            {message}
          </p>
        )}

        {/* Login Redirect */}
        <p style={{ marginTop: "10px", fontSize: "14px", textAlign: "right" }}>
          Already have an account?{" "}
          <Link
            href="/login"
            style={{ color: "#0f62fe", textDecoration: "underline" }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
