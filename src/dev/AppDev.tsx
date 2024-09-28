import React from "react"
import { LoadingSpinner } from "../lib/components/LoadingSpinner"
import { ButtonSection } from "./demos/Buttons"
import "./index.css"
import { InputSection } from "./demos/Inputs"

export const AppDev = () => {
  return (
    <>
      <h1>PK Component Library</h1>
      <h2 id="Button">
        <code>Button</code>
      </h2>
      <ButtonSection />
      <h2 id="LoadingSpinner">
        <code>LoadingSpinner</code>
      </h2>
      <section>
        <LoadingSpinner />
      </section>
      <h2 id="Input">
        <code>Input</code>
      </h2>
      <section>
        <InputSection />
      </section>
    </>
  )
}
