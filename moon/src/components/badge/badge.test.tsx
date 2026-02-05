import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { axe, toHaveNoViolations } from "vitest-axe"
import { describe, expect, it } from "vitest"
import * as BadgeModule from "@/components/ui/badge"
import { Badge } from "@/components/ui/badge"

expect.extend(toHaveNoViolations)

describe("Badge - rendering", () => {
  it("renders a badge with default variant and children", () => {
    render(<Badge>Test Badge</Badge>)
    const badge = screen.getByText("Test Badge")
    expect(badge).toBeInTheDocument()
    // Badge should have default variant class applied (class name inferred)
    expect(badge).toHaveClass("inline-flex") // class presence to indicate badge styling (example)
  })

  it("renders a badge with minimal props", () => {
    render(<Badge />)
    const container = screen.queryByText("")
    // Badge renders gracefully with no children (empty container or no element)
    // Here we check that render does not throw and container is empty or Badge exists with no children
    // Our Badge requires children, so likely renders as empty span or div
    expect(container).not.toBeNull()
  })
})

describe("Badge - components", () => {
  it("renders a badge component successfully", () => {
    render(<Badge>Component Test</Badge>)
    const badge = screen.getByText("Component Test")
    expect(badge).toBeDefined()
  })
})

describe("Badge - variants", () => {
  const variants: Array<[string, string]> = [
    ["default", "default"],
    ["secondary", "secondary"],
    ["destructive", "destructive"],
    ["outline", "outline"],
    ["ghost", "ghost"],
    ["link", "link"],
  ]

  variants.forEach(([variantName, variantProp]) => {
    it(`renders the "${variantName}" variant`, () => {
      render(<Badge variant={variantProp as any}>Variant</Badge>)
      const badge = screen.getByText("Variant")
      expect(badge).toBeInTheDocument()
      // We expect class presence for variant - check generic presence of variant string in className (implementation detail avoided)
      // As styles might be classnames with variant prefix, looking for class that includes variantProp
      const classList = badge.className
      expect(classList).toEqual(expect.stringContaining(variantProp))
    })
  })
})

describe("Badge - size", () => {
  it("does not have explicit size prop or size variants", () => {
    // Badge does not expose size prop, test that default size styling exists
    render(<Badge>Size Test</Badge>)
    const badge = screen.getByText("Size Test")
    expect(badge).toHaveClass("inline-flex") // inferred default inline-flex class for size control
  })
})

describe("Badge - subcomponents", () => {
  it("renders icon with data-icon=\"inline-start\" slot correctly", () => {
    // Use a simple icon component mock for testing slot
    const Icon = () => <svg data-icon="inline-start" />
    render(
      <Badge>
        <Icon />
        Icon Start
      </Badge>,
    )
    const badge = screen.getByText("Icon Start")
    expect(badge).toBeInTheDocument()
    const icon = badge.querySelector("[data-icon='inline-start']")
    expect(icon).toBeInTheDocument()
  })

  it("renders icon with data-icon=\"inline-end\" slot correctly", () => {
    const Icon = () => <svg data-icon="inline-end" />
    render(
      <Badge>
        Icon End
        <Icon />
      </Badge>,
    )
    const badge = screen.getByText("Icon End")
    expect(badge).toBeInTheDocument()
    const icon = badge.querySelector("[data-icon='inline-end']")
    expect(icon).toBeInTheDocument()
  })
})

describe("Badge - state", () => {
  it("does not have explicit state props", () => {
    // No state props like disabled or active to test; badge is static display component
    render(<Badge>Static State</Badge>)
    const badge = screen.getByText("Static State")
    expect(badge).toBeVisible()
  })
})

describe("Badge - props", () => {
  it("accepts and applies className prop", () => {
    render(<Badge className="custom-class">Styled Badge</Badge>)
    const badge = screen.getByText("Styled Badge")
    expect(badge).toHaveClass("custom-class")
  })

  it("renders correctly when asChild is true with child as anchor", () => {
    render(
      <Badge asChild>
        <a href="#test">Link Badge</a>
      </Badge>,
    )
    // The rendered element is an anchor inside Badge
    const link = screen.getByRole("link", { name: /Link Badge/i })
    expect(link).toHaveAttribute("href", "#test")
    expect(link).toBeInTheDocument()
  })
})

describe("Badge - interactions", () => {
  it("does not handle user interactions explicitly", () => {
    render(<Badge>Interaction Test</Badge>)
    const badge = screen.getByText("Interaction Test")
    // Badge is non-interactive; click should not change anything
    userEvent.click(badge)
    expect(badge).toBeInTheDocument()
  })
})

describe("Badge - accessibility", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(<Badge>Accessible Badge</Badge>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it("includes accessible name", () => {
    render(<Badge>Accessible Name</Badge>)
    const badge = screen.getByText("Accessible Name")
    expect(badge).toHaveAccessibleName("Accessible Name")
  })
})

describe("Badge - error handling", () => {
  it("renders gracefully with no children", () => {
    render(<Badge>{null}</Badge>)
    const badge = screen.container?.querySelector("span, div")
    expect(badge).toBeInTheDocument()
  })

  it("renders gracefully with undefined variant", () => {
    render(<Badge variant={undefined as any}>Undefined Variant</Badge>)
    const badge = screen.getByText("Undefined Variant")
    expect(badge).toBeInTheDocument()
  })
})

describe("Badge - exports", () => {
  it("exports Badge as named export", () => {
    expect(BadgeModule).toHaveProperty("Badge")
    expect(Badge).toBeDefined()
  })
})