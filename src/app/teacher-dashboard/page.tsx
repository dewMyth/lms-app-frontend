import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Users,
  Video,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { io } from "socket.io-client";

export default function DashboardPage() {
  const user = useSelector((state: any) => state.auth.user);
  const socket = useRef<ReturnType<typeof io> | null>(null);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
  }, []);

  useEffect(() => {
    socket?.current?.emit("addUser", user?._id);
    // socket.current.on("onlineUserList", (onlineUsers) => {
    //   setOnlineUsers(onlineUsers.map((ou) => ou.userId));
    // });
  }, [user]);

  return (
    <div className="flex flex-col gap-6">
      {/* <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Sarah Johnson!</p>
      </div> */}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">Grade 3 students</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Assignments
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Need review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Graded Assignments
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">This term</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Events
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="assignments">
        <TabsList>
          <TabsTrigger value="assignments">
            <FileText className="mr-2 h-4 w-4" />
            Recent Assignments
          </TabsTrigger>
          <TabsTrigger value="activities">
            <BookOpen className="mr-2 h-4 w-4" />
            Activities
          </TabsTrigger>
          <TabsTrigger value="videos">
            <Video className="mr-2 h-4 w-4" />
            Video Lessons
          </TabsTrigger>
        </TabsList>
        <TabsContent value="assignments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Assignments</CardTitle>
              <CardDescription>
                Review and grade the latest student submissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Math Problem Set 12",
                    student: "Alex Johnson",
                    date: "2 hours ago",
                    status: "Pending",
                  },
                  {
                    title: "Science Lab Report",
                    student: "Emma Smith",
                    date: "5 hours ago",
                    status: "Pending",
                  },
                  {
                    title: "Reading Comprehension",
                    student: "Noah Williams",
                    date: "Yesterday",
                    status: "Pending",
                  },
                  {
                    title: "History Essay",
                    student: "Olivia Brown",
                    date: "Yesterday",
                    status: "Pending",
                  },
                ].map((assignment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{assignment.title}</p>
                      <p className="text-sm text-muted-foreground">
                        Submitted by {assignment.student} • {assignment.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
                        {assignment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>
                Activities you've created for your students
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Multiplication Tables Quiz",
                    subject: "Mathematics",
                    grade: "Grade 3",
                    date: "Created 3 days ago",
                  },
                  {
                    title: "Plant Life Cycle Worksheet",
                    subject: "Science",
                    grade: "Grade 3",
                    date: "Created 1 week ago",
                  },
                  {
                    title: "Grammar Practice",
                    subject: "English",
                    grade: "Grade 3",
                    date: "Created 2 weeks ago",
                  },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.subject} • {activity.grade} • {activity.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="videos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Video Lessons</CardTitle>
              <CardDescription>
                Video lessons you've uploaded for your students
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Introduction to Fractions",
                    subject: "Mathematics",
                    grade: "Grade 3",
                    date: "Uploaded 1 week ago",
                  },
                  {
                    title: "States of Matter",
                    subject: "Science",
                    grade: "Grade 3",
                    date: "Uploaded 2 weeks ago",
                  },
                  {
                    title: "Reading Strategies",
                    subject: "English",
                    grade: "Grade 3",
                    date: "Uploaded 3 weeks ago",
                  },
                ].map((video, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{video.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {video.subject} • {video.grade} • {video.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
