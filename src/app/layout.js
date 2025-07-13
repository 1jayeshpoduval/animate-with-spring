import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Container from "../components/Container";
import TabsClient from "../components/Tabs";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata = {
  title: "Animate with Spring",
  description: "Spring Animations Made Easy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} flex flex-col antialiased`}
      >
        <header className="relative z-20">
          <Navbar />
        </header>
        <Container className="mt-28 block md:hidden">
          <TabsClient />
        </Container>
        {children}
        <Analytics />
        <Toaster position="bottom-right" />
        <Footer />
      </body>
    </html>
  );
}
