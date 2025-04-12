import { ChevronRight, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NavBar from "@/components/nav-bar";

export default function ArtsAndCraftsPage() {
  return (
    <>
      <NavBar />
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb Navigation */}
        {/* <nav className="mb-6 flex items-center text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <ChevronRight className="mx-1 h-4 w-4" />
        <Link href="/entertainment" className="hover:text-primary">
          Entertainment
        </Link>
        <ChevronRight className="mx-1 h-4 w-4" />
        <span className="font-medium text-foreground">Arts & Crafts</span>
      </nav> */}

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Arts & Crafts</h1>
          <p className="mt-2 text-muted-foreground">
            Creative arts and crafts videos for kids to explore their artistic
            talents
          </p>
        </div>

        <Separator className="mb-8" />

        {/* Main Content Tabs */}
        <Tabs defaultValue="arts" className="w-full">
          <TabsList className="mb-8 w-full grid grid-cols-2 h-auto">
            <TabsTrigger value="arts" className="py-3 text-base">
              Arts
            </TabsTrigger>
            <TabsTrigger value="crafts" className="py-3 text-base">
              Crafts
            </TabsTrigger>
          </TabsList>

          {/* Arts Content */}
          <TabsContent value="arts" className="space-y-8">
            {/* Featured Arts Video */}
            <div className="mb-6">
              <h2 className="mb-3 text-xl font-semibold">
                Featured Arts Video
              </h2>
              <div className="relative overflow-hidden rounded-lg bg-muted">
                <div className="aspect-video max-w-3xl bg-muted">
                  <img
                    src="/placeholder.svg?height=360&width=640"
                    alt="Featured arts video thumbnail"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      size="sm"
                      className="rounded-full"
                      variant="secondary"
                    >
                      <Play className="mr-1 h-4 w-4" />
                      Play Video
                    </Button>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-lg font-semibold">
                    Watercolor Painting for Beginners
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Learn basic watercolor techniques with simple projects
                  </p>
                </div>
              </div>
            </div>

            {/* Arts Categories */}
            <div className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">Arts Categories</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {artsCategories.map((category) => (
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

            {/* Arts Video Grid */}
            <div>
              <h2 className="mb-4 text-2xl font-semibold">
                Popular Arts Videos
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {artsVideos.map((video) => (
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
          </TabsContent>

          {/* Crafts Content */}
          <TabsContent value="crafts" className="space-y-8">
            {/* Featured Crafts Video */}
            <div className="mb-6">
              <h2 className="mb-3 text-xl font-semibold">
                Featured Crafts Video
              </h2>
              <div className="relative overflow-hidden rounded-lg bg-muted">
                <div className="aspect-video max-w-3xl bg-muted">
                  <img
                    src="/placeholder.svg?height=360&width=640"
                    alt="Featured crafts video thumbnail"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      size="sm"
                      className="rounded-full"
                      variant="secondary"
                    >
                      <Play className="mr-1 h-4 w-4" />
                      Play Video
                    </Button>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-lg font-semibold">
                    DIY Paper Crafts for Kids
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Create amazing paper crafts with simple materials
                  </p>
                </div>
              </div>
            </div>

            {/* Crafts Categories */}
            <div className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">Crafts Categories</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {craftsCategories.map((category) => (
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

            {/* Crafts Video Grid */}
            <div>
              <h2 className="mb-4 text-2xl font-semibold">
                Popular Crafts Videos
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {craftsVideos.map((video) => (
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
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

// Sample data for Arts
const artsCategories = [
  { name: "Painting", icon: <span className="text-2xl">🎨</span> },
  { name: "Drawing", icon: <span className="text-2xl">✏️</span> },
  { name: "Coloring", icon: <span className="text-2xl">🖍️</span> },
  { name: "Sculpture", icon: <span className="text-2xl">🗿</span> },
  { name: "Animation", icon: <span className="text-2xl">🎬</span> },
  { name: "Digital Art", icon: <span className="text-2xl">💻</span> },
];

const artsVideos = [
  {
    id: 1,
    title: "Easy Drawing Techniques for Kids",
    description: "Learn to draw animals, people and objects with simple shapes",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "4:25",
    views: "1.3M",
  },
  {
    id: 2,
    title: "Finger Painting Fun",
    description:
      "Create colorful masterpieces using just your fingers and paint",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "3:42",
    views: "950K",
  },
  {
    id: 3,
    title: "Cartoon Character Drawing",
    description: "Learn to draw your favorite cartoon characters step by step",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "6:18",
    views: "2.2M",
  },
  {
    id: 4,
    title: "Watercolor Techniques for Beginners",
    description: "Simple watercolor painting techniques anyone can master",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "5:30",
    views: "1.1M",
  },
  {
    id: 5,
    title: "Clay Sculpture Basics",
    description: "Create fun sculptures with modeling clay or play-doh",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "7:15",
    views: "820K",
  },
  {
    id: 6,
    title: "Chalk Pastel Art",
    description: "Create vibrant artwork using chalk pastels on paper",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "4:50",
    views: "760K",
  },
  {
    id: 7,
    title: "Digital Drawing for Kids",
    description: "Introduction to digital art using kid-friendly apps",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "8:22",
    views: "1.5M",
  },
  {
    id: 8,
    title: "Nature-Inspired Art Projects",
    description: "Create beautiful art inspired by the natural world",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "5:45",
    views: "930K",
  },
];

// Sample data for Crafts
const craftsCategories = [
  { name: "Paper Crafts", icon: <span className="text-2xl">📄</span> },
  { name: "Recycled", icon: <span className="text-2xl">♻️</span> },
  { name: "Seasonal", icon: <span className="text-2xl">🍂</span> },
  { name: "Jewelry", icon: <span className="text-2xl">💍</span> },
  { name: "Textiles", icon: <span className="text-2xl">🧵</span> },
  { name: "DIY Gifts", icon: <span className="text-2xl">🎁</span> },
];

const craftsVideos = [
  {
    id: 1,
    title: "Easy Origami Animals",
    description: "Learn to fold paper into cute animal shapes",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "4:10",
    views: "1.7M",
  },
  {
    id: 2,
    title: "Recycled Bottle Crafts",
    description: "Turn plastic bottles into amazing craft projects",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "6:25",
    views: "1.2M",
  },
  {
    id: 3,
    title: "DIY Friendship Bracelets",
    description: "Create colorful friendship bracelets with string and beads",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "5:30",
    views: "2.5M",
  },
  {
    id: 4,
    title: "Paper Plate Crafts",
    description: "Transform simple paper plates into fun craft projects",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "3:45",
    views: "980K",
  },
  {
    id: 5,
    title: "Holiday Decorations",
    description: "Make festive decorations for any holiday",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "7:20",
    views: "1.4M",
  },
  {
    id: 6,
    title: "No-Sew Fabric Crafts",
    description: "Create fabric crafts without needing to sew",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "5:15",
    views: "850K",
  },
  {
    id: 7,
    title: "DIY Slime Recipes",
    description: "Make different types of slime with household ingredients",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "4:40",
    views: "3.2M",
  },
  {
    id: 8,
    title: "Cardboard Box Creations",
    description: "Transform cardboard boxes into amazing toys and projects",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "6:55",
    views: "1.1M",
  },
];
