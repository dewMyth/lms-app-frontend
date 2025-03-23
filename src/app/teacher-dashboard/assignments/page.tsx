"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CheckCircle, Download, Eye, FileText, Search } from "lucide-react";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { fetchData, postData } from "@/apiService";

// Define the assignment type
type Assignment = {
  id: string;
  title: string;
  student: string;
  grade: string;
  subject: string;
  submittedDate: string;
  status: "submitted" | "completed";
  fileUrl?: string;
  mark?: number;
  feedback?: string;
  studentId?: string;
};

// Initial assignments data
// const initialAssignments: Assignment[] = [
//   {
//     id: "1",
//     title: "Math Problem Set 12",
//     student: "Alex Johnson",
//     grade: "Grade 3",
//     subject: "Mathematics",
//     submittedDate: "2023-03-22T10:30:00",
//     status: "pending",
//     fileUrl: "#",
//   },
//   {
//     id: "2",
//     title: "Science Lab Report",
//     student: "Emma Smith",
//     grade: "Grade 3",
//     subject: "Science",
//     submittedDate: "2023-03-22T08:15:00",
//     status: "pending",
//     fileUrl: "#",
//   },
//   {
//     id: "3",
//     title: "Reading Comprehension",
//     student: "Noah Williams",
//     grade: "Grade 3",
//     subject: "English",
//     submittedDate: "2023-03-21T14:45:00",
//     status: "pending",
//     fileUrl: "#",
//   },
//   {
//     id: "4",
//     title: "History Essay",
//     student: "Olivia Brown",
//     grade: "Grade 3",
//     subject: "Social Studies",
//     submittedDate: "2023-03-21T11:20:00",
//     status: "pending",
//     fileUrl: "#",
//   },
//   {
//     id: "5",
//     title: "Spelling Test",
//     student: "William Davis",
//     grade: "Grade 3",
//     subject: "English",
//     submittedDate: "2023-03-20T09:10:00",
//     status: "graded",
//     fileUrl: "#",
//     mark: 85,
//     feedback:
//       "Good work on the spelling test. Keep practicing the words you missed.",
//   },
//   {
//     id: "6",
//     title: "Addition and Subtraction Quiz",
//     student: "Sophia Miller",
//     grade: "Grade 3",
//     subject: "Mathematics",
//     submittedDate: "2023-03-20T10:05:00",
//     status: "graded",
//     fileUrl: "#",
//     mark: 92,
//     feedback: "Excellent work! You've mastered addition and subtraction.",
//   },
// ];

// Form schema for grading assignments
const gradeFormSchema = z.object({
  mark: z.coerce.number().min(0).max(100),
  feedback: z.string().min(1, { message: "Feedback is required" }),
});

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isGradeDialogOpen, setIsGradeDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGrade, setFilterGrade] = useState<string>("all");
  const [filterSubject, setFilterSubject] = useState<string>("all");
  const { toast } = useToast();

  useEffect(() => {
    const fecthAssignments = async () => {
      const response = await fetchData("users/get-all-submitted-assignments");
      console.log(response);
      setAssignments(response);
    };

    fecthAssignments();
  }, []);

  // Form for grading assignments
  const gradeForm = useForm<z.infer<typeof gradeFormSchema>>({
    resolver: zodResolver(gradeFormSchema),
    defaultValues: {
      mark: 0,
      feedback: "",
    },
  });

  // Filter assignments based on search term and filters
  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch =
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.student.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGrade =
      filterGrade === "all" || assignment.grade === filterGrade;
    const matchesSubject =
      filterSubject === "all" || assignment.subject === filterSubject;

    return matchesSearch && matchesGrade && matchesSubject;
  });

  // Separate pending and graded assignments
  const pendingAssignments = filteredAssignments.filter(
    (assignment) => assignment.status === "submitted"
  );

  const gradedAssignments = filteredAssignments.filter(
    (assignment) => assignment.status === "completed"
  );

  // Handle viewing an assignment
  const handleViewAssignment = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setIsViewDialogOpen(true);
  };

  // Handle opening the grade dialog
  const handleOpenGradeDialog = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    gradeForm.reset({
      mark: assignment.mark || 0,
      feedback: assignment.feedback || "",
    });
    setIsGradeDialogOpen(true);
  };

  // Handle grading an assignment
  const handleGradeAssignment = async (
    values: z.infer<typeof gradeFormSchema>
  ) => {
    if (!selectedAssignment) return;

    console.log("Selected Assignment", selectedAssignment);

    const updatedAssignment = {
      ...selectedAssignment,
      status: "completed",
      mark: values.mark,
      feedback: values.feedback,
    };

    console.log("Selected Assignment", updatedAssignment);

    const response = await postData(
      `users/grading/${selectedAssignment.id}/${selectedAssignment.studentId}`,
      updatedAssignment
    );

    if (response) {
      toast({
        title: "Assignment graded",
        description: `You've successfully graded ${selectedAssignment.student}'s assignment.`,
      });
    }

    setTimeout(() => {
      // setAssignments(updatedAssignments);
      setIsGradeDialogOpen(false);
      setSelectedAssignment(null);
      window.location.reload();
    }, 2000);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
        <p className="text-muted-foreground">
          Review and grade student assignments
        </p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search assignments or students..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filterGrade} onValueChange={setFilterGrade}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Grade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Grades</SelectItem>
            <SelectItem value="1">Grade 1</SelectItem>
            <SelectItem value="2">Grade 2</SelectItem>
            <SelectItem value="3">Grade 3</SelectItem>
            <SelectItem value="4">Grade 4</SelectItem>
            <SelectItem value="5">Grade 5</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterSubject} onValueChange={setFilterSubject}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            <SelectItem value="Mathematics">Mathematics</SelectItem>
            <SelectItem value="sinhala">Sinhala</SelectItem>
            <SelectItem value="Science">Science</SelectItem>
            <SelectItem value="English">English</SelectItem>
            <SelectItem value="Social Studies">Social Studies</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Pending ({pendingAssignments.length})
          </TabsTrigger>
          <TabsTrigger value="graded" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Graded ({gradedAssignments.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Assignments</CardTitle>
              <CardDescription>
                Review and grade assignments submitted by students
              </CardDescription>
            </CardHeader>
            <CardContent>
              {pendingAssignments.length === 0 ? (
                <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
                  <p className="text-sm text-muted-foreground">
                    No pending assignments found
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingAssignments.map((assignment) => (
                    <div
                      key={assignment.id}
                      className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <h3 className="font-medium">{assignment.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {assignment.student} • {assignment.grade} •{" "}
                          {assignment.subject}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Submitted on {formatDate(assignment.submittedDate)}
                        </p>
                      </div>
                      <div className="flex flex-shrink-0 gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewAssignment(assignment)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleOpenGradeDialog(assignment)}
                        >
                          Grade
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="graded" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Graded Assignments</CardTitle>
              <CardDescription>
                View previously graded assignments
              </CardDescription>
            </CardHeader>
            <CardContent>
              {gradedAssignments.length === 0 ? (
                <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
                  <p className="text-sm text-muted-foreground">
                    No graded assignments found
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {gradedAssignments.map((assignment) => (
                    <div
                      key={assignment.id}
                      className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <h3 className="font-medium">{assignment.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {assignment.student} • {assignment.grade} •{" "}
                          {assignment.subject}
                        </p>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                            Mark: {assignment.mark}/100
                          </span>
                          <span className="text-muted-foreground">
                            Graded on {formatDate(assignment.submittedDate)}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-shrink-0 gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewAssignment(assignment)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenGradeDialog(assignment)}
                        >
                          Edit Grade
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View Assignment Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedAssignment?.title}</DialogTitle>
            <DialogDescription>
              Submitted by {selectedAssignment?.student} on{" "}
              {selectedAssignment &&
                formatDate(selectedAssignment.submittedDate)}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="mb-4 flex items-center justify-between">
                <div className="text-sm font-medium">Assignment Details</div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    window.open(selectedAssignment?.fileUrl, "_blank");
                  }}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Grade:</span>{" "}
                  {selectedAssignment?.grade}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Subject:</span>{" "}
                  {selectedAssignment?.subject}
                </div>
                {selectedAssignment?.status === "completed" && (
                  <>
                    <div className="text-sm">
                      <span className="font-medium">Mark:</span>{" "}
                      {selectedAssignment.mark}/100
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Feedback:</span>
                      <p className="mt-1 whitespace-pre-wrap rounded-md bg-muted p-2 text-sm">
                        {selectedAssignment.feedback}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
            {selectedAssignment?.status === "submitted" && (
              <Button
                className="w-full"
                onClick={() => {
                  setIsViewDialogOpen(false);
                  if (selectedAssignment) {
                    handleOpenGradeDialog(selectedAssignment);
                  }
                }}
              >
                Grade Assignment
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Grade Assignment Dialog */}
      <Dialog open={isGradeDialogOpen} onOpenChange={setIsGradeDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {selectedAssignment?.status === "completed"
                ? "Edit Grade"
                : "Grade Assignment"}
            </DialogTitle>
            <DialogDescription>
              {selectedAssignment?.title} by {selectedAssignment?.student}
            </DialogDescription>
          </DialogHeader>
          <Form {...gradeForm}>
            <form
              onSubmit={gradeForm.handleSubmit(handleGradeAssignment)}
              className="space-y-4"
            >
              <FormField
                control={gradeForm.control}
                name="mark"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mark (out of 100)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" max="100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={gradeForm.control}
                name="feedback"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Feedback</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Provide feedback to the student..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">
                  {selectedAssignment?.status === "completed"
                    ? "Update Grade"
                    : "Submit Grade"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
