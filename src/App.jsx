import React from "react";
import Layout from "./components/layout/dashboard";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Dashboard Main Components
import DashboardHero from "./components/main/DashboardHero";
import Projects from "./components/main/Projects";
import ContentManagement from "./components/main/ContentManagement";
import AccountManagement from "./components/main/AccountManagement";
import MyProfile from "./components/main/MyProfile";
import ActivityLog from "./components/main/ActivityLog";
import ChangePassword from "./components/main/edit-account/ChangePassword";
import ChangeEmail from "./components/main/edit-account/ChangeEmail";
import OtpPassword from "./components/main/edit-account/OtpPassword";
import OtpEmail from "./components/main/edit-account/OtpEmail";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<DashboardHero />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/content" element={<ContentManagement />} />
        <Route path="/account" element={<AccountManagement />} />
        <Route path="/activity" element={<ActivityLog />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/profile/otp-password" element={<OtpPassword />} />
        <Route path="/profile/change-password" element={<ChangePassword />} />
        <Route path="/profile/otp-email" element={<OtpEmail />} />
        <Route path="/profile/change-email" element={<ChangeEmail />} />
      </Routes>
      <ToastContainer />
    </Layout>
  );
}

export default App;
