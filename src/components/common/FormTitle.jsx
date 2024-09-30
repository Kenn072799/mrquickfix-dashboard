import React from "react";

const FormTitle = ({ children, className = "" }) => {
  return <div className={`font-bold text-xl ${className}`}>{children}</div>;
};

export default FormTitle;