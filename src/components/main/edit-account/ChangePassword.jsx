import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../../common/Title";
import Button from "../../common/Button";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevVisibility) => !prevVisibility);
  };

  // Handle save password
  const handleSavePassword = () => {
    // You can add logic to validate and save the password here
    console.log("Password:", password);
    toast.success("Password changed successfully!");

    navigate("/");
  };

  return (
    <section className="p-4">
      <div className="py-8">
        <Title>Change Password</Title>
        <div className="my-4 h-[580px] rounded-md bg-white shadow-md md:h-[700px]">
          <div className="flex h-full w-full flex-col items-center justify-center">
            <h1 className="py-4 text-center text-xl font-semibold">
              Please enter your new password.
            </h1>
            <div className="w-[250px] md:w-[300px]">
              <label className="w-full text-sm font-semibold md:text-base">
                New password:
              </label>
              <div className="flex w-full items-center border p-2">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full outline-none"
                />
                {isPasswordVisible ? (
                  <LuEye
                    size={18}
                    className="cursor-pointer text-slate-500"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <LuEyeOff
                    size={18}
                    className="cursor-pointer text-slate-500"
                    onClick={togglePasswordVisibility}
                  />
                )}
              </div>
              <div className="mt-4">
                <Button variant="submit" size="sm" onClick={handleSavePassword}>
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;