import React from "react"
import { ToastAlertProvider, useToastAlerts } from "../../lib/components/ToastAlert"
import { composePropsTableData } from "../utils/PropsTable.utils"
import { PropsTable } from "../utils/PropsTable"
import { Button } from "../../lib/components/Button"

const ToastAlertProps = composePropsTableData([])

export const ToastAlertSection = () => {
  return (
    <div className="section-wrapper">
      <h2 id="ToastAlert" className="section-header">
        <code>ToastAlert</code>
      </h2>
      <section>
        <div className="sub-section">
          <h3 className="sub-section-header">Props</h3>
          <PropsTable rows={ToastAlertProps} />
        </div>
        <div className="sub-section">
          <h3>Toast example</h3>
          <ToastAlertProvider>
            <ToastExampleLayout />
          </ToastAlertProvider>
        </div>
      </section>
    </div>
  )
}

function ToastExampleLayout() {
  const { newToast } = useToastAlerts()

  return (
    <div className="full-page-container">
      <main className="simple-website-main">
        <h1 className="simple-website-heading">Welcome to Simple Website</h1>
        <div className="simple-website-div">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ligula nec odio
            ultricies ultricies. Nulla facilisi. Donec scelerisque, libero nec tincidunt ultricies,
            risus metus sollicitudin nunc, et tempor sapien turpis ac nunc. Cras ullamcorper, nunc
            nec ultricies lacinia, felis justo tincidunt sapien, a ultricies purus nunc in neque. Ut
            nec mi et nunc ultricies lacinia. Donec euismod, dui ac molestie fermentum, nunc sapien
            tincidunt turpis, vel scelerisque.
          </p>
          <Button
            fit="small"
            variant="success"
            onClick={() => newToast("This is a toast alert!", { intent: "success" })}
          >
            Show Success Toast
          </Button>
        </div>
        <div className="simple-website-div">
          <h2 className="simple-website-heading">About</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ligula nec odio
            ultricies ultricies. Nulla facilisi. Donec scelerisque, libero nec tincidunt ultricies,
            risus metus sollicitudin nunc, et tempor sapien turpis ac nunc. Cras ullamcorper, nunc
            nec ultricies lacinia, felis justo tincidunt sapien, a ultricies purus nunc in neque. Ut
            nec mi et nunc ultricies lacinia. Donec euismod, dui ac molestie fermentum, nunc sapien
            tincidunt turpis, vel scelerisque.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ligula nec odio
            ultricies ultricies. Nulla facilisi. Donec scelerisque, libero nec tincidunt ultricies,
            risus metus sollicitudin nunc, et tempor sapien turpis ac nunc. Cras ullamcorper, nunc
            nec ultricies lacinia, felis justo tincidunt sapien, a ultricies purus nunc in neque. Ut
            nec mi et nunc ultricies lacinia. Donec euismod, dui ac molestie fermentum, nunc sapien
            tincidunt turpis, vel scelerisque.
          </p>
        </div>
        <div className="simple-website-div">
          <h2 className="simple-website-heading">Services</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ligula nec odio
            ultricies ultricies. Nulla facilisi. Donec scelerisque, libero nec tincidunt ultricies,
            risus metus sollicitudin nunc, et tempor sapien turpis ac nunc. Cras ullamcorper, nunc
            nec ultricies lacinia, felis justo tincidunt sapien, a ultricies purus nunc in neque. Ut
            nec mi et nunc ultricies lacinia. Donec euismod, dui ac molestie fermentum, nunc sapien
            tincidunt turpis, vel scelerisque.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ligula nec odio
            ultricies ultricies. Nulla facilisi. Donec scelerisque, libero nec tincidunt ultricies,
            risus metus sollicitudin nunc, et tempor sapien turpis ac nunc. Cras ullamcorper, nunc
            nec ultricies lacinia, felis justo tincidunt sapien, a ultricies purus nunc in neque. Ut
            nec mi et nunc ultricies lacinia. Donec euismod, dui ac molestie fermentum, nunc sapien
            tincidunt turpis, vel scelerisque.
          </p>
        </div>
        <div className="simple-website-div">
          <h2 className="simple-website-heading">Contact</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ligula nec odio
            ultricies ultricies. Nulla facilisi. Donec scelerisque, libero nec tincidunt ultricies,
            risus metus sollicitudin nunc, et tempor sapien turpis ac nunc. Cras ullamcorper, nunc
            nec ultricies lacinia, felis justo tincidunt sapien, a ultricies purus nunc in neque. Ut
            nec mi et nunc ultricies lacinia. Donec euismod, dui ac molestie fermentum, nunc sapien
            tincidunt turpis, vel scelerisque.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ligula nec odio
            ultricies ultricies. Nulla facilisi. Donec scelerisque, libero nec tincidunt ultricies,
            risus metus sollicitudin nunc, et tempor sapien turpis ac nunc. Cras ullamcorper, nunc
            nec ultricies lacinia, felis justo tincidunt sapien, a ultricies purus nunc in neque. Ut
            nec mi et nunc ultricies lacinia. Donec euismod, dui ac molestie fermentum, nunc sapien
            tincidunt turpis, vel scelerisque.
          </p>
        </div>
        <div className="simple-website-div">
          <h2 className="simple-website-heading">People</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ligula nec odio
            ultricies ultricies. Nulla facilisi. Donec scelerisque, libero nec tincidunt ultricies,
            risus metus sollicitudin nunc, et tempor sapien turpis ac nunc. Cras ullamcorper, nunc
            nec ultricies lacinia, felis justo tincidunt sapien, a ultricies purus nunc in neque. Ut
            nec mi et nunc ultricies lacinia. Donec euismod, dui ac molestie fermentum, nunc sapien
            tincidunt turpis, vel scelerisque.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ligula nec odio
            ultricies ultricies. Nulla facilisi. Donec scelerisque, libero nec tincidunt ultricies,
            risus metus sollicitudin nunc, et tempor sapien turpis ac nunc. Cras ullamcorper, nunc
            nec ultricies lacinia, felis justo tincidunt sapien, a ultricies purus nunc in neque. Ut
            nec mi et nunc ultricies lacinia. Donec euismod, dui ac molestie fermentum, nunc sapien
            tincidunt turpis, vel scelerisque.
          </p>
        </div>
      </main>
    </div>
  )
}
