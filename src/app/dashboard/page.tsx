"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Grid, Column, Header, HeaderName } from "@carbon/react";
import { logout } from "@/lib/firebase";
import styles from "../styles/dashboard.module.scss";
import { Archive, Delete, Folder, ChartBar } from "@carbon/icons-react"; // Carbon icons import
import GlobalHeader from "@/components/GlobalHeader";

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
    <>
      {/* Global Header */}
      <GlobalHeader />

      {/* Dashboard Title Section */}
      <Grid fullWidth>
        <Column lg={12} md={8} sm={4}>
          <h2 className={styles.dashboardTitle}>Dashboard</h2>{" "}
          {/* Applying the styles */}
          <p>Welcome, Admin</p>
        </Column>
      </Grid>

      {/* Action Buttons Section */}
      <Grid>
        <Column lg={3} md={6} sm={12}>
          <Button kind="tertiary" className={styles.dashboardButton}>
            {" "}
            {/* Applying styles */}
            Archive
          </Button>
        </Column>
        <Column lg={3} md={6} sm={12}>
          <Button kind="tertiary" className={styles.dashboardButton}>
            {" "}
            {/* Applying styles */}
            Delete
          </Button>
        </Column>
        <Column lg={3} md={6} sm={12}>
          <Button kind="tertiary" className={styles.dashboardButton}>
            {" "}
            {/* Applying styles */}
            Browse
          </Button>
        </Column>
        <Column lg={3} md={6} sm={12}>
          <Button kind="tertiary" className={styles.dashboardButton}>
            {" "}
            {/* Applying styles */}
            Reports
          </Button>
        </Column>
      </Grid>
    </>
  );
}
