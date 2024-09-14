"use client"
import React from "react";
import {
  Button,
  Typography,
  Container,
  Card,
  CardContent,
} from "@mui/material";
import {
  Star,
  IntegrationInstructions,
  Speed,
} from "@mui/icons-material";
import styles from "./css/LandingPage.module.css";
import { useRouter } from "next/navigation";

const LandingPage = ({ username }) => {
  const router = useRouter();
  const redirectToHomepage = () => {
    router.push("/myplans");
  };

  if (username) {
    redirectToHomepage();
  }

  return (
    <Container maxWidth={false} disableGutters className={styles.container}>
      <div className={styles.backgroundStars} />
      <Typography variant="h1" className={styles.title}>
        Welcome to Wilayah RI API
      </Typography>
      <Typography variant="body1" className={styles.description}>
        Unlock the potential of our API to seamlessly integrate and enrich your
        applications with comprehensive location data. Start exploring and
        enhance your project with valuable geographical insights today!
      </Typography>
      <Button className={styles.button} variant="contained" onClick={() => router.push('/auth/signin')}>
        Get Started for Free
      </Button>
      <div className={styles.cardsSection}>
        <Card className={styles.card}>
          <CardContent>
            <Star className={styles.cardIcon} />
            <Typography variant="h5" className={styles.cardTitle}>
              Reliable Data
            </Typography>
            <Typography variant="body2" className={styles.cardDescription}>
              Our API provides accurate and up-to-date location data to ensure
              your application runs smoothly and effectively.
            </Typography>
          </CardContent>
        </Card>
        <Card className={styles.card}>
          <CardContent>
            <IntegrationInstructions className={styles.cardIcon} />
            <Typography variant="h5" className={styles.cardTitle}>
              Easy Integration
            </Typography>
            <Typography variant="body2" className={styles.cardDescription}>
              Simple and straightforward integration process with detailed
              documentation and support.
            </Typography>
          </CardContent>
        </Card>
        <Card className={styles.card}>
          <Speed className={styles.cardIcon} />
          <Typography variant="h5" className={styles.cardTitle}>
            Scalable Solutions
          </Typography>
          <Typography variant="body2" className={styles.cardDescription}>
            Designed to scale with your needs, our API handles large volumes of
            data efficiently.
          </Typography>
        </Card>
      </div>
    </Container>
  );
};

export default LandingPage;
