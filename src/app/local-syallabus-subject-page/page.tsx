// import Navbar from "@/components/nav-bar";
// import { useState, useRef, useEffect } from "react";
// import { useParams } from "react-router";
// import { useNavigate } from "react-router";

// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";

// import { Card, CardContent } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { Label } from "@/components/ui/label";

// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   BookMarked,
//   BookOpenCheck,
//   Download,
//   DownloadIcon,
//   NotebookPen,
// } from "lucide-react";
// import LessonThumbnail from "@/components/LessonThumbnail";
// import { fetchData, postData } from "@/apiService";

// import { useSelector } from "react-redux";

// function LocalSyllabusSubjectPage() {
//   const [lessons, setLessons] = useState<any[]>([]);
//   const [activities, setActivities] = useState<any[]>([]);
//   const [myActivities, setMyActivities] = useState<any[]>([]);

//   let { grade, subject } = useParams();
//   grade = grade?.split("-")[1];
//   const navigate = useNavigate();

//   const user = useSelector((state: any) => state.auth.user);

//   useEffect(() => {
//     // Get Video Lessons
//     const fetchLessons = async () => {
//       try {
//         const data = await fetchData(
//           `subject-content/get-video-lessons/grade/${grade}/subject/${subject}`
//         );
//         setLessons(data);
//       } catch (error) {
//         console.error("Error fetching video lessons:", error);
//       }
//     };

//     // Get Activities
//     const fetchActivities = async () => {
//       try {
//         const data = await fetchData(
//           `subject-content/get-activities/grade/${grade}/subject/${subject}`
//         );
//         setActivities(data);
//       } catch (error) {
//         console.error("Error fetching activities:", error);
//       }
//     };

//     const fetchMyActivities = async () => {
//       try {
//         const data = await fetchData(`users/view-all-assignments/${user._id}`);
//         setMyActivities(data);
//       } catch (error) {
//         console.error("Error fetching activities:", error);
//       }
//     };

//     fetchLessons();
//     fetchActivities();
//     fetchMyActivities();
//   }, []);

//   const handleStartClick = async (activityId: any) => {
//     const res = await postData(
//       `users/add-assignment/${activityId}/${user._id}`
//     );
//     if (res) {
//       navigate(`/my-activities/${user._id}`);
//     }
//   };

//   // const lessons = [
//   //   {
//   //     title:
//   //       "01_ශබ්දවලට සවන්දීමෙන් ඒ වගේ සියුම් වෙනස්කම් හඳුනාගෙන වෙනස්කම් දක්වයි",
//   //     youtubeUrl: "https://www.youtube.com/watch?v=mvjeiDnGXxs",
//   //   },
//   //   {
//   //     title: "02_රූප දෙස බලා එහි සුවිශේෂතා හඳුනාගෙන ලකුණු කරයි",
//   //     youtubeUrl: "https://www.youtube.com/watch?v=NzG3Bwkc8GQ",
//   //   },
//   //   {
//   //     title: "03_රූපමත කොළ අලවා නිර්මාණයක් කරමු",
//   //     youtubeUrl: "https://www.youtube.com/watch?v=8CvCo_NYOTA",
//   //   },
//   //   {
//   //     title: "04_රැළි කපා ඇලවීම සහ වෙස් මුහුණු නිර්මාණය කිරීම",
//   //     youtubeUrl: "https://www.youtube.com/watch?v=2wt_b8XyrbI",
//   //   },
//   //   {
//   //     title: "05_කඩදාසි වලින් රූප නිර්මාණය කිරීම",
//   //     youtubeUrl: "https://www.youtube.com/watch?v=Fq9YF6GA9SU",
//   //   },
//   //   {
//   //     title: "06_මල් වත්තක් නිර්මාණය කරමු",
//   //     youtubeUrl: "https://www.youtube.com/watch?v=txS93WCQ7qs",
//   //   },
//   //   {
//   //     title: "07_විශාල වස්තූන් හා කුඩා වස්තූන් හදුනා ගැනීම",
//   //     youtubeUrl: "https://www.youtube.com/watch?v=M8D_WuxB4LU",
//   //   },
//   //   {
//   //     title: "08_පින්තූර බලා වචන කියවමු Part 01",
//   //     youtubeUrl: "https://www.youtube.com/watch?v=JZnv9BUkQ0I",
//   //   },
//   //   {
//   //     title: "09_පින්තූර බලා වචන කියවමු Part 02",
//   //     youtubeUrl: "https://www.youtube.com/watch?v=H-0LjO1TFfI",
//   //   },
//   //   {
//   //     title: "10_හැඩ අඳිමු Part 01",
//   //     youtubeUrl: "https://www.youtube.com/watch?v=C7mBIXSEazM",
//   //   },
//   //   {
//   //     title: "11_හැඩ අඳිමු Part 02",
//   //     youtubeUrl: "https://www.youtube.com/watch?v=kdMa99jSR6s",
//   //   },
//   //   {
//   //     title: "12_හැඩ අඳිමු Part 03",
//   //     youtubeUrl: "https://www.youtube.com/watch?v=_YzrJS4O8DE",
//   //   },
//   //   {
//   //     title: "13_හැඩ අඳිමු Part 04",
//   //     youtubeUrl: "https://www.youtube.com/watch?v=34QXMnetxFc",
//   //   },
//   //   {
//   //     title: "14_හැඩ අඳිමු Part 05",
//   //     youtubeUrl: "https://www.youtube.com/watch?v=zOljJy7p29w",
//   //   },
//   // ];

//   // const activities = [
//   //   {
//   //     index: 1,
//   //     title:
//   //       "01_පූර්ව භාෂා කුසලතා - ක්‍රියාකාරකම් පත්‍රිකාව - සමාන රූප යා කරමු",
//   //     file: "https://drive.google.com/file/d/1RGWAsSCtLWBUGdmAzKypYmr42-N9YKCh/view?usp=drive_link",
//   //   },
//   //   {
//   //     index: 2,
//   //     title: "02_පූර්ව භාෂා කුසලතා - ක්‍රියාකාරකම් පත්‍රිකාව - සමාන රූප තෝරමු",
//   //     file: "https://drive.google.com/file/d/1-Mzh3y5OOP9uZK3Y7J3Edc-DqW8qxBk8/view?usp=drive_link",
//   //   },
//   //   {
//   //     index: 3,
//   //     title:
//   //       "01_පූර්ව භාෂා කුසලතා - ක්‍රියාකාරකම් පත්‍රිකාව - සමාන රූප යා කරමු",
//   //     file: "https://drive.google.com/file/d/1RGWAsSCtLWBUGdmAzKypYmr42-N9YKCh/view?usp=drive_link",
//   //   },
//   //   {
//   //     index: 4,
//   //     title: "02_පූර්ව භාෂා කුසලතා - ක්‍රියාකාරකම් පත්‍රිකාව - සමාන රූප තෝරමු",
//   //     file: "https://drive.google.com/file/d/1-Mzh3y5OOP9uZK3Y7J3Edc-DqW8qxBk8/view?usp=drive_link",
//   //   },
//   // ];

//   console.log(lessons);

//   return (
//     <>
//       <Navbar />
//       <div
//         className="bg-primary bg-hero-pattern bg-fixed bg-cover bg-center bg-fixed"
//         // style={{
//         //   height: "100vh",
//         // }}
//       >
//         <div className="container mx-auto">
//           <div className="p-6">
//             <Breadcrumb>
//               <BreadcrumbList>
//                 <BreadcrumbItem>
//                   <BreadcrumbLink href="/">Home</BreadcrumbLink>
//                 </BreadcrumbItem>
//                 <BreadcrumbSeparator />
//                 <BreadcrumbItem>
//                   <BreadcrumbLink href="/local-syllabus">Grade</BreadcrumbLink>
//                 </BreadcrumbItem>
//                 <BreadcrumbSeparator />
//                 <BreadcrumbItem>
//                   <BreadcrumbPage>Subject</BreadcrumbPage>
//                 </BreadcrumbItem>
//               </BreadcrumbList>
//             </Breadcrumb>
//           </div>
//           <div className="mt-5 px-10">
//             <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
//               {grade} ශ්‍රේණිය -{" "}
//               {subject == "sinhala"
//                 ? "සිංහල"
//                 : subject == "maths"
//                 ? "ගණිතය"
//                 : subject == "environment"
//                 ? "පරිසරය"
//                 : ""}
//             </h1>
//             <br />
//             <div className="grid grid-cols-[5fr_2fr] gap-4">
//               <div>
//                 <div className="mt-6 gap-6">
//                   <section
//                     className="activities max-h-[350px] overflow-y-auto scrollable-content h-200 container"
//                     //style={{ height: "650px" }}
//                   >
//                     <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
//                       ක්‍රියාකරකම්
//                     </h2>
//                     <div className="grid grid-cols-1 gap-4">
//                       {activities.map((activity) => (
//                         <Card className=" mt-5 cursor-pointer shadow-lg transition-transform hover:shadow-xl mr-5">
//                           <CardContent className="flex flex-col gap-3">
//                             <div className="grid grid-cols-[1fr_9fr_2fr] gap-2 my-2">
//                               <div className="flex items-center justify-center">
//                                 <NotebookPen />
//                               </div>
//                               <div>
//                                 <p className="text-gray-600 text-sm flex items-center gap-1">
//                                   {activity.title}
//                                 </p>
//                                 <p className="text-gray-600 text-sm flex items-center gap-1 mt-2">
//                                   Type:{" "}
//                                   <Badge className="px-2 py-1">Matching</Badge>
//                                 </p>
//                               </div>
//                               <div className="flex items-center justify-center">
//                                 <DownloadIcon />
//                               </div>
//                             </div>

//                             <hr />
//                             <label className="cursor-pointer inline-flex items-center gap-2">
//                               <Button
//                                 onClick={() => handleStartClick(activity._id)}
//                                 className="w-full flex items-center gap-2"
//                                 disabled={myActivities.some(
//                                   (myActivity) =>
//                                     myActivity._id === activity._id
//                                 )}
//                               >
//                                 {myActivities.some(
//                                   (myActivity) =>
//                                     myActivity._id === activity._id
//                                 )
//                                   ? "Added already"
//                                   : "පටන් ගන්න"}
//                               </Button>
//                             </label>
//                             {/* <label className="cursor-pointer inline-flex items-center gap-2">
//                               <input
//                                 type="file"
//                                 ref={fileInputRef}
//                                 onChange={handleFileChange} //
//                                 className="hidden" // Completely hides the default file input
//                               />
//                               <Button
//                                 onClick={handleClick}
//                                 className="w-full flex items-center gap-2"
//                               >
//                                 {fileName ? fileName : "ඔබේ පිළිතුර"} <Upload />
//                               </Button>
//                             </label> */}
//                           </CardContent>
//                         </Card>
//                       ))}
//                     </div>
//                   </section>
//                   <section className="syllabus mt-10">
//                     <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
//                       විෂය නිර්දේශය
//                     </h2>
//                     <div className="grid grid-cols-3 gap-10">
//                       <Card className="w-[350px] mt-5  p-4 cursor-pointer shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
//                         <CardContent className="flex flex-col gap-3">
//                           <div className="grid grid-cols-[1fr_8fr] gap-2 my-2">
//                             <div>
//                               <BookMarked />
//                             </div>
//                             <div>
//                               <p className="text-gray-600 text-sm flex items-center gap-1">
//                                 {grade} ශ්‍රේණිය -{" "}
//                                 {subject == "sinhala"
//                                   ? "සිංහල"
//                                   : subject == "maths"
//                                   ? "ගණිතය"
//                                   : subject == "environment"
//                                   ? "පරිසරය"
//                                   : ""}{" "}
//                                 විෂය නිර්දේශය
//                               </p>
//                               <p className="text-gray-600 text-sm flex items-center gap-1 mt-2">
//                                 Type:{" "}
//                                 <Badge className="px-2 py-1">Syllabus</Badge>
//                               </p>
//                             </div>
//                           </div>

//                           <hr />
//                           <p className="text-black-500 text-sm font-medium hover:underline text-center">
//                             <Button className="w-[100%]">
//                               බාගත කරන්න <Download />
//                             </Button>
//                           </p>
//                         </CardContent>
//                       </Card>
//                       <Card className="w-[450px] mt-5 mx-5 p-4 cursor-pointer shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
//                         <CardContent className="flex flex-col gap-3">
//                           <div className="grid grid-cols-[1fr_8fr] gap-2 my-2">
//                             <div>
//                               <BookOpenCheck />
//                             </div>
//                             <div>
//                               <p className="text-gray-600 text-sm flex items-center gap-1">
//                                 {grade} ශ්‍රේණිය -{" "}
//                                 {subject == "sinhala"
//                                   ? "සිංහල"
//                                   : subject == "maths"
//                                   ? "ගණිතය"
//                                   : subject == "environment"
//                                   ? "පරිසරය"
//                                   : ""}{" "}
//                                 ගුරු මාර්ගෝපදේශනය
//                               </p>
//                               <p className="text-gray-600 text-sm flex items-center gap-1 mt-2">
//                                 Type:{" "}
//                                 <Badge className="px-2 py-1">
//                                   Teachers' Guide
//                                 </Badge>
//                               </p>
//                             </div>
//                           </div>

//                           <hr />
//                           <p className="text-black-500 text-sm font-medium hover:underline text-center">
//                             <Button className="w-[100%]">
//                               බාගත කරන්න <Download />
//                             </Button>
//                           </p>
//                         </CardContent>
//                       </Card>
//                     </div>
//                   </section>
//                   <section className="text-books mt-10">
//                     <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
//                       පාසල් පෙළපොත
//                     </h2>
//                     <div className="grid grid-cols-3 gap-4">
//                       <Card className="w-[350px] mt-5 p-4 cursor-pointer shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
//                         <CardContent className="flex flex-col gap-3">
//                           <div className="grid grid-cols-[1fr_8fr] gap-2 my-2">
//                             <div>
//                               <BookMarked />
//                             </div>
//                             <div>
//                               <p className="text-gray-600 text-sm flex items-center gap-1">
//                                 {grade} ශ්‍රේණිය -{" "}
//                                 {subject == "sinhala"
//                                   ? "සිංහල"
//                                   : subject == "maths"
//                                   ? "ගණිතය"
//                                   : subject == "environment"
//                                   ? "පරිසරය"
//                                   : ""}{" "}
//                                 කියවීම් පොත
//                               </p>
//                               <p className="text-gray-600 text-sm flex items-center gap-1 mt-2">
//                                 Type:{" "}
//                                 <Badge className="px-2 py-1">Textbook</Badge>
//                               </p>
//                             </div>
//                           </div>

//                           <hr />
//                           <p className="text-black-500 text-sm font-medium hover:underline text-center">
//                             <Button className="w-[100%]">
//                               බාගත කරන්න <Download />
//                             </Button>
//                           </p>
//                         </CardContent>
//                       </Card>
//                       <Card className="w-[450px] mx-5  mt-5 p-4 cursor-pointer shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
//                         <CardContent className="flex flex-col gap-3">
//                           <div className="grid grid-cols-[1fr_8fr] gap-2 my-2">
//                             <div>
//                               <BookOpenCheck />
//                             </div>
//                             <div>
//                               <p className="text-gray-600 text-sm flex items-center gap-1">
//                                 {grade} ශ්‍රේණිය -{" "}
//                                 {subject == "sinhala"
//                                   ? "සිංහල"
//                                   : subject == "maths"
//                                   ? "ගණිතය"
//                                   : subject == "environment"
//                                   ? "පරිසරය"
//                                   : ""}{" "}
//                                 වැඩ පොත
//                               </p>
//                               <p className="text-gray-600 text-sm flex items-center gap-1 mt-2">
//                                 Type:{" "}
//                                 <Badge className="px-2 py-1">Workbook</Badge>
//                               </p>
//                             </div>
//                           </div>

//                           <hr />
//                           <p className="text-black-500 text-sm font-medium hover:underline text-center">
//                             <Button className="w-[100%]">
//                               බාගත කරන්න <Download />
//                             </Button>
//                           </p>
//                         </CardContent>
//                       </Card>
//                     </div>
//                   </section>
//                 </div>
//               </div>
//               <div>
//                 <div className="mt-6 gap-6">
//                   <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
//                     වීඩීයෝ පාඩම්
//                   </h2>
//                   <hr />
//                   <div className="overflow-y-auto scrollable-content">
//                     <div className="flex flex-col gap-6 p-6">
//                       {}
//                       {lessons.map((lesson, index) => (
//                         // <>{JSON.stringify(lesson)}</>
//                         <LessonThumbnail key={index} {...lesson} />
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default LocalSyllabusSubjectPage;

"use client";

import { useState, useEffect } from "react";
import { useParams } from "react-router";
import {
  BookMarked,
  BookOpenCheck,
  Download,
  NotebookPen,
  Play,
  ChevronRight,
  FileText,
  BookOpen,
  Video,
  CheckCircle2,
  Clock,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";

import Navbar from "@/components/nav-bar";
import LessonThumbnail from "@/components/lesson-thumbnail";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_BASE_URL } from "@/apiService";

// Mock fetchData and postData functions for the example
const fetchData = async (url: string) => {
  // In a real app, this would be an actual API call
  console.log(`Fetching data from: ${url}`);

  // Return mock data based on the URL
  if (url.includes("get-video-lessons")) {
    const videoLessons = (await axios.get(`${API_BASE_URL}${url}`)).data;

    if (!videoLessons) {
      return [];
    }

    return videoLessons;
  } else if (url.includes("get-activities")) {
    const activities = (await axios.get(`${API_BASE_URL}${url}`)).data;

    if (!activities) {
      return [];
    }

    return activities;

    // return [
    //   {
    //     _id: "act1",
    //     title:
    //       "01_පූර්ව භාෂා කුසලතා - ක්‍රියාකාරකම් පත්‍රිකාව - සමාන රූප යා කරමු",
    //     file: "https://drive.google.com/file/d/1RGWAsSCtLWBUGdmAzKypYmr42-N9YKCh/view",
    //     type: "Matching",
    //   },
    //   {
    //     _id: "act2",
    //     title:
    //       "02_පූර්ව භාෂා කුසලතා - ක්‍රියාකාරකම් පත්‍රිකාව - සමාන රූප තෝරමු",
    //     file: "https://drive.google.com/file/d/1-Mzh3y5OOP9uZK3Y7J3Edc-DqW8qxBk8/view",
    //     type: "Selection",
    //   },
    //   {
    //     _id: "act3",
    //     title: "03_අකුරු හඳුනා ගැනීම - ක්‍රියාකාරකම් පත්‍රිකාව",
    //     file: "https://drive.google.com/file/d/1RGWAsSCtLWBUGdmAzKypYmr42-N9YKCh/view",
    //     type: "Writing",
    //   },
    //   {
    //     _id: "act4",
    //     title: "04_වචන ගොඩනැගීම - ක්‍රියාකාරකම් පත්‍රිකාව",
    //     file: "https://drive.google.com/file/d/1-Mzh3y5OOP9uZK3Y7J3Edc-DqW8qxBk8/view",
    //     type: "Vocabulary",
    //   },
    // ];
  } else if (url.includes("view-all-assignments")) {
    console.log(url);
    const activities = (await axios.get(`${API_BASE_URL}${url}`)).data;
    console.log(activities);
    return activities;
  }

  return [];
};

const postData = async (url: string, data?: any) => {
  console.log(url);

  if (url.includes("add-assignment")) {
    console.log(`Posting data to: ${url}`);

    const response = await axios.post(`${API_BASE_URL}${url}`);

    if (!response) {
      throw new Error(`Failed to add Activity`);
    }
    return { success: true };
  } else if (url.includes("create-event")) {
    const response = await axios.post(`${API_BASE_URL}${url}`, data);
    if (!response) {
      throw new Error(`Failed to add Event`);
    }
    return { success: true };
  }
};

export default function LocalSyllabusSubjectPage() {
  const [lessons, setLessons] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [myActivities, setMyActivities] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("lessons");

  const params = useParams();
  const grade = (params.grade as string)?.split("-")[1] || "1";
  const subject = (params.subject as string) || "sinhala";

  const user = useSelector((state: any) => state.auth.user);

  // Get subject name in Sinhala
  const getSubjectName = () => {
    switch (subject) {
      case "sinhala":
        return "සිංහල";
      case "maths":
        return "ගණිතය";
      case "environment":
        return "පරිසරය";
      case "term-test":
        return "වාර ප්‍රශ්න පත්‍ර";
      default:
        return subject;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        // Get Video Lessons
        const lessonsData = await fetchData(
          `subject-content/get-video-lessons/grade/${grade}/subject/${subject}`
        );
        setLessons(lessonsData);

        // Get Activities
        const activitiesData = await fetchData(
          `subject-content/get-activities/grade/${grade}/subject/${subject}`
        );
        setActivities(activitiesData);

        // Get My Activities
        const myActivitiesData = await fetchData(
          `users/view-all-assignments/${user._id}`
        );
        setMyActivities(myActivitiesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    loadData();
  }, [grade, subject]);

  const handleStartActivity = async (activityId: string) => {
    try {
      const res = await postData(
        `users/add-assignment/${activityId}/${user._id}`
      );
      if (res && res.success) {
        // Update myActivities state to reflect the change immediately
        setMyActivities((prev) => [...prev, { _id: activityId }]);

        // Send an Event to event data
        const eventData = {
          studentId: "67bb4d1e174f04dd6d627e4e",
          type: "Assignment",
          activityId: activityId,
          assignedTime: new Date(),
        };

        await postData(`events/create-event`, eventData);
      }
    } catch (error) {
      console.error("Error starting activity:", error);
    }
  };

  const isActivityStarted = (activityId: string) => {
    return myActivities.some((activity) => activity._id === activityId);
  };

  // Filter lessons based on search term
  const filteredLessons = lessons.filter((lesson) =>
    lesson.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter activities based on search term
  const filteredActivities = activities.filter((activity) =>
    activity.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background/95">
      <Navbar />

      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        {/* <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link
            href="/local-syllabus"
            className="hover:text-primary transition-colors"
          >
            Grade
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-foreground">Subject</span>
        </nav> */}

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                {grade} ශ්‍රේණිය - {getSubjectName()}
              </h1>
              <p className="mt-2 text-muted-foreground">
                Explore lessons, activities, and resources for{" "}
                {getSubjectName()} subject
              </p>
            </div>

            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search content..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary">
              Grade {grade}
            </Badge>
            <Badge variant="outline" className="bg-primary/10 text-primary">
              {getSubjectName()}
            </Badge>
            <Badge variant="outline" className="bg-green-500/10 text-green-600">
              {lessons.length} Lessons
            </Badge>
            <Badge variant="outline" className="bg-blue-500/10 text-blue-600">
              {activities.length} Activities
            </Badge>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            <Tabs
              defaultValue="lessons"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger
                  value="lessons"
                  className="flex items-center gap-2"
                >
                  <Video className="h-4 w-4" />
                  <span>Lessons</span>
                </TabsTrigger>
                <TabsTrigger
                  value="activities"
                  className="flex items-center gap-2"
                >
                  <NotebookPen className="h-4 w-4" />
                  <span>Activities</span>
                </TabsTrigger>
                <TabsTrigger
                  value="resources"
                  className="flex items-center gap-2"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Resources</span>
                </TabsTrigger>
              </TabsList>

              {/* Lessons Tab */}
              <TabsContent value="lessons" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredLessons.length > 0 ? (
                    filteredLessons.map((lesson, index) => (
                      <LessonThumbnail key={index} {...lesson} />
                    ))
                  ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                      <Video className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No lessons found</h3>
                      <p className="text-muted-foreground mt-2">
                        {searchTerm
                          ? "Try a different search term"
                          : "Lessons will appear here once available"}
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Activities Tab */}
              <TabsContent value="activities" className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  {filteredActivities.length > 0 ? (
                    filteredActivities.map((activity, index) => (
                      <Card
                        key={index}
                        className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all"
                      >
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row md:items-center">
                            <div className="bg-primary/10 p-4 flex items-center justify-center md:w-16">
                              <NotebookPen className="h-6 w-6 text-primary" />
                            </div>

                            <div className="p-4 flex-1">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div>
                                  <h3 className="font-medium">
                                    {activity.title.replace(/^\d+_/, "")}
                                  </h3>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Badge
                                      variant="outline"
                                      className="bg-blue-500/10 text-blue-600"
                                    >
                                      {activity.type}
                                    </Badge>
                                    {isActivityStarted(activity._id) && (
                                      <Badge
                                        variant="outline"
                                        className="bg-green-500/10 text-green-600"
                                      >
                                        <CheckCircle2 className="h-3 w-3 mr-1" />
                                        Added
                                      </Badge>
                                    )}
                                  </div>
                                </div>

                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center gap-1"
                                    onClick={() =>
                                      window.open(activity.file_link, "_blank")
                                    }
                                  >
                                    <Download className="h-4 w-4" />
                                    <span className="hidden sm:inline">
                                      Download
                                    </span>
                                  </Button>

                                  <Button
                                    size="sm"
                                    className="flex items-center gap-1"
                                    disabled={isActivityStarted(activity._id)}
                                    onClick={() =>
                                      handleStartActivity(activity._id)
                                    }
                                  >
                                    {isActivityStarted(activity._id) ? (
                                      <>
                                        <CheckCircle2 className="h-4 w-4" />
                                        <span className="hidden sm:inline">
                                          Added
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        <Play className="h-4 w-4" />
                                        <span className="hidden sm:inline">
                                          පටන් ගන්න
                                        </span>
                                      </>
                                    )}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <NotebookPen className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">
                        No activities found
                      </h3>
                      <p className="text-muted-foreground mt-2">
                        {searchTerm
                          ? "Try a different search term"
                          : "Activities will appear here once available"}
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Resources Tab */}
              <TabsContent value="resources" className="space-y-8">
                {/* Syllabus Section */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">විෂය නිර්දේශය</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all">
                      <CardContent className="p-0">
                        <div className="flex items-center">
                          <div className="bg-blue-500/10 p-6 flex items-center justify-center">
                            <BookMarked className="h-6 w-6 text-blue-600" />
                          </div>

                          <div className="p-4 flex-1">
                            <h3 className="font-medium">
                              {grade} ශ්‍රේණිය - {getSubjectName()} විෂය
                              නිර්දේශය
                            </h3>
                            <Badge className="mt-2 bg-blue-500/10 text-blue-600 border-0">
                              Syllabus
                            </Badge>

                            <Button
                              className="mt-4 w-full flex items-center justify-center gap-2"
                              variant="outline"
                            >
                              <Download className="h-4 w-4" />
                              බාගත කරන්න
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all">
                      <CardContent className="p-0">
                        <div className="flex items-center">
                          <div className="bg-green-500/10 p-6 flex items-center justify-center">
                            <BookOpenCheck className="h-6 w-6 text-green-600" />
                          </div>

                          <div className="p-4 flex-1">
                            <h3 className="font-medium">
                              {grade} ශ්‍රේණිය - {getSubjectName()} ගුරු
                              මාර්ගෝපදේශනය
                            </h3>
                            <Badge className="mt-2 bg-green-500/10 text-green-600 border-0">
                              Teachers' Guide
                            </Badge>

                            <Button
                              className="mt-4 w-full flex items-center justify-center gap-2"
                              variant="outline"
                            >
                              <Download className="h-4 w-4" />
                              බාගත කරන්න
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Textbooks Section */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">පාසල් පෙළපොත</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all">
                      <CardContent className="p-0">
                        <div className="flex items-center">
                          <div className="bg-amber-500/10 p-6 flex items-center justify-center">
                            <BookOpen className="h-6 w-6 text-amber-600" />
                          </div>

                          <div className="p-4 flex-1">
                            <h3 className="font-medium">
                              {grade} ශ්‍රේණිය - {getSubjectName()} කියවීම් පොත
                            </h3>
                            <Badge className="mt-2 bg-amber-500/10 text-amber-600 border-0">
                              Textbook
                            </Badge>

                            <Button
                              className="mt-4 w-full flex items-center justify-center gap-2"
                              variant="outline"
                            >
                              <Download className="h-4 w-4" />
                              බාගත කරන්න
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all">
                      <CardContent className="p-0">
                        <div className="flex items-center">
                          <div className="bg-rose-500/10 p-6 flex items-center justify-center">
                            <FileText className="h-6 w-6 text-rose-600" />
                          </div>

                          <div className="p-4 flex-1">
                            <h3 className="font-medium">
                              {grade} ශ්‍රේණිය - {getSubjectName()} වැඩ පොත
                            </h3>
                            <Badge className="mt-2 bg-rose-500/10 text-rose-600 border-0">
                              Workbook
                            </Badge>

                            <Button
                              className="mt-4 w-full flex items-center justify-center gap-2"
                              variant="outline"
                            >
                              <Download className="h-4 w-4" />
                              බාගත කරන්න
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Progress & Recent */}
          <div className="space-y-8">
            {/* Progress Card */}
            <Card className="border-0 shadow-md overflow-hidden">
              <CardHeader className="bg-primary/5 pb-2">
                <CardTitle className="text-lg font-medium">
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Lessons Watched</span>
                    <span className="font-medium">2/{lessons.length}</span>
                  </div>
                  <Progress
                    value={Math.round((2 / Math.max(lessons.length, 1)) * 100)}
                    className="h-2"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Activities Completed</span>
                    <span className="font-medium">
                      {myActivities.length}/{activities.length}
                    </span>
                  </div>
                  <Progress
                    value={Math.round(
                      (myActivities.length / Math.max(activities.length, 1)) *
                        100
                    )}
                    className="h-2"
                  />
                </div>

                <Separator />

                <div className="pt-2">
                  <h4 className="font-medium mb-3">Recent Activity</h4>
                  <div className="space-y-3">
                    {myActivities.length > 0 ? (
                      myActivities.slice(0, 3).map((activity, index) => {
                        const matchedActivity = activities.find(
                          (a) => a._id === activity._id
                        );
                        if (!matchedActivity) return null;

                        return (
                          <div key={index} className="flex items-start gap-3">
                            <div className="bg-green-500/10 p-2 rounded-full">
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium line-clamp-1">
                                {matchedActivity.title.replace(/^\d+_/, "")}
                              </p>
                              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                <Clock className="h-3 w-3" />
                                Added recently
                              </p>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-sm text-muted-foreground">
                          No activities started yet
                        </p>
                        <p className="text-xs mt-1">
                          Start an activity to track your progress
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <Button className="w-full" variant="outline">
                  View All Progress
                </Button>
              </CardContent>
            </Card>

            {/* Featured Lessons */}
            <Card className="border-0 shadow-md overflow-hidden">
              <CardHeader className="bg-primary/5 pb-2">
                <CardTitle className="text-lg font-medium">
                  Featured Lessons
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {lessons.slice(0, 5).map((lesson, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="flex-shrink-0 w-20 h-12 rounded overflow-hidden relative">
                          <img
                            src={`https://img.youtube.com/vi/${
                              lesson.video_link.split("v=")[1]?.split("&")[0]
                            }/default.jpg`}
                            alt={lesson.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <Play className="h-4 w-4 text-white" />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium line-clamp-2">
                            {lesson.title.replace(/^\d+_/, "")}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2 text-xs text-primary mt-1"
                            onClick={() =>
                              window.open(lesson.video_link, "_blank")
                            }
                          >
                            Watch now
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
