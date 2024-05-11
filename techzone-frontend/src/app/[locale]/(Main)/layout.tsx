import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "../globals.css";
// import { AuthProvider } from "@/context/AuthContext";
// import StyledComponentsRegistry from "../../../lib/AntdRegistry";
import Navbar from "@/component/customer/Navbar";
import AssistantFloatingButtonGroup from "@/component/user/AssistantFloatingButtonGroup";
import CategoryDrawer from "@/component/user/utils/CategoryDrawer";
import WebFooter from "@/component/user/WebFooter";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { Lato } from "next/font/google";
import { ReactNode, Suspense } from "react";
import RootLoading from "./loading";

// import UserLayout from "@/component/UserLayout";

interface RootLayoutProps {
  children: ReactNode;
  params: { locale: string };
}

// const inter = Inter({ subsets: ["latin"] });
const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  style: ["italic", "normal"],
});

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
      <body className={lato.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {/* <AuthProvider> */}
          {/* <UserLayout children={children} locale={locale} /> */}
          {/* <UserLayout locale={locale}>{children}</UserLayout> */}
          {/* </AuthProvider> */}
          <Suspense fallback={<RootLoading />}>
            <div className="w-full bg-cover bg-[#f3f3f3]  min-h-screen  overflow-hidden">
              <Navbar />
              <CategoryDrawer />
              {children}
              <AssistantFloatingButtonGroup />
            </div>
          </Suspense>
        </NextIntlClientProvider>
        <WebFooter />
      </body>
    </html>
  );
}
