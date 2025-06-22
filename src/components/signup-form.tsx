"use client";

import type React from "react";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router";
import {
  AlertCircle,
  Eye,
  EyeOff,
  Mail,
  User,
  Lock,
  UserPlus,
  ArrowRight,
  Loader2,
  GraduationCap,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { postData } from "@/apiService";

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    grade: "",
    password: "",
    rePassword: "",
    parentName: "",
    parentEmail: "",
  });

  // UI state
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Clear field-specific error when user types
    if (formErrors[id]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }

    // Clear general error message
    if (error) setError("");
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, grade: value }));

    // Clear field-specific error when user selects
    if (formErrors.grade) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.grade;
        return newErrors;
      });
    }

    // Clear general error message
    if (error) setError("");
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    // Email validation
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Username validation
    if (!formData.username) {
      errors.username = "Username is required";
    } else if (formData.username.length < 3) {
      errors.username = "Username must be at least 3 characters";
    }

    // Grade validation
    if (!formData.grade) {
      errors.grade = "Grade is required";
    }

    // Password validation
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    // Confirm password validation
    if (formData.password !== formData.rePassword) {
      errors.rePassword = "Passwords do not match";
    }

    // Parent email validation
    if (!formData.parentEmail) {
      errors.parentEmail = "Parent's email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.parentEmail)) {
      errors.parentEmail = "Please enter a valid email address";
    }

    // Parent name validation
    if (!formData.parentName) {
      errors.parentName = "Parent's name is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setError("");

    const signupData = {
      username: formData.username,
      email: formData.email,
      grade: formData.grade,
      password: formData.password,
      parentName: formData.parentName,
      parentEmail: formData.parentEmail,
    };

    console.log(signupData);

    try {
      const response = await postData("users/create-student", signupData);
      console.log(response);
      navigate("/login");
    } catch (error: any) {
      console.error("API Error:", error);
      setError(
        error.response?.data?.message || "An error occurred during signup"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col w-full", className)} {...props}>
      <Card className="border-0 shadow-lg w-full max-w-6xl mx-auto">
        <CardHeader className="space-y-1 pb-4">
          <div className="flex items-center justify-center mb-2">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <UserPlus className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Join LittleGenius Hub
          </CardTitle>
          <CardDescription className="text-center">
            Create an account to start your learning journey
          </CardDescription>
        </CardHeader>
        <CardContent className="px-8">
          <form onSubmit={handleSignup}>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Student Information */}
              <div className="space-y-5">
                <h3 className="text-sm font-medium text-muted-foreground">
                  STUDENT INFORMATION
                </h3>

                <div className="grid gap-3">
                  <Label htmlFor="username" className="text-sm font-medium">
                    Student Name
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      id="username"
                      type="text"
                      placeholder="John Doe"
                      className={cn(
                        "pl-10 h-11",
                        formErrors.username &&
                          "border-destructive focus-visible:ring-destructive"
                      )}
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>
                  {formErrors.username && (
                    <p className="text-xs text-destructive">
                      {formErrors.username}
                    </p>
                  )}
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="student@example.com"
                      className={cn(
                        "pl-10 h-11",
                        formErrors.email &&
                          "border-destructive focus-visible:ring-destructive"
                      )}
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  {formErrors.email && (
                    <p className="text-xs text-destructive">
                      {formErrors.email}
                    </p>
                  )}
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="grade" className="text-sm font-medium">
                    Grade
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Select
                      value={formData.grade}
                      onValueChange={handleSelectChange}
                    >
                      <SelectTrigger
                        className={cn(
                          "pl-10 h-11",
                          formErrors.grade &&
                            "border-destructive focus-visible:ring-destructive"
                        )}
                      >
                        <SelectValue placeholder="Select Grade" />
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
                  {formErrors.grade && (
                    <p className="text-xs text-destructive">
                      {formErrors.grade}
                    </p>
                  )}
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={cn(
                        "pl-10 h-11",
                        formErrors.password &&
                          "border-destructive focus-visible:ring-destructive"
                      )}
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Hide password" : "Show password"}
                      </span>
                    </Button>
                  </div>
                  {formErrors.password && (
                    <p className="text-xs text-destructive">
                      {formErrors.password}
                    </p>
                  )}
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="rePassword" className="text-sm font-medium">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      id="rePassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={cn(
                        "pl-10 h-11",
                        formErrors.rePassword &&
                          "border-destructive focus-visible:ring-destructive"
                      )}
                      value={formData.rePassword}
                      onChange={handleChange}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="sr-only">
                        {showConfirmPassword
                          ? "Hide password"
                          : "Show password"}
                      </span>
                    </Button>
                  </div>
                  {formErrors.rePassword && (
                    <p className="text-xs text-destructive">
                      {formErrors.rePassword}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column - Parent Information */}
              <div className="space-y-5">
                <h3 className="text-sm font-medium text-muted-foreground">
                  PARENT INFORMATION
                </h3>

                <div className="grid gap-3">
                  <Label htmlFor="parentName" className="text-sm font-medium">
                    Parent's Name
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      id="parentName"
                      type="text"
                      placeholder="Parent's full name"
                      className={cn(
                        "pl-10 h-11",
                        formErrors.parentName &&
                          "border-destructive focus-visible:ring-destructive"
                      )}
                      value={formData.parentName}
                      onChange={handleChange}
                    />
                  </div>
                  {formErrors.parentName && (
                    <p className="text-xs text-destructive">
                      {formErrors.parentName}
                    </p>
                  )}
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="parentEmail" className="text-sm font-medium">
                    Parent's Email Address
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      id="parentEmail"
                      type="email"
                      placeholder="parent@example.com"
                      className={cn(
                        "pl-10 h-11",
                        formErrors.parentEmail &&
                          "border-destructive focus-visible:ring-destructive"
                      )}
                      value={formData.parentEmail}
                      onChange={handleChange}
                    />
                  </div>
                  {formErrors.parentEmail && (
                    <p className="text-xs text-destructive">
                      {formErrors.parentEmail}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    This email will be used by the parent to monitor the
                    student's progress.
                  </p>
                </div>

                <div className="mt-auto pt-4">
                  <div className="relative mb-4">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    type="button"
                    className="w-full mb-4 h-11"
                  >
                    <svg
                      className="mr-2 h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    Sign up with Google
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Button
                type="submit"
                className="w-full h-11 text-base"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center space-y-2 border-t p-4">
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </Link>
          </div>
          <div className="text-center text-xs text-muted-foreground">
            By creating an account, you agree to our{" "}
            <a
              href="#"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </a>
            .
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
