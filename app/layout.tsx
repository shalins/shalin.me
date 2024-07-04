import "./global.css";
import type { Metadata } from "next";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import { baseUrl } from "./sitemap";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Next.js Portfolio Starter",
    template: "%s | Next.js Portfolio Starter",
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
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cx("text-black ")}>
      <body className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          <section className="w-full relative">
            <div className="pb-8">
              <div className="border-t-2 border-l-2 border-red-500 flex justify-between items-start p-0 overflow-hidden -mx-48 lg:-mx-16">
                <div className="-ml-[10px] -mt-[10px]">
                  <h1 className="font-ft88-serif text-8xl text-black font-medium tracking-tighter">
                    Shalin
                  </h1>
                  <h1 className="font-ft88-serif font-medium text-7xl tracking-tighter text-black">
                    Shah
                  </h1>
                </div>
                <div className="-ml-[1px] -mt-[1px] pb-2 border-r-2 border-red-500">
                  <div className="font-ft88-serif text-lg text-black self-start tracking-[-0.12em]">
                    1999-06-19
                  </div>
                </div>
              </div>
            </div>
            {children}
          </section>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
