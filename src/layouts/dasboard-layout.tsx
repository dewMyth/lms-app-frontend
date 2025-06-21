"use client";

import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router";
import {
  BookOpen,
  Calendar,
  ChevronDown,
  FileText,
  Home,
  LogOut,
  MessageSquare,
  Settings,
  User,
  Users,
  Video,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "../components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import Navbar from "@/components/nav-bar";

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [teacherName] = useState("Sarah Johnson");
  const [teacherRole] = useState("Grade 3 Teacher");
  const [unreadMessages] = useState(3); // This would be fetched from your API/socket in a real app

  return (
    <>
      <Navbar />
      <div className="flex h-screen bg-background w-full">
        <SidebarProvider>
          <div className="flex h-screen bg-background">
            <Sidebar>
              <SidebarHeader>
                <div className="flex items-center gap-2 px-2 py-3">
                  <BookOpen className="h-6 w-6 text-primary" />
                  <div className="font-bold text-xl">Little Genius Hub</div>
                </div>
              </SidebarHeader>
              <SidebarContent>
                {/* <SidebarGroup>
                  <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          isActive={location.pathname === "/dashboard"}
                        >
                          <Link to="/dashboard">
                            <Home className="h-4 w-4" />
                            <span>Overview</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup> */}

                {/* <SidebarGroup>
                  <SidebarGroupLabel>Teacher Management</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          isActive={location.pathname === "/dashboard/teachers"}
                        >
                          <Link to="/dashboard/teachers">
                            <Users className="h-4 w-4" />
                            <span>Teachers</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup> */}

                <SidebarGroup>
                  <SidebarGroupLabel>Academic</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          isActive={location.pathname === "/dashboard"}
                        >
                          <Link to="/dashboard/assignments">
                            <FileText className="h-4 w-4" />
                            <span>Assignments</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          isActive={
                            location.pathname === "/dashboard/activities"
                          }
                        >
                          <Link to="/dashboard/activities">
                            <BookOpen className="h-4 w-4" />
                            <span>Activities</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          isActive={location.pathname === "/dashboard/videos"}
                        >
                          <Link to="/dashboard/videos">
                            <Video className="h-4 w-4" />
                            <span>Video Lessons</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          isActive={location.pathname === "/dashboard/events"}
                        >
                          <Link to="/dashboard/events">
                            <Calendar className="h-4 w-4" />
                            <span>Events</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>

                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          isActive={location.pathname === "/dashboard/chat"}
                        >
                          <Link to="/dashboard/chat" className="relative">
                            <MessageSquare className="h-4 w-4" />
                            <span>Chat</span>
                            {unreadMessages > 0 && (
                              <Badge
                                variant="destructive"
                                className="ml-auto h-5 w-5 rounded-full p-0 text-center text-xs"
                              >
                                {unreadMessages}
                              </Badge>
                            )}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                  <SidebarGroupLabel>Settings</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          isActive={location.pathname === "/dashboard/settings"}
                        >
                          <Link to="/dashboard/settings">
                            <Settings className="h-4 w-4" />
                            <span>Settings</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
              <SidebarFooter>
                <div className="px-3 py-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-start px-2"
                      >
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" />
                            <AvatarFallback>SJ</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col items-start text-sm">
                            <span className="font-medium">{teacherName}</span>
                            <span className="text-xs text-muted-foreground">
                              {teacherRole}
                            </span>
                          </div>
                          <ChevronDown className="ml-auto h-4 w-4" />
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem asChild>
                        <Link
                          to="/dashboard/profile"
                          className="flex items-center"
                        >
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          to="/login"
                          className="flex items-center text-destructive"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Logout</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </SidebarFooter>
            </Sidebar>
          </div>
          <div className="flex-1 overflow-auto">
            <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
              <SidebarTrigger />
              <div className="ml-auto flex items-center gap-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
              </div>
            </header>
            <main className="flex-1 p-6">
              <Outlet />
            </main>
          </div>
        </SidebarProvider>
      </div>
    </>
  );
}
