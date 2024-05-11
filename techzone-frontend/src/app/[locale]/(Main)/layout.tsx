import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "../globals.css";
// import { AuthProvider } from "@/context/AuthContext";
// import StyledComponentsRegistry from "../../../lib/AntdRegistry";
import Navbar from "@/component/customer/Navbar";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { ReactNode } from "react";
// import UserLayout from "@/component/UserLayout";

interface RootLayoutProps {
  children: ReactNode;
  params: { locale: string };
}

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Techzone",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  const messages = useMessages();
  return (
    <html lang={"en"}>
      {/* <body className={inter.className}> */}
      <body className="w-full">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {/* <AuthProvider> */}
          {/* <UserLayout children={children} locale={locale} /> */}
          {/* <UserLayout locale={locale}>{children}</UserLayout> */}
          {/* </AuthProvider> */}
          <div className="w-full bg-cover bg-[#f3f3f3] min-h-screen overflow-hidden">
            <Navbar />
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
