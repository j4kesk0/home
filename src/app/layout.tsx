import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";
import { Preloader } from "@/components/Preloader";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Oskar Tariška — Webový Vývojár & Dizajnér",
  description:
    "17-ročný full-stack vývojár so zameraním na luxusný web dizajn. Pripravený za 24h. Kód na večnosť. Next.js, React, Tailwind CSS.",
  keywords: [
    "webový vývojár",
    "web developer",
    "Next.js",
    "React",
    "Tailwind CSS",
    "Slovensko",
    "portfolio",
    "dizajn",
  ],
  openGraph: {
    title: "Oskar Tariška — Webový Vývojár",
    description: "Pripravený za 24h. Kód na večnosť.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <SmoothScroll>
            <Preloader />
            <CustomCursor />
            <Navbar />
            <main>{children}</main>
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}

