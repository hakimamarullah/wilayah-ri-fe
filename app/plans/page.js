import { Container } from "@mui/material";
import React from "react";
import TransactionsList from "../components/TransactionList";
import Navbar from "../components/Navbar";

const Plans = () => {
  return (
    <Container maxWidth="xl" sx={{ pt: 15, pr: 1, pl: 1, minHeight: '50vh' }}>
      <Navbar username={'ferika'}/>
      <Container maxWidth="md" sx={{ p: 0}}>
      <TransactionsList/>
      </Container>
    </Container>
  );
};

export default Plans;
