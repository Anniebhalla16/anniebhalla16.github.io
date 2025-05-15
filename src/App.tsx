import { Routes, Route } from "react-router-dom"
import Layout from "./components/layout"
import HomePage from "./pages/home"
import AboutPage from "./pages/about"
import ExperiencePage from "./pages/experience"
import ProjectsPage from "./pages/projects"
import ProjectDetailPage from "./pages/project-detail"
import ResearchPage from "./pages/research"
import ContactPage from "./pages/contact"
import SkillsPage from "./pages/skills"
import NotFoundPage from "./pages/not-found"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="experience" element={<ExperiencePage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="projects/:slug" element={<ProjectDetailPage />} />
        <Route path="research" element={<ResearchPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="skills" element={<SkillsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
