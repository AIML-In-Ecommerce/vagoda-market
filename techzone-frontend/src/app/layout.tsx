import type { Metadata } from "next";
import "./globals.css";

// import SocketProvider from "@/socket/SocketProvider";
import { ReactNode } from "react";
import AuthContextProvider from "../context/AuthContext";

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Techzone seller",
  description: "Seller center",
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
