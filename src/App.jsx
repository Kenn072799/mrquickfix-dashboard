import React, { Suspense, lazy } from "react";
import Layout from "./components/layout/dashboard";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SpinLoaderNoBg from "./components/loader/SpinLoaderNoBg";

// Lazy load pages
const DashboardHero = lazy(() => import("./components/main/DashboardHero"));
const Projects = lazy(() => import("./components/main/Projects"));
const ContentManagement = lazy(
  () => import("./components/main/ContentManagement"),
);
const AccountManagement = lazy(
  () => import("./components/main/AccountManagement"),
);
const MyProfile = lazy(() => import("./components/main/MyProfile"));
const ChangePassword = lazy(
  () => import("./components/main/edit-account/ChangePassword"),
);
const OtpPassword = lazy(
  () => import("./components/main/edit-account/OtpPassword"),
);
const AddAccountForm = lazy(() => import("./components/form/AddAccountForm"));
const AdminList = lazy(() => import("./components/main/AdminList"));
const Welcome = lazy(() => import("./components/main/Welcome"));
const LineCompletedCard = lazy(
  () => import("./components/chart/Completed/LineCompletedCard"),
);
const PieCompletedCard = lazy(
  () => import("./components/chart/Completed/PieCompletedCard"),
);

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="flex h-screen w-full items-center justify-center">
            <SpinLoaderNoBg />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<DashboardHero />}>
            <Route
              index
              element={<Navigate to="/line-chart-completed" replace />}
            />
            <Route
              path="line-chart-completed"
              element={<LineCompletedCard />}
            />
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
      </Suspense>
    </Layout>
  );
}

export default App;
