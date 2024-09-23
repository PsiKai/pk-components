import React from "react"
import { LoadingSpinner } from "../lib/components/LoadingSpinner"
import { ButtonSection } from "./demos/Buttons"
import "./index.css"

export const AppDev = () => {
  return (
    <>
      <h1>PK Component Library</h1>
      <ButtonSection />
      <h2>
        <code>LoadingSpinner</code>
      </h2>
      <section>
        <LoadingSpinner />
      </section>
    </>
  )
}
