"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Send,
  MessageCircle,
  Clock,
  Plus,
  Paperclip,
  Shield,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  FileText,
  Video,
  Calculator,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";
import { fetchData, postData } from "@/apiService";

interface Message {
  _id: string;
  content: string;
  timestamp: string;
  sender_type: "student" | "admin";
  sender_name: string;
  sender_avatar: string;
  is_read: boolean;
  admin_response?: string;
  admin_response_timestamp?: string;
  attachments?: {
    file_name: string;
    file_url: string;
    file_type: string;
  }[];
}

interface ChatThread {
  _id: string;
  subject: string;
  category: string;
  priority: "low" | "medium" | "high";
  last_message: string;
  last_message_time: string;
  unread_count: number;
  messages: Message[];
  status: "open" | "resolved" | "pending";
  admin_name?: string;
  admin_avatar?: string;
  created_at: string;
}

// Mock data - Student's conversations with admin
// const mockStudentChats: ChatThread[] = [
//   {
//     _id: "1",
//     subject: "Can't Submit Math Assignment",
//     category: "technical",
//     priority: "high",
//     last_message:
//       "Try clearing your browser cache and attempt the upload again.",
//     last_message_time: "2024-01-15T14:30:00Z",
//     unread_count: 1,
//     status: "pending",
//     admin_name: "Ms. Johnson (Admin)",
//     admin_avatar: "/placeholder.svg?height=40&width=40",
//     created_at: "2024-01-15T09:00:00Z",
//     messages: [
//       {
//         _id: "m1",
//         content:
//           "Hi! I'm trying to submit my math assignment but the upload keeps failing at 50%. I've tried multiple times. Can you help?",
//         timestamp: "2024-01-15T09:00:00Z",
//         sender_type: "student",
//         sender_name: "You",
//         sender_avatar: "/placeholder.svg?height=40&width=40",
//         is_read: true,
//       },
//       {
//         _id: "m2",
//         content:
//           "Hello! I can help you with that. What browser are you using and what's the file size of your assignment?",
//         timestamp: "2024-01-15T09:15:00Z",
//         sender_type: "admin",
//         sender_name: "Ms. Johnson (Admin)",
//         sender_avatar: "/placeholder.svg?height=40&width=40",
//         is_read: true,
//       },
//       {
//         _id: "m3",
//         content:
//           "I'm using Chrome and the file is a PDF, about 2.5MB. I also tried on my phone but same issue.",
//         timestamp: "2024-01-15T10:30:00Z",
//         sender_type: "student",
//         sender_name: "You",
//         sender_avatar: "/placeholder.svg?height=40&width=40",
//         is_read: true,
//       },
//       {
//         _id: "m4",
//         content:
//           "Try clearing your browser cache and attempt the upload again. If it still doesn't work, try using Firefox or Edge browser. Let me know if the issue persists.",
//         timestamp: "2024-01-15T14:30:00Z",
//         sender_type: "admin",
//         sender_name: "Ms. Johnson (Admin)",
//         sender_avatar: "/placeholder.svg?height=40&width=40",
//         is_read: false,
//       },
//     ],
//   },
//   {
//     _id: "2",
//     subject: "Question About My Grade",
//     category: "academic",
//     priority: "medium",
//     last_message: "Your current grade is based on 3 assignments and 1 quiz...",
//     last_message_time: "2024-01-14T16:20:00Z",
//     unread_count: 0,
//     status: "resolved",
//     admin_name: "Mr. Davis (Admin)",
//     admin_avatar: "/placeholder.svg?height=40&width=40",
//     created_at: "2024-01-14T15:00:00Z",
//     messages: [
//       {
//         _id: "m5",
//         content:
//           "Hi, I just saw my grade for Mathematics and I'm confused about how it was calculated. Could you explain?",
//         timestamp: "2024-01-14T15:00:00Z",
//         sender_type: "student",
//         sender_name: "You",
//         sender_avatar: "/placeholder.svg?height=40&width=40",
//         is_read: true,
//       },
//       {
//         _id: "m6",
//         content:
//           "Of course! Your current grade is based on 3 assignments (60%) and 1 quiz (40%). Assignment 1: 85%, Assignment 2: 78%, Assignment 3: 92%, Quiz 1: 88%. This gives you an overall grade of 85.8% which rounds to B+.",
//         timestamp: "2024-01-14T16:20:00Z",
//         sender_type: "admin",
//         sender_name: "Mr. Davis (Admin)",
//         sender_avatar: "/placeholder.svg?height=40&width=40",
//         is_read: true,
//       },
//       {
//         _id: "m7",
//         content:
//           "Thank you so much! That makes sense now. I appreciate the detailed breakdown.",
//         timestamp: "2024-01-14T16:25:00Z",
//         sender_type: "student",
//         sender_name: "You",
//         sender_avatar: "/placeholder.svg?height=40&width=40",
//         is_read: true,
//       },
//     ],
//   },
//   {
//     _id: "3",
//     subject: "Video Lesson Not Playing",
//     category: "technical",
//     priority: "low",
//     last_message: "The Chemistry video for Chapter 5 won't load on my laptop",
//     last_message_time: "2024-01-13T11:45:00Z",
//     unread_count: 0,
//     status: "open",
//     admin_name: "Tech Support",
//     admin_avatar: "/placeholder.svg?height=40&width=40",
//     created_at: "2024-01-13T11:45:00Z",
//     messages: [
//       {
//         _id: "m8",
//         content:
//           "The Chemistry video for Chapter 5 won't load on my laptop. It just shows a black screen. Other videos work fine.",
//         timestamp: "2024-01-13T11:45:00Z",
//         sender_type: "student",
//         sender_name: "You",
//         sender_avatar: "/placeholder.svg?height=40&width=40",
//         is_read: true,
//       },
//     ],
//   },
// ];

export default function StudentChat() {
  const [chatThreads, setChatThreads] = useState<ChatThread[]>([]);
  const [selectedThread, setSelectedThread] = useState<ChatThread | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [newMessage, setNewMessage] = useState("");
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
  const [newChatSubject, setNewChatSubject] = useState("");
  const [newChatCategory, setNewChatCategory] = useState("");
  const [newChatPriority, setNewChatPriority] = useState("medium");
  const [newChatMessage, setNewChatMessage] = useState("");

  const user = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    const fetchChatThreads = async () => {
      const response = await fetchData(
        `/chat/get-all-chat-threads-with-messages-by-user/${user._id}`
      );
      setChatThreads(response);
      console.log(response);
    };
    fetchChatThreads();
  }, []);

  const filteredThreads = chatThreads.filter((thread) => {
    const matchesSearch =
      thread.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      thread.last_message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      filterCategory === "all" || thread.category === filterCategory;
    const matchesStatus =
      filterStatus === "all" || thread.status === filterStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleThreadSelect = (thread: ChatThread) => {
    setSelectedThread(thread);
    // Mark messages as read
    const updatedThreads = chatThreads.map((t) =>
      t._id === thread._id
        ? {
            ...t,
            unread_count: 0,
            messages: t.messages.map((m) => ({ ...m, is_read: true })),
          }
        : t
    );
    setChatThreads(updatedThreads);
  };

  const handleSendMessage = () => {
    if (!selectedThread || !newMessage.trim()) return;

    const message: Message = {
      _id: `msg_${Date.now()}`,
      content: newMessage,
      timestamp: new Date().toISOString(),
      sender_type: "student",
      sender_name: "You",
      sender_avatar: "/placeholder.svg?height=40&width=40",
      is_read: true,
    };

    const updatedThreads = chatThreads.map((thread) => {
      if (thread._id === selectedThread._id) {
        return {
          ...thread,
          messages: [...thread.messages, message],
          last_message: newMessage,
          last_message_time: new Date().toISOString(),
          status: "pending" as const,
        };
      }
      return thread;
    });

    setChatThreads(updatedThreads);
    setSelectedThread((prev) =>
      prev ? updatedThreads.find((t) => t._id === prev._id) || null : null
    );
    setNewMessage("");
  };

  const handleCreateNewChat = async () => {
    if (!newChatSubject.trim() || !newChatMessage.trim()) return;

    // Sample Req body
    //       {
    //     "subject": "Video not showing issue",
    //     "participant_name": "Kamal Perera",
    //     "participant_type": "student",
    //     "participant_avatar": "/placeholder.svg?height=40&width=40",
    //     "last_message": "Grade 1 Sinhala Video Lessons are not available for me",
    //     "last_message_time": "2024-01-15T08:45:00Z",
    //     "participant_id":"68576bd73403aec25f61840f"
    // }

    const newThread = {
      subject: newChatSubject,
      participant_name: user.username,
      participant_type: user.userType,
      participant_avatar: user.avatar,
      last_message: newChatMessage,
      last_message_time: new Date().toISOString(),
      participant_id: user._id,
    };

    const response = await postData(
      "/chat/create-admin-chat-thread",
      newThread
    );

    console.log(response);

    setChatThreads([response, ...chatThreads]);
    setSelectedThread(response);
    setIsNewChatOpen(false);
    setNewChatSubject("");
    setNewChatCategory("");
    setNewChatPriority("medium");
    setNewChatMessage("");
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return date.toLocaleDateString();
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <HelpCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "academic":
        return <Calculator className="h-4 w-4" />;
      case "technical":
        return <HelpCircle className="h-4 w-4" />;
      case "assignment":
        return <FileText className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      case "general":
        return <MessageCircle className="h-4 w-4" />;
      default:
        return <MessageCircle className="h-4 w-4" />;
    }
  };

  const totalUnread = chatThreads.reduce(
    (sum, thread) => sum + thread.unread_count,
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
          <p className="text-muted-foreground">
            Get help from administrators and teachers
            {totalUnread > 0 && (
              <Badge variant="destructive" className="ml-2">
                {totalUnread} unread
              </Badge>
            )}
          </p>
        </div>
        <Dialog open={isNewChatOpen} onOpenChange={setIsNewChatOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Ask for Help
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Ask for Help</DialogTitle>
              <DialogDescription>
                Send a message to get help with your studies, assignments, or
                technical issues
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subject" className="text-right">
                  Subject
                </Label>
                <Input
                  id="subject"
                  value={newChatSubject}
                  onChange={(e) => setNewChatSubject(e.target.value)}
                  className="col-span-3"
                  placeholder="Brief description of your question"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select
                  value={newChatCategory}
                  onValueChange={setNewChatCategory}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="What type of help do you need?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="academic">📚 Academic Help</SelectItem>
                    <SelectItem value="assignment">
                      📝 Assignment Help
                    </SelectItem>
                    <SelectItem value="technical">
                      🔧 Technical Support
                    </SelectItem>
                    <SelectItem value="video">🎥 Video Issues</SelectItem>
                    <SelectItem value="grade">📊 Grade Question</SelectItem>
                    <SelectItem value="general">💬 General Question</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="priority" className="text-right">
                  Priority
                </Label>
                <Select
                  value={newChatPriority}
                  onValueChange={setNewChatPriority}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">
                      🟢 Low - General question
                    </SelectItem>
                    <SelectItem value="medium">
                      🟡 Medium - Need help soon
                    </SelectItem>
                    <SelectItem value="high">
                      🔴 High - Urgent (assignment due soon)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="message" className="text-right">
                  Message
                </Label>
                <Textarea
                  id="message"
                  value={newChatMessage}
                  onChange={(e) => setNewChatMessage(e.target.value)}
                  className="col-span-3"
                  placeholder="Describe your question or problem in detail. Include any error messages, assignment names, or specific issues you're facing..."
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={handleCreateNewChat}
                disabled={!newChatSubject.trim() || !newChatMessage.trim()}
              >
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[800px]">
        {/* Chat List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              My Conversations ({filteredThreads.length})
            </CardTitle>
            <CardDescription>Your help requests and messages</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {/* Filters */}
            <div className="p-4 space-y-4 border-b">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search your messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <div className="flex gap-2">
                <Select
                  value={filterCategory}
                  onValueChange={setFilterCategory}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="academic">Academic</SelectItem>
                    <SelectItem value="assignment">Assignment</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="grade">Grade</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Chat Threads */}
            <ScrollArea className="h-[600px]">
              <div className="space-y-1 p-2">
                {filteredThreads.map((thread) => (
                  <div
                    key={thread._id}
                    onClick={() => handleThreadSelect(thread)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted ${
                      selectedThread?._id === thread._id ? "bg-muted" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>
                            <Shield className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-1">
                          {getCategoryIcon(thread.category)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium truncate">
                            {thread.subject}
                          </p>
                          <div className="flex items-center gap-1">
                            {thread.unread_count > 0 && (
                              <Badge variant="destructive" className="text-xs">
                                {thread.unread_count}
                              </Badge>
                            )}
                            <span className="text-xs text-muted-foreground">
                              {formatTime(thread.last_message_time)}
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {thread.last_message}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1">
                            <Badge
                              className={`text-xs ${getStatusColor(
                                thread.status
                              )}`}
                            >
                              {getStatusIcon(thread.status)}
                              <span className="ml-1">{thread.status}</span>
                            </Badge>
                            <Badge
                              className={`text-xs ${getPriorityColor(
                                thread.priority
                              )}`}
                            >
                              {thread.priority}
                            </Badge>
                          </div>
                          <span className="text-xs text-muted-foreground capitalize">
                            {thread.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Messages */}
        <Card className="lg:col-span-2">
          {selectedThread ? (
            <>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>
                        <Shield className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">
                        {selectedThread.subject}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        {getCategoryIcon(selectedThread.category)}
                        <span className="capitalize">
                          {selectedThread.category}
                        </span>
                        <Separator orientation="vertical" className="h-4" />
                        <Badge
                          className={`text-xs ${getStatusColor(
                            selectedThread.status
                          )}`}
                        >
                          {getStatusIcon(selectedThread.status)}
                          <span className="ml-1">{selectedThread.status}</span>
                        </Badge>
                        <Badge
                          className={`text-xs ${getPriorityColor(
                            selectedThread.priority
                          )}`}
                        >
                          {selectedThread.priority} priority
                        </Badge>
                      </CardDescription>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Started {formatTime(selectedThread.created_at)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {/* Messages */}
                <ScrollArea className="h-[500px] p-4">
                  <div className="space-y-4">
                    {selectedThread.messages.map((message) => (
                      <div key={message._id} className="space-y-2">
                        {/* Student Message */}
                        <div className="flex items-start gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={message.sender_avatar || "/placeholder.svg"}
                            />
                            <AvatarFallback>
                              {message.sender_type === "admin" ? (
                                <Shield className="h-4 w-4" />
                              ) : (
                                "You"[0]
                              )}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">
                                {message.sender_name}
                              </span>
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {formatTime(message.timestamp)}
                              </span>
                            </div>
                            <div className="mt-1 p-3 bg-muted rounded-lg">
                              <p className="text-sm">{message.content}</p>
                              {message.attachments &&
                                message.attachments.length > 0 && (
                                  <div className="mt-2 space-y-1">
                                    {message.attachments.map(
                                      (attachment, index) => (
                                        <div
                                          key={index}
                                          className="flex items-center gap-2 text-xs opacity-80"
                                        >
                                          <Paperclip className="h-3 w-3" />
                                          <span>{attachment.file_name}</span>
                                        </div>
                                      )
                                    )}
                                  </div>
                                )}
                            </div>
                          </div>
                        </div>

                        {/* Admin Response as Reply */}
                        {message.admin_response && (
                          <div className="ml-11 pl-4 border-l-2 border-primary">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium text-primary">
                                Admin Response
                              </span>
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {formatTime(
                                  message.admin_response_timestamp || ""
                                )}
                              </span>
                            </div>
                            <div className="p-3 bg-primary/10 rounded-lg">
                              <p className="text-sm text-gray-800">
                                {message.admin_response}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <Separator />

                {/* Reply Section */}
                <div className="p-4">
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Type your reply..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Paperclip className="h-4 w-4 mr-2" />
                          Attach File
                        </Button>
                        <span className="text-sm text-muted-foreground">
                          {selectedThread.status === "resolved"
                            ? "This conversation is resolved"
                            : "Admin will be notified of your message"}
                        </span>
                      </div>
                      <Button
                        onClick={handleSendMessage}
                        disabled={
                          !newMessage.trim() ||
                          selectedThread.status === "resolved"
                        }
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Send Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center">
                <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium">Select a conversation</h3>
                <p className="text-muted-foreground mb-4">
                  Choose a message thread to view your conversation with admin
                </p>
                <Button onClick={() => setIsNewChatOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Ask for Help
                </Button>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
