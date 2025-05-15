import { Badge, Button, Card, CardContent } from "@mui/joy"
import { LuFileText } from "react-icons/lu"


export default function ResearchPage() {
  const publications = [
    {
      title: "Robust Visual SLAM for Space Robotics Applications",
      authors: "Bhalla, A., Schmidt, J., & Müller, K.",
      journal: "IEEE Robotics and Automation Letters",
      year: 2023,
      abstract:
        "This paper presents a novel approach to visual Simultaneous Localization and Mapping (SLAM) for space robotics applications. We address the challenges of extreme lighting conditions, reflective surfaces, and limited computational resources common in space environments.",
      keywords: ["SLAM", "Space Robotics", "Computer Vision", "Visual Odometry"],
      link: "https://example.com/paper1",
    },
    {
      title: "Deep Reinforcement Learning for Autonomous Navigation in Unknown Environments",
      authors: "Bhalla, A., & Weber, T.",
      journal: "International Conference on Intelligent Robots and Systems (IROS)",
      year: 2022,
      abstract:
        "We propose a deep reinforcement learning approach for autonomous navigation in unknown environments. Our method enables mobile robots to learn navigation policies that generalize to unseen environments without explicit mapping.",
      keywords: ["Reinforcement Learning", "Autonomous Navigation", "Mobile Robots", "Path Planning"],
      link: "https://example.com/paper2",
    },
    {
      title: "Multi-Sensor Fusion for Robust Perception in Autonomous Vehicles",
      authors: "Keller, M., Bhalla, A., & Schmidt, R.",
      journal: "IEEE Transactions on Intelligent Transportation Systems",
      year: 2022,
      abstract:
        "This paper presents a novel approach to multi-sensor fusion for autonomous vehicles, combining data from cameras, LiDAR, and radar to achieve robust perception in adverse weather conditions and challenging environments.",
      keywords: ["Sensor Fusion", "Autonomous Vehicles", "Computer Vision", "Deep Learning"],
      link: "https://example.com/paper3",
    },
    {
      title: "Human-Robot Collaboration in Manufacturing: A Learning Approach",
      authors: "Bhalla, A., Meyer, L., & Fischer, K.",
      journal: "Robotics and Computer-Integrated Manufacturing",
      year: 2021,
      abstract:
        "We present a learning-based approach for human-robot collaboration in manufacturing environments. Our system enables robots to adapt their behavior based on human actions and intentions, leading to more efficient and natural collaboration.",
      keywords: ["Human-Robot Collaboration", "Manufacturing", "Machine Learning", "Adaptive Systems"],
      link: "https://example.com/paper4",
    },
  ]

  const researchProjects = [
    {
      title: "Adaptive Perception for Autonomous Systems",
      institution: "University of Stuttgart",
      period: "2022 - Present",
      description:
        "Developing adaptive perception systems that can adjust their processing pipeline based on environmental conditions and task requirements. The goal is to create more robust and efficient perception for autonomous robots operating in dynamic environments.",
      collaborators: ["Prof. Dr. Katja Schmidt", "Dr. Thomas Weber", "Robotics Research Group"],
    },
    {
      title: "Space Robotics: Vision-Based Navigation",
      institution: "German Aerospace Center (DLR)",
      period: "2023 - Present",
      description:
        "Research on vision-based navigation techniques for robots operating in space environments. Addressing challenges such as extreme lighting conditions, limited computational resources, and the need for high reliability.",
      collaborators: ["DLR Institute of Robotics and Mechatronics", "European Space Agency (ESA)"],
    },
  ]

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Research</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Publications</h2>
        <div className="space-y-6">
          {publications.map((pub, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{pub.title}</h3>
                <p className="text-muted-foreground mb-1">{pub.authors}</p>
                <p className="text-sm text-muted-foreground mb-4">
                  {pub.journal}, {pub.year}
                </p>

                <p className="mb-4">{pub.abstract}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {pub.keywords.map((keyword, i) => (
                    <Badge key={i} variant="outlined">
                      {keyword}
                    </Badge>
                  ))}
                </div>

                <a href={pub.link} target="_blank" rel="noopener noreferrer">
                  <Button variant="outlined" size="sm">
                    <LuFileText className="mr-2 h-4 w-4" />
                    Read Paper
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Current Research Projects</h2>
        <div className="space-y-6">
          {researchProjects.map((project, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{project.institution}</p>
                    <p className="text-sm text-muted-foreground">{project.period}</p>
                  </div>
                </div>

                <p className="mb-4">{project.description}</p>

                <div>
                  <h4 className="font-semibold mb-2">Collaborators:</h4>
                  <ul className="list-disc pl-5">
                    {project.collaborators.map((collaborator, i) => (
                      <li key={i}>{collaborator}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
