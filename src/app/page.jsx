import React from "react";
import LandingClient from "./client-pages/LandingClient";
import Head from "next/head";

export default function Home() {
  const canonicalUrl = "https://www.animatewithspring.com";

  return (
    <>
      <Head>
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <LandingClient />;
    </>
  );
}
