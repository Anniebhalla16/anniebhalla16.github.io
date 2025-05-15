import { Card, CardContent } from "@mui/joy"

export default function ExperiencePage() {
  const experiences = [
    {
      company: "German Aerospace Center (DLR)",
      logo: "/placeholder.svg?height=80&width=80",
      position: "Research Assistant - Robotics",
      period: "Jan 2023 - Present",
      description:
        "Working on perception systems for autonomous robots in space applications. Developing computer vision algorithms for object detection and pose estimation in challenging lighting conditions.",
      achievements: [
        "Implemented a real-time object tracking system using deep learning",
        "Reduced computational requirements by 40% while maintaining accuracy",
        "Published research paper on robust visual SLAM for space robotics",
      ],
    },
    {
      company: "Mercedes-Benz Research & Development",
      logo: "/placeholder.svg?height=80&width=80",
      position: "AI Intern",
      period: "May 2022 - Dec 2022",
      description:
        "Worked on machine learning models for autonomous driving features. Focused on sensor fusion and environmental perception for ADAS systems.",
      achievements: [
        "Developed neural network architecture for multi-sensor fusion",
        "Improved object detection accuracy by 15% in adverse weather conditions",
        "Contributed to the development of simulation environments for testing",
      ],
    },
    {
      company: "University of Stuttgart",
      logo: "/placeholder.svg?height=80&width=80",
      position: "Teaching Assistant - AI & Robotics",
      period: "Sep 2021 - Apr 2022",
      description:
        "Assisted in teaching undergraduate and graduate courses in artificial intelligence and robotics. Conducted lab sessions and supervised student projects.",
      achievements: [
        "Developed practical exercises for reinforcement learning course",
        "Mentored 15 student projects in robotics and computer vision",
        "Created online learning materials that improved student performance by 20%",
      ],
    },
    {
      company: "Tech Startup - RoboVision",
      logo: "/placeholder.svg?height=80&width=80",
      position: "Frontend Developer (Part-time)",
      period: "Jun 2020 - Aug 2021",
      description:
        "Developed web interfaces for robotics control and monitoring systems. Implemented real-time data visualization for robot telemetry.",
      achievements: [
        "Built responsive dashboard for robot fleet management using React",
        "Implemented WebSocket-based real-time communication system",
        "Designed intuitive UI for non-technical operators, reducing training time by 50%",
      ],
    },
  ]

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Professional Experience</h1>

      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr]">
                <div className="bg-muted p-6 flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 relative mb-4">
                    <img
                      src={exp.logo || "/placeholder.svg"}
                      alt={`${exp.company} logo`}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <h3 className="font-bold text-lg">{exp.company}</h3>
                  <p className="text-sm text-muted-foreground">{exp.period}</p>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">{exp.position}</h3>
                  <p className="mb-4 text-muted-foreground">{exp.description}</p>

                  <h4 className="font-semibold mb-2">Key Achievements:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
