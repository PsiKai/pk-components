import React, { useCallback } from "react"
import { Sidenav } from "../lib/components/Sidenav"
import { Hamburger } from "../lib/components/Hamburger"
import { Button } from "../lib/components/Button"
import { components } from "./component-index"

import "./index.css"
import "./demos/sidenav-section.css"

export const AppDev = () => {
  const [navOpen, setNavOpen] = React.useState(false)

  const navToggle = useCallback(() => {
    setNavOpen(prev => !prev)
  }, [])

  const navClose = useCallback(() => {
    setNavOpen(false)
  }, [])

  return (
    <>
      <header className="main-header">
        <Hamburger open={navOpen} onClick={navToggle} />
        <Sidenav open={navOpen} from="left" handleDismiss={navClose}>
          <ul className="nav-links">
            {Object.keys(components).map(section => (
              <li>
                <Button fit="link" onClick={navClose} href={`#${section}`}>
                  {section}
                </Button>
              </li>
            ))}
          </ul>
        </Sidenav>
        <span>PK Component Library</span>
      </header>
      <h1>PK Component Library</h1>
      {Object.entries(components).map(([componentName, Component]) => (
        <div className="section-wrapper" key={componentName}>
          <h2 id={componentName} className="section-header">
            <code>{componentName}</code>
          </h2>
          <Component />
        </div>
      ))}
    </>
  )
}
