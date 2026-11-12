import "./StylesGlobals/reset.css"
import "./StylesGlobals/root.css"
import "./StylesGlobals/assets.css"
import { useState, useEffect } from "react"
import Menu from "./Components/Menu/Menu.jsx"
import authorizationRequisition from "./Requisitions/authorization.jsx"
import CreateOrder from "./Components/createOrder/createOrder.jsx"
import Authorization from "./Components/Authorization/Authorization.jsx"
import Orders from "./Components/Orders/Orders.jsx"
import nameEdit from "./Components/EditOrders/nameEdit/nameEdit.jsx"
import descriptionEdit from "./Components/EditOrders/descriptionEdit/descriptionEdit.jsx"
import imageEdit from "./Components/EditOrders/imageEdit/imageEdit.jsx"
import priceEdit from "./Components/EditOrders/priceEdit/priceEdit.jsx"
import typeEdit from "./Components/EditOrders/typeEdit/typeEdit.jsx"
import getOrder from "./Requisitions/getOrderRequisition.jsx"
import DeleteOrder from "./Components/DeleteOrder/DeleteOrder.jsx"

function App() {
  const [section, setSection] = useState("createOrder")
  const [authorized, setAuthorized] = useState(true)

  useEffect(() => {
    authorizationRequisition(setAuthorized)
  }, [])
  const [order, setOrder] = useState([])
  useEffect(() => {
    getOrder(setOrder)
  }, [])
  return (
    <>
      {!authorized && <Authorization />}
      <CreateOrder section={section} />
      <Menu setSection={setSection} />
      <Orders section={section} getOrder={getOrder} order={order} setOrder={setOrder} />
      <DeleteOrder order={order} section={section} />
      <nameEdit order={order} section={section} />
      <descriptionEdit order={order} section={section} />
      <priceEdit order={order} section={section} />
      <imageEdit order={order} section={section} />
      <typeEdit order={order} section={section} />
    </>
  )
}

export default App