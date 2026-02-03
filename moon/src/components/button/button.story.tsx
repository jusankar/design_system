import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '~/src/components/button'
import { ArrowUpIcon, ArrowUpRightIcon, CircleFadingArrowUpIcon } from 'lucide-react'
import { IconGitBranch } from '@tabler/icons-react'
import * as React from 'react'
import {
  ArchiveIcon,
  ArrowLeftIcon,
  CalendarPlusIcon,
  ClockIcon,
  ListFilterIcon,
  MailCheckIcon,
  MoreHorizontalIcon,
  TagIcon,
  Trash2Icon,
  PlusIcon,
  ArrowRightIcon,
} from 'lucide-react'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
}
export default meta
type Story = StoryObj<typeof Button>

export const Demo: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2 md:flex-row">
      <Button variant="outline">Button</Button>
      <Button variant="outline" size="icon" aria-label="Submit">
        <ArrowUpIcon />
      </Button>
    </div>
  ),
}

export const Size: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-8 sm:flex-row">
      <div className="flex items-start gap-2">
        <Button size="xs" variant="outline">
          Extra Small
        </Button>
        <Button size="icon-xs" aria-label="Submit" variant="outline">
          <ArrowUpRightIcon />
        </Button>
      </div>
      <div className="flex items-start gap-2">
        <Button size="sm" variant="outline">
          Small
        </Button>
        <Button size="icon-sm" aria-label="Submit" variant="outline">
          <ArrowUpRightIcon />
        </Button>
      </div>
      <div className="flex items-start gap-2">
        <Button variant="outline">Default</Button>
        <Button size="icon" aria-label="Submit" variant="outline">
          <ArrowUpRightIcon />
        </Button>
      </div>
      <div className="flex items-start gap-2">
        <Button variant="outline" size="lg">
          Large
        </Button>
        <Button size="icon-lg" aria-label="Submit" variant="outline">
          <ArrowUpRightIcon />
        </Button>
      </div>
    </div>
  ),
}

export const Default: Story = {
  render: () => <Button>Button</Button>,
}

export const Outline: Story = {
  render: () => <Button variant="outline">Outline</Button>,
}

export const Secondary: Story = {
  render: () => <Button variant="secondary">Secondary</Button>,
}

export const Ghost: Story = {
  render: () => <Button variant="ghost">Ghost</Button>,
}

export const Destructive: Story = {
  render: () => <Button variant="destructive">Destructive</Button>,
}

export const Link: Story = {
  render: () => <Button variant="link">Link</Button>,
}

export const Icon: Story = {
  render: () => (
    <Button variant="outline" size="icon">
      <CircleFadingArrowUpIcon />
    </Button>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <Button variant="outline" size="sm">
      <IconGitBranch /> New Branch
    </Button>
  ),
}

export const Rounded: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <Button variant="outline" size="icon" className="rounded-full">
        <ArrowUpIcon />
      </Button>
    </div>
  ),
}