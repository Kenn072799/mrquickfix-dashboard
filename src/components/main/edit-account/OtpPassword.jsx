import React, { useState } from "react";
import Title from "../../common/Title";
import Button from "../../common/Button";
import { useNavigate } from "react-router-dom";

const OtpPassword = () => {
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
      navigate("/profile/change-password/");
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
            <span className="rounded-full border text-sm border-red-500 bg-red-50 px-4 py-2 text-red-500">
              For testing purpose, your otp code: 123456
            </span>
            {/* Success Message */}
            <h1 className="px-4 py-4 text-center text-xl font-semibold">
              We sent an OTP code to your email address.
            </h1>
            <div className="w-[250px] px-4 md:w-[300px]">
              {/* OTP Input */}
              <label className="w-full text-sm font-semibold md:text-base">
                Enter 6-digits OTP code:
              </label>
              <input
                type="number"
                value={otpInput}
                onChange={handleOtpChange}
                className="w-full border p-2 outline-none"
              />
              {/* Error Message */}
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

export default OtpPassword;
