import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rafly Prayoga - Portfolio",
  description: "Full Stack Developer & UI/UX Enthusiast. Specialized in modern JavaScript frameworks and responsive design.",
  keywords: ["portfolio", "web developer", "full stack", "react", "next.js"],
  authors: [{ name: "John Doe" }],
  openGraph: {
    title: "Rafly Prayoga - Portfolio",
    description: "Full Stack Developer & UI/UX Enthusiast",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}