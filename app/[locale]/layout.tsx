import type { Metadata } from "next";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { TooltipProvider } from "@/features/shared/components/ui/tooltip";
import { getLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Panel",
  description: "Panel administracyjny sklepu",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
