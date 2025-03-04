import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react"; // For the camera icon

export default function EditableAvatar() {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <div className="relative group w-24 h-24">
      {/* Avatar */}
      <Avatar className="w-full h-full">
        <AvatarImage
          src={image || "https://via.placeholder.com/100"}
          alt="User Profile"
        />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>

      {/* Edit button (Hidden by default, shown on hover) */}
      <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
        <Camera className="text-white w-6 h-6" />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </label>
    </div>
  );
}
