import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";

interface LessonThumbnailProps {
  title: string;
  video_link: string;
}

const LessonThumbnail: React.FC<LessonThumbnailProps> = (lesson) => {
  const title = lesson.title;
  const youtubeUrl = lesson.video_link;

  // Extract YouTube Video ID
  const videoId = youtubeUrl.split("v=")[1]?.split("&")[0];

  // Construct Thumbnail URL
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <Card className="w-full shadow-lg rounded-2xl overflow-hidden">
      <div className="relative">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-40 object-cover"
        />
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <Button
            variant="ghost"
            className="p-2 bg-white/80 rounded-full"
            onClick={() => window.open(youtubeUrl, "_blank")}
          >
            <PlayCircle className="h-10 w-10 text-black" />
          </Button>
        </div>
      </div>
      <CardContent className="p-3 text-center">
        <h3 className="text-lg font-semibold">{title}</h3>
      </CardContent>
    </Card>
  );
};

export default LessonThumbnail;
