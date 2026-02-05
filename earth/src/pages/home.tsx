import React from "react"

import { AlertDemo } from "../components/alert/alertDemo"
import { BadgeDemo } from "../components/badge/badgeDemo"
import { ButtonDemo } from "../components/button/buttonDemo"
import { CalendarDemo } from "../components/calendar/calendarDemo"
import { CardDemo } from "../components/card/cardDemo"

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">All Components</h1>

      <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        <section className="border border-black p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4 capitalize">
            alert
          </h2>
          <AlertDemo />
        </section>

        <section className="border border-black p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4 capitalize">
            badge
          </h2>
          <BadgeDemo />
        </section>

        <section className="border border-black p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4 capitalize">
            button
          </h2>
          <ButtonDemo />
        </section>

        <section className="border border-black p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4 capitalize">
            calendar
          </h2>
          <CalendarDemo />
        </section>

        <section className="border border-black p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4 capitalize">
            card
          </h2>
          <CardDemo />
        </section>

      </div>
    </main>
  )
}
