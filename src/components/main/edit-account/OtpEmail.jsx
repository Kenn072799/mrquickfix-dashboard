import React, { useState } from "react";
import Title from "../../common/Title";
import Button from "../../common/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OtpEmail = () => {
  const navigate = useNavigate();

  // Test OTP
  const correctOtp = "123456";
  const [otpInput, setOtpInput] = useState("");
  const [error, setError] = useState("");

  const handleOtpChange = (e) => {
    setOtpInput(e.target.value);
    setError("");
  };

  const verifyOtp = () => {
    if (otpInput === correctOtp) {
      navigate("/");
      toast.success("Email changed successfully!");
    } else {
      setError("Invalid OTP code. Please try again.");
    }
  };

  return (
    <section className="p-4">
      <div className="py-8">
        <Title>Verify Your Email</Title>
        <div className="my-4 h-[580px] rounded-md bg-white shadow-md md:h-[700px]">
          <div className="flex h-full w-full flex-col items-center justify-center">
            <h1 className="py-4 text-xl font-semibold">
              We sent an OTP code to your email address.
            </h1>
            <div className="w-[300px]">
              <label className="w-full text-base font-semibold">
                Enter 6-digits OTP code:
              </label>
              <input
                type="number"
                value={otpInput}
                onChange={handleOtpChange}
                className="w-full border p-2 outline-none"
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
              <div className="mt-4">
                <Button variant="submit" size="sm" onClick={verifyOtp}>
                  Verify
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OtpEmail;
