import type { Metadata, Viewport } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";



const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Highland Cow',
    default: 'Highland Cow Organizer'
  },
  description: 'Web client for the Highland Cow scanner and organizer',
  // metadataBase: new URL(''),
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body className={`${inter.className} antialiased min-h-screen`}>
        <Header />
        <main className="">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
