import React from "react";

const Container = ({ id, className, children }) => {
  return (
    <div
      id={`${id}`}
      className={`relative mx-auto w-[calc(100%-5rem)] max-w-[1920px] lg:w-[calc(100%-15rem)] xl:w-[calc(100%-25rem)] xl-1400:w-[calc(100%-35rem)] 2xl:w-[calc(100%-45rem)] ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
