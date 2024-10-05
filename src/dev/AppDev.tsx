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
      <div className="section-wrapper">
        <h2 id="Button" className="section-header">
          <code>Button</code>
        </h2>
        <ButtonSection />
      </div>
      <div className="section-wrapper">
        <h2 id="LoadingSpinner" className="section-header">
          <code>LoadingSpinner</code>
        </h2>
        <section>
          <LoadingSpinner />
        </section>
      </div>
      <div className="section-wrapper">
        <h2 id="Input" className="section-header">
          <code>Input</code>
        </h2>
        <section>
          <InputSection />
        </section>
      </div>
      <div className="section-wrapper">
        <h2 id="FileInput" className="section-header">
          <code>FileInput</code>
        </h2>
        <section>
          <FileInputSection />
        </section>
      </div>
    </>
  )
}
