// app/password/reset/[slug]/page.tsx
import { validateResetPassToken } from '@/app/lib/auth_api';
import { auth } from '@/auth';
import { notFound } from 'next/navigation';


export default async function ResetPasswordPage({ params }) {
  const session = await auth();
  const {slug: token } = params;
  const response = await validateResetPassToken({ token, username: session?.user?.username })
  const tokens = ['1234']
  if (!tokens.includes(token)) {
    // Optionally, you can handle the case where the token is not valid
    return notFound();
  }

  // Token is valid, render the reset form or appropriate content
  return (
    <div>
      <h1>Reset Your Password</h1>
      {/* Your form for resetting the password goes here */}
    </div>
  );
}
