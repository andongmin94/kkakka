import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/nav-bar";
import Sidebar from "@/components/side-bar";

const noto_sans = Noto_Sans_KR({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "까까",
  description: "D110 Team project : 까까",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={noto_sans.className}>
        <Navbar />
        <Sidebar>
          {children}
        </Sidebar>
      </body>
    </html>
  );
}
