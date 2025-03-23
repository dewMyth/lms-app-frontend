"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BookOpen, Edit, Plus, Trash } from "lucide-react";

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
import { fetchData, postData } from "@/apiService";

// Define the activity type
type Activity = {
  id: string;
  title: string;
  fileLink: string;
  grade: string;
  subject: string;
  term: string;
  activityType: string;
  description: string;
  createdAt: string;
  duration?: number;
};

// Initial activities data
// const initialActivities: Activity[] = [
//   {
//     id: "1",
//     title: "Multiplication Tables Quiz",
//     fileLink: "https://example.com/files/multiplication_quiz.pdf",
//     grade: "Grade 3",
//     subject: "Mathematics",
//     term: "Term 1",
//     activityType: "Quiz",
//     description: "A quiz covering multiplication tables from 1 to 10.",
//     createdAt: "2023-03-15T10:30:00",
//   },
//   {
//     id: "2",
//     title: "Plant Life Cycle Worksheet",
//     fileLink: "https://example.com/files/plant_lifecycle.pdf",
//     grade: "Grade 3",
//     subject: "Science",
//     term: "Term 1",
//     activityType: "Worksheet",
//     description:
//       "A worksheet to help students understand the plant life cycle.",
//     createdAt: "2023-03-10T14:15:00",
//   },
//   {
//     id: "3",
//     title: "Grammar Practice",
//     fileLink: "https://example.com/files/grammar_practice.pdf",
//     grade: "Grade 3",
//     subject: "English",
//     term: "Term 1",
//     activityType: "Exercise",
//     description: "Practice exercises for basic grammar rules.",
//     createdAt: "2023-03-05T09:45:00",
//   },
// ];

// Form schema for activities
const activityFormSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters" }),
  fileLink: z.string().url({ message: "Please enter a valid URL" }),
  grade: z.string({ required_error: "Please select a grade" }),
  subject: z.string({ required_error: "Please select a subject" }),
  term: z.string({ required_error: "Please select a term" }),
  activityType: z.string({ required_error: "Please select an activity type" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  duration: z
    .number()
    .int()
    .min(0, { message: "Duration must be a positive number" }),
  passMarks: z
    .number()
    .int()
    .min(0, { message: "Pass Marks must be a positive number" }),
});

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );
  const { toast } = useToast();

  useEffect(() => {
    const fecthAssignments = async () => {
      const response = await fetchData("subject-content/get-all-activities");
      console.log(response);
      setActivities(response);
    };

    fecthAssignments();
  }, []);

  // Form for adding a new activity
  const addForm = useForm<z.infer<typeof activityFormSchema>>({
    resolver: zodResolver(activityFormSchema),
    defaultValues: {
      title: "",
      fileLink: "",
      grade: "",
      subject: "",
      term: "",
      activityType: "",
      description: "",
      duration: 0,
    },
  });

  // Form for editing an existing activity
  const editForm = useForm<z.infer<typeof activityFormSchema>>({
    resolver: zodResolver(activityFormSchema),
    defaultValues: {
      title: "",
      fileLink: "",
      grade: "",
      subject: "",
      term: "",
      activityType: "",
      description: "",
      duration: 0,
    },
  });

  // Handle adding a new activity
  const handleAddActivity = async (
    values: z.infer<typeof activityFormSchema>
  ) => {
    const newActivity: Activity = {
      id: Date.now().toString(),
      ...values,
      createdAt: new Date().toISOString(),
    };

    console.log(newActivity);

    const response = await postData(
      "subject-content/create-activity",
      newActivity
    );
    setActivities([newActivity, ...activities]);
    setIsAddDialogOpen(false);
    addForm.reset();
    toast({
      title: "Activity created",
      description: `${values.title} has been created successfully.`,
    });

    if (response) {
      window.location.reload();
    }
  };

  // Handle editing an existing activity
  const handleEditActivity = (values: z.infer<typeof activityFormSchema>) => {
    if (!selectedActivity) return;

    const updatedActivities = activities.map((activity) =>
      activity.id === selectedActivity.id
        ? {
            ...activity,
            ...values,
          }
        : activity
    );

    setActivities(updatedActivities);
    setIsEditDialogOpen(false);
    setSelectedActivity(null);

    toast({
      title: "Activity updated",
      description: `${values.title} has been updated successfully.`,
    });
  };

  // Handle deleting an activity
  const handleDeleteActivity = () => {
    if (!selectedActivity) return;

    const updatedActivities = activities.filter(
      (activity) => activity.id !== selectedActivity.id
    );

    setActivities(updatedActivities);
    setIsDeleteDialogOpen(false);
    setSelectedActivity(null);

    toast({
      title: "Activity deleted",
      description: `${selectedActivity.title} has been deleted.`,
      variant: "destructive",
    });
  };

  // Open edit dialog and populate form with activity data
  const openEditDialog = (activity: Activity) => {
    setSelectedActivity(activity);
    editForm.reset({
      title: activity.title,
      fileLink: activity.fileLink,
      grade: activity.grade,
      subject: activity.subject,
      term: activity.term,
      activityType: activity.activityType,
      description: activity.description,
    });
    setIsEditDialogOpen(true);
  };

  // Open delete dialog
  const openDeleteDialog = (activity: Activity) => {
    setSelectedActivity(activity);
    setIsDeleteDialogOpen(true);
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

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Activities</h1>
          <p className="text-muted-foreground">
            Create and manage learning activities
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Activity
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Activity</DialogTitle>
              <DialogDescription>
                Create a new learning activity for your students
              </DialogDescription>
            </DialogHeader>
            <Form {...addForm}>
              <form
                onSubmit={addForm.handleSubmit(handleAddActivity)}
                className="space-y-4"
              >
                <FormField
                  control={addForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Activity title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addForm.control}
                  name="fileLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>File Link</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/file.pdf"
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
                            <SelectItem value="1">Grade 1</SelectItem>
                            <SelectItem value="2">Grade 2</SelectItem>
                            <SelectItem value="3">Grade 3</SelectItem>
                            <SelectItem value="4">Grade 4</SelectItem>
                            <SelectItem value="5">Grade 5</SelectItem>
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
                            <SelectItem value="mathematics">
                              Mathematics
                            </SelectItem>
                            <SelectItem value="environment">
                              Environment
                            </SelectItem>
                            {/* <SelectItem value="English">English</SelectItem> */}
                            <SelectItem value="sinhala">Sinhala</SelectItem>
                            <SelectItem value="term-test">
                              Term Test Papers
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={addForm.control}
                    name="term"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Term</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select term" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">Term 1</SelectItem>
                            <SelectItem value="2">Term 2</SelectItem>
                            <SelectItem value="3">Term 3</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addForm.control}
                    name="activityType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Activity Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Assignment">
                              Assignment
                            </SelectItem>
                            <SelectItem value="Quiz">Quiz</SelectItem>
                            <SelectItem value="Worksheet">Worksheet</SelectItem>
                            <SelectItem value="Exercise">Exercise</SelectItem>
                            <SelectItem value="Project">Project</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={addForm.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={0}
                            max={100}
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            } // Convert to number
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addForm.control}
                    name="passMarks"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pass Marks</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={0}
                            max={100}
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            } // Convert to number
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* <FormField
                    control={addForm.control}
                    name="activityType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Activity Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Assignment">
                              Assignment
                            </SelectItem>
                            <SelectItem value="Quiz">Quiz</SelectItem>
                            <SelectItem value="Worksheet">Worksheet</SelectItem>
                            <SelectItem value="Exercise">Exercise</SelectItem>
                            <SelectItem value="Project">Project</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                </div>
                <FormField
                  control={addForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the activity..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Create Activity</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Activities</CardTitle>
          <CardDescription>
            View and manage learning activities for your students
          </CardDescription>
        </CardHeader>
        <CardContent>
          {activities.length === 0 ? (
            <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
              <p className="text-sm text-muted-foreground">
                No activities found
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <h3 className="font-medium">{activity.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                        {activity.grade}
                      </span>
                      <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                        {activity.subject}
                      </span>
                      <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                        {activity.term}
                      </span>
                      <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                        {activity.activityType}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Created on {formatDate(activity.createdAt)}
                    </p>
                  </div>
                  <div className="flex flex-shrink-0 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(activity)}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => openDeleteDialog(activity)}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Activity Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Activity</DialogTitle>
            <DialogDescription>
              Update the details of this learning activity
            </DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form
              onSubmit={editForm.handleSubmit(handleEditActivity)}
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
                name="fileLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>File Link</FormLabel>
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
                          <SelectItem value="1">Grade 1</SelectItem>
                          <SelectItem value="2">Grade 2</SelectItem>
                          <SelectItem value="3">Grade 3</SelectItem>
                          <SelectItem value="4">Grade 4</SelectItem>
                          <SelectItem value="5">Grade 5</SelectItem>
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
                          <SelectItem value="sinhala">Sinhala</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={editForm.control}
                  name="term"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Term</FormLabel>
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
                          <SelectItem value="1">Term 1</SelectItem>
                          <SelectItem value="2">Term 2</SelectItem>
                          <SelectItem value="3">Term 3</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="activityType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Activity Type</FormLabel>
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
                          <SelectItem value="Assignment">Assignment</SelectItem>
                          <SelectItem value="Quiz">Quiz</SelectItem>
                          <SelectItem value="Worksheet">Worksheet</SelectItem>
                          <SelectItem value="Exercise">Exercise</SelectItem>
                          <SelectItem value="Project">Project</SelectItem>
                          <SelectItem value="matching">Matching</SelectItem>
                          <SelectItem value="drawing">Drawing</SelectItem>
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
              <DialogFooter>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Activity Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Activity</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedActivity?.title}? This
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
            <Button variant="destructive" onClick={handleDeleteActivity}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
