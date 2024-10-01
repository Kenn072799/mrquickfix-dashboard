import React from "react";

const ProjectNavBar = () => {
  return (
    <div>
      <nav className="">
        <ul className="hidden items-center gap-4 lg:flex font-bold">
          <li>Client's Inquiry</li>
          <li>On Process</li>
          <li>In Progress</li>
          <li>Completed</li>
          <li>Cancelled</li>
        </ul>
      </nav>
    </div>
  );
};

export default ProjectNavBar;
