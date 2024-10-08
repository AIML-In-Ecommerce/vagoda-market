import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import Navbar from "@/component/customer/Navbar";
import AssistantFloatingButtonGroup from "@/component/user/AssistantFloatingButtonGroup";
import WebFooter from "@/component/user/WebFooter";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { Lato } from "next/font/google";
import { ReactNode } from "react";
import "../../globals.css";

// import UserLayout from "@/component/UserLayout";
import { AntdRegistry } from "@ant-design/nextjs-registry";

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
  title: "Vagoda - Đẳng cấp thời trang, bứt phá giới hạn",
  description: "Thời trang là phong cách, phong cách là bạn!",
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
        <AntdRegistry>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {/* <AuthProvider> */}
            {/* <UserLayout children={children} locale={locale} /> */}
            {/* <UserLayout locale={locale}>{children}</UserLayout> */}
            {/* </AuthProvider> */}
            {/* <Suspense fallback={<RootLoading />}> */}
            <div className="w-full bg-cover bg-[#f3f3f3]  min-h-screen  overflow-hidden">
              <Navbar />
              {children}
              <AssistantFloatingButtonGroup />
            </div>
            {/* </Suspense> */}
          </NextIntlClientProvider>
          <WebFooter />
        </AntdRegistry>
      </body>
    </html>
  );
}
