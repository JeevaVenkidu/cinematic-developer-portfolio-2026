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

const baseUrl = "https://jeevavenkidu.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Jeeva Venkidu — Backend Software Developer & Engineer",
    template: "%s | Jeeva Venkidu",
  },
  description:
    "Personal Scrollytelling Portfolio of Jeeva Venkidu. Agricultural Engineer turned Backend Software Developer building high-performance digital products, AI orchestration systems, and open-source developer tools.",
  keywords: [
    "Jeeva Venkidu",
    "Jeeva V",
    "Backend Software Developer",
    "Agricultural Engineer",
    "Node.js Developer",
    "TypeScript Engineer",
    "Next.js Portfolio",
    "Scrollytelling",
    "Distributed Systems",
    "AI Engineering",
    "Open Source CLI",
  ],
  authors: [{ name: "Jeeva Venkidu", url: "https://github.com/JeevaVenkidu" }],
  creator: "Jeeva Venkidu",
  publisher: "Jeeva Venkidu",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Jeeva Venkidu — Backend Software Developer & Engineer",
    description:
      "Scrollytelling portfolio of Jeeva Venkidu. Agricultural Engineer turned Backend Software Developer building digital products & AI tools.",
    url: baseUrl,
    siteName: "Jeeva Venkidu Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/img-docs/Hero_1.png",
        width: 1200,
        height: 630,
        alt: "Jeeva Venkidu — Portfolio Hero",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jeeva Venkidu — Backend Software Developer & Engineer",
    description:
      "Agricultural Engineer turned Backend Software Developer building digital products, AI engines, and open-source tools.",
    images: ["/img-docs/Hero_1.png"],
  },
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
  verification: {
    google: "YE-WDbgpyPFrWgSTNwQ3zc6NHRYvOjifibcWCItmNpA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured JSON-LD Data for GEO (Generative Engine Optimization) & SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${baseUrl}/#person`,
        name: "Jeeva Venkidu",
        alternateName: "Jeeva V",
        url: baseUrl,
        jobTitle: "Backend Software Developer & Engineer",
        description:
          "Agricultural Engineer turned Backend Software Developer building high-performance digital products, AI orchestration engines, and open-source developer tooling.",
        sameAs: [
          "https://github.com/JeevaVenkidu",
          "https://www.linkedin.com/in/jeevavenkidu/",
        ],
        knowsAbout: [
          "Backend Software Development",
          "Node.js",
          "Express",
          "TypeScript",
          "PostgreSQL",
          "Redis",
          "AI Agent Systems",
          "Agricultural Engineering",
          "REST APIs",
          "Next.js",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "Jeeva Venkidu Portfolio",
        description:
          "Interactive scrollytelling portfolio showcasing backend architecture, AI developer tools, and engineering projects by Jeeva Venkidu.",
        publisher: {
          "@id": `${baseUrl}/#person`,
        },
      },
      {
        "@type": "ProfilePage",
        "@id": `${baseUrl}/#profilepage`,
        url: baseUrl,
        name: "Jeeva Venkidu — Backend Software Developer & Engineer",
        isPartOf: {
          "@id": `${baseUrl}/#website`,
        },
        about: {
          "@id": `${baseUrl}/#person`,
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${clashDisplay.variable} h-full antialiased dark`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full bg-[#121212] text-zinc-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
