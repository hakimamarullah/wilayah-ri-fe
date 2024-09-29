import { Container } from "@mui/material";
import React from "react";
import SignUpForm from "@/app/components/SignUpForm";
import { auth } from "@/auth";

const SignUpPage = async () => {
  const session = await auth();
 
  return (
    <Container maxWidth="xl" sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      pb: '5%'
    }}>
      <SignUpForm session={session}/>
    </Container>
  );
};

export default SignUpPage;
