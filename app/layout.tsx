import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Cursor from "./components/Cursor";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vobits.ke"),
  title: {
    default: "Vobits Limited | Bespoke Software & Business Central Partner",
    template: "%s | Vobits Limited",
  },
  description:
    "Vobits Limited delivers bespoke application development, Microsoft Dynamics 365 Business Central implementations, and outsourced HR & payroll services across East Africa.",
  keywords: [
    "bespoke software Kenya",
    "Microsoft Dynamics 365 Business Central partner Kenya",
    "HR outsourcing Kenya",
    "payroll services Nairobi",
    "custom software development East Africa",
    "ERP implementation Kenya",
    "software company Nairobi",
    "Vobits",
  ],
  authors: [{ name: "Vobits Limited", url: "https://vobits.ke" }],
  creator: "Vobits Limited",
  publisher: "Vobits Limited",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://vobits.ke",
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://vobits.ke",
    siteName: "Vobits Limited",
    title: "Vobits Limited | Bespoke Software & Business Central Partner",
    description:
      "Bespoke application development, Microsoft Dynamics 365 Business Central implementations, and outsourced HR & payroll — powering businesses across East Africa.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vobits Limited — Bespoke Software & Business Central Partner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vobits Limited | Bespoke Software & Business Central Partner",
    description:
      "Bespoke apps, Microsoft Dynamics 365 Business Central & outsourced HR/payroll across East Africa.",
    images: ["/og-image.png"],
    creator: "@vobits",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    // Replace with your actual Google Search Console verification code
    google: "REPLACE_WITH_GOOGLE_VERIFICATION_CODE",
  },
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
        {/* Subtle vertical grid column overlay lines */}
        <div className="grid-lines" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>
        <Cursor />
        {children}
        {/* JSON-LD structured data */}
        <Script
          id="json-ld-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Vobits Limited",
              url: "https://vobits.ke",
              logo: "https://vobits.ke/Vobits_logo.png",
              description:
                "Bespoke application development, Microsoft Dynamics 365 Business Central implementations, and outsourced HR & payroll services across East Africa.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Nairobi",
                addressCountry: "KE",
              },
              contactPoint: {
                "@type": "ContactPoint",
                email: "hello@vobits.ke",
                contactType: "customer service",
                areaServed: "KE",
                availableLanguage: "English",
              },
              sameAs: [],
            }),
          }}
        />
      </body>
    </html>
  );
}
