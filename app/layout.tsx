import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://betstackers.com";
const title = "BetStackers — The click before the bet.";
const description =
  "BetStackers is the group entity behind a network of localised casino and sportsbook sites. We run acquisition, content and tech, and partner directly with operators and media buyers across global iGaming markets.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s — BetStackers",
  },
  description,
  applicationName: "BetStackers",
  keywords: [
    "BetStackers",
    "iGaming",
    "casino traffic",
    "sportsbook",
    "affiliate",
    "media buying",
    "operators",
    "networks",
  ],
  authors: [{ name: "BetStackers" }],
  creator: "BetStackers",
  publisher: "BetStackers",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName: "BetStackers",
    title: "BetStackers — The click before the bet.",
    description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "BetStackers — The click before the bet.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BetStackers — The click before the bet.",
    description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  category: "business",
};

export const viewport: Viewport = {
  themeColor: "#eafb8f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-background text-black">
        {children}
      </body>
    </html>
  );
}
