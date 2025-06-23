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
import { fetchData, postData } from "@/apiService";
import { toast } from "sonner";

interface Teacher {
  id: string;
  email: string;
  username: string;
  grade: string;
  subject: string;
  avatar: string;
  status: "active" | "inactive";
}

// Mock data
const mockTeachers: Teacher[] = [
  {
    id: "1",
    email: "sarah.wilson@school.edu",
    username: "Sarah Wilson",
    grade: "Grade 10",
    subject: "Mathematics",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
  },
  {
    id: "2",
    email: "john.davis@school.edu",
    username: "John Davis",
    grade: "Grade 9",
    subject: "Science",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
  },
  {
    id: "3",
    email: "emily.clark@school.edu",
    username: "Emily Clark",
    grade: "Grade 11",
    subject: "English",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "inactive",
  },
];

export default function TeachersManagement() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [newTeacher, setNewTeacher] = useState<Partial<Teacher>>({});

  useEffect(() => {
    const fetchAllStudents = async () => {
      try {
        const response = await fetchData(`users/get-all-teachers`);
        if (Array.isArray(response)) {
          setTeachers(response);
        } else {
          console.error("Invalid response format:", response);
          setTeachers([]);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
        setTeachers([]);
      }
    };

    fetchAllStudents();
  }, []);

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.grade?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTeacher = async () => {
    if (newTeacher.username && newTeacher.email) {
      const teacher: Teacher = {
        id: Date.now().toString(),
        email: newTeacher.email || "",
        username: newTeacher.username || "",
        grade: newTeacher.grade || "",
        subject: newTeacher.subject || "",
        avatar: "",
        status: (newTeacher.status as "active" | "inactive") || "active",
      };
      setTeachers([...teachers, teacher]);

      const response = await postData(`users/create-teacher`, {
        email: newTeacher.email || "",
        username: newTeacher.username || "",
        password: "12345678",
        grade: newTeacher.grade || "",
        subject: newTeacher.subject || "",
        role: "Teacher",
        status: (newTeacher.status as "active" | "inactive") || "active",
      });

      if (response.status === 200) {
        toast.success("Teacher created successfully");
      } else {
        toast.error("Failed to create teacher");
      }

      setNewTeacher({});
      setIsAddDialogOpen(false);
    }
  };

  const handleEditTeacher = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setNewTeacher(teacher);
  };

  const handleUpdateTeacher = () => {
    if (editingTeacher && newTeacher.username && newTeacher.email) {
      setTeachers(
        teachers.map((t) =>
          t.id === editingTeacher.id
            ? ({ ...editingTeacher, ...newTeacher } as Teacher)
            : t
        )
      );
      setEditingTeacher(null);
      setNewTeacher({});
    }
  };

  const handleDeleteTeacher = (id: string) => {
    setTeachers(teachers.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Teachers Management
          </h1>
          <p className="text-muted-foreground">
            Manage all teaching staff in your LMS
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Teachers ({teachers.length})</CardTitle>
          <CardDescription>
            View and manage all teacher accounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-72">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search teachers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Teacher
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Teacher</DialogTitle>
                  <DialogDescription>
                    Enter the teacher details below (Default Password: 12345678)
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Username
                    </Label>
                    <Input
                      id="username"
                      value={newTeacher.username || ""}
                      onChange={(e) =>
                        setNewTeacher({
                          ...newTeacher,
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
                      value={newTeacher.email || ""}
                      onChange={(e) =>
                        setNewTeacher({ ...newTeacher, email: e.target.value })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="subject" className="text-right">
                      Subject
                    </Label>
                    <Select
                      value={newTeacher.subject || ""}
                      onValueChange={(value) =>
                        setNewTeacher({ ...newTeacher, subject: value })
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
                      value={newTeacher.grade || ""}
                      onValueChange={(value) =>
                        setNewTeacher({ ...newTeacher, grade: value })
                      }
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Grade 1">Grade 1</SelectItem>
                        <SelectItem value="Grade 2">Grade 2</SelectItem>
                        <SelectItem value="Grade 3">Grade 3</SelectItem>
                        <SelectItem value="Grade 4">Grade 4</SelectItem>
                        <SelectItem value="Grade 5">Grade 5</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                    <Select
                      value={newTeacher.status || "active"}
                      onValueChange={(value) =>
                        setNewTeacher({
                          ...newTeacher,
                          status: value as "active" | "inactive",
                        })
                      }
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddTeacher}>Add Teacher</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage
                          src={teacher.avatar || "/placeholder.svg"}
                        />
                        <AvatarFallback>
                          {teacher?.username
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{teacher.username}</span>
                    </TableCell>
                    <TableCell>{teacher.email}</TableCell>
                    <TableCell>{teacher.subject}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{teacher.grade}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          teacher.status === "active" ? "default" : "secondary"
                        }
                      >
                        {teacher.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Dialog
                          open={editingTeacher?.id === teacher.id}
                          onOpenChange={(open) =>
                            !open && setEditingTeacher(null)
                          }
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleEditTeacher(teacher)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Teacher</DialogTitle>
                              <DialogDescription>
                                Update teacher information
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
                                  value={newTeacher.username || ""}
                                  onChange={(e) =>
                                    setNewTeacher({
                                      ...newTeacher,
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
                                  value={newTeacher.email || ""}
                                  onChange={(e) =>
                                    setNewTeacher({
                                      ...newTeacher,
                                      email: e.target.value,
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
                                  value={newTeacher.subject || ""}
                                  onValueChange={(value) =>
                                    setNewTeacher({
                                      ...newTeacher,
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
                                  value={newTeacher.grade || ""}
                                  onValueChange={(value) =>
                                    setNewTeacher({
                                      ...newTeacher,
                                      grade: value,
                                    })
                                  }
                                >
                                  <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select grade" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Grade 1">
                                      Grade 1
                                    </SelectItem>
                                    <SelectItem value="Grade 2">
                                      Grade 2
                                    </SelectItem>
                                    <SelectItem value="Grade 3">
                                      Grade 3
                                    </SelectItem>
                                    <SelectItem value="Grade 4">
                                      Grade 4
                                    </SelectItem>
                                    <SelectItem value="Grade 5">
                                      Grade 5
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="edit-status"
                                  className="text-right"
                                >
                                  Status
                                </Label>
                                <Select
                                  value={newTeacher.status || "active"}
                                  onValueChange={(value) =>
                                    setNewTeacher({
                                      ...newTeacher,
                                      status: value as "active" | "inactive",
                                    })
                                  }
                                >
                                  <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="active">
                                      Active
                                    </SelectItem>
                                    <SelectItem value="inactive">
                                      Inactive
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button onClick={handleUpdateTeacher}>
                                Update Teacher
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
                                permanently delete the teacher account.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteTeacher(teacher.id)}
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
