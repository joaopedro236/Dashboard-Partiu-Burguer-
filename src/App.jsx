import "./StylesGlobals/reset.css"
import "./StylesGlobals/root.css"
import "./StylesGlobals/assets.css"
import { useState, useEffect } from "react"
import Menu from "./Components/Menu/Menu.jsx"
import authorizationRequisition from "./Requisitions/authorization.jsx"
import CreateOrder from "./Components/createOrder/createOrder.jsx"
import Authorization from "./Components/Authorization/Authorization.jsx"
import Orders from "./Components/Orders/Orders.jsx"
import SortOrders from "./Components/SortOrders/SortOrders.jsx"
import NameEdit from "./Components/EditOrders/nameEdit/nameEdit.jsx"
import DescriptionEdit from "./Components/EditOrders/descriptionEdit/descriptionEdit.jsx"
import ImageEdit from "./Components/EditOrders/imageEdit/imageEdit.jsx"
import PriceEdit from "./Components/EditOrders/priceEdit/priceEdit.jsx"
import TypeEdit from "./Components/EditOrders/typeEdit/typeEdit.jsx"
import getOrder from "./Requisitions/getOrderRequisition.jsx"
import DeleteOrder from "./Components/DeleteOrder/DeleteOrder.jsx"

const ORDER_SEQUENCE_KEY = "partiu-burguer-order-sequence"

function applySavedOrder(orders) {
  try {
    const savedIds = JSON.parse(localStorage.getItem(ORDER_SEQUENCE_KEY) || "[]")
    if (!Array.isArray(savedIds) || savedIds.length === 0) return orders

    const positions = new Map(savedIds.map((id, index) => [String(id), index]))
    return [...orders].sort((first, second) => {
      const firstPosition = positions.get(String(first.Id))
      const secondPosition = positions.get(String(second.Id))
      if (firstPosition === undefined && secondPosition === undefined) return 0
      if (firstPosition === undefined) return 1
      if (secondPosition === undefined) return -1
      return firstPosition - secondPosition
    })
  } catch {
    return orders
  }
}

function App() {
  const [section, setSection] = useState("createOrder")
  const [authorized, setAuthorized] = useState(true)
  const [order, setOrder] = useState([])

  const loadOrders = (setter = setOrder) => getOrder((orders) => setter(applySavedOrder(orders)))

  useEffect(() => {
    authorizationRequisition(setAuthorized)
    loadOrders()
  }, [])

  return (
    <>
      {!authorized && <Authorization />}
      <CreateOrder section={section} />
      <Menu setSection={setSection} />
      <Orders section={section} getOrder={loadOrders} order={order} setOrder={setOrder} />
      <SortOrders section={section} order={order} setOrder={setOrder} />
      <DeleteOrder order={order} section={section} />
      <NameEdit order={order} section={section} />
      <DescriptionEdit order={order} section={section} />
      <PriceEdit order={order} section={section} />
      <ImageEdit order={order} section={section} />
      <TypeEdit order={order} section={section} />
    </>
  )
}

export default App
