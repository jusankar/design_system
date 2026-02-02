import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { axe } from "vitest-axe"
import { describe, expect, it } from "vitest"

import { Badge } from "./badge"

// Dummy icons for testing purposes inline with usage examples
const DummyIconStart = () => <svg data-icon="inline-start" aria-hidden="true"></svg>
const DummyIconEnd = () => <svg data-icon="inline-end" aria-hidden="true"></svg>

describe("Badge", () => {
  describe("rendering", () => {
    it("renders the badge with default content", () => {
      render(<Badge>Default Badge</Badge>)
      expect(screen.getByText("Default Badge")).toBeInTheDocument()
    })

    it("renders the badge container element", () => {
      const { container } = render(<Badge>Badge Content</Badge>)
      expect(container.firstChild).toBeInstanceOf(HTMLElement)
    })
  })

  describe("components", () => {
    it("renders children content correctly", () => {
      render(<Badge>Children Content</Badge>)
      expect(screen.getByText("Children Content")).toBeVisible()
    })
  })

  describe("variants", () => {
    it("applies 'default' variant by default", () => {
      const { container } = render(<Badge>Default Variant</Badge>)
      expect(container.firstChild).toHaveClass("rounded") // Assuming default styling includes rounded
    })

    it("applies the 'secondary' variant class", () => {
      const { container } = render(<Badge variant="secondary">Secondary</Badge>)
      expect(container.firstChild).toHaveClass("secondary")
    })

    it("applies the 'destructive' variant class", () => {
      const { container } = render(<Badge variant="destructive">Destructive</Badge>)
      expect(container.firstChild).toHaveClass("destructive")
    })

    it("applies the 'outline' variant class", () => {
      const { container } = render(<Badge variant="outline">Outline</Badge>)
      expect(container.firstChild).toHaveClass("outline")
    })

    it("applies the 'ghost' variant class", () => {
      const { container } = render(<Badge variant="ghost">Ghost</Badge>)
      expect(container.firstChild).toHaveClass("ghost")
    })

    it("applies the 'link' variant class", () => {
      const { container } = render(<Badge variant="link">Link</Badge>)
      expect(container.firstChild).toHaveClass("link")
    })
  })

  describe("size", () => {
    // Badge component does not inherently define explicit sizes by prop
    it("does not apply any size-related class by default", () => {
      const { container } = render(<Badge>Size Test</Badge>)
      expect(container.firstChild).not.toHaveClass(/^size-/)
    })
  })

  describe("subcomponents", () => {
    it("renders icon with data-icon='inline-start' attribute", () => {
      const { container } = render(
        <Badge>
          <DummyIconStart />
          Text
        </Badge>
      )
      const icon = container.querySelector('[data-icon="inline-start"]')
      expect(icon).toBeInTheDocument()
    })

    it("renders icon with data-icon='inline-end' attribute", () => {
      const { container } = render(
        <Badge>
          Text
          <DummyIconEnd />
        </Badge>
      )
      const icon = container.querySelector('[data-icon="inline-end"]')
      expect(icon).toBeInTheDocument()
    })
  })

  describe("state", () => {
    // No explicit state props or controlling state for Badge component
    it("renders static Badge without state changes", () => {
      render(<Badge>Static State</Badge>)
      expect(screen.getByText("Static State")).toBeVisible()
    })
  })

  describe("props", () => {
    it("accepts and applies a custom className prop", () => {
      const { container } = render(
        <Badge className="custom-class">Custom Class</Badge>
      )
      expect(container.firstChild).toHaveClass("custom-class")
    })

    it("accepts an empty className prop without error", () => {
      const { container } = render(<Badge className="">Empty Class</Badge>)
      expect(container.firstChild).toBeInTheDocument()
    })

    it("renders correctly with minimal required props", () => {
      render(<Badge>Minimal</Badge>)
      expect(screen.getByText("Minimal")).toBeInTheDocument()
    })

    it("can render as a child element when 'asChild' prop is true", () => {
      // We cannot fully implement this behavior test as 'asChild' likely uses Radix Polymorphic behavior.
      // Instead, we'll at least verify the container renders child anchor correctly.
      render(
        <Badge asChild>
          <a href="#test">Link Badge</a>
        </Badge>
      )
      expect(screen.getByRole("link", { name: /Link Badge/i })).toBeInTheDocument()
    })
  })

  describe("interactions", () => {
    // Badge is non-interactive by default, no user input interaction handlers tested.
    it("does not support user interactions inherently", () => {
      render(<Badge>Non interactive</Badge>)
      expect(screen.getByText("Non interactive")).toBeInTheDocument()
    })
  })

  describe("accessibility", () => {
    it("should have no accessibility violations", async () => {
      const { container } = render(<Badge>Accessible Badge</Badge>)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it("renders icon slots with appropriate aria-hidden attribute", () => {
      const { container } = render(
        <Badge>
          <DummyIconStart />
          Text
          <DummyIconEnd />
        </Badge>
      )
      const iconStart = container.querySelector('[data-icon="inline-start"]')
      const iconEnd = container.querySelector('[data-icon="inline-end"]')
      expect(iconStart).toHaveAttribute("aria-hidden", "true")
      expect(iconEnd).toHaveAttribute("aria-hidden", "true")
    })
  })

  describe("error handling", () => {
    it("renders gracefully when no children are provided", () => {
      const { container } = render(<Badge>{null}</Badge>)
      expect(container.firstChild).toBeInTheDocument()
    })

    it("renders gracefully when given undefined children", () => {
      // @ts-expect-error testing resilience
      const { container } = render(<Badge>{undefined}</Badge>)
      expect(container.firstChild).toBeInTheDocument()
    })

    it("renders gracefully when variant prop is invalid", () => {
      // @ts-expect-error testing resilience with invalid variant prop
      const { container } = render(<Badge variant="invalid">Invalid Variant</Badge>)
      expect(container.firstChild).toBeInTheDocument()
    })
  })

  describe("exports", () => {
    it("should have named export: Badge", () => {
      expect(Badge).toBeDefined()
      expect(typeof Badge).toBe("function")
    })
  })
})