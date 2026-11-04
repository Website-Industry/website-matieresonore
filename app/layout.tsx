import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import EnTete from "@/components/EnTete";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Matière Sonore",
  description: "Un carnet d'immersions sonores par Marc Charton",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${syne.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <EnTete />
        {children}
      </body>
    </html>
  );
}
