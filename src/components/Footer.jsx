import React from "react";
import Container from "./ContainerTool";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="z-20 mt-auto border-t-1 bg-white py-6 font-sans">
      <Container className="flex items-center justify-between">
        <span className="text-primary/50 text-sm font-medium">
          Created by{" "}
          <a
            href="https://www.jayeshpoduval.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary hover:underline"
          >
            Jayesh
          </a>
        </span>
        <span className="text-primary/65 hidden text-sm font-medium md:inline">
          Animate with Spring {currentYear}
        </span>
        <span className="text-primary/65 inline text-sm font-medium md:hidden">
          AwS {currentYear}
        </span>
      </Container>
    </footer>
  );
};

export default Footer;
