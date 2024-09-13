import { Container, Typography, Box } from "@mui/material";
import React from "react";
import Navbar from "../components/Navbar";
import PricePlanList from "../components/PricePlanList";

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

const Plans = () => {
  return (
    <Container 
      maxWidth="xl" 
      sx={{ 
        pt: 15, 
        pr: 1, 
        pl: 1, 
        minHeight: '50vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Navbar username={'ferika'} />
      <Box 
        sx={{ 
          textAlign: {
            xs: 'center', // Center text on extra-small screens
            sm: 'center', // Center text on small screens
            md: 'center'  // Center text on medium screens and up
          },
          mb: 4,
          width: {
            xs: '100%', // Full width on extra-small screens
            sm: '80%',  // 80% width on small screens
            md: '70%',  // 70% width on medium screens
            lg: '60%',  // 60% width on large screens
            xl: '50%'   // 50% width on extra-large screens
          },
          maxWidth: '1200px', // Optional: Set a maximum width
        }}
      >
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            display: 'inline-block',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              left: '50%',
              bottom: -5,
              width: '100%',
              height: 2,
              backgroundColor: '#d4af37', /* Gold underline */
              transform: 'translateX(-50%)',
            }
          }}
        >
          API Tier Plans
        </Typography>
      </Box>
      <Box 
        sx={{ 
          width: '100%', 
          p: 0, 
          mt: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <PricePlanList plans={pricePlans} />
      </Box>
    </Container>
  );
};

export default Plans;
