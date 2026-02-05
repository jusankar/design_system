import React from "react"
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { axe } from "vitest-axe"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card"
import { Button } from "~/src/components/button"

describe("Card Rendering", () => {
  it("renders Card with default props", () => {
    render(
      <Card data-slot="card-root">
        <CardHeader data-slot="header">
          <CardTitle data-slot="title">Test Title</CardTitle>
          <CardDescription data-slot="description">Test Description</CardDescription>
          <CardAction data-slot="action">
            <Button>Action</Button>
          </CardAction>
        </CardHeader>
        <CardContent data-slot="content">
          <p>Test Content</p>
        </CardContent>
        <CardFooter data-slot="footer">
          <p>Test Footer</p>
        </CardFooter>
      </Card>,
    )

    expect(screen.getByText("Test Title")).toBeVisible()
    expect(screen.getByText("Test Description")).toBeVisible()
    expect(screen.getByText("Action")).toBeVisible()
    expect(screen.getByText("Test Content")).toBeVisible()
    expect(screen.getByText("Test Footer")).toBeVisible()
  })

  it("renders CardHeader, CardTitle, CardDescription, CardAction, CardContent, and CardFooter containers", () => {
    const { container } = render(
      <Card>
        <CardHeader data-slot="header">
          <CardTitle data-slot="title">Title Text</CardTitle>
          <CardDescription data-slot="description">Description Text</CardDescription>
          <CardAction data-slot="action">
            <Button>Link Btn</Button>
          </CardAction>
        </CardHeader>
        <CardContent data-slot="content">
          <p>Content Text</p>
        </CardContent>
        <CardFooter data-slot="footer">Footer Text</CardFooter>
      </Card>,
    )

    expect(container.querySelector("[data-slot='header']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='title']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='description']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='action']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='content']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='footer']")).toBeInTheDocument()
  })
})

describe("Card Components", () => {
  it("renders CardHeader component with children", () => {
    render(
      <CardHeader data-slot="header">
        <CardTitle>Header Title</CardTitle>
      </CardHeader>,
    )
    expect(screen.getByText("Header Title")).toBeVisible()
  })

  it("renders CardTitle component with className if provided", () => {
    const { container } = render(<CardTitle className="custom-title" data-slot="title">Title</CardTitle>)
    expect(container.querySelector("[data-slot='title']")).toHaveClass("custom-title")
    expect(screen.getByText("Title")).toBeVisible()
  })

  it("renders CardDescription component", () => {
    render(<CardDescription data-slot="description">Description here</CardDescription>)
    expect(screen.getByText("Description here")).toBeVisible()
  })

  it("renders CardAction component wrapping content", () => {
    render(
      <CardAction data-slot="action">
        <Button>Button</Button>
      </CardAction>,
    )
    expect(screen.getByText("Button")).toBeVisible()
  })

  it("renders CardContent component with children", () => {
    render(
      <CardContent data-slot="content">
        <p>Content paragraph</p>
      </CardContent>,
    )
    expect(screen.getByText("Content paragraph")).toBeVisible()
  })

  it("renders CardFooter component and accepts className", () => {
    const { container } = render(
      <CardFooter className="footer-class" data-slot="footer">
        Footer Content
      </CardFooter>,
    )
    expect(container.querySelector("[data-slot='footer']")).toHaveClass("footer-class")
    expect(screen.getByText("Footer Content")).toBeVisible()
  })
})

describe("Card Variants", () => {
  it("applies default size variant when no size prop is set", () => {
    const { container } = render(<Card data-slot="card-root">Default Size</Card>)
    expect(container.querySelector("[data-slot='card-root']")).toBeInTheDocument()
  })
})

describe("Card Size", () => {
  it("renders small size card when size='sm' prop is passed", () => {
    const { container } = render(<Card size="sm" data-slot="card-root">Small Card</Card>)
    expect(container.querySelector("[data-slot='card-root']")).toBeInTheDocument()
  })
})

describe("Card Props", () => {
  it("accepts and applies className prop to Card", () => {
    const { container } = render(
      <Card className="custom-class" data-slot="card-root">
        Content
      </Card>,
    )
    expect(container.querySelector("[data-slot='card-root']")).toHaveClass("custom-class")
  })

  it("passes className to CardHeader", () => {
    const { container } = render(
      <CardHeader className="header-class" data-slot="header">
        Header
      </CardHeader>,
    )
    expect(container.querySelector("[data-slot='header']")).toHaveClass("header-class")
  })

  it("passes className to CardTitle", () => {
    const { container } = render(
      <CardTitle className="title-class" data-slot="title">
        Title
      </CardTitle>,
    )
    expect(container.querySelector("[data-slot='title']")).toHaveClass("title-class")
  })

  it("passes className to CardDescription", () => {
    const { container } = render(
      <CardDescription className="desc-class" data-slot="description">
        Description
      </CardDescription>,
    )
    expect(container.querySelector("[data-slot='description']")).toHaveClass("desc-class")
  })

  it("passes className to CardAction", () => {
    const { container } = render(
      <CardAction className="action-class" data-slot="action">
        <Button>Btn</Button>
      </CardAction>,
    )
    expect(container.querySelector("[data-slot='action']")).toHaveClass("action-class")
  })

  it("passes className to CardContent", () => {
    const { container } = render(
      <CardContent className="content-class" data-slot="content">
        Content
      </CardContent>,
    )
    expect(container.querySelector("[data-slot='content']")).toHaveClass("content-class")
  })

  it("passes className to CardFooter", () => {
    const { container } = render(
      <CardFooter className="footer-class" data-slot="footer">
        Footer
      </CardFooter>,
    )
    expect(container.querySelector("[data-slot='footer']")).toHaveClass("footer-class")
  })
})

describe("Accessibility", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Accessible Title</CardTitle>
          <CardDescription>Accessible Description</CardDescription>
          <CardAction>
            <Button>Click me</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p>Accessible content</p>
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

describe("Error Handling", () => {
  it("renders gracefully with no children", () => {
    const { container } = render(<Card />)
    expect(container.querySelector("div")).toBeInTheDocument()
  })

  it("renders correctly with minimal props", () => {
    render(<Card data-slot="card-root">Minimal</Card>)
    expect(screen.getByText("Minimal")).toBeVisible()
  })
})

describe("Exports", () => {
  it("exports all required components", () => {
    expect(Card).toBeTypeOf("function")
    expect(CardAction).toBeTypeOf("function")
    expect(CardContent).toBeTypeOf("function")
    expect(CardDescription).toBeTypeOf("function")
    expect(CardFooter).toBeTypeOf("function")
    expect(CardHeader).toBeTypeOf("function")
    expect(CardTitle).toBeTypeOf("function")
  })
})