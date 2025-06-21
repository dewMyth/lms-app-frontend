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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
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
import { fetchData } from "@/apiService";

interface Student {
  id: string;
  email: string;
  username: string;
  parents_email: string;
  no_of_assignments: number;
  grade: string;
  avatar: string;
}

// Mock data
const mockStudents: Student[] = [
  {
    id: "1",
    email: "jimmysmith@gmail.com",
    username: "Jimmy Smith",
    parents_email: "johnsmith@gmail.com",
    no_of_assignments: 12,
    grade: "Grade 10",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    email: "sarah.johnson@gmail.com",
    username: "Sarah Johnson",
    parents_email: "mike.johnson@gmail.com",
    no_of_assignments: 8,
    grade: "Grade 9",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    email: "alex.brown@gmail.com",
    username: "Alex Brown",
    parents_email: "lisa.brown@gmail.com",
    no_of_assignments: 15,
    grade: "Grade 11",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

export default function StudentsManagement() {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [newStudent, setNewStudent] = useState<Partial<Student>>({});

  useEffect(() => {
    const fetchAllStudents = async () => {
      try {
        const response = await fetchData(`users/get-all-students`);
        if (Array.isArray(response)) {
          setStudents(response);
        } else {
          console.error("Invalid response format:", response);
          setStudents([]);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
        setStudents([]);
      }
    };

    fetchAllStudents();
  }, []);

  const filteredStudents = students.filter(
    (student) =>
      student.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStudent = () => {
    if (newStudent.username && newStudent.email) {
      const student: Student = {
        id: Date.now().toString(),
        email: newStudent.email || "",
        username: newStudent.username || "",
        parents_email: newStudent.parents_email || "",
        no_of_assignments: newStudent.no_of_assignments || 0,
        grade: newStudent.grade || "",
        avatar: "/placeholder.svg?height=40&width=40",
      };
      setStudents([...students, student]);
      setNewStudent({});
      setIsAddDialogOpen(false);
    }
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setNewStudent(student);
  };

  const handleUpdateStudent = () => {
    if (editingStudent && newStudent.username && newStudent.email) {
      setStudents(
        students.map((s) =>
          s.id === editingStudent.id
            ? ({ ...editingStudent, ...newStudent } as Student)
            : s
        )
      );
      setEditingStudent(null);
      setNewStudent({});
    }
  };

  const handleDeleteStudent = async (id: string) => {
    console.log(id);

    try {
      //   await fetchData(`users/delete-student/${id}`, {
      //     method: "DELETE",
      //   });

      setStudents(students.filter((s) => s.id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Students Management
          </h1>
          <p className="text-muted-foreground">
            Manage all enrolled students in your LMS
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Students ({students.length})</CardTitle>
          <CardDescription>
            View and manage all student accounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-72">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Student
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Student</DialogTitle>
                  <DialogDescription>
                    Enter the student details below
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Username
                    </Label>
                    <Input
                      id="username"
                      value={newStudent.username || ""}
                      onChange={(e) =>
                        setNewStudent({
                          ...newStudent,
                          username: e.target.value,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={newStudent.email || ""}
                      onChange={(e) =>
                        setNewStudent({ ...newStudent, email: e.target.value })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="parents_email" className="text-right">
                      Parent Email
                    </Label>
                    <Input
                      id="parents_email"
                      type="email"
                      value={newStudent.parents_email || ""}
                      onChange={(e) =>
                        setNewStudent({
                          ...newStudent,
                          parents_email: e.target.value,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="grade" className="text-right">
                      Grade
                    </Label>
                    <Select
                      value={newStudent.grade || ""}
                      onValueChange={(value) =>
                        setNewStudent({ ...newStudent, grade: value })
                      }
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Grade 9">Grade 9</SelectItem>
                        <SelectItem value="Grade 10">Grade 10</SelectItem>
                        <SelectItem value="Grade 11">Grade 11</SelectItem>
                        <SelectItem value="Grade 12">Grade 12</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddStudent}>Add Student</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Parent Email</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Assignments</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage
                          src={student.avatar || "/placeholder.svg"}
                        />
                        <AvatarFallback>
                          {student.username
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{student.username}</span>
                    </TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.parents_email}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{student.grade}</Badge>
                    </TableCell>
                    <TableCell>{student.no_of_assignments}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Dialog
                          open={editingStudent?.id === student.id}
                          onOpenChange={(open) =>
                            !open && setEditingStudent(null)
                          }
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleEditStudent(student)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Student</DialogTitle>
                              <DialogDescription>
                                Update student information
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="edit-username"
                                  className="text-right"
                                >
                                  Username
                                </Label>
                                <Input
                                  id="edit-username"
                                  value={newStudent.username || ""}
                                  onChange={(e) =>
                                    setNewStudent({
                                      ...newStudent,
                                      username: e.target.value,
                                    })
                                  }
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="edit-email"
                                  className="text-right"
                                >
                                  Email
                                </Label>
                                <Input
                                  id="edit-email"
                                  type="email"
                                  value={newStudent.email || ""}
                                  onChange={(e) =>
                                    setNewStudent({
                                      ...newStudent,
                                      email: e.target.value,
                                    })
                                  }
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="edit-parents-email"
                                  className="text-right"
                                >
                                  Parent Email
                                </Label>
                                <Input
                                  id="edit-parents-email"
                                  type="email"
                                  value={newStudent.parents_email || ""}
                                  onChange={(e) =>
                                    setNewStudent({
                                      ...newStudent,
                                      parents_email: e.target.value,
                                    })
                                  }
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="edit-grade"
                                  className="text-right"
                                >
                                  Grade
                                </Label>
                                <Select
                                  value={newStudent.grade || ""}
                                  onValueChange={(value) =>
                                    setNewStudent({
                                      ...newStudent,
                                      grade: value,
                                    })
                                  }
                                >
                                  <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select grade" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Grade 9">
                                      Grade 9
                                    </SelectItem>
                                    <SelectItem value="Grade 10">
                                      Grade 10
                                    </SelectItem>
                                    <SelectItem value="Grade 11">
                                      Grade 11
                                    </SelectItem>
                                    <SelectItem value="Grade 12">
                                      Grade 12
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button onClick={handleUpdateStudent}>
                                Update Student
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
                                permanently delete the student account.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteStudent(student.id)}
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
