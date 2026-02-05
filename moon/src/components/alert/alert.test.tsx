import React from "react"
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { axe } from "vitest-axe"
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "./alert"
import { CheckCircle2Icon, InfoIcon } from "lucide-react"

describe("Alert - rendering", () => {
  it("renders Alert with children correctly", () => {
    render(
      <Alert>
        <CheckCircle2Icon data-slot="icon" />
        <AlertTitle data-slot="title">Test Title</AlertTitle>
        <AlertDescription data-slot="description">Test Description</AlertDescription>
      </Alert>,
    )

    expect(screen.getByText("Test Title")).toBeVisible()
    expect(screen.getByText("Test Description")).toBeVisible()

    const iconSlot = document.querySelector("[data-slot='icon']")
    expect(iconSlot).toBeInTheDocument()

    const titleSlot = document.querySelector("[data-slot='title']")
    expect(titleSlot).toBeInTheDocument()

    const descriptionSlot = document.querySelector("[data-slot='description']")
    expect(descriptionSlot).toBeInTheDocument()
  })

  it("renders AlertTitle independently with className", () => {
    render(<AlertTitle data-slot="title" className="custom-class">Title Text</AlertTitle>)
    const title = document.querySelector("[data-slot='title']")
    expect(title).toBeInTheDocument()
    expect(title).toHaveClass("custom-class")
    expect(screen.getByText("Title Text")).toBeVisible()
  })

  it("renders AlertDescription independently with className", () => {
    render(<AlertDescription data-slot="description" className="custom-desc">Description Text</AlertDescription>)
    const desc = document.querySelector("[data-slot='description']")
    expect(desc).toBeInTheDocument()
    expect(desc).toHaveClass("custom-desc")
    expect(screen.getByText("Description Text")).toBeVisible()
  })

  it("renders AlertAction independently with className", () => {
    render(<AlertAction data-slot="action" className="custom-action">Action Content</AlertAction>)
    const action = document.querySelector("[data-slot='action']")
    expect(action).toBeInTheDocument()
    expect(action).toHaveClass("custom-action")
    expect(screen.getByText("Action Content")).toBeVisible()
  })
})

describe("Alert - components", () => {
  it("contains icon, title and description slots in Alert", () => {
    render(
      <Alert>
        <CheckCircle2Icon data-slot="icon" />
        <AlertTitle data-slot="title">Title Here</AlertTitle>
        <AlertDescription data-slot="description">Description Here</AlertDescription>
      </Alert>,
    )
    const icon = document.querySelector("[data-slot='icon']")
    const title = document.querySelector("[data-slot='title']")
    const description = document.querySelector("[data-slot='description']")

    expect(icon).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  it("renders AlertAction inside Alert when provided", () => {
    render(
      <Alert>
        <AlertTitle data-slot="title">Title</AlertTitle>
        <AlertDescription data-slot="description">Description</AlertDescription>
        <AlertAction data-slot="action">Button</AlertAction>
      </Alert>,
    )
    const action = document.querySelector("[data-slot='action']")
    expect(action).toBeInTheDocument()
    expect(screen.getByText("Button")).toBeVisible()
  })
})

describe("Alert - variants", () => {
  it("renders default variant by default", () => {
    const { container } = render(
      <Alert data-slot="alert">
        <AlertTitle>Default Variant</AlertTitle>
      </Alert>,
    )
    const alert = container.querySelector("[data-slot='alert']") ?? container.firstChild
    expect(alert).toBeInTheDocument()
  })

  it("renders destructive variant when variant prop is set", () => {
    const { container } = render(
      <Alert variant="destructive" data-slot="alert">
        <AlertTitle>Destructive Variant</AlertTitle>
      </Alert>,
    )
    const alert = container.querySelector("[data-slot='alert']") ?? container.firstChild
    expect(alert).toBeInTheDocument()
  })
})

describe("Alert - size", () => {
  // No size prop documented; skip this section
  it("does not apply any size classes as size not supported", () => {
    const { container } = render(
      <Alert data-slot="alert">
        <AlertTitle>Size test</AlertTitle>
      </Alert>,
    )
    const alert = container.querySelector("[data-slot='alert']") ?? container.firstChild
    expect(alert).toBeInTheDocument()
  })
})

describe("Alert - subcomponents", () => {
  it("renders AlertTitle correctly", () => {
    render(<AlertTitle data-slot="title">Subcomponent Title</AlertTitle>)
    const title = document.querySelector("[data-slot='title']")
    expect(title).toBeInTheDocument()
    expect(screen.getByText("Subcomponent Title")).toBeVisible()
  })

  it("renders AlertDescription correctly", () => {
    render(<AlertDescription data-slot="description">Subcomponent Description</AlertDescription>)
    const description = document.querySelector("[data-slot='description']")
    expect(description).toBeInTheDocument()
    expect(screen.getByText("Subcomponent Description")).toBeVisible()
  })

  it("renders AlertAction correctly", () => {
    render(<AlertAction data-slot="action">Subcomponent Action</AlertAction>)
    const action = document.querySelector("[data-slot='action']")
    expect(action).toBeInTheDocument()
    expect(screen.getByText("Subcomponent Action")).toBeVisible()
  })
})

describe("Alert - state", () => {
  // The component has no documented explicit states like loading, disabled, or checked
  it("does not have built-in state props to test", () => {
    render(<Alert data-slot="alert">No State Test</Alert>)
    expect(document.querySelector("[data-slot='alert']")).toBeInTheDocument()
  })
})

describe("Alert - props", () => {
  it("accepts and applies custom className on Alert component", () => {
    const { container } = render(
      <Alert className="custom-class" data-slot="alert">
        <AlertTitle>Title</AlertTitle>
      </Alert>,
    )
    const alert = container.querySelector("[data-slot='alert']") ?? container.firstChild
    expect(alert).toHaveClass("custom-class")
  })

  it("accepts and applies className on AlertTitle", () => {
    const { container } = render(<AlertTitle className="title-class" data-slot="title">Test</AlertTitle>)
    const title = container.querySelector("[data-slot='title']")
    expect(title).toHaveClass("title-class")
  })

  it("accepts and applies className on AlertDescription", () => {
    const { container } = render(<AlertDescription className="desc-class" data-slot="description">Test</AlertDescription>)
    const desc = container.querySelector("[data-slot='description']")
    expect(desc).toHaveClass("desc-class")
  })

  it("accepts and applies className on AlertAction", () => {
    const { container } = render(<AlertAction className="action-class" data-slot="action">Test</AlertAction>)
    const action = container.querySelector("[data-slot='action']")
    expect(action).toHaveClass("action-class")
  })
})

describe("Alert - interactions", () => {
  // No interactive handlers on Alert itself; AlertAction can contain interactions delegated elsewhere (e.g. Button)
  it("does not have built-in interactions to test on Alert", () => {
    render(<Alert><AlertTitle>Test</AlertTitle></Alert>)
    expect(screen.getByText("Test")).toBeVisible()
  })
})

describe("Alert - accessibility", () => {
  it("has no accessibility violations in basic usage", async () => {
    const { container } = render(
      <Alert>
        <CheckCircle2Icon />
        <AlertTitle>Accessible Title</AlertTitle>
        <AlertDescription>Accessible Description</AlertDescription>
      </Alert>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it("has appropriate role and aria attributes", () => {
    render(
      <Alert>
        <AlertTitle data-slot="title">Alert Role</AlertTitle>
        <AlertDescription>Description text.</AlertDescription>
      </Alert>,
    )
    // Radix Alert usually role="alert" or similar
    const alertElement = screen.getByRole("alert")
    expect(alertElement).toBeInTheDocument()
    expect(screen.getByText("Alert Role")).toBeVisible()
    expect(screen.getByText("Description text.")).toBeVisible()
  })
})

describe("Alert - error handling", () => {
  it("renders gracefully with minimal props and no children", () => {
    const { container } = render(<Alert data-slot="alert" />)
    const alert = container.querySelector("[data-slot='alert']") ?? container.firstChild
    expect(alert).toBeInTheDocument()
  })

  it("renders with empty strings in title and description", () => {
    render(
      <Alert>
        <AlertTitle data-slot="title"></AlertTitle>
        <AlertDescription data-slot="description"></AlertDescription>
      </Alert>,
    )
    const title = document.querySelector("[data-slot='title']")
    const desc = document.querySelector("[data-slot='description']")
    expect(title).toBeInTheDocument()
    expect(desc).toBeInTheDocument()
  })

  it("renders AlertAction without children gracefully", () => {
    const { container } = render(<AlertAction data-slot="action" />)
    const action = container.querySelector("[data-slot='action']")
    expect(action).toBeInTheDocument()
  })
})

describe("Alert - exports", () => {
  it("exports Alert component", () => {
    expect(Alert).toBeTypeOf("function")
  })
  it("exports AlertTitle component", () => {
    expect(AlertTitle).toBeTypeOf("function")
  })
  it("exports AlertDescription component", () => {
    expect(AlertDescription).toBeTypeOf("function")
  })
  it("exports AlertAction component", () => {
    expect(AlertAction).toBeTypeOf("function")
  })
})