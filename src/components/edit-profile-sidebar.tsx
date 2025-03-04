import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import EditableAvatar from "./editable-avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  const [grade, setGrade] = useState("A");

  // Parent data
  const parent = {
    username: "Jane Doe",
    email: "janedoe@example.com",
    avatar: "https://via.placeholder.com/40", // Small avatar
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
            <EditableAvatar />
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
            <div>
              <Label htmlFor="grade">Grade</Label>
              <Input
                id="grade"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
              />
            </div>

            {/* Save Button */}
            <Button className="w-full mt-4">Save Changes</Button>

            {/* Parent's Data Card */}
            <div className="mt-8 bg-white shadow-sm rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">
                Parent's Information
              </h3>
              <div className="flex items-center space-x-4">
                {/* Parent's Avatar */}
                <EditableAvatar />
                <div>
                  <p className="font-medium">{parent.username}</p>
                  <p className="text-sm text-gray-500">{parent.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
