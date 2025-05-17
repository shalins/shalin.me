import "./global.css";
import type { Metadata } from "next";
import { Navbar } from "./components/nav";
import Name from "./components/name";
import Socials from "./components/socials";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { baseUrl } from "./sitemap";
import Signature from "./components/signature";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Shalin Shah",
    template: "%s // Shalin Shah",
  },
  description: "This is my portfolio.",
  openGraph: {
    title: "My Portfolio",
    description: "This is my portfolio.",
    url: baseUrl,
    siteName: "My Portfolio",
    locale: "en_US",
    type: "website",
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: { url: "/favicon-96x96.png" },
    apple: {
      url: "/apple-touch-icon.png",
      type: "image/png"
    },
    other: [
      {
        rel: "manifest",
        url: "/site.webmanifest"
      },
      {
        rel: "icon",
        url: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        rel: "icon",
        url: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  },
  manifest: "/site.webmanifest",
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cx("text-black light")}>
      <body className="antialiased max-w-2xl mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          <section className="w-full relative">{children}</section>
          <footer className="mb-16">
            <Signature />
          </footer>
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
