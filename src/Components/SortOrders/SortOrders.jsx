import { useMemo, useRef, useState } from "react"
import "./sortOrders.css"

export default function SortOrders({ section, order, setOrder }) {
  const draggedId = useRef(null)
  const [draggingId, setDraggingId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [selectedType, setSelectedType] = useState("Todos")

  const types = useMemo(() => {
    const presentTypes = [...new Set(order.map((item) => item.Type).filter(Boolean))]
    const preferredOrder = ["Tradicional", "Artesanal", "Combo Tradicional", "Combo Artesanal", "Porção", "Bebida"]
    return ["Todos", ...preferredOrder.filter((type) => presentTypes.includes(type)), ...presentTypes.filter((type) => !preferredOrder.includes(type))]
  }, [order])

  const visibleOrders = selectedType === "Todos"
    ? order
    : order.filter((item) => item.Type === selectedType)

  async function saveOrder(nextOrder, previousOrder) {
    setOrder(nextOrder)
    setSaving(true)
    setMessage("Salvando nova ordem…")

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/updateOrderSequence`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ orderIds: nextOrder.map((item) => item.Id) }),
      })
      const result = await response.json()

      if (!response.ok || result?.Status !== true) {
        throw new Error(result?.Error || `Falha ao salvar (HTTP ${response.status}).`)
      }

      setMessage("Ordem salva com sucesso.")
    } catch (error) {
      setOrder(previousOrder)
      setMessage(error.message || "Erro ao salvar a ordem dos pedidos.")
    } finally {
      setSaving(false)
    }
  }

  function moveOrder(sourceId, targetId) {
    if (saving) return

    const sourceIndex = order.findIndex((item) => String(item.Id) === String(sourceId))
    const targetIndex = order.findIndex((item) => String(item.Id) === String(targetId))
    if (sourceIndex < 0 || targetIndex < 0 || sourceIndex === targetIndex) return

    const sourceType = order[sourceIndex].Type
    const targetType = order[targetIndex].Type
    if (selectedType !== "Todos" && (sourceType !== selectedType || targetType !== selectedType)) return

    let nextOrder = [...order]
    if (selectedType === "Todos") {
      const [movedItem] = nextOrder.splice(sourceIndex, 1)
      nextOrder.splice(targetIndex, 0, movedItem)
    } else {
      // Reorder only within this category and leave the positions of other categories untouched.
      const categoryIndexes = order
        .map((item, index) => item.Type === selectedType ? index : -1)
        .filter((index) => index !== -1)
      const categoryOrders = categoryIndexes.map((index) => order[index])
      const categorySourceIndex = categoryOrders.findIndex((item) => String(item.Id) === String(sourceId))
      const categoryTargetIndex = categoryOrders.findIndex((item) => String(item.Id) === String(targetId))
      const [movedItem] = categoryOrders.splice(categorySourceIndex, 1)
      categoryOrders.splice(categoryTargetIndex, 0, movedItem)
      categoryIndexes.forEach((index, categoryIndex) => {
        nextOrder[index] = categoryOrders[categoryIndex]
      })
    }

    saveOrder(nextOrder, order)
  }

  function moveByKeyboard(itemId, direction) {
    const currentIndex = visibleOrders.findIndex((item) => String(item.Id) === String(itemId))
    const targetIndex = currentIndex + direction
    if (currentIndex < 0 || targetIndex < 0 || targetIndex >= visibleOrders.length) return
    moveOrder(visibleOrders[currentIndex].Id, visibleOrders[targetIndex].Id)
  }

  return (
    <section className={`sortOrders ${section === "sortOrders" ? "flex" : "hidden"}`}>
      <header>
        <h1>Ordenar pedidos</h1>
        <p>Selecione uma categoria e arraste os itens para alterar a ordem no cardápio Partiu Burguer.</p>
      </header>

      <label className="sortOrdersFilter">
        <span>Categoria</span>
        <select value={selectedType} onChange={(event) => setSelectedType(event.target.value)}>
          {types.map((type) => <option key={type} value={type}>{type}</option>)}
        </select>
      </label>

      <p className="sortOrdersStatus" role="status" aria-live="polite">{message}</p>

      {visibleOrders.length === 0 ? (
        <p className="sortOrdersEmpty">Não há pedidos nesta categoria.</p>
      ) : (
        <ol className="sortOrdersList" aria-label={`Pedidos: ${selectedType}`} aria-busy={saving}>
          {visibleOrders.map((item, index) => (
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
                draggable={!saving}
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
                <button type="button" onClick={() => moveByKeyboard(item.Id, -1)} disabled={saving || index === 0} aria-label={`Mover ${item.Name} para cima`}>↑</button>
                <button type="button" onClick={() => moveByKeyboard(item.Id, 1)} disabled={saving || index === visibleOrders.length - 1} aria-label={`Mover ${item.Name} para baixo`}>↓</button>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}
