import { auth } from "@/auth";
import { Container, Typography } from "@mui/material";
import Navbar from "./components/Navbar";
import ApiKeyList from "./components/ApiKeyCardList";

export default async function Home() {
  let session = await auth();
  
  return (
    <Container sx={{ mt: 15, mb: "100vh" }} maxWidth="md">
      <Navbar username={session?.user?.username} />
      <Typography 
        variant="h4" 
        component="h1" 
        align="center" 
        sx={{ 
          mb: 4,
          position: 'relative',
          display: 'inline-block',
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
        Active Plans
      </Typography>
      <ApiKeyList/>
    </Container>
  );
}
