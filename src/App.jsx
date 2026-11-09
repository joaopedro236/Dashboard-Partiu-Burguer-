import "./StylesGlobals/reset.css"
import "./StylesGlobals/root.css"
import "./StylesGlobals/assets.css"
import { useState } from "react"
import Menu from "./Components/Menu/Menu.jsx"
import CreateOrder from "./Components/createOrder/createOrder.jsx"
import Orders from "./Components/Orders/Orders.jsx"
function App() {
  const [section, setSection] = useState("createOrder")
  return (
    <>
    <CreateOrder section={section}/>
    <Menu setSection={setSection}/>
    <Orders section={section}/>
    </>
  )
}

export default App