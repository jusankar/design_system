import { Alert, AlertDescription, AlertTitle } from "@jusankar/moon"
import { Badge } from "@jusankar/moon"
import { Button } from "@jusankar/moon"
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter } from "@jusankar/moon"
import { CheckCircle2Icon, InfoIcon } from "lucide-react"

export default function Home() {
  return (
    <>
      <head>
        <title>All Components</title>
      </head>
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">All Components</h1>
        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <section>
            <h2 className="text-lg font-semibold mb-4">Alert</h2>
            <div className="grid w-full max-w-md items-start gap-4">
              <Alert>
                <CheckCircle2Icon />
                <AlertTitle>Payment successful</AlertTitle>
                <AlertDescription>
                  Your payment of $29.99 has been processed. A receipt has been sent to your email address.
                </AlertDescription>
              </Alert>
              <Alert>
                <InfoIcon />
                <AlertTitle>New feature available</AlertTitle>
                <AlertDescription>
                  We've added dark mode support. You can enable it in your account settings.
                </AlertDescription>
              </Alert>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4">Badge</h2>
            <div className="flex w-full flex-wrap justify-center gap-2">
              <Badge>Badge</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4">Card</h2>
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                  Enter your email below to login to your account
                </CardDescription>
                <CardAction>
                  <Button variant="link">Sign Up</Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      Email
                     
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        Password
                        <a
                          href="#"
                          className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </a>
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </CardFooter>
            </Card>
          </section>
        </div>
      </main>
    </>
  )
}