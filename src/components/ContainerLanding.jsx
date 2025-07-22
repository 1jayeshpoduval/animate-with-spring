import React from "react";

const ContainerLanding = ({ id, className, children }) => {
  return (
    <div
      id={`${id}`}
      className={`relative mx-auto w-[calc(100%-5rem)] max-w-[1920px] lg:w-[calc(100%-10rem)] xl:w-[calc(100%-15rem)] ${className}`}
    >
      {children}
    </div>
  );
};

export default ContainerLanding;
