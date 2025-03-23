"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Edit, Play, Plus, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Define the video lesson type
type VideoLesson = {
  id: string;
  title: string;
  videoLink: string;
  grade: string;
  subject: string;
  description: string;
  thumbnail?: string;
  createdAt: string;
};

// Initial video lessons data
const initialVideoLessons: VideoLesson[] = [
  {
    id: "1",
    title: "Introduction to Fractions",
    videoLink: "https://www.youtube.com/watch?v=example1",
    grade: "Grade 3",
    subject: "Mathematics",
    description: "Learn the basics of fractions and how to represent them.",
    thumbnail: "/placeholder.svg?height=180&width=320",
    createdAt: "2023-03-15T10:30:00",
  },
  {
    id: "2",
    title: "States of Matter",
    videoLink: "https://www.youtube.com/watch?v=example2",
    grade: "Grade 3",
    subject: "Science",
    description:
      "Explore the different states of matter: solid, liquid, and gas.",
    thumbnail: "/placeholder.svg?height=180&width=320",
    createdAt: "2023-03-10T14:15:00",
  },
  {
    id: "3",
    title: "Reading Strategies",
    videoLink: "https://www.youtube.com/watch?v=example3",
    grade: "Grade 3",
    subject: "English",
    description: "Learn effective strategies for reading comprehension.",
    thumbnail: "/placeholder.svg?height=180&width=320",
    createdAt: "2023-03-05T09:45:00",
  },
];

// Form schema for video lessons
const videoLessonFormSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters" }),
  videoLink: z.string().url({ message: "Please enter a valid URL" }),
  grade: z.string({ required_error: "Please select a grade" }),
  subject: z.string({ required_error: "Please select a subject" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  thumbnail: z.string().optional(),
});

export default function VideoLessonsPage() {
  const [videoLessons, setVideoLessons] =
    useState<VideoLesson[]>(initialVideoLessons);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [selectedVideoLesson, setSelectedVideoLesson] =
    useState<VideoLesson | null>(null);
  const { toast } = useToast();

  // Form for adding a new video lesson
  const addForm = useForm<z.infer<typeof videoLessonFormSchema>>({
    resolver: zodResolver(videoLessonFormSchema),
    defaultValues: {
      title: "",
      videoLink: "",
      grade: "",
      subject: "",
      description: "",
      thumbnail: "",
    },
  });

  // Form for editing an existing video lesson
  const editForm = useForm<z.infer<typeof videoLessonFormSchema>>({
    resolver: zodResolver(videoLessonFormSchema),
    defaultValues: {
      title: "",
      videoLink: "",
      grade: "",
      subject: "",
      description: "",
      thumbnail: "",
    },
  });

  // Handle adding a new video lesson
  const handleAddVideoLesson = (
    values: z.infer<typeof videoLessonFormSchema>
  ) => {
    const newVideoLesson: VideoLesson = {
      id: Date.now().toString(),
      ...values,
      thumbnail: values.thumbnail || `/placeholder.svg?height=180&width=320`,
      createdAt: new Date().toISOString(),
    };

    setVideoLessons([newVideoLesson, ...videoLessons]);
    setIsAddDialogOpen(false);
    addForm.reset();

    toast({
      title: "Video lesson created",
      description: `${values.title} has been created successfully.`,
    });
  };

  // Handle editing an existing video lesson
  const handleEditVideoLesson = (
    values: z.infer<typeof videoLessonFormSchema>
  ) => {
    if (!selectedVideoLesson) return;

    const updatedVideoLessons = videoLessons.map((videoLesson) =>
      videoLesson.id === selectedVideoLesson.id
        ? {
            ...videoLesson,
            ...values,
            thumbnail: values.thumbnail || videoLesson.thumbnail,
          }
        : videoLesson
    );

    setVideoLessons(updatedVideoLessons);
    setIsEditDialogOpen(false);
    setSelectedVideoLesson(null);

    toast({
      title: "Video lesson updated",
      description: `${values.title} has been updated successfully.`,
    });
  };

  // Handle deleting a video lesson
  const handleDeleteVideoLesson = () => {
    if (!selectedVideoLesson) return;

    const updatedVideoLessons = videoLessons.filter(
      (videoLesson) => videoLesson.id !== selectedVideoLesson.id
    );

    setVideoLessons(updatedVideoLessons);
    setIsDeleteDialogOpen(false);
    setSelectedVideoLesson(null);

    toast({
      title: "Video lesson deleted",
      description: `${selectedVideoLesson.title} has been deleted.`,
      variant: "destructive",
    });
  };

  // Open edit dialog and populate form with video lesson data
  const openEditDialog = (videoLesson: VideoLesson) => {
    setSelectedVideoLesson(videoLesson);
    editForm.reset({
      title: videoLesson.title,
      videoLink: videoLesson.videoLink,
      grade: videoLesson.grade,
      subject: videoLesson.subject,
      description: videoLesson.description,
      thumbnail: videoLesson.thumbnail,
    });
    setIsEditDialogOpen(true);
  };

  // Open delete dialog
  const openDeleteDialog = (videoLesson: VideoLesson) => {
    setSelectedVideoLesson(videoLesson);
    setIsDeleteDialogOpen(true);
  };

  // Open preview dialog
  const openPreviewDialog = (videoLesson: VideoLesson) => {
    setSelectedVideoLesson(videoLesson);
    setIsPreviewDialogOpen(true);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  // Extract YouTube video ID from URL
  const getYouTubeEmbedUrl = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = match && match[2].length === 11 ? match[2] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Video Lessons</h1>
          <p className="text-muted-foreground">
            Create and manage video lessons for your students
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Video Lesson
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Video Lesson</DialogTitle>
              <DialogDescription>
                Create a new video lesson for your students
              </DialogDescription>
            </DialogHeader>
            <Form {...addForm}>
              <form
                onSubmit={addForm.handleSubmit(handleAddVideoLesson)}
                className="space-y-4"
              >
                <FormField
                  control={addForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Video lesson title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addForm.control}
                  name="videoLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Video Link</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://www.youtube.com/watch?v=example"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={addForm.control}
                    name="grade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Grade</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select grade" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Grade 1">Grade 1</SelectItem>
                            <SelectItem value="Grade 2">Grade 2</SelectItem>
                            <SelectItem value="Grade 3">Grade 3</SelectItem>
                            <SelectItem value="Grade 4">Grade 4</SelectItem>
                            <SelectItem value="Grade 5">Grade 5</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addForm.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select subject" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Mathematics">
                              Mathematics
                            </SelectItem>
                            <SelectItem value="Science">Science</SelectItem>
                            <SelectItem value="English">English</SelectItem>
                            <SelectItem value="Social Studies">
                              Social Studies
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={addForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the video lesson..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addForm.control}
                  name="thumbnail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thumbnail URL (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/thumbnail.jpg"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Add Video Lesson</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videoLessons.map((videoLesson) => (
          <Card key={videoLesson.id} className="overflow-hidden">
            <div className="relative aspect-video">
              <img
                src={videoLesson.thumbnail || "/placeholder.svg"}
                alt={videoLesson.title}
                className="h-full w-full object-cover"
              />
              <Button
                variant="secondary"
                size="icon"
                className="absolute inset-0 m-auto h-12 w-12 rounded-full bg-primary/90 text-primary-foreground hover:bg-primary"
                onClick={() => openPreviewDialog(videoLesson)}
              >
                <Play className="h-6 w-6" />
              </Button>
            </div>
            <CardHeader className="p-4">
              <CardTitle className="line-clamp-1 text-lg">
                {videoLesson.title}
              </CardTitle>
              <CardDescription className="line-clamp-2">
                {videoLesson.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                  {videoLesson.grade}
                </span>
                <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                  {videoLesson.subject}
                </span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Added on {formatDate(videoLesson.createdAt)}
              </p>
              <div className="mt-4 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => openEditDialog(videoLesson)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="flex-1"
                  onClick={() => openDeleteDialog(videoLesson)}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Video Lesson Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Video Lesson</DialogTitle>
            <DialogDescription>
              Update the details of this video lesson
            </DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form
              onSubmit={editForm.handleSubmit(handleEditVideoLesson)}
              className="space-y-4"
            >
              <FormField
                control={editForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="videoLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video Link</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={editForm.control}
                  name="grade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grade</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Grade 1">Grade 1</SelectItem>
                          <SelectItem value="Grade 2">Grade 2</SelectItem>
                          <SelectItem value="Grade 3">Grade 3</SelectItem>
                          <SelectItem value="Grade 4">Grade 4</SelectItem>
                          <SelectItem value="Grade 5">Grade 5</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Mathematics">
                            Mathematics
                          </SelectItem>
                          <SelectItem value="Science">Science</SelectItem>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="Social Studies">
                            Social Studies
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={editForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea className="min-h-[100px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="thumbnail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thumbnail URL (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Video Lesson Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Video Lesson</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedVideoLesson?.title}? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteVideoLesson}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Video Lesson Dialog */}
      <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{selectedVideoLesson?.title}</DialogTitle>
            <DialogDescription>
              {selectedVideoLesson?.grade} • {selectedVideoLesson?.subject}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="aspect-video overflow-hidden rounded-md">
              {selectedVideoLesson && (
                <iframe
                  src={getYouTubeEmbedUrl(selectedVideoLesson.videoLink)}
                  className="h-full w-full"
                  allowFullScreen
                  title={selectedVideoLesson.title}
                ></iframe>
              )}
            </div>
            <div className="rounded-md border p-4">
              <h3 className="mb-2 font-medium">Description</h3>
              <p className="text-sm text-muted-foreground">
                {selectedVideoLesson?.description}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
