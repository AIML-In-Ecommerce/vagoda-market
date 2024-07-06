import "./globals.css";
import type { Metadata } from "next";

// import SocketProvider from "@/socket/SocketProvider";
import { ReactNode } from "react";
import AuthContextProvider from "../context/AuthContext";
import React from "react";

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Vagoda - Đẳng cấp thời trang, bứt phá giới hạn",
  description: "Thời trang là phong cách, phong cách là bạn!",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang={"en"}>
      <body className="w-full">
        <AuthContextProvider>
          {/* <SocketProvider> */}
          {children}
          {/* </SocketProvider> */}
        </AuthContextProvider>
      </body>
    </html>
  );
}
