// app/password/reset/[slug]/page.tsx
import ResetPasswordForm from "@/app/components/ResetPasswordForm";
import { validateResetPassToken } from "@/app/lib/auth_api";
import { notFound } from "next/navigation";

export default async function ResetPasswordPage({ params }) {
  const {slug: token } = params;
  const { responseCode } = await validateResetPassToken({ token })
  if (responseCode !== 200) {
    return notFound();
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        paddingBottom: "50vh",
      }}
    >
      <ResetPasswordForm token={token} />
    </div>
  );
}
