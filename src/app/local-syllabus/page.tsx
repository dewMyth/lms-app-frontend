import Navbar from "@/components/nav-bar";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router";
import { Book, BookIcon, GraduationCap, Lock } from "lucide-react";
import { useSelector } from "react-redux";
// import { FaBookOpen } from "react-icons/fa";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { fetchData } from "@/apiService";

export default function LocalSyllabus() {
  const grades = [
    { grade: 1, color: "bg-blue-400" },
    { grade: 2, color: "bg-green-400" },
    { grade: 3, color: "bg-yellow-400" },
    { grade: 4, color: "bg-red-400" },
    { grade: 5, color: "bg-purple-400" },
  ];

  const navigate = useNavigate();

  // Get user from
  const user = useSelector((state: any) => state.auth.user);
  const [userGrade, setUserGrade] = useState<number | null>(1);

  useEffect(() => {
    const fetchUserGrade = async () => {
      const response = await fetchData(
        `users/all-user-details/student/${user?._id}`
      );
      console.log("User Data:", response);
      if (response.userData && response.userData.grade) {
        setUserGrade(parseInt(response.userData.grade));
      }
    };

    fetchUserGrade();
  }, []);

  // Get user grade from api call using user._id

  // const userGrade = user?.grade ? parseInt(user.grade) : null;

  // Function to check if a grade is accessible
  const isGradeAccessible = (grade: number) => {
    return userGrade === grade;
  };

  // Function to render grade card
  const renderGradeCard = ({
    grade,
    color,
  }: {
    grade: number;
    color: string;
  }) => {
    const isAccessible = isGradeAccessible(grade);

    if (isAccessible) {
      // Render clickable grade card
      return (
        <Drawer key={grade}>
          <DrawerTrigger asChild>
            <Card
              className={`cursor-pointer p-10 rounded-3xl text-white text-center shadow-lg transition-transform transform hover:scale-105 ${color} h-40 flex justify-center items-center`}
            >
              <CardContent className="flex flex-col items-center gap-6">
                <GraduationCap size={"3rem"} />
                <span className="text-2xl font-bold">Grade {grade}</span>
              </CardContent>
            </Card>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Select a Subject</DrawerTitle>
                <DrawerDescription>
                  What are you going to learn today?
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4 pb-0">
                <div className="flex items-center justify-center space-x-2">
                  <div className="flex-1 text-center m-4">
                    <Button
                      variant="secondary"
                      className="w-[100%] mb-5 p-10 shadow-md"
                      size={"lg"}
                      onClick={() =>
                        navigate(`/local-syllabus/grade-${grade}/sinhala`)
                      }
                    >
                      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                        සිංහල
                      </h1>
                    </Button>
                    <Button
                      className="w-[100%] mb-5 p-10 shadow-md"
                      onClick={() =>
                        navigate(`/local-syllabus/grade-${grade}/maths`)
                      }
                    >
                      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                        ගණිතය
                      </h1>
                    </Button>
                    <Button
                      variant="secondary"
                      className="w-[100%] mb-5 p-10 shadow-md"
                      onClick={() =>
                        navigate(`/local-syllabus/grade-${grade}/environment`)
                      }
                    >
                      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                        පරිසරය
                      </h1>
                    </Button>
                    <Button
                      className="w-[100%] mb-5 p-10 shadow-md"
                      onClick={() =>
                        navigate(
                          `/local-syllabus/grade-${grade}/term-test-papers`
                        )
                      }
                    >
                      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                        වාර ප්‍රශ්න පත්‍ර
                      </h1>
                    </Button>
                  </div>
                </div>
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Back</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      );
    } else {
      // Render disabled grade card
      return (
        <Card
          key={grade}
          className={`p-10 rounded-3xl text-white text-center shadow-lg ${color} h-40 flex justify-center items-center opacity-50 cursor-not-allowed relative`}
        >
          <CardContent className="flex flex-col items-center gap-6">
            <div className="relative">
              <GraduationCap size={"3rem"} />
              <Lock
                size={"1.5rem"}
                className="absolute -top-2 -right-2 text-white bg-gray-600 rounded-full p-1"
              />
            </div>
            <span className="text-2xl font-bold">Grade {grade}</span>
            <span className="text-sm opacity-75">
              Not available for your grade
            </span>
          </CardContent>
        </Card>
      );
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="relative z-0 bg-primary bg-hero-pattern bg-cover bg-no-repeat bg-center"
        style={{
          height: "100vh",
        }}
      >
        <div className="container mx-auto">
          <div className=" mt-10 px-10">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Local School Syllabus / පාසල් විෂය නිර්දේශය
            </h1>
            <br />
            <hr />
            <br />
            <div>
              <p className="leading-7 [&:not(:first-child)]:mt-6">
                Once upon a time, in a far-off land, there was a very lazy king
                who spent all day lounging on his throne. One day, his advisors
                came to him with a problem: the kingdom was running out of
                money. Once upon a time, in a far-off land, there was a very
                lazy king who spent all day lounging on his throne. One day, his
                advisors came to him with a problem: the kingdom was running out
                of money. Once upon a time, in a far-off land, there was a very
                lazy king who spent all day lounging on his throne. One day, his
                advisors came to him with a problem: the kingdom was running out
                of money. Once upon a time, in a far-off land, there was a very
                lazy king who spent all day lounging on his throne. One day, his
                advisors came to him with a problem: the kingdom was running out
                of money.
              </p>
            </div>
          </div>
          <div className="w-full flex justify-center items-center p-6 mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8 w-full max-w-5xl">
              {grades.map(renderGradeCard)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
