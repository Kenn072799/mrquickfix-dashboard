import React from "react";
import Logo from "../../assets/Mr.QuickFixLogo.png";

const Welcome = () => {
  return (
    <div className="relative flex h-screen flex-col items-center justify-center bg-white p-4">
      <div className="absolute top-20 text-center">
        <img
          src={Logo}
          alt="Mr. Quick Fix Logo"
          className="mx-auto h-11 md:h-16"
        />
        <h1 className="pt-7 text-3xl font-bold md:text-5xl">Hi, New Admin!</h1>
        <h1 className="text-center text-xl font-bold md:text-3xl">
          Welcome to Mr. Quick Fix Family!
        </h1>
      </div>
    </div>
  );
};

export default Welcome;
