import LoginPage from "./app/login/page";
import { Routes, Route } from "react-router";
import SignupPage from "./app/signup/page";
import StudentHomePage from "./app/student-home/page";
import Subject from "./app/subject/page";
import LandingPage from "./app/landing-page/page";

import LocalSyllabus from "./app/local-syllabus/page";
import LocalSyllabusSubjectPage from "./app/local-syallabus-subject-page/page";

import { useSelector } from "react-redux";
import MyActivities from "./app/my-activities/page";
import Entertainment from "./app/entertainment/page";
import Music from "./app/entertainment/music/page";
import MyCalendarEvents from "./app/my-calendar-page/page";
import SportsPage from "./app/sports/page";
import ArtsAndCraftsPage from "./app/arts-n-crafts/page";
import ParentDashboard from "./app/parents-home/page";
import DashboardLayout from "./layouts/dasboard-layout";
import DashboardPage from "./app/teacher-dashboard/page";
import TeachersPage from "./app/teacher-dashboard/teachers/page";
import AssignmentsPage from "./app/teacher-dashboard/assignments/page";
import ActivitiesPage from "./app/teacher-dashboard/activities/page";
import VideoLessonsPage from "./app/teacher-dashboard/videos/page";
import EventsPage from "./app/teacher-dashboard/events/page";
import ChatPage from "./app/teacher-dashboard/chat/page";
import StudentChatPage from "./app/student-chat/page";

function App() {
  // Get logged-in user from Redux
  const user = useSelector((state: any) => state.auth.user);
  const isLoggedIn = !!user; // Check if user exists

  return (
    <>
      <Routes>
        <Route path="/landing-page" element={<LandingPage />} />
        <Route
          path="/"
          element={
            isLoggedIn ? (
              user.userType === "student" ? (
                <StudentHomePage />
              ) : user.userType === "parent" ? (
                <ParentDashboard />
              ) : user.userType === "teacher" ? (
                <DashboardLayout />
              ) : (
                <LandingPage /> // Fallback if userType is unknown
              )
            ) : (
              <LandingPage />
            )
          }
        />
        <Route
          path="/signup"
          element={
            isLoggedIn ? (
              user.userType === "student" ? (
                <StudentHomePage />
              ) : user.userType === "parent" ? (
                <ParentDashboard />
              ) : user.userType === "teacher" ? (
                <DashboardLayout />
              ) : (
                <SignupPage /> // Fallback if userType is unknown
              )
            ) : (
              <SignupPage />
            )
          }
        />
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              user.userType === "student" ? (
                <StudentHomePage />
              ) : user.userType === "parent" ? (
                <ParentDashboard />
              ) : user.userType === "teacher" ? (
                <DashboardLayout />
              ) : (
                <LoginPage /> // Fallback if userType is unknown
              )
            ) : (
              <LoginPage />
            )
          }
        />
        <Route
          path="/subject"
          element={isLoggedIn ? <Subject /> : <LoginPage />}
        />
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        <Route path="/local-syllabus" element={<LocalSyllabus />} />
        <Route
          path="/local-syllabus/:grade/:subject"
          element={<LocalSyllabusSubjectPage />}
        />
        <Route path="/my-activities/:userId" element={<MyActivities />} />
        <Route path="/entertainment" element={<Entertainment />} />
        <Route path="/entertainment/music" element={<Music />} />
        <Route
          path="/my-calendar-events/:userId"
          element={<MyCalendarEvents />}
        />
        <Route path="/sports" element={<SportsPage />} />
        <Route path="/arts-and-crafts" element={<ArtsAndCraftsPage />} />
        <Route path="/parents-dashboard" element={<ParentDashboard />} />
        <Route path="/chat/:userId" element={<StudentChatPage />} />

        {/* Dashboard Routes (Protected) */}
        <Route
          path="/dashboard"
          // element={<DashboardLayout />}
          element={
            isLoggedIn ? (
              user.userType === "teacher" ? (
                <DashboardLayout />
              ) : (
                <LoginPage /> // Fallback if userType is unknown
              )
            ) : (
              <LoginPage />
            )
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="teachers" element={<TeachersPage />} />
          <Route path="assignments" element={<AssignmentsPage />} />
          <Route path="activities" element={<ActivitiesPage />} />
          <Route path="videos" element={<VideoLessonsPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="chat" element={<ChatPage />} />
          {/* <Route path="settings" element={<SettingsPage />} /> */}
          {/* <Route path="profile" element={<ProfilePage />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
