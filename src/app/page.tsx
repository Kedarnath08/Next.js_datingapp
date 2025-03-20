"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Stack, TextInput } from "@carbon/react";
import Link from "next/link";
// import "../styles/auth.module.scss";

// Validation Schema using Yup
const validationSchema = Yup.object({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Signup() {
  return (
    <div className="auth-wrapper">
      <h2 className="auth-header">IBM IntelliSphere Optim</h2>
      <div className="auth-container">
        <div className="auth-card">
          <h3>Signup</h3>
          <br />

          <Formik
            initialValues={{ fullName: "", email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              try {
                const response = await fetch(
                  "https://jsonplaceholder.typicode.com/posts",
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                  }
                );

                if (response.ok) {
                  alert("Signup successful! Redirecting...");
                  resetForm();
                  setTimeout(() => {
                    window.location.href = "/login";
                  }, 2000);
                } else {
                  alert("Signup failed. Please try again.");
                }
              } catch (error) {
                alert("Error submitting the form.");
              }
              setSubmitting(false);
            }}
          >
            {({ isSubmitting, handleChange, values, errors, touched }) => (
              <Form>
                <Stack gap={5}>
                  {/* Full Name Input */}
                  <TextInput
                    id="fullName"
                    labelText="Name"
                    placeholder="Enter your full name"
                    invalid={!!errors.fullName && touched.fullName}
                    invalidText={errors.fullName}
                    value={values.fullName}
                    onChange={handleChange}
                  />

                  {/* Email Input */}
                  <TextInput
                    id="email"
                    type="email"
                    labelText="Email"
                    placeholder="Enter your email"
                    invalid={!!errors.email && touched.email}
                    invalidText={errors.email}
                    value={values.email}
                    onChange={handleChange}
                  />

                  {/* Password Input */}
                  <TextInput
                    id="password"
                    type="password"
                    labelText="Password"
                    placeholder="Enter your password"
                    invalid={!!errors.password && touched.password}
                    invalidText={errors.password}
                    value={values.password}
                    onChange={handleChange}
                  />

                  {/* Signup Button */}
                  <Button type="submit" kind="tertiary" disabled={isSubmitting}>
                    {isSubmitting ? "Signing up..." : "Signup"}
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>

          {/* Login Redirect */}
          <p className="auth-link">
            Already have an account? <Link href="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
