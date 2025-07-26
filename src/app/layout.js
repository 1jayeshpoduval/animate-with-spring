import { Atkinson_Hyperlegible, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import NavbarLanding from "@/components/NavbarLanding";

const atkinson = Atkinson_Hyperlegible({
  variable: "--font-heading",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
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
        className={`${atkinson.variable} ${inter.variable} ${geistMono.variable} flex flex-col antialiased`}
      >
        <header className="relative z-20">
          <NavbarLanding />
        </header>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
