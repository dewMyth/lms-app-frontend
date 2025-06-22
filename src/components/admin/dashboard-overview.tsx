"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Users,
  GraduationCap,
  FileText,
  Play,
  TrendingUp,
  Calendar,
  Bell,
  Settings,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { fetchData } from "@/apiService";
import TimeAgo from "timeago-react";
import { ActivityIcon } from "../activity-icon";

// Mock data for dashboard stats
const dashboardStats = {
  totalStudents: 1247,
  totalTeachers: 89,
  totalAssignments: 342,
  totalVideoLessons: 156,
  activeUsers: 892,
  completionRate: 78,
};

// Recent activities mock data
const recentActivities = [
  {
    id: 1,
    type: "student",
    message: "New student John Doe enrolled",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "assignment",
    message: "Math Assignment #5 submitted by 23 students",
    time: "4 hours ago",
  },
  {
    id: 3,
    type: "teacher",
    message: "Sarah Wilson uploaded new video lesson",
    time: "6 hours ago",
  },
  {
    id: 4,
    type: "system",
    message: "Weekly backup completed successfully",
    time: "1 day ago",
  },
];

interface DashboardOverviewProps {
  onNavigate: (section: string) => void;
}

interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalAssignments: number;
  totalVideoLessons: number;
  activeUsers: number;
  completionRate: number;
}

interface RecentActivity {
  id: number;
  type: string;
  message: string;
  time: string;
}

const defaultDashboardStats: DashboardStats = {
  totalStudents: 0,
  totalTeachers: 0,
  totalAssignments: 0,
  totalVideoLessons: 0,
  activeUsers: 0,
  completionRate: 0,
};

const defaultRecentActivities: RecentActivity[] = [];

export default function DashboardOverview({
  onNavigate,
}: DashboardOverviewProps) {
  // State for dashboard stats
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>(
    defaultDashboardStats
  );
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>(
    defaultRecentActivities
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardStats = async () => {
    console.log("fetching dashboard stats");
    try {
      setIsLoading(true);
      setError(null);

      // Replace this with your actual API endpoint
      const response = await fetchData("stats/get-stats");

      if (!response) {
        throw new Error("Failed to fetch dashboard stats");
      }

      setDashboardStats(response);
    } catch (err) {
      console.log(err);
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching dashboard stats:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRecentActivities = async () => {
    try {
      const response = await fetchData("stats/get-recent-logs");
      setRecentActivities(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
    fetchRecentActivities();
  }, []);

  // Helper function to format time for tooltip
  const formatTimeForTooltip = (timeString: string) => {
    try {
      // If it's already a valid date string, return it as ISO string
      const date = new Date(timeString);
      if (!isNaN(date.getTime())) {
        return "";
        // return date?.toLocaleDateString("en-US", {
        //   year: "numeric",
        //   month: "long",
        //   day: "numeric",
        //   hour: "2-digit",
        //   minute: "2-digit",
        // });
      }
      // If it's a relative time string like "2 hours ago", return the original
      return timeString;
    } catch (error) {
      return timeString;
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's what's happening with your Little Genius.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" disabled>
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" disabled>
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Loading skeleton for stats cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, index) => (
            <Card key={index} className="animate-pulse">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                <div className="h-4 w-4 bg-gray-200 rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 w-16 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 w-32 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Loading skeleton for additional stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, index) => (
            <Card key={index} className="animate-pulse">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                <div className="h-4 w-4 bg-gray-200 rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 w-16 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 w-40 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's what's happening with your Little Genius.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" disabled>
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" disabled>
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Error Alert */}
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>Failed to load dashboard data: {error}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchDashboardStats}
              className="ml-4"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>

        {/* Fallback content with disabled cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="opacity-50 cursor-not-allowed">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Students
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--</div>
              <p className="text-xs text-muted-foreground">Data unavailable</p>
            </CardContent>
          </Card>

          <Card className="opacity-50 cursor-not-allowed">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Teachers
              </CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--</div>
              <p className="text-xs text-muted-foreground">Data unavailable</p>
            </CardContent>
          </Card>

          <Card className="opacity-50 cursor-not-allowed">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Assignments
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--</div>
              <p className="text-xs text-muted-foreground">Data unavailable</p>
            </CardContent>
          </Card>

          <Card className="opacity-50 cursor-not-allowed">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Video Lessons
              </CardTitle>
              <Play className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--</div>
              <p className="text-xs text-muted-foreground">Data unavailable</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your Little Genius.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onNavigate("students")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardStats.totalStudents.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onNavigate("teachers")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Teachers
            </CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardStats.totalTeachers}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+3</span> new this month
            </p>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onNavigate("assignments")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Assignments
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardStats.totalAssignments}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-blue-600">+18</span> added this week
            </p>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onNavigate("videos")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Video Lessons</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardStats.totalVideoLessons}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+7</span> uploaded this week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Users Today
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardStats.activeUsers}
            </div>
            <p className="text-xs text-muted-foreground">
              {dashboardStats.totalStudents > 0
                ? Math.round(
                    (dashboardStats.activeUsers /
                      dashboardStats.totalStudents) *
                      100
                  )
                : 0}
              % of total students
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completion Rate
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardStats.completionRate}%
            </div>
            <p className="text-xs text-muted-foreground">
              Average assignment completion
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              className="w-full"
              size="sm"
              onClick={() => onNavigate("students")}
            >
              Add New Student
            </Button>
            <Button
              className="w-full"
              variant="outline"
              size="sm"
              onClick={() => onNavigate("teachers")}
            >
              Add New Teacher
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>Latest updates from your LMS</CardDescription>
        </CardHeader>
        <CardContent>
          <TooltipProvider>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <ActivityIcon type={activity.type} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.message}
                    </p>
                    <p className="text-sm text-gray-500">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span>
                            <TimeAgo datetime={activity.time} locale="en-US" />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{formatTimeForTooltip(activity.time)}</p>
                        </TooltipContent>
                      </Tooltip>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TooltipProvider>
        </CardContent>
      </Card>
    </div>
  );
}
