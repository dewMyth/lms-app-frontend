"use client";

import { useState, useEffect } from "react";
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
import { Search, Plus, Edit, Trash2, ExternalLink } from "lucide-react";
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

interface Assignment {
  id: string;
  title: string;
  file_link: string;
  grade: string;
  subject: string;
  term: string;
  activityType: string;
}

// Mock data
const mockAssignments: Assignment[] = [
  {
    id: "1",
    title: "Algebra Fundamentals",
    file_link:
      "https://drive.google.com/file/d/1RGWAsSCtLWBUGdmAzKypYmr42-N9YKCh/view",
    grade: "Grade 10",
    subject: "Mathematics",
    term: "Term 1",
    activityType: "Homework",
  },
  {
    id: "2",
    title: "Cell Biology Lab Report",
    file_link:
      "https://drive.google.com/file/d/2ABCdefGHIJKLMNOPQRSTUVWXYZ123456/view",
    grade: "Grade 11",
    subject: "Biology",
    term: "Term 2",
    activityType: "Lab Work",
  },
  {
    id: "3",
    title: "Shakespeare Essay",
    file_link:
      "https://drive.google.com/file/d/3XYZabcDEFGHIJKLMNOPQRSTUVWXYZ789/view",
    grade: "Grade 12",
    subject: "English",
    term: "Term 1",
    activityType: "Essay",
  },
];

export default function AssignmentsManagement() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(
    null
  );
  const [newAssignment, setNewAssignment] = useState<Partial<Assignment>>({});

  useEffect(() => {
    const fetchAllStudents = async () => {
      try {
        const response = await fetchData(`subject-content/get-all-activities`);
        if (Array.isArray(response)) {
          setAssignments(response);
        } else {
          console.error("Invalid response format:", response);
          setAssignments([]);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
        setAssignments([]);
      }
    };

    fetchAllStudents();
  }, []);

  const filteredAssignments = assignments.filter(
    (assignment) =>
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.activityType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAssignment = () => {
    if (newAssignment.title && newAssignment.file_link) {
      const assignment: Assignment = {
        id: Date.now().toString(),
        title: newAssignment.title || "",
        file_link: newAssignment.file_link || "",
        grade: newAssignment.grade || "",
        subject: newAssignment.subject || "",
        term: newAssignment.term || "",
        activityType: newAssignment.activityType || "",
      };
      setAssignments([...assignments, assignment]);
      setNewAssignment({});
      setIsAddDialogOpen(false);
    }
  };

  const handleEditAssignment = (assignment: Assignment) => {
    setEditingAssignment(assignment);
    setNewAssignment(assignment);
  };

  const handleUpdateAssignment = () => {
    if (editingAssignment && newAssignment.title && newAssignment.file_link) {
      setAssignments(
        assignments.map((a) =>
          a.id === editingAssignment.id
            ? ({ ...editingAssignment, ...newAssignment } as Assignment)
            : a
        )
      );
      setEditingAssignment(null);
      setNewAssignment({});
    }
  };

  const handleDeleteAssignment = (id: string) => {
    setAssignments(assignments.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Assignments Management
          </h1>
          <p className="text-muted-foreground">
            Manage all assignments in your LMS
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assignments ({assignments.length})</CardTitle>
          <CardDescription>
            View and manage all course assignments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-72">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search assignments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Assignment
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Assignment</DialogTitle>
                  <DialogDescription>
                    Enter the assignment details below
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="title"
                      value={newAssignment.title || ""}
                      onChange={(e) =>
                        setNewAssignment({
                          ...newAssignment,
                          title: e.target.value,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="file_link" className="text-right">
                      File Link
                    </Label>
                    <Textarea
                      id="file_link"
                      value={newAssignment.file_link || ""}
                      onChange={(e) =>
                        setNewAssignment({
                          ...newAssignment,
                          file_link: e.target.value,
                        })
                      }
                      className="col-span-3"
                      placeholder="https://drive.google.com/file/d/..."
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="subject" className="text-right">
                      Subject
                    </Label>
                    <Select
                      value={newAssignment.subject || ""}
                      onValueChange={(value) =>
                        setNewAssignment({ ...newAssignment, subject: value })
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
                      value={newAssignment.grade || ""}
                      onValueChange={(value) =>
                        setNewAssignment({ ...newAssignment, grade: value })
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
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="term" className="text-right">
                      Term
                    </Label>
                    <Select
                      value={newAssignment.term || ""}
                      onValueChange={(value) =>
                        setNewAssignment({ ...newAssignment, term: value })
                      }
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select term" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Term 1">Term 1</SelectItem>
                        <SelectItem value="Term 2">Term 2</SelectItem>
                        <SelectItem value="Term 3">Term 3</SelectItem>
                        <SelectItem value="Term 4">Term 4</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="activityType" className="text-right">
                      Activity Type
                    </Label>
                    <Select
                      value={newAssignment.activityType || ""}
                      onValueChange={(value) =>
                        setNewAssignment({
                          ...newAssignment,
                          activityType: value,
                        })
                      }
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select activity type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Homework">Homework</SelectItem>
                        <SelectItem value="Lab Work">Lab Work</SelectItem>
                        <SelectItem value="Essay">Essay</SelectItem>
                        <SelectItem value="Project">Project</SelectItem>
                        <SelectItem value="Quiz">Quiz</SelectItem>
                        <SelectItem value="Exam">Exam</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddAssignment}>Add Assignment</Button>
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
                  <TableHead>Term</TableHead>
                  <TableHead>Activity Type</TableHead>
                  <TableHead>File</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssignments.map((assignment) => (
                  <TableRow key={assignment.id}>
                    <TableCell className="font-medium">
                      {assignment.title}
                    </TableCell>
                    <TableCell>{assignment.subject}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{assignment.grade}</Badge>
                    </TableCell>
                    <TableCell>{assignment.term}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{assignment.activityType}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" asChild>
                        <a
                          href={assignment.file_link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Dialog
                          open={editingAssignment?.id === assignment.id}
                          onOpenChange={(open) =>
                            !open && setEditingAssignment(null)
                          }
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleEditAssignment(assignment)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Edit Assignment</DialogTitle>
                              <DialogDescription>
                                Update assignment information
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
                                  value={newAssignment.title || ""}
                                  onChange={(e) =>
                                    setNewAssignment({
                                      ...newAssignment,
                                      title: e.target.value,
                                    })
                                  }
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="edit-file-link"
                                  className="text-right"
                                >
                                  File Link
                                </Label>
                                <Textarea
                                  id="edit-file-link"
                                  value={newAssignment.file_link || ""}
                                  onChange={(e) =>
                                    setNewAssignment({
                                      ...newAssignment,
                                      file_link: e.target.value,
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
                                  value={newAssignment.subject || ""}
                                  onValueChange={(value) =>
                                    setNewAssignment({
                                      ...newAssignment,
                                      subject: value,
                                    })
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
                                  value={newAssignment.grade || ""}
                                  onValueChange={(value) =>
                                    setNewAssignment({
                                      ...newAssignment,
                                      grade: value,
                                    })
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
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="edit-term"
                                  className="text-right"
                                >
                                  Term
                                </Label>
                                <Select
                                  value={newAssignment.term || ""}
                                  onValueChange={(value) =>
                                    setNewAssignment({
                                      ...newAssignment,
                                      term: value,
                                    })
                                  }
                                >
                                  <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select term" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Term 1">
                                      Term 1
                                    </SelectItem>
                                    <SelectItem value="Term 2">
                                      Term 2
                                    </SelectItem>
                                    <SelectItem value="Term 3">
                                      Term 3
                                    </SelectItem>
                                    <SelectItem value="Term 4">
                                      Term 4
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="edit-activity-type"
                                  className="text-right"
                                >
                                  Activity Type
                                </Label>
                                <Select
                                  value={newAssignment.activityType || ""}
                                  onValueChange={(value) =>
                                    setNewAssignment({
                                      ...newAssignment,
                                      activityType: value,
                                    })
                                  }
                                >
                                  <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select activity type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Homework">
                                      Homework
                                    </SelectItem>
                                    <SelectItem value="Lab Work">
                                      Lab Work
                                    </SelectItem>
                                    <SelectItem value="Essay">Essay</SelectItem>
                                    <SelectItem value="Project">
                                      Project
                                    </SelectItem>
                                    <SelectItem value="Quiz">Quiz</SelectItem>
                                    <SelectItem value="Exam">Exam</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button onClick={handleUpdateAssignment}>
                                Update Assignment
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
                                permanently delete the assignment.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() =>
                                  handleDeleteAssignment(assignment.id)
                                }
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
