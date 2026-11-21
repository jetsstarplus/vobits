import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Cursor from "./components/Cursor";
import Script from "next/script";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { MotionProvider, ScrollProgress } from "./components/ui/Motion";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vobits.ke"),
  title: {
    default: "Vobits Limited | Bespoke Software & Business Central Partner",
    template: "%s | Vobits Limited",
  },
  description:
    "Vobits Limited is a Microsoft partner delivering bespoke software, Microsoft Dynamics 365 Business Central and outsourced HR & payroll for NGOs, professional bodies, government institutions and businesses across East Africa.",
  keywords: [
    "bespoke software Kenya",
    "Microsoft Dynamics 365 Business Central partner Kenya",
    "HR outsourcing Kenya",
    "payroll services Nairobi",
    "custom software development East Africa",
    "ERP implementation Kenya",
    "software company Nairobi",
    "Microsoft partner Kenya",
    "NGO project management software",
    "NGO grant management Kenya",
    "licensing system for professional bodies",
    "government ERP Kenya",
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
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-black"
        >
          Skip to content
        </a>
        <MotionProvider>
          <ScrollProgress />
          <Cursor />
          <Navbar />
          <div id="content" className="flex-1">
            {children}
          </div>
          <Footer />
        </MotionProvider>

        <Script
          id="json-ld-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Vobits Limited",
              url: "https://vobits.ke",
              logo: "https://vobits.ke/brand/vobits-logo-primary.png",
              description:
                "Bespoke application development, Microsoft Dynamics 365 Business Central implementations, and outsourced HR & payroll services across East Africa.",
              address: {
                "@type": "PostalAddress",
                postOfficeBoxNumber: "54229",
                postalCode: "00200",
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
