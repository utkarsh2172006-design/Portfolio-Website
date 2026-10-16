import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Utkarsh Jaiswal — Data Artist & Analyst in the Making",
  description:
    "Portfolio of Utkarsh Jaiswal — BS Applied AI & Data Science undergraduate at IIT Jodhpur. Data storytelling, dashboards, and analytical experiments.",
  keywords: [
    "Utkarsh Jaiswal",
    "Data Analyst",
    "IIT Jodhpur",
    "AI and Data Science",
    "Portfolio",
    "Python",
    "SQL",
    "Power BI",
    "Tableau",
  ],
  authors: [{ name: "Utkarsh Jaiswal" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Utkarsh Jaiswal — Data Artist & Analyst",
    description: "AI & Data Science Undergraduate at IIT Jodhpur. Where data meets design.",
    url: "https://chat.z.ai",
    siteName: "Utkarsh Jaiswal Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Utkarsh Jaiswal — Data Artist & Analyst",
    description: "AI & Data Science Undergraduate at IIT Jodhpur.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${instrument.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
