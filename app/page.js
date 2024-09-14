import { auth } from "@/auth";
import LandingPage from "./components/LandingPage";

export default async function Home() {
  let session = await auth();

  return <LandingPage username={session?.user?.username} />;
}
