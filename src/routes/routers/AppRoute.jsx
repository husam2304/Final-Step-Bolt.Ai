import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  ForgetPassword,
  RegistrationPage,
  LoginPage,
  UpdatePassword,
  MailSend,
  HomePage,
  ProjectsPage,
  TestComponentPage,
} from "./../../Pages";
import { AuthLayout, MainLayout } from "../../layOut";
import ProjectDetails from "../../Pages/ProjectDetails";
import HowToStartPage from "../../Pages/HowToStartPage";
import StudentProfilePage from "../../Pages/Students/StudentProfilePage";
import DcotorProfilePage from "../../Pages/Doctors/DoctorProfilepage";
import StudantPreviewPage from "../../Pages/Students/StudantPreviewPage";
import DoctorPreviewpage from "../../Pages/Doctors/DoctorPreviewpage";
import Notifications from "../../Pages/NotificationPage";
import MarkingPage from "../../Pages/MarkingPage";
import EvaluationPage from "../../Pages/EvaluationPage";
function AppRoute() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/Projects" element={<ProjectsPage />} />
          <Route path="/HowToStartPage" element={<HowToStartPage />} />
          <Route path="/Notification" element={<Notifications />} />
          <Route path="Projects/:ProjectId" element={<ProjectDetails />} />
          <Route
            path="/Students/StudentProfilePage"
            element={<StudentProfilePage />}
          />
          <Route
            path="/Doctors/DoctorProfilepage"
            element={<DcotorProfilePage />}
          />
          <Route
            path="/Students/StudantPreviewPage"
            element={<StudantPreviewPage />}
          />
          <Route
            path="/Doctors/DoctorPreviewpage"
            element={<DoctorPreviewpage />}
          />

          <Route path="/evaluate/:projectId" element={<EvaluationPage />} />
          <Route path="/mark/:projectId" element={<MarkingPage />} />

        </Route>
        <Route path="/Doctors" />
        <Route path="/Auth" element={<AuthLayout />}>
          <Route path="Login" element={<LoginPage />} />
          <Route path="Registration" element={<RegistrationPage />} />
          <Route path="ForgetPassword" element={<ForgetPassword />} />
          <Route path="UpdatePassword/*" element={<UpdatePassword />} />
          <Route path="MailSend" element={<MailSend />} />
        </Route>

        <Route path="TestComponentPage" element={<TestComponentPage />} />
      </Routes>
    </>
  );
}

export default AppRoute;
