import React from "react";
import Profile from "../../assets/profile.png";
import { MdOutlineLock } from "react-icons/md";
import Title from "../common/Title";
import Button from "../common/Button";
import { Link } from "react-router-dom";

const MyProfile = () => {
  //Sample Data
  const adminName = "Kenneth Altes";
  const adminRole = "Admin";
  const adminEmail = "kenneth.altes@example.com";

  return (
    <section className="p-4">
      <div className="py-8">
        <Title>My Profile</Title>
        <div className="relative my-4 h-[580px] rounded-md bg-white shadow-md md:h-[700px]">
          <div className="flex w-full flex-col items-center justify-center">
            <img
              src={Profile}
              alt={adminName}
              className="m-[20px] mt-20 h-32 w-32 rounded-full border-4 border-primary-500"
            />
            <p className="text-xl font-bold">{adminName}</p>
            <p className="mb-8">{adminRole}</p>
            <div className="h-[1px] w-full bg-slate-100"></div>
            <h1 className="mb-4 mt-8 text-lg font-bold">Contact Information</h1>
            <p className="font-semibold">
              Email: <span className="font-normal">{adminEmail}</span>
            </p>
            <div className="absolute bottom-8">
              <Link to="otp-password">
                <Button size="sm">
                  <MdOutlineLock size={16} className="mr-2" /> Change password
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyProfile;
