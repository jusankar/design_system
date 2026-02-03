import { Outlet } from 'react-router-dom'

export async function loader() {
  return null
}

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <Outlet />
    </div>
  )
}
