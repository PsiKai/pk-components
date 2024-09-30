import React from "react"
import { LoadingSpinner } from "../lib/components/LoadingSpinner"
import { InputSection } from "./demos/Inputs"
import { ButtonSection } from "./demos/Buttons"
import { FileInputSection } from "./demos/FileInputs"
import "./index.css"

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
      <h2 id="FileInput">
        <code>FileInput</code>
      </h2>
      <section>
        <FileInputSection />
      </section>
    </>
  )
}
