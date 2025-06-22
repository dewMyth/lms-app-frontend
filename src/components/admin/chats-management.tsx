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
  User,
  GraduationCap,
  Users,
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
import { fetchData, postData } from "@/apiService";
import { useSelector } from "react-redux";
import { toast } from "sonner";

interface Message {
  _id: string;
  content: string;
  timestamp: string;
  sender_id: string;
  sender_name: string;
  sender_type: "student" | "parent" | "teacher" | "admin";
  sender_avatar: string;
  is_read: boolean;
  admin_response?: string;
  admin_response_timestamp?: string;
}

interface ChatThread {
  _id: string;
  subject: string;
  participant_name: string;
  participant_type: "student" | "parent" | "teacher";
  participant_avatar: string;
  last_message: string;
  last_message_time: string;
  unread_count: number;
  messages: Message[];
  status: "open" | "resolved" | "pending";
}

// Mock data
const mockChatThreads: ChatThread[] = [
  {
    _id: "1",
    subject: "Assignment Submission Issue",
    participant_name: "Jimmy Smith",
    participant_type: "student",
    participant_avatar: "/placeholder.svg?height=40&width=40",
    last_message: "I'm having trouble submitting my math assignment",
    last_message_time: "2024-01-15T10:30:00Z",
    unread_count: 2,
    status: "open",
    messages: [
      {
        _id: "m1",
        content:
          "Hello, I'm having trouble submitting my math assignment. The upload button doesn't seem to work.",
        timestamp: "2024-01-15T09:00:00Z",
        sender_id: "s1",
        sender_name: "Jimmy Smith",
        sender_type: "student",
        sender_avatar: "/placeholder.svg?height=40&width=40",
        is_read: true,
        admin_response:
          "Hi Jimmy, I can help you with that. Can you tell me what browser you're using?",
        admin_response_timestamp: "2024-01-15T09:15:00Z",
      },
      {
        _id: "m2",
        content:
          "I'm using Chrome. I tried refreshing the page but it still doesn't work.",
        timestamp: "2024-01-15T10:30:00Z",
        sender_id: "s1",
        sender_name: "Jimmy Smith",
        sender_type: "student",
        sender_avatar: "/placeholder.svg?height=40&width=40",
        is_read: false,
      },
    ],
  },
  {
    _id: "2",
    subject: "Grade Inquiry",
    participant_name: "John Smith (Parent)",
    participant_type: "parent",
    participant_avatar: "/placeholder.svg?height=40&width=40",
    last_message: "Could you please explain my child's recent grade?",
    last_message_time: "2024-01-15T08:45:00Z",
    unread_count: 1,
    status: "pending",
    messages: [
      {
        _id: "m3",
        content:
          "Hello, I'm John Smith, Jimmy's father. Could you please explain his recent grade in Mathematics? He received a C+ and we'd like to understand what areas need improvement.",
        timestamp: "2024-01-15T08:45:00Z",
        sender_id: "p1",
        sender_name: "John Smith (Parent)",
        sender_type: "parent",
        sender_avatar: "/placeholder.svg?height=40&width=40",
        is_read: false,
      },
    ],
  },
  {
    _id: "3",
    subject: "Curriculum Discussion",
    participant_name: "Sarah Wilson",
    participant_type: "teacher",
    participant_avatar: "/placeholder.svg?height=40&width=40",
    last_message: "I'd like to discuss the new curriculum changes",
    last_message_time: "2024-01-14T16:20:00Z",
    unread_count: 0,
    status: "resolved",
    messages: [
      {
        _id: "m4",
        content:
          "Hi Admin, I'd like to discuss the new curriculum changes for Grade 10 Mathematics. When can we schedule a meeting?",
        timestamp: "2024-01-14T16:20:00Z",
        sender_id: "t1",
        sender_name: "Sarah Wilson",
        sender_type: "teacher",
        sender_avatar: "/placeholder.svg?height=40&width=40",
        is_read: true,
        admin_response:
          "Hi Sarah, let's schedule a meeting for tomorrow at 2 PM. I'll send you a calendar invite.",
        admin_response_timestamp: "2024-01-14T16:45:00Z",
      },
    ],
  },
  {
    _id: "4",
    subject: "Technical Support",
    participant_name: "Alex Brown",
    participant_type: "student",
    participant_avatar: "/placeholder.svg?height=40&width=40",
    last_message: "The video lessons are not loading properly",
    last_message_time: "2024-01-14T14:15:00Z",
    unread_count: 1,
    status: "open",
    messages: [
      {
        _id: "m5",
        content:
          "Hi, the video lessons are not loading properly on my account. I can see the titles but when I click play, nothing happens.",
        timestamp: "2024-01-14T14:15:00Z",
        sender_id: "s2",
        sender_name: "Alex Brown",
        sender_type: "student",
        sender_avatar: "/placeholder.svg?height=40&width=40",
        is_read: false,
      },
    ],
  },
];

export default function ChatsManagement() {
  const [chatThreads, setChatThreads] = useState<ChatThread[]>([]);
  const [selectedThread, setSelectedThread] = useState<ChatThread | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [replyMessage, setReplyMessage] = useState("");

  const user = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    const fetchChatThreads = async () => {
      const response = await fetchData(
        "chat/get-all-chat-threads-with-messages"
      );
      console.log(response);
      setChatThreads(response);
    };
    fetchChatThreads();
  }, []);

  const filteredThreads = chatThreads?.filter((thread) => {
    const matchesSearch =
      thread.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      thread.participant_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      thread.last_message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || thread.status === filterStatus;
    const matchesType =
      filterType === "all" || thread.participant_type === filterType;

    return matchesSearch && matchesStatus && matchesType;
  });

  const handleThreadSelect = (thread: ChatThread) => {
    setSelectedThread(thread);
    // Mark messages as read
    const updatedThreads = chatThreads?.map((t) =>
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

  const handleSendReply = async () => {
    if (!selectedThread || !replyMessage.trim()) return;

    const newMessage: Message = {
      _id: `admin_${Date.now()}`,
      content: replyMessage,
      timestamp: new Date().toISOString(),
      sender_id: "admin",
      sender_name: "Admin",
      sender_type: "admin", // This would be "admin" in real implementation
      sender_avatar: "/placeholder.svg?height=40&width=40",
      is_read: true,
    };

    const updatedThreads = chatThreads?.map((thread) => {
      if (thread._id === selectedThread._id) {
        const updatedMessages = [...thread.messages];
        // Add admin response to the last user message if it doesn't have one
        const lastUserMessage = updatedMessages[updatedMessages?.length - 1];
        if (lastUserMessage && !lastUserMessage.admin_response) {
          lastUserMessage.admin_response = replyMessage;
          lastUserMessage.admin_response_timestamp = new Date().toISOString();
        }

        return {
          ...thread,
          messages: updatedMessages,
          last_message: replyMessage,
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

    // Update the DB with the new message
    const adminResponsePayload = {
      thread_id: selectedThread?._id,
      message_id:
        selectedThread?.messages[selectedThread?.messages?.length - 1]?._id,
      content: replyMessage,
      sender_id: user._id,
      sender_type: "admin",
    };
    const response = await postData(
      "chat/create-admin-chat-message",
      adminResponsePayload
    );

    if (response?.status === 201) {
      toast.success("Message sent successfully");
    } else {
      toast.error("Failed to send message");
    }

    setReplyMessage("");
  };

  const handleStatusChange = (
    threadId: string,
    newStatus: "open" | "resolved" | "pending"
  ) => {
    const updatedThreads = chatThreads?.map((thread) =>
      thread._id === threadId ? { ...thread, status: newStatus } : thread
    );
    setChatThreads(updatedThreads);
    if (selectedThread && selectedThread._id === threadId) {
      setSelectedThread({ ...selectedThread, status: newStatus });
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return "";
      // return date.toLocaleDateString();
    }
  };

  const getParticipantIcon = (type: "student" | "parent" | "teacher") => {
    switch (type) {
      case "student":
        return <User className="h-4 w-4" />;
      case "parent":
        return <Users className="h-4 w-4" />;
      case "teacher":
        return <GraduationCap className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalUnread = chatThreads?.reduce(
    (sum, thread) => sum + thread.unread_count,
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Chat Management</h1>
          <p className="text-muted-foreground">
            Manage conversations with students, parents, and teachers
            {totalUnread > 0 && (
              <Badge variant="destructive" className="ml-2">
                {totalUnread} unread
              </Badge>
            )}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[800px]">
        {/* Chat List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Conversations ({filteredThreads?.length})
            </CardTitle>
            <CardDescription>All chat threads</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {/* Filters */}
            <div className="p-4 space-y-4 border-b">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <div className="flex gap-2">
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
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="student">Students</SelectItem>
                    <SelectItem value="parent">Parents</SelectItem>
                    <SelectItem value="teacher">Teachers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Chat Threads */}
            <ScrollArea className="h-[600px]">
              <div className="space-y-1 p-2">
                {filteredThreads?.map((thread) => (
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
                          <AvatarImage
                            src={
                              thread.participant_avatar || "/placeholder.svg"
                            }
                          />
                          <AvatarFallback>
                            {thread.participant_name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1">
                          {getParticipantIcon(thread.participant_type)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium truncate">
                            {thread.participant_name}
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
                        <p className="text-sm font-medium text-muted-foreground truncate">
                          {thread.subject}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {thread.last_message}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <Badge
                            className={`text-xs ${getStatusColor(
                              thread.status
                            )}`}
                          >
                            {thread.status}
                          </Badge>
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
                      <AvatarImage
                        src={
                          selectedThread.participant_avatar ||
                          "/placeholder.svg"
                        }
                      />
                      <AvatarFallback>
                        {selectedThread.participant_name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">
                        {selectedThread.subject}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        {getParticipantIcon(selectedThread.participant_type)}
                        {selectedThread.participant_name}
                      </CardDescription>
                    </div>
                  </div>
                  <Select
                    value={selectedThread.status}
                    onValueChange={(value) =>
                      handleStatusChange(selectedThread._id, value as any)
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {/* Messages */}
                <ScrollArea className="h-[500px] p-4">
                  <div className="space-y-4">
                    {selectedThread.messages.map((message) => (
                      <div key={message._id} className="space-y-2">
                        {/* User Message */}
                        <div className="flex items-start gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={message.sender_avatar || "/placeholder.svg"}
                            />
                            <AvatarFallback>
                              {message?.sender_name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">
                                {message?.sender_name}
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {message?.sender_type}
                              </Badge>
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {formatTime(message.timestamp)}
                              </span>
                            </div>
                            <div className="mt-1 p-3 bg-muted rounded-lg">
                              <p className="text-sm">{message.content}</p>
                            </div>
                          </div>
                        </div>

                        {/* Admin Response */}
                        {message.admin_response && (
                          <div className="ml-11 pl-4 border-l-2 border-primary">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium text-primary">
                                Admin Response
                              </span>
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {formatTime(message.admin_response_timestamp!)}
                              </span>
                            </div>
                            <div className="p-3 bg-primary/10 rounded-lg">
                              <p className="text-sm">
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
                      placeholder="Type your response..."
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Responding as Admin
                      </span>
                      <Button
                        onClick={handleSendReply}
                        disabled={!replyMessage.trim()}
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
                <p className="text-muted-foreground">
                  Choose a chat thread from the left to view and respond to
                  messages
                </p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
