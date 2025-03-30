"use client";

import { useEffect, useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { io, type Socket } from "socket.io-client";
import { BookOpen, Clock, Search, Send, User, UserCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

// Define message type
type Message = {
  id: string;
  studentId: string;
  studentName: string;
  studentGrade: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  teacherResponse?: {
    teacherId: string;
    teacherName: string;
    content: string;
    timestamp: Date;
  };
};

// Define student type
type Student = {
  id: string;
  name: string;
  grade: string;
  avatar?: string;
  isOnline: boolean;
  lastActive?: Date;
};

// Form schema for sending messages
const messageFormSchema = z.object({
  message: z.string().min(1, { message: "Message cannot be empty" }),
});

// Mock data for students
const mockStudents: Student[] = [
  {
    id: "s1",
    name: "Alex Johnson",
    grade: "Grade 3",
    avatar: "/placeholder.svg?height=32&width=32",
    isOnline: true,
  },
  {
    id: "s2",
    name: "Emma Smith",
    grade: "Grade 3",
    avatar: "/placeholder.svg?height=32&width=32",
    isOnline: false,
    lastActive: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: "s3",
    name: "Noah Williams",
    grade: "Grade 3",
    avatar: "/placeholder.svg?height=32&width=32",
    isOnline: true,
  },
  {
    id: "s4",
    name: "Olivia Brown",
    grade: "Grade 4",
    avatar: "/placeholder.svg?height=32&width=32",
    isOnline: false,
    lastActive: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
  },
  {
    id: "s5",
    name: "William Davis",
    grade: "Grade 2",
    avatar: "/placeholder.svg?height=32&width=32",
    isOnline: true,
  },
];

// Mock data for initial messages
const mockMessages: Message[] = [
  {
    id: "m1",
    studentId: "s1",
    studentName: "Alex Johnson",
    studentGrade: "Grade 3",
    content:
      "Hello Ms. Johnson, I'm having trouble with the math homework. Can you help me understand problem #5?",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    isRead: true,
    teacherResponse: {
      teacherId: "t1",
      teacherName: "Sarah Johnson",
      content:
        "Hi Alex, I'd be happy to help. Problem #5 is about fractions. You need to find the common denominator first. Let me know if you need more specific guidance.",
      timestamp: new Date(Date.now() - 1000 * 60 * 2), // 2 minutes ago
    },
  },
  {
    id: "m2",
    studentId: "s2",
    studentName: "Emma Smith",
    studentGrade: "Grade 3",
    content:
      "Ms. Johnson, I finished the science project early. Can I submit it now or should I wait until Friday?",
    timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    isRead: true,
  },
  {
    id: "m3",
    studentId: "s3",
    studentName: "Noah Williams",
    studentGrade: "Grade 3",
    content:
      "I'm not feeling well today and might miss tomorrow's class. Can you let me know what I'll need to catch up on?",
    timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
    isRead: false,
  },
  {
    id: "m4",
    studentId: "s4",
    studentName: "Olivia Brown",
    studentGrade: "Grade 4",
    content:
      "Hello, I'm having trouble accessing the online reading assignment. The link doesn't seem to be working.",
    timestamp: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
    isRead: true,
    teacherResponse: {
      teacherId: "t2",
      teacherName: "Michael Brown",
      content:
        "Hi Olivia, I'll check the link and send you a new one. In the meantime, you can find the reading material in chapter 4 of your textbook.",
      timestamp: new Date(Date.now() - 1000 * 60 * 175), // 2 hours 55 minutes ago
    },
  },
  {
    id: "m5",
    studentId: "s5",
    studentName: "William Davis",
    studentGrade: "Grade 2",
    content: "Ms. Emily, when is the spelling test? I forgot to write it down.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    isRead: true,
    teacherResponse: {
      teacherId: "t3",
      teacherName: "Emily Davis",
      content:
        "Hi William, the spelling test is scheduled for this Thursday. Don't forget to study the words on page 15!",
      timestamp: new Date(Date.now() - 1000 * 60 * 55), // 55 minutes ago
    },
  },
];

export default function ChatPage() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof messageFormSchema>>({
    resolver: zodResolver(messageFormSchema),
    defaultValues: {
      message: "",
    },
  });

  // Connect to socket server
  useEffect(() => {
    // In a real application, you would connect to your actual socket server
    // For this example, we'll just simulate the connection
    const newSocket = io("https://example.com", {
      autoConnect: false,
      // This is just a placeholder, in a real app you would connect to your actual server
    });

    setSocket(newSocket);

    // Simulate socket connection
    const timeout = setTimeout(() => {
      toast({
        title: "Connected to chat server",
        description: "You can now receive and send messages in real-time",
      });
    }, 1000);

    return () => {
      clearTimeout(timeout);
      newSocket.disconnect();
    };
  }, [toast]);

  // Simulate receiving a new message
  useEffect(() => {
    const interval = setInterval(() => {
      // 10% chance of receiving a new message every 30 seconds
      if (Math.random() < 0.1) {
        const randomStudent =
          mockStudents[Math.floor(Math.random() * mockStudents.length)];
        const newMessage: Message = {
          id: `m${Date.now()}`,
          studentId: randomStudent.id,
          studentName: randomStudent.name,
          studentGrade: randomStudent.grade,
          content: `Hello teacher, this is a simulated message from ${randomStudent.name}. Can you help me with something?`,
          timestamp: new Date(),
          isRead: false,
        };

        setMessages((prev) => [newMessage, ...prev]);

        toast({
          title: "New message received",
          description: `${randomStudent.name} has sent you a message`,
        });
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [toast]);

  // Scroll to bottom of messages when a new message is added
  useEffect(() => {
    if (messagesEndRef.current && selectedStudent) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, selectedStudent]);

  // Filter students based on search term and selected grade
  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesGrade =
      selectedGrade === "all" || student.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  // Get conversations (unique students who have sent messages)
  const conversations = messages.reduce((acc, message) => {
    if (!acc.some((s) => s.id === message.studentId)) {
      const student = students.find((s) => s.id === message.studentId);
      if (student) {
        acc.push(student);
      }
    }
    return acc;
  }, [] as Student[]);

  // Filter conversations based on active tab and selected grade
  const filteredConversations = conversations.filter((student) => {
    const matchesGrade =
      selectedGrade === "all" || student.grade === selectedGrade;

    if (activeTab === "all") {
      return matchesGrade;
    } else if (activeTab === "unread") {
      return (
        matchesGrade &&
        messages.some((m) => m.studentId === student.id && !m.isRead)
      );
    } else if (activeTab === "answered") {
      return (
        matchesGrade &&
        messages.some((m) => m.studentId === student.id && m.teacherResponse)
      );
    } else if (activeTab === "unanswered") {
      return (
        matchesGrade &&
        messages.some((m) => m.studentId === student.id && !m.teacherResponse)
      );
    }

    return matchesGrade;
  });

  // Get messages for selected student
  const studentMessages = selectedStudent
    ? messages
        .filter((message) => message.studentId === selectedStudent.id)
        .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
    : [];

  // Handle selecting a student
  const handleSelectStudent = (student: Student) => {
    setSelectedStudent(student);

    // Mark messages as read
    setMessages((prev) =>
      prev.map((message) =>
        message.studentId === student.id
          ? { ...message, isRead: true }
          : message
      )
    );
  };

  // Handle sending a message
  const handleSendMessage = (values: z.infer<typeof messageFormSchema>) => {
    if (!selectedStudent) return;

    // In a real application, you would send this message through the socket
    // For this example, we'll just add it to the local state
    const existingMessage = messages.find(
      (m) => m.studentId === selectedStudent.id && !m.teacherResponse
    );

    if (existingMessage) {
      // Add teacher response to existing message
      setMessages((prev) =>
        prev.map((message) =>
          message.id === existingMessage.id
            ? {
                ...message,
                teacherResponse: {
                  teacherId: "t1",
                  teacherName: "Sarah Johnson",
                  content: values.message,
                  timestamp: new Date(),
                },
              }
            : message
        )
      );
    }

    form.reset();

    toast({
      title: "Message sent",
      description: `Your response to ${selectedStudent.name} has been sent`,
    });
  };

  // Format date for display
  const formatMessageDate = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) {
      return "Just now";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} ${
        diffInMinutes === 1 ? "minute" : "minutes"
      } ago`;
    } else if (diffInMinutes < 24 * 60) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
    }
  };

  // Get unread message count
  const unreadCount = messages.filter((message) => !message.isRead).length;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Chat</h1>
        <p className="text-muted-foreground">
          Communicate with students in real-time
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader className="px-4 py-3">
            <div className="flex items-center justify-between">
              <CardTitle>Conversations</CardTitle>
              <Badge variant="secondary">
                {unreadCount > 0 ? `${unreadCount} unread` : "All read"}
              </Badge>
            </div>
            <div className="flex flex-col gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Grades</SelectItem>
                  <SelectItem value="Grade 1">Grade 1</SelectItem>
                  <SelectItem value="Grade 2">Grade 2</SelectItem>
                  <SelectItem value="Grade 3">Grade 3</SelectItem>
                  <SelectItem value="Grade 4">Grade 4</SelectItem>
                  <SelectItem value="Grade 5">Grade 5</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="px-0 py-0">
            <Tabs
              defaultValue="all"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
                <TabsTrigger value="answered">Answered</TabsTrigger>
                <TabsTrigger value="unanswered">Pending</TabsTrigger>
              </TabsList>
              <ScrollArea className="h-[calc(100vh-20rem)]">
                {filteredConversations.length === 0 ? (
                  <div className="flex h-32 items-center justify-center">
                    <p className="text-sm text-muted-foreground">
                      No conversations found
                    </p>
                  </div>
                ) : (
                  <div className="space-y-0.5">
                    {filteredConversations.map((student) => {
                      const lastMessage = messages
                        .filter((m) => m.studentId === student.id)
                        .sort(
                          (a, b) =>
                            b.timestamp.getTime() - a.timestamp.getTime()
                        )[0];

                      const hasUnread = messages.some(
                        (m) => m.studentId === student.id && !m.isRead
                      );
                      const isAnswered = messages.some(
                        (m) => m.studentId === student.id && m.teacherResponse
                      );

                      return (
                        <div
                          key={student.id}
                          className={`flex cursor-pointer items-center gap-3 p-3 hover:bg-muted/50 ${
                            selectedStudent?.id === student.id ? "bg-muted" : ""
                          } ${hasUnread ? "bg-primary/5" : ""}`}
                          onClick={() => handleSelectStudent(student)}
                        >
                          <div className="relative">
                            <Avatar>
                              <AvatarImage src={student.avatar} />
                              <AvatarFallback>
                                {student.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            {student.isOnline && (
                              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background" />
                            )}
                          </div>
                          <div className="flex-1 space-y-0.5">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">
                                {student.name}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {lastMessage
                                  ? formatMessageDate(lastMessage.timestamp)
                                  : ""}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">
                                {student.grade}
                              </span>
                              <div className="flex items-center gap-1">
                                {hasUnread && (
                                  <Badge variant="default">New</Badge>
                                )}
                                {isAnswered ? (
                                  <Badge
                                    variant="outline"
                                    className="text-green-500"
                                  >
                                    <UserCheck className="mr-1 h-3 w-3" />
                                    Answered
                                  </Badge>
                                ) : (
                                  <Badge
                                    variant="outline"
                                    className="text-amber-500"
                                  >
                                    <Clock className="mr-1 h-3 w-3" />
                                    Pending
                                  </Badge>
                                )}
                              </div>
                            </div>
                            {lastMessage && (
                              <p className="line-clamp-1 text-xs text-muted-foreground">
                                {lastMessage.teacherResponse
                                  ? `You: ${lastMessage.teacherResponse.content}`
                                  : lastMessage.content}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </ScrollArea>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          {selectedStudent ? (
            <>
              <CardHeader className="flex flex-row items-center gap-3 px-4 py-3">
                <Avatar>
                  <AvatarImage src={selectedStudent.avatar} />
                  <AvatarFallback>
                    {selectedStudent.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg">
                    {selectedStudent.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <BookOpen className="h-3 w-3" />
                    {selectedStudent.grade}
                    {selectedStudent.isOnline ? (
                      <Badge variant="outline" className="ml-2 text-green-500">
                        Online
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="ml-2 text-muted-foreground"
                      >
                        Offline
                        {selectedStudent.lastActive && (
                          <span className="ml-1">
                            • Last active{" "}
                            {formatMessageDate(selectedStudent.lastActive)}
                          </span>
                        )}
                      </Badge>
                    )}
                  </CardDescription>
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="flex h-[calc(100vh-20rem)] flex-col p-0">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {studentMessages.map((message) => (
                      <div key={message.id} className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Avatar>
                            <AvatarImage src={selectedStudent.avatar} />
                            <AvatarFallback>
                              {selectedStudent.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">
                                {message.studentName}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {formatMessageDate(message.timestamp)}
                              </span>
                            </div>
                            <div className="rounded-lg bg-muted p-3">
                              <p className="text-sm">{message.content}</p>
                            </div>
                          </div>
                        </div>

                        {message.teacherResponse && (
                          <div className="flex items-start gap-3 pl-12">
                            <Avatar>
                              <AvatarImage src="/placeholder.svg?height=32&width=32" />
                              <AvatarFallback>SJ</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">
                                  {message.teacherResponse.teacherName}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {formatMessageDate(
                                    message.teacherResponse.timestamp
                                  )}
                                </span>
                              </div>
                              <div className="rounded-lg bg-primary/10 p-3">
                                <p className="text-sm">
                                  {message.teacherResponse.content}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                <div className="border-t p-4">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(handleSendMessage)}
                      className="flex items-center gap-2"
                    >
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                placeholder="Type your message..."
                                {...field}
                                className="rounded-full"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        size="icon"
                        className="rounded-full"
                      >
                        <Send className="h-4 w-4" />
                        <span className="sr-only">Send message</span>
                      </Button>
                    </form>
                  </Form>
                </div>
              </CardContent>
            </>
          ) : (
            <div className="flex h-[calc(100vh-16rem)] flex-col items-center justify-center p-6">
              <User className="h-16 w-16 text-muted-foreground/50" />
              <h3 className="mt-4 text-xl font-medium">
                Select a conversation
              </h3>
              <p className="mt-2 text-center text-muted-foreground">
                Choose a student from the list to view your conversation history
                and respond to their messages.
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
