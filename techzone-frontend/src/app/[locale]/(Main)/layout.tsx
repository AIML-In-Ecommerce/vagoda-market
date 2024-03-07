// // // import type { Metadata } from "next";
// // // import { Inter } from "next/font/google";
// // // import "./globals.css";

// // // const inter = Inter({ subsets: ["latin"] });

// // // export const metadata: Metadata = {
// // //   title: "Create Next App",
// // //   description: "Generated by create next app",
// // // };

// // // export default function RootLayout({
// // //   children,
// // // }: Readonly<{
// // //   children: React.ReactNode;
// // // }>) {
// // //   return (
// // //     <html lang="en">
// // //       <body className={inter.className}>{children}</body>
// // //     </html>
// // //   );
// // // }

import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "../globals.css";
// import { AuthProvider } from "@/context/AuthContext";
// import StyledComponentsRegistry from "../../../lib/AntdRegistry";
import { ReactNode } from "react";
// import { NextIntlClientProvider, useMessages } from "next-intl";
// import UserLayout from "@/component/UserLayout";

interface RootLayoutProps {
  children: ReactNode;
  params: { locale: string };
}

// // const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "TechZone",
//   description: "Generated by create next app",
// };

// export default function RootLayout({
//   children,
//   params: { locale },
// }: RootLayoutProps) {
//   const messages = useMessages();
//   return (
//     <html lang={locale}>
//       {/* <body className={inter.className}> */}
//       <body className="">
//         <NextIntlClientProvider locale={locale} messages={messages}>
//           <AuthProvider>
//             {/* <UserLayout children={children} locale={locale} /> */}
//             <UserLayout locale={locale}>{children}</UserLayout>
//           </AuthProvider>
//         </NextIntlClientProvider>
//       </body>
//     </html>
//   );
// }

export default function MainLayout({children, params: {locale}}: RootLayoutProps)
{
    return(
    <html lang={locale}>
      {/* <body className={inter.className}> */}
      <body className="w-full">
        {children}
      </body>
    </html>
    )
}