import { Container } from "@mui/material";
import React from "react";
import SignUpForm from "@/app/components/SignUpForm";
import { auth } from "@/auth";

const SignUpPage = async () => {
  const session = await auth();
 
  return (
    <Container maxWidth="xl" sx={{overflowY: 'hidden', minHeight: '100vh'}}>
      <SignUpForm session={session}/>
    </Container>
  );
};

export default SignUpPage;
