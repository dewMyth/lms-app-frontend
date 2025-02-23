import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import TeacherImage from "../../assets/teacher.jpg";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/nav-bar";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const placeholderImage =
  "https://thumbs.dreamstime.com/z/assignment-text-notepad-concept-background-assignment-text-notepad-concept-background-221185258.jpg";

export default function TeacherPage() {
  const navigate = useNavigate();

  const lessons = [
    {
      title: "React Query Tutorial - Introduction",
      image: "https://sunscrapers.com/_nuxt/image/ee0bd1.webp", // Placeholder thumbnail
      video:
        "https://fzsxxnkemkqguvgzscwj.supabase.co/storage/v1/object/sign/lms-lesson-video/01.React%20Query%20Tutorial%20-%201%20-%20Introduction.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsbXMtbGVzc29uLXZpZGVvLzAxLlJlYWN0IFF1ZXJ5IFR1dG9yaWFsIC0gMSAtIEludHJvZHVjdGlvbi5tcDQiLCJpYXQiOjE3Mzk4OTkyODIsImV4cCI6MTc3MTQzNTI4Mn0.VdgpIHFLiDNqzAQIfkT-eW7ZPj0fu_eNexe5wJRlFio",
    },
    {
      title: "React Query Tutorial - GEtting Started",
      image:
        "https://miro.medium.com/v2/resize:fit:1400/1*-KcEjo_kTcNSC6LHyt9edg.jpeg", // Placeholder thumbnail
      video:
        "https://fzsxxnkemkqguvgzscwj.supabase.co/storage/v1/object/sign/lms-lesson-video/01.React%20Query%20Tutorial%20-%201%20-%20Introduction.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsbXMtbGVzc29uLXZpZGVvLzAxLlJlYWN0IFF1ZXJ5IFR1dG9yaWFsIC0gMSAtIEludHJvZHVjdGlvbi5tcDQiLCJpYXQiOjE3Mzk4OTkyODIsImV4cCI6MTc3MTQzNTI4Mn0.VdgpIHFLiDNqzAQIfkT-eW7ZPj0fu_eNexe5wJRlFio",
    },
  ];
  const [progress] = useState(60);

  return (
    <>
      <Navbar />
      <div
        className="bg-primary bg-hero-pattern bg-fixed bg-cover bg-center"
        style={{
          height: "100vh",
        }}
      >
        <div className="container mx-auto">
          <div className="p-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/subject">Maths</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Teacher</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex min-h-screen p-6">
            {/* Left side: Scrollable content */}
            <div className="flex-3 overflow-y-auto pr-6 scrollable-content px-4">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-left"
              >
                <h1 className="text-4xl font-bold text-gray-900">
                  Teacher's Page
                </h1>
                <p className="text-gray-600 mt-2 text-lg">
                  Learn from the best educators.
                </p>
              </motion.div>

              <div className="mt-6">
                <h2 className="text-xl font-bold text-gray-800">Lessons</h2>
                <hr />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {lessons.map((lesson, index) => (
                    <Card
                      key={index}
                      className="p-4 cursor-pointer overflow-hidden shadow-lg"
                      onClick={() => window.open(lesson.video, "_blank")}
                    >
                      <div className="relative">
                        <img
                          src={lesson.image}
                          alt={lesson.title}
                          className="w-full h-40 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <span className="text-white text-lg font-semibold">
                            ▶ Play
                          </span>
                        </div>
                      </div>
                      <CardContent className="text-center mt-2">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {lesson.title}
                        </h3>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {["Assignments", "Assessments", "Homeworks"].map((category) => (
                  <div key={category}>
                    <h2 className="text-xl font-bold text-gray-800">
                      {category}
                      <hr />
                    </h2>
                    <div className="grid gap-4 mt-2">
                      <Card
                        className="p-4 cursor-pointer shadow-lg"
                        onClick={() => navigate(`/${category.toLowerCase()}`)}
                      >
                        <CardContent>
                          <h3 className="text-lg font-semibold">
                            {category} 1
                          </h3>
                          <p className="text-gray-600">
                            Due Date:{" "}
                            {category === "Homeworks"
                              ? "March 10, 2025"
                              : "March 15, 2025"}
                          </p>
                          <p className="text-gray-600">
                            Status:{" "}
                            <Badge>
                              {" "}
                              {category === "Assignments"
                                ? "Pending Submission"
                                : "Not Started"}
                            </Badge>
                          </p>
                          <p className="text-gray-600">Click to view details</p>
                        </CardContent>
                      </Card>
                      <Card
                        className="p-4 cursor-pointer shadow-lg"
                        onClick={() => navigate(`/${category.toLowerCase()}`)}
                      >
                        <CardContent>
                          <h3 className="text-lg font-semibold">
                            {category} 2
                          </h3>
                          <p className="text-gray-600">
                            Due Date:{" "}
                            {category === "Homeworks"
                              ? "March 12, 2025"
                              : "March 18, 2025"}
                          </p>
                          <p className="text-gray-600">
                            Status:{" "}
                            <Badge>
                              {" "}
                              {category === "Assignments"
                                ? "Pending Submission"
                                : "Not Started"}
                            </Badge>
                          </p>
                          <p className="text-gray-600">Click to view details</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div> */}

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {["Assignments", "Assessments", "Homeworks"].map((category) => (
                  <div
                    key={category}
                    className="bg-white p-4 rounded-xl shadow-md"
                  >
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {category}
                    </h2>
                    <hr className="border-gray-300" />
                    <div className="grid gap-4 mt-4">
                      {[1, 2].map((num) => (
                        <Card
                          key={num}
                          className="p-4 cursor-pointer shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
                          onClick={() => navigate(`/${category.toLowerCase()}`)}
                        >
                          <CardContent className="flex flex-col gap-3">
                            {
                              <img
                                src={placeholderImage}
                                alt="Assignment Placeholder"
                                className="w-full h-40 object-cover rounded-lg"
                              />
                            }
                            <h3 className="text-lg font-semibold text-gray-900">
                              {category} {num}
                            </h3>
                            <div className="text-center">
                              <Progress value={progress} className="w-[100%]" />
                              <Label htmlFor="terms">
                                Completion: {progress}%
                              </Label>
                            </div>
                            <p className="text-gray-600 text-sm flex items-center gap-1">
                              Type: <Badge className="px-2 py-1">MCQ</Badge>
                            </p>
                            <p className="text-gray-600 text-sm">
                              Due Date:{" "}
                              {category === "Homeworks"
                                ? `March ${10 + num * 2}, 2025`
                                : `March ${15 + num * 3}, 2025`}
                            </p>
                            <p className="text-gray-600 text-sm flex items-center gap-1">
                              Status:{" "}
                              <Badge className="px-2 py-1">
                                {category === "Assignments"
                                  ? "Pending Submission"
                                  : "Not Started"}
                              </Badge>
                            </p>
                            <hr />
                            <p className="text-black-500 text-sm font-medium hover:underline text-center">
                              <Button variant="outline" className="w-[100%]">
                                ආරම්භ කරන්න
                              </Button>
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side: Fixed teacher profile */}
            <div className="flex-2 sticky top-0 bg-white p-6 rounded-lg shadow-lg h-screen flex flex-col items-center">
              <img
                src={TeacherImage}
                alt="Teacher"
                className="w-32 h-32 rounded-full"
              />
              <h2 className="text-2xl font-semibold text-gray-800 mt-4 text-center">
                John Doe
              </h2>
              <p className="text-gray-600 text-center">
                PhD in Computer Science, 10+ Years Experience
              </p>
              <p className="text-gray-600 mt-2 text-center">
                Passionate about teaching and making learning interactive and
                engaging.
              </p>

              <div className="p-4">
                <div>
                  <Label htmlFor="terms">Your Progress with the teacher</Label>
                  <div className="mt-4">
                    <Progress value={progress} className="w-[100%]" />
                  </div>
                  <div className="mx-auto text-center">
                    <Label htmlFor="terms">{progress}%</Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
