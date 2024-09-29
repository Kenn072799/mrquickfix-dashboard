import React from "react";
import NavBar from "../main/navigation/NavBar";
import SideBar from "../main/navigation/SideBar";

const dashboard = ({ children }) => {
  return (
    <>
      <SideBar />
      <div className="md:ml-64">
        <NavBar />
        <div>{children}</div>
      </div>
    </>
  );
};

export default dashboard;
