import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect } from "vitest"
import { axe } from "vitest-axe"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

describe("Card Component", () => {
  describe("rendering", () => {
    it("renders Card component with children", () => {
      render(
        <Card data-testid="card">
          <CardHeader data-testid="card-header">
            <CardTitle data-testid="card-title">Title</CardTitle>
            <CardDescription data-testid="card-description">
              Description
            </CardDescription>
            <CardAction data-testid="card-action">Action</CardAction>
          </CardHeader>
          <CardContent data-testid="card-content">Content</CardContent>
          <CardFooter data-testid="card-footer">Footer</CardFooter>
        </Card>,
      )
      expect(screen.getByTestId("card")).toBeInTheDocument()
      expect(screen.getByTestId("card-header")).toBeInTheDocument()
      expect(screen.getByTestId("card-title")).toHaveTextContent("Title")
      expect(screen.getByTestId("card-description")).toHaveTextContent(
        "Description",
      )
      expect(screen.getByTestId("card-action")).toHaveTextContent("Action")
      expect(screen.getByTestId("card-content")).toHaveTextContent("Content")
      expect(screen.getByTestId("card-footer")).toHaveTextContent("Footer")
    })
  })

  describe("components", () => {
    it("renders CardHeader component", () => {
      const { container } = render(
        <Card>
          <CardHeader data-slot="card-header">Header Content</CardHeader>
        </Card>,
      )
      expect(container.querySelector("[data-slot='card-header']")).toHaveTextContent(
        "Header Content",
      )
    })

    it("renders CardTitle component", () => {
      const { container } = render(
        <Card>
          <CardTitle data-slot="card-title">Card Title</CardTitle>
        </Card>,
      )
      expect(container.querySelector("[data-slot='card-title']")).toHaveTextContent(
        "Card Title",
      )
    })

    it("renders CardDescription component", () => {
      const { container } = render(
        <Card>
          <CardDescription data-slot="card-description">
            Card Description
          </CardDescription>
        </Card>,
      )
      expect(
        container.querySelector("[data-slot='card-description']"),
      ).toHaveTextContent("Card Description")
    })

    it("renders CardAction component", () => {
      const { container } = render(
        <Card>
          <CardAction data-slot="card-action">Action Content</CardAction>
        </Card>,
      )
      expect(container.querySelector("[data-slot='card-action']")).toHaveTextContent(
        "Action Content",
      )
    })

    it("renders CardContent component", () => {
      const { container } = render(
        <Card>
          <CardContent data-slot="card-content">Content Text</CardContent>
        </Card>,
      )
      expect(container.querySelector("[data-slot='card-content']")).toHaveTextContent(
        "Content Text",
      )
    })

    it("renders CardFooter component", () => {
      const { container } = render(
        <Card>
          <CardFooter data-slot="card-footer">Footer Content</CardFooter>
        </Card>,
      )
      expect(container.querySelector("[data-slot='card-footer']")).toHaveTextContent(
        "Footer Content",
      )
    })
  })

  describe("variants", () => {
    it("does not apply size classes by default", () => {
      const { container } = render(<Card data-testid="card" />)
      const card = container.querySelector("[data-testid='card']")
      expect(card).toBeInTheDocument()
      expect(card).not.toHaveClass("sm")
    })
  })

  describe("size", () => {
    it("applies small size variant class when size='sm'", () => {
      const { container } = render(<Card size="sm" data-testid="card" />)
      const card = container.querySelector("[data-testid='card']")
      expect(card).toBeInTheDocument()
      // Size variant applies smaller padding or spacing, class detection simplified here:
      expect(card).toHaveClass("sm")
    })

    it("applies no small size class when size is default", () => {
      const { container } = render(<Card size="default" data-testid="card" />)
      const card = container.querySelector("[data-testid='card']")
      expect(card).toBeInTheDocument()
      expect(card).not.toHaveClass("sm")
    })
  })

  describe("subcomponents", () => {
    it("CardHeader, CardTitle, CardDescription, CardAction, CardContent, and CardFooter exist as named exports", () => {
      expect(CardHeader).toBeDefined()
      expect(CardTitle).toBeDefined()
      expect(CardDescription).toBeDefined()
      expect(CardAction).toBeDefined()
      expect(CardContent).toBeDefined()
      expect(CardFooter).toBeDefined()
    })
  })

  describe("state", () => {
    // No stateful props documented or handled in Card components, skip
  })

  describe("props", () => {
    it("assigns className prop to Card", () => {
      const { container } = render(<Card className="custom-class" data-testid="card" />)
      const card = container.querySelector("[data-testid='card']")
      expect(card).toHaveClass("custom-class")
    })

    it("assigns className prop to CardHeader", () => {
      const { container } = render(
        <Card>
          <CardHeader className="header-class" data-slot="card-header" />
        </Card>,
      )
      expect(container.querySelector("[data-slot='card-header']")).toHaveClass(
        "header-class",
      )
    })

    it("assigns className prop to CardTitle", () => {
      const { container } = render(
        <Card>
          <CardTitle className="title-class" data-slot="card-title" />
        </Card>,
      )
      expect(container.querySelector("[data-slot='card-title']")).toHaveClass(
        "title-class",
      )
    })

    it("assigns className prop to CardDescription", () => {
      const { container } = render(
        <Card>
          <CardDescription className="desc-class" data-slot="card-description" />
        </Card>,
      )
      expect(container.querySelector("[data-slot='card-description']")).toHaveClass(
        "desc-class",
      )
    })

    it("assigns className prop to CardAction", () => {
      const { container } = render(
        <Card>
          <CardAction className="action-class" data-slot="card-action" />
        </Card>,
      )
      expect(container.querySelector("[data-slot='card-action']")).toHaveClass(
        "action-class",
      )
    })

    it("assigns className prop to CardContent", () => {
      const { container } = render(
        <Card>
          <CardContent className="content-class" data-slot="card-content" />
        </Card>,
      )
      expect(container.querySelector("[data-slot='card-content']")).toHaveClass(
        "content-class",
      )
    })

    it("assigns className prop to CardFooter", () => {
      const { container } = render(
        <Card>
          <CardFooter className="footer-class" data-slot="card-footer" />
        </Card>,
      )
      expect(container.querySelector("[data-slot='card-footer']")).toHaveClass(
        "footer-class",
      )
    })
  })

  describe("interactions", () => {
    // The Card components themselves do not handle direct user input or interaction.
    // Interactions are delegated to child components (e.g. Button).
    // No specific interaction tests here per guideline.
  })

  describe("accessibility", () => {
    it("has no accessibility violations", async () => {
      const { container } = render(
        <Card>
          <CardHeader>
            <CardTitle>Accessible Title</CardTitle>
            <CardDescription>Description text</CardDescription>
            <CardAction>
              <Button variant="link">Action</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p>Some content inside card content.</p>
          </CardContent>
          <CardFooter>
            <Button>Footer Button</Button>
          </CardFooter>
        </Card>,
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  describe("error handling", () => {
    it("renders without children without errors", () => {
      const { container } = render(<Card data-testid="card" />)
      expect(container.querySelector("[data-testid='card']")).toBeInTheDocument()
    })

    it("renders CardHeader without children without errors", () => {
      const { container } = render(<CardHeader data-slot="card-header" />)
      expect(container.querySelector("[data-slot='card-header']")).toBeInTheDocument()
    })

    it("renders CardTitle without children without errors", () => {
      const { container } = render(<CardTitle data-slot="card-title" />)
      expect(container.querySelector("[data-slot='card-title']")).toBeInTheDocument()
    })

    it("renders CardDescription without children without errors", () => {
      const { container } = render(<CardDescription data-slot="card-description" />)
      expect(container.querySelector("[data-slot='card-description']")).toBeInTheDocument()
    })

    it("renders CardAction without children without errors", () => {
      const { container } = render(<CardAction data-slot="card-action" />)
      expect(container.querySelector("[data-slot='card-action']")).toBeInTheDocument()
    })

    it("renders CardContent without children without errors", () => {
      const { container } = render(<CardContent data-slot="card-content" />)
      expect(container.querySelector("[data-slot='card-content']")).toBeInTheDocument()
    })

    it("renders CardFooter without children without errors", () => {
      const { container } = render(<CardFooter data-slot="card-footer" />)
      expect(container.querySelector("[data-slot='card-footer']")).toBeInTheDocument()
    })
  })

  describe("exports", () => {
    it("exports all named components", () => {
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