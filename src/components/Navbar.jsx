import React from "react";
import Container from "./Container";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-2xl py-4 font-sans ">
      <Container className="flex items-center justify-between">
        <span>Logo</span>
        <span className="font-semibold">Buy me a coffee button</span>
      </Container>
    </nav>
  );
};

export default Navbar;
