import React, { useCallback, useMemo, useRef, useState } from "react"
import { Sidenav } from "../../lib/components/Sidenav"
import { Hamburger } from "../../lib/components/Hamburger"
import { PropsTable } from "../utils/PropsTable"
import { composePropsTableData } from "../utils/PropsTable.utils"

const SidenavProps = composePropsTableData([
  ["open", "boolean", "false", "Whether the sidenav is open or closed."],
  [
    "handleDismiss",
    "(e: KeyboardEvent | React.MouseEvent<HTMLDivElement>) => void",
    "() => {}",
    "Function to call when the sidenav is dismissed.",
  ],
  [
    "parent",
    "HTMLElement | null",
    "document.body",
    "Parent element of the sidenav. Prevents scrolling of the parent when the sidenav is open.",
  ],
  ["from", '"left" | "right"', "left", "Direction from which the sidenav should appear."],
  ["children", "React.ReactNode", "undefined", "Content inside the sidenav."],
])

export const SidenavSection = () => {
  return (
    <section>
      <div className="sub-section">
        <h3 className="sub-section-header">Props</h3>
        <PropsTable rows={SidenavProps} />
      </div>
      <div className="sub-section">
        <h3>Example</h3>
        <FullPageSidenav />
      </div>
      <hr />
      <div className="sub-section">
        <h3>From the Right</h3>
        <FullPageSidenav fromRight={true} />
      </div>
    </section>
  )
}

function FullPageSidenav({ fromRight = false }: { fromRight?: boolean } = {}) {
  const [open, setOpen] = useState(false)
  const parentContainer = useRef<HTMLDivElement>(null)

  const handleClick = useCallback(() => {
    setOpen(prev => !prev)
  }, [])

  const uuid = useMemo(() => Math.random().toString(36).substring(7), [])

  const closeSidenav = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <div className="full-page-container" ref={parentContainer}>
      <header
        className="simple-website-header"
        style={fromRight ? { justifyContent: "space-between" } : {}}
      >
        {fromRight ? (
          <>
            <span>Simple Website</span>
            <Hamburger open={open} onClick={handleClick} />
            <Sidenav
              open={open}
              handleDismiss={closeSidenav}
              parent={parentContainer.current}
              from="right"
            >
              <SimpleWebsiteNavLinks closeSidenav={closeSidenav} uuid={uuid} />
            </Sidenav>
          </>
        ) : (
          <>
            <Hamburger open={open} onClick={handleClick} />
            <Sidenav open={open} handleDismiss={closeSidenav} parent={parentContainer.current}>
              <SimpleWebsiteNavLinks closeSidenav={closeSidenav} uuid={uuid} />
            </Sidenav>

            <span>Simple Website</span>
          </>
        )}
      </header>

      <SimpleWebsiteMain uuid={uuid} />
    </div>
  )
}

function SimpleWebsiteNavLinks({
  closeSidenav,
  uuid,
}: {
  closeSidenav?: () => void
  uuid: string
}) {
  return (
    <ul className="simple-website-ul">
      <li>
        <a href={`#${uuid}-simple-website-home`} onClick={closeSidenav}>
          Home
        </a>
      </li>
      <li>
        <a href={`#${uuid}-simple-website-about`} onClick={closeSidenav}>
          About
        </a>
      </li>
      <li>
        <a href={`#${uuid}-simple-website-services`} onClick={closeSidenav}>
          Services
        </a>
      </li>
      <li>
        <a href={`#${uuid}-simple-website-contact`} onClick={closeSidenav}>
          Contact
        </a>
      </li>
      <li>
        <a href={`#${uuid}-simple-website-people`} onClick={closeSidenav}>
          People
        </a>
      </li>
    </ul>
  )
}

function SimpleWebsiteMain({ uuid }: { uuid: string }) {
  return (
    <main className="simple-website-main">
      <h1 id={`${uuid}-simple-website-home`} className="simple-website-heading">
        Welcome to Simple Website
      </h1>
      <div className="simple-website-div">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ligula nec odio ultricies
          ultricies. Nulla facilisi. Donec scelerisque, libero nec tincidunt ultricies, risus metus
          sollicitudin nunc, et tempor sapien turpis ac nunc. Cras ullamcorper, nunc nec ultricies
          lacinia, felis justo tincidunt sapien, a ultricies purus nunc in neque. Ut nec mi et nunc
          ultricies lacinia. Donec euismod, dui ac molestie fermentum, nunc sapien tincidunt turpis,
          vel scelerisque.
        </p>
      </div>
      <div className="simple-website-div">
        <h2 id={`${uuid}-simple-website-about`} className="simple-website-heading">
          About
        </h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ligula nec odio ultricies
          ultricies. Nulla facilisi. Donec scelerisque, libero nec tincidunt ultricies, risus metus
          sollicitudin nunc, et tempor sapien turpis ac nunc. Cras ullamcorper, nunc nec ultricies
          lacinia, felis justo tincidunt sapien, a ultricies purus nunc in neque. Ut nec mi et nunc
          ultricies lacinia. Donec euismod, dui ac molestie fermentum, nunc sapien tincidunt turpis,
          vel scelerisque.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ligula nec odio ultricies
          ultricies. Nulla facilisi. Donec scelerisque, libero nec tincidunt ultricies, risus metus
          sollicitudin nunc, et tempor sapien turpis ac nunc. Cras ullamcorper, nunc nec ultricies
          lacinia, felis justo tincidunt sapien, a ultricies purus nunc in neque. Ut nec mi et nunc
          ultricies lacinia. Donec euismod, dui ac molestie fermentum, nunc sapien tincidunt turpis,
          vel scelerisque.
        </p>
      </div>
      <div className="simple-website-div">
        <h2 id={`${uuid}-simple-website-services`} className="simple-website-heading">
          Services
        </h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ligula nec odio ultricies
          ultricies. Nulla facilisi. Donec scelerisque, libero nec tincidunt ultricies, risus metus
          sollicitudin nunc, et tempor sapien turpis ac nunc. Cras ullamcorper, nunc nec ultricies
          lacinia, felis justo tincidunt sapien, a ultricies purus nunc in neque. Ut nec mi et nunc
          ultricies lacinia. Donec euismod, dui ac molestie fermentum, nunc sapien tincidunt turpis,
          vel scelerisque.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ligula nec odio ultricies
          ultricies. Nulla facilisi. Donec scelerisque, libero nec tincidunt ultricies, risus metus
          sollicitudin nunc, et tempor sapien turpis ac nunc. Cras ullamcorper, nunc nec ultricies
          lacinia, felis justo tincidunt sapien, a ultricies purus nunc in neque. Ut nec mi et nunc
          ultricies lacinia. Donec euismod, dui ac molestie fermentum, nunc sapien tincidunt turpis,
          vel scelerisque.
        </p>
      </div>
      <div className="simple-website-div">
        <h2 id={`${uuid}-simple-website-contact`} className="simple-website-heading">
          Contact
        </h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ligula nec odio ultricies
          ultricies. Nulla facilisi. Donec scelerisque, libero nec tincidunt ultricies, risus metus
          sollicitudin nunc, et tempor sapien turpis ac nunc. Cras ullamcorper, nunc nec ultricies
          lacinia, felis justo tincidunt sapien, a ultricies purus nunc in neque. Ut nec mi et nunc
          ultricies lacinia. Donec euismod, dui ac molestie fermentum, nunc sapien tincidunt turpis,
          vel scelerisque.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ligula nec odio ultricies
          ultricies. Nulla facilisi. Donec scelerisque, libero nec tincidunt ultricies, risus metus
          sollicitudin nunc, et tempor sapien turpis ac nunc. Cras ullamcorper, nunc nec ultricies
          lacinia, felis justo tincidunt sapien, a ultricies purus nunc in neque. Ut nec mi et nunc
          ultricies lacinia. Donec euismod, dui ac molestie fermentum, nunc sapien tincidunt turpis,
          vel scelerisque.
        </p>
      </div>
      <div className="simple-website-div">
        <h2 id={`${uuid}-simple-website-people`} className="simple-website-heading">
          People
        </h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ligula nec odio ultricies
          ultricies. Nulla facilisi. Donec scelerisque, libero nec tincidunt ultricies, risus metus
          sollicitudin nunc, et tempor sapien turpis ac nunc. Cras ullamcorper, nunc nec ultricies
          lacinia, felis justo tincidunt sapien, a ultricies purus nunc in neque. Ut nec mi et nunc
          ultricies lacinia. Donec euismod, dui ac molestie fermentum, nunc sapien tincidunt turpis,
          vel scelerisque.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ligula nec odio ultricies
          ultricies. Nulla facilisi. Donec scelerisque, libero nec tincidunt ultricies, risus metus
          sollicitudin nunc, et tempor sapien turpis ac nunc. Cras ullamcorper, nunc nec ultricies
          lacinia, felis justo tincidunt sapien, a ultricies purus nunc in neque. Ut nec mi et nunc
          ultricies lacinia. Donec euismod, dui ac molestie fermentum, nunc sapien tincidunt turpis,
          vel scelerisque.
        </p>
      </div>
    </main>
  )
}
