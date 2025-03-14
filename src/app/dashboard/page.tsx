"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Grid, Column, Tile, Header, HeaderName } from "@carbon/react";
import { logout } from "@/lib/firebase";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push("/login");
    }
  }, [router]);

  // Logout Function
  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div
  style={{
    minHeight: "100vh",
    backgroundImage: "url('/bg2.jpg')", // Background Image for Entire Dashboard
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "start",
    position: "relative",
  }}
>
  {/* Carbon Header */}
  <Header aria-label="Dashboard">
    <HeaderName href="#" prefix="🚀">Dashboard</HeaderName>
  </Header>

  <div
    style={{
      width: "90%",
      maxWidth: "1000px",
      padding: "40px",
      borderRadius: "15px",
      textAlign: "center",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      marginTop: "80px",
      zIndex: 1,
    }}
  >
    <h2 style={{ color: "#fff", fontSize: "28px" }}>Welcome, {user?.name || "Guest"}! 🎉</h2>
    <p style={{ color: "#ddd", fontSize: "16px" }}>
      Check out these amazing creative websites:
    </p>

    {/* 🔹 Grid Section with Gradient Background */}
    <Grid>
      {[
        { name: "🧊 Igloo", url: "https://www.igloo.inc/" },
        { name: "🏰 Townscrapper", url: "https://oskarstalberg.com/Townscaper/#GSB0RARueC6Snc9E0lO5B" },
        { name: "🍺 Brewdistrict24", url: "https://brewdistrict24.com/en" },
        { name: "🚗 Bruno", url: "https://bruno-simon.com/" },
      ].map((site, index) => (
        <Column key={index} lg={4} md={6} sm={12}>
          <Tile
  style={{
    backgroundColor: "transparent", // 🚀 Initially fully invisible
    backdropFilter: "none", // ❌ No blur initially
    borderRadius: "10px",
    padding: "15px",
    textAlign: "center",
    transition: "0.3s ease-in-out",
    border: "1px solid transparent", // ❌ No border initially
  }}
  onMouseOver={(e) => {
    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)"; // 🔹 Glass Effect Appears
    e.currentTarget.style.backdropFilter = "blur(30px)"; // 🔹 Blur Effect on Hover
    e.currentTarget.style.border = "1px solid rgba(255, 255, 255, 0.2)"; // 🔹 Soft Border Appears
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.backgroundColor = "transparent"; // 🔄 Reset to Invisible
    e.currentTarget.style.backdropFilter = "none";
    e.currentTarget.style.border = "1px solid transparent";
  }}
>
  <a
    href={site.url}
    target="_blank"
    style={{
      textDecoration: "none",
      color: "#fff",
      fontSize: "16px",
      transition: "0.3s ease-in-out",
    }}
  >
    {site.name}
  </a>
</Tile>

        </Column>
      ))}
    </Grid>

        {/* Logout Button */}
        <Button
  kind="danger"
  onClick={handleLogout}
  style={{
    marginTop: "20px",
    background: "linear-gradient(to right, #d0eaff, #b3daff)", // 🌊 Very Light Blue Gradient
    color: "#004080", // 🔹 Darker Blue Text for Contrast
    border: "none",
    padding: "10px 20px",
    borderRadius: "30px",
    fontWeight: "bold",
    transition: "0.3s ease-in-out",
  }}
  onMouseOver={(e) => {
    e.currentTarget.style.background = "linear-gradient(to right, #b3daff, #99c9ff)"; // 🔹 Slightly Darker on Hover
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.background = "linear-gradient(to right, #d0eaff, #b3daff)"; // 🔄 Reset to Light Blue
  }}
>
  🚪 Logout
</Button>

      </div>
    </div>
  );
}
