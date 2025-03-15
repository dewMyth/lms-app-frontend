import { ChevronRight, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuizComponent } from "@/components/quiz-component";
import Navbar from "@/components/nav-bar";

export default function SportsPage() {
  return (
    <>
      <Navbar />
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
        <span className="font-medium text-foreground">Sports</span>
      </nav> */}

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Sports</h1>
          <p className="mt-2 text-muted-foreground">
            Exciting sports videos and highlights for kids and families
          </p>
        </div>

        <Separator className="mb-8" />

        {/* Featured Video */}
        <div className="mb-6">
          <h2 className="mb-3 text-xl font-semibold">Featured Video</h2>
          <div className="relative overflow-hidden rounded-lg bg-muted">
            <div className="aspect-video max-w-3xl bg-muted">
              <img
                src="/placeholder.svg?height=360&width=640"
                alt="Featured sports video thumbnail"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button size="sm" className="rounded-full" variant="secondary">
                  <Play className="mr-1 h-4 w-4" />
                  Play Video
                </Button>
              </div>
            </div>
            <div className="p-3">
              <h3 className="text-lg font-semibold">
                Amazing Soccer Skills for Kids
              </h3>
              <p className="text-sm text-muted-foreground">
                Learn basic soccer tricks and skills with fun demonstrations
              </p>
            </div>
          </div>
        </div>

        {/* Sports Categories */}
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
        <div className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Popular Sports Videos</h2>
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

        {/* Sports Quizzes */}
        <div className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Sports Quizzes</h2>
          <p className="mb-6 text-muted-foreground">
            Test your sports knowledge with these fun quizzes!
          </p>

          <Tabs defaultValue="cricket" className="w-full">
            <TabsList className="mb-4 w-full justify-start overflow-auto">
              <TabsTrigger value="cricket">Sri Lankan Cricket</TabsTrigger>
              <TabsTrigger value="football">Football</TabsTrigger>
              <TabsTrigger value="olympics">Olympics</TabsTrigger>
              <TabsTrigger value="basketball">Basketball</TabsTrigger>
            </TabsList>
            <TabsContent value="cricket">
              <Card>
                <CardContent className="pt-6">
                  <QuizComponent quiz={cricketQuiz} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="football">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex h-40 items-center justify-center">
                    <p className="text-muted-foreground">
                      Football quiz coming soon!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="olympics">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex h-40 items-center justify-center">
                    <p className="text-muted-foreground">
                      Olympics quiz coming soon!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="basketball">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex h-40 items-center justify-center">
                    <p className="text-muted-foreground">
                      Basketball quiz coming soon!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}

// Sample data
const categories = [
  { name: "Soccer", icon: <span className="text-2xl">⚽</span> },
  { name: "Basketball", icon: <span className="text-2xl">🏀</span> },
  { name: "Baseball", icon: <span className="text-2xl">⚾</span> },
  { name: "Swimming", icon: <span className="text-2xl">🏊</span> },
  { name: "Tennis", icon: <span className="text-2xl">🎾</span> },
  { name: "Gymnastics", icon: <span className="text-2xl">🤸</span> },
];

const videos = [
  {
    id: 1,
    title: "Basketball Basics for Beginners",
    description:
      "Learn the fundamentals of basketball with easy-to-follow instructions",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "5:14",
    views: "1.5M",
  },
  {
    id: 2,
    title: "Soccer Drills for Kids",
    description:
      "Fun and effective soccer drills to improve skills and coordination",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "4:32",
    views: "2.1M",
  },
  {
    id: 3,
    title: "Swimming Techniques for Children",
    description: "Safe and effective swimming techniques for kids of all ages",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "6:45",
    views: "980K",
  },
  {
    id: 4,
    title: "Baseball Batting Tips",
    description:
      "Improve your batting skills with these simple tips and exercises",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "3:28",
    views: "750K",
  },
  {
    id: 5,
    title: "Tennis for Kids: Getting Started",
    description:
      "Introduction to tennis for young players with basic techniques",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "5:10",
    views: "1.2M",
  },
  {
    id: 6,
    title: "Gymnastics: Basic Tumbling",
    description: "Learn safe tumbling techniques for beginning gymnasts",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "4:55",
    views: "1.8M",
  },
  {
    id: 7,
    title: "Kids Yoga for Athletes",
    description:
      "Yoga poses and stretches designed specifically for young athletes",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "7:20",
    views: "650K",
  },
  {
    id: 8,
    title: "Fun Relay Race Ideas",
    description:
      "Exciting relay race games for physical education and family fun",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "3:45",
    views: "920K",
  },
];

// Cricket Quiz Data
const cricketQuiz = {
  title: "Sri Lankan Cricket Quiz",
  questions: [
    {
      question: "What is the name of Sri Lanka's national cricket team?",
      options: [
        { text: "The Tigers", isCorrect: false },
        { text: "The Lions", isCorrect: true },
        { text: "The Dragons", isCorrect: false },
        { text: "The Eagles", isCorrect: false },
      ],
    },
    {
      question: "When did Sri Lanka win the Cricket World Cup?",
      options: [
        { text: "1996", isCorrect: true },
        { text: "2003", isCorrect: false },
        { text: "2011", isCorrect: false },
        { text: "2019", isCorrect: false },
      ],
    },
    {
      question: "Who was the captain when Sri Lanka won the 1996 World Cup?",
      options: [
        { text: "Kumar Sangakkara", isCorrect: false },
        { text: "Arjuna Ranatunga", isCorrect: true },
        { text: "Mahela Jayawardene", isCorrect: false },
        { text: "Sanath Jayasuriya", isCorrect: false },
      ],
    },
    {
      question: "What is the name of the biggest cricket stadium in Sri Lanka?",
      options: [
        { text: "Pallekele Stadium", isCorrect: false },
        { text: "R. Premadasa Stadium", isCorrect: true },
        { text: "Galle International Stadium", isCorrect: false },
        { text: "SSC Ground", isCorrect: false },
      ],
    },
    {
      question: "Who holds the record for the most Test wickets for Sri Lanka?",
      options: [
        { text: "Chaminda Vaas", isCorrect: false },
        { text: "Lasith Malinga", isCorrect: false },
        { text: "Muttiah Muralitharan", isCorrect: true },
        { text: "Angelo Mathews", isCorrect: false },
      ],
    },
    {
      question:
        "What is the traditional Sri Lankan cricket format played in villages?",
      options: [
        { text: "T10", isCorrect: false },
        { text: "Softball cricket", isCorrect: true },
        { text: "Test cricket", isCorrect: false },
        { text: "Beach cricket", isCorrect: false },
      ],
    },
    {
      question: "What is the most popular T20 cricket league in Sri Lanka?",
      options: [
        { text: "IPL", isCorrect: false },
        { text: "PSL", isCorrect: false },
        { text: "LPL", isCorrect: true },
        { text: "BBL", isCorrect: false },
      ],
    },
    {
      question:
        "Which Sri Lankan cricketer is known for his unique bowling action?",
      options: [
        { text: "Kumar Sangakkara", isCorrect: false },
        { text: "Mahela Jayawardene", isCorrect: false },
        { text: "Lasith Malinga", isCorrect: true },
        { text: "Tillakaratne Dilshan", isCorrect: false },
      ],
    },
    {
      question:
        "What is the special cricket shot invented by a Sri Lankan player?",
      options: [
        { text: "Switch hit", isCorrect: false },
        { text: "Uppercut", isCorrect: false },
        { text: "Dilscoop", isCorrect: true },
        { text: "Reverse sweep", isCorrect: false },
      ],
    },
    {
      question: "What is the color of the Sri Lankan cricket jersey?",
      options: [
        { text: "Green", isCorrect: false },
        { text: "Blue", isCorrect: true },
        { text: "Yellow", isCorrect: false },
        { text: "Red", isCorrect: false },
      ],
    },
  ],
};
