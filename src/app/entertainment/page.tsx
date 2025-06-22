import Navbar from "@/components/nav-bar";
import React from "react";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router";
import Music from "./music/page";

const categories = [
  {
    name: "Music",
    icon: "🎵",
    redirectTo: "music",
  },
];

function Entertainment() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Entertainment
        </h1>
        <br />
        <hr />
        <br />
        <div>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Welcome to the magical world of music! 🎵✨ Here, you'll discover
            amazing songs that make you want to dance, sing, and have fun! From
            catchy tunes that help you learn your ABCs to silly songs that make
            you giggle, music is like a superpower that can turn any boring day
            into an adventure. Whether you want to learn about different
            instruments, sing along to your favorite nursery rhymes, or create
            your own musical masterpieces, you're in the right place! So put on
            your dancing shoes, grab your imaginary microphone, and let's make
            some beautiful music together! 🎹🎸🎷
          </p>
        </div>
      </div>

      <Music />
      {/* <div className="p-6 max-w-4xl mx-auto flex items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card
              key={category.name}
              className="cursor-pointer hover:shadow-lg transition"
              onClick={() => navigate(`/entertainment/${category.redirectTo}`)}
            >
              <CardHeader className="flex flex-col items-center">
                <div className="text-5xl">{category.icon}</div>
                <CardTitle className="mt-2">{category.name}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div> */}
    </>
  );
}

export default Entertainment;
