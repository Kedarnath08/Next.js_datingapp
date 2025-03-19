"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Grid, Column, Tile, Header, HeaderName } from "@carbon/react";
import { logout } from "@/lib/firebase";
import styles from "@/app/styles/dashboard.module.scss";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );

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
    <div className={styles.dashboardContainer}>
      {/* Carbon Header */}
      <Header aria-label="Dashboard">
        <HeaderName href="#" prefix="🚀">
          Dashboard
        </HeaderName>
      </Header>

      <div className={styles.dashboardContent}>
        <h2 className={styles.dashboardHeading}>
          Welcome, {user?.name || "Guest"}! 🎉
        </h2>
        <p className={styles.dashboardText}>
          Check out these amazing creative websites:
        </p>

        {/* 🔹 Grid Section */}
        <Grid className={styles.dashboardGrid}>
          {[
            { name: "🧊 Igloo", url: "https://www.igloo.inc/" },
            {
              name: "🏰 Townscrapper",
              url: "https://oskarstalberg.com/Townscaper/#GSB0RARueC6Snc9E0lO5B",
            },
            { name: "🍺 Brewdistrict24", url: "https://brewdistrict24.com/en" },
            { name: "🚗 Bruno", url: "https://bruno-simon.com/" },
          ].map((site, index) => (
            <Column key={index} lg={4} md={6} sm={12}>
              <Tile className={styles.tile}>
                <a href={site.url} target="_blank" className={styles.tileLink}>
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
          className={styles.logoutButton}
        >
          🚪 Logout
        </Button>
      </div>
    </div>
  );
}
