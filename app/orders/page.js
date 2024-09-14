import { Container, Typography, Box } from "@mui/material";
import React from "react";
import TransactionsList from "../components/TransactionList";
import Navbar from "../components/Navbar";

const Orders = () => {
  return (
    <Container 
      maxWidth="xl" 
      sx={{ 
        pt: 15, 
        pr: 1, 
        pl: 1, 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center the content horizontally
      }}
    >
      <Navbar username={'ferika'} />
      <Box 
        sx={{ 
          display: 'flex',
          color: '#333',
          flexDirection: 'column', // Stack title and list vertically
          width: {
            xs: '100%', // Full width on extra-small screens
            sm: '80%',  // 80% width on small screens
            md: '70%',  // 70% width on medium screens
            lg: '60%',  // 60% width on large screens
            xl: '50%'   // 50% width on extra-large screens
          },
          maxWidth: '1200px', // Optional: Set a maximum width
          mt: 1,
          alignItems: 'flex-start', // Align items to the left
        }}
      >
        <Box 
          sx={{ 
            position: 'relative', 
            display: 'inline-block', 
            mb: 2,
          }}
        >
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              position: 'relative',
              display: 'inline',
              fontSize: {
                xs: 'h6.fontSize', // Adjust font size for extra-small screens
                sm: 'h5.fontSize', // Adjust font size for small screens
                md: 'h4.fontSize', // Default font size for medium screens and up
              }
            }}
          >
            Orders
          </Typography>
          <Box 
            sx={{ 
              position: 'absolute',
              bottom: -5,
              left: 0,
              width: '100%', // This will be adjusted to match the title's width
              height: 2,
              backgroundColor: '#d4af37', /* Gold underline */
              transform: 'translateY(100%)', // Move underline below the text
            }}
          />
        </Box>
        <Box 
          sx={{ 
            width: '100%', 
            p: 0, 
            mt: 2, // Add margin-top if needed
          }}
        >
          <TransactionsList />
        </Box>
      </Box>
    </Container>
  );
};

export default Orders;
