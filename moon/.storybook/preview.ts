import type { Decorator, Preview } from '@storybook/react-vite'
import { useEffect } from 'react'

import '~/src/styles/storybook-only.css'

const themes = [
  { value: 'light', title: 'Light' },
  { value: 'dark', title: 'Dark' },
]

export const globalTypes = {
  theme: {
    description: 'Theme for components',
    defaultValue: 'light',
    toolbar: {
      items: themes,
      dynamicTitle: true,
    },
  },
}

const withCustomTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme

  useEffect(() => {
    const html = document.documentElement

    html.classList.remove('light', 'dark')
    html.removeAttribute('data-theme')

    if (theme) {
      html.setAttribute('data-theme', theme)
      html.classList.add(theme)
    }
  }, [theme])

  return Story()
}

const preview: Preview = {
  decorators: [withCustomTheme],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
