import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react"; // For the camera icon
import { postData } from "@/apiService";

interface UserData {
  _id?: string;
  avatar?: string;
  username?: string;
}

export default function EditableAvatar({
  editable = true,
  userData = {} as UserData,
}) {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      const formData = new FormData();
      formData.append("file", file);
      await postData(`users/add-avatar/${userData?._id}`, formData);
    }
  };

  return (
    <div className="relative group w-24 h-24">
      {/* Avatar */}
      <Avatar className="w-full h-full">
        <AvatarImage src={image || userData.avatar} alt="User Profile" />
        <AvatarFallback>
          {userData.username?.slice(0, 1).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      {/* Edit button (Hidden by default, shown on hover) */}
      {editable ? (
        <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
          <Camera className="text-white w-6 h-6" />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>
      ) : (
        ""
      )}
    </div>
  );
}
