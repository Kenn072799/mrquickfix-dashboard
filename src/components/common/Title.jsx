import React from "react";

const Title = ({ children, className = "" }) => {
  return <h1 className={`text-2xl font-semibold ${className}`}>{children}</h1>;
};

export default Title;
