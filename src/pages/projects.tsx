import { Badge, Button, Card, CardContent } from "@mui/joy"
import { LuExternalLink, LuGithub } from "react-icons/lu"
import { Link } from "react-router-dom"


export default function ProjectsPage() {
  const projects = [
    {
      title: "Autonomous Navigation System",
      image: "/placeholder.svg?height=450&width=800",
      description:
        "A robust navigation system for mobile robots using SLAM and deep reinforcement learning. The system enables robots to navigate in unknown environments while avoiding obstacles and optimizing path planning.",
      technologies: ["Python", "ROS", "TensorFlow", "SLAM", "Reinforcement Learning"],
      links: {
        demo: "https://example.com/demo",
        github: "https://github.com/example/repo",
      },
      slug: "autonomous-navigation",
    },
    {
      title: "Computer Vision for Robotics",
      image: "/placeholder.svg?height=450&width=800",
      description:
        "Real-time object detection and tracking system for robotic manipulation tasks. The system uses deep learning to identify objects and estimate their pose, enabling precise grasping and manipulation.",
      technologies: ["Python", "PyTorch", "OpenCV", "CUDA", "ROS"],
      links: {
        demo: "https://example.com/demo",
        github: "https://github.com/example/repo",
      },
      slug: "computer-vision",
    },
    {
      title: "Human-Robot Interaction Framework",
      image: "/placeholder.svg?height=450&width=800",
      description:
        "A framework for natural and intuitive interaction between humans and robots. Includes gesture recognition, speech processing, and context-aware behavior generation.",
      technologies: ["Python", "TensorFlow", "Natural Language Processing", "Computer Vision"],
      links: {
        demo: "https://example.com/demo",
        github: "https://github.com/example/repo",
      },
      slug: "human-robot-interaction",
    },
    {
      title: "Robotics Simulation Environment",
      image: "/placeholder.svg?height=450&width=800",
      description:
        "A high-fidelity simulation environment for testing robotics algorithms before deployment on physical systems. Includes physics-based simulation of sensors, actuators, and environmental conditions.",
      technologies: ["Unity", "C#", "Python", "ROS", "Physics Simulation"],
      links: {
        demo: "https://example.com/demo",
        github: "https://github.com/example/repo",
      },
      slug: "simulation-environment",
    },
    {
      title: "AI-Powered Drone Control System",
      image: "/placeholder.svg?height=450&width=800",
      description:
        "An intelligent control system for autonomous drones that enables complex mission planning, obstacle avoidance, and adaptive behavior in changing environments.",
      technologies: ["Python", "C++", "Computer Vision", "Control Theory", "Path Planning"],
      links: {
        demo: "https://example.com/demo",
        github: "https://github.com/example/repo",
      },
      slug: "drone-control",
    },
    {
      title: "Robotics Dashboard",
      image: "/placeholder.svg?height=450&width=800",
      description:
        "A web-based dashboard for monitoring and controlling multiple robots in real-time. Features include telemetry visualization, remote control, and mission planning.",
      technologies: ["React", "TypeScript", "WebSockets", "Three.js", "Node.js"],
      links: {
        demo: "https://example.com/demo",
        github: "https://github.com/example/repo",
      },
      slug: "robotics-dashboard",
    },
  ]

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Projects</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="aspect-video relative overflow-hidden">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="object-cover w-full h-full transition-transform hover:scale-105"
              />
            </div>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
              <p className="text-muted-foreground mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, i) => (
                  <Badge key={i} variant="plain">
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-4">
                <Link to={`/projects/${project.slug}`}>
                  <Button variant="plain">View details</Button>
                </Link>
                <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                  <Button variant="outlined">
                    <LuGithub className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                </a>
                <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                  <Button variant="outlined">
                    <LuExternalLink className="mr-2 h-4 w-4" />
                    Demo
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
