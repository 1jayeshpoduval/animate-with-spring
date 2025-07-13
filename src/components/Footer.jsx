import React from "react";
import Container from "../components/Container";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="z-50 mt-auto border-t border-t-1 bg-white py-6 font-sans">
      <Container className="flex items-center justify-between">
        <span className="text-primary/50 text-sm font-medium">
          Created by{" "}
          <a
            href="https://www.x.com/1jayeshpoduval"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary hover:underline"
          >
            Jayesh
          </a>
        </span>
        <span className="text-primary/50 hidden text-sm font-medium md:inline">
          Animate with Spring {currentYear}
        </span>
        <span className="text-primary/50 inline text-sm font-medium md:hidden">
          AwS {currentYear}
        </span>
      </Container>
    </footer>
  );
};

export default Footer;
