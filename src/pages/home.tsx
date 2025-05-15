import { Button } from "@mui/joy"
import { LuArrowRight, LuBrain, LuCode, LuFlaskConical, LuRocket } from "react-icons/lu"
import { Link } from "react-router-dom"
import HighlightCard from "../components/highlight-card"

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Annie Bhalla</h1>
                <p className="text-xl text-muted-foreground">
                  AI & Robotics Specialist | MSc Computer Science - Autonomous Systems
                </p>
              </div>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Bridging the gap between artificial intelligence and robotics to create intelligent autonomous systems
                that solve real-world problems.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link to="/contact">
                  <Button size="lg">
                    Get in touch
                    <LuArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/projects">
                  <Button size="lg" variant="outlined">
                    View my work
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative aspect-square w-full max-w-[400px] overflow-hidden rounded-full border">
                <img
                  src="/placeholder.svg?height=400&width=400"
                  alt="Annie Bhalla"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Expertise Highlights</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Combining theoretical knowledge with practical experience in AI, robotics, and autonomous systems
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
          <HighlightCard
            icon={<LuBrain className="h-10 w-10" />}
            title="Artificial Intelligence"
            description="Machine learning, deep learning, and neural networks for intelligent systems"
          />
          <HighlightCard
            icon={<LuRocket className="h-10 w-10" />}
            title="Robotics"
            description="Robot perception, control systems, and human-robot interaction"
          />
          <HighlightCard
            icon={<LuCode className="h-10 w-10" />}
            title="Development"
            description="Frontend and backend development with modern frameworks and tools"
          />
          <HighlightCard
            icon={<LuFlaskConical className="h-10 w-10" />}
            title="Research"
            description="Academic research in autonomous systems and computer vision"
          />
        </div>
      </section>

      {/* Experience Preview */}
      <section className="bg-muted py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Professional Experience</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Working with leading organizations in technology and research
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                <img src="/placeholder.svg?height=64&width=64" alt="DLR Logo" className="rounded-full w-16 h-16" />
              </div>
              <h3 className="text-xl font-bold">DLR</h3>
              <p className="text-sm text-muted-foreground text-center">
                German Aerospace Center - Research in autonomous robotics systems
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                <img
                  src="/placeholder.svg?height=64&width=64"
                  alt="Mercedes-Benz Logo"
                  className="rounded-full w-16 h-16"
                />
              </div>
              <h3 className="text-xl font-bold">Mercedes-Benz</h3>
              <p className="text-sm text-muted-foreground text-center">
                Development of AI solutions for automotive applications
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                <img
                  src="/placeholder.svg?height=64&width=64"
                  alt="University of Stuttgart Logo"
                  className="rounded-full w-16 h-16"
                />
              </div>
              <h3 className="text-xl font-bold">University of Stuttgart</h3>
              <p className="text-sm text-muted-foreground text-center">
                Research and teaching in computer science and autonomous systems
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <Link to="/experience">
              <Button size="lg" variant="outlined">
                View full experience
                <LuArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Projects Preview */}
      <section className="container px-4 md:px-6 py-12">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Projects</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A selection of my work in AI, robotics, and software development
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2">
          <div className="group relative overflow-hidden rounded-lg border">
            <div className="aspect-video overflow-hidden">
              <img
                src="/placeholder.svg?height=450&width=800"
                alt="Autonomous Navigation System"
                className="object-cover w-full h-full transition-transform group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold">Autonomous Navigation System</h3>
              <p className="mt-2 text-muted-foreground">
                A robust navigation system for mobile robots using SLAM and deep reinforcement learning
              </p>
              <Link to="/projects/autonomous-navigation">
                <Button className="mt-4" variant="outlined" size="sm">
                  View project
                </Button>
              </Link>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-lg border">
            <div className="aspect-video overflow-hidden">
              <img
                src="/placeholder.svg?height=450&width=800"
                alt="Computer Vision for Robotics"
                className="object-cover w-full h-full transition-transform group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold">Computer Vision for Robotics</h3>
              <p className="mt-2 text-muted-foreground">
                Real-time object detection and tracking system for robotic manipulation tasks
              </p>
              <Link to="/projects/computer-vision">
                <Button className="mt-4" variant="outlined" size="sm">
                  View project
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Link to="/projects">
            <Button size="lg">
              Explore all projects
              <LuArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Let's Work Together</h2>
              <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Interested in collaborating on a project or research? Get in touch to discuss how we can work together.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link to="/contact">
                <Button size="lg" variant="plain">
                  Contact me
                  <LuArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
