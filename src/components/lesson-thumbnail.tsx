"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, ExternalLink } from "lucide-react";

interface LessonThumbnailProps {
  title: string;
  video_link: string;
}

const LessonThumbnail = ({ title, video_link }: LessonThumbnailProps) => {
  const [isHovering, setIsHovering] = useState(false);

  // Extract YouTube Video ID
  const videoId = video_link.split("v=")[1]?.split("&")[0] || "";

  // Construct Thumbnail URL
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  // Format title to be more readable
  const formattedTitle = title
    .replace(/^\d+_/, "") // Remove leading numbers and underscore
    .split(/(?=[A-Z])/)
    .join(" "); // Add spaces before capital letters

  const handleOpenVideo = () => {
    window.open(video_link, "_blank", "noopener,noreferrer");
  };

  return (
    <Card
      className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] bg-white/95 border-0 shadow-md"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative aspect-video">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />

        {thumbnailUrl && (
          <div className="relative h-full w-full">
            <img
              src={thumbnailUrl || "/placeholder.svg"}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
              style={{ transform: isHovering ? "scale(1.05)" : "scale(1)" }}
            />
          </div>
        )}

        {/* Play Button Overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center z-20 cursor-pointer"
          onClick={handleOpenVideo}
        >
          <div
            className={`
            rounded-full bg-white/90 p-3 shadow-lg
            transition-all duration-300 ease-in-out
            ${isHovering ? "scale-110 bg-primary/90" : "scale-100"}
          `}
          >
            <Play
              className={`h-8 w-8 ${
                isHovering ? "text-white" : "text-primary"
              }`}
            />
          </div>
        </div>

        {/* Lesson number badge */}
        {title.match(/^\d+/) && (
          <div className="absolute top-2 left-2 z-20 bg-primary/90 text-white text-xs font-bold px-2 py-1 rounded-md">
            Lesson {title.match(/^\d+/)?.[0]}
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-medium line-clamp-2 text-foreground">
            {formattedTitle}
          </h3>
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 h-8 w-8 rounded-full"
            onClick={handleOpenVideo}
          >
            <ExternalLink className="h-4 w-4" />
            <span className="sr-only">Open video</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LessonThumbnail;
