"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  GraduationCap,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Star,
  User,
  Users,
  Bell,
  BookOpen,
  BarChart3,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  XCircle,
  Play,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/nav-bar";
import { Link } from "react-router";
import { API_BASE_URL, fetchData } from "@/apiService";
import { useSelector } from "react-redux";

// Mock data for children
// const children = [
//   {
//     id: "child1",
//     name: "Amal Perera",
//     grade: "Grade 3",
//     avatar: "/placeholder.svg?height=40&width=40&text=AP",
//     subjects: ["Sinhala", "Mathematics", "Environment"],
//     pendingTasks: [
//       {
//         id: "task1",
//         title: "පූර්ව භාෂා කුසලතා - ක්‍රියාකාරකම් පත්‍රිකාව",
//         subject: "Sinhala",
//         dueDate: "2025-03-20",
//         status: "pending",
//         type: "assignment",
//       },
//       {
//         id: "task2",
//         title: "ගණිත ගැටළු විසඳීම - පිළිතුරු පත්‍රය",
//         subject: "Mathematics",
//         dueDate: "2025-03-18",
//         status: "pending",
//         type: "worksheet",
//       },
//       {
//         id: "task3",
//         title: "පරිසර අධ්‍යයනය - ශාක වර්ග හඳුනා ගැනීම",
//         subject: "Environment",
//         dueDate: "2025-03-22",
//         status: "pending",
//         type: "project",
//       },
//     ],
//     completedTasks: [
//       {
//         id: "task4",
//         title: "අකුරු ලිවීම - පුහුණු පත්‍රිකාව",
//         subject: "Sinhala",
//         completedDate: "2025-03-15",
//         grade: "A",
//         type: "worksheet",
//       },
//       {
//         id: "task5",
//         title: "සංඛ්‍යා හඳුනා ගැනීම - පරීක්ෂණය",
//         subject: "Mathematics",
//         completedDate: "2025-03-14",
//         grade: "B+",
//         type: "quiz",
//       },
//     ],
//     upcomingEvents: [
//       {
//         id: "event1",
//         title: "Term Test - Sinhala",
//         date: "2025-03-25",
//         time: "9:00 AM",
//         type: "exam",
//       },
//       {
//         id: "event2",
//         title: "Science Exhibition",
//         date: "2025-03-28",
//         time: "10:00 AM",
//         type: "event",
//       },
//       {
//         id: "event3",
//         title: "Parent-Teacher Meeting",
//         date: "2025-04-02",
//         time: "3:30 PM",
//         type: "meeting",
//       },
//     ],
//     progress: {
//       sinhala: 75,
//       mathematics: 68,
//       environment: 82,
//     },
//     recentActivity: [
//       {
//         id: "activity1",
//         description: "Completed Sinhala reading assignment",
//         timestamp: "2025-03-15T14:30:00",
//         type: "completion",
//       },
//       {
//         id: "activity2",
//         description: "Watched 3 Mathematics video lessons",
//         timestamp: "2025-03-14T16:45:00",
//         type: "learning",
//       },
//       {
//         id: "activity3",
//         description: "Started Environment project",
//         timestamp: "2025-03-13T10:15:00",
//         type: "start",
//       },
//     ],
//     messages: [
//       {
//         id: "msg1",
//         from: "Ms. Kumari (Sinhala Teacher)",
//         content: "Amal is showing great improvement in reading comprehension.",
//         timestamp: "2025-03-15T09:30:00",
//         read: false,
//       },
//       {
//         id: "msg2",
//         from: "Mr. Bandara (Principal)",
//         content:
//           "Reminder: School will be closed on March 24th for staff development.",
//         timestamp: "2025-03-14T11:20:00",
//         read: true,
//       },
//     ],
//   },
//   {
//     id: "child2",
//     name: "Sithmi Perera",
//     grade: "Grade 1",
//     avatar: "/placeholder.svg?height=40&width=40&text=SP",
//     subjects: ["Sinhala", "Mathematics", "Environment"],
//     pendingTasks: [
//       {
//         id: "task6",
//         title: "අකුරු හඳුනා ගැනීම - පුහුණු පත්‍රිකාව",
//         subject: "Sinhala",
//         dueDate: "2025-03-19",
//         status: "pending",
//         type: "worksheet",
//       },
//       {
//         id: "task7",
//         title: "සංඛ්‍යා ගණනය - ක්‍රියාකාරකම්",
//         subject: "Mathematics",
//         dueDate: "2025-03-21",
//         status: "pending",
//         type: "activity",
//       },
//     ],
//     completedTasks: [
//       {
//         id: "task8",
//         title: "පාට හඳුනා ගැනීම - ක්‍රියාකාරකම්",
//         subject: "Environment",
//         completedDate: "2025-03-16",
//         grade: "A",
//         type: "activity",
//       },
//     ],
//     upcomingEvents: [
//       {
//         id: "event4",
//         title: "Class Photo Day",
//         date: "2025-03-26",
//         time: "10:30 AM",
//         type: "event",
//       },
//       {
//         id: "event5",
//         title: "Reading Assessment",
//         date: "2025-03-29",
//         time: "9:00 AM",
//         type: "assessment",
//       },
//     ],
//     progress: {
//       sinhala: 65,
//       mathematics: 70,
//       environment: 80,
//     },
//     recentActivity: [
//       {
//         id: "activity4",
//         description: "Completed color identification activity",
//         timestamp: "2025-03-16T13:20:00",
//         type: "completion",
//       },
//       {
//         id: "activity5",
//         description: "Practiced writing letters",
//         timestamp: "2025-03-15T11:30:00",
//         type: "learning",
//       },
//     ],
//     messages: [
//       {
//         id: "msg3",
//         from: "Ms. Dilhani (Class Teacher)",
//         content: "Sithmi is adapting well to the classroom environment.",
//         timestamp: "2025-03-16T14:45:00",
//         read: false,
//       },
//     ],
//   },
// ];

// const parent = {
//   name: "Chaminda Perera",
//   email: "chaminda.perera@example.com",
//   phone: "+94 71 234 5678",
//   avatar: "/placeholder.svg?height=40&width=40&text=CP",
// };

export default function ParentDashboard() {
  // Parent information
  const parent = useSelector((state: any) => state.auth.user);

  // useEffect(() => {
  //   getAll
  // }, [parent]);

  interface Message {
    id: string;
    from: string;
    content: string;
    timestamp: string;
    read: boolean;
  }

  interface Child {
    id: string;
    name: string;
    grade: string;
    avatar: string;
    subjects: string[];
    pendingTasks: any[];
    completedTasks: any[];
    upcomingEvents: any[];
    progress: Record<string, number>;
    recentActivity: any[];
    messages: Message[];
  }

  const [children, setChildren] = useState<Child[]>([]); // Store API data
  const [selectedChild, setSelectedChild] = useState<string | undefined>(
    undefined
  ); // Selected child ID

  useEffect(() => {
    // Fetch children data from the API
    const fetchChildren = async () => {
      try {
        const response = await fetchData(
          `${API_BASE_URL}users/all-students-stats-by-parent/${parent._id}`
        ); // Replace with your API URL
        const data = await response;
        console.log(data);
        setChildren(data);
        console.log("all children", children);

        // Set default selectedChild only if data exists
        if (data?.length > 0) {
          setSelectedChild(data[0].id);
        }
        console.log("setSelectedChild", selectedChild);
      } catch (error) {
        console.error("Error fetching children:", error);
      }
    };

    fetchChildren();
  }, []);

  const [activeTab, setActiveTab] = useState("overview");

  // Get the currently selected child's data
  const currentChild =
    children.find((child) => child.id === selectedChild) || children[0];

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Calculate days remaining until due date
  const getDaysRemaining = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Get status badge for tasks
  const getStatusBadge = (dueDate: string) => {
    const daysRemaining = getDaysRemaining(dueDate);

    if (daysRemaining < 0) {
      return <Badge variant="destructive">Overdue</Badge>;
    } else if (daysRemaining <= 2) {
      return <Badge variant="destructive">Urgent</Badge>;
    } else if (daysRemaining <= 5) {
      return (
        <Badge
          variant="outline"
          className="bg-amber-500/10 text-amber-600 border-0"
        >
          Soon
        </Badge>
      );
    } else {
      return (
        <Badge
          variant="outline"
          className="bg-green-500/10 text-green-600 border-0"
        >
          Upcoming
        </Badge>
      );
    }
  };

  // Get icon for task type
  const getTaskTypeIcon = (type: string) => {
    switch (type) {
      case "assignment":
        return <FileText className="h-4 w-4" />;
      case "worksheet":
        return <BookOpen className="h-4 w-4" />;
      case "quiz":
        return <Star className="h-4 w-4" />;
      case "project":
        return <GraduationCap className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  // Get icon for event type
  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "exam":
        return <FileText className="h-4 w-4" />;
      case "event":
        return <Users className="h-4 w-4" />;
      case "meeting":
        return <MessageSquare className="h-4 w-4" />;
      case "assessment":
        return <BarChart3 className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  // Get status icon for task
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "overdue":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background/95">
      <Navbar />

      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border-2 border-primary/20">
                {parent && (
                  <AvatarImage src={parent.avatar} alt={parent.name} />
                )}
                <AvatarFallback>
                  {parent?.username
                    .split(" ")
                    .map((n: any) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  Welcome, {parent.username}
                </h1>
                <p className="text-muted-foreground">Parent Dashboard</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Messages</span>
                {currentChild?.messages?.filter((m: any) => !m.read).length >
                  0 && (
                  <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                    {currentChild?.messages?.filter((m: any) => !m.read).length}
                  </Badge>
                )}
              </Button>

              <Button variant="outline" size="sm" className="gap-1">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Child Selector */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Child Profile</h2>
            </div>

            <Select value={selectedChild} onValueChange={setSelectedChild}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Select child" />
              </SelectTrigger>
              <SelectContent>
                {children.map((child) => (
                  <SelectItem key={child.id} value={child.id}>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={child.avatar} alt={child.name} />
                        <AvatarFallback>
                          {child.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span>{child.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Child Info Card */}
        <Card className="mb-8 border-0 shadow-md overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              <div className="bg-primary/10 p-6 flex flex-col items-center justify-center md:w-64">
                <Avatar className="h-20 w-20 mb-4">
                  <AvatarImage
                    src={currentChild?.avatar}
                    alt={currentChild?.name}
                  />
                  <AvatarFallback>
                    {currentChild?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold text-center">
                  {currentChild?.name}
                </h3>
                <p className="text-muted-foreground">{currentChild?.grade}</p>
              </div>

              <div className="p-6 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">
                      Subjects
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentChild?.subjects.map((subject) => (
                        <Badge
                          key={subject}
                          variant="outline"
                          className="bg-primary/10"
                        >
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">
                      Pending Tasks
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">
                        {currentChild?.pendingTasks.length}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        assignments
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">
                      Upcoming Events
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">
                        {currentChild?.upcomingEvents.length}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        events
                      </span>
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">
                    Subject Progress
                  </h4>
                  <div className="space-y-3">
                    {/* {Object?.entries(currentChild?.progress).map(
                      ([subject, progress]) => (
                        <div key={subject} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="capitalize">{subject}</span>
                            <span>{progress}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                      )
                    )} */}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Tasks</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Events</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Messages</span>
              {currentChild?.messages.filter((m) => !m.read).length > 0 && (
                <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                  {currentChild?.messages.filter((m) => !m.read).length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pending Tasks Section */}
              <Card className="border-0 shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-medium flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Pending Tasks
                    </CardTitle>
                    <Button variant="ghost" size="sm" className="gap-1" asChild>
                      <Link to="#tasks" onClick={() => setActiveTab("tasks")}>
                        <span>View All</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <CardDescription>
                    Tasks that need to be completed
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  {currentChild?.pendingTasks.length > 0 ? (
                    <div className="space-y-4">
                      {currentChild?.pendingTasks.slice(0, 3).map((task) => (
                        <div
                          key={task.id}
                          className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                        >
                          <div className="mt-0.5">
                            {getStatusIcon(task.status)}
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                              <div>
                                <h4 className="font-medium">{task.title}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge
                                    variant="outline"
                                    className="bg-primary/10 border-0"
                                  >
                                    {task.subject}
                                  </Badge>
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    {getTaskTypeIcon(task.type)}
                                    <span className="capitalize">
                                      {task.type}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col items-end">
                                {getStatusBadge(task.dueDate)}
                                <span className="text-xs text-muted-foreground mt-1">
                                  Due: {formatDate(task.dueDate)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                      <CheckCircle2 className="h-12 w-12 text-green-500 mb-2" />
                      <h3 className="text-lg font-medium">All caught up!</h3>
                      <p className="text-muted-foreground mt-1">
                        No pending tasks at the moment
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Upcoming Events Section */}
              <Card className="border-0 shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-medium flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      Upcoming Events
                    </CardTitle>
                    <Button variant="ghost" size="sm" className="gap-1" asChild>
                      <Link to="#events" onClick={() => setActiveTab("events")}>
                        <span>View All</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <CardDescription>
                    Scheduled activities and important dates
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  {currentChild?.upcomingEvents.length > 0 ? (
                    <div className="space-y-4">
                      {currentChild?.upcomingEvents.map((event) => (
                        <div
                          key={event.id}
                          className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                        >
                          <div className="bg-primary/10 p-2 rounded-md">
                            {getEventTypeIcon(event.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                              <div>
                                <h4 className="font-medium">{event.title}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge
                                    variant="outline"
                                    className="capitalize bg-primary/10 border-0"
                                  >
                                    {event.type}
                                  </Badge>
                                </div>
                              </div>
                              <div className="flex flex-col items-end">
                                <span className="text-sm font-medium">
                                  {formatDate(event.date)}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {event.time}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                      <Calendar className="h-12 w-12 text-muted-foreground mb-2" />
                      <h3 className="text-lg font-medium">
                        No upcoming events
                      </h3>
                      <p className="text-muted-foreground mt-1">
                        Check back later for scheduled events
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recent Activity Section */}
              <Card className="border-0 shadow-md md:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>
                    Your child's recent learning activities
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="relative">
                    <div className="absolute top-0 bottom-0 left-4 border-l border-dashed border-muted-foreground/30" />
                    <div className="space-y-6">
                      {currentChild?.recentActivity.map((activity, index) => (
                        <div key={activity.id} className="relative flex gap-4">
                          <div className="absolute -left-2 top-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center z-10">
                            {activity.type === "completion" ? (
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            ) : activity.type === "learning" ? (
                              <BookOpen className="h-4 w-4 text-blue-500" />
                            ) : (
                              <Play className="h-4 w-4 text-amber-500" />
                            )}
                          </div>
                          <div className="flex-1 ml-10">
                            <p className="font-medium">
                              {activity.description}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {new Date(activity.timestamp).toLocaleString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  hour: "numeric",
                                  minute: "numeric",
                                  hour12: true,
                                }
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  All Tasks
                </CardTitle>
                <CardDescription>
                  View and track all assignments and homework
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="pending">
                  <TabsList className="mb-4">
                    <TabsTrigger
                      value="pending"
                      className="flex items-center gap-2"
                    >
                      <Clock className="h-4 w-4" />
                      Pending ({currentChild?.pendingTasks.length})
                    </TabsTrigger>
                    <TabsTrigger
                      value="completed"
                      className="flex items-center gap-2"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Completed ({currentChild?.completedTasks.length})
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="pending">
                    {currentChild?.pendingTasks.length > 0 ? (
                      <div className="space-y-4">
                        {currentChild?.pendingTasks.map((task) => (
                          <div
                            key={task.id}
                            className="flex items-start gap-3 p-4 rounded-lg border"
                          >
                            <div className="mt-0.5">
                              {getStatusIcon(task.status)}
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <div>
                                  <h4 className="font-medium">{task.title}</h4>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge
                                      variant="outline"
                                      className="bg-primary/10 border-0"
                                    >
                                      {task.subject}
                                    </Badge>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                      {getTaskTypeIcon(task.type)}
                                      <span className="capitalize">
                                        {task.type}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col items-end">
                                  {getStatusBadge(task.dueDate)}
                                  <span className="text-xs text-muted-foreground mt-1">
                                    Due: {formatDate(task.dueDate)}
                                  </span>
                                </div>
                              </div>

                              <div className="mt-3 flex flex-wrap gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="gap-1"
                                >
                                  <FileText className="h-4 w-4" />
                                  View Details
                                </Button>
                                <Button size="sm" className="gap-1">
                                  <CheckCircle2 className="h-4 w-4" />
                                  Mark as Complete
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <CheckCircle2 className="h-12 w-12 text-green-500 mb-2" />
                        <h3 className="text-lg font-medium">All caught up!</h3>
                        <p className="text-muted-foreground mt-1">
                          No pending tasks at the moment
                        </p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="completed">
                    {currentChild?.completedTasks.length > 0 ? (
                      <div className="space-y-4">
                        {currentChild?.completedTasks.map((task) => (
                          <div
                            key={task.id}
                            className="flex items-start gap-3 p-4 rounded-lg border bg-muted/30"
                          >
                            <div className="mt-0.5">
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <div>
                                  <h4 className="font-medium">{task.title}</h4>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge
                                      variant="outline"
                                      className="bg-primary/10 border-0"
                                    >
                                      {task.subject}
                                    </Badge>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                      {getTaskTypeIcon(task.type)}
                                      <span className="capitalize">
                                        {task.type}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col items-end">
                                  <Badge
                                    variant="outline"
                                    className="bg-green-500/10 text-green-600 border-0"
                                  >
                                    Grade: {task.grade}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground mt-1">
                                    Completed: {formatDate(task.completedDate)}
                                  </span>
                                </div>
                              </div>

                              <div className="mt-3">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="gap-1"
                                >
                                  <FileText className="h-4 w-4" />
                                  View Submission
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <FileText className="h-12 w-12 text-muted-foreground mb-2" />
                        <h3 className="text-lg font-medium">
                          No completed tasks
                        </h3>
                        <p className="text-muted-foreground mt-1">
                          Completed tasks will appear here
                        </p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Calendar & Events
                </CardTitle>
                <CardDescription>
                  View upcoming school events, exams, and activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Month grouping */}
                  {Array.from(
                    new Set(
                      currentChild?.upcomingEvents.map((event) =>
                        new Date(event.date).toLocaleString("en-US", {
                          month: "long",
                          year: "numeric",
                        })
                      )
                    )
                  ).map((month) => (
                    <div key={month}>
                      <h3 className="text-lg font-medium mb-4">{month}</h3>
                      <div className="space-y-4">
                        {currentChild?.upcomingEvents
                          .filter(
                            (event) =>
                              new Date(event.date).toLocaleString("en-US", {
                                month: "long",
                                year: "numeric",
                              }) === month
                          )
                          .sort(
                            (a, b) =>
                              new Date(a.date).getTime() -
                              new Date(b.date).getTime()
                          )
                          .map((event) => (
                            <div
                              key={event.id}
                              className="flex items-start gap-4 p-4 rounded-lg border"
                            >
                              <div className="flex flex-col items-center justify-center bg-primary/10 p-3 rounded-md min-w-16 text-center">
                                <span className="text-sm font-medium">
                                  {new Date(event.date).toLocaleString(
                                    "en-US",
                                    { month: "short" }
                                  )}
                                </span>
                                <span className="text-2xl font-bold">
                                  {new Date(event.date).getDate()}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(event.date).toLocaleString(
                                    "en-US",
                                    { weekday: "short" }
                                  )}
                                </span>
                              </div>

                              <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                  <div>
                                    <h4 className="font-medium">
                                      {event.title}
                                    </h4>
                                    <div className="flex items-center gap-2 mt-1">
                                      <Badge
                                        variant="outline"
                                        className="capitalize bg-primary/10 border-0"
                                      >
                                        {event.type}
                                      </Badge>
                                      <span className="text-sm text-muted-foreground">
                                        {event.time}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="gap-1"
                                    >
                                      <Bell className="h-4 w-4" />
                                      Remind Me
                                    </Button>
                                    <Button size="sm" className="gap-1">
                                      <Calendar className="h-4 w-4" />
                                      Add to Calendar
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}

                  {currentChild?.upcomingEvents.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Calendar className="h-12 w-12 text-muted-foreground mb-2" />
                      <h3 className="text-lg font-medium">
                        No upcoming events
                      </h3>
                      <p className="text-muted-foreground mt-1">
                        Check back later for scheduled events
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Messages & Notifications
                </CardTitle>
                <CardDescription>
                  Communications from teachers and school administration
                </CardDescription>
              </CardHeader>
              <CardContent>
                {currentChild?.messages.length > 0 ? (
                  <div className="space-y-4">
                    {currentChild?.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex items-start gap-3 p-4 rounded-lg border ${
                          !message.read ? "bg-primary/5 border-primary/20" : ""
                        }`}
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            {message.from.split(" ")[0][0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                            <h4 className="font-medium">{message.from}</h4>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">
                                {new Date(message.timestamp).toLocaleString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                    hour12: true,
                                  }
                                )}
                              </span>
                              {!message.read && (
                                <Badge
                                  variant="default"
                                  className="h-2 w-2 p-0 rounded-full"
                                />
                              )}
                            </div>
                          </div>
                          <p className="mt-2">{message.content}</p>

                          <div className="mt-3 flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-1"
                            >
                              <MessageSquare className="h-4 w-4" />
                              Reply
                            </Button>
                            {!message.read && (
                              <Button
                                size="sm"
                                variant="ghost"
                                className="gap-1"
                              >
                                <CheckCircle2 className="h-4 w-4" />
                                Mark as Read
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mb-2" />
                    <h3 className="text-lg font-medium">No messages</h3>
                    <p className="text-muted-foreground mt-1">
                      You have no messages at the moment
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button className="w-full gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Contact Teacher
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
