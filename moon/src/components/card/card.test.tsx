import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { axe, toHaveNoViolations } from "vitest-axe"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/src/components/card"

describe("Card", () => {
  describe("rendering", () => {
    it("renders the Card container", () => {
      const { container } = render(<Card>Test card</Card>)
      expect(container.firstChild).toBeInTheDocument()
    })

    it("renders CardHeader, CardContent and CardFooter when provided", () => {
      render(
        <Card>
          <CardHeader>Header</CardHeader>
          <CardContent>Content</CardContent>
          <CardFooter>Footer</CardFooter>
        </Card>
      )
      expect(screen.getByText("Header")).toBeVisible()
      expect(screen.getByText("Content")).toBeVisible()
      expect(screen.getByText("Footer")).toBeVisible()
    })

    it("renders CardTitle and CardDescription inside CardHeader", () => {
      render(
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
      )
      expect(screen.getByText("Title")).toBeVisible()
      expect(screen.getByText("Description")).toBeVisible()
    })

    it("renders CardAction inside CardHeader", () => {
      render(
        <CardHeader>
          <CardAction>Action</CardAction>
        </CardHeader>
      )
      expect(screen.getByText("Action")).toBeVisible()
    })
  })

  describe("components", () => {
    it("CardHeader supports className and renders correctly", () => {
      const { container } = render(
        <CardHeader className="custom-header">Header</CardHeader>
      )
      const header = container.querySelector(".custom-header")
      expect(header).toBeInTheDocument()
      expect(header).toHaveTextContent("Header")
    })

    it("CardTitle supports className and renders text", () => {
      const { container } = render(
        <CardTitle className="custom-title">My Title</CardTitle>
      )
      const title = container.querySelector(".custom-title")
      expect(title).toBeInTheDocument()
      expect(title).toHaveTextContent("My Title")
    })

    it("CardDescription supports className and renders text", () => {
      const { container } = render(
        <CardDescription className="custom-description">Desc</CardDescription>
      )
      const description = container.querySelector(".custom-description")
      expect(description).toBeInTheDocument()
      expect(description).toHaveTextContent("Desc")
    })

    it("CardAction supports className and renders children", () => {
      const { container } = render(
        <CardAction className="custom-action">
          <Button>Click</Button>
        </CardAction>
      )
      const action = container.querySelector(".custom-action")
      expect(action).toBeInTheDocument()
      expect(screen.getByRole("button", { name: "Click" })).toBeVisible()
    })

    it("CardContent supports className and renders children", () => {
      const { container } = render(
        <CardContent className="custom-content">
          <p>Content text</p>
        </CardContent>
      )
      const content = container.querySelector(".custom-content")
      expect(content).toBeInTheDocument()
      expect(screen.getByText("Content text")).toBeVisible()
    })

    it("CardFooter supports className and renders children", () => {
      const { container } = render(
        <CardFooter className="custom-footer">Footer content</CardFooter>
      )
      const footer = container.querySelector(".custom-footer")
      expect(footer).toBeInTheDocument()
      expect(screen.getByText("Footer content")).toBeVisible()
    })
  })

  describe("variants", () => {
    it("does not apply any special variant classes by default", () => {
      const { container } = render(<Card>Default</Card>)
      expect(container.firstChild).not.toHaveClass(/size-/)
    })
  })

  describe("size", () => {
    it("applies small size class when size='sm' is set", () => {
      const { container } = render(<Card size="sm">Small Card</Card>)
      expect(container.firstChild).toHaveClass("sm")
    })

    it("defaults to normal size when size is not set", () => {
      const { container } = render(<Card>Default Size</Card>)
      // No "sm" class expected on root container for default
      expect(container.firstChild).not.toHaveClass("sm")
    })
  })

  describe("subcomponents", () => {
    // Subcomponents covered individually
    it("CardTitle renders as heading by default", () => {
      render(<CardTitle>Heading Title</CardTitle>)
      const heading = screen.getByText("Heading Title")
      expect(heading.tagName.toLowerCase()).toMatch(/h[1-6]/)
    })
  })

  describe("state", () => {
    // No explicit state props or stateful behavior found in the component
  })

  describe("props", () => {
    it("forwards className to root Card container", () => {
      const { container } = render(<Card className="my-card">Content</Card>)
      expect(container.firstChild).toHaveClass("my-card")
    })

    it("forwards other props to the root Card container", () => {
      const { container } = render(
        <Card id="card-id" data-testid="card-test">
          Content
        </Card>
      )
      expect(container.firstChild).toHaveAttribute("id", "card-id")
      expect(container.firstChild).toHaveAttribute("data-testid", "card-test")
    })
  })

  describe("interactions", () => {
    // No user input interactions handled directly by Card components
  })

  describe("accessibility", () => {
    it("has no accessibility violations when rendering full Card", async () => {
      const { container } = render(
        <Card>
          <CardHeader>
            <CardTitle>Title</CardTitle>
            <CardDescription>Description</CardDescription>
            <CardAction>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p>This is the main content</p>
          </CardContent>
          <CardFooter>
          </CardFooter>
        </Card>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it("renders CardTitle as a heading element for semantic accessibility", () => {
      render(<CardTitle>Accessible Title</CardTitle>)
      const title = screen.getByText("Accessible Title")
      // Heading tags h1-h6
      expect(title.tagName).toMatch(/H[1-6]/)
    })
  })

  describe("error handling", () => {
    it("renders without crashing when no children are provided", () => {
      const { container } = render(<Card />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it("renders subcomponents gracefully with minimal or empty props", () => {
      const { container } = render(
        <Card>
          <CardHeader className="">
            <CardTitle />
            <CardDescription />
          </CardHeader>
          <CardContent />
          <CardFooter />
        </Card>
      )
      expect(container.firstChild).toBeInTheDocument()
    })
  })

  describe("exports", () => {
    it("exports all subcomponents as named exports", () => {
      expect(Card).toBeDefined()
      expect(CardHeader).toBeDefined()
      expect(CardTitle).toBeDefined()
      expect(CardDescription).toBeDefined()
      expect(CardAction).toBeDefined()
      expect(CardContent).toBeDefined()
      expect(CardFooter).toBeDefined()
    })
  })
})