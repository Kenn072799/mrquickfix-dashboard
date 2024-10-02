import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../../common/Title";
import Button from "../../common/Button";

const ChangeEmail = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Handle save email
  const handleSaveEmail = () => {
    // Check if the email is valid
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    console.log("Email:", email);
    setError("");

    navigate("/profile/otp-email/");
  };

  return (
    <section className="p-4">
      <div className="py-8">
        <Title>Change Email</Title>
        <div className="my-4 h-[580px] rounded-md bg-white shadow-md md:h-[700px]">
          <div className="flex h-full w-full flex-col items-center justify-center">
            <h1 className="py-4 text-center text-xl font-semibold">
              Please enter your new email.
            </h1>
            <div className="w-[250px] px-4 md:w-[300px]">
              <label className="w-full text-sm font-semibold md:text-base">
                New email address:
              </label>
              <div className="flex w-full items-center border p-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full outline-none ${error ? "border-red-500" : ""}`}
                />
              </div>
              {/* Error Message */}
              {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
              <div className="mt-4">
                <Button variant="submit" size="sm" onClick={handleSaveEmail}>
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

export default ChangeEmail;
