import { ChevronRight, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/nav-bar";

export default function Music() {
  return (
    <>
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb Navigation */}

        {/* Page Header */}
        {/* <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Music Section</h1>
          <p className="mt-2 text-muted-foreground">
            Fun and educational music videos for children of all ages
          </p>
        </div> */}

        <Separator className="mb-8" />

        {/* Featured Video */}
        {/* <div className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold">Featured Video</h2>
          <div className="relative overflow-hidden rounded-xl bg-muted">
            <div className="aspect-video bg-muted">
              <img
                src="https://img.youtube.com/vi/020g-0hhCAU/hqdefault.jpg"
                alt="Featured kids music video thumbnail"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  size="lg"
                  className="rounded-full"
                  variant="secondary"
                  onClick={() =>
                    window.open(
                      "https://www.youtube.com/watch?v=020g-0hhCAU",
                      "_blank"
                    )
                  }
                >
                  <Play className="mr-2 h-5 w-5" />
                  Play Video
                </Button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold">
                The Alphabet Song Adventure
              </h3>
              <p className="text-muted-foreground">
                Learn the alphabet with fun characters and catchy tunes
              </p>
            </div>
          </div>
        </div> */}

        {/* Featured Video */}
        {/* <div className="mb-6">
          <h2 className="mb-3 text-xl font-semibold">Featured Video</h2>
          <div className="relative overflow-hidden rounded-lg bg-muted">
            <div className="aspect-video max-w-2xl bg-muted">
              <img
                src="https://img.youtube.com/vi/020g-0hhCAU/hqdefault.jpg"
                alt="Featured kids music video thumbnail"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  size="lg"
                  className="rounded-full"
                  variant="secondary"
                  onClick={() =>
                    window.open(
                      "https://www.youtube.com/watch?v=020g-0hhCAU",
                      "_blank"
                    )
                  }
                >
                  <Play className="mr-2 h-5 w-5" />
                  Play Video
                </Button>
              </div>
            </div>
            <div className="p-3">
              <h3 className="text-lg font-semibold">
                The Alphabet Song Adventure
              </h3>
              <p className="text-sm text-muted-foreground">
                Learn the alphabet with fun characters and catchy tunes
              </p>
            </div>
          </div>
        </div> */}

        {/* Video Categories */}
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Categories</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {categories.map((category) => (
              <Button
                key={category.name}
                variant="outline"
                className="h-auto flex-col py-4"
              >
                {category.icon}
                <span className="mt-2">{category.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Video Grid */}
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Popular Videos</h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {videos.map((video) => (
              <Card key={video.id} className="overflow-hidden">
                <div className="relative aspect-video">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={`${video.title} thumbnail`}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity hover:bg-black/20 hover:opacity-100">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full"
                      onClick={() =>
                        video.youtubeUrl &&
                        window.open(video.youtubeUrl, "_blank")
                      }
                    >
                      <Play className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold">{video.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {video.description}
                  </p>
                </CardContent>
                <CardFooter className="border-t p-4 pt-3">
                  <div className="flex w-full items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {video.duration}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {video.views} views
                    </span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// Sample data
const categories = [
  { name: "Educational", icon: <span className="text-2xl">🎓</span> },
  { name: "Nursery Rhymes", icon: <span className="text-2xl">🎵</span> },
  { name: "Dance", icon: <span className="text-2xl">💃</span> },
  { name: "Animals", icon: <span className="text-2xl">🦁</span> },
  { name: "Lullabies", icon: <span className="text-2xl">🌙</span> },
  { name: "Sing-Along", icon: <span className="text-2xl">🎤</span> },
];

const videos = [
  {
    id: 1,
    title: "Baby Shark | Nursery Rhymes & Kids Songs",
    description: "A classic lullaby with animated stars and moon",
    thumbnail: "https://img.youtube.com/vi/020g-0hhCAU/hqdefault.jpg",
    duration: "3:24",
    views: "1.2M",
    youtubeUrl: "https://www.youtube.com/watch?v=020g-0hhCAU",
  },
  {
    id: 2,
    title: "The Wheels on the Bus",
    description: "Join the fun on this musical bus ride adventure",
    thumbnail: "https://img.youtube.com/vi/e_04ZrNroTo/hqdefault.jpg",
    duration: "4:12",
    views: "2.5M",
    youtubeUrl: "https://www.youtube.com/watch?v=e_04ZrNroTo",
  },
  {
    id: 3,
    title: "Baby Shark Dance",
    description: "Swim along with the shark family in this catchy tune",
    thumbnail: "https://img.youtube.com/vi/XqZsoesa55w/hqdefault.jpg",
    duration: "2:16",
    views: "5.7M",
    youtubeUrl: "https://www.youtube.com/watch?v=XqZsoesa55w",
  },
  {
    id: 4,
    title: "Old MacDonald Had a Farm",
    description: "Learn about farm animals and the sounds they make",
    thumbnail: "https://img.youtube.com/vi/5oYKonYBujg/hqdefault.jpg",
    duration: "3:48",
    views: "1.8M",
    youtubeUrl: "https://www.youtube.com/watch?v=5oYKonYBujg",
  },
  {
    id: 5,
    title: "Five Little Monkeys",
    description: "Count down with five playful monkeys jumping on the bed",
    thumbnail: "https://img.youtube.com/vi/b0NHrFNZWh0/hqdefault.jpg",
    duration: "2:55",
    views: "3.1M",
    youtubeUrl: "https://www.youtube.com/watch?v=b0NHrFNZWh0",
  },
  {
    id: 6,
    title: "Itsy Bitsy Spider",
    description: "Follow the spider's journey up the water spout",
    thumbnail: "https://img.youtube.com/vi/OPgfpE-QzRg/hqdefault.jpg",
    duration: "2:30",
    views: "1.5M",
    youtubeUrl: "https://www.youtube.com/watch?v=OPgfpE-QzRg",
  },
  {
    id: 7,
    title: "Head, Shoulders, Knees & Toes",
    description: "Learn body parts with this interactive song and dance",
    thumbnail: "https://img.youtube.com/vi/h4eueDYPTIg/hqdefault.jpg",
    duration: "3:10",
    views: "2.2M",
    youtubeUrl: "https://www.youtube.com/watch?v=h4eueDYPTIg",
  },
  {
    id: 8,
    title: "Row, Row, Row Your Boat",
    description: "A gentle rowing adventure down the stream",
    thumbnail: "https://img.youtube.com/vi/7otAJa3jui8/hqdefault.jpg",
    duration: "2:05",
    views: "1.3M",
    youtubeUrl: "https://www.youtube.com/watch?v=7otAJa3jui8",
  },
];
