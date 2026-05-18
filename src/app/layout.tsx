import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GradientScanner from "@/components/GradientScanner";
import ScanLines from "@/components/ScanLines";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "ibheelz",
  description: "full-stack developer and penetration tester based in lagos, nigeria.",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetBrainsMono.variable}>
      <body className="bg-background text-white min-h-screen relative" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
        <ScanLines />
        <GradientScanner />
        <div className="relative z-10">
          <Header />
          <main className="pt-[55px] pb-[55px]">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
