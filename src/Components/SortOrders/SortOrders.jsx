import { useRef, useState } from "react"
import "./sortOrders.css"

const ORDER_SEQUENCE_KEY = "partiu-burguer-order-sequence"

export default function SortOrders({ section, order, setOrder }) {
  const draggedId = useRef(null)
  const [draggingId, setDraggingId] = useState(null)

  function persistOrder(nextOrder) {
    try {
      const ids = nextOrder.map((item) => item.Id).filter((id) => id !== undefined && id !== null)
      localStorage.setItem(ORDER_SEQUENCE_KEY, JSON.stringify(ids))
    } catch (error) {
      console.error("Não foi possível salvar a ordem dos pedidos.", error)
    }
  }

  function moveOrder(sourceId, targetId) {
    const sourceIndex = order.findIndex((item) => String(item.Id) === String(sourceId))
    const targetIndex = order.findIndex((item) => String(item.Id) === String(targetId))
    if (sourceIndex < 0 || targetIndex < 0 || sourceIndex === targetIndex) return

    const nextOrder = [...order]
    const [movedOrder] = nextOrder.splice(sourceIndex, 1)
    nextOrder.splice(targetIndex, 0, movedOrder)
    setOrder(nextOrder)
    persistOrder(nextOrder)
  }

  function moveByKeyboard(index, direction) {
    const targetIndex = index + direction
    if (targetIndex < 0 || targetIndex >= order.length) return
    moveOrder(order[index].Id, order[targetIndex].Id)
  }

  return (
    <section className={`sortOrders ${section === "sortOrders" ? "flex" : "hidden"}`}>
      <header>
        <h1>Ordenar pedidos</h1>
        <p>Arraste os itens para definir a ordem em que aparecem no cardápio.</p>
      </header>

      {order.length === 0 ? (
        <p className="sortOrdersEmpty">Nenhum pedido disponível para ordenar.</p>
      ) : (
        <ol className="sortOrdersList" aria-label="Pedidos na ordem atual">
          {order.map((item, index) => (
            <li
              className={`sortOrdersItem ${draggingId === item.Id ? "isDragging" : ""}`}
              key={item.Id ?? index}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault()
                if (draggedId.current !== null) moveOrder(draggedId.current, item.Id)
                draggedId.current = null
                setDraggingId(null)
              }}
            >
              <span
                className="sortOrdersHandle"
                draggable
                onDragStart={(event) => {
                  draggedId.current = item.Id
                  setDraggingId(item.Id)
                  event.dataTransfer.effectAllowed = "move"
                  event.dataTransfer.setData("text/plain", String(item.Id))
                }}
                onDragEnd={() => {
                  draggedId.current = null
                  setDraggingId(null)
                }}
                aria-label={`Arrastar ${item.Name}`}
                title="Arraste para reordenar"
              >
                ⠿
              </span>
              <span className="sortOrdersPosition">{index + 1}</span>
              {item.Imagem_url && <img src={item.Imagem_url} alt="" />}
              <span className="sortOrdersName">{item.Name || "Pedido sem nome"}</span>
              <div className="sortOrdersActions">
                <button
                  type="button"
                  onClick={() => moveByKeyboard(index, -1)}
                  disabled={index === 0}
                  aria-label={`Mover ${item.Name} para cima`}
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveByKeyboard(index, 1)}
                  disabled={index === order.length - 1}
                  aria-label={`Mover ${item.Name} para baixo`}
                >
                  ↓
                </button>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}
