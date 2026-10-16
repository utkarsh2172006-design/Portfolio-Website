import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Utkarsh Jaiswal — Aspiring Data Analyst | AI & DS, IIT Jodhpur",
  description:
    "Portfolio of Utkarsh Jaiswal — BS Applied AI & Data Science undergraduate at IIT Jodhpur. Specializing in Python, SQL, Power BI, Tableau, and data storytelling.",
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
    description: "AI & Data Science Undergraduate at IIT Jodhpur.",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
