"use client";

import type React from "react";
import { motion } from "framer-motion";

import {
  School,
  FerrisWheel,
  VibrateIcon as Volleyball,
  Palette,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "react-router";

interface Subject {
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgGradient: string;
  navigateTo: string;
}

interface HeroSectionProps {
  user: {
    username: string;
    userType: string;
  };
}

export default function HeroSection({ user }: HeroSectionProps) {
  const subjects: Subject[] = [
    {
      name: "Local School Syllabus",
      description: "පාසල් විෂය නිර්දේශය",
      icon: School,
      color: "bg-blue-500/90",
      bgGradient: "from-blue-400 to-blue-600",
      navigateTo: "/local-syllabus",
    },
    {
      name: "Entertainment",
      description: "Videos, Music & Fun",
      icon: FerrisWheel,
      color: "bg-emerald-500/90",
      bgGradient: "from-emerald-400 to-emerald-600",
      navigateTo: "/entertainment",
    },
    {
      name: "Sports",
      description: "Activities & Games",
      icon: Volleyball,
      color: "bg-amber-500/90",
      bgGradient: "from-amber-400 to-amber-600",
      navigateTo: "/sports",
    },
    {
      name: "Arts & Crafts",
      description: "Creative Projects",
      icon: Palette,
      color: "bg-rose-500/90",
      bgGradient: "from-rose-400 to-rose-600",
      navigateTo: "/arts-and-crafts",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.2 + index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
    hover: {
      scale: 1.05,
      boxShadow:
        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-background to-background/80 py-16 lg:py-24">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute top-40 -left-40 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-40 right-20 h-60 w-60 rounded-full bg-amber-500/20 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          {/* Left column - Text content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex flex-col justify-center"
          >
            <motion.div variants={itemVariants} className="relative">
              <div className="absolute -left-4 -top-4 h-20 w-20 rounded-full bg-primary/10 blur-xl" />
              <motion.h1
                className="bg-gradient-to-br from-foreground to-foreground/80 text-5xl font-extrabold tracking-tight  lg:text-6xl xl:text-7xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <span className="block text-6xl lg:text-7xl xl:text-8xl">
                  Hi!
                </span>
                <span className="mt-2 block">
                  Little Genius{" "}
                  {user.userType === "student"
                    ? user.username.charAt(0).toUpperCase() +
                      user.username.slice(1)
                    : ""}
                </span>
              </motion.h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-xl text-muted-foreground"
            >
              Welcome back to LittleGenius Hub, what are you planning to learn
              today?
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-col gap-4 sm:flex-row"
            >
              <Button
                size="lg"
                className="group rounded-full bg-primary px-6 text-base font-medium text-primary-foreground shadow-md hover:bg-primary/90"
              >
                View Homework
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-6 text-base font-medium"
              >
                Play Games
              </Button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-12 flex items-center gap-4"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="inline-block h-10 w-10 overflow-hidden rounded-full border-2 border-background"
                  >
                    <img
                      src={`https://efqjdnqbwlsrbzstvlbp.supabase.co/storage/v1/object/public/avatars/67bb4d1e174f04dd6d627e4e_1742032648973_Graduate%20Student%20Avatar.png`}
                      alt={`User ${i}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-medium">
                  Join <span className="text-primary">2,500+</span> students
                  learning today
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column - Subject cards */}
          <div className="relative">
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 to-transparent rounded-3xl blur-xl" />

            <div className="mb-8 text-center">
              <motion.h2
                className="inline-block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-3xl font-bold text-transparent"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Subjects
              </motion.h2>
            </div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="grid gap-4 sm:grid-cols-2"
            >
              {subjects.map((subject, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={cardVariants}
                  whileHover="hover"
                  className="group"
                >
                  <Link to={subject.navigateTo}>
                    <Card
                      className={cn(
                        "relative h-full overflow-hidden border-0 shadow-lg transition-all duration-300",
                        "bg-gradient-to-br",
                        subject.bgGradient
                      )}
                    >
                      <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity group-hover:opacity-100" />
                      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/20 blur-2xl" />

                      <CardContent className="flex flex-col items-start gap-4 p-6">
                        <div className="rounded-full bg-white/20 p-3">
                          <subject.icon className="h-8 w-8 text-white" />
                        </div>

                        <div>
                          <h3 className="text-xl font-bold text-white">
                            {subject.name}
                          </h3>
                          <p className="mt-1 text-sm text-white/80">
                            {subject.description}
                          </p>
                        </div>

                        <div className="mt-auto flex w-full justify-end">
                          <div className="rounded-full bg-white/20 p-2 opacity-0 transition-opacity group-hover:opacity-100">
                            <ChevronRight className="h-4 w-4 text-white" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
