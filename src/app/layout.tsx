import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from 'sonner';
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
  title: "LazorSwift | Gasless Solana Payments",
  description: "Experience the next generation of crypto payments. Seedless onboarding with Passkeys and gasless transactions on Solana.",
  manifest: "/manifest.json",
  icons: {
    icon: "/globe.svg",
    apple: "/globe.svg",
  },
  openGraph: {
    title: "LazorSwift | Gasless Solana Payments",
    description: "Onboard instantly with Passkeys. Send SOL/USDC without gas fees. Try the demo on Devnet.",
    url: "https://lazor-swift.vercel.app",
    siteName: "LazorSwift",
    images: [
      {
        url: "/og-image.png", // We'll need to ensure this exists or use a generic one
        width: 1200,
        height: 630,
        alt: "LazorSwift Demo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LazorSwift | Gasless Solana Payments",
    description: "Onboard instantly with Passkeys. Send SOL/USDC without gas fees.",
    images: ["/og-image.png"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false, // Prevents zooming on inputs for "native app" feel
  },
  themeColor: "#6366f1", // Indigo-500
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-black text-black dark:text-white`}
      >
        {children}
        <Toaster position="bottom-right" richColors closeButton />
      </body>
    </html>
  );
}
