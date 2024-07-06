import type { Metadata } from "next";
import { Inter, Lato } from "next/font/google";
import "../../globals.css";
// import { AuthProvider } from "@/context/AuthContext";
// import { RecoveryProvider } from "@/context/RecoveryContext";
import { ReactNode } from "react";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { notFound } from "next/navigation";

// import { SessionProvider } from "next-auth/react";
// import Providers from "@/component/Providers";

interface AuthLayoutProps {
  children: ReactNode;
  params: { locale: string };
}

const locales = ["en", "vi"];

const inter = Inter({ subsets: ["latin"] });
const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Vagoda - Đẳng cấp thời trang, bứt phá giới hạn",
  description: "Thời trang là phong cách, phong cách là bạn!",
};

export default function AuthLayout({
  children,
  params: { locale },
}: AuthLayoutProps) {
  const messages = useMessages();
  if (!locales.includes(locale as any)) notFound();
  return (
    <html lang={locale}>
      <body className={inter.className + " " + lato.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {/* <AuthProvider>
            <RecoveryProvider>{children}</RecoveryProvider>
          </AuthProvider> */}
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
