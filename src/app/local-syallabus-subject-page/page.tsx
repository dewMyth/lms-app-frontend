import Navbar from "@/components/nav-bar";
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookMarked,
  BookOpenCheck,
  Download,
  DownloadIcon,
  NotebookPen,
} from "lucide-react";
import LessonThumbnail from "@/components/LessonThumbnail";
import { fetchData, postData } from "@/apiService";

import { useSelector } from "react-redux";

function LocalSyllabusSubjectPage() {
  const [lessons, setLessons] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);

  let { grade, subject } = useParams();
  grade = grade?.split("-")[1];
  const navigate = useNavigate();

  const user = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    // Get Video Lessons
    const fetchLessons = async () => {
      try {
        const data = await fetchData(
          `subject-content/get-video-lessons/grade/${grade}/subject/${subject}`
        );
        setLessons(data);
      } catch (error) {
        console.error("Error fetching video lessons:", error);
      }
    };

    // Get Activities
    const fetchActivities = async () => {
      try {
        const data = await fetchData(
          `subject-content/get-activities/grade/${grade}/subject/${subject}`
        );
        setActivities(data);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchLessons();
    fetchActivities();
  }, []);

  const handleStartClick = async (activityId: any) => {
    const res = await postData(
      `users/add-assignment/${activityId}/${user._id}`
    );
    if (res) {
      navigate(`/my-activities/${user._id}`);
    }
  };

  // const lessons = [
  //   {
  //     title:
  //       "01_ශබ්දවලට සවන්දීමෙන් ඒ වගේ සියුම් වෙනස්කම් හඳුනාගෙන වෙනස්කම් දක්වයි",
  //     youtubeUrl: "https://www.youtube.com/watch?v=mvjeiDnGXxs",
  //   },
  //   {
  //     title: "02_රූප දෙස බලා එහි සුවිශේෂතා හඳුනාගෙන ලකුණු කරයි",
  //     youtubeUrl: "https://www.youtube.com/watch?v=NzG3Bwkc8GQ",
  //   },
  //   {
  //     title: "03_රූපමත කොළ අලවා නිර්මාණයක් කරමු",
  //     youtubeUrl: "https://www.youtube.com/watch?v=8CvCo_NYOTA",
  //   },
  //   {
  //     title: "04_රැළි කපා ඇලවීම සහ වෙස් මුහුණු නිර්මාණය කිරීම",
  //     youtubeUrl: "https://www.youtube.com/watch?v=2wt_b8XyrbI",
  //   },
  //   {
  //     title: "05_කඩදාසි වලින් රූප නිර්මාණය කිරීම",
  //     youtubeUrl: "https://www.youtube.com/watch?v=Fq9YF6GA9SU",
  //   },
  //   {
  //     title: "06_මල් වත්තක් නිර්මාණය කරමු",
  //     youtubeUrl: "https://www.youtube.com/watch?v=txS93WCQ7qs",
  //   },
  //   {
  //     title: "07_විශාල වස්තූන් හා කුඩා වස්තූන් හදුනා ගැනීම",
  //     youtubeUrl: "https://www.youtube.com/watch?v=M8D_WuxB4LU",
  //   },
  //   {
  //     title: "08_පින්තූර බලා වචන කියවමු Part 01",
  //     youtubeUrl: "https://www.youtube.com/watch?v=JZnv9BUkQ0I",
  //   },
  //   {
  //     title: "09_පින්තූර බලා වචන කියවමු Part 02",
  //     youtubeUrl: "https://www.youtube.com/watch?v=H-0LjO1TFfI",
  //   },
  //   {
  //     title: "10_හැඩ අඳිමු Part 01",
  //     youtubeUrl: "https://www.youtube.com/watch?v=C7mBIXSEazM",
  //   },
  //   {
  //     title: "11_හැඩ අඳිමු Part 02",
  //     youtubeUrl: "https://www.youtube.com/watch?v=kdMa99jSR6s",
  //   },
  //   {
  //     title: "12_හැඩ අඳිමු Part 03",
  //     youtubeUrl: "https://www.youtube.com/watch?v=_YzrJS4O8DE",
  //   },
  //   {
  //     title: "13_හැඩ අඳිමු Part 04",
  //     youtubeUrl: "https://www.youtube.com/watch?v=34QXMnetxFc",
  //   },
  //   {
  //     title: "14_හැඩ අඳිමු Part 05",
  //     youtubeUrl: "https://www.youtube.com/watch?v=zOljJy7p29w",
  //   },
  // ];

  // const activities = [
  //   {
  //     index: 1,
  //     title:
  //       "01_පූර්ව භාෂා කුසලතා - ක්‍රියාකාරකම් පත්‍රිකාව - සමාන රූප යා කරමු",
  //     file: "https://drive.google.com/file/d/1RGWAsSCtLWBUGdmAzKypYmr42-N9YKCh/view?usp=drive_link",
  //   },
  //   {
  //     index: 2,
  //     title: "02_පූර්ව භාෂා කුසලතා - ක්‍රියාකාරකම් පත්‍රිකාව - සමාන රූප තෝරමු",
  //     file: "https://drive.google.com/file/d/1-Mzh3y5OOP9uZK3Y7J3Edc-DqW8qxBk8/view?usp=drive_link",
  //   },
  //   {
  //     index: 3,
  //     title:
  //       "01_පූර්ව භාෂා කුසලතා - ක්‍රියාකාරකම් පත්‍රිකාව - සමාන රූප යා කරමු",
  //     file: "https://drive.google.com/file/d/1RGWAsSCtLWBUGdmAzKypYmr42-N9YKCh/view?usp=drive_link",
  //   },
  //   {
  //     index: 4,
  //     title: "02_පූර්ව භාෂා කුසලතා - ක්‍රියාකාරකම් පත්‍රිකාව - සමාන රූප තෝරමු",
  //     file: "https://drive.google.com/file/d/1-Mzh3y5OOP9uZK3Y7J3Edc-DqW8qxBk8/view?usp=drive_link",
  //   },
  // ];

  console.log(lessons);

  return (
    <>
      <Navbar />
      <div
        className="bg-primary bg-hero-pattern bg-fixed bg-cover bg-center bg-fixed"
        // style={{
        //   height: "100vh",
        // }}
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
                  <BreadcrumbLink href="/local-syllabus">Grade</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Subject</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="mt-5 px-10">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              {grade} ශ්‍රේණිය -{" "}
              {subject == "sinhala"
                ? "සිංහල"
                : subject == "maths"
                ? "ගණිතය"
                : subject == "environment"
                ? "පරිසරය"
                : ""}
            </h1>
            <br />
            <div className="grid grid-cols-[5fr_2fr] gap-4">
              <div>
                <div className="mt-6 gap-6">
                  <section
                    className="activities max-h-[350px] overflow-y-auto scrollable-content h-200 container"
                    //style={{ height: "650px" }}
                  >
                    <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                      ක්‍රියාකරකම්
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                      {activities.map((activity, index) => (
                        <Card className=" mt-5 cursor-pointer shadow-lg transition-transform hover:shadow-xl mr-5">
                          <CardContent className="flex flex-col gap-3">
                            <div className="grid grid-cols-[1fr_9fr_2fr] gap-2 my-2">
                              <div className="flex items-center justify-center">
                                <NotebookPen />
                              </div>
                              <div>
                                <p className="text-gray-600 text-sm flex items-center gap-1">
                                  {activity.index} - {activity.title}
                                </p>
                                <p className="text-gray-600 text-sm flex items-center gap-1 mt-2">
                                  Type:{" "}
                                  <Badge className="px-2 py-1">Matching</Badge>
                                </p>
                              </div>
                              <div className="flex items-center justify-center">
                                <DownloadIcon />
                              </div>
                            </div>

                            <hr />
                            <label className="cursor-pointer inline-flex items-center gap-2">
                              <Button
                                onClick={() => handleStartClick(activity._id)}
                                className="w-full flex items-center gap-2"
                              >
                                පටන් ගන්න
                              </Button>
                            </label>
                            {/* <label className="cursor-pointer inline-flex items-center gap-2">
                              <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange} //
                                className="hidden" // Completely hides the default file input
                              />
                              <Button
                                onClick={handleClick}
                                className="w-full flex items-center gap-2"
                              >
                                {fileName ? fileName : "ඔබේ පිළිතුර"} <Upload />
                              </Button>
                            </label> */}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </section>
                  <section className="syllabus mt-10">
                    <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                      විෂය නිර්දේශය
                    </h2>
                    <div className="grid grid-cols-3 gap-10">
                      <Card className="w-[350px] mt-5  p-4 cursor-pointer shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
                        <CardContent className="flex flex-col gap-3">
                          <div className="grid grid-cols-[1fr_8fr] gap-2 my-2">
                            <div>
                              <BookMarked />
                            </div>
                            <div>
                              <p className="text-gray-600 text-sm flex items-center gap-1">
                                {grade} ශ්‍රේණිය -{" "}
                                {subject == "sinhala"
                                  ? "සිංහල"
                                  : subject == "maths"
                                  ? "ගණිතය"
                                  : subject == "environment"
                                  ? "පරිසරය"
                                  : ""}{" "}
                                විෂය නිර්දේශය
                              </p>
                              <p className="text-gray-600 text-sm flex items-center gap-1 mt-2">
                                Type:{" "}
                                <Badge className="px-2 py-1">Syllabus</Badge>
                              </p>
                            </div>
                          </div>

                          <hr />
                          <p className="text-black-500 text-sm font-medium hover:underline text-center">
                            <Button className="w-[100%]">
                              බාගත කරන්න <Download />
                            </Button>
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="w-[450px] mt-5 mx-5 p-4 cursor-pointer shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
                        <CardContent className="flex flex-col gap-3">
                          <div className="grid grid-cols-[1fr_8fr] gap-2 my-2">
                            <div>
                              <BookOpenCheck />
                            </div>
                            <div>
                              <p className="text-gray-600 text-sm flex items-center gap-1">
                                {grade} ශ්‍රේණිය -{" "}
                                {subject == "sinhala"
                                  ? "සිංහල"
                                  : subject == "maths"
                                  ? "ගණිතය"
                                  : subject == "environment"
                                  ? "පරිසරය"
                                  : ""}{" "}
                                ගුරු මාර්ගෝපදේශනය
                              </p>
                              <p className="text-gray-600 text-sm flex items-center gap-1 mt-2">
                                Type:{" "}
                                <Badge className="px-2 py-1">
                                  Teachers' Guide
                                </Badge>
                              </p>
                            </div>
                          </div>

                          <hr />
                          <p className="text-black-500 text-sm font-medium hover:underline text-center">
                            <Button className="w-[100%]">
                              බාගත කරන්න <Download />
                            </Button>
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </section>
                  <section className="text-books mt-10">
                    <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                      පාසල් පෙළපොත
                    </h2>
                    <div className="grid grid-cols-3 gap-4">
                      <Card className="w-[350px] mt-5 p-4 cursor-pointer shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
                        <CardContent className="flex flex-col gap-3">
                          <div className="grid grid-cols-[1fr_8fr] gap-2 my-2">
                            <div>
                              <BookMarked />
                            </div>
                            <div>
                              <p className="text-gray-600 text-sm flex items-center gap-1">
                                {grade} ශ්‍රේණිය -{" "}
                                {subject == "sinhala"
                                  ? "සිංහල"
                                  : subject == "maths"
                                  ? "ගණිතය"
                                  : subject == "environment"
                                  ? "පරිසරය"
                                  : ""}{" "}
                                කියවීම් පොත
                              </p>
                              <p className="text-gray-600 text-sm flex items-center gap-1 mt-2">
                                Type:{" "}
                                <Badge className="px-2 py-1">Textbook</Badge>
                              </p>
                            </div>
                          </div>

                          <hr />
                          <p className="text-black-500 text-sm font-medium hover:underline text-center">
                            <Button className="w-[100%]">
                              බාගත කරන්න <Download />
                            </Button>
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="w-[450px] mx-5  mt-5 p-4 cursor-pointer shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
                        <CardContent className="flex flex-col gap-3">
                          <div className="grid grid-cols-[1fr_8fr] gap-2 my-2">
                            <div>
                              <BookOpenCheck />
                            </div>
                            <div>
                              <p className="text-gray-600 text-sm flex items-center gap-1">
                                {grade} ශ්‍රේණිය -{" "}
                                {subject == "sinhala"
                                  ? "සිංහල"
                                  : subject == "maths"
                                  ? "ගණිතය"
                                  : subject == "environment"
                                  ? "පරිසරය"
                                  : ""}{" "}
                                වැඩ පොත
                              </p>
                              <p className="text-gray-600 text-sm flex items-center gap-1 mt-2">
                                Type:{" "}
                                <Badge className="px-2 py-1">Workbook</Badge>
                              </p>
                            </div>
                          </div>

                          <hr />
                          <p className="text-black-500 text-sm font-medium hover:underline text-center">
                            <Button className="w-[100%]">
                              බාගත කරන්න <Download />
                            </Button>
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </section>
                </div>
              </div>
              <div>
                <div className="mt-6 gap-6">
                  <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                    වීඩීයෝ පාඩම්
                  </h2>
                  <hr />
                  <div className="overflow-y-auto scrollable-content">
                    <div className="flex flex-col gap-6 p-6">
                      {}
                      {lessons.map((lesson, index) => (
                        // <>{JSON.stringify(lesson)}</>
                        <LessonThumbnail key={index} {...lesson} />
                      ))}
                    </div>
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

export default LocalSyllabusSubjectPage;
