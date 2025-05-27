// src/components/sections/HeroSection.tsx
import Button from '@mui/material/Button';
import React from "react";
import { LuArrowRight } from "react-icons/lu";
import { Link } from "react-router-dom";
import profileImage from "../assets/react.svg";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">Annie Bhalla</h1>
              <p className="text-xl text-muted-foreground">
                AI & Robotics Specialist | MSc Computer Science - Autonomous Systems
              </p>
            </div>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Bridging the gap between artificial intelligence and robotics to create intelligent autonomous systems that solve real-world problems.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link to="/contact">
                <Button size="large">
                  Get in touch
                  <LuArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/projects">
                <Button size="large" variant="outlined">
                  View my work
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative aspect-square w-full max-w-[400px] overflow-hidden rounded-full border">
              <img
                src={profileImage}
                alt="Annie Bhalla"
                className="object-cover w-full h-full rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}