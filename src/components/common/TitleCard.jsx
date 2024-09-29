import React from "react";

const TitleCard = ({ children, className = "" }) => {
  return (
    <div className={`font-roboto text-xl text-secondary-900 ${className}`}>
      {children}
    </div>
  );
};

export default TitleCard;
