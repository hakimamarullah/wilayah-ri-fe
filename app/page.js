import { auth } from "@/auth";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar";
import ApiKeyList from "./components/ApiKeyCardList";

export default async function Home() {
  let session = await auth();
  
  return (
    <Container sx={{ mt: 15, mb: "100vh" }} maxWidth="md">
      <Navbar username={session?.user?.username} />
      <ApiKeyList/>
    </Container>
  );
}
