import "./StylesGlobals/reset.css"
import "./StylesGlobals/root.css"
import "./StylesGlobals/assets.css"
import { useState, useEffect } from "react"
import Menu from "./Components/Menu/Menu.jsx"
import CreateOrder from "./Components/createOrder/createOrder.jsx"
import Orders from "./Components/Orders/Orders.jsx"
import IPVerificationRequisition from "./Requisitions/IPVerification.jsx"
import ScreenNotAuthorized from "./Components/screenNotAuthorized/screenNotAuthorized.jsx"
function App() {
  const [section, setSection] = useState("createOrder")
  const [authorized, setAuthorized] = useState(false)
  useEffect(() => {
    IPVerificationRequisition(setAuthorized)
  }, [])
  return (
    <>
      <ScreenNotAuthorized authorized={authorized}/>
      <CreateOrder section={section} />
      <Menu setSection={setSection} />
      <Orders section={section} />

    </>
  )
}

export default App