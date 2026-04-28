import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vobits Limited | Bespoke Software & Business Central Partner",
  description:
    "Vobits Limited delivers bespoke application development, Microsoft Dynamics 365 Business Central implementations, and outsourced HR & payroll services across East Africa.",
  keywords: [
    "bespoke software Kenya",
    "Microsoft Dynamics Business Central partner",
    "HR outsourcing Kenya",
    "payroll services Nairobi",
    "custom software development East Africa",
  ],
  metadataBase: new URL("https://vobits.ke"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#080808] text-[#f0f0f0]">
        {children}
      </body>
    </html>
  );
}
