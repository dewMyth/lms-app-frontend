import { ChevronRight, Play } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuizComponent } from "@/components/quiz-component";
import Navbar from "@/components/nav-bar";

export default function SportsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Cricket");

  const handleVideoClick = (url?: string) => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  const filteredVideos = videos.filter(
    (video) => video.category === selectedCategory
  );

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
        {/* <div className="mb-6">
          <h2 className="mb-3 text-xl font-semibold">Featured Video</h2>
          <div className="relative overflow-hidden rounded-lg bg-muted">
            <div
              className="relative w-full bg-muted"
              style={{ aspectRatio: "16/9" }}
            >
              <img
                src="https://img.youtube.com/vi/3DAWLIHC5Uo/hqdefault.jpg"
                alt="Featured sports video thumbnail"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  size="sm"
                  className="rounded-full"
                  variant="secondary"
                  onClick={() =>
                    handleVideoClick(
                      "https://www.youtube.com/watch?v=3DAWLIHC5Uo"
                    )
                  }
                >
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
        </div> */}

        {/* Sports Categories */}
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Categories</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {categories.map((category) => (
              <Button
                key={category.name}
                variant={
                  selectedCategory === category.name ? "default" : "outline"
                }
                className="h-auto flex-col py-4 transition-all duration-200 hover:scale-105"
                onClick={() => setSelectedCategory(category.name)}
              >
                {category.icon}
                <span className="mt-2">{category.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Video Grid */}
        <div className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">
            {selectedCategory} Lessons
          </h2>
          {filteredVideos.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredVideos.map((video) => (
                <Card
                  key={video.id}
                  className="overflow-hidden transition-all duration-200 hover:shadow-lg"
                >
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
                        onClick={() => handleVideoClick(video.youtubeUrl)}
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
          ) : (
            <div className="flex h-40 items-center justify-center">
              <p className="text-muted-foreground">
                No videos available for {selectedCategory} at the moment.
              </p>
            </div>
          )}
        </div>

        {/* Sports Quizzes */}
        <div className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Sports Quizzes</h2>
          <p className="mb-6 text-muted-foreground">
            Test your sports knowledge with these fun quizzes!
          </p>

          <Tabs defaultValue="cricket" className="w-full">
            <TabsList className="mb-4 w-full justify-start overflow-auto">
              <TabsTrigger value="cricket">Cricket</TabsTrigger>
              <TabsTrigger value="football">Football</TabsTrigger>
              <TabsTrigger value="volleyball">Volleyball</TabsTrigger>
              <TabsTrigger value="tennis">Tennis</TabsTrigger>
              <TabsTrigger value="badminton">Badminton</TabsTrigger>
            </TabsList>

            <TabsContent value="cricket">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Cricket Quizzes</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardContent className="pt-6">
                      <QuizComponent quiz={cricketQuiz} />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <QuizComponent quiz={cricketBasicsQuiz} />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="football">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Football Quizzes</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardContent className="pt-6">
                      <QuizComponent quiz={sriLankanFootballQuiz} />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <QuizComponent quiz={footballBasicsQuiz} />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="volleyball">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Volleyball</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardContent className="pt-6">
                      <QuizComponent quiz={sriLankanVolleyballQuiz} />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <QuizComponent quiz={volleyballBasicsQuiz} />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tennis">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Tennis Quizzes</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardContent className="pt-6">
                      <QuizComponent quiz={sriLankanTennisQuiz} />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <QuizComponent quiz={tennisBasicsQuiz} />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="badminton">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Badminton Quizzes</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardContent className="pt-6">
                      <QuizComponent quiz={sriLankanBadmintonQuiz} />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <QuizComponent quiz={badmintonBasicsQuiz} />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}

// Sample data
const categories = [
  { name: "Cricket", icon: <span className="text-2xl">🏏</span> },
  { name: "Football", icon: <span className="text-2xl">⚽</span> },
  { name: "Volleyball", icon: <span className="text-2xl">🏐</span> },
  { name: "Tennis", icon: <span className="text-2xl">🎾</span> },
  { name: "Badminton", icon: <span className="text-2xl">🏸</span> },
];

const videos = [
  // Cricket Videos
  {
    id: 1,
    title: "How to Play Cricket",
    description:
      "Learn the fundamentals of cricket with easy-to-follow instructions",
    thumbnail: "https://img.youtube.com/vi/VwII4y5vpyU/hqdefault.jpg",
    duration: "5:14",
    views: "1.5M",
    youtubeUrl: "https://www.youtube.com/watch?v=VwII4y5vpyU",
    category: "Cricket",
  },
  {
    id: 2,
    title: "Sri Lankan Cricket Legends",
    description: "Meet the greatest Sri Lankan cricket players of all time",
    thumbnail: "https://img.youtube.com/vi/HCMJUB8-AMc/hqdefault.jpg",
    duration: "8:32",
    views: "2.1M",
    youtubeUrl: "https://www.youtube.com/watch?v=HCMJUB8-AMc",
    category: "Cricket",
  },
  {
    id: 3,
    title: "Cricket Batting Techniques",
    description: "Master the art of batting with professional tips",
    thumbnail: "https://img.youtube.com/vi/KY8gsVeKn0w/hqdefault.jpg",
    duration: "6:45",
    views: "980K",
    youtubeUrl: "https://www.youtube.com/watch?v=KY8gsVeKn0w",
    category: "Cricket",
  },
  {
    id: 4,
    title: "Cricket Bowling Skills",
    description: "Learn different bowling techniques and strategies",
    thumbnail: "https://img.youtube.com/vi/Zu4f3CFrZ6I/hqdefault.jpg",
    duration: "7:28",
    views: "750K",
    youtubeUrl: "https://www.youtube.com/watch?v=Zu4f3CFrZ6I",
    category: "Cricket",
  },

  // Football Videos
  {
    id: 6,
    title: "Football Basics for Beginners",
    description:
      "Learn the fundamentals of football with easy-to-follow instructions",
    thumbnail: "https://img.youtube.com/vi/Phnt5QZ7X7o/hqdefault.jpg",
    duration: "5:14",
    views: "1.5M",
    youtubeUrl: "https://www.youtube.com/watch?v=Phnt5QZ7X7o",
    category: "Football",
  },
  {
    id: 7,
    title: "Soccer Drills for Kids",
    description:
      "Fun and effective soccer drills to improve skills and coordination",
    thumbnail: "https://img.youtube.com/vi/X9f_c6LHoTI/hqdefault.jpg",
    duration: "4:32",
    views: "2.1M",
    youtubeUrl: "https://www.youtube.com/watch?v=X9f_c6LHoTI",
    category: "Football",
  },
  {
    id: 8,
    title: "Football Passing Techniques",
    description: "Master the art of passing in football",
    thumbnail: "https://img.youtube.com/vi/HZ5W1HDheTo/hqdefault.jpg",
    duration: "6:15",
    views: "890K",
    youtubeUrl: "https://www.youtube.com/watch?v=HZ5W1HDheTo",
    category: "Football",
  },
  {
    id: 9,
    title: "Football Shooting Skills",
    description: "Learn how to score goals like a pro",
    thumbnail: "https://img.youtube.com/vi/QDb5-cMIbjM/hqdefault.jpg",
    duration: "5:45",
    views: "1.1M",
    youtubeUrl: "https://www.youtube.com/watch?v=QDb5-cMIbjM",
    category: "Football",
  },

  // Volleyball Videos
  {
    id: 10,
    title: "Volleyball Basics for Kids",
    description: "Introduction to volleyball for young players",
    thumbnail: "https://img.youtube.com/vi/jxhuopeNAHE/hqdefault.jpg",
    duration: "4:55",
    views: "650K",
    youtubeUrl: "https://www.youtube.com/watch?v=jxhuopeNAHE",
    category: "Volleyball",
  },
  {
    id: 11,
    title: "Volleyball Serving Techniques",
    description: "Learn different serving techniques in volleyball",
    thumbnail: "https://img.youtube.com/vi/g5sX0LCitgs/hqdefault.jpg",
    duration: "6:20",
    views: "720K",
    youtubeUrl: "https://www.youtube.com/watch?v=g5sX0LCitgs",
    category: "Volleyball",
  },
  {
    id: 12,
    title: "Volleyball Spiking Skills",
    description: "Master the powerful spike in volleyball",
    thumbnail: "https://img.youtube.com/vi/u-WhjYYocBs/hqdefault.jpg",
    duration: "5:30",
    views: "850K",
    youtubeUrl: "https://www.youtube.com/watch?v=u-WhjYYocBs",
    category: "Volleyball",
  },

  // Tennis Videos
  {
    id: 13,
    title: "Tennis for Kids: Getting Started",
    description:
      "Introduction to tennis for young players with basic techniques",
    thumbnail: "https://img.youtube.com/vi/YqgcykDGB2A/hqdefault.jpg",
    duration: "5:10",
    views: "1.2M",
    youtubeUrl: "https://www.youtube.com/watch?v=YqgcykDGB2A",
    category: "Tennis",
  },
  {
    id: 14,
    title: "Tennis Forehand Techniques",
    description: "Learn proper forehand technique in tennis",
    thumbnail: "https://img.youtube.com/vi/5arVdubK9Pg/hqdefault.jpg",
    duration: "4:45",
    views: "680K",
    youtubeUrl: "https://www.youtube.com/watch?v=5arVdubK9Pg",
    category: "Tennis",
  },
  {
    id: 15,
    title: "Tennis Backhand Skills",
    description: "Master the backhand stroke in tennis",
    thumbnail: "https://img.youtube.com/vi/Ulk_gXK9GrI/hqdefault.jpg",
    duration: "5:55",
    views: "590K",
    youtubeUrl: "https://www.youtube.com/watch?v=Ulk_gXK9GrI",
    category: "Tennis",
  },

  // Badminton Videos
  {
    id: 16,
    title: "Badminton Basics for Beginners",
    description: "Learn the fundamentals of badminton",
    thumbnail: "https://img.youtube.com/vi/1UIhKZCPMYM/hqdefault.jpg",
    duration: "4:20",
    views: "420K",
    youtubeUrl: "https://www.youtube.com/watch?v=1UIhKZCPMYM",
    category: "Badminton",
  },
  {
    id: 17,
    title: "Badminton Serving Techniques",
    description: "Master different serving techniques in badminton",
    thumbnail: "https://img.youtube.com/vi/kzWpvuWeih0/hqdefault.jpg",
    duration: "3:50",
    views: "380K",
    youtubeUrl: "https://www.youtube.com/watch?v=kzWpvuWeih0",
    category: "Badminton",
  },
  {
    id: 18,
    title: "Badminton Smash Skills",
    description: "Learn the powerful smash shot in badminton",
    thumbnail: "https://img.youtube.com/vi/6DnG1ruwxho/hqdefault.jpg",
    duration: "5:15",
    views: "520K",
    youtubeUrl: "https://www.youtube.com/watch?v=6DnG1ruwxho",
    category: "Badminton",
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

// Cricket Basics Quiz Data
const cricketBasicsQuiz = {
  title: "Cricket Basics Quiz",
  questions: [
    {
      question: "How many players are there in a cricket team?",
      options: [
        { text: "9 players", isCorrect: false },
        { text: "10 players", isCorrect: false },
        { text: "11 players", isCorrect: true },
        { text: "12 players", isCorrect: false },
      ],
    },
    {
      question: "What is the main equipment used by a batsman?",
      options: [
        { text: "Ball", isCorrect: false },
        { text: "Bat", isCorrect: true },
        { text: "Gloves", isCorrect: false },
        { text: "Helmet", isCorrect: false },
      ],
    },
    {
      question: "What is an 'over' in cricket?",
      options: [
        { text: "6 balls bowled by one bowler", isCorrect: true },
        { text: "10 balls bowled by one bowler", isCorrect: false },
        { text: "A complete innings", isCorrect: false },
        { text: "A match", isCorrect: false },
      ],
    },
    {
      question: "How many runs do you get for hitting a six?",
      options: [
        { text: "4 runs", isCorrect: false },
        { text: "5 runs", isCorrect: false },
        { text: "6 runs", isCorrect: true },
        { text: "7 runs", isCorrect: false },
      ],
    },
    {
      question: "What is a 'wicket' in cricket?",
      options: [
        { text: "A type of bat", isCorrect: false },
        { text: "The stumps and bails", isCorrect: true },
        { text: "A type of ball", isCorrect: false },
        { text: "A player position", isCorrect: false },
      ],
    },
    {
      question: "What happens when a batsman is 'bowled'?",
      options: [
        { text: "The ball hits the stumps", isCorrect: true },
        { text: "The ball is caught", isCorrect: false },
        { text: "The ball goes for four", isCorrect: false },
        { text: "The ball is wide", isCorrect: false },
      ],
    },
    {
      question: "What is a 'no-ball' in cricket?",
      options: [
        { text: "A ball that goes for four", isCorrect: false },
        { text: "An illegal delivery by the bowler", isCorrect: true },
        { text: "A ball that hits the stumps", isCorrect: false },
        { text: "A ball that is caught", isCorrect: false },
      ],
    },
    {
      question: "What is the name of the cricket field?",
      options: [
        { text: "Pitch", isCorrect: false },
        { text: "Ground", isCorrect: true },
        { text: "Court", isCorrect: false },
        { text: "Field", isCorrect: false },
      ],
    },
    {
      question: "What is a 'duck' in cricket?",
      options: [
        { text: "A type of bird", isCorrect: false },
        { text: "Getting out without scoring any runs", isCorrect: true },
        { text: "A type of shot", isCorrect: false },
        { text: "A type of ball", isCorrect: false },
      ],
    },
    {
      question: "What is the 'crease' in cricket?",
      options: [
        { text: "A line on the pitch", isCorrect: true },
        { text: "A type of bat", isCorrect: false },
        { text: "A player position", isCorrect: false },
        { text: "A type of ball", isCorrect: false },
      ],
    },
    {
      question: "What is a 'maiden over'?",
      options: [
        { text: "An over with no runs scored", isCorrect: true },
        { text: "An over with 6 runs scored", isCorrect: false },
        { text: "An over with a wicket", isCorrect: false },
        { text: "An over with a six", isCorrect: false },
      ],
    },
    {
      question: "What is the 'third umpire'?",
      options: [
        { text: "A player", isCorrect: false },
        {
          text: "An official who reviews decisions using technology",
          isCorrect: true,
        },
        { text: "A type of ball", isCorrect: false },
        { text: "A fielding position", isCorrect: false },
      ],
    },
  ],
};

// Football Quiz Data
const sriLankanFootballQuiz = {
  title: "Sri Lankan Football Quiz",
  questions: [
    {
      question: "What is the national football team of Sri Lanka called?",
      options: [
        { text: "Sri Lanka Warriors", isCorrect: false },
        { text: "Sri Lanka Lions", isCorrect: true },
        { text: "Lankan Kickers", isCorrect: false },
        { text: "Colombo Stars", isCorrect: false },
      ],
    },
    {
      question: "How many players are in a football team?",
      options: [
        { text: "9", isCorrect: false },
        { text: "10", isCorrect: false },
        { text: "11", isCorrect: true },
        { text: "12", isCorrect: false },
      ],
    },
    {
      question: "What is the most famous football tournament in the world?",
      options: [
        { text: "Sri Lanka Premier League", isCorrect: false },
        { text: "FIFA World Cup", isCorrect: true },
        { text: "Indian Super League", isCorrect: false },
        { text: "UEFA Europa League", isCorrect: false },
      ],
    },
    {
      question: "What is the main football stadium in Sri Lanka?",
      options: [
        { text: "Sugathadasa Stadium", isCorrect: true },
        { text: "R. Premadasa Stadium", isCorrect: false },
        { text: "Pallekele Stadium", isCorrect: false },
        { text: "SSC Grounds", isCorrect: false },
      ],
    },
    {
      question: "How long is a football match?",
      options: [
        { text: "60 minutes", isCorrect: false },
        { text: "70 minutes", isCorrect: false },
        { text: "90 minutes", isCorrect: true },
        { text: "120 minutes", isCorrect: false },
      ],
    },
    {
      question: "What is the job of a goalkeeper?",
      options: [
        { text: "Pass the ball", isCorrect: false },
        { text: "Defend the goal", isCorrect: true },
        { text: "Kick only", isCorrect: false },
        { text: "Run with the ball", isCorrect: false },
      ],
    },
    {
      question:
        "What is it called when a player scores three goals in one match?",
      options: [
        { text: "Double", isCorrect: false },
        { text: "Hat-trick", isCorrect: true },
        { text: "Goal streak", isCorrect: false },
        { text: "Super goal", isCorrect: false },
      ],
    },
    {
      question: "What is the name of Sri Lanka’s biggest football league?",
      options: [
        { text: "Lanka Super League", isCorrect: true },
        { text: "Colombo Premier League", isCorrect: false },
        { text: "National Football Cup", isCorrect: false },
        { text: "Island League", isCorrect: false },
      ],
    },
    {
      question: "What do players use to kick the ball?",
      options: [
        { text: "Hands", isCorrect: false },
        { text: "Head", isCorrect: false },
        { text: "Feet", isCorrect: true },
        { text: "Elbows", isCorrect: false },
      ],
    },
    {
      question: "What happens when a player commits a serious foul?",
      options: [
        { text: "They get a yellow card", isCorrect: true },
        { text: "They win a goal", isCorrect: false },
        { text: "They get extra time", isCorrect: false },
        { text: "The game stops", isCorrect: false },
      ],
    },
  ],
};

// Football Basics Quiz Data
const footballBasicsQuiz = {
  title: "Football Fundamentals Quiz",
  questions: [
    {
      question: "How many players are in a football team on the field?",
      options: [
        { text: "9", isCorrect: false },
        { text: "10", isCorrect: false },
        { text: "11", isCorrect: true },
        { text: "12", isCorrect: false },
      ],
    },
    {
      question: "What is the main object used to play football?",
      options: [
        { text: "Bat", isCorrect: false },
        { text: "Ball", isCorrect: true },
        { text: "Net", isCorrect: false },
        { text: "Stick", isCorrect: false },
      ],
    },
    {
      question: "What is the shape of a football?",
      options: [
        { text: "Square", isCorrect: false },
        { text: "Oval", isCorrect: false },
        { text: "Round", isCorrect: true },
        { text: "Triangle", isCorrect: false },
      ],
    },
    {
      question: "What do players use to kick the ball?",
      options: [
        { text: "Hands", isCorrect: false },
        { text: "Feet", isCorrect: true },
        { text: "Head", isCorrect: false },
        { text: "Elbows", isCorrect: false },
      ],
    },
    {
      question: "What happens when the ball goes into the opponent’s goal?",
      options: [
        { text: "A point is scored", isCorrect: true },
        { text: "The game stops", isCorrect: false },
        { text: "The referee takes the ball", isCorrect: false },
        { text: "The game restarts from the goal line", isCorrect: false },
      ],
    },
    {
      question: "How does a football game start?",
      options: [
        { text: "Goal kick", isCorrect: false },
        { text: "Kick-off", isCorrect: true },
        { text: "Throw-in", isCorrect: false },
        { text: "Corner kick", isCorrect: false },
      ],
    },
    {
      question:
        "What is the name of the player who can touch the ball with hands?",
      options: [
        { text: "Defender", isCorrect: false },
        { text: "Goalkeeper", isCorrect: true },
        { text: "Striker", isCorrect: false },
        { text: "Midfielder", isCorrect: false },
      ],
    },
    {
      question: "How long is a standard football match?",
      options: [
        { text: "60 minutes", isCorrect: false },
        { text: "70 minutes", isCorrect: false },
        { text: "90 minutes", isCorrect: true },
        { text: "100 minutes", isCorrect: false },
      ],
    },
    {
      question:
        "What is it called when a player passes the ball to a teammate to score?",
      options: [
        { text: "Tackle", isCorrect: false },
        { text: "Assist", isCorrect: true },
        { text: "Foul", isCorrect: false },
        { text: "Goal", isCorrect: false },
      ],
    },
    {
      question: "What happens if the game ends in a tie?",
      options: [
        { text: "The game is replayed", isCorrect: false },
        { text: "A penalty shootout or extra time", isCorrect: true },
        { text: "The referee chooses the winner", isCorrect: false },
        { text: "The game stops", isCorrect: false },
      ],
    },
  ],
};

const sriLankanVolleyballQuiz = {
  title: "Volleyball Basics Quiz",
  questions: [
    {
      question: "What is the national sport of Sri Lanka?",
      options: [
        { text: "Cricket", isCorrect: false },
        { text: "Football", isCorrect: false },
        { text: "Volleyball", isCorrect: true },
        { text: "Rugby", isCorrect: false },
      ],
    },
    {
      question: "How many players are in a volleyball team?",
      options: [
        { text: "5", isCorrect: false },
        { text: "6", isCorrect: true },
        { text: "7", isCorrect: false },
        { text: "8", isCorrect: false },
      ],
    },
    {
      question:
        "What is the name of the Sri Lankan men’s national volleyball team?",
      options: [
        { text: "Sri Lanka Spikers", isCorrect: true },
        { text: "Lanka Eagles", isCorrect: false },
        { text: "Colombo Smashers", isCorrect: false },
        { text: "Island Jumpers", isCorrect: false },
      ],
    },
    {
      question:
        "In which year was volleyball declared the national sport of Sri Lanka?",
      options: [
        { text: "1948", isCorrect: false },
        { text: "1991", isCorrect: true },
        { text: "1965", isCorrect: false },
        { text: "2000", isCorrect: false },
      ],
    },
    {
      question: "How many sets are in a volleyball match?",
      options: [
        { text: "3", isCorrect: false },
        { text: "5", isCorrect: true },
        { text: "7", isCorrect: false },
        { text: "9", isCorrect: false },
      ],
    },
    {
      question: "What is the most important skill in volleyball?",
      options: [
        { text: "Running", isCorrect: false },
        { text: "Jumping", isCorrect: false },
        { text: "Passing", isCorrect: true },
        { text: "Catching", isCorrect: false },
      ],
    },
    {
      question:
        "What is the name of the famous Sri Lankan volleyball championship?",
      options: [
        { text: "Sri Lanka Volleyball Super League", isCorrect: true },
        { text: "Lanka Premier League", isCorrect: false },
        { text: "Colombo Open", isCorrect: false },
        { text: "National Cricket League", isCorrect: false },
      ],
    },
    {
      question:
        "What is the maximum number of touches allowed before the ball goes over the net?",
      options: [
        { text: "1", isCorrect: false },
        { text: "2", isCorrect: false },
        { text: "3", isCorrect: true },
        { text: "4", isCorrect: false },
      ],
    },
    {
      question:
        "What happens when the ball touches the ground inside the opponent’s court?",
      options: [
        { text: "The game stops", isCorrect: false },
        { text: "The serving team wins a point", isCorrect: true },
        { text: "The ball is returned", isCorrect: false },
        { text: "The referee restarts", isCorrect: false },
      ],
    },
    {
      question:
        "What is a powerful shot that sends the ball downward into the opponent’s court?",
      options: [
        { text: "Serve", isCorrect: false },
        { text: "Bump", isCorrect: false },
        { text: "Spike", isCorrect: true },
        { text: "Pass", isCorrect: false },
      ],
    },
  ],
};

const volleyballBasicsQuiz = {
  title: "Volleyball Fundamentals Quiz",
  questions: [
    {
      question: "How many players are in a volleyball team on the court?",
      options: [
        { text: "4", isCorrect: false },
        { text: "5", isCorrect: false },
        { text: "6", isCorrect: true },
        { text: "7", isCorrect: false },
      ],
    },
    {
      question: "What is the main object used to play volleyball?",
      options: [
        { text: "Bat", isCorrect: false },
        { text: "Ball", isCorrect: true },
        { text: "Net", isCorrect: false },
        { text: "Racket", isCorrect: false },
      ],
    },
    {
      question: "What do players hit the ball over in volleyball?",
      options: [
        { text: "A wall", isCorrect: false },
        { text: "A rope", isCorrect: false },
        { text: "A net", isCorrect: true },
        { text: "A fence", isCorrect: false },
      ],
    },
    {
      question:
        "How many times can a team hit the ball before sending it over the net?",
      options: [
        { text: "2", isCorrect: false },
        { text: "3", isCorrect: true },
        { text: "4", isCorrect: false },
        { text: "5", isCorrect: false },
      ],
    },
    {
      question:
        "What is it called when a player hits the ball over the net using both hands from below?",
      options: [
        { text: "Spike", isCorrect: false },
        { text: "Pass", isCorrect: true },
        { text: "Serve", isCorrect: false },
        { text: "Block", isCorrect: false },
      ],
    },
    {
      question:
        "What part of the body is mostly used to hit the ball in volleyball?",
      options: [
        { text: "Head", isCorrect: false },
        { text: "Hands", isCorrect: true },
        { text: "Feet", isCorrect: false },
        { text: "Chest", isCorrect: false },
      ],
    },
    {
      question:
        "What happens if the ball touches the ground inside the opponent’s court?",
      options: [
        { text: "The team gets a point", isCorrect: true },
        { text: "The ball is out", isCorrect: false },
        { text: "The game stops", isCorrect: false },
        { text: "The ball is served again", isCorrect: false },
      ],
    },
    {
      question: "What is the first hit in a rally called?",
      options: [
        { text: "Spike", isCorrect: false },
        { text: "Serve", isCorrect: true },
        { text: "Block", isCorrect: false },
        { text: "Pass", isCorrect: false },
      ],
    },
    {
      question:
        "What is the name of the hit where a player jumps and forcefully sends the ball down?",
      options: [
        { text: "Serve", isCorrect: false },
        { text: "Block", isCorrect: false },
        { text: "Spike", isCorrect: true },
        { text: "Pass", isCorrect: false },
      ],
    },
    {
      question: "Where do players stand before the ball is served?",
      options: [
        { text: "Outside the court", isCorrect: false },
        { text: "On the net", isCorrect: false },
        { text: "Inside their team’s area", isCorrect: true },
        { text: "Behind the referee", isCorrect: false },
      ],
    },
  ],
};

const sriLankanTennisQuiz = {
  title: "Tennis Basics Quiz",
  questions: [
    {
      question: "What is the name of Sri Lanka’s top tennis tournament?",
      options: [
        { text: "Sri Lanka Open", isCorrect: true },
        { text: "Lanka Grand Slam", isCorrect: false },
        { text: "Colombo Cup", isCorrect: false },
        { text: "Galle Invitational", isCorrect: false },
      ],
    },
    {
      question: "What is the playing area called in tennis?",
      options: [
        { text: "Field", isCorrect: false },
        { text: "Court", isCorrect: true },
        { text: "Ground", isCorrect: false },
        { text: "Track", isCorrect: false },
      ],
    },
    {
      question: "What do players use to hit the ball?",
      options: [
        { text: "Bat", isCorrect: false },
        { text: "Racket", isCorrect: true },
        { text: "Paddle", isCorrect: false },
        { text: "Stick", isCorrect: false },
      ],
    },
    {
      question: "What is the first point in a tennis game called?",
      options: [
        { text: "10", isCorrect: false },
        { text: "15", isCorrect: true },
        { text: "20", isCorrect: false },
        { text: "30", isCorrect: false },
      ],
    },
    {
      question: "How many sets are in a standard tennis match?",
      options: [
        { text: "2", isCorrect: false },
        { text: "3", isCorrect: true },
        { text: "5", isCorrect: false },
        { text: "7", isCorrect: false },
      ],
    },
    {
      question: "What surface is used in the Sri Lanka Open?",
      options: [
        { text: "Grass", isCorrect: false },
        { text: "Clay", isCorrect: true },
        { text: "Hardcourt", isCorrect: false },
        { text: "Wood", isCorrect: false },
      ],
    },
    {
      question: "Who is a famous Sri Lankan tennis player?",
      options: [
        { text: "Harshana Godamanna", isCorrect: true },
        { text: "Kumar Sangakkara", isCorrect: false },
        { text: "Lasith Malinga", isCorrect: false },
        { text: "Sanath Jayasuriya", isCorrect: false },
      ],
    },
    {
      question:
        "What happens if the ball touches the net but goes over on a serve?",
      options: [
        { text: "Fault", isCorrect: false },
        { text: "Let", isCorrect: true },
        { text: "Out", isCorrect: false },
        { text: "Point lost", isCorrect: false },
      ],
    },
    {
      question: "What is it called when a player wins six games in a set?",
      options: [
        { text: "Win", isCorrect: false },
        { text: "Game", isCorrect: false },
        { text: "Set", isCorrect: true },
        { text: "Tie", isCorrect: false },
      ],
    },
    {
      question: "What is the biggest tennis tournament in the world?",
      options: [
        { text: "Wimbledon", isCorrect: true },
        { text: "US Open", isCorrect: false },
        { text: "Australian Open", isCorrect: false },
        { text: "French Open", isCorrect: false },
      ],
    },
  ],
};

const tennisBasicsQuiz = {
  title: "Tennis Fundamentals Quiz",
  questions: [
    {
      question: "What do players use to hit the ball in tennis?",
      options: [
        { text: "Bat", isCorrect: false },
        { text: "Stick", isCorrect: false },
        { text: "Racket", isCorrect: true },
        { text: "Paddle", isCorrect: false },
      ],
    },
    {
      question: "What is the ball used in tennis called?",
      options: [
        { text: "Football", isCorrect: false },
        { text: "Tennis ball", isCorrect: true },
        { text: "Basketball", isCorrect: false },
        { text: "Cricket ball", isCorrect: false },
      ],
    },
    {
      question: "How many players are there in a singles tennis match?",
      options: [
        { text: "1", isCorrect: false },
        { text: "2", isCorrect: true },
        { text: "4", isCorrect: false },
        { text: "6", isCorrect: false },
      ],
    },
    {
      question: "What is the name of the area where tennis is played?",
      options: [
        { text: "Field", isCorrect: false },
        { text: "Court", isCorrect: true },
        { text: "Ground", isCorrect: false },
        { text: "Track", isCorrect: false },
      ],
    },
    {
      question: "What is the net used for in tennis?",
      options: [
        { text: "To stop the ball from going too far", isCorrect: false },
        { text: "To divide the court into two halves", isCorrect: true },
        { text: "To help the players", isCorrect: false },
        { text: "To keep the ball in play", isCorrect: false },
      ],
    },
    {
      question: "How does a tennis game start?",
      options: [
        { text: "With a throw-in", isCorrect: false },
        { text: "With a kick", isCorrect: false },
        { text: "With a serve", isCorrect: true },
        { text: "With a jump", isCorrect: false },
      ],
    },
    {
      question: "What surface can a tennis court be made of?",
      options: [
        { text: "Grass", isCorrect: false },
        { text: "Clay", isCorrect: false },
        { text: "Hardcourt", isCorrect: false },
        { text: "All of the above", isCorrect: true },
      ],
    },
    {
      question: "How many points does a player need to win a game?",
      options: [
        { text: "2", isCorrect: false },
        { text: "4", isCorrect: true },
        { text: "6", isCorrect: false },
        { text: "10", isCorrect: false },
      ],
    },
    {
      question: "What is it called when the ball is hit before it bounces?",
      options: [
        { text: "Serve", isCorrect: false },
        { text: "Volley", isCorrect: true },
        { text: "Smash", isCorrect: false },
        { text: "Forehand", isCorrect: false },
      ],
    },
    {
      question: "What happens if the ball lands outside the court?",
      options: [
        { text: "The player loses the point", isCorrect: true },
        { text: "The game stops", isCorrect: false },
        { text: "The player wins a point", isCorrect: false },
        { text: "The ball is returned", isCorrect: false },
      ],
    },
  ],
};

const sriLankanBadmintonQuiz = {
  title: "Badminton Basics Quiz",
  questions: [
    {
      question: "What is the name of the shuttlecock in badminton?",
      options: [
        { text: "Ball", isCorrect: false },
        { text: "Birdie", isCorrect: true },
        { text: "Puck", isCorrect: false },
        { text: "Dart", isCorrect: false },
      ],
    },
    {
      question: "How many players can play in a doubles badminton game?",
      options: [
        { text: "2", isCorrect: false },
        { text: "4", isCorrect: true },
        { text: "6", isCorrect: false },
        { text: "8", isCorrect: false },
      ],
    },
    {
      question: "What is the name of Sri Lanka’s biggest badminton tournament?",
      options: [
        { text: "Sri Lanka Open", isCorrect: true },
        { text: "Lanka Smash", isCorrect: false },
        { text: "Colombo Cup", isCorrect: false },
        { text: "National Racket Championship", isCorrect: false },
      ],
    },
    {
      question: "What do players use to hit the shuttlecock?",
      options: [
        { text: "Bat", isCorrect: false },
        { text: "Racket", isCorrect: true },
        { text: "Stick", isCorrect: false },
        { text: "Paddle", isCorrect: false },
      ],
    },
    {
      question:
        "How many points must a player score to win a game in badminton?",
      options: [
        { text: "15", isCorrect: false },
        { text: "21", isCorrect: true },
        { text: "30", isCorrect: false },
        { text: "10", isCorrect: false },
      ],
    },
    {
      question: "What happens when the shuttlecock lands outside the court?",
      options: [
        { text: "The player gets a point", isCorrect: false },
        { text: "It is a fault", isCorrect: true },
        { text: "The game stops", isCorrect: false },
        { text: "The player wins", isCorrect: false },
      ],
    },
    {
      question: "Who is a famous Sri Lankan badminton player?",
      options: [
        { text: "Niluka Karunaratne", isCorrect: true },
        { text: "Muttiah Muralitharan", isCorrect: false },
        { text: "Dhananjaya de Silva", isCorrect: false },
        { text: "Kumar Sangakkara", isCorrect: false },
      ],
    },
    {
      question: "What is the main badminton stadium in Sri Lanka?",
      options: [
        { text: "Sugathadasa Indoor Stadium", isCorrect: true },
        { text: "R. Premadasa Stadium", isCorrect: false },
        { text: "Pallekele Stadium", isCorrect: false },
        { text: "Galle Stadium", isCorrect: false },
      ],
    },
    {
      question: "What is the fastest badminton shot called?",
      options: [
        { text: "Drop shot", isCorrect: false },
        { text: "Lob", isCorrect: false },
        { text: "Smash", isCorrect: true },
        { text: "Serve", isCorrect: false },
      ],
    },
    {
      question: "What is the international badminton tournament called?",
      options: [
        { text: "FIFA World Cup", isCorrect: false },
        { text: "Thomas Cup", isCorrect: true },
        { text: "Wimbledon", isCorrect: false },
        { text: "Asia Cup", isCorrect: false },
      ],
    },
  ],
};

const badmintonBasicsQuiz = {
  title: "Badminton Fundamentals Quiz",
  questions: [
    {
      question: "What do players use to hit the shuttlecock in badminton?",
      options: [
        { text: "Bat", isCorrect: false },
        { text: "Racket", isCorrect: true },
        { text: "Stick", isCorrect: false },
        { text: "Paddle", isCorrect: false },
      ],
    },
    {
      question: "What is the object that players hit in badminton called?",
      options: [
        { text: "Ball", isCorrect: false },
        { text: "Shuttlecock", isCorrect: true },
        { text: "Puck", isCorrect: false },
        { text: "Net", isCorrect: false },
      ],
    },
    {
      question: "How many players are there in a singles badminton match?",
      options: [
        { text: "1", isCorrect: false },
        { text: "2", isCorrect: true },
        { text: "4", isCorrect: false },
        { text: "6", isCorrect: false },
      ],
    },
    {
      question: "What is the name of the area where badminton is played?",
      options: [
        { text: "Field", isCorrect: false },
        { text: "Court", isCorrect: true },
        { text: "Ground", isCorrect: false },
        { text: "Track", isCorrect: false },
      ],
    },
    {
      question: "What is the net used for in badminton?",
      options: [
        { text: "To stop the shuttlecock", isCorrect: false },
        { text: "To divide the court into two halves", isCorrect: true },
        { text: "To help players", isCorrect: false },
        { text: "To keep the shuttlecock in play", isCorrect: false },
      ],
    },
    {
      question: "How does a badminton game start?",
      options: [
        { text: "With a serve", isCorrect: true },
        { text: "With a throw-in", isCorrect: false },
        { text: "With a kick", isCorrect: false },
        { text: "With a jump", isCorrect: false },
      ],
    },
    {
      question: "What surface can a badminton court be made of?",
      options: [
        { text: "Grass", isCorrect: false },
        { text: "Clay", isCorrect: false },
        { text: "Wooden or synthetic", isCorrect: true },
        { text: "Concrete", isCorrect: false },
      ],
    },
    {
      question: "How many points does a player need to win a game?",
      options: [
        { text: "15", isCorrect: false },
        { text: "21", isCorrect: true },
        { text: "30", isCorrect: false },
        { text: "40", isCorrect: false },
      ],
    },
    {
      question:
        "What is it called when a player hits the shuttlecock before it touches the ground?",
      options: [
        { text: "Serve", isCorrect: false },
        { text: "Volley", isCorrect: true },
        { text: "Smash", isCorrect: false },
        { text: "Forehand", isCorrect: false },
      ],
    },
    {
      question: "What happens if the shuttlecock lands outside the court?",
      options: [
        { text: "The player loses the point", isCorrect: true },
        { text: "The game stops", isCorrect: false },
        { text: "The player wins a point", isCorrect: false },
        { text: "The shuttlecock is returned", isCorrect: false },
      ],
    },
  ],
};
