import { auth } from "@/auth";
import { Container, Typography } from "@mui/material";
import ApiKeyCardList from "../components/ApiKeyCardList";
import Navbar from "../components/Navbar";

export default async function MyPlans() {
  let session = await auth();

  return (
    <Container sx={{ mt: 15, mb: "100vh", color: "black" }} maxWidth="md">
      <Navbar username={session?.user?.username} />
      <Typography
        variant="h4"
        component="h1"
        align="center"
        color={"black"}
        sx={{
          mb: 4,
          position: "relative",
          display: "inline-block",
          "&::after": {
            content: '""',
            position: "absolute",
            left: "50%",
            bottom: -5,
            width: "100%",
            height: 2,
            backgroundColor: "#d4af37" /* Gold underline */,
            transform: "translateX(-50%)",
          },
        }}
      >
        Active Plans
      </Typography>
      {session && <ApiKeyCardList session={session} />}
    </Container>
  );
}
