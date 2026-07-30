import type { Metadata } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const clashDisplay = localFont({
  src: [
    { path: "../public/fonts/ClashDisplay-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/ClashDisplay-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/ClashDisplay-Semibold.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/ClashDisplay-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-clash-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jeeva Venkidu — Backend Software Developer & Engineer",
  description:
    "Personal Scrollytelling Portfolio of Jeeva Venkidu. Agricultural Engineer turned Backend Software Developer building high-performance digital products, AI systems, and open-source tools.",
  keywords: [
    "Jeeva Venkidu",
    "Backend Software Developer",
    "Agricultural Engineer",
    "Next.js Portfolio",
    "Scrollytelling",
    "Node.js",
    "TypeScript",
    "Distributed Systems",
    "AI Engineering",
  ],
  authors: [{ name: "Jeeva Venkidu" }],
  openGraph: {
    title: "Jeeva Venkidu — Backend Software Developer & Engineer",
    description:
      "Scrollytelling portfolio showcasing engineering, digital product craft, and software passion.",
    type: "website",
  },
  verification: {
    google: "YE-WDbgpyPFrWgSTNwQ3zc6NHRYvOjifibcWCItmNpA",
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
      className={`${GeistSans.variable} ${GeistMono.variable} ${clashDisplay.variable} h-full antialiased dark`}
    >
      <body className="min-h-full bg-[#121212] text-zinc-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
