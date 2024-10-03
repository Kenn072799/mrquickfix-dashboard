import React from "react";
import Layout from "./components/layout/dashboard";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Dashboard Main Components
import DashboardHero from "./components/main/DashboardHero";
import Projects from "./components/main/Projects";
import ContentManagement from "./components/main/ContentManagement";
import AccountManagement from "./components/main/AccountManagement";
import MyProfile from "./components/main/MyProfile";
import ChangePassword from "./components/main/edit-account/ChangePassword";
import OtpPassword from "./components/main/edit-account/OtpPassword";
import AddAccountForm from "./components/form/AddAccountForm";
import AdminList from "./components/main/AdminList";
import Welcome from "./components/main/Welcome";
import LineCompletedCard from "./components/chart/Completed/LineCompletedCard";
import PieCompletedCard from "./components/chart/Completed/PieCompletedCard";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<DashboardHero />}>
          <Route
            index
            element={<Navigate to="/line-chart-completed" replace />}
          />
          <Route path="line-chart-completed" element={<LineCompletedCard />} />
          <Route path="pie-chart-completed" element={<PieCompletedCard />} />
        </Route>

        <Route path="/projects" element={<Projects />} />
        <Route path="/content" element={<ContentManagement />} />

        <Route path="/account" element={<AccountManagement />}>
          <Route index element={<Navigate to="create-account" replace />} />
          <Route path="create-account" element={<AddAccountForm />} />
          <Route path="admin-list" element={<AdminList />} />
        </Route>

        <Route path="welcome" element={<Welcome />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/profile/otp-password" element={<OtpPassword />} />
        <Route path="/profile/change-password" element={<ChangePassword />} />
      </Routes>
      <ToastContainer />
    </Layout>
  );
}

export default App;
