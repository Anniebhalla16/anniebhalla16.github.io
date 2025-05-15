
export default function SkillsPage() {
  // Sample data for skills growth over time
  // const skillsData = [
  //   { year: 2019, ai: 60, robotics: 40, frontend: 75, research: 50 },
  //   { year: 2020, ai: 70, robotics: 55, frontend: 80, research: 65 },
  //   { year: 2021, ai: 75, robotics: 70, frontend: 85, research: 75 },
  //   { year: 2022, ai: 85, robotics: 80, frontend: 85, research: 80 },
  //   { year: 2023, ai: 90, robotics: 85, frontend: 90, research: 90 },
  //   { year: 2024, ai: 95, robotics: 90, frontend: 92, research: 95 },
  // ]

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Skills & Expertise</h1>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-6">Skills Growth</h2>
          <p className="text-muted-foreground mb-6">
            My expertise has grown across multiple domains over the years, with a focus on AI, robotics, frontend
            development, and research methodologies.
          </p>

{/* TODO: */}
          {/* <DataChart
            title="Skills Development Over Time"
            description="Proficiency level (0-100) across different domains"
            data={skillsData}
            categories={["ai", "robotics", "frontend", "research"]}
            index="year"
            className="w-full"
          /> */}
        </section>
      </div>
    </div>
  )
}
