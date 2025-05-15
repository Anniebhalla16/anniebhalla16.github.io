"use client"

import { Badge, Button, Card, CardContent } from "@mui/joy"
import { LuArrowLeft, LuExternalLink, LuGithub } from "react-icons/lu"
import { Link, Navigate, useParams } from "react-router-dom"

// This would typically come from a database or API
const projects = [
  {
    slug: "autonomous-navigation",
    title: "Autonomous Navigation System",
    image: "/placeholder.svg?height=600&width=1200",
    description:
      "A robust navigation system for mobile robots using SLAM and deep reinforcement learning. The system enables robots to navigate in unknown environments while avoiding obstacles and optimizing path planning.",
    longDescription: `
      This project focuses on developing a comprehensive navigation system for autonomous mobile robots that can operate in unknown and dynamic environments. The system combines traditional Simultaneous Localization and Mapping (SLAM) techniques with modern deep reinforcement learning approaches to achieve robust and efficient navigation.
      
      The core of the system is a deep neural network that learns to make navigation decisions based on sensor inputs such as LiDAR scans, camera images, and odometry data. The network is trained using reinforcement learning, where the robot learns from its own experiences by exploring the environment and receiving rewards for successful navigation and penalties for collisions or inefficient paths.
      
      One of the key innovations in this project is the integration of traditional mapping techniques with learning-based approaches. While the reinforcement learning component handles high-level decision-making, the SLAM module provides accurate localization and mapping capabilities, creating a detailed representation of the environment that can be used for path planning and obstacle avoidance.
      
      The system has been extensively tested in both simulated environments and real-world scenarios, demonstrating its ability to navigate through complex environments, avoid dynamic obstacles, and adapt to changing conditions.
    `,
    technologies: ["Python", "ROS", "TensorFlow", "SLAM", "Reinforcement Learning", "C++", "Gazebo Simulation"],
    features: [
      "Real-time obstacle detection and avoidance",
      "Adaptive path planning based on environmental conditions",
      "Integration with ROS ecosystem for easy deployment on various robot platforms",
      "Efficient mapping of unknown environments",
      "Learning-based navigation policies that improve over time",
      "Robust performance in dynamic and changing environments",
    ],
    links: {
      demo: "https://example.com/demo",
      github: "https://github.com/example/repo",
      paper: "https://example.com/paper",
    },
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
  },
  {
    slug: "computer-vision",
    title: "Computer Vision for Robotics",
    image: "/placeholder.svg?height=600&width=1200",
    description:
      "Real-time object detection and tracking system for robotic manipulation tasks. The system uses deep learning to identify objects and estimate their pose, enabling precise grasping and manipulation.",
    longDescription: `
      This project addresses the challenge of enabling robots to perceive and interact with objects in their environment. Using advanced computer vision techniques and deep learning, the system can detect objects, estimate their pose, and track them in real-time, providing essential information for robotic manipulation tasks.
      
      The core of the system is a multi-stage pipeline that processes visual data from RGB-D cameras. First, a deep neural network performs object detection, identifying and classifying objects in the scene. Then, a pose estimation network determines the 3D position and orientation of each object. Finally, a tracking module follows objects as they move, maintaining consistent identities and updating pose estimates.
      
      The system is designed to be robust to challenging conditions such as partial occlusions, varying lighting, and cluttered environments. It achieves this through a combination of data augmentation during training, ensemble methods for prediction, and temporal consistency constraints during tracking.
      
      A key innovation in this project is the integration of geometric constraints with learning-based approaches, which improves the accuracy and reliability of pose estimation. The system also includes a self-supervised learning component that allows it to adapt to new objects and environments with minimal human supervision.
    `,
    technologies: ["Python", "PyTorch", "OpenCV", "CUDA", "ROS", "Point Cloud Library", "Deep Learning"],
    features: [
      "Real-time object detection and classification",
      "6-DOF pose estimation for known objects",
      "Robust tracking of multiple objects simultaneously",
      "Integration with robotic manipulation planning",
      "Self-supervised learning for adaptation to new objects",
      "Support for RGB-D and stereo camera inputs",
    ],
    links: {
      demo: "https://example.com/demo",
      github: "https://github.com/example/repo",
      paper: "https://example.com/paper",
    },
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
  },
  // Additional projects would be defined here
]

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return <Navigate to="/projects" replace />
  }

  return (
    <div className="container py-12">
      <Link
        to="/projects"
        className="inline-flex items-center mb-8 text-muted-foreground hover:text-foreground transition-colors"
      >
        <LuArrowLeft className="mr-2 h-4 w-4" />
        Back to all projects
      </Link>

      <div className="relative w-full aspect-[2/1] mb-8 overflow-hidden rounded-lg border">
        <img src={project.image || "/placeholder.svg"} alt={project.title} className="object-cover w-full h-full" />
      </div>

      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold">{project.title}</h1>
          <p className="text-xl text-muted-foreground mt-2">{project.description}</p>
        </div>

        <div className="flex gap-4">
          <a href={project.links.github} target="_blank" rel="noopener noreferrer">
            <Button variant="outlined">
              <LuGithub className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </a>
          <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
            <Button variant="outlined">
              <LuExternalLink className="mr-2 h-4 w-4" />
              Live Demo
            </Button>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-8">
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <div className="prose dark:prose-invert max-w-none">
              {project.longDescription.split("\n\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Features</h2>
            <ul className="space-y-2">
              {project.features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {project.gallery.map((image, i) => (
                <div key={i} className="relative aspect-[3/2] overflow-hidden rounded-lg border">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${project.title} screenshot ${i + 1}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-4">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <Badge key={i} variant="solid">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-4">Resources</h3>
              <div className="space-y-2">
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <LuGithub className="mr-2 h-4 w-4" />
                  Source Code
                </a>
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <LuExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </a>
                <a
                  href={project.links.paper}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <LuExternalLink className="mr-2 h-4 w-4" />
                  Research Paper
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
