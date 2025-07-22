import "../globals.css";
import NavbarTool from "@/components/NavbarTool";
import ContainerTool from "@/components/ContainerTool";
import TabsClient from "@/components/Tabs";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Animate with Spring",
  description: "Spring Animations Made Easy",
};

export default function ToolLayout({ children }) {
  return (
    <>
      <header className="relative z-20">
        <NavbarTool />
      </header>
      <ContainerTool className="mt-28 block md:hidden">
        <TabsClient />
      </ContainerTool>
      {children}
      <Toaster position="bottom-right" />
      <Footer />
    </>
  );
}
