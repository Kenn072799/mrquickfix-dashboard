import React from "react";
import Layout from "./components/layout/dashboard";
import { Route, Routes } from "react-router-dom";

// Dashboard Main Components
import DashboardHero from "./components/main/DashboardHero";
import Projects from "./components/main/Projects";
import ContentManagement from "./components/main/ContentManagement";
import AccountManagement from "./components/main/AccountManagement";
import MyProfile from "./components/main/MyProfile";
import ActivityLog from "./components/main/ActivityLog";

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
      </Routes>
    </Layout>
  );
}

export default App;
