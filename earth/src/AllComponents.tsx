import React from "react"
import { Alert } from "moon/src/components/alert"
import { Badge } from "moon/src/components/badge"
import { Card } from "moon/src/components/card"

export default function AllComponents() {
  return (
    <main>
      <section>
        <h2>Alert</h2>
        <Alert />
      </section>
      <section>
        <h2>Badge</h2>
        <Badge />
      </section>
      <section>
        <h2>Card</h2>
        <Card />
      </section>
    </main>
  )
}