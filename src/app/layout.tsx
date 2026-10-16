import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Utkarsh Jaiswal — Aspiring Data Analyst | AI & DS Student at IIT Jodhpur",
  description:
    "Portfolio of Utkarsh Jaiswal, an undergraduate BS Applied AI & Data Science student at IIT Jodhpur specializing in Python, SQL, Power BI, Tableau, and data analytics. Seeking Data Analyst internship roles.",
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
    title: "Utkarsh Jaiswal — Aspiring Data Analyst",
    description: "AI & Data Science Undergraduate at IIT Jodhpur. Python, SQL, BI tools, dashboards, and data storytelling.",
    url: "https://chat.z.ai",
    siteName: "Utkarsh Jaiswal Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Utkarsh Jaiswal — Aspiring Data Analyst",
    description: "AI & Data Science Undergraduate at IIT Jodhpur.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
