import { Container } from "@mui/material";
import React from "react";
import SignInForm from "../../components/SignInForm";
import { auth } from "@/auth";



const SignInPage = async () => {
  const session = await auth();
  
  return (
    <Container maxWidth="xl" sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      pb: '5%'
    }}>
      <SignInForm session={session}/>
    </Container>
  );
};

export default SignInPage;
