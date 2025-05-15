import { Card, CardContent } from "@mui/joy"
import type { ReactNode } from "react"

interface HighlightCardProps {
  icon: ReactNode
  title: string
  description: string
}

// TODO: icon title
export default function HighlightCard({ description }: HighlightCardProps) {
  return (
    <Card className="flex flex-col items-center text-center">
      {/* <CardHeader className="pb-2">
        <div className="mb-2 rounded-full bg-primary/10 p-2 text-primary">{icon}</div>
        <h3 className="text-lg font-bold">{title}</h3>
      </CardHeader> */}
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
