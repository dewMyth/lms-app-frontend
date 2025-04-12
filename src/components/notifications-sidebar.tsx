import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Bell } from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "info",
    message: "You have a new message from John.",
    timestamp: new Date().toLocaleString(),
  },
  {
    id: 2,
    type: "warning",
    message: "Your profile picture needs updating.",
    timestamp: new Date().toLocaleString(),
  },
  {
    id: 3,
    type: "error",
    message: "Your session will expire in 5 minutes.",
    timestamp: new Date().toLocaleString(),
  },
  {
    id: 1,
    type: "info",
    message: "You have a new message from John.",
    timestamp: new Date().toLocaleString(),
  },
  {
    id: 2,
    type: "warning",
    message: "Your profile picture needs updating.",
    timestamp: new Date().toLocaleString(),
  },
  {
    id: 3,
    type: "error",
    message: "Your session will expire in 5 minutes.",
    timestamp: new Date().toLocaleString(),
  },
  {
    id: 1,
    type: "info",
    message: "You have a new message from John.",
    timestamp: new Date().toLocaleString(),
  },
  {
    id: 2,
    type: "warning",
    message: "Your profile picture needs updating.",
    timestamp: new Date().toLocaleString(),
  },
  {
    id: 3,
    type: "error",
    message: "Your session will expire in 5 minutes.",
    timestamp: new Date().toLocaleString(),
  },
  {
    id: 1,
    type: "info",
    message: "You have a new message from John.",
    timestamp: new Date().toLocaleString(),
  },
  {
    id: 2,
    type: "warning",
    message: "Your profile picture needs updating.",
    timestamp: new Date().toLocaleString(),
  },
  {
    id: 3,
    type: "error",
    message: "Your session will expire in 5 minutes.",
    timestamp: new Date().toLocaleString(),
  },
  {
    id: 1,
    type: "info",
    message: "You have a new message from John.",
    timestamp: new Date().toLocaleString(),
  },
  {
    id: 2,
    type: "warning",
    message: "Your profile picture needs updating.",
    timestamp: new Date().toLocaleString(),
  },
  {
    id: 3,
    type: "error",
    message: "Your session will expire in 5 minutes.",
    timestamp: new Date().toLocaleString(),
  },
];

export default function NotificationsSidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [readNotifications, setReadNotifications] = useState<number[]>([]); // To track read notifications

  const markAsRead = (id: number) => {
    setReadNotifications((prev) => [...prev, id]);
  };

  const clearAllNotifications = () => {
    setReadNotifications([]);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[400px]">
        <div className="py-6">
          {/* Title */}
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            <span>🔔 Notifications</span>
          </h2>

          {/* Notification List */}
          <div className="space-y-2 overflow-y-auto max-h-[700px]">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-center space-x-4 p-2 rounded-lg w-full ${
                  readNotifications.includes(notification.id)
                    ? "bg-gray-200"
                    : notification.type === "info"
                    ? "bg-blue-100"
                    : notification.type === "warning"
                    ? "bg-yellow-100"
                    : "bg-red-100"
                }`}
                style={{ height: "50px", width: "100%" }} // Ensures a thinner, strip-like height
              >
                {/* Notification Icon */}
                <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full flex justify-center items-center">
                  <Bell className="w-6 h-6 text-gray-600" />
                </div>

                {/* Notification Content */}
                <div className="flex-grow">
                  <p className="font-medium text-xs text-gray-800">
                    {notification.message}
                  </p>
                </div>

                {/* Mark as Read Button */}
                {!readNotifications.includes(notification.id) && (
                  <Button
                    size="sm"
                    onClick={() => markAsRead(notification.id)}
                    className="ml-2 text-sm bg-gray-300 hover:bg-gray-400"
                  >
                    Mark as Read
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Clear All Button */}
          <div className="mt-6 text-center">
            <Button
              onClick={clearAllNotifications}
              className="w-full bg-red-500 hover:bg-red-600"
            >
              Clear All
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
