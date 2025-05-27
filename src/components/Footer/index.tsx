import { LuGithub, LuLinkedin, LuMail } from "react-icons/lu"
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Annie Bhalla. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <LuGithub size={20} />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              to="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <LuLinkedin size={20} />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              to="mailto:contact@anniebhalla.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <LuMail size={20} />
              <span className="sr-only">Email</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}