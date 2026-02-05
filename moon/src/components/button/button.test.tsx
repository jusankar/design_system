import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { axe } from "vitest-axe"
import * as ButtonModule from "~/src/components/button"
import { Button } from "~/src/components/button"
import { ArrowUpIcon } from "lucide-react"
import { describe, it, expect } from "vitest"

describe("Button - rendering", () => {
  it("renders the Button component with children", () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole("button", { name: "Click me" })
    expect(button).toBeInTheDocument()
  })

  it("renders an icon inside the Button", () => {
    render(
      <Button aria-label="Submit" size="icon" variant="outline">
        <ArrowUpIcon data-icon="inline-start" />
      </Button>
    )
    const button = screen.getByRole("button", { name: "Submit" })
    expect(button).toBeInTheDocument()
    const icon = button.querySelector("[data-icon='inline-start']")
    expect(icon).toBeInTheDocument()
  })
})

describe("Button - components", () => {
  it("renders as a native button element by default", () => {
    render(<Button>Button</Button>)
    const element = screen.getByRole("button", { name: "Button" })
    expect(element.tagName.toLowerCase()).toBe("button")
  })

  it("renders as the child component when 'asChild' prop is true", () => {
    render(
      <Button asChild>
        <a href="/login" data-testid="link-child">
          Login
        </a>
      </Button>
    )
    const link = screen.getByTestId("link-child")
    expect(link).toBeInTheDocument()
    expect(link.tagName.toLowerCase()).toBe("a")
  })
})

describe("Button - variants", () => {
  const variants = [
    "default",
    "outline",
    "ghost",
    "destructive",
    "secondary",
    "link",
  ] as const

  variants.forEach((variant) => {
    it(`applies the variant="${variant}" class correctly`, () => {
      render(<Button variant={variant}>Button</Button>)
      const button = screen.getByRole("button", { name: "Button" })
      expect(button).toHaveAttribute("class")
      // Check the class contains the variant string (approximate check)
      expect(button.className.includes(variant) || (variant === "default" && button.className.length > 0)).toBe(
        true
      )
    })
  })
})

describe("Button - size", () => {
  const sizes = [
    "default",
    "xs",
    "sm",
    "lg",
    "icon",
    "icon-xs",
    "icon-sm",
    "icon-lg",
  ] as const

  sizes.forEach((size) => {
    it(`applies the size="${size}" class correctly`, () => {
      render(<Button size={size}>Button</Button>)
      const button = screen.getByRole("button", { name: "Button" })
      expect(button).toHaveAttribute("class")
      // Check the class contains the size string (approximate check)
      // default size might not have explicit class; only assert when not default
      if (size !== "default") {
        expect(button.className.includes(size)).toBe(true)
      } else {
        expect(button.className.length > 0).toBe(true)
      }
    })
  })
})

describe("Button - props", () => {
  it("accepts and applies the disabled prop", () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByRole("button", { name: "Disabled" })
    expect(button).toBeDisabled()
  })

  it("accepts and applies an aria-label", () => {
    render(
      <Button aria-label="Submit" size="icon" variant="outline">
        <ArrowUpIcon />
      </Button>
    )
    const button = screen.getByRole("button", { name: "Submit" })
    expect(button).toHaveAttribute("aria-label", "Submit")
  })

  it("renders with extra className", () => {
    render(
      <Button className="rounded-full" variant="outline" size="icon">
        <ArrowUpIcon />
      </Button>
    )
    const button = screen.getByRole("button")
    expect(button.className).toContain("rounded-full")
  })

  it("forwards ref to native button element", () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<Button ref={ref}>Ref Button</Button>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })
})

describe("Button - accessibility", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(
      <>
        <Button variant="outline">Button</Button>
        <Button variant="outline" size="icon" aria-label="Submit">
          <ArrowUpIcon />
        </Button>
        <Button disabled>Disabled</Button>
      </>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})

describe("Button - error handling", () => {
  it("renders without children gracefully", () => {
    // Casting to any to simulate empty children; React accepts it but produces empty button
    render(<Button>{null as any}</Button>)
    const button = screen.getByRole("button")
    expect(button).toBeInTheDocument()
    expect(button).toBeEmptyDOMElement()
  })

  it("renders without variant or size props", () => {
    render(<Button>Button</Button>)
    const button = screen.getByRole("button", { name: "Button" })
    expect(button).toBeInTheDocument()
  })
})

describe("Button - exports", () => {
  it("exports Button named export", () => {
    expect(ButtonModule.Button).toBeDefined()
    expect(typeof ButtonModule.Button).toBe("function")
  })
})