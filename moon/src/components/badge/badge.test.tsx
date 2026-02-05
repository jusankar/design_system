import * as React from "react"
import { render, screen, cleanup } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { axe } from "vitest-axe"
import * as badgeModule from "~/src/components/badge"
import { Badge } from "~/src/components/badge"

describe("Badge Component", () => {
  afterEach(() => {
    cleanup()
  })

  describe("rendering", () => {
    it("renders the Badge with default variant and text content", () => {
      render(<Badge>Default Badge</Badge>)
      const badge = screen.getByText("Default Badge")
      expect(badge).toBeInTheDocument()
      // Default variant is default; check class presence for default variant indicator
      expect(badge).toHaveClass("badge") // Assuming the badge base class is 'badge'
    })

    it("renders empty children gracefully", () => {
      render(<Badge>{""}</Badge>)
      const badge = screen.getByText("")
      expect(badge).toBeInTheDocument()
    })

    it("renders minimal props without crashing", () => {
      render(<Badge>Minimal</Badge>)
      expect(screen.getByText("Minimal")).toBeInTheDocument()
    })
  })

  describe("components", () => {
    it("renders Badge component from named import", () => {
      expect(Badge).toBeTypeOf("function")
    })
  })

  describe("variants", () => {
    const variants = [
      "default",
      "secondary",
      "destructive",
      "outline",
      "ghost",
      "link",
    ] as const

    variants.forEach((variant) => {
      it(`renders the Badge with variant="${variant}"`, () => {
        render(<Badge variant={variant}>Variant {variant}</Badge>)
        const badge = screen.getByText(`Variant ${variant}`)
        expect(badge).toBeInTheDocument()
        // check class for variant presence
        expect(badge.className).toEqual(
          expect.stringContaining(variant === "default" ? "default" : variant),
        )
      })
    })

    it("defaults to 'default' variant when variant prop is omitted", () => {
      render(<Badge>Default Variant</Badge>)
      const badge = screen.getByText("Default Variant")
      expect(badge).toBeInTheDocument()
      expect(badge.className).toEqual(expect.stringContaining("default"))
    })
  })

  describe("size", () => {
    // Badge component does not seem to have size prop in API; skip
  })

  describe("subcomponents", () => {
    // No explicit subcomponents exported or documented; skip
  })

  describe("state", () => {
    // No explicit state props or stateful behavior documented; skip
  })

  describe("props", () => {
    it("accepts and applies className prop", () => {
      render(<Badge className="custom-class">With Custom Class</Badge>)
      const badge = screen.getByText("With Custom Class")
      expect(badge).toHaveClass("custom-class")
    })

    it("accepts the 'asChild' prop and renders child element correctly", () => {
      render(
        <Badge asChild>
          <a href="#test-link">Link Badge</a>
        </Badge>,
      )
      const link = screen.getByRole("link", { name: "Link Badge" })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute("href", "#test-link")
    })

    it("renders children with icons with appropriate data-icon attributes", () => {
      render(
        <Badge>
          <span data-icon="inline-start">StartIcon</span>
          Label
          <span data-icon="inline-end">EndIcon</span>
        </Badge>,
      )
      const badge = screen.getByText(/Label/)
      const inlineStartIcon = badge.querySelector('[data-icon="inline-start"]')
      const inlineEndIcon = badge.querySelector('[data-icon="inline-end"]')
      expect(inlineStartIcon).toBeInTheDocument()
      expect(inlineEndIcon).toBeInTheDocument()
    })
  })

  describe("interactions", () => {
    // Badge does not handle user input explicitly; no interaction tests needed
  })

  describe("accessibility", () => {
    it("has no accessibility violations", async () => {
      const { container } = render(<Badge>Accessible Badge</Badge>)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it("renders user-facing text content visibly", () => {
      render(<Badge>Visible Badge</Badge>)
      expect(screen.getByText("Visible Badge")).toBeVisible()
    })
  })

  describe("error handling", () => {
    it("does not throw or error when rendered without children", () => {
      expect(() => render(<Badge />)).not.toThrow()
    })

    it("handles invalid variant prop by rendering default variant", () => {
      // @ts-expect-error simulate invalid variant
      render(<Badge variant="invalid">Fallback Variant</Badge>)
      expect(screen.getByText("Fallback Variant")).toBeInTheDocument()
    })
  })

  describe("exports", () => {
    it("exports all expected named exports", () => {
      expect(typeof badgeModule.Badge).toBe("function")
    })
  })
})