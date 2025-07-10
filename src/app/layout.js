import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Container from "../components/Container";
import TabsClient from "../components/Tabs";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata = {
  title: "Springggy",
  description: "Spring Animations Made Easy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <header className="relative z-20">
          <Navbar />
        </header>
        <Container className="py-8">
          <TabsClient />
        </Container>
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
