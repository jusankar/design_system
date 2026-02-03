import { createBrowserRouter } from 'react-router-dom'
import RootLayout, { loader as rootLoader } from './root'
import Home from '../pages/home'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    loader: rootLoader,
    children: [
      {
        index: true,
        element: <Home />
      }
    ]
  }
])
