import { Button } from "@mui/joy"
import { LuArrowLeft } from "react-icons/lu"
import { Link } from "react-router-dom"

export default function NotFoundPage() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] py-12 text-center">
      <h1 className="text-9xl font-bold text-primary">404</h1>
      <h2 className="text-3xl font-bold mt-6">Page Not Found</h2>
      <p className="text-muted-foreground mt-4 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="mt-8">
        <Button>
          <LuArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </Link>
    </div>
  )
}
