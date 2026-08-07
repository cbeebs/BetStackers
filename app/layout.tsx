import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BetStackers — The click before the bet.",
  description:
    "BetStackers is the group entity behind a network of localised casino and sportsbook sites. We run acquisition, content and compliance in-house.",
  metadataBase: new URL("https://betstackers.com"),
  openGraph: {
    title: "BetStackers",
    description: "The click before the bet. Global iGaming traffic.",
    url: "https://betstackers.com",
    siteName: "BetStackers",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
