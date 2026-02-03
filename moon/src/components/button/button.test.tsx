import React from "react"
import { render, screen, cleanup } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { axe } from "vitest-axe"
import * as ButtonModule from "./button"
import { Button } from "./button"
import { ArrowUpIcon } from "lucide-react"

describe("Button Component", () => {
  afterEach(() => {
    cleanup()
  })

  describe("rendering", () => {
    it("renders the button with default props and children", () => {
      render(<Button>Click me</Button>)
      const button = screen.getByRole("button", { name: /click me/i })
      expect(button).toBeInTheDocument()
      expect(button).toHaveAttribute("type", "button")
    })

    it("renders an icon inside the button when provided as children", () => {
      render(
        <Button aria-label="submit">
          <ArrowUpIcon data-slot="icon" />
        </Button>,
      )
      // Query by container to find icon slot
      const container = screen.getByRole("button", { name: /submit/i })
      const icon = container.querySelector("[data-slot=\"icon\"]")
      expect(icon).toBeInTheDocument()
    })
  })

  describe("components", () => {
    it("renders as a native button element by default", () => {
      render(<Button>Button</Button>)
      const button = screen.getByRole("button")
      expect(button.tagName).toBe("BUTTON")
    })
  })

  describe("variants", () => {
    const variants = [
      "default",
      "outline",
      "ghost",
      "destructive",
      "secondary",
      "link",
    ] as const

    variants.forEach((variant) => {
      it(`renders with variant="${variant}"`, () => {
        render(<Button variant={variant}>Variant</Button>)
        const button = screen.getByRole("button", { name: /variant/i })
        expect(button).toBeInTheDocument()
        expect(button.className).toMatch(new RegExp(`\\b${variant}\\b`))
      })
    })
  })

  describe("size", () => {
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
      it(`renders with size="${size}"`, () => {
        render(
          <Button size={size === "default" ? undefined : size}>
            SizeButton
          </Button>,
        )
        const button = screen.getByRole("button", { name: /sizebutton/i })
        expect(button).toBeInTheDocument()
        if (size !== "default") {
          expect(button.className).toMatch(new RegExp(`\\b${size}\\b`))
        }
      })
    })
  })

  // No explicit subcomponents available in provided context

  // State tests — only disabled state is relevant from usage examples
  describe("state", () => {
    it("renders disabled button when disabled prop is true", () => {
      render(<Button disabled>Disabled</Button>)
      const button = screen.getByRole("button", { name: /disabled/i })
      expect(button).toBeDisabled()
    })
  })

  describe("props", () => {
    it("accepts and applies aria-label prop correctly", () => {
      render(<Button aria-label="submit button" />)
      const button = screen.getByLabelText("submit button")
      expect(button).toBeInTheDocument()
      expect(button).toHaveAttribute("aria-label", "submit button")
    })

    it("renders empty button gracefully with minimal props", () => {
      render(<Button aria-label="empty button" />)
      const button = screen.getByLabelText("empty button")
      expect(button).toBeInTheDocument()
      // Should have no children
      expect(button).toBeEmptyDOMElement()
    })

    it("renders correctly when asChild prop is true", () => {
      // asChild delegates rendering - test presence and role only
      const asChildText = "Link as Button"
      const { container } = render(
        <Button asChild>
          <a href="/test">{asChildText}</a>
        </Button>,
      )
      const link = screen.getByRole("link", { name: asChildText })
      expect(link).toBeInTheDocument()
      expect(container.querySelector("a")).toBeTruthy()
    })

    it("passes className to rendered button", () => {
      const className = "rounded-full"
      render(<Button className={className}>Rounded</Button>)
      const button = screen.getByRole("button", { name: /rounded/i })
      expect(button).toHaveClass(className)
    })
  })

  describe("interactions", () => {
    it("handles onClick event", async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>Click me</Button>)
      const button = screen.getByRole("button", { name: /click me/i })
      await user.click(button)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it("does not handle interactions when disabled", async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(
        <Button onClick={handleClick} disabled>
          Disabled
        </Button>,
      )
      const button = screen.getByRole("button", { name: /disabled/i })
      await user.click(button)
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe("accessibility", () => {
    it("should have no accessibility violations", async () => {
      const { container } = render(<Button>Accessible</Button>)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it("should have no accessibility violations with icon button and aria-label", async () => {
      const { container } = render(
        <Button aria-label="Submit">
          <ArrowUpIcon data-slot="icon" />
        </Button>,
      )
      // No axe disable is needed here since aria-label is properly used
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  describe("error handling", () => {
    it("renders without crashing when given empty string as children", () => {
      render(<Button>{""}</Button>)
      const button = screen.getByRole("button")
      expect(button).toBeInTheDocument()
      expect(button).toBeEmptyDOMElement()
    })

    it("renders disabled button with no children", () => {
      render(<Button disabled />)
      const button = screen.getByRole("button")
      expect(button).toBeDisabled()
    })

    it("renders with unknown variant gracefully (ignored)", () => {
      // @ts-expect-error testing unknown variant prop
      render(<Button variant="unknown">Invalid Variant</Button>)
      const button = screen.getByRole("button", { name: /invalid variant/i })
      expect(button).toBeInTheDocument()
    })
  })

  describe("exports", () => {
    it("should export Button component", () => {
      expect(ButtonModule.Button).toBeDefined()
      expect(typeof ButtonModule.Button).toBe("function")
    })
  })
})