import React, { useState } from "react";
import { MdOutlineLock, MdCameraAlt } from "react-icons/md";
import Title from "../common/Title";
import Button from "../common/Button";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyProfile = () => {
  // Sample Data
  const adminName = "Kenneth Altes";
  const adminRole = "Admin";
  const adminEmail = "kenneth.altes@example.com";
  const profileImage = "../SampleAsset/profile.png";

  const [adminProfile, setAdminProfile] = useState(profileImage);
  const [newProfileImage, setNewProfileImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Save the new profile image logic here
    console.log("New Profile Image:", newProfileImage);
    if (newProfileImage) {
      setAdminProfile(newProfileImage);
      setNewProfileImage(null);
      toast.success("Profile picture updated successfully!");
    }
  };

  const handleCancel = () => {
    setNewProfileImage(null);
  };

  return (
    <section className="p-4">
      <div className="py-8">
        <Title>My Profile</Title>
        <div className="relative my-4 h-[580px] rounded-md bg-white shadow-md md:h-[700px]">
          <div className="flex w-full flex-col items-center justify-center">
            <div className="relative m-[20px] mt-20 h-32 w-32">
              <img
                src={newProfileImage || adminProfile}
                alt={adminName}
                className="h-32 w-32 rounded-full border-4 border-primary-500 object-cover"
              />
              <label
                htmlFor="image-upload"
                className="absolute bottom-1 right-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-black/90 text-white"
              >
                <MdCameraAlt size={18} />
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
            {newProfileImage && (
              <div className="flex gap-2 pb-4">
                <Button
                  onClick={handleSave}
                  size="sm"
                  className="bg-primary-500 px-4 py-2 text-xs text-white hover:bg-primary-600 md:text-sm"
                >
                  Save
                </Button>
                <Button
                  onClick={handleCancel}
                  size="sm"
                  className="bg-slate-500 px-4 py-2 text-xs text-white hover:bg-slate-600 md:text-sm"
                >
                  Cancel
                </Button>
              </div>
            )}
            <p className="text-xl font-bold">{adminName}</p>
            <p className="mb-8">{adminRole}</p>
            <div className="h-[1px] w-full bg-slate-100"></div>
            <h1 className="mb-4 mt-8 text-lg font-bold">Contact Information</h1>
            <p className="font-semibold">
              Email: <span className="font-normal">{adminEmail}</span>
            </p>
            <div className="absolute bottom-8 flex space-x-4">
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
