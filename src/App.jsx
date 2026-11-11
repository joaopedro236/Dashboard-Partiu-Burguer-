import "./StylesGlobals/reset.css"
import "./StylesGlobals/root.css"
import "./StylesGlobals/assets.css"
import { useState, useEffect } from "react"
import Menu from "./Components/Menu/Menu.jsx"
import authorizationRequisition from "./Requisitions/authorization.jsx"
import CreateOrder from "./Components/createOrder/createOrder.jsx"
import Authorization from "./Components/Authorization/Authorization.jsx"
import Orders from "./Components/Orders/Orders.jsx"
function App() {
  const [section, setSection] = useState("createOrder")
  const [authorized, setAuthorized] = useState(true)

  useEffect(() => {
    authorizationRequisition(setAuthorized)
  }, [])
  return (
    <>
      {!authorized && <Authorization />}
      <CreateOrder section={section} />
      <Menu setSection={setSection} />
      <Orders section={section} />

    </>
  )
}

export default App