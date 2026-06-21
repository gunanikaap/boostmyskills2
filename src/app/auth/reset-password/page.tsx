import { Suspense } from "react";
import { ResetPasswordFlow } from "@/components/auth/reset-password-flow";

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordFlow />
    </Suspense>
  );
}
