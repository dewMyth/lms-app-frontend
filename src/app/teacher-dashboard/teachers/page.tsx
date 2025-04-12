"use client";

import { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";

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
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { fetchData, postData } from "@/apiService";

// Define the teacher type
type Teacher = {
  id: string;
  name: string;
  email: string;
  grade: string;
  subject: string;
  role: string;
  status: "active" | "inactive";
};

// Initial teachers data
// const initialTeachers: Teacher[] = [
//   {
//     id: "1",
//     name: "Sarah Johnson",
//     email: "sarah.johnson@example.com",
//     grade: "Grade 3",
//     subject: "All Subjects",
//     role: "Head Teacher",
//     status: "active",
//   },
//   {
//     id: "2",
//     name: "Michael Brown",
//     email: "michael.brown@example.com",
//     grade: "Grade 1",
//     subject: "All Subjects",
//     role: "Teacher",
//     status: "active",
//   },
//   {
//     id: "3",
//     name: "Emily Davis",
//     email: "emily.davis@example.com",
//     grade: "Grade 2",
//     subject: "All Subjects",
//     role: "Teacher",
//     status: "active",
//   },
//   {
//     id: "4",
//     name: "David Wilson",
//     email: "david.wilson@example.com",
//     grade: "Grade 4",
//     subject: "All Subjects",
//     role: "Teacher",
//     status: "active",
//   },
//   {
//     id: "5",
//     name: "Jessica Martinez",
//     email: "jessica.martinez@example.com",
//     grade: "Grade 5",
//     subject: "All Subjects",
//     role: "Teacher",
//     status: "active",
//   },
// ];

// Form schema for adding/editing teachers
const teacherFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  grade: z.string({ required_error: "Please select a grade" }),
  subject: z.string({ required_error: "Please select a subject" }),
  role: z.string({ required_error: "Please select a role" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .optional(),
});

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAllTeachers = async () => {
      const response = await fetchData(`users/get-all-teachers`);
      console.log(response);
      setTeachers(response);
    };

    fetchAllTeachers();
  }, []);

  // Form for adding a new teacher
  const addForm = useForm<z.infer<typeof teacherFormSchema>>({
    resolver: zodResolver(teacherFormSchema),
    defaultValues: {
      name: "",
      email: "",
      grade: "",
      subject: "",
      role: "",
      password: "",
    },
  });

  // Form for editing an existing teacher
  const editForm = useForm<z.infer<typeof teacherFormSchema>>({
    resolver: zodResolver(teacherFormSchema),
    defaultValues: {
      name: "",
      email: "",
      grade: "",
      subject: "",
      role: "",
    },
  });

  // Handle adding a new teacher
  const handleAddTeacher = async (
    values: z.infer<typeof teacherFormSchema>
  ) => {
    const newTeacher: Teacher = {
      id: Date.now().toString(),
      name: values.name,
      email: values.email,
      grade: values.grade,
      subject: values.subject,
      role: values.role,
      status: "active",
    };

    const newTeacherFormatted = {
      username: values.name,
      password: values.password,
      email: values.email,
      grade: values.grade,
      subject: values.subject,
      role: values.role,
    };
    console.log(newTeacherFormatted);

    const res = await postData("users/create-teacher", newTeacherFormatted);

    setTeachers([...teachers, newTeacher]);
    setIsAddDialogOpen(false);
    addForm.reset();

    toast({
      title: "Teacher added",
      description: `${values.name} has been added successfully.`,
    });
  };

  // Handle editing an existing teacher
  const handleEditTeacher = (values: z.infer<typeof teacherFormSchema>) => {
    if (!selectedTeacher) return;

    const updatedTeachers = teachers.map((teacher) =>
      teacher.id === selectedTeacher.id
        ? {
            ...teacher,
            name: values.name,
            email: values.email,
            grade: values.grade,
            subject: values.subject,
            role: values.role,
          }
        : teacher
    );

    setTeachers(updatedTeachers);
    setIsEditDialogOpen(false);
    setSelectedTeacher(null);

    toast({
      title: "Teacher updated",
      description: `${values.name}'s information has been updated.`,
    });
  };

  // Handle deleting a teacher
  const handleDeleteTeacher = () => {
    if (!selectedTeacher) return;

    const updatedTeachers = teachers.filter(
      (teacher) => teacher.id !== selectedTeacher.id
    );

    setTeachers(updatedTeachers);
    setIsDeleteDialogOpen(false);
    setSelectedTeacher(null);

    toast({
      title: "Teacher deleted",
      description: `${selectedTeacher.name} has been removed.`,
      variant: "destructive",
    });
  };

  // Open edit dialog and populate form with teacher data
  const openEditDialog = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    editForm.reset({
      name: teacher.name,
      email: teacher.email,
      grade: teacher.grade,
      subject: teacher.subject,
      role: teacher.role,
    });
    setIsEditDialogOpen(true);
  };

  // Open delete dialog
  const openDeleteDialog = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Teachers</h1>
          <p className="text-muted-foreground">Manage teacher accounts</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Teacher
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Teacher</DialogTitle>
              <DialogDescription>
                Create a new teacher account. The teacher will receive an email
                with login instructions.
              </DialogDescription>
            </DialogHeader>
            <Form {...addForm}>
              <form
                onSubmit={addForm.handleSubmit(handleAddTeacher)}
                className="space-y-4"
              >
                <FormField
                  control={addForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john.doe@example.com" {...field} />
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
                            <SelectItem value="All Subjects">
                              All Subjects
                            </SelectItem>
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
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Teacher">Teacher</SelectItem>
                          <SelectItem value="Head Teacher">
                            Head Teacher
                          </SelectItem>
                          <SelectItem value="Administrator">
                            Administrator
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Initial Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Add Teacher</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Teacher List</CardTitle>
          <CardDescription>
            View and manage all teachers in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-md border">
              <div className="grid grid-cols-6 bg-muted/50 p-4 text-sm font-medium">
                <div>Name</div>
                <div>Email</div>
                <div>Grade</div>
                <div>Subject</div>
                <div>Role</div>
                <div className="text-right">Actions</div>
              </div>
              {teachers.map((teacher) => (
                <div
                  key={teacher.id}
                  className="grid grid-cols-6 items-center p-4 text-sm border-t"
                >
                  <div className="font-medium">{teacher.name}</div>
                  <div>{teacher.email}</div>
                  <div>{teacher.grade}</div>
                  <div>{teacher.subject}</div>
                  <div>{teacher.role}</div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(teacher)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => openDeleteDialog(teacher)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Teacher Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Teacher</DialogTitle>
            <DialogDescription>Update teacher information</DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form
              onSubmit={editForm.handleSubmit(handleEditTeacher)}
              className="space-y-4"
            >
              <FormField
                control={editForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
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
                          <SelectItem value="All Subjects">
                            All Subjects
                          </SelectItem>
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
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
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
                        <SelectItem value="Teacher">Teacher</SelectItem>
                        <SelectItem value="Head Teacher">
                          Head Teacher
                        </SelectItem>
                        <SelectItem value="Administrator">
                          Administrator
                        </SelectItem>
                      </SelectContent>
                    </Select>
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

      {/* Delete Teacher Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Teacher</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedTeacher?.name}? This
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
            <Button variant="destructive" onClick={handleDeleteTeacher}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
