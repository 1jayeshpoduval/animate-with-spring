import React from "react";
import CreateClient from "@/app/client-pages/CreateClient";
import Head from "next/head";

export const metadata = {
  title: "Create your own spring animation | Animate with Spring",
  description:
    "Configure custom spring animations, instantly preview results and export Motion or SwiftUI code to speed up development.",
};

const Create = () => {
  const canonicalUrl = "https://www.animatewithspring.com/tool/create";

  return (
    <>
      <Head>
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <CreateClient />
    </>
  );
};

export default Create;
