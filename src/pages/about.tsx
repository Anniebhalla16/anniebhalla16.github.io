import { Badge, Card, CardContent } from "@mui/joy"

export default function AboutPage() {
  const skills = [
    "Python",
    "TensorFlow",
    "PyTorch",
    "ROS",
    "Computer Vision",
    "Machine Learning",
    "Deep Learning",
    "React",
    "JavaScript",
    "TypeScript",
    "C++",
    "SLAM",
    "Reinforcement Learning",
    "Robot Control",
    "Path Planning",
    "Human-Robot Interaction",
  ]

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">About Me</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-1">
          <div className="sticky top-24">
            <div className="relative aspect-square w-full max-w-[400px] overflow-hidden rounded-lg border mb-4">
              <img
                src="/placeholder.svg?height=400&width=400"
                alt="Annie Bhalla"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Annie Bhalla</h2>
              <p className="text-muted-foreground">MSc Computer Science - Autonomous Systems</p>
              <p className="text-muted-foreground">University of Stuttgart</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Biography</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p>
                I am a robotics and AI enthusiast with a passion for developing intelligent autonomous systems.
                Currently pursuing my Master's in Computer Science with a focus on Autonomous Systems at the University
                of Stuttgart, I combine theoretical knowledge with practical experience to create innovative solutions.
              </p>
              <p>
                My research interests lie at the intersection of artificial intelligence, computer vision, and robotics.
                I am particularly interested in developing perception systems that enable robots to understand and
                interact with their environment in a human-like manner.
              </p>
              <p>
                Throughout my academic and professional journey, I have worked with leading organizations such as the
                German Aerospace Center (DLR), Mercedes-Benz, and the University of Stuttgart, where I have contributed
                to cutting-edge research and development projects.
              </p>
              <p>
                When I'm not working on robots or AI systems, I enjoy hiking, photography, and participating in
                hackathons and tech meetups to stay connected with the broader tech community.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Education</h2>
            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">MSc Computer Science - Autonomous Systems</h3>
                      <p className="text-muted-foreground">University of Stuttgart</p>
                    </div>
                    <p className="text-sm text-muted-foreground">2022 - Present</p>
                  </div>
                  <p className="mt-2">
                    Specializing in autonomous systems, robotics, and artificial intelligence. Research focus on
                    perception systems for mobile robots.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">BSc Computer Science</h3>
                      <p className="text-muted-foreground">Technical University of Munich</p>
                    </div>
                    <p className="text-sm text-muted-foreground">2018 - 2022</p>
                  </div>
                  <p className="mt-2">
                    Graduated with honors. Thesis: "Deep Reinforcement Learning for Autonomous Navigation in Unknown
                    Environments"
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="solid">
                  {skill}
                </Badge>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
