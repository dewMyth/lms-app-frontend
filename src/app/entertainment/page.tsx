import Navbar from "@/components/nav-bar";
import React from "react";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router";

const categories = [
  {
    name: "Music",
    icon: "🎵",
    redirectTo: "music",
  },
  { name: "Drama", icon: "🎭", redirectTo: "drama" },
  { name: "Dancing", icon: "💃", redirectTo: "dancing" },
];

function Entertainment() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className=" mt-10 px-10">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Entertainment
        </h1>
        <br />
        <hr />
        <br />
        <div>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Once upon a time, in a far-off land, there was a very lazy king who
            spent all day lounging on his throne. One day, his advisors came to
            him with a problem: the kingdom was running out of money. Once upon
            a time, in a far-off land, there was a very lazy king who spent all
            day lounging on his throne. One day, his advisors came to him with a
            problem: the kingdom was running out of money. Once upon a time, in
            a far-off land, there was a very lazy king who spent all day
            lounging on his throne. One day, his advisors came to him with a
            problem: the kingdom was running out of money. Once upon a time, in
            a far-off land, there was a very lazy king who spent all day
            lounging on his throne. One day, his advisors came to him with a
            problem: the kingdom was running out of money.
          </p>
        </div>
      </div>
      <div className="p-6 max-w-4xl mx-auto flex items-center justify-center">
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
      </div>
    </>
  );
}

export default Entertainment;
