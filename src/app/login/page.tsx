"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { Button, Stack, TextInput } from "@carbon/react";
import Image from "next/image";
import { signInWithGoogle } from "@/lib/firebase";
// import "../styles/auth.module.scss";

// ✅ Validation Schema using Yup
const validationSchema = Yup.object({
  fullName: Yup.string().required("Full Name is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Login() {
  const router = useRouter();

  // ✅ Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    const user = await signInWithGoogle();
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      alert("Google Login successful! Redirecting...");
      setTimeout(() => {
        router.push("/dashboard");
      }, 500);
    } else {
      alert("Google Login failed. Try again.");
    }
  };

  return (
    <div className="auth-wrapper">
      <h2 className="auth-header">IBM IntelliSphere Optim</h2>
      <div className="auth-container">
        <div className="auth-card">
          <h2>Login</h2>
          <br />

          {/* ✅ Formik Form */}
          <Formik
            initialValues={{ fullName: "", password: "" }}
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
                  localStorage.setItem("user", JSON.stringify(values));
                  alert("Login successful! Redirecting...");
                  resetForm();
                  setTimeout(() => {
                    router.push("/dashboard");
                  }, 500);
                } else {
                  alert("Invalid credentials. Please try again.");
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

                  {/* Login Button */}
                  <Button type="submit" kind="tertiary" disabled={isSubmitting}>
                    {isSubmitting ? "Logging in..." : "Login"}
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>

          {/* ✅ Google Sign-In */}
          <div className="auth-google">
            <span>Login with Google</span>
            <button onClick={handleGoogleSignIn}>
              <Image
                src="/icons8-google.svg"
                alt="Login with Google"
                width={25}
                height={25}
              />
            </button>
          </div>

          {/* ✅ Signup Redirect */}
          <p className="auth-link">
            Don't have an account? <a href="/">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
}
