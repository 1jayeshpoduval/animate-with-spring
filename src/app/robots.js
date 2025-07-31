const robots = () => {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://www.animatewithspring.com/sitemap.xml",
  };
};

export default robots;
