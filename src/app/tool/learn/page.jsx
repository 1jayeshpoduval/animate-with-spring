import React from "react";
import LearnClient from "@/app/client-pages/LearnClient";
import Head from "next/head";

export const metadata = {
  title: "Learn | Animate with Spring",
  description:
    "Master spring animations with in-depth guides on best practices. Access expert tips and curated resources to create tasteful, production-ready spring animations.",
};

const Learn = () => {
  const canonicalUrl = "https://www.animatewithspring.com/tool/learn";

  return (
    <>
      <Head>
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <LearnClient />
    </>
  );
};

export default Learn;
