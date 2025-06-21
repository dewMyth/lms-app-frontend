"use client";

import { useState } from "react";
import DashboardOverview from "./dashboard-overview";
import StudentsManagement from "./students-management";
import TeachersManagement from "./teachers-management";
import AssignmentsManagement from "./assignments-management";
import VideosManagement from "./videos-management";

export default function LMSAdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");

  const handleNavigate = (section: string) => {
    setActiveSection(section);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardOverview onNavigate={handleNavigate} />;
      case "students":
        return <StudentsManagement />;
      case "teachers":
        return <TeachersManagement />;
      case "assignments":
        return <AssignmentsManagement />;
      case "videos":
        return <VideosManagement />;
      default:
        return <DashboardOverview onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        {/* Navigation Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-1 bg-muted p-1 rounded-lg">
            {[
              { key: "dashboard", label: "Dashboard" },
              { key: "students", label: "Students" },
              { key: "teachers", label: "Teachers" },
              { key: "assignments", label: "Assignments" },
              { key: "videos", label: "Videos" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleNavigate(tab.key)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeSection === tab.key
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
}
