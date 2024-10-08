import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientComponent from "@/components/client-provider/client-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Feed",
  description: "latest collections and items feed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientComponent>{children}</ClientComponent>
      </body>
    </html>
  );
}
