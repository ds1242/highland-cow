import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";


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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} antialiased`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        
      >
        {children}
      </body>
    </html>
  );
}
