import { Container, Typography, Box } from "@mui/material";
import React from "react";
import Navbar from "../components/Navbar";
import PricePlanList from "../components/PricePlanList";
import { auth } from "@/auth";
import styles from './Plan.module.css'; // Import CSS module

const pricePlans = [
  {
    tiername: "Basic Plan",
    limit: 100,
    ttl: 2592000000, // 30 days in milliseconds
    price: 500000, // Price in IDR
    description: "Ideal for small businesses with moderate needs.",
  },
  {
    tiername: "Standard Plan",
    limit: 500,
    ttl: 5184000000, // 60 days in milliseconds
    price: 1000000, // Price in IDR
    description: "Perfect for growing businesses with higher requirements.",
  },
  {
    tiername: "Premium Plan",
    limit: 1000,
    ttl: 7776000000, // 90 days in milliseconds
    price: 2000000, // Price in IDR
    description: "For large enterprises with extensive needs.",
  },
];

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
        <PricePlanList plans={pricePlans} />
      </Box>
    </Container>
  );
};

export default Plans;
