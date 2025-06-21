import { TeacherSignupForm } from "@/components/teacher-signup-form";
import React from "react";

export default function TeacherSignupPage() {
  return (
    <div
      className="relative z-0 bg-primary bg-hero-pattern bg-cover bg-no-repeat bg-center"
      style={{
        height: "100vh",
      }}
    >
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full">
          <TeacherSignupForm />
        </div>
      </div>
    </div>
  );
}
