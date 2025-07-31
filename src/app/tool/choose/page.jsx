import React from "react";
import ChooseClient from "@/app/client-pages/ChooseClient";

export const metadata = {
  title: "Choose | Animate with Spring",
  description:
    "Explore a library of finely tuned spring animation presets. Quickly copy production-ready Motion or SwiftUI code to create high-quality spring animations without guesswork.",
};

const Choose = () => {
  const canonicalUrl = "https://www.animatewithspring.com/tool/choose";

  return (
    <>
      <Head>
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <ChooseClient />;
    </>
  );
};

export default Choose;
