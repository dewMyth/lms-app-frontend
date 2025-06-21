import { useState } from "react";
import {
  Users,
  GraduationCap,
  FileText,
  Play,
  TrendingUp,
  Calendar,
  Bell,
  Settings,
  RefreshCw,
  AlertCircle,
  LucideIcon,
  UserPlus,
  LogIn,
  UserCog,
  FilePlus,
  Upload,
  CheckCircle,
  Edit,
  Search,
  ClipboardList,
  ListPlus,
  Video,
} from "lucide-react";

interface LogIconMap {
  [key: string]: {
    icon: LucideIcon;
    color: string;
  };
}

const logActionIconMap: LogIconMap = {
  CREATE_STUDENT_ACCOUNT: { icon: UserPlus, color: "text-blue-500" },
  CREATE_TEACHER_ACCOUNT: { icon: UserPlus, color: "text-purple-500" },
  CREATE_PARENT_ACCOUNT: { icon: UserPlus, color: "text-pink-500" },
  CREATE_ADMIN_ACCOUNT: { icon: UserCog, color: "text-gray-700" },

  LOGIN_STUDENT: { icon: LogIn, color: "text-blue-400" },
  LOGIN_TEACHER: { icon: LogIn, color: "text-purple-400" },
  LOGIN_PARENT: { icon: LogIn, color: "text-pink-400" },
  LOGIN_ADMIN: { icon: LogIn, color: "text-gray-500" },

  ADD_ACTIVITY_TO_ASSIGNMENTS: { icon: FilePlus, color: "text-green-500" },
  SUBMIT_ASSIGNMENT: { icon: Upload, color: "text-blue-500" },
  GRADE_ASSIGNMENT: { icon: CheckCircle, color: "text-emerald-500" },

  EDIT_STUDENT: { icon: Edit, color: "text-yellow-500" },

  CREATE_ACTIVITY: { icon: ListPlus, color: "text-cyan-500" },
  CREATE_VIDEO_LESSON: { icon: Video, color: "text-red-500" },
};

export const ActivityIcon = ({ type }: { type: string }) => {
  const iconConfig = logActionIconMap[type];

  if (!iconConfig) return null;

  const IconComponent = iconConfig.icon;

  return (
    <div className="flex-shrink-0">
      <IconComponent className={`h-4 w-4 ${iconConfig.color}`} />
    </div>
  );
};
