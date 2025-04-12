"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, ImageIcon } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { fetchData, postData } from "@/apiService";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import Navbar from "@/components/nav-bar";

// Sample data structure based on the provided MongoDB schema
interface TeacherResponse {
  teacherId: string;
  teacherName: string;
  content: string;
  timestamp: Date;
}

interface ChatThread {
  id: string;
  studentId: string;
  studentName: string;
  studentGrade: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  teacherResponses: TeacherResponse[];
}

// Sample data
// const SAMPLE_CHAT_THREADS: ChatThread[] = [
//   {
//     _id: "67f9f5a46dd83450e98b9ed9",
//     studentId: "67bb4d1e174f04dd6d627e4e",
//     studentName: "Jimmy",
//     studentGrade: "Grade 1",
//     content:
//       "Hello Ms. Johnson, I'm having trouble with the math homework. Can you help me understand problem #5?",
//     timestamp: new Date("2025-04-12T05:09:56.716Z"),
//     isRead: false,
//     teacherResponses: [
//       {
//         teacherId: "67df7c3eb64eaab287809bcc",
//         teacherName: "Veronica",
//         content:
//           "Hi Jimmy! I'd be happy to help. Problem #5 is about addition with carrying. Can you tell me which part is confusing?",
//         timestamp: new Date("2025-04-12T06:21:36.660Z"),
//       },
//       {
//         teacherId: "67df7c3eb64eaab287809bcc",
//         teacherName: "Veronica",
//         content:
//           "Let me know if you'd like to schedule a quick video call to go through it together!",
//         timestamp: new Date("2025-04-12T06:21:58.356Z"),
//       },
//     ],
//   },
//   {
//     _id: "67f9f5a46dd83450e98b9ed8",
//     studentId: "67bb4d1e174f04dd6d627e4e",
//     studentName: "Jimmy",
//     studentGrade: "Grade 1",
//     content: "When is our science project due? I forgot to write it down.",
//     timestamp: new Date("2025-04-10T14:30:00.000Z"),
//     isRead: true,
//     teacherResponses: [
//       {
//         teacherId: "67df7c3eb64eaab287809bcc",
//         teacherName: "Veronica",
//         content:
//           "The science project is due next Friday, April 19th. You still have plenty of time!",
//         timestamp: new Date("2025-04-10T15:45:00.000Z"),
//       },
//     ],
//   },
//   {
//     _id: "67f9f5a46dd83450e98b9ed7",
//     studentId: "67bb4d1e174f04dd6d627e4e",
//     studentName: "Jimmy",
//     studentGrade: "Grade 1",
//     content: "Can I bring my pet turtle for show and tell next week?",
//     timestamp: new Date("2025-04-08T09:15:00.000Z"),
//     isRead: true,
//     teacherResponses: [
//       {
//         teacherId: "67df7c3eb64eaab287809bcc",
//         teacherName: "Veronica",
//         content:
//           "That sounds wonderful, Jimmy! Just make sure your turtle is comfortable in a secure container.",
//         timestamp: new Date("2025-04-08T10:20:00.000Z"),
//       },
//       {
//         teacherId: "67df7c3eb64eaab287809bcc",
//         teacherName: "Veronica",
//         content:
//           "Also, please have your parents fill out the pet permission form I'll send home today.",
//         timestamp: new Date("2025-04-08T10:22:00.000Z"),
//       },
//       {
//         teacherId: "67df7c3eb64eaab287809bcc",
//         teacherName: "Veronica",
//         content: "I'm looking forward to meeting your turtle!",
//         timestamp: new Date("2025-04-08T10:25:00.000Z"),
//       },
//     ],
//   },
// ];

// Sample teachers data
const TEACHERS = [
  {
    id: "67df7c3eb64eaab287809bcc",
    name: "Ms. Veronica",
    subject: "Math",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "67df7c3eb64eaab287809bcd",
    name: "Mr. Thompson",
    subject: "Science",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "67df7c3eb64eaab287809bce",
    name: "Mrs. Davis",
    subject: "English",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

export default function StudentChatPage() {
  let { userId } = useParams();
  const user = useSelector((state: any) => state.auth.user);

  const [activeThread, setActiveThread] = useState<ChatThread | null>(null);
  const [message, setMessage] = useState("");
  const [chatThreads, setChatThreads] = useState<ChatThread[]>([]);
  const [teachers, setTeachers] = useState<
    { id: string; name: string; subject: string; avatar: string }[]
  >([]);
  const [selectedTeacher, setSelectedTeacher] = useState(TEACHERS[0]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages when active thread changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeThread]);

  useEffect(() => {
    const fetchChatThreads = async () => {
      try {
        const data = await fetchData(`chat/get-all-chat-by-user/${userId}`);
        setChatThreads(data);
      } catch (error) {
        console.error("Error fetching chats", error);
      }
    };

    fetchChatThreads();
  }, []);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const data = await fetchData(
          `users/get-teachers-by-grade/${user.grade}`
        );
        setTeachers(data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

  const handleSendMessage = async () => {
    if (message.trim()) {
      // Create a new chat thread
      //   const newThread: ChatThread = {
      //     studentId: "67bb4d1e174f04dd6d627e4e", // This would come from auth in a real app
      //     studentName: "Jimmy",
      //     studentGrade: "Grade 1",
      //     content: message,
      //     timestamp: new Date(),
      //     isRead: false,
      //     teacherResponses: [],
      //   };

      const newThread = {
        studentId: userId, // This would come from auth in a real app
        studentName: user.username,
        studentGrade: `Grade ${user.grade}`,
        content: message,
        timestamp: new Date(),
        isRead: false,
        teacherResponses: [],
      };

      const response = await postData("chat/create-msg", newThread);
      console.log("cm r", response);

      //   console.log(newThread);

      //   // Add the new thread to the list and set it as active
      setChatThreads([response, ...chatThreads]);
      setActiveThread(response);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const messageDate = new Date(date);

    // If the message is from today, show the time
    if (messageDate.toDateString() === now.toDateString()) {
      return messageDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    // If the message is from this week, show the day name
    const diffDays = Math.floor(
      (now.getTime() - messageDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (diffDays < 7) {
      return (
        messageDate.toLocaleDateString([], { weekday: "long" }) +
        " " +
        messageDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }

    // Otherwise show the full date
    return (
      messageDate.toLocaleDateString() +
      " " +
      messageDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  return (
    <>
      <Navbar />
      <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-background">
        {/* Chat threads sidebar */}
        <div className="w-80 border-r bg-muted/20">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold text-primary">My Messages</h2>
            <p className="text-sm text-muted-foreground">
              Ask your teachers questions
            </p>
          </div>

          <div className="p-4 border-b">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">
                Select Teacher to Message:
              </h3>
              <div className="flex flex-wrap gap-2">
                {teachers?.map((teacher) => (
                  <Button
                    key={teacher.id}
                    variant={
                      selectedTeacher.id === teacher.id ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedTeacher(teacher)}
                    className="flex items-center gap-2"
                  >
                    <Avatar className="h-6 w-6">
                      <img
                        src={teacher.avatar || "/placeholder.svg"}
                        alt={teacher.name}
                      />
                    </Avatar>
                    <span>{teacher.name}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-16rem)]">
            <div className="p-2 space-y-2">
              {chatThreads.map((thread) => (
                <div
                  key={thread.id}
                  className={`p-3 rounded-lg cursor-pointer hover:bg-muted transition-colors ${
                    activeThread?.id === thread.id ? "bg-muted" : ""
                  }`}
                  onClick={() => setActiveThread(thread)}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div className="font-medium flex items-center gap-2">
                      <span>
                        To:{" "}
                        {thread.teacherResponses[0]?.teacherName ||
                          selectedTeacher.name}
                      </span>
                      {!thread.isRead && thread.teacherResponses.length > 0 && (
                        <Badge variant="destructive" className="rounded-full">
                          New
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(thread.timestamp).split(" ")[0]}
                    </span>
                  </div>
                  <p className="text-sm line-clamp-2">{thread.content}</p>
                  {thread.teacherResponses.length > 0 && (
                    <div className="mt-1 text-xs text-muted-foreground flex items-center">
                      <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded-full text-xs">
                        {thread.teacherResponses.length}{" "}
                        {thread.teacherResponses.length === 1
                          ? "reply"
                          : "replies"}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat main area */}
        <div className="flex-1 flex flex-col">
          {activeThread ? (
            <>
              {/* Chat header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <img
                      src={
                        teachers?.find(
                          (teacher) =>
                            teacher.id ===
                            activeThread.teacherResponses[0]?.teacherId
                        )?.avatar || "/placeholder.svg"
                      }
                      alt={
                        activeThread.teacherResponses[0]?.teacherName ||
                        selectedTeacher.name
                      }
                    />
                  </Avatar>
                  <div>
                    <h3 className="font-bold">
                      {activeThread.teacherResponses[0]?.teacherName ||
                        selectedTeacher.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {teachers?.find(
                        (t) =>
                          t.name ===
                          (activeThread.teacherResponses[0]?.teacherName ||
                            selectedTeacher.name)
                      )?.subject || "Teacher"}
                    </p>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatDate(activeThread.timestamp)}
                </div>
              </div>

              {/* Messages area */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4 max-w-3xl mx-auto">
                  {/* Student's initial message */}
                  <div className="flex justify-end">
                    <Card className="bg-primary text-primary-foreground p-3 max-w-[80%]">
                      <p className="text-sm">{activeThread.content}</p>
                      <p className="text-xs mt-1 opacity-70 text-right">
                        {formatDate(activeThread.timestamp)}
                      </p>
                    </Card>
                  </div>

                  {/* Teacher responses */}
                  {activeThread.teacherResponses.map((response, index) => (
                    <div key={index} className="flex justify-start">
                      <div className="flex items-start gap-2">
                        <Avatar className="h-8 w-8 mt-1">
                          <img
                            src={
                              teachers?.find(
                                (teacher) =>
                                  teacher.id ===
                                  activeThread.teacherResponses[0]?.teacherId
                              )?.avatar || "/placeholder.svg"
                            }
                            alt={response.teacherName}
                          />
                        </Avatar>
                        <Card className="bg-muted p-3 max-w-[80%]">
                          <p className="font-semibold text-xs mb-1">
                            {response.teacherName}
                          </p>
                          <p className="text-sm">{response.content}</p>
                          <p className="text-xs mt-1 opacity-70 text-right">
                            {formatDate(response.timestamp)}
                          </p>
                        </Card>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center p-8">
                <h3 className="text-xl font-bold mb-2">No message selected</h3>
                <p className="text-muted-foreground mb-4">
                  Select a message from the sidebar or start a new conversation
                </p>
              </div>
            </div>
          )}

          {/* Message input */}
          <div className="p-4 border-t">
            <div className="flex items-center space-x-2 max-w-3xl mx-auto">
              <Button variant="outline" size="icon" className="rounded-full">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <ImageIcon className="h-5 w-5" />
              </Button>
              <div className="flex-1 flex items-center space-x-2 bg-muted rounded-full px-4 py-2">
                <Input
                  type="text"
                  placeholder={`Ask ${selectedTeacher.name} a question...`}
                  className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
              </div>
              <Button
                variant="default"
                size="icon"
                className="rounded-full bg-primary text-primary-foreground"
                onClick={handleSendMessage}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
