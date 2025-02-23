import { useState } from "react";
import LoginPage from "./app/login/page";
import { Routes, Route, Navigate } from "react-router";
import SignupPage from "./app/signup/page";
import StudentHomePage from "./app/student-home/page";
import Subject from "./app/subject/page";
import LandingPage from "./app/landing-page/page";
import TeacherPage from "./app/teacher-page/page";
import LocalSyllabus from "./app/local-syllabus/page";
import LocalSyllabusSubjectPage from "./app/local-syallabus-subject-page/page";

import { useSelector } from "react-redux";

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
          element={isLoggedIn ? <StudentHomePage /> : <LandingPage />}
        />
        <Route
          path="/signup"
          element={isLoggedIn ? <StudentHomePage /> : <SignupPage />}
        />
        <Route
          path="/login"
          element={isLoggedIn ? <StudentHomePage /> : <LoginPage />}
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
      </Routes>
    </>
  );
}

export default App;
