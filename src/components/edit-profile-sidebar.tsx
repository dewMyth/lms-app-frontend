import { useState, useEffect } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import EditableAvatar from "./editable-avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

import { fetchData, postData } from "@/apiService";

export default function EditProfileSidebar({
  isOpen,
  onClose,
  user,
}: {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}) {
  const [username, setUsername] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);
  const [grade, setGrade] = useState("1");
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

  interface UserData {
    _id?: string;
    avatar?: string;
  }

  interface ParentData {
    _id?: string;
    avatar?: string;
    username?: string;
    email?: string;
  }

  const [userData, setUserData] = useState<UserData | undefined>(undefined);
  const [parentData, setParentData] = useState<ParentData | undefined>(
    undefined
  );

  useEffect(() => {
    if (isUpdateSuccess) {
      const timer = setTimeout(() => {
        setIsUpdateSuccess(false); // Hide alert after 5 seconds
      }, 3000);

      return () => clearTimeout(timer); // Cleanup on unmount
    }
  }, [isUpdateSuccess]);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetchData(
        `users/all-user-details/${user?.userType}/${user._id}`
      );
      setUserData(response?.userData);
      setGrade(response?.userData?.grade);

      if (user?.userType == "student") {
        setParentData(response?.userData?.parent);
      }
    };
    fetchUserData();
  }, []);

  // Parent data
  // const parent = {
  //   username: "Jane Doe",
  //   email: "janedoe@example.com",
  //   avatar: "https://via.placeholder.com/40", // Small avatar
  // };

  const handleEdit = async () => {
    const updateUserData = {
      userId: user?._id,
      username,
      email,
      grade,
    };

    console.log(updateUserData);

    // Send data to backend
    const res = await postData("/users/edit-student", updateUserData);
    if (res.status == 200) {
      setIsUpdateSuccess(true);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-96">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            👤 Edit Profile
          </h2>
          {/* Avatar */}
          <div className="flex justify-center">
            <EditableAvatar userData={userData} />
          </div>

          {/* User Details */}
          <div className="mt-6 space-y-4">
            {/* Username */}
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Grade */}
            {user?.userType == "student" ? (
              <div>
                <Label htmlFor="grade">Grade</Label>
                <Select
                  value={grade}
                  onValueChange={(value) => setGrade(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Your Grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>What grade you are in?</SelectLabel>
                      <SelectItem value="1">Grade 1</SelectItem>
                      <SelectItem value="2">Grade 2</SelectItem>
                      <SelectItem value="3">Grade 3</SelectItem>
                      <SelectItem value="4">Grade 4</SelectItem>
                      <SelectItem value="5">Grade 5</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            ) : (
              ""
            )}

            {/* Save Button */}
            <Button className="w-full mt-4" onClick={handleEdit}>
              Save Changes
            </Button>

            {isUpdateSuccess && (
              <Alert variant="default">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>Changes Saved!</AlertDescription>
              </Alert>
            )}

            {/* Parent's Data Card */}
            {user?.userType == "student" ? (
              <div className="mt-8 bg-white shadow-sm rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">
                  Parent's Information
                </h3>
                <div className="flex items-center space-x-4">
                  {/* Parent's Avatar */}
                  <EditableAvatar editable={false} userData={parentData} />
                  <div>
                    <p className="font-medium">{parentData?.username}</p>
                    <p className="text-sm text-gray-500">{parentData?.email}</p>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
