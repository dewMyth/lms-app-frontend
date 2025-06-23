"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash2, Play } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { fetchData } from "@/apiService";

interface VideoLesson {
  id: string;
  title: string;
  videoLink: string;
  subject: string;
  grade: string;
}

// Mock data
const mockVideoLessons: VideoLesson[] = [
  {
    id: "1",
    title: "Introduction to Quadratic Equations",
    videoLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    subject: "Mathematics",
    grade: "Grade 10",
  },
  {
    id: "2",
    title: "Photosynthesis Process",
    videoLink: "https://www.youtube.com/watch?v=abc123def456",
    subject: "Biology",
    grade: "Grade 11",
  },
  {
    id: "3",
    title: "Shakespeare's Romeo and Juliet Analysis",
    videoLink: "https://www.youtube.com/watch?v=xyz789uvw012",
    subject: "English",
    grade: "Grade 12",
  },
];

export default function VideosManagement() {
  const [videoLessons, setVideoLessons] = useState<VideoLesson[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<VideoLesson | null>(null);
  const [newVideo, setNewVideo] = useState<Partial<VideoLesson>>({});

  useEffect(() => {
    const fetchAllStudents = async () => {
      try {
        const response = await fetchData(
          `subject-content/get-all-video-lessons`
        );
        if (Array.isArray(response)) {
          setVideoLessons(response);
        } else {
          console.error("Invalid response format:", response);
          setVideoLessons([]);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
        setVideoLessons([]);
      }
    };

    fetchAllStudents();
  }, []);

  const filteredVideoLessons = videoLessons.filter(
    (video) =>
      video.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.grade?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddVideo = () => {
    if (newVideo.title && newVideo.videoLink) {
      const video: VideoLesson = {
        id: Date.now().toString(),
        title: newVideo.title || "",
        videoLink: newVideo.videoLink || "",
        subject: newVideo.subject || "",
        grade: newVideo.grade || "",
      };
      setVideoLessons([...videoLessons, video]);
      setNewVideo({});
      setIsAddDialogOpen(false);
    }
  };

  const handleEditVideo = (video: VideoLesson) => {
    setEditingVideo(video);
    setNewVideo(video);
  };

  const handleUpdateVideo = () => {
    if (editingVideo && newVideo.title && newVideo.videoLink) {
      setVideoLessons(
        videoLessons.map((v) =>
          v.id === editingVideo.id
            ? ({ ...editingVideo, ...newVideo } as VideoLesson)
            : v
        )
      );
      setEditingVideo(null);
      setNewVideo({});
    }
  };

  const handleDeleteVideo = (id: string) => {
    setVideoLessons(videoLessons.filter((v) => v.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Video Lessons Management
          </h1>
          <p className="text-muted-foreground">
            Manage all video lessons in your LMS
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Video Lessons ({videoLessons.length})</CardTitle>
          <CardDescription>
            View and manage all educational video content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-72">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search video lessons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Video Lesson
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Video Lesson</DialogTitle>
                  <DialogDescription>
                    Enter the video lesson details below
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="title"
                      value={newVideo.title || ""}
                      onChange={(e) =>
                        setNewVideo({ ...newVideo, title: e.target.value })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="videoLink" className="text-right">
                      Video Link
                    </Label>
                    <Textarea
                      id="videoLink"
                      value={newVideo.videoLink || ""}
                      onChange={(e) =>
                        setNewVideo({ ...newVideo, videoLink: e.target.value })
                      }
                      className="col-span-3"
                      placeholder="https://www.youtube.com/watch?v=..."
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="subject" className="text-right">
                      Subject
                    </Label>
                    <Select
                      value={newVideo.subject || ""}
                      onValueChange={(value) =>
                        setNewVideo({ ...newVideo, subject: value })
                      }
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="maths">Mathematics</SelectItem>
                        <SelectItem value="sinhala">Sinhala</SelectItem>
                        <SelectItem value="environment">Environment</SelectItem>
                        <SelectItem value="all">All Subjects</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="grade" className="text-right">
                      Grade
                    </Label>
                    <Select
                      value={newVideo.grade || ""}
                      onValueChange={(value) =>
                        setNewVideo({ ...newVideo, grade: value })
                      }
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Grade 1</SelectItem>
                        <SelectItem value="2">Grade 2</SelectItem>
                        <SelectItem value="3">Grade 3</SelectItem>
                        <SelectItem value="4">Grade 4</SelectItem>
                        <SelectItem value="5">Grade 5</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddVideo}>Add Video Lesson</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Video</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVideoLessons.map((video) => (
                  <TableRow key={video.id}>
                    <TableCell className="font-medium">{video.title}</TableCell>
                    <TableCell>{video.subject}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{video.grade}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" asChild>
                        <a
                          href={video.videoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Watch
                        </a>
                      </Button>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Dialog
                          open={editingVideo?.id === video.id}
                          onOpenChange={(open) =>
                            !open && setEditingVideo(null)
                          }
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleEditVideo(video)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Edit Video Lesson</DialogTitle>
                              <DialogDescription>
                                Update video lesson information
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="edit-title"
                                  className="text-right"
                                >
                                  Title
                                </Label>
                                <Input
                                  id="edit-title"
                                  value={newVideo.title || ""}
                                  onChange={(e) =>
                                    setNewVideo({
                                      ...newVideo,
                                      title: e.target.value,
                                    })
                                  }
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="edit-video-link"
                                  className="text-right"
                                >
                                  Video Link
                                </Label>
                                <Textarea
                                  id="edit-video-link"
                                  value={newVideo.videoLink || ""}
                                  onChange={(e) =>
                                    setNewVideo({
                                      ...newVideo,
                                      videoLink: e.target.value,
                                    })
                                  }
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="edit-subject"
                                  className="text-right"
                                >
                                  Subject
                                </Label>
                                <Select
                                  value={newVideo.subject || ""}
                                  onValueChange={(value) =>
                                    setNewVideo({ ...newVideo, subject: value })
                                  }
                                >
                                  <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select subject" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Mathematics">
                                      Mathematics
                                    </SelectItem>
                                    <SelectItem value="Science">
                                      Science
                                    </SelectItem>
                                    <SelectItem value="English">
                                      English
                                    </SelectItem>
                                    <SelectItem value="History">
                                      History
                                    </SelectItem>
                                    <SelectItem value="Geography">
                                      Geography
                                    </SelectItem>
                                    <SelectItem value="Physics">
                                      Physics
                                    </SelectItem>
                                    <SelectItem value="Chemistry">
                                      Chemistry
                                    </SelectItem>
                                    <SelectItem value="Biology">
                                      Biology
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="edit-grade"
                                  className="text-right"
                                >
                                  Grade
                                </Label>
                                <Select
                                  value={newVideo.grade || ""}
                                  onValueChange={(value) =>
                                    setNewVideo({ ...newVideo, grade: value })
                                  }
                                >
                                  <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select grade" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="1">Grade 1</SelectItem>
                                    <SelectItem value="2">Grade 2</SelectItem>
                                    <SelectItem value="3">Grade 3</SelectItem>
                                    <SelectItem value="4">Grade 4</SelectItem>
                                    <SelectItem value="5">Grade 5</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button onClick={handleUpdateVideo}>
                                Update Video Lesson
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete the video lesson.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteVideo(video.id)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
