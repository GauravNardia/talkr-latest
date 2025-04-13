import type { Metadata } from "next";
import { Archivo, DM_Serif_Text } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider
} from '@clerk/nextjs'

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

const dm = DM_Serif_Text({
  weight: "400",
  variable: "--font-dm-serif-text",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Talkr",
  description: "Learn to speak any language directly from your native language",
  icons: "/assets/icons/logo.svg"

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
      <body className={`${archivo.variable} ${dm.variable}`}>
        {children}
      </body>
    </ClerkProvider>
    </html>
  );
}
