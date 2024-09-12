import { auth } from "@/auth";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import { getUserInfo } from "./lib/auth_api";
import { getAvailableProducts } from "./lib/product_api";
import { doLogout } from "./actions";

export default async function Home() {
  let session = await auth();
  
  const userInfo = await getUserInfo(session?.user?.accessToken);


  if (userInfo?.code === 401 || userInfo === null) {
    session = null;
  }

  const SIZE_PER_PAGE = 20;
  let products = [];
  try {
    const responseGetProducts = await getAvailableProducts({
      page: 0,
      size: SIZE_PER_PAGE,
    });
    products = responseGetProducts?.data?.content || [];
  } catch (err) {}

  return (
    <Container sx={{ mt: 15, mb: "100vh" }} maxWidth="md">
      <Navbar username={session?.user?.username} />
      <ProductList
        initialProducts={products}
        size={SIZE_PER_PAGE}
        accessToken={session?.user?.accessToken}
      />
    </Container>
  );
}
