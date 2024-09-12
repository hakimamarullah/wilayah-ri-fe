"use server";

import { signIn, signOut } from "../../auth";

export async function doLogout(redirectTo) {
  if (redirectTo) {
    await signOut({redirectTo});
  } else {
    await signOut({redirect: false});
  }
  
}


export async function doCredentialLogin(credential) {
  try {
    const response = await signIn("credentials", {
      user: JSON.stringify(credential),
      username: credential?.username,
      password: credential?.password,
      redirect: false,
    });

    return response;
  } catch (err) {
    throw err;
  }
}
