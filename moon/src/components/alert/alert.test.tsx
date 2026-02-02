import React from "react"
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { axe } from "vitest-axe"
import {
  Alert,
  AlertDescription,
  AlertTitle,
  AlertAction,
} from "src/components/alert"
import { CheckCircle2Icon, InfoIcon, AlertCircleIcon } from "lucide-react"

describe("Alert Component", () => {
  describe("rendering", () => {
    it("renders Alert with title and description", () => {
      render(
        <Alert>
          <CheckCircle2Icon data-slot="icon" />
          <AlertTitle data-slot="title">Payment successful</AlertTitle>
          <AlertDescription data-slot="description">
            Your payment of $29.99 has been processed.
          </AlertDescription>
        </Alert>,
      )
      expect(screen.getByText("Payment successful")).toBeVisible()
      expect(screen.getByText(/has been processed/i)).toBeVisible()
    })

    it("renders icon as an svg element", () => {
      const { container } = render(
        <Alert>
          <InfoIcon data-slot="icon" />
          <AlertTitle>New feature</AlertTitle>
          <AlertDescription>Feature description</AlertDescription>
        </Alert>,
      )
      const icon = container.querySelector('[data-slot="icon"]')
      expect(icon?.tagName.toLowerCase()).toBe("svg")
    })

    it("renders AlertTitle and AlertDescription elements", () => {
      const { container } = render(
        <Alert>
          <CheckCircle2Icon />
          <AlertTitle data-slot="title">Title text</AlertTitle>
          <AlertDescription data-slot="description">Desc text</AlertDescription>
        </Alert>,
      )
      expect(container.querySelector('[data-slot="title"]')).toBeInTheDocument()
      expect(
        container.querySelector('[data-slot="description"]'),
      ).toBeInTheDocument()
    })
  })

  describe("components", () => {
    it("renders AlertTitle displaying the provided text", () => {
      render(<AlertTitle data-slot="title">Alert Title</AlertTitle>)
      expect(screen.getByText("Alert Title")).toBeVisible()
    })

    it("renders AlertDescription displaying the provided text", () => {
      render(<AlertDescription data-slot="description">Description</AlertDescription>)
      expect(screen.getByText("Description")).toBeVisible()
    })

    it("renders AlertAction as a container for action elements", () => {
      render(
        <AlertAction data-slot="action">
          <button>Click me</button>
        </AlertAction>,
      )
      expect(screen.getByRole("button", { name: "Click me" })).toBeVisible()
    })
  })

  describe("variants", () => {
    it("applies default variant class when no variant prop provided", () => {
      const { container } = render(
        <Alert>
          <AlertTitle>Default variant</AlertTitle>
        </Alert>,
      )
      expect(container.firstChild).toHaveClass("alert-default")
    })

    it("applies destructive variant class when variant prop set to destructive", () => {
      const { container } = render(
        <Alert variant="destructive">
          <AlertTitle>Destructive variant</AlertTitle>
        </Alert>,
      )
      expect(container.firstChild).toHaveClass("alert-destructive")
    })
  })

  describe("size", () => {
    // The component does not appear to have a size prop documented or usage.
    it("does not support size prop and ignores it gracefully", () => {
      // TypeScript will block unsupported size prop; testing that passing it does nothing
      const { container } = render(
        // @ts-expect-error testing unknown prop
        <Alert size="lg">
          <AlertTitle>Size ignored</AlertTitle>
        </Alert>,
      )
      expect(container.firstChild).toBeInTheDocument()
    })
  })

  describe("subcomponents", () => {
    it("renders AlertTitle and AlertDescription correctly", () => {
      const { container } = render(
        <Alert>
          <AlertTitle data-slot="title">My title</AlertTitle>
          <AlertDescription data-slot="description">My description</AlertDescription>
        </Alert>,
      )
      expect(container.querySelector('[data-slot="title"]')).toBeInTheDocument()
      expect(container.querySelector('[data-slot="description"]')).toBeInTheDocument()
    })

    it("renders AlertAction in the top-right corner slot", () => {
      const { container } = render(
        <Alert>
          <AlertTitle>Title</AlertTitle>
          <AlertDescription>Description</AlertDescription>
          <AlertAction data-slot="action">
            <button>Action</button>
          </AlertAction>
        </Alert>,
      )
      expect(container.querySelector('[data-slot="action"]')).toBeInTheDocument()
      expect(screen.getByRole("button", { name: "Action" })).toBeVisible()
    })
  })

  describe("state", () => {
    // No state variants like disabled or loading appear documented.
    it("renders normally without explicit state props", () => {
      render(
        <Alert>
          <AlertTitle>No state prop</AlertTitle>
        </Alert>,
      )
      expect(screen.getByText("No state prop")).toBeVisible()
    })
  })

  describe("props", () => {
    it("accepts and applies className to Alert", () => {
      const { container } = render(
        <Alert className="custom-class">
          <AlertTitle>Test</AlertTitle>
        </Alert>,
      )
      expect(container.firstChild).toHaveClass("custom-class")
    })

    it("accepts and applies className to AlertTitle", () => {
      const { container } = render(
        <AlertTitle className="title-class" data-slot="title">
          Title
        </AlertTitle>,
      )
      expect(container.querySelector('[data-slot="title"]')).toHaveClass("title-class")
    })

    it("accepts and applies className to AlertDescription", () => {
      const { container } = render(
        <AlertDescription className="desc-class" data-slot="description">
          Desc
        </AlertDescription>,
      )
      expect(container.querySelector('[data-slot="description"]')).toHaveClass("desc-class")
    })

    it("accepts and applies className to AlertAction", () => {
      const { container } = render(
        <AlertAction className="action-class" data-slot="action">
          <button>Btn</button>
        </AlertAction>,
      )
      expect(container.querySelector('[data-slot="action"]')).toHaveClass("action-class")
    })

    it("accepts variant prop on Alert", () => {
      const { container } = render(
        <Alert variant="destructive">
          <AlertTitle>Destructive</AlertTitle>
        </Alert>,
      )
      expect(container.firstChild).toHaveClass("alert-destructive")
    })
  })

  describe("interactions", () => {
    // Alert does not handle direct interactions like button clicks internally besides delegated children.
    it("does not handle internal interactions", () => {
      render(
        <Alert>
          <AlertTitle>Interaction test</AlertTitle>
        </Alert>,
      )
      // No interactive elements inside alert by default
      expect(screen.queryByRole("button")).not.toBeInTheDocument()
    })
  })

  describe("accessibility", () => {
    it("has no accessibility violations", async () => {
      const { container } = render(
        <Alert>
          <CheckCircle2Icon />
          <AlertTitle>Accessible Title</AlertTitle>
          <AlertDescription>This is an accessible alert description.</AlertDescription>
        </Alert>,
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it("has appropriate roles and aria attributes", () => {
      render(
        <Alert>
          <CheckCircle2Icon />
          <AlertTitle>Role Test</AlertTitle>
          <AlertDescription>Description</AlertDescription>
        </Alert>,
      )
      const alert = screen.getByRole("alert")
      expect(alert).toBeInTheDocument()
      expect(screen.getByText("Role Test")).toBeVisible()
    })
  })

  describe("error handling", () => {
    it("renders gracefully with no children", () => {
      const { container } = render(<Alert />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it("renders gracefully with minimal props", () => {
      render(
        <Alert>
          <AlertTitle>Only title</AlertTitle>
        </Alert>,
      )
      expect(screen.getByText("Only title")).toBeVisible()
    })

    it("handles invalid variant prop without crashing", () => {
      // @ts-expect-error testing invalid prop
      const { container } = render(<Alert variant="invalid" />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it("renders AlertAction without children gracefully", () => {
      const { container } = render(<AlertAction />)
      expect(container.firstChild).toBeInTheDocument()
    })
  })

  describe("exports", () => {
    it("exports Alert component", () => {
      expect(Alert).toBeDefined()
      const { container } = render(<Alert />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it("exports AlertTitle component", () => {
      expect(AlertTitle).toBeDefined()
      const { container } = render(<AlertTitle>Title Export</AlertTitle>)
      expect(screen.getByText("Title Export")).toBeVisible()
      expect(container.firstChild).toBeInTheDocument()
    })

    it("exports AlertDescription component", () => {
      expect(AlertDescription).toBeDefined()
      const { container } = render(
        <AlertDescription>Description Export</AlertDescription>,
      )
      expect(screen.getByText("Description Export")).toBeVisible()
      expect(container.firstChild).toBeInTheDocument()
    })

    it("exports AlertAction component", () => {
      expect(AlertAction).toBeDefined()
      const { container } = render(
        <AlertAction>
          <button>Btn Export</button>
        </AlertAction>,
      )
      expect(screen.getByRole("button", { name: "Btn Export" })).toBeVisible()
      expect(container.firstChild).toBeInTheDocument()
    })
  })
})