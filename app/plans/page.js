import { Container, Typography, Box } from "@mui/material";
import React from "react";
import Navbar from "../components/Navbar";
import PricePlanList from "../components/PricePlanList";
import { auth } from "@/auth";
import styles from "./Plan.module.css"; // Import CSS module



const Plans = async () => {
  const session = await auth();
  return (
    <Container
      maxWidth="xl"
      className={styles.container} // Apply CSS Module class
    >
      <Navbar username={session?.user?.username} />
      <Box
        className={styles.titleBox} // Apply CSS Module class
      >
        <Typography
          variant="h4"
          component="h1"
          className={styles.title} // Apply CSS Module class
        >
          API Tier Plans
        </Typography>
      </Box>
      <Box
        className={styles.listBox} // Apply CSS Module class
      >
        <PricePlanList userToken={session?.user?.accessToken} />
      </Box>
    </Container>
  );
};

export default Plans;
