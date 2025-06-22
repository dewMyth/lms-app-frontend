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
            {/* <div className="mb-6">
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
            </div> */}

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
                          onClick={() => window.open(video.videoUrl, "_blank")}
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
            {/* <div className="mb-6">
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
            </div> */}

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
                          onClick={() => window.open(video.videoUrl, "_blank")}
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
    title: "How To Draw A Cute Ice Cream Cone",
    description: "Learn how to draw a cute ice cream cone step by step.",
    thumbnail: "https://img.youtube.com/vi/UW6H5dAPuhY/hqdefault.jpg",
    duration: "4:30",
    views: "1.2M",
    videoUrl: "https://youtu.be/UW6H5dAPuhY",
  },
  {
    id: 2,
    title: "How To Draw A Cartoon Fish",
    description: "Step-by-step tutorial for drawing a cartoon fish.",
    thumbnail: "https://img.youtube.com/vi/VkFK_2cti7g/hqdefault.jpg",
    duration: "3:50",
    views: "950K",
    videoUrl: "https://youtu.be/VkFK_2cti7g",
  },
  {
    id: 3,
    title: "How To Draw A Simple House",
    description: "Easy drawing tutorial for a basic house.",
    thumbnail: "https://img.youtube.com/vi/1kvhfFkxgXs/hqdefault.jpg",
    duration: "4:10",
    views: "1M",
    videoUrl: "https://youtu.be/1kvhfFkxgXs",
  },
  {
    id: 4,
    title: "How To Draw A Smiling Sun",
    description: "Draw a happy, smiling sun with this simple tutorial.",
    thumbnail: "https://img.youtube.com/vi/n1XwJLOFU5c/hqdefault.jpg",
    duration: "3:40",
    views: "850K",
    videoUrl: "https://youtu.be/n1XwJLOFU5c",
  },
  {
    id: 5,
    title: "How To Draw A Cartoon Butterfly",
    description: "Follow this guide to draw a cartoon butterfly.",
    thumbnail: "https://img.youtube.com/vi/pDxtH-OkFxU/hqdefault.jpg",
    duration: "4:00",
    views: "1.4M",
    videoUrl: "https://youtu.be/pDxtH-OkFxU",
  },
  {
    id: 6,
    title: "How To Draw A Simple Tree",
    description: "Quick and easy tutorial to draw a tree.",
    thumbnail: "https://img.youtube.com/vi/tZRKf_Uhni8/hqdefault.jpg",
    duration: "4:15",
    views: "780K",
    videoUrl: "https://youtu.be/tZRKf_Uhni8",
  },
  {
    id: 7,
    title: "How To Draw A Happy Cloud",
    description: "Draw a smiling cloud with this fun guide.",
    thumbnail: "https://img.youtube.com/vi/E1d-_y6-a0w/hqdefault.jpg",
    duration: "3:30",
    views: "720K",
    videoUrl: "https://youtu.be/E1d-_y6-a0w",
  },
  {
    id: 8,
    title: "How To Draw A Cartoon Cat",
    description: "Follow along to draw a cute cartoon cat.",
    thumbnail: "https://img.youtube.com/vi/9idkBoobXyI/hqdefault.jpg",
    duration: "4:20",
    views: "1.3M",
    videoUrl: "https://youtu.be/9idkBoobXyI",
  },
  {
    id: 9,
    title: "How To Draw A Simple Flower",
    description: "Easy steps to draw a flower anyone can follow.",
    thumbnail: "https://img.youtube.com/vi/gDaaCPc_gYo/hqdefault.jpg",
    duration: "3:50",
    views: "900K",
    videoUrl: "https://youtu.be/gDaaCPc_gYo",
  },
  {
    id: 10,
    title: "How To Draw A Cartoon Dog",
    description: "Learn how to draw a friendly cartoon dog.",
    thumbnail: "https://img.youtube.com/vi/7qb4p8C9cdI/hqdefault.jpg",
    duration: "4:25",
    views: "1.1M",
    videoUrl: "https://youtu.be/7qb4p8C9cdI",
  },
  {
    id: 11,
    title: "How To Draw A Smiling Star",
    description: "Draw a cheerful star with this simple guide.",
    thumbnail: "https://img.youtube.com/vi/d3eOnNjm-40/hqdefault.jpg",
    duration: "3:45",
    views: "800K",
    videoUrl: "https://youtu.be/d3eOnNjm-40",
  },
  {
    id: 12,
    title: "How To Draw A Simple Car",
    description: "Step-by-step video to draw a cartoon car.",
    thumbnail: "https://img.youtube.com/vi/Y-B5vtU7S4c/hqdefault.jpg",
    duration: "4:00",
    views: "950K",
    videoUrl: "https://youtu.be/Y-B5vtU7S4c",
  },
  {
    id: 13,
    title: "How To Draw A Cartoon Bird",
    description: "Learn how to draw a cute cartoon bird.",
    thumbnail: "https://img.youtube.com/vi/4T7r85cTs0s/hqdefault.jpg",
    duration: "3:55",
    views: "870K",
    videoUrl: "https://youtu.be/4T7r85cTs0s",
  },
  {
    id: 14,
    title: "How To Draw A Simple Boat",
    description: "Draw a simple boat using basic shapes and lines.",
    thumbnail: "https://img.youtube.com/vi/FI75ouuty-A/hqdefault.jpg",
    duration: "3:40",
    views: "710K",
    videoUrl: "https://youtu.be/FI75ouuty-A",
  },
  {
    id: 15,
    title: "How To Draw A Smiling Moon",
    description: "Easy tutorial for a happy, smiling moon drawing.",
    thumbnail: "https://img.youtube.com/vi/5_rHz6wZiBA/hqdefault.jpg",
    duration: "4:10",
    views: "990K",
    videoUrl: "https://youtu.be/5_rHz6wZiBA",
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
    title: "Handprint Flower",
    description: "Create a colorful flower using your handprint and paper.",
    thumbnail: "https://img.youtube.com/vi/EQFb9qKPITM/hqdefault.jpg",
    duration: "5:00",
    views: "1M",
    videoUrl: "https://youtu.be/EQFb9qKPITM",
  },
  {
    id: 2,
    title: "Paper Bird",
    description: "Fold a simple and elegant bird with paper.",
    thumbnail: "https://img.youtube.com/vi/FbfejCMZebA/hqdefault.jpg",
    duration: "4:30",
    views: "900K",
    videoUrl: "https://youtu.be/FbfejCMZebA",
  },
  {
    id: 3,
    title: "Paper Butterfly",
    description: "Make a beautiful butterfly with basic origami folds.",
    thumbnail: "https://img.youtube.com/vi/TQeY5-jjSpk/hqdefault.jpg",
    duration: "3:45",
    views: "1.2M",
    videoUrl: "https://youtu.be/TQeY5-jjSpk",
  },
  {
    id: 4,
    title: "Paper Toy Anti-Stress Transformer",
    description: "Craft a transforming paper toy to relieve stress.",
    thumbnail: "https://img.youtube.com/vi/zgHsg2NAvIs/hqdefault.jpg",
    duration: "6:00",
    views: "800K",
    videoUrl: "https://youtu.be/zgHsg2NAvIs",
  },
  {
    id: 5,
    title: "Origami Pikachu",
    description: "Fold paper into the shape of Pikachu, the Pokémon.",
    thumbnail: "https://img.youtube.com/vi/b29dhYN7YfI/hqdefault.jpg",
    duration: "5:20",
    views: "2.1M",
    videoUrl: "https://youtu.be/b29dhYN7YfI",
  },
  {
    id: 6,
    title: "How to Make Paper Shark",
    description: "Craft a shark using simple paper folding techniques.",
    thumbnail: "https://img.youtube.com/vi/boDC6s582g4/hqdefault.jpg",
    duration: "4:10",
    views: "700K",
    videoUrl: "https://youtu.be/boDC6s582g4",
  },
  {
    id: 7,
    title: "Easy Paper Airplane",
    description: "Learn how to make a simple and fast paper airplane.",
    thumbnail: "https://img.youtube.com/vi/gFm5Gx1JyY8/hqdefault.jpg",
    duration: "3:20",
    views: "1.5M",
    videoUrl: "https://youtu.be/gFm5Gx1JyY8",
  },
  {
    id: 8,
    title: "Easy Paper Pinwheel",
    description: "Make a spinning paper pinwheel in just a few steps.",
    thumbnail: "https://img.youtube.com/vi/oT5V578j6jA/hqdefault.jpg",
    duration: "4:00",
    views: "850K",
    videoUrl: "https://youtu.be/oT5V578j6jA",
  },
  {
    id: 9,
    title: "Paper Umbrella",
    description: "Create a mini umbrella using paper and creativity.",
    thumbnail: "https://img.youtube.com/vi/dgdleWSeFCE/hqdefault.jpg",
    duration: "4:50",
    views: "1.1M",
    videoUrl: "https://youtu.be/dgdleWSeFCE",
  },
  {
    id: 10,
    title: "Mini Paper Crown",
    description: "Make a cute mini crown with just paper and scissors.",
    thumbnail: "https://img.youtube.com/vi/TuGFe-XyeIQ/hqdefault.jpg",
    duration: "3:40",
    views: "670K",
    videoUrl: "https://youtu.be/TuGFe-XyeIQ",
  },
  {
    id: 11,
    title: "Easy Paper Bird",
    description: "Another method to make a beautiful paper bird.",
    thumbnail: "https://img.youtube.com/vi/ykdSQ-gMLBg/hqdefault.jpg",
    duration: "3:35",
    views: "750K",
    videoUrl: "https://youtu.be/ykdSQ-gMLBg",
  },
  {
    id: 12,
    title: "Paper Quilled Snail",
    description: "Use quilling paper to make a creative snail design.",
    thumbnail: "https://img.youtube.com/vi/HxHPnhgpBK8/hqdefault.jpg",
    duration: "5:30",
    views: "500K",
    videoUrl: "https://youtu.be/HxHPnhgpBK8",
  },
  {
    id: 13,
    title: "Easy Paper Cat",
    description: "Fold a cute and easy paper cat.",
    thumbnail: "https://img.youtube.com/vi/QyqdyX32XpU/hqdefault.jpg",
    duration: "3:50",
    views: "1M",
    videoUrl: "https://youtu.be/QyqdyX32XpU",
  },
  {
    id: 14,
    title: "Easy Paper Shirt",
    description: "Make a tiny paper shirt using origami techniques.",
    thumbnail: "https://img.youtube.com/vi/F4AHqnkBquk/hqdefault.jpg",
    duration: "3:10",
    views: "890K",
    videoUrl: "https://youtu.be/F4AHqnkBquk",
  },
  {
    id: 15,
    title: "Paper Crazy Frog",
    description: "Fold a jumping frog that’s full of fun and movement.",
    thumbnail: "https://img.youtube.com/vi/VrpQBsYQES4/hqdefault.jpg",
    duration: "4:20",
    views: "980K",
    videoUrl: "https://youtu.be/VrpQBsYQES4",
  },
];
