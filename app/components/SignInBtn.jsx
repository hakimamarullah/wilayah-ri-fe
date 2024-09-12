"use client"
import { Button } from "@mui/material"
import { useRouter } from "next/navigation"

 
export function SignInBtn() {
  const router = useRouter();
  return <Button onClick={() => router.push("/auth/signin")}>Sign In</Button>
}