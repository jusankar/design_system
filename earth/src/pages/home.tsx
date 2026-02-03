import { Card, Badge, CardHeader, Button } from '@jusankar/moon'

export default function Home() {
  return (
    <>
      <Card className="max-w-xl mx-auto space-y-4">
        <CardHeader>
          Earth – Moon Consumer Sandbox
        </CardHeader>

        <p className="text-muted-foreground">
          This environment exists to validate Moon component consumption
          before production use.
        </p>

      </Card>
      <div className="flex flex-wrap gap-2">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="ghost">Ghost</Badge>
      </div>
      <Button> click here</Button>
    </>
  )
}
