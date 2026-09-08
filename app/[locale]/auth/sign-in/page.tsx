import { getTranslations } from "next-intl/server";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/features/shared/components/ui/card";
import LoginForm from "@/features/auth/components/login-form";

export default async function SignInPage() {
  const t = await getTranslations("Auth");

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
