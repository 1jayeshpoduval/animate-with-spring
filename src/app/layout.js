import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import NavbarLanding from "@/components/NavbarLanding";

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
          <NavbarLanding />
        </header>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
