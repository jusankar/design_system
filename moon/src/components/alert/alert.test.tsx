import React from "react"
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { axe } from "vitest-axe"
import * as AlertModule from "@/components/ui/alert"
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

describe("Alert - rendering", () => {
  it("renders the Alert with icon, title, and description", () => {
    render(
      <Alert>
        <svg data-slot="icon" />
        <AlertTitle>Test Title</AlertTitle>
        <AlertDescription>Test Description</AlertDescription>
      </Alert>
    )
    expect(screen.getByText("Test Title")).toBeVisible()
    expect(screen.getByText("Test Description")).toBeVisible()
  })

  it("renders Alert with additional class names", () => {
    const { container } = render(
      <Alert className="custom-class">
        <AlertTitle>Title</AlertTitle>
      </Alert>
    )
    const alertElement = container.firstChild
    expect(alertElement).toHaveClass("custom-class")
  })
})

describe("Alert - components", () => {
  it("renders AlertTitle with provided children", () => {
    render(<AlertTitle>Alert Title Content</AlertTitle>)
    expect(screen.getByText("Alert Title Content")).toBeVisible()
  })

  it("renders AlertDescription with provided children", () => {
    render(<AlertDescription>Alert Description Content</AlertDescription>)
    expect(screen.getByText("Alert Description Content")).toBeVisible()
  })

  it("renders AlertAction with provided children", () => {
    render(
      <Alert>
        <AlertAction>
          <button type="button">Action Button</button>
        </AlertAction>
      </Alert>
    )
    const actionEl = screen.getByRole("button", { name: "Action Button" })
    expect(actionEl).toBeVisible()
  })
})

describe("Alert - variants", () => {
  it("applies default variant styling by default", () => {
    const { container } = render(
      <Alert>
        <AlertTitle>Default Variant</AlertTitle>
      </Alert>
    )
    const alertEl = container.firstChild
    expect(alertEl).toBeInTheDocument()
    // Variant "default" is default, so no destructive class should be present
    expect(alertEl).not.toHaveClass(expect.stringContaining("destructive"))
  })

  it("renders destructive variant when variant prop is set", () => {
    const { container } = render(
      <Alert variant="destructive">
        <AlertTitle>Destructive Variant</AlertTitle>
      </Alert>
    )
    const alertEl = container.firstChild
    expect(alertEl).toHaveAttribute("data-variant", "destructive")
  })
})

describe("Alert - size", () => {
  it("does not apply size classes or props by default", () => {
    const { container } = render(
      <Alert>
        <AlertTitle>Size Prop Test</AlertTitle>
      </Alert>
    )
    const alertEl = container.firstChild
    expect(alertEl).toBeInTheDocument()
    // There is no size prop or class expected on Alert by default
  })
})

describe("Alert - subcomponents", () => {
  it("renders AlertAction children correctly in their container", () => {
    const { container } = render(
      <Alert>
        <AlertAction>
          <button type="button">Subcomponent Button</button>
        </AlertAction>
      </Alert>
    )
    const alertActionContainer = container.querySelector("[data-slot=action]")
    expect(alertActionContainer).toBeInTheDocument()
    expect(alertActionContainer).toContainElement(
      screen.getByRole("button", { name: "Subcomponent Button" })
    )
  })
})

describe("Alert - state", () => {
  // Alert does not handle specific state internally (like loading, disabled), no tests here.
})

describe("Alert - props", () => {
  it("accepts and applies className on AlertTitle", () => {
    const { container } = render(
      <AlertTitle className="custom-title-class">Title Text</AlertTitle>
    )
    const titleEl = container.firstChild
    expect(titleEl).toHaveClass("custom-title-class")
  })

  it("accepts and applies className on AlertDescription", () => {
    const { container } = render(
      <AlertDescription className="custom-description-class">
        Description Text
      </AlertDescription>
    )
    const descEl = container.firstChild
    expect(descEl).toHaveClass("custom-description-class")
  })

  it("accepts and applies className on AlertAction", () => {
    const { container } = render(
      <AlertAction className="custom-action-class">
        <button>Click</button>
      </AlertAction>
    )
    const actionEl = container.firstChild
    expect(actionEl).toHaveClass("custom-action-class")
  })
})

describe("Alert - interactions", () => {
  // The Alert component does not handle direct user interactions itself.
  // Interaction tests only for delegated user events like button clicks inside AlertAction.
  it("allows clicking a button inside AlertAction", async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(
      <Alert>
        <AlertAction>
          <button type="button" onClick={handleClick}>
            Click Me
          </button>
        </AlertAction>
      </Alert>
    )

    const button = screen.getByRole("button", { name: "Click Me" })
    await user.click(button)
    expect(handleClick).toHaveBeenCalledOnce()
  })
})

describe("Alert - accessibility", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(
      <Alert>
        <svg aria-hidden="true" />
        <AlertTitle>Accessible Title</AlertTitle>
        <AlertDescription>Accessible Description</AlertDescription>
      </Alert>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it("has no accessibility violations when using destructive variant", async () => {
    const { container } = render(
      <Alert variant="destructive">
        <svg aria-hidden="true" />
        <AlertTitle>Destructive Title</AlertTitle>
        <AlertDescription>Destructive Description</AlertDescription>
      </Alert>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})

describe("Alert - error handling", () => {
  it("renders gracefully with no children", () => {
    const { container } = render(<Alert />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("renders AlertTitle without children gracefully", () => {
    const { container } = render(<AlertTitle />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("renders AlertDescription without children gracefully", () => {
    const { container } = render(<AlertDescription />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("renders AlertAction without children gracefully", () => {
    const { container } = render(<AlertAction />)
    expect(container.firstChild).toBeInTheDocument()
  })
})

describe("Alert - exports", () => {
  it("has all named exports", () => {
    expect(AlertModule.Alert).toBeTypeOf("function")
    expect(AlertModule.AlertTitle).toBeTypeOf("function")
    expect(AlertModule.AlertDescription).toBeTypeOf("function")
    expect(AlertModule.AlertAction).toBeTypeOf("function")
  })
})